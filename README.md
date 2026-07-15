# Roman Shrestha Portfolio

Next.js App Router portfolio with the Northern Signal public theme and a protected Signal Control admin workspace.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The public portfolio works with bundled fallback project data before Supabase is configured.

## Enable Signal Control

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Create the admin account in Supabase Authentication.
4. Add the values from `.env.example` to `.env.local`.
5. Set `ADMIN_EMAIL` to the only account permitted to manage content.
6. Open `/admin/login`, sign in, and import the existing project data.

The Supabase secret key belongs only in server and deployment environment variables. Never prefix it with `NEXT_PUBLIC_`.

## Admin features

- Authenticated, allowlisted admin access
- Project create, edit, delete, draft, publish, feature, and ordering controls
- Existing-project database import
- Supabase Storage media uploads
- Contact-message inbox and read state
- Environment readiness view
- Public content cache refresh after publishing

## Media library migration

Existing Supabase projects must run `supabase/migrations/20260715_media_library.sql` once in the Supabase SQL Editor. The migration adds searchable media metadata and raises the portfolio-media bucket limit to 10 MB.

The media workflow converts uploads to WebP, creates a thumbnail, records dimensions and compression size, and prevents deletion while a project still uses the image.

## Commands

```bash
npm run dev
npm run typecheck
npm run build
npm start
```

Deploy to a host with a Next.js server runtime, such as Vercel. Static GitHub Pages hosting cannot run authentication, the admin workspace, contact API, or publishing actions.
