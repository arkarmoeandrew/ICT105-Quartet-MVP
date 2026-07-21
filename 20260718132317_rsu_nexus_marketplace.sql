-- RSU Nexus marketplace extension for the existing profiles and messaging schema.
-- All public tables use RLS because they are exposed through the Supabase Data API.

alter table public.profiles
  add column if not exists role text not null default 'member'
  check (role in ('member', 'admin'));

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, private, pg_temp
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('Equipment', 'Learning', 'Service')),
  title text not null check (char_length(btrim(title)) between 3 and 120),
  category text not null check (char_length(btrim(category)) between 2 and 80),
  offer_method text not null check (char_length(btrim(offer_method)) between 2 and 80),
  price_label text not null default 'Free' check (char_length(price_label) <= 60),
  description text not null check (char_length(btrim(description)) between 20 and 1200),
  extra_one text,
  extra_two text,
  image_url text,
  status text not null default 'Pending'
    check (status in ('Pending', 'Available', 'Reserved', 'Unavailable', 'Rejected')),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists listings_owner_id_idx on public.listings(owner_id);
create index if not exists listings_status_created_at_idx on public.listings(status, created_at desc);
create index if not exists listings_type_status_idx on public.listings(type, status);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  requester_id uuid not null references public.profiles(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  message text not null check (char_length(btrim(message)) between 10 and 600),
  preferred_time text check (char_length(preferred_time) <= 120),
  status text not null default 'Pending'
    check (status in ('Pending', 'Approved', 'Rejected', 'Cancelled', 'Completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint requests_different_participants check (requester_id <> owner_id)
);

create index if not exists requests_requester_created_at_idx on public.requests(requester_id, created_at desc);
create index if not exists requests_owner_created_at_idx on public.requests(owner_id, created_at desc);
create index if not exists requests_listing_id_idx on public.requests(listing_id);

create table if not exists public.saved_listings (
  user_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

create index if not exists saved_listings_listing_id_idx on public.saved_listings(listing_id);

create or replace function private.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public, private, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists listings_set_updated_at on public.listings;
create trigger listings_set_updated_at
before update on public.listings
for each row execute function private.set_updated_at();

create or replace function private.validate_listing_update()
returns trigger
language plpgsql
security invoker
set search_path = public, private, pg_temp
as $$
declare
  current_user_id uuid := (select auth.uid());
begin
  if new.owner_id <> old.owner_id then
    raise exception 'Listing ownership cannot be changed';
  end if;

  if private.is_admin() then
    return new;
  end if;

  if current_user_id <> old.owner_id then
    raise exception 'Only the listing owner can update this listing';
  end if;

  if new.reviewed_at is distinct from old.reviewed_at then
    raise exception 'Only an administrator can change review information';
  end if;

  if new.status = old.status then
    return new;
  end if;

  if old.reviewed_at is not null
    and old.status in ('Available', 'Reserved', 'Unavailable')
    and new.status in ('Available', 'Reserved', 'Unavailable') then
    return new;
  end if;

  raise exception 'This listing must be reviewed before its public status can change';
end;
$$;

drop trigger if exists listings_validate_update on public.listings;
create trigger listings_validate_update
before update on public.listings
for each row execute function private.validate_listing_update();

drop trigger if exists requests_set_updated_at on public.requests;
create trigger requests_set_updated_at
before update on public.requests
for each row execute function private.set_updated_at();

create or replace function private.validate_request_update()
returns trigger
language plpgsql
security invoker
set search_path = public, private, pg_temp
as $$
declare
  current_user_id uuid := (select auth.uid());
begin
  if new.listing_id <> old.listing_id
    or new.requester_id <> old.requester_id
    or new.owner_id <> old.owner_id
    or new.message <> old.message
    or new.preferred_time is distinct from old.preferred_time then
    raise exception 'Request participants and submitted details cannot be changed';
  end if;

  if private.is_admin() then
    return new;
  end if;

  if current_user_id = old.requester_id
    and old.status = 'Pending'
    and new.status = 'Cancelled' then
    return new;
  end if;

  if current_user_id = old.owner_id
    and ((old.status = 'Pending' and new.status in ('Approved', 'Rejected'))
      or (old.status = 'Approved' and new.status = 'Completed')) then
    return new;
  end if;

  if new.status = old.status then
    return new;
  end if;

  raise exception 'This request status change is not allowed';
end;
$$;

drop trigger if exists requests_validate_update on public.requests;
create trigger requests_validate_update
before update on public.requests
for each row execute function private.validate_request_update();

alter table public.listings enable row level security;
alter table public.requests enable row level security;
alter table public.saved_listings enable row level security;

drop policy if exists "Public can view available listings" on public.listings;
drop policy if exists "Members can view their own listings" on public.listings;
drop policy if exists "Admins can view all listings" on public.listings;
drop policy if exists "Visitors can view available listings" on public.listings;
drop policy if exists "Members can view permitted listings" on public.listings;
create policy "Visitors can view available listings"
on public.listings for select
to anon
using (status = 'Available');

create policy "Members can view permitted listings"
on public.listings for select
to authenticated
using (status = 'Available' or (select auth.uid()) = owner_id or private.is_admin());

drop policy if exists "Members can create their own listings" on public.listings;
create policy "Members can create their own listings"
on public.listings for insert
to authenticated
with check ((select auth.uid()) = owner_id and status = 'Pending');

drop policy if exists "Owners can update their listings" on public.listings;
drop policy if exists "Admins can moderate listings" on public.listings;
drop policy if exists "Owners and admins can update listings" on public.listings;
create policy "Owners and admins can update listings"
on public.listings for update
to authenticated
using ((select auth.uid()) = owner_id or private.is_admin())
with check ((select auth.uid()) = owner_id or private.is_admin());

drop policy if exists "Owners can delete their listings" on public.listings;
create policy "Owners can delete their listings"
on public.listings for delete
to authenticated
using ((select auth.uid()) = owner_id);

drop policy if exists "Request participants can view requests" on public.requests;
create policy "Request participants can view requests"
on public.requests for select
to authenticated
using ((select auth.uid()) in (requester_id, owner_id) or private.is_admin());

drop policy if exists "Members can request available listings" on public.requests;
create policy "Members can request available listings"
on public.requests for insert
to authenticated
with check (
  (select auth.uid()) = requester_id
  and requester_id <> owner_id
  and exists (
    select 1 from public.listings
    where listings.id = listing_id
      and listings.owner_id = owner_id
      and listings.status = 'Available'
  )
);

drop policy if exists "Request participants can update request status" on public.requests;
create policy "Request participants can update request status"
on public.requests for update
to authenticated
using ((select auth.uid()) in (requester_id, owner_id) or private.is_admin())
with check ((select auth.uid()) in (requester_id, owner_id) or private.is_admin());

drop policy if exists "Members can view their saved listings" on public.saved_listings;
create policy "Members can view their saved listings"
on public.saved_listings for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Members can save listings" on public.saved_listings;
create policy "Members can save listings"
on public.saved_listings for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Members can remove saved listings" on public.saved_listings;
create policy "Members can remove saved listings"
on public.saved_listings for delete
to authenticated
using ((select auth.uid()) = user_id);

-- Explicit Data API grants. RLS remains the row-level authorization layer.
revoke all on public.listings from anon, authenticated;
revoke all on public.requests from anon, authenticated;
revoke all on public.saved_listings from anon, authenticated;
grant select on public.listings to anon, authenticated;
grant insert, update, delete on public.listings to authenticated;
grant select, insert, update on public.requests to authenticated;
grant select, insert, delete on public.saved_listings to authenticated;

-- Profile owners may edit public profile fields, but can never self-assign the admin role.
revoke update on public.profiles from authenticated;
grant update (display_name, faculty, avatar_url, bio, year_of_study, campus_location, availability, interests, updated_at)
on public.profiles to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-images',
  'listing-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view listing images" on storage.objects;

drop policy if exists "Members can upload listing images" on storage.objects;
create policy "Members can upload listing images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'listing-images'
  and (storage.foldername(name))[1] = ((select auth.uid()))::text
);

drop policy if exists "Members can update listing images" on storage.objects;
create policy "Members can update listing images"
on storage.objects for update
to authenticated
using (bucket_id = 'listing-images' and owner_id = ((select auth.uid()))::text)
with check (
  bucket_id = 'listing-images'
  and (storage.foldername(name))[1] = ((select auth.uid()))::text
);

drop policy if exists "Members can delete listing images" on storage.objects;
create policy "Members can delete listing images"
on storage.objects for delete
to authenticated
using (bucket_id = 'listing-images' and owner_id = ((select auth.uid()))::text);

-- Public profile photos are intentionally visible on public member profiles.
drop policy if exists "Public can view profile photos" on storage.objects;
drop policy if exists "Members can read their own profile photo objects" on storage.objects;
create policy "Members can read their own profile photo objects"
on storage.objects for select
to authenticated
using (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = ((select auth.uid()))::text
);
