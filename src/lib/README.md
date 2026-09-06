# Shared application code

Import the specific module you need. There is no root barrel export, so browser code cannot accidentally pull in filesystem loaders.

| Folder | Responsibility |
| --- | --- |
| `appearance/` | Server loaders and validation for speciality Markdown content |
| `content/` | Doctor and resource Markdown loading and template substitution |
| `doctor/` | Name formatting, chamber parsing, appointment actions |
| `i18n/` | Interface translations and language options |
| `navigation/` | Menu definitions and active-route matching |
| `site/` | Public deployment URL and asset base path |

## Content loading

`content/loaders.ts` reads from `content/site.md` and `content/{language}/`, including `resources/*.md`. Use it from server components and build code. `loadDoctorContentByLanguage()` supplies the language provider with the complete content at build time; client components read that provider through `useDoctorContent()` or `useContentLanguage()`.

Shared domain, content and UI types live in `src/lib/types.ts` and use `import type`. Component-specific props are private to their component files. `DoctorSectionKey` identifies the ordinary Markdown sections, excluding collections such as services and resources.

Filesystem functions use `load…` names, such as `loadDoctorContent`, `loadContentSection`, and `loadSiteSettings`. `listContentLanguages()` discovers profile languages. Resource-only translations do not enable incomplete profile languages.

## Pure helpers

`doctor/name.ts` formats identity fields with `formatDoctorName()` and `formatDoctorShortName()`. `content/templates.ts` resolves placeholders recursively without reading files.

Tests live beside the code they cover in `*.test.ts` files.

## Deployment configuration

`site/deployment.ts` exports `SITE_URL` and `BASE_PATH`, using `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH`. These public values are baked into the static build. `next.config.ts` reads the same base-path environment variable for routing.

The application version comes from `package.json`. `run.sh` uses port 3010 by default and accepts `PORT`; plain `npm run dev` uses the framework default port.

## Speciality appearance content

Edit `content/appearance/speciality-themes.md` for the nine speciality themes and neutral fallback, and `content/appearance/speciality-labels.md` for English, Bengali, and Hindi labels. Values live in YAML frontmatter; keep the existing speciality keys and quote hex colors. Theme entries include colors, gradient classes, icon, label, and description.

The root layout loads and validates these files at build time and passes them to `SpecialityProvider`. Browser components use `useSpeciality().configuration`; do not import filesystem loaders into client components. Missing themes, invalid colors, and incomplete translations fail the build with the offending field. Rebuild after content changes. Tailwind explicitly scans the theme Markdown for gradient classes.
