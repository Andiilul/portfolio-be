-- Starter seed data for local/dev Supabase.
-- Run this after supabase/schema.sql.

insert into media_files (id, file_name, file_url, mime_type, size)
values
  (
    '00000000-0000-4000-8000-000000000001',
    'avatar-placeholder.png',
    'https://example.com/avatar-placeholder.png',
    'image/png',
    null
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'resume-placeholder.pdf',
    'https://example.com/resume-placeholder.pdf',
    'application/pdf',
    null
  ),
  (
    '00000000-0000-4000-8000-000000000003',
    'portfolio-cms-cover.png',
    'https://example.com/portfolio-cms-cover.png',
    'image/png',
    null
  ),
  (
    '00000000-0000-4000-8000-000000000004',
    'api-platform-cover.png',
    'https://example.com/api-platform-cover.png',
    'image/png',
    null
  )
on conflict (id) do nothing;

insert into profiles (
  id,
  name,
  nickname,
  headline,
  bio,
  summary,
  email,
  phone,
  location,
  avatar_id,
  resume_id
)
values (
  '00000000-0000-4000-8000-000000000010',
  'Your Name',
  'Your Nickname',
  'Full-stack Developer',
  'Developer yang fokus membangun aplikasi web modern, rapi, dan mudah dipakai.',
  'Saya membangun produk web dari frontend sampai backend, dengan perhatian pada arsitektur, pengalaman pengguna, dan deploy yang stabil.',
  'you@example.com',
  null,
  'Indonesia',
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000002'
)
on conflict (id) do nothing;

insert into profile_links (id, profile_id, type, label, url, display_order)
values
  (
    '00000000-0000-4000-8000-000000000011',
    '00000000-0000-4000-8000-000000000010',
    'github',
    'GitHub',
    'https://github.com/yourusername',
    1
  ),
  (
    '00000000-0000-4000-8000-000000000012',
    '00000000-0000-4000-8000-000000000010',
    'linkedin',
    'LinkedIn',
    'https://linkedin.com/in/yourusername',
    2
  ),
  (
    '00000000-0000-4000-8000-000000000013',
    '00000000-0000-4000-8000-000000000010',
    'email',
    'Email',
    'mailto:you@example.com',
    3
  )
on conflict (id) do nothing;

insert into technologies (id, name, description, display_order)
values
  (
    '00000000-0000-4000-8000-000000000020',
    'Next.js',
    'React framework untuk aplikasi frontend modern.',
    0
  ),
  (
    '00000000-0000-4000-8000-000000000021',
    'NestJS',
    'Node.js framework untuk backend yang modular.',
    1
  ),
  (
    '00000000-0000-4000-8000-000000000022',
    'Supabase',
    'Backend platform berbasis PostgreSQL.',
    2
  ),
  (
    '00000000-0000-4000-8000-000000000023',
    'Tailwind CSS',
    'Utility-first CSS framework.',
    3
  )
on conflict (id) do nothing;

insert into projects (
  id,
  title,
  slug,
  summary,
  description,
  github_url,
  live_url,
  image_id,
  status,
  display_order
)
values
  (
    '00000000-0000-4000-8000-000000000030',
    'Targeted Portfolio CMS',
    'targeted-portfolio-cms',
    'CMS personal untuk membuat banyak portfolio page dengan narasi berbeda.',
    'Aplikasi ini memungkinkan pemilik portfolio membuat halaman khusus berdasarkan target role, memilih project yang relevan, dan mengatur narasi tiap project.',
    'https://github.com/yourusername/targeted-portfolio-cms',
    null,
    '00000000-0000-4000-8000-000000000003',
    'published',
    0
  ),
  (
    '00000000-0000-4000-8000-000000000031',
    'Backend API Platform',
    'backend-api-platform',
    'API backend modular dengan NestJS dan Supabase.',
    'Backend ini mengelola data portfolio, project, skill, experience, serta relasi untuk portfolio page yang targeted.',
    'https://github.com/yourusername/backend-api-platform',
    null,
    '00000000-0000-4000-8000-000000000004',
    'published',
    1
  )
on conflict (id) do nothing;

insert into project_technologies (project_id, technology_id)
values
  (
    '00000000-0000-4000-8000-000000000030',
    '00000000-0000-4000-8000-000000000020'
  ),
  (
    '00000000-0000-4000-8000-000000000030',
    '00000000-0000-4000-8000-000000000023'
  ),
  (
    '00000000-0000-4000-8000-000000000031',
    '00000000-0000-4000-8000-000000000021'
  ),
  (
    '00000000-0000-4000-8000-000000000031',
    '00000000-0000-4000-8000-000000000022'
  )
on conflict (project_id, technology_id) do nothing;

insert into skill_categories (id, name, description, display_order)
values
  (
    '00000000-0000-4000-8000-000000000040',
    'Frontend',
    'Kemampuan membangun user interface dan pengalaman pengguna.',
    0
  ),
  (
    '00000000-0000-4000-8000-000000000041',
    'Backend',
    'Kemampuan membangun API, database, dan service layer.',
    1
  ),
  (
    '00000000-0000-4000-8000-000000000042',
    'Product',
    'Kemampuan menerjemahkan kebutuhan menjadi fitur yang jelas.',
    2
  )
on conflict (id) do nothing;

