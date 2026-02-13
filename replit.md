# IdeaForge - AI-Powered PM Toolkit

## Overview

IdeaForge is a full-stack AI-powered Product Management toolkit that transforms rough product ideas into structured PRDs, user stories, sprint plans, and more. It provides six specialized AI tools: PRD Generator, User Story Generator, Problem Refiner, Feature Prioritizer, Sprint Planner, and Interview Prep. The app features a dark "command center" UI aesthetic with inline editing, version history, shareable links, and Markdown/PDF export capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework:** React 18 with TypeScript, bundled by Vite
- **Routing:** Wouter (lightweight client-side router)
- **State Management:** TanStack React Query for server state; local React state for UI
- **UI Components:** shadcn/ui (new-york style) built on Radix UI primitives with Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- **Styling:** Dark-mode-first custom theme using CSS variables defined in `client/src/index.css`. Fonts: Space Grotesk (headings), JetBrains Mono (monospace), Inter (body). Uses Framer Motion for animations.
- **Path Aliases:** `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`
- **Structure:** Pages live in `client/src/pages/`, reusable components in `client/src/components/`. The `ToolLayout` component is a shared layout for all six AI tools, handling input, API calls, and result display.

### Backend
- **Framework:** Express 5 on Node.js with TypeScript (run via `tsx` in dev)
- **API Pattern:** RESTful JSON API under `/api/` prefix. Routes defined in `server/routes.ts`.
- **AI Integration:** OpenAI SDK (`gpt-4o` model) via Replit AI Integrations. Environment variables `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL` configure the client. All AI generation functions live in `server/openai.ts`.
- **Build:** Custom build script (`script/build.ts`) uses Vite for client and esbuild for server. Production output goes to `dist/` with server as `dist/index.cjs` and client assets in `dist/public/`.

### Database
- **Database:** PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- **ORM:** Drizzle ORM with `drizzle-zod` for schema validation
- **Schema:** Defined in `shared/schema.ts`. Tables include:
  - `prds` — Generated PRDs with title, idea, content, shareId, timestamps
  - `prd_versions` — Version history snapshots for PRDs (linked via `prd_id` FK)
  - `tool_results` — Results from non-PRD tools (user stories, problem refiner, etc.) with toolType, input, output, shareId
  - `templates` — Saved PRD templates with name, description, idea
  - `conversations` / `messages` — Chat conversation history (used by Replit integrations)
- **Migrations:** Managed via `drizzle-kit push` (`npm run db:push`)
- **Storage Layer:** `server/storage.ts` implements the `IStorage` interface using `DatabaseStorage` class with Drizzle queries

### Replit Integrations
Pre-built integration modules exist in `server/replit_integrations/` and `client/replit_integrations/`:
- **Chat:** Conversation CRUD and OpenAI chat completions
- **Audio:** Voice recording, playback, speech-to-text, text-to-speech with AudioWorklet
- **Image:** Image generation via `gpt-image-1`
- **Batch:** Batch processing utilities with rate limiting and retries

### Key API Endpoints
- `GET/POST /api/prds` — List and create PRDs
- `POST /api/prds/generate` — Generate PRD from idea (min 20 chars)
- `PATCH /api/prds/:id` — Update PRD content (creates version snapshot)
- `POST /api/prds/:id/share` — Generate shareable link
- `GET /api/prds/:id/versions` — Get version history
- `POST /api/tools/user-stories/generate` — Generate user stories
- `POST /api/tools/refine-problem/generate` — Refine problem statement
- `POST /api/tools/prioritize-features/generate` — RICE feature prioritization
- `POST /api/tools/sprint-planner/generate` — Sprint planning
- `POST /api/tools/interview-prep/generate` — PM interview prep

### Dev vs Production
- **Development:** Vite dev server with HMR proxied through Express. Run with `npm run dev`.
- **Production:** Client built to static files, served by Express static middleware with SPA fallback. Run with `npm run build && npm start`.

## External Dependencies

- **PostgreSQL** — Primary database, required via `DATABASE_URL` environment variable
- **OpenAI API** — Powers all AI generation features (PRD, user stories, problem refining, etc.). Configured via `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL`. Uses `gpt-4o` model.
- **Replit AI Integrations** — OpenAI access is proxied through Replit's AI integration layer
- **Google Fonts** — Space Grotesk, JetBrains Mono, Inter loaded via CDN
- **Key npm packages:** `drizzle-orm`, `drizzle-zod`, `express`, `openai`, `@tanstack/react-query`, `wouter`, `framer-motion`, `zod`, `nanoid`, `react-day-picker`, `recharts`, `vaul`, `cmdk`