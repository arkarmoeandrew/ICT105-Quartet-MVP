-- A direct-message thread belongs to two members, not to an individual listing.
-- Merge existing duplicate product threads without losing messages or read state,
-- then enforce one conversation row per member pair.

lock table public.conversations, public.conversation_participants, public.messages
in share row exclusive mode;

do $$
begin
  if exists (
    select 1
    from public.conversation_participants
    group by conversation_id
    having count(*) <> 2
  ) then
    raise exception 'Direct conversations must have exactly two participants before migration';
  end if;
end;
$$;

alter table public.conversations
  add column member_one_id uuid,
  add column member_two_id uuid;

with participant_pairs as (
  select
    conversation_id,
    (array_agg(user_id order by user_id::text))[1] as member_one_id,
    (array_agg(user_id order by user_id::text))[2] as member_two_id
  from public.conversation_participants
  group by conversation_id
)
update public.conversations as conversation
set member_one_id = pair.member_one_id,
    member_two_id = pair.member_two_id
from participant_pairs as pair
where pair.conversation_id = conversation.id;

create temporary table conversation_pair_canonical on commit drop as
with message_counts as (
  select conversation_id, count(*) as message_count
  from public.messages
  group by conversation_id
), ranked as (
  select
    conversation.id,
    conversation.member_one_id,
    conversation.member_two_id,
    row_number() over (
      partition by conversation.member_one_id, conversation.member_two_id
      order by coalesce(message_counts.message_count, 0) desc,
               conversation.updated_at desc,
               conversation.created_at asc,
               conversation.id
    ) as pair_rank
  from public.conversations as conversation
  left join message_counts on message_counts.conversation_id = conversation.id
)
select member_one_id, member_two_id, id as canonical_id
from ranked
where pair_rank = 1;

create temporary table conversation_merge_map on commit drop as
select conversation.id as duplicate_id, canonical.canonical_id
from public.conversations as conversation
join conversation_pair_canonical as canonical
  using (member_one_id, member_two_id)
where conversation.id <> canonical.canonical_id;

create temporary table conversation_participant_rollup on commit drop as
select
  canonical.canonical_id,
  participant.user_id,
  min(participant.joined_at) as joined_at,
  max(participant.last_read_at) as last_read_at
from public.conversations as conversation
join conversation_pair_canonical as canonical
  using (member_one_id, member_two_id)
join public.conversation_participants as participant
  on participant.conversation_id = conversation.id
group by canonical.canonical_id, participant.user_id;

create temporary table conversation_time_rollup on commit drop as
select
  canonical.canonical_id,
  min(conversation.created_at) as created_at,
  max(conversation.updated_at) as updated_at
from public.conversations as conversation
join conversation_pair_canonical as canonical
  using (member_one_id, member_two_id)
group by canonical.canonical_id;

update public.messages as message
set conversation_id = merge_map.canonical_id
from conversation_merge_map as merge_map
where message.conversation_id = merge_map.duplicate_id;

update public.conversation_participants as participant
set joined_at = rollup.joined_at,
    last_read_at = rollup.last_read_at
from conversation_participant_rollup as rollup
where participant.conversation_id = rollup.canonical_id
  and participant.user_id = rollup.user_id;

update public.conversations as conversation
set listing_id = null,
    listing_title = 'Direct message',
    listing_image_url = null,
    request_status = 'open',
    created_at = rollup.created_at,
    updated_at = rollup.updated_at
from conversation_time_rollup as rollup
where conversation.id = rollup.canonical_id;

delete from public.conversations as conversation
using conversation_merge_map as merge_map
where conversation.id = merge_map.duplicate_id;

alter table public.conversations
  alter column member_one_id set not null,
  alter column member_two_id set not null,
  add constraint conversations_member_one_id_fkey
    foreign key (member_one_id) references public.profiles(id) on delete cascade,
  add constraint conversations_member_two_id_fkey
    foreign key (member_two_id) references public.profiles(id) on delete cascade,
  add constraint conversations_distinct_ordered_members
    check (member_one_id::text < member_two_id::text),
  add constraint conversations_created_by_is_member
    check (created_by in (member_one_id, member_two_id)),
  add constraint conversations_member_pair_key
    unique (member_one_id, member_two_id);

create index conversations_member_two_id_idx
on public.conversations(member_two_id);

do $$
begin
  if exists (
    select 1
    from public.conversations as conversation
    where not exists (
      select 1 from public.conversation_participants
      where conversation_id = conversation.id and user_id = conversation.member_one_id
    )
    or not exists (
      select 1 from public.conversation_participants
      where conversation_id = conversation.id and user_id = conversation.member_two_id
    )
    or (select count(*) from public.conversation_participants
        where conversation_id = conversation.id) <> 2
  ) then
    raise exception 'Conversation pair columns do not match conversation participants';
  end if;
end;
$$;

create or replace function public.start_conversation(
  p_other_user uuid,
  p_listing_id text default null,
  p_listing_title text default 'Direct message',
  p_listing_image_url text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_current_user uuid := (select auth.uid());
  v_member_one uuid;
  v_member_two uuid;
  v_conversation_id uuid;
begin
  if v_current_user is null then
    raise exception 'Authentication required';
  end if;

  if p_other_user is null or p_other_user = v_current_user then
    raise exception 'Choose another RSU Nexus member';
  end if;

  if not exists (select 1 from public.profiles where id = p_other_user) then
    raise exception 'Member profile not found';
  end if;

  if v_current_user::text < p_other_user::text then
    v_member_one := v_current_user;
    v_member_two := p_other_user;
  else
    v_member_one := p_other_user;
    v_member_two := v_current_user;
  end if;

  insert into public.conversations (
    listing_id,
    listing_title,
    listing_image_url,
    created_by,
    member_one_id,
    member_two_id
  )
  values (
    null,
    'Direct message',
    null,
    v_current_user,
    v_member_one,
    v_member_two
  )
  on conflict (member_one_id, member_two_id) do nothing
  returning id into v_conversation_id;

  if v_conversation_id is null then
    select id into v_conversation_id
    from public.conversations
    where member_one_id = v_member_one
      and member_two_id = v_member_two;
  end if;

  insert into public.conversation_participants (conversation_id, user_id)
  values
    (v_conversation_id, v_current_user),
    (v_conversation_id, p_other_user)
  on conflict (conversation_id, user_id) do nothing;

  return v_conversation_id;
end;
$$;

revoke all on function public.start_conversation(uuid, text, text, text)
from public, anon;
grant execute on function public.start_conversation(uuid, text, text, text)
to authenticated;
