# Roman Shrestha Portfolio

A full-stack portfolio and content-management system built with Next.js, React, TypeScript, Supabase, Tailwind CSS, and Framer Motion.

The public website uses the atmospheric **Northern Signal** design system. The private **Signal Control** workspace manages projects, media, publishing state, and contact messages without editing source files.

**Live website:** [romanshrestha.info](https://romanshrestha.info)

## Contents

- [Overview](#overview)
- [Features](#features)
- [Technology](#technology)
- [Architecture](#architecture)
- [Local development](#local-development)
- [Supabase setup](#supabase-setup)
- [Environment variables](#environment-variables)
- [Admin workflow](#admin-workflow)
- [Media workflow](#media-workflow)
- [Contact workflow](#contact-workflow)
- [Security model](#security-model)
- [Commands](#commands)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Project structure](#project-structure)

## Overview

This repository contains two connected experiences:

### Public portfolio

- Full-screen, image-led hero
- Selected project presentations
- Additional project archive
- Project case-study modal
- About and capabilities sections
- Responsive light and dark themes
- Contact form
- Server-rendered project content
- Database fallback for local or unconfigured environments
- Search and social metadata

### Signal Control

Signal Control is a protected admin workspace available at `/admin`.

It provides:

- Passwordless email OTP authentication
- Admin-email allowlisting
- Project creation and editing
- Draft and published states
- Featured-project selection
- Display ordering
- Existing-project data import
- Searchable media library
- Automatic image optimization
- Direct media picker inside the project editor
- Contact-message inbox
- Read and unread message state
- Environment-readiness checks

## Features

### Project management

- Create, update, publish, unpublish, order, feature, and delete projects
- Store structured project facts, links, tags, and case-study content
- Keep unfinished projects hidden as drafts
- Refresh the public homepage cache after publishing
- Import the original bundled project collection into Supabase
- Preserve support for legacy local image paths

### Media library

- Drag-and-drop image upload
- Upload preview and progress indicator
- PNG, JPEG, WebP, and AVIF input
- Maximum input size of 12 MB
- Automatic orientation correction
- Automatic WebP conversion
- Full image resized to a maximum of 2400×2400
- Automatic 640×420 thumbnail generation
- Compression and storage statistics
- Search by filename, alt text, or tag
- Editable alt text and tags
- Copyable public URLs
- Safe Storage and database deletion
- Deletion protection when a project still uses an asset
- Direct image selection from the project editor

### Contact inbox

- Server-side contact validation with Zod
- Messages stored in PostgreSQL
- Admin inbox with timestamps
- Direct email reply links
- Read and unread state
- Safe failure when the backend is not configured

### Accessibility and interaction

- Keyboard-accessible navigation and dialogs
- Escape-key modal closing
- Visible focus states
- Reduced-motion support
- Screen-reader labels
- Image alt-text management
- Responsive layouts for mobile and desktop

## Technology

| Area | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| UI | React 19 and TypeScript |
| Styling | Tailwind CSS 3 and custom CSS |
| Motion | Framer Motion |
| Icons | Lucide React |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| Storage | Supabase Storage |
| Validation | Zod |
| Image processing | Sharp |
| Recommended hosting | Vercel |

## Architecture

```text
Browser
├── Public portfolio
│   └── Next.js Server Component
│       └── Published projects from Supabase
│           └── Bundled projects.js fallback
│
└── Signal Control
    ├── Supabase passwordless OTP authentication
    ├── Session cookies refreshed by proxy.ts
    ├── ADMIN_EMAIL authorization
    ├── Next.js Server Actions
    └── Protected API routes
        ├── Project mutations
        ├── Media processing and storage
        └── Contact-message storage
```

### Supabase clients

The project intentionally uses separate clients for separate trust levels:

- `src/lib/supabase/browser.ts` uses the publishable key for browser authentication.
- `src/lib/supabase/server.ts` reads and refreshes authenticated sessions through cookies.
- `src/lib/supabase/admin.ts` uses the secret key for trusted server operations.

The secret client is never imported into a Client Component.

### Project data fallback

The public website can run before Supabase is configured:

```text
Supabase configured and contains published projects?
├── Yes → render database projects
└── No  → render src/data/projects.js
```

This allows the public portfolio to remain available during initial setup or backend maintenance.

## Local development

### Requirements

- Node.js 20 or newer
- npm
- A Supabase project for admin functionality

### Install

```bash
git clone https://github.com/romanshrestha20/portfolio.git
cd portfolio
npm install
```

Copy the environment template:

```bash
cp .env.example .env.local
```

Start development mode:

```bash
npm run dev
```

Open:

```text
Public portfolio: http://localhost:3000
Admin login:      http://localhost:3000/admin/login
```

If port 3000 is occupied:

```bash
npm run dev -- -p 3001
```

Restart the development server after changing `.env.local`.

## Supabase setup

### Create a project

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. Choose a nearby region.
3. Store the generated database password securely.
4. Wait for project provisioning to finish.

### Fresh Supabase project

For a brand-new database:

1. Open **SQL Editor**.
2. Create a new query.
3. Copy the complete contents of `supabase/schema.sql`.
4. Run the query.

The schema creates:

- `projects`
- `messages`
- `site_settings`
- `media_assets`
- `resume_assets`
- `personal_details_history`
- `portfolio-media` Storage bucket
- Row Level Security configuration
- Public read policy for portfolio media

### Existing Supabase project

If the original portfolio schema was already installed before the media library was added, run:

```text
supabase/migrations/20260715_media_library.sql
```

This adds `media_assets` and updates the Storage bucket configuration.

To enable admin-managed résumé PDFs on an existing project, also run:

```text
supabase/migrations/20260718_resume_assets.sql
```

This adds `resume_assets` and permits PDFs in the existing public media bucket.

To record and restore every published personal-details revision, also run:

```text
supabase/migrations/20260802_personal_details_history.sql
```

This creates the revision archive and a database trigger that captures changes
to `site_settings.content.personalDetails`.

Do not run the media migration separately on a fresh project after running the latest `schema.sql`; the current full schema already includes it.

### Create the admin account

1. Open **Authentication → Users**.
2. Select **Add user**.
3. Create a user with the admin email. A password is not used by the application.
4. Confirm the user’s email.
5. Set `ADMIN_EMAIL` to that exact email address.
6. Disable public registration if the project is only for portfolio administration.

Supabase generates the one-time code and Resend delivers the login email.
Configure a verified Resend sending domain before production. The login UI
enforces a 60-second resend cooldown.

### Obtain API credentials

Open the Supabase project’s **Connect** dialog or **Settings → API Keys**.

Use the current key formats:

```text
Publishable key: sb_publishable_...
Secret key:      sb_secret_...
```

The publishable key is safe for browser authentication. The secret key bypasses Row Level Security and must only exist in trusted server environments.

## Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
SUPABASE_SECRET_KEY=sb_secret_YOUR_KEY
ADMIN_EMAIL=your-admin-email@example.com
RESEND_API_KEY=re_YOUR_KEY
AUTH_EMAIL_FROM=Signal Control <auth@your-verified-domain.example>
```

| Variable | Purpose | Browser-visible |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Authentication and public Supabase client | Yes |
| `SUPABASE_SECRET_KEY` | Privileged server database and Storage operations | No |
| `ADMIN_EMAIL` | Restricts admin access to one account | No |
| `RESEND_API_KEY` | Delivers passwordless login and contact emails | No |
| `AUTH_EMAIL_FROM` | Verified sender for login emails; falls back to `CONTACT_EMAIL_FROM` | No |

Never:

- Prefix the secret key with `NEXT_PUBLIC_`
- Commit `.env.local`
- Paste the secret key into browser code
- Share the secret key in screenshots, messages, or issue reports

If a secret key is exposed, rotate it immediately in Supabase and update every deployment environment.

## Admin workflow

### Sign in

Open `/admin/login`, enter the configured admin email, and enter the six-digit
code delivered by Resend. Supabase generates and verifies the code. It expires
according to the Supabase Auth settings and cannot be reused after verification.

Successful access requires:

1. A valid Supabase session
2. An email matching `ADMIN_EMAIL`

### Import existing projects

When the `projects` table is empty:

1. Open `/admin`.
2. Select **Import existing projects**.
3. Open `/admin/projects`.
4. Review project status, featured state, and display order.

The import reads `src/data/projects.js` and creates database records.

### Create or edit a project

Project fields include:

- Name, ID, slug, and issue number
- Summary and technologies
- Project image
- Role, focus, and format
- Case-study kicker, headline, and sections
- Live and repository URLs
- Draft or published status
- Featured state
- Display order

Use lowercase, URL-safe slugs:

```text
community-help-platform
hamro-pasal
clean-sync
```

Published project changes call `revalidatePath("/")` so the public portfolio refreshes without a full redeployment.

## Media workflow

### Publish a résumé

1. Open `/admin/settings`.
2. Choose a PDF up to 12 MB.
3. Select **Upload & publish**.

Each upload is stored under `resumes/{asset-id}.pdf` and becomes the live homepage résumé. Previous versions remain in the Settings history and can be restored with **Make active**.

### Upload an image

1. Open `/admin/media`.
2. Drop an image into the upload area or choose a file.
3. Add descriptive alt text.
4. Add comma-separated tags.
5. Select **Optimize and upload**.

The server produces:

```text
projects/{asset-id}/image.webp
projects/{asset-id}/thumbnail.webp
```

Metadata is saved in `media_assets`, including dimensions, original size, optimized size, alt text, and tags.

### Select media inside the project editor

1. Create or edit a project.
2. Find **Project image**.
3. Select **Choose image** or **Change image**.
4. Search by filename, alt text, or tag.
5. Select an asset.
6. Save the project.

The public URL is submitted automatically through the project form. No URL copying is required.

### Delete media

Media deletion removes both the optimized image and thumbnail from Storage, then removes the database record.

Deletion is blocked if a project still references the image. Replace the project image first, then delete the unused asset.

## Contact workflow

The public form posts to:

```text
POST /api/contact
```

The API:

1. Validates the payload with Zod.
2. Rejects invalid submissions.
3. Stores valid submissions in `messages`.
4. Sends an email notification through Resend when email credentials are configured.
5. Makes them available under `/admin/messages`.

Database storage is the source of truth. If Resend is unavailable or not configured, the saved message remains available in the admin inbox. When Supabase is not configured, production contact requests fail safely instead of exposing credentials or silently discarding messages.

To enable notifications, create a Resend API key, verify a sending domain, and configure:

```text
RESEND_API_KEY
CONTACT_EMAIL_FROM
CONTACT_EMAIL_TO
```

`CONTACT_EMAIL_FROM` must use the domain verified in Resend. `CONTACT_EMAIL_TO` is optional and falls back to `ADMIN_EMAIL`. Notification emails set the visitor's address as `Reply-To`, so replying from your inbox responds directly to them.

## Security model

- All sensitive mutations run on the server.
- Every Server Action performing a mutation calls `requireAdmin()`.
- Media APIs independently verify the authenticated admin.
- `ADMIN_EMAIL` provides an additional allowlist beyond authentication.
- Admin authorization fails closed when `ADMIN_EMAIL` is missing.
- Magic-link requests do not reveal whether an email is allowlisted.
- Post-login redirects are limited to local application paths.
- Database tables have Row Level Security enabled.
- Browser clients receive only the publishable key.
- The secret key is restricted to server modules.
- Media uploads validate MIME type and size.
- Sharp rejects invalid image input and limits decoded pixels.
- Partial upload failures are rolled back from Storage.
- Media deletion checks project usage first.

Hiding admin buttons is not treated as authorization. Permission checks happen at the server boundary.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Next.js development mode |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run build` | Create and verify the production build |
| `npm start` | Start the production server |

Recommended pre-commit verification:

```bash
npm run typecheck && npm run build
```

## Deployment

The application requires a Next.js server runtime. Static GitHub Pages hosting cannot run:

- Supabase session handling
- Server Actions
- Admin routes
- Contact API
- Media upload and processing
- On-demand cache revalidation

### Vercel

1. Import the GitHub repository into Vercel.
2. Confirm that Vercel detects Next.js.
3. Add the Supabase, admin, and Resend environment variables.
4. Deploy.
5. Test `/admin/login`, project publishing, media upload, and contact submission.
6. Add `romanshrestha.info` under project domains.
7. Follow Vercel’s DNS instructions.

Add these variables to the deployment environment:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY
ADMIN_EMAIL
RESEND_API_KEY
AUTH_EMAIL_FROM
CONTACT_EMAIL_FROM
CONTACT_EMAIL_TO
```

After deployment, set the Supabase Authentication Site URL to the production domain.

The legacy GitHub Pages workflow should be removed or disabled before merging the Next.js deployment branch.

## Troubleshooting

### Admin says Supabase variables are missing

- Confirm all variables exist in `.env.local`.
- Check spelling and capitalization.
- Restart the development server.
- For `npm start`, rebuild after adding public variables:

```bash
npm run build
npm start
```

### Admin redirects back to login

- Confirm the Supabase user exists and is email-confirmed.
- Confirm `ADMIN_EMAIL` matches the user.
- Confirm the project URL and publishable key belong to the same project.
- Clear local cookies and sign in again.

### Projects do not appear in admin

- Run `supabase/schema.sql`.
- Use **Import existing projects** from `/admin`.
- Check the `projects` table in Supabase.

### Public site still uses bundled projects

The fallback is used when Supabase is unavailable or has no published project records. Confirm at least one database project has:

```text
status = published
```

### Media page reports setup required

Run:

```text
supabase/migrations/20260715_media_library.sql
```

Then refresh `/admin/media`.

### Media upload fails

- Confirm `portfolio-media` exists.
- Confirm `SUPABASE_SECRET_KEY` is valid.
- Confirm the input is PNG, JPEG, WebP, or AVIF.
- Confirm the file is under 12 MB.
- Confirm `media_assets` exists.

### Contact form returns 503

The server cannot create a privileged Supabase client. Verify:

```text
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SECRET_KEY
```

### Production changes do not appear

- Restart an existing `npm start` process after rebuilding.
- Confirm the project is published rather than draft.
- Save the project again to trigger homepage revalidation.

## Project structure

```text
portfolio/
├── public/                         Static images and icons
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── (workspace)/
│   │   │   │   ├── media/         Media library
│   │   │   │   ├── messages/      Contact inbox
│   │   │   │   ├── projects/      Project CRUD
│   │   │   │   └── settings/      Environment checks
│   │   │   ├── actions.ts         Protected Server Actions
│   │   │   └── login/              Admin authentication
│   │   ├── api/
│   │   │   ├── admin/media/        Media upload, edit, and deletion
│   │   │   └── contact/            Public contact endpoint
│   │   ├── layout.tsx              Metadata, fonts, and root layout
│   │   └── page.tsx                Public portfolio
│   ├── components/
│   │   ├── admin/                  Project editor and media tools
│   │   ├── about/
│   │   ├── contact/
│   │   ├── footer/
│   │   ├── home/
│   │   ├── navbar/
│   │   ├── projects/
│   │   └── skills/
│   ├── data/projects.js            Pre-database fallback content
│   ├── lib/
│   │   ├── supabase/               Browser, session, and secret clients
│   │   ├── auth.ts                 Admin verification
│   │   ├── media.ts                Media data layer
│   │   └── projects.ts             Project data layer
│   ├── types/                      Shared TypeScript models
│   ├── index.css                   Public and admin design systems
│   └── proxy.ts                    Supabase session refresh
├── supabase/
│   ├── migrations/                 Incremental database changes
│   └── schema.sql                  Complete fresh-project schema
├── .env.example                    Environment template
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
└── tsconfig.json
```

## Future improvements

- Draft project preview
- Structured case-study blocks
- Autosave and unsaved-change protection
- Media usage filters and relationship tracking
- Direct upload within the media-picker dialog
- Project revision history
- SEO editor and social-card preview
- Contact spam protection and rate limiting
- Privacy-conscious project analytics
- Scheduled publishing

## License

This portfolio and its content are maintained by Roman Shrestha. Project source repositories linked from the portfolio may use their own licenses.

## Contact

- Website: [romanshrestha.info](https://www.romanshrestha.info)
- GitHub: [github.com/romanshrestha20](https://github.com/romanshrestha20)
- LinkedIn: [linkedin.com/in/romanshrr](https://www.linkedin.com/in/romanshrr/)
- Email: [stha.roman20@outlook.com](mailto:stha.roman20@outlook.com)
