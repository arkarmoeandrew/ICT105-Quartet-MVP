-- Let administrators manage member roles without allowing members to self-promote.
-- The existing owner policy still permits members to edit their own public profile fields.

create or replace function private.validate_profile_admin_update()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  admin_count bigint;
begin
  if current_user_id is null then
    raise exception 'Authentication is required';
  end if;

  if new.role is not distinct from old.role then
    if current_user_id <> old.id then
      raise exception 'Administrators may only change another member role';
    end if;
    return new;
  end if;

  if not private.is_admin() then
    raise exception 'Only an administrator can change member roles';
  end if;

  if current_user_id = old.id and old.role = 'admin' and new.role = 'member' then
    raise exception 'You cannot remove your own administrator access';
  end if;

  if old.role = 'admin' and new.role = 'member' then
    select count(*) into admin_count
    from public.profiles
    where role = 'admin';

    if admin_count <= 1 then
      raise exception 'RSU Nexus must keep at least one administrator';
    end if;
  end if;

  if current_user_id <> old.id and (
    new.id is distinct from old.id
    or new.display_name is distinct from old.display_name
    or new.faculty is distinct from old.faculty
    or new.avatar_url is distinct from old.avatar_url
    or new.created_at is distinct from old.created_at
    or new.bio is distinct from old.bio
    or new.year_of_study is distinct from old.year_of_study
    or new.campus_location is distinct from old.campus_location
    or new.availability is distinct from old.availability
    or new.interests is distinct from old.interests
  ) then
    raise exception 'Administrators may only change another member role';
  end if;

  return new;
end;
$$;

revoke all on function private.validate_profile_admin_update() from public, anon, authenticated;

drop trigger if exists profiles_validate_admin_update on public.profiles;
create trigger profiles_validate_admin_update
before update on public.profiles
for each row execute function private.validate_profile_admin_update();

drop policy if exists "Admins can update member roles" on public.profiles;
create policy "Admins can update member roles"
on public.profiles for update
to authenticated
using (private.is_admin())
with check (private.is_admin());

-- Column grants are the Data API permission layer; RLS and the trigger remain authoritative.
grant select on public.profiles to authenticated;
grant update (role) on public.profiles to authenticated;
