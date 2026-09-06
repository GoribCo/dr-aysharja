# RxProfile — Project Knowledge

## What This Is

A mobile-first language learning website. No database — all content is plain Markdown files. Deployable to GitHub Pages as a fully static site.

## Tech Stack

- **Next.js 15** — App Router, `output: 'export'` (static), `trailingSlash: true`
- **React 19**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` in globals.css, NOT `@tailwind base/components/utilities`
- **gray-matter** — parses Markdown frontmatter
- **react-markdown + remark-gfm** — renders Markdown with table support
- TypeScript throughout

## Critical: Tailwind v4 Dark Mode

Dark mode uses the `.dark` class on `<html>`, NOT the media query. This requires:

```css
/* src/app/globals.css */
@import "tailwindcss";
@variant dark (&:is(.dark *));
```

Without `@variant dark`, all `dark:` utility classes are silently ignored.

## Project Structure

```
rxprofile/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout — wraps ThemeProvider + BottomNav
│   │   ├── page.tsx                    # Home page (server) → renders HomeClient
│   │   ├── HomeClient.tsx              # 'use client' — language selector dropdowns
│   │   ├── globals.css                 # Tailwind v4 + dark mode variant + prose styles
│   │   ├── [pair]/page.tsx             # Level selection (A1–C2) — server component
│   │   ├── [pair]/[level]/page.tsx     # Stage list — server component
│   │   ├── [pair]/[level]/[stage]/
│   │   │   ├── page.tsx                # Stage content — server component
│   │   │   └── StageContent.tsx        # 'use client' — renders react-markdown
│   │   ├── courses/page.tsx            # All courses list — bottom nav "Courses" points here
│   │   └── settings/page.tsx           # Settings page
│   ├── components/
│   │   ├── BottomNav.tsx               # 'use client' — fixed bottom nav (Home/Courses/Settings)
│   │   ├── ThemeProvider.tsx           # 'use client' — reads localStorage, sets .dark on <html>
│   │   └── ThemeToggle.tsx             # 'use client' — sun/moon toggle, uses useTheme()
│   └── lib/
│       ├── content.ts                  # All fs-based content loaders
│       └── types.ts                    # TypeScript interfaces
├── content/                            # All lesson content lives here
│   ├── languages.json                  # Language definitions + pairs list
│   ├── levels.json                     # CEFR level definitions (A1–C2)
│   ├── bn-de/
│   │   ├── meta.json
│   │   └── a1/ (stage-01.md … stage-05.md)
│   └── bn-pl/
│       ├── meta.json
│       └── a1/ (stage-01.md … stage-05.md)
├── public/.nojekyll                    # Required for GitHub Pages
├── next.config.ts
├── run.sh                              # ./run.sh installs deps + starts dev server
├── CLAUDE.md                           # This file
└── README.md
```

## Routing

| URL | Page |
|-----|------|
| `/` | Home — language selector + available courses |
| `/courses` | All courses list (bottom nav "Courses" links here) |
| `/bn-de` | Level selection for Bengali → German |
| `/bn-pl` | Level selection for Bengali → Polish |
| `/bn-de/a1` | Stage list for A1 |
| `/bn-de/a1/1` | Stage 1 content |
| `/settings` | Settings page |

`generateStaticParams` in all route pages is **data-driven** — reads from `languages.json` / `levels.json` / content filesystem. No hardcoded slugs (except `[level]/page.tsx` which iterates all levels × all pairs).

## Content System (`src/lib/content/loaders.ts`)

Doctor and resource pages load Markdown from `content/site.md` and `content/{language}/`, including `resources/*.md`. Server code uses `loadDoctorContent()` and `loadDoctorContentByLanguage()`; client components read the language provider.

All application types and component props are defined in `src/lib/types.ts` and imported with `import type`. Learning utilities and their unused components have been removed.

## Stage Markdown Format

```markdown
---
stage: 1
title: "Powitania – Greetings"
titleBn: "শুভেচ্ছা"
description: "Short description shown on stage list."
duration: "15 min"
vocabulary: 9
---

## Section heading

Content with **bold**, tables, blockquotes, etc.
```

Files must be named `stage-01.md`, `stage-02.md`, … (zero-padded, sorted alphabetically = correct order).

## Adding a New Language Pair

1. Add to `content/languages.json` → `pairs` array with `from`, `to`, `slug`, `description`, `totalLearners`
2. Create `content/{slug}/meta.json` with `title` (native), `titleEn`, `description`, `totalStages`
3. Create `content/{slug}/a1/stage-01.md` … (at least 1 stage to activate the route)
4. Nothing else — routes generate automatically

## Available Language Pairs

| Slug | From | To | A1 Stages |
|------|------|----|-----------|
| `bn-de` | Bengali 🇧🇩 | German 🇩🇪 | 5 (Greetings, Numbers, Colors, Days, Family) |
| `bn-pl` | Bengali 🇧🇩 | Polish 🇵🇱 | 5 (Greetings, Numbers, Colors, Days, Family) |

## Theme System

- `ThemeProvider` wraps the entire app in `layout.tsx`
- On mount: reads `localStorage.theme`, falls back to `prefers-color-scheme`
- Toggles by adding/removing `.dark` class on `document.documentElement`
- `useTheme()` hook exported from `ThemeProvider.tsx` — use in any client component
- `ThemeToggle` button appears in every page header

## Bottom Navigation

Three items: **Home** (`/`), **Courses** (`/courses`), **Settings** (`/settings`).

Active detection in `BottomNav.tsx`:
- Home: exact match `pathname === '/'`
- Courses: `/courses` OR any `/{xx}-{xx}/...` pattern (regex `^\/[a-z]{2}-[a-z]{2}`)
- Settings: `pathname.startsWith('/settings')`

## Key Decisions & Why

| Decision | Reason |
|----------|--------|
| Static export (`output: 'export'`) | GitHub Pages deployment, no server needed |
| Content in Markdown files | No database setup, version-controllable, portable |
| `src/` directory layout | Standard Next.js 15 convention |
| `@variant dark` in CSS | Tailwind v4 defaults to media query; class-based needed for JS toggle |
| `/courses` page (not `/bn-de` in nav) | BottomNav was hardcoded to one pair — now shows all pairs |
| `process.cwd()` not `__dirname` | Works correctly in Next.js server components |

## Running Locally

```bash
./run.sh          # installs deps if missing, then npm run dev
# or
npm install
npm run dev       # http://localhost:3000
```

## Building / Deploying

```bash
npm run build     # outputs static files to out/
# Deploy out/ to GitHub Pages
# Set basePath in next.config.ts if deploying to a subdirectory
```
