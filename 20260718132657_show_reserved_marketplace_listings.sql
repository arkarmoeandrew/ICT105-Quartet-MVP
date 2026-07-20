-- Keep the live marketplace availability filter aligned with public RLS visibility.
drop policy if exists "Visitors can view available listings" on public.listings;
drop policy if exists "Visitors can view marketplace listings" on public.listings;
drop policy if exists "Members can view permitted listings" on public.listings;

create policy "Visitors can view marketplace listings"
on public.listings for select
to anon
using (status in ('Available', 'Reserved'));

create policy "Members can view permitted listings"
on public.listings for select
to authenticated
using (
  status in ('Available', 'Reserved')
  or (select auth.uid()) = owner_id
  or private.is_admin()
);
