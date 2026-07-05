-- Portfolio CMS schema for Supabase.
-- Run this first before supabase/seed.sql.

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'portfolio_status') then
    create type portfolio_status as enum ('draft', 'published', 'archived');
  end if;

  if not exists (select 1 from pg_type where typname = 'project_status') then
    create type project_status as enum ('draft', 'published', 'archived');
  end if;

  if not exists (select 1 from pg_type where typname = 'link_type') then
    create type link_type as enum (
      'github',
      'linkedin',
      'instagram',
      'website',
      'email',
      'phone',
      'other'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'contact_message_status') then
    create type contact_message_status as enum (
      'new',
      'read',
      'replied',
      'archived'
    );
  end if;
end $$;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists media_files (
  id uuid primary key default gen_random_uuid(),
  file_name varchar(255) not null,
  file_url text not null,
  mime_type varchar(120),
  size integer check (size is null or size >= 0),
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  name varchar(120) not null,
  nickname varchar(80),
  headline varchar(180),
  bio text,
  summary text,
  email varchar(180),
  phone varchar(60),
  location varchar(140),
  avatar_id uuid references media_files(id) on delete set null,
  resume_id uuid references media_files(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_profiles_updated_at on profiles;
create trigger set_profiles_updated_at
before update on profiles
for each row execute function set_updated_at();

create table if not exists profile_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  type link_type not null,
  label varchar(120) not null,
  url text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_profile_links_profile_id
on profile_links(profile_id);

create table if not exists technologies (
  id uuid primary key default gen_random_uuid(),
  name varchar(100) not null unique,
  description text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_technologies_updated_at on technologies;
create trigger set_technologies_updated_at
before update on technologies
for each row execute function set_updated_at();

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title varchar(160) not null,
  slug varchar(180) not null unique,
  summary text not null,
  description text,
  github_url text,
  live_url text,
  image_id uuid references media_files(id) on delete set null,
  status project_status not null default 'draft',
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_projects_updated_at on projects;
create trigger set_projects_updated_at
before update on projects
for each row execute function set_updated_at();

create index if not exists idx_projects_status
on projects(status);

create table if not exists project_technologies (
  project_id uuid not null references projects(id) on delete cascade,
  technology_id uuid not null references technologies(id) on delete cascade,
  primary key (project_id, technology_id)
);

create index if not exists idx_project_technologies_technology_id
on project_technologies(technology_id);

create table if not exists skill_categories (
  id uuid primary key default gen_random_uuid(),
  name varchar(100) not null unique,
  description text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_skill_categories_updated_at on skill_categories;
create trigger set_skill_categories_updated_at
before update on skill_categories
for each row execute function set_updated_at();

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name varchar(120) not null,
  description text,
  category_id uuid not null references skill_categories(id) on delete restrict,
  proficiency_level integer not null default 1 check (
    proficiency_level between 1 and 5
  ),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (name, category_id)
);

drop trigger if exists set_skills_updated_at on skills;
create trigger set_skills_updated_at
before update on skills
for each row execute function set_updated_at();

create index if not exists idx_skills_category_id
on skills(category_id);

create table if not exists experience_types (
  id uuid primary key default gen_random_uuid(),
  name varchar(100) not null unique,
  description text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_experience_types_updated_at on experience_types;
create trigger set_experience_types_updated_at
before update on experience_types
for each row execute function set_updated_at();

create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  title varchar(160) not null,
  organization varchar(160),
  description text not null,
  type_id uuid not null references experience_types(id) on delete restrict,
  start_date timestamptz not null,
  end_date timestamptz,
  is_current boolean not null default false,
  location varchar(140),
  attachment_id uuid references media_files(id) on delete set null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_date is null or end_date >= start_date)
);

drop trigger if exists set_experiences_updated_at on experiences;
create trigger set_experiences_updated_at
before update on experiences
for each row execute function set_updated_at();

create index if not exists idx_experiences_type_id
on experiences(type_id);

create table if not exists portfolios (
  id uuid primary key default gen_random_uuid(),
  slug varchar(180) not null unique,
  title varchar(160) not null,
  headline varchar(180) not null,
  description text,
  summary text,
  target_role varchar(140),
  status portfolio_status not null default 'draft',
  is_default boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

drop trigger if exists set_portfolios_updated_at on portfolios;
create trigger set_portfolios_updated_at
before update on portfolios
for each row execute function set_updated_at();

create unique index if not exists idx_portfolios_single_default
on portfolios(is_default)
where is_default = true;

create index if not exists idx_portfolios_slug_status
on portfolios(slug, status);

create table if not exists portfolio_projects (
  portfolio_id uuid not null references portfolios(id) on delete cascade,
  project_id uuid not null references projects(id) on delete cascade,
  display_order integer not null default 0,
  featured boolean not null default false,
  custom_title varchar(160),
  custom_summary text,
  primary key (portfolio_id, project_id)
);

create index if not exists idx_portfolio_projects_project_id
on portfolio_projects(project_id);

create table if not exists portfolio_skills (
  portfolio_id uuid not null references portfolios(id) on delete cascade,
  skill_id uuid not null references skills(id) on delete cascade,
  display_order integer not null default 0,
  featured boolean not null default false,
  custom_description text,
  primary key (portfolio_id, skill_id)
);

create index if not exists idx_portfolio_skills_skill_id
on portfolio_skills(skill_id);

create table if not exists portfolio_experiences (
  portfolio_id uuid not null references portfolios(id) on delete cascade,
  experience_id uuid not null references experiences(id) on delete cascade,
  display_order integer not null default 0,
  featured boolean not null default false,
  custom_description text,
  primary key (portfolio_id, experience_id)
);

create index if not exists idx_portfolio_experiences_experience_id
on portfolio_experiences(experience_id);

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

create index if not exists idx_technologies_display_order
on technologies(display_order);

create unique index if not exists uq_technologies_display_order
on technologies(display_order);

create index if not exists idx_projects_display_order
on projects(display_order);

create unique index if not exists uq_projects_display_order
on projects(display_order);

create index if not exists idx_skill_categories_display_order
on skill_categories(display_order);

create unique index if not exists uq_skill_categories_display_order
on skill_categories(display_order);

create index if not exists idx_skills_display_order
on skills(display_order);

create unique index if not exists uq_skills_display_order
on skills(display_order);

create index if not exists idx_experience_types_display_order
on experience_types(display_order);

create unique index if not exists uq_experience_types_display_order
on experience_types(display_order);

create index if not exists idx_experiences_display_order
on experiences(display_order);

create unique index if not exists uq_experiences_display_order
on experiences(display_order);

create index if not exists idx_portfolios_display_order
on portfolios(display_order);

create unique index if not exists uq_portfolios_display_order
on portfolios(display_order);

create or replace function reorder_display_order(
  p_table_name text,
  p_item_id uuid,
  p_new_order integer
)
returns void as $$
declare
  allowed_tables text[] := array[
    'technologies',
    'projects',
    'skill_categories',
    'skills',
    'experience_types',
    'experiences',
    'portfolios'
  ];
  current_order integer;
  max_order integer;
  offset_value integer := 1000000;
begin
  if p_table_name <> all(allowed_tables) then
    raise exception 'Table "%" cannot be reordered.', p_table_name;
  end if;

  execute format('select display_order from %I where id = $1', p_table_name)
  into current_order
  using p_item_id;

  if current_order is null then
    raise no_data_found;
  end if;

  execute format('select coalesce(max(display_order), 0) from %I', p_table_name)
  into max_order;

  p_new_order := greatest(0, least(p_new_order, max_order));

  if p_new_order = current_order then
    return;
  end if;

  execute format('update %I set display_order = -1 where id = $1', p_table_name)
  using p_item_id;

  if p_new_order < current_order then
    execute format(
      'update %I set display_order = display_order + $1 where display_order >= $2 and display_order < $3',
      p_table_name
    )
    using offset_value, p_new_order, current_order;

    execute format(
      'update %I set display_order = display_order - $1 where display_order >= $2',
      p_table_name
    )
    using offset_value - 1, offset_value;
  else
    execute format(
      'update %I set display_order = display_order + $1 where display_order <= $2 and display_order > $3',
      p_table_name
    )
    using offset_value, p_new_order, current_order;

    execute format(
      'update %I set display_order = display_order - $1 where display_order >= $2',
      p_table_name
    )
    using offset_value + 1, offset_value;
  end if;

  execute format('update %I set display_order = $1 where id = $2', p_table_name)
  using p_new_order, p_item_id;
end;
$$ language plpgsql;

create or replace function compact_display_order(
  p_table_name text,
  p_deleted_order integer
)
returns void as $$
declare
  allowed_tables text[] := array[
    'technologies',
    'projects',
    'skill_categories',
    'skills',
    'experience_types',
    'experiences',
    'portfolios'
  ];
  offset_value integer := 1000000;
begin
  if p_table_name <> all(allowed_tables) then
    raise exception 'Table "%" cannot be compacted.', p_table_name;
  end if;

  execute format(
    'update %I set display_order = display_order + $1 where display_order > $2',
    p_table_name
  )
  using offset_value, p_deleted_order;

  execute format(
    'update %I set display_order = display_order - $1 where display_order >= $2',
    p_table_name
  )
  using offset_value + 1, offset_value;
end;
$$ language plpgsql;
