-- Admin-controlled listing automation. New listings are public only when the
-- singleton setting is enabled; otherwise they remain pending for review.

create table public.marketplace_settings (
  id text primary key default 'marketplace'
    check (id = 'marketplace'),
  auto_approve_listings boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id) on delete set null
);

comment on table public.marketplace_settings is
  'Administrator-controlled settings for marketplace moderation.';
comment on column public.marketplace_settings.auto_approve_listings is
  'When enabled, new listings are published immediately instead of entering manual review.';

insert into public.marketplace_settings (id, auto_approve_listings)
values ('marketplace', false)
on conflict (id) do nothing;

alter table public.marketplace_settings enable row level security;

create policy "Admins can view marketplace settings"
on public.marketplace_settings for select
to authenticated
using (private.is_admin());

create policy "Admins can update marketplace settings"
on public.marketplace_settings for update
to authenticated
using (private.is_admin())
with check (private.is_admin());

revoke all on public.marketplace_settings from anon, authenticated;
grant select, update on public.marketplace_settings to authenticated;

create or replace function private.listing_auto_approval_enabled()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select case
    when (select auth.uid()) is null then false
    else coalesce((
      select settings.auto_approve_listings
      from public.marketplace_settings as settings
      where settings.id = 'marketplace'
    ), false)
  end;
$$;

revoke all on function private.listing_auto_approval_enabled() from public, anon;
grant execute on function private.listing_auto_approval_enabled() to authenticated;

create or replace function private.apply_listing_auto_approval()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication is required';
  end if;

  if private.listing_auto_approval_enabled() then
    new.status := 'Available';
    new.reviewed_at := now();
  else
    new.status := 'Pending';
    new.reviewed_at := null;
  end if;

  return new;
end;
$$;

revoke all on function private.apply_listing_auto_approval() from public, anon, authenticated;

drop trigger if exists listings_apply_auto_approval on public.listings;
create trigger listings_apply_auto_approval
before insert on public.listings
for each row execute function private.apply_listing_auto_approval();

create or replace function private.audit_marketplace_settings_update()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if (select auth.uid()) is null or not private.is_admin() then
    raise exception 'Administrator access is required';
  end if;

  new.id := old.id;
  new.updated_at := now();
  new.updated_by := (select auth.uid());
  return new;
end;
$$;

revoke all on function private.audit_marketplace_settings_update() from public, anon, authenticated;

drop trigger if exists marketplace_settings_audit_update on public.marketplace_settings;
create trigger marketplace_settings_audit_update
before update on public.marketplace_settings
for each row execute function private.audit_marketplace_settings_update();

drop policy if exists "Members can create their own listings" on public.listings;
create policy "Members can create their own listings"
on public.listings for insert
to authenticated
with check (
  (select auth.uid()) = owner_id
  and (
    (status = 'Available' and private.listing_auto_approval_enabled())
    or (status = 'Pending' and not private.listing_auto_approval_enabled())
  )
);
