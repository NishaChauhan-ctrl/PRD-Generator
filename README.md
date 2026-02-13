# ScopeCreep — AI-Powered PM Toolkit

> *Finally, an AI that embraces the inevitable.*

ScopeCreep is a full-stack AI-powered Product Management toolkit that transforms rough product ideas into structured PRDs, user stories, sprint plans, and more. Built with React, Express, PostgreSQL, and OpenAI.

---

## **DEMO**


## Features

ScopeCreep includes **6 specialized AI tools** for product managers:

| Tool | What It Does |
|------|-------------|
| **PRD Generator** | Turns a rough product idea into a comprehensive Product Requirements Document |
| **User Story Generator** | Converts feature lists into detailed user stories with acceptance criteria |
| **Problem Refiner** | Refines vague problem statements into clear, actionable definitions |
| **Feature Prioritizer** | Scores and ranks features using the RICE framework (Reach, Impact, Confidence, Effort) |
| **Sprint Planner** | Creates structured sprint plans with task breakdowns and risk assessments |
| **Interview Prep** | Generates PM interview questions and model answers for a given product domain |

### Additional Capabilities

- **Database persistence** — All generated content is saved and retrievable
- **Version history** — PRDs track edit history with restore support
- **Shareable links** — Generate unique share links for any PRD or tool result
- **Inline editing** — Edit generated PRDs directly in the app
- **Copy to clipboard** — One-click copy for any generated output
- **Dark mode UI** — "Command center" aesthetic with Space Grotesk, JetBrains Mono, and Inter fonts

---

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for bundling and HMR
- **Tailwind CSS v4** with dark-mode-first custom theme
- **shadcn/ui** (Radix UI primitives)
- **Framer Motion** for animations
- **TanStack React Query** for server state
- **Wouter** for client-side routing

### Backend
- **Express 5** on Node.js with TypeScript
- **OpenAI SDK** (`gpt-4o` model) for all AI generation
- **Drizzle ORM** with PostgreSQL
- **Zod** for request validation

### Database
- **PostgreSQL** with the following tables:
  - `prds` — Generated PRDs with title, idea, content, share ID, timestamps
  - `prd_versions` — Version history snapshots for PRDs
  - `tool_results` — Output from all non-PRD tools (user stories, sprint plans, etc.)
  - `templates` — Saved PRD templates

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- OpenAI API key

### Installation

```bash
# Clone the repo
git clone https://github.com/NishaChauhan-ctrl/PRD-Generator.git
cd PRD-Generator

# Install dependencies
npm install

# Set up environment variables
# DATABASE_URL=your_postgres_connection_string
# OPENAI_API_KEY=your_openai_api_key (or use Replit AI Integrations)

# Push the database schema
npm run db:push

# Start development server
npm run dev
```

The app runs on `http://localhost:5000`.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      # Sidebar, app layout
│   │   │   ├── tools/       # ToolLayout (shared tool UI)
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Home.tsx     # Dashboard with tool cards
│   │   │   └── Tools.tsx    # All 6 tool page components
│   │   ├── hooks/           # Custom React hooks
│   │   └── lib/             # API client, utilities
│   └── index.html
├── server/
│   ├── index.ts             # Express server entry
│   ├── routes.ts            # All API route definitions
│   ├── openai.ts            # OpenAI generation functions
│   ├── storage.ts           # Database operations (Drizzle)
│   └── vite.ts              # Vite dev server integration
├── shared/
│   └── schema.ts            # Drizzle ORM schema + Zod types
├── drizzle.config.ts        # Drizzle Kit configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## API Endpoints

### PRDs
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/prds` | List all PRDs |
| `GET` | `/api/prds/:id` | Get a single PRD |
| `POST` | `/api/prds/generate` | Generate a new PRD from an idea |
| `PATCH` | `/api/prds/:id` | Update PRD content (saves version) |
| `DELETE` | `/api/prds/:id` | Delete a PRD |
| `POST` | `/api/prds/:id/share` | Generate a shareable link |
| `GET` | `/api/prds/:id/versions` | Get version history |
| `POST` | `/api/prds/:id/versions/:versionId/restore` | Restore a previous version |

### AI Tools
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/tools/user-stories/generate` | Generate user stories |
| `POST` | `/api/tools/refine-problem/generate` | Refine a problem statement |
| `POST` | `/api/tools/prioritize-features/generate` | RICE feature prioritization |
| `POST` | `/api/tools/plan-sprint/generate` | Generate sprint plan |
| `POST` | `/api/tools/interview-prep/generate` | PM interview prep |
| `POST` | `/api/tools/rewrite-section` | AI rewrite of a specific section |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/shared/:shareId` | View shared PRD/result |
| `GET` | `/api/tool-results` | List all tool results |
| `GET` | `/api/templates` | List saved templates |
| `POST` | `/api/templates` | Create a template |

---

## License

MIT
