# Backend Deployment Notes

## Local Checks

```powershell
npm run build
npm run start:prod
```

Health check:

```text
http://localhost:4001/api/health
```

Docker check:

```powershell
docker build -t portfolio-be .
docker run --env-file .env -p 4001:4001 portfolio-be
```

## Supabase

Run SQL in this order:

```text
supabase/schema.sql
supabase/contact_messages.sql
supabase/storage.sql
supabase/seed.sql
```

If this is a fresh project, `schema.sql` already includes contact messages, so `contact_messages.sql` is only needed for an existing database that was created before the contact feature.

Storage:

```env
SUPABASE_STORAGE_BUCKET=media
```

The current upload endpoint uses `getPublicUrl`, so the bucket should be public. If private files are needed later, switch to signed URLs.

## Render

Use Docker environment.

```text
Root Directory: portfolio-be
Dockerfile Path: ./Dockerfile
Health Check Path: /api/health
```

Environment variables:

```env
PORT=4001
FRONTEND_URL=https://your-frontend.vercel.app
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=media
ADMIN_API_KEY=long-random-secret
```

Do not commit `.env`. Rotate `SUPABASE_SERVICE_ROLE_KEY` if it was exposed.
