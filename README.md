# RxProfile

A multilingual doctor profile website built with Next.js, React and Tailwind CSS. Doctor information and resource pages live in Markdown; the site exports static files with no database.

## Reuse for another doctor

Run `npm run create:doctor -- ../new-doctor --name "Dr. Alex Morgan" --speciality cardiology` to create a separate, clean starter. See [the new-doctor setup guide](docs/new-doctor.md) for content, languages, branding, booking and deployment.

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
    types.ts           Shared application types
content/
  README.md            Start here: doctor-friendly editing guide
  doctor/              Routine updates by doctors and practice staff
    contact.md         Shared phone, email and booking details
    photo.md           Portrait path
    en/, bn/           Profile, chamber, career, services and reviews
  pages/               Website headings, instructions and resource wording
    en/, bn/, hi/      Language-specific page files
  settings/            Site configuration and appearance for the maintainer
public/                Static assets and service worker
```

See [the library guide](src/lib/README.md) for module boundaries and function naming, and [doctor name templates](docs/doctor-name.md) for reusable identity placeholders.

## Editing content

Start with [the content editing guide](content/README.md). Edit `content/doctor/contact.md` for shared contact details and `content/doctor/{language}/chamber.md` for chamber details, `content/doctor/{language}/profile.md` for personal information, and `content/doctor/{language}/reviews.md` for feedback. Localized page files contain page wording; service files are the source for Services and the homepage service list. Technical settings and the developer inquiry remain in `content/settings/site.md`.

[The content audit](content/CONTENT-AUDIT.md) lists existing placeholders and facts that need confirmation.

The language selector enables languages with both a profile page file and a doctor details file. Hindi resource files alone do not enable Hindi across the website. Interface labels live in `src/lib/i18n/translations.ts`.

Rebuild after changing content to update the static export.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the full public website URL and `NEXT_PUBLIC_BASE_PATH` to the deployment subdirectory (or leave it empty for a domain root). The public URL defaults to `content/settings/site.md`; the base path is also read by `next.config.ts`.

```bash
npm run build
```

Deploy the generated `out/` directory to a static host. The GitHub Actions workflow supplies the GitHub Pages URL and base path during its build.

The displayed application version comes from `package.json`.
