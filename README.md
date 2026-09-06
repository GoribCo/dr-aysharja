# RxProfile

A multilingual doctor profile website built with Next.js, React and Tailwind CSS. Doctor information and resource pages live in Markdown; the site exports static files with no database.

## Development

```bash
npm install
npm run dev
```

Or run `./run.sh` to install dependencies when needed and start on port 3010. Use `PORT=3000 ./run.sh` to override that port.

## Project structure

```text
src/
  app/                 Pages and page-specific client components
  components/          Shared UI, navigation and preference providers
  hooks/               Client access to loaded doctor content
  lib/
    appearance/        Speciality themes and labels
    content/           Markdown loaders and templates
    doctor/            Names, chambers and appointment helpers
    i18n/              Interface translations
    navigation/        Menu definitions and route matching
    site/              Deployment URL and base path
    types.ts           All shared types and component props
content/
  site.md              Shared doctor-site settings
  en/                  English profile and service content
    resources/         Privacy, terms, FAQ and help Markdown
  bn/                  Bengali profile, services and resources
  hi/resources/        Prepared Hindi resource translations
public/                Static assets and service worker
```

See [the library guide](src/lib/README.md) for module boundaries and function naming, and [doctor name templates](docs/doctor-name.md) for reusable identity placeholders.

## Editing content

Edit `content/site.md` for shared contact, booking, image and SEO settings. Edit `content/{language}/*.md` for localized profile pages and `content/{language}/services/*.md` for services. Resource text belongs in `content/{language}/resources/{privacy,terms,faq,help}.md`.

The language selector enables languages with a profile file. Hindi resource files alone do not enable Hindi across the website. Interface labels live in `src/lib/i18n/translations.ts`.

Rebuild after changing content to update the static export.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the full public website URL and `NEXT_PUBLIC_BASE_PATH` to the deployment subdirectory (or leave it empty for a domain root). The shared defaults live in `src/lib/site/deployment.ts`; the base path is also read by `next.config.ts`.

```bash
npm run build
```

Deploy the generated `out/` directory to a static host. The GitHub Actions workflow supplies the GitHub Pages URL and base path during its build.

The displayed application version comes from `package.json`.
