-- Persist the media asset used as the homepage portrait in site_settings.content.profileImageId.
create table if not exists public.site_settings (
  id text primary key default 'main',
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Keep storage aligned with the 12 MB limit enforced by the upload API.
update storage.buckets
set file_size_limit = 12000000
where id = 'portfolio-media';
