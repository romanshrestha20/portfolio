-- Keep an immutable revision whenever the public personal details change.
create table if not exists public.personal_details_history (
  id uuid primary key default gen_random_uuid(),
  details jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.personal_details_history enable row level security;

create or replace function public.capture_personal_details_history()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.id = 'main' and new.content ? 'personalDetails' then
    if tg_op = 'INSERT' then
      insert into public.personal_details_history (details)
      values (new.content -> 'personalDetails');
    elsif old.content -> 'personalDetails' is distinct from new.content -> 'personalDetails' then
      insert into public.personal_details_history (details)
      values (new.content -> 'personalDetails');
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists site_settings_personal_details_history on public.site_settings;
create trigger site_settings_personal_details_history
after insert or update of content on public.site_settings
for each row execute function public.capture_personal_details_history();

-- Seed the archive with the currently published profile when one already exists.
insert into public.personal_details_history (details, created_at)
select content -> 'personalDetails', updated_at
from public.site_settings
where id = 'main'
  and content ? 'personalDetails'
  and not exists (select 1 from public.personal_details_history);