insert into skills (id, name, description, category_id, proficiency_level, display_order)
values
  (
    '00000000-0000-4000-8000-000000000050',
    'Frontend Development',
    'Membangun UI responsif, reusable component, dan halaman yang nyaman dipakai.',
    '00000000-0000-4000-8000-000000000040',
    4,
    0
  ),
  (
    '00000000-0000-4000-8000-000000000051',
    'Backend API Design',
    'Merancang endpoint, module, dan struktur data backend yang mudah dikembangkan.',
    '00000000-0000-4000-8000-000000000041',
    4,
    1
  ),
  (
    '00000000-0000-4000-8000-000000000052',
    'Database Modeling',
    'Mendesain relasi data untuk kebutuhan aplikasi nyata.',
    '00000000-0000-4000-8000-000000000041',
    3,
    2
  ),
  (
    '00000000-0000-4000-8000-000000000053',
    'Feature Planning',
    'Memecah ide produk menjadi scope fitur yang bisa dikerjakan bertahap.',
    '00000000-0000-4000-8000-000000000042',
    4,
    3
  )
on conflict (id) do nothing;

insert into experience_types (id, name, description, display_order)
values
  (
    '00000000-0000-4000-8000-000000000060',
    'Freelance',
    'Pengalaman project mandiri atau client.',
    0
  ),
  (
    '00000000-0000-4000-8000-000000000061',
    'Personal Project',
    'Pengalaman membangun produk pribadi.',
    1
  )
on conflict (id) do nothing;

insert into experiences (
  id,
  title,
  organization,
  description,
  type_id,
  start_date,
  end_date,
  is_current,
  location,
  attachment_id,
  display_order
)
values
  (
    '00000000-0000-4000-8000-000000000070',
    'Full-stack Developer',
    'Personal Portfolio Project',
    'Merancang dan membangun sistem portfolio personal dengan targeted page, relational data model, dan rencana admin dashboard.',
    '00000000-0000-4000-8000-000000000061',
    '2026-07-01 00:00:00+00',
    null,
    true,
    'Remote',
    null,
    0
  )
on conflict (id) do nothing;

insert into portfolios (
  id,
  slug,
  title,
  headline,
  description,
  summary,
  target_role,
  status,
  is_default,
  display_order,
  published_at
)
values
  (
    '00000000-0000-4000-8000-000000000080',
    'frontend-dev',
    'Frontend Developer Portfolio',
    'Frontend developer focused on clean, responsive, product-minded interfaces.',
    'Portfolio page untuk menonjolkan project dan skill frontend.',
    'Halaman ini memilih project, skill, dan pengalaman yang paling relevan untuk role frontend developer.',
    'Frontend Developer',
    'published',
    true,
    0,
    now()
  ),
  (
    '00000000-0000-4000-8000-000000000081',
    'backend-nestjs',
    'Backend NestJS Portfolio',
    'Backend developer focused on modular APIs and clear database design.',
    'Portfolio page untuk menonjolkan backend, API, dan database design.',
    'Halaman ini memilih project, skill, dan pengalaman yang paling relevan untuk role backend developer.',
    'Backend Developer',
    'published',
    false,
    1,
    now()
  )
on conflict (id) do nothing;

insert into portfolio_projects (
  portfolio_id,
  project_id,
  display_order,
  featured,
  custom_title,
  custom_summary
)
values
  (
    '00000000-0000-4000-8000-000000000080',
    '00000000-0000-4000-8000-000000000030',
    1,
    true,
    'Portfolio CMS UI',
    'Menonjolkan konsep targeted portfolio, struktur halaman, dan pengalaman admin yang akan dibangun.'
  ),
  (
    '00000000-0000-4000-8000-000000000081',
    '00000000-0000-4000-8000-000000000031',
    1,
    true,
    'NestJS Portfolio API',
    'Menonjolkan arsitektur backend, desain relasi Supabase, dan kontrak data yang siap dikembangkan.'
  ),
  (
    '00000000-0000-4000-8000-000000000081',
    '00000000-0000-4000-8000-000000000030',
    2,
    false,
    'Targeted Portfolio Data Model',
    'Project yang sama dijelaskan dari sisi backend: schema, relation, dan fleksibilitas narasi per portfolio.'
  )
on conflict (portfolio_id, project_id) do nothing;

insert into portfolio_skills (
  portfolio_id,
  skill_id,
  display_order,
  featured,
  custom_description
)
values
  (
    '00000000-0000-4000-8000-000000000080',
    '00000000-0000-4000-8000-000000000050',
    1,
    true,
    'Fokus pada UI yang responsive dan mudah dipakai.'
  ),
  (
    '00000000-0000-4000-8000-000000000081',
    '00000000-0000-4000-8000-000000000051',
    1,
    true,
    'Fokus pada desain API modular dengan NestJS.'
  ),
  (
    '00000000-0000-4000-8000-000000000081',
    '00000000-0000-4000-8000-000000000052',
    2,
    true,
    'Fokus pada relasi data Supabase/PostgreSQL yang jelas.'
  )
on conflict (portfolio_id, skill_id) do nothing;

insert into portfolio_experiences (
  portfolio_id,
  experience_id,
  display_order,
  featured,
  custom_description
)
values
  (
    '00000000-0000-4000-8000-000000000080',
    '00000000-0000-4000-8000-000000000070',
    1,
    true,
    'Mengubah ide portfolio menjadi pengalaman frontend yang targeted.'
  ),
  (
    '00000000-0000-4000-8000-000000000081',
    '00000000-0000-4000-8000-000000000070',
    1,
    true,
    'Merancang data model dan kontrak backend untuk portfolio builder personal.'
  )
on conflict (portfolio_id, experience_id) do nothing;
