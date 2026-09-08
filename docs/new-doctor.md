# Create a website for another doctor

The application is a reusable doctor-profile website. The current doctor's records live under `content/`; they are not built into the page components.

## Create a separate starter

From an existing copy with dependencies installed:

```bash
npm run create:doctor -- ../dr-morgan --name "Dr. Alex Morgan" --speciality cardiology
```

The destination must not exist and must be outside the current project. The command creates a separate project with one English language, neutral page wording, blank contact details, no patient records, a generic portrait, and all six About pages enabled. It does not copy the current doctor's photographs, qualifications, biography, developer inquiry, git history, dependencies or local editor settings. It does not deploy anything.

```bash
cd ../dr-morgan
npm install
npm run dev
```

Supported speciality keys: `medicine`, `dental`, `orthopaedic`, `gynaecology`, `cardiology`, `ent`, `ophthalmology`, `surgery`, `other`. Use `other` and edit the displayed speciality/title for a field outside this list. The speciality label is not a generated claim about qualifications or services: fill in the doctor's verified details.

## Set up the content

| File | What to enter |
| --- | --- |
| `content/settings/site.md` | Public website URL, default language, speciality, brand label/initials, icon and primary color |
| `content/doctor/en/profile.md` | Name, professional title, affiliation, biography, qualifications and spoken languages |
| `content/doctor/photo.md` | Portrait path; put the actual image under `public/` |
| `content/doctor/contact.md` | Phone, email, WhatsApp, optional separate booking number, online booking URL and map coordinates |
| `content/doctor/en/chamber.md` | Chamber name, address, consultation days and hours |
| `content/doctor/en/services/` | Actual services; review each entry and change `visible: false` to `visible: true` |
| `content/doctor/en/experience.md`, `awards.md`, `memberships.md`, `publications.md` | Replace starter wording with verified professional records; set `visible: false` to hide unused pages |
| `content/doctor/en/reviews.md` | Authentic feedback with permission; starts empty |
| `content/pages/en/home.md` and other page files | Introductions and page wording |
| `content/pages/en/resources/` | Review privacy, terms, FAQ and help for this practice |

The website updates shared names, qualifications, contact details and service lists automatically. Hidden sections are omitted from navigation and the sitemap. A visitor's accent-palette selection never changes the doctor's factual speciality.

`branding.monogram` and `branding.shortName` are optional: when empty, the header/sidebar use initials and the short name derived from the doctor's name. The web-app manifest uses the doctor name and branding automatically. The default icon and portrait are generic SVGs. Supply a custom icon with `branding.icon`, using a path under `public/`.

`theme.primary` is a six-digit hex color, for example `'#176f73'`. Choose a color with enough contrast for white button labels. Supported speciality palettes remain editable under `content/settings/appearance/`.

The shared English developer inquiry is optional. It is omitted from a new starter. Add `websiteInquiry` to `settings/site.md` only if this new website should display that contact panel.

## Phone and online booking

Leave `bookingPhone` empty to use the main `phone`. Set `bookingUrl` to a complete HTTPS address for external online appointments. Phone-only, online-only, and both options are supported. If neither is supplied, the appointment page shows an unavailable message instead of a broken booking link. No WhatsApp number is inferred from a phone number.

## Languages

The shared interface currently supports English (`en`), Bengali (`bn`) and Hindi (`hi`). A starter includes English only; it does not invent translations. To enable another language:

1. Copy `content/pages/en/` to `content/pages/bn/` or `content/pages/hi/`, and translate page wording.
2. Copy `content/doctor/en/` to `content/doctor/bn/` or `content/doctor/hi/`, then translate profile, chamber, services, professional records and feedback.
3. Set `defaultLanguage` in `settings/site.md` if that language should be the initial display.

A language is enabled when it has both a profile page and a doctor-details file. Keep its chamber file alongside its doctor profile. Metadata and initial rendering use the configured default language. Adding interface languages beyond en/bn/hi requires translations and a small code extension.

## Publish

Set `url` in `content/settings/site.md` to the complete public address. For a site hosted under a subdirectory, include that subdirectory and set the build base path:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com/dr-morgan NEXT_PUBLIC_BASE_PATH=/dr-morgan npm run build
```

For a site at a domain root, omit `NEXT_PUBLIC_BASE_PATH`. Environment values override the content URL. Deploy `out/` after checking the site. Saving Markdown alone does not publish changes.

GitHub Pages deployment derives the address from the repository owner/name, including `owner.github.io` root repositories. For a custom domain, set the repository variable `SITE_URL` to the complete public address; its pathname sets the base path. Enable GitHub Pages with GitHub Actions in the new repository. Do not copy another site's git remote.

The manifest, asset URLs and service worker honor the base path. Browser preferences and caches are scoped by site path, so sites sharing an origin do not overwrite each other's settings or caches.

## Before publishing

Preview Home, Profile, Services, Appointment, Contact and Resources on mobile and desktop. Confirm the doctor's identity, credentials, phone links, map, schedule and site URL. Replace starter text, review resource policies, and publish only verified professional information and permitted feedback.

The current layout supports one chamber. Multiple independently scheduled chambers require a separate UI change. This remains a file-based static website, not an online editing dashboard.
