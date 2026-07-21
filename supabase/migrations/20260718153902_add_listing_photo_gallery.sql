-- Keep ordered listing photos while preserving image_url as the cover for older clients.
alter table public.listings
  add column if not exists image_urls text[] not null default '{}'::text[];

update public.listings
set image_urls = array[image_url]
where image_url is not null
  and cardinality(image_urls) = 0;

alter table public.listings
  drop constraint if exists listings_image_urls_max_five;

alter table public.listings
  add constraint listings_image_urls_max_five
  check (cardinality(image_urls) <= 5);

comment on column public.listings.image_urls is
  'Ordered listing gallery containing up to five public image URLs; the first image is the cover.';

grant select on table public.listings to anon, authenticated;
grant insert, update, delete on table public.listings to authenticated;
