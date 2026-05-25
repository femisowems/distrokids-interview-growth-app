# DistroKid Growth OS

A cinematic, experiment-driven marketing system for music launches.

DistroKid Growth OS is a Next.js 15 App Router workspace for planning, generating, and measuring music release campaigns. It combines AI-assisted launch brief generation, landing page previews, analytics surfaces, experiment tracking, and SEO tooling into a single studio-style interface.

## Stack

- Next.js 15 App Router with typed routes enabled
- TypeScript with strict mode
- Tailwind CSS for layout and component styling
- Framer Motion for page motion and animated reveal states
- Supabase for backend data and schema definitions
- PostHog for product analytics and event tracking
- OpenAI API for launch brief and marketing copy generation
- Zustand for lightweight client state
- React Hook Form and Zod for structured forms and validation

## Product Areas

- Landing experience at `/` with a high-level growth OS overview
- Campaign studio at `/studio` for AI launch brief generation and launch planning
- Experiment dashboards at `/experiments`
- Analytics surfaces at `/analytics`
- SEO utilities at `/seo`
- Internal CMS at `/cms`
- Dynamic release pages at `/landing/[slug]`
- Shared social preview generation for release pages
- API routes for AI generation, experiment assignment, and event tracking

## Pages And Routes

### App Pages

- `/` - main growth OS homepage and launch overview
- `/studio` - campaign studio with the AI launch brief composer
- `/experiments` - experiment planning and winner tracking
- `/analytics` - attribution, funnel, and event snapshot views
- `/seo` - metadata, sitemap, and release SEO tooling
- `/cms` - internal content and campaign management surface
- `/landing/[slug]` - dynamic release landing pages for individual campaigns

### Supporting Routes

- `/api/ai/generate` - generates campaign briefs and other AI-assisted marketing output
- `/api/experiments/assign` - assigns or records experiment variants
- `/api/track` - accepts analytics and product events
- `/robots.txt` - crawler instructions
- `/sitemap.xml` - generated sitemap for public routes
- `/landing/[slug]/opengraph-image` - social preview image generation for release pages

## Repository Layout

- `app/` contains routes, layouts, and route handlers
- `components/` contains shared UI, the shell, and page-level experiences
- `components/ui/` contains button, card, input, tabs, badge, and textarea primitives
- `lib/mock.ts` contains the sample data used to drive the UI surfaces
- `lib/analytics.ts`, `lib/experiments.ts`, `lib/landing-page.ts`, `lib/seo.ts`, and `lib/ai.ts` contain the growth helpers
- `lib/supabase-schema.sql` documents the Supabase schema

## Scripts

- `npm run dev` starts the local Next.js development server
- `npm run build` creates a production build
- `npm run start` runs the production server after build
- `npm run lint` runs ESLint across the workspace
- `npm run typecheck` runs TypeScript without emitting output
- `npm run check` runs linting and type checking together
- `npm run clean` removes build and coverage output

## What’s included

- Immersive launch homepage with a brand-led hero and growth summary
- Campaign studio with AI brief generation and editable output
- Launch preview rendering with dynamic release-specific routes
- Funnel, analytics, and attribution views for launch monitoring
- Experiment dashboards with variant comparison and winning logic
- SEO utilities, metadata helpers, and sitemap generation
- Internal CMS surface for campaign and release operations
- Supabase schema for launch data modeling
- Analytics and AI utility layers for prompt generation and event tracking
- Shared UI primitives and a consistent shell for all app surfaces

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values before running the app.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public base URL used for metadata and canonical generation |
| `NEXT_PUBLIC_POSTHOG_KEY` | Client-side PostHog project key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host endpoint |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Public Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase service role key |
| `OPENAI_API_KEY` | OpenAI API key for launch brief generation |

## Local Development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add the required API keys and project URLs.
4. Start the app with `npm run dev`.
5. Open the studio at `/studio` to generate a launch brief.

## Build And Validate

- Run `npm run check` before committing code changes
- Run `npm run build` to verify the app compiles for production
- Use `npm run clean` if you need to remove generated build output before a fresh run

## Notes

- The project uses mock data in `lib/mock.ts` to keep the UI fully navigable without a live backend.
- Typed routes are enabled in `next.config.mjs`, so route hrefs should match the actual app structure.
- Most surfaces are designed as connected launch operations rather than isolated screens, so cross-linking between studio, analytics, SEO, and CMS is intentional.

## Quick Start

```bash
npm install
npm run dev
```
