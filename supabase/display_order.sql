-- Adds drag/drop ordering support for admin-managed content tables.
-- Run this in Supabase SQL Editor if your database was created before
-- display_order existed on every list table.

alter table technologies add column if not exists display_order integer not null default 0;
alter table projects add column if not exists display_order integer not null default 0;
alter table skill_categories add column if not exists display_order integer not null default 0;
alter table skills add column if not exists display_order integer not null default 0;
alter table experience_types add column if not exists display_order integer not null default 0;
alter table experiences add column if not exists display_order integer not null default 0;
alter table portfolios add column if not exists display_order integer not null default 0;

with ordered as (
  select id, row_number() over (order by created_at asc, id asc) - 1 as display_order
  from technologies
)
update technologies
set display_order = ordered.display_order
from ordered
where technologies.id = ordered.id;

with ordered as (
  select id, row_number() over (order by created_at asc, id asc) - 1 as display_order
  from projects
)
update projects
set display_order = ordered.display_order
from ordered
where projects.id = ordered.id;

with ordered as (
  select id, row_number() over (order by created_at asc, id asc) - 1 as display_order
  from skill_categories
)
update skill_categories
set display_order = ordered.display_order
from ordered
where skill_categories.id = ordered.id;

with ordered as (
  select id, row_number() over (order by created_at asc, id asc) - 1 as display_order
  from skills
)
update skills
set display_order = ordered.display_order
from ordered
where skills.id = ordered.id;

with ordered as (
  select id, row_number() over (order by created_at asc, id asc) - 1 as display_order
  from experience_types
)
update experience_types
set display_order = ordered.display_order
from ordered
where experience_types.id = ordered.id;

with ordered as (
  select id, row_number() over (order by display_order asc, start_date desc, created_at asc, id asc) - 1 as display_order
  from experiences
)
update experiences
set display_order = ordered.display_order
from ordered
where experiences.id = ordered.id;

with ordered as (
  select id, row_number() over (order by created_at asc, id asc) - 1 as display_order
  from portfolios
)
update portfolios
set display_order = ordered.display_order
from ordered
where portfolios.id = ordered.id;

create index if not exists idx_technologies_display_order on technologies(display_order);
create index if not exists idx_projects_display_order on projects(display_order);
create index if not exists idx_skill_categories_display_order on skill_categories(display_order);
create index if not exists idx_skills_display_order on skills(display_order);
create index if not exists idx_experience_types_display_order on experience_types(display_order);
create index if not exists idx_experiences_display_order on experiences(display_order);
create index if not exists idx_portfolios_display_order on portfolios(display_order);

create unique index if not exists uq_technologies_display_order on technologies(display_order);
create unique index if not exists uq_projects_display_order on projects(display_order);
create unique index if not exists uq_skill_categories_display_order on skill_categories(display_order);
create unique index if not exists uq_skills_display_order on skills(display_order);
create unique index if not exists uq_experience_types_display_order on experience_types(display_order);
create unique index if not exists uq_experiences_display_order on experiences(display_order);
create unique index if not exists uq_portfolios_display_order on portfolios(display_order);

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
