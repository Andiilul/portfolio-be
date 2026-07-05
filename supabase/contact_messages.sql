-- Contact messages table for existing Supabase projects.
-- Run this if supabase/schema.sql was already applied before contact form support.

do $$
begin
  if not exists (select 1 from pg_type where typname = 'contact_message_status') then
    create type contact_message_status as enum (
      'new',
      'read',
      'replied',
      'archived'
    );
  end if;
end $$;

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name varchar(120) not null,
  email varchar(180) not null,
  subject varchar(180) not null,
  message text not null,
  portfolio_slug varchar(180),
  status contact_message_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_contact_messages_updated_at on contact_messages;
create trigger set_contact_messages_updated_at
before update on contact_messages
for each row execute function set_updated_at();

create index if not exists idx_contact_messages_status_created_at
on contact_messages(status, created_at desc);
