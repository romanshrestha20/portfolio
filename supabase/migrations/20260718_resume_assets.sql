-- Store uploaded résumé versions and permit PDFs in the existing public portfolio bucket.
create table if not exists public.resume_assets (
  id uuid primary key default gen_random_uuid(),
  original_name text not null,
  storage_path text unique not null,
  public_url text not null,
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 12000000),
  created_at timestamptz not null default now()
);

alter table public.resume_assets enable row level security;

update storage.buckets
set public = true,
    file_size_limit = 12000000,
    allowed_mime_types = array['image/png','image/jpeg','image/webp','image/avif','application/pdf']
where id = 'portfolio-media';
