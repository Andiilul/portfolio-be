# Admin Auth Plan

Current state:

```text
ADMIN_API_KEY protects admin endpoints.
```

This is acceptable for backend testing and early API work, but it should not be exposed in the browser. When the admin dashboard is built in the frontend repo, avoid storing `ADMIN_API_KEY` in `NEXT_PUBLIC_*`.

Recommended next auth upgrade:

```text
1. Admin login page in Next.js
2. Login request goes to NestJS
3. NestJS verifies admin credentials or Supabase Auth JWT
4. NestJS issues httpOnly cookie or validates Supabase JWT
5. Admin endpoints use JWT/cookie guard instead of ADMIN_API_KEY
```

Good production direction:

```text
Supabase Auth for login
NestJS JWT verification for admin endpoints
Allow only configured admin email(s)
```

Keep `ADMIN_API_KEY` as a temporary internal fallback only.
