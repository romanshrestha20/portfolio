-- Media library metadata and expanded upload limit.
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  original_name text not null,
  storage_path text unique not null,
  thumbnail_path text unique not null,
  public_url text not null,
  thumbnail_url text not null,
  mime_type text not null default 'image/webp',
  size_bytes bigint not null check (size_bytes >= 0),
  original_size_bytes bigint not null check (original_size_bytes >= 0),
  width integer not null check (width > 0),
  height integer not null check (height > 0),
  alt_text text not null default '',
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;

update storage.buckets
set public = true,
    file_size_limit = 10000000,
    allowed_mime_types = array['image/png','image/jpeg','image/webp','image/avif']
where id = 'portfolio-media';
