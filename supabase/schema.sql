-- Run this once in the Supabase SQL editor.
create table if not exists public.projects (
  id text primary key, name text not null, slug text unique not null, issue text not null default '01',
  dek text not null, image text not null, tags jsonb not null default '[]'::jsonb,
  links jsonb not null default '{}'::jsonb, facts jsonb not null default '[]'::jsonb,
  case_study jsonb not null default '{}'::jsonb, featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  display_order integer not null default 0, created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null,
  message text not null, read boolean not null default false, created_at timestamptz not null default now()
);
create table if not exists public.site_settings (
  id text primary key default 'main', content jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now()
);
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
alter table public.projects enable row level security;
alter table public.messages enable row level security;
alter table public.site_settings enable row level security;
alter table public.media_assets enable row level security;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media', 'portfolio-media', true, 12000000, array['image/png','image/jpeg','image/webp','image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
drop policy if exists "Public portfolio media" on storage.objects;
create policy "Public portfolio media" on storage.objects for select using (bucket_id = 'portfolio-media');
