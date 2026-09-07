# Updating the doctor's website

Start here. You do not need to edit application code. Most routine changes are in the files below.

## Where to make a change

| What you want to change | File to edit | Pages updated automatically |
| --- | --- | --- |
| Clinic phone, email, WhatsApp, appointment number and map coordinates | [practice.md](practice.md) | Contact and booking links |
| Chamber name, address, opening times and availability | [en/practice.md](en/practice.md) / [bn/practice.md](bn/practice.md) | Home, Appointment and Contact |
| English name, qualifications, job title, biography or spoken languages | [doctor/en.md](doctor/en.md) | Home, Profile, Qualifications and doctor-name references |
| Bengali version of those details | [doctor/bn.md](doctor/bn.md) | The same pages in Bengali |
| Doctor's photograph | [doctor/shared.md](doctor/shared.md) | Home and Profile |
| Career history | [en/experience.md](en/experience.md) / [bn/experience.md](bn/experience.md) | Experience |
| Awards | [en/awards.md](en/awards.md) / [bn/awards.md](bn/awards.md) | Awards |
| Memberships | [en/memberships.md](en/memberships.md) / [bn/memberships.md](bn/memberships.md) | Memberships |
| Publications | [en/publications.md](en/publications.md) / [bn/publications.md](bn/publications.md) | Publications |
| Treatments and services | Files in [en/services/](en/services/) / [bn/services/](bn/services/) | Services; the first six visible services also appear on Home |
| Patient feedback or homepage quotation | [patients/en.md](patients/en.md) / [patients/bn.md](patients/bn.md) | Reviews and the homepage quotation |
| Homepage headings and introductory wording | [en/home.md](en/home.md) / [bn/home.md](bn/home.md) | Home |
| Appointment instructions or contact introduction | `en/appointment.md`, `en/contact.md` and their `bn/` versions | Appointment and Contact |
| FAQ, help, privacy or terms wording | `en/resources/` and `bn/resources/` | Resources |
| Website developer's contact/inquiry | [site.md](site.md), under `websiteInquiry` | Settings, in English for every language |

The doctor's clinic email belongs in **practice.md**. The website developer's email belongs in **site.md**. These serve different purposes.

## Example: change your chamber address and schedule

Open `en/practice.md` and find `chamber`. Change the words after the field names:

```yaml
chamber:
  name: "Your clinic name"
  address: "Your clinic address"
  visitingDays: "Sunday to Thursday"
  visitingHours: "5:00 PM–8:00 PM"
```

Update the corresponding Bengali text in `bn/practice.md`. Home, Appointment and Contact all use these details. There is no separate footer address to maintain. The current site displays one chamber.

In the shared `practice.md`, change `phone` once for the main clinic number. Leave `bookingPhone: ''` empty if booking uses that number. Fill it in only when appointments use a different number. Keep phone numbers inside quotes, including the `+` prefix. `whatsapp` should contain the international number without spaces. Use `latitude: null` and `longitude: null` if the map location is unknown; ask your website maintainer for help with coordinates.

## Example: add a qualification

In `doctor/en.md`, add a line under `qualifications`:

```yaml
qualifications:
  - MBBS
  - D-Ortho
  - "Your additional qualification"
```

Use the corresponding Bengali spelling in `doctor/bn.md`. You do not need to copy the list into Home or Qualifications. The site formats it automatically.

## How to edit safely

1. Change the text after a field name, such as `role: Consultant`. Keep the field name and colon.
2. Keep the `---` lines at the beginning and end of the settings area.
3. Keep the existing indentation. Use spaces, not the Tab key.
4. A field ending in `>-` or `|-` contains several lines. Keep its text indented. `|-` preserves line breaks, such as those in an email message.
5. For text containing a colon or `#`, use double quotes: `visitingHours: "Evening: 5–8 PM"`.
6. Use `''` for an empty text value and `[]` for an empty list. Do not delete required field names.
7. Leave names inside double braces, such as `{{doctorName}}`, unchanged. They are filled in automatically from your doctor details.
8. Save and preview the changes. Ask the website maintainer to rebuild and publish the website. Saving a file alone does not update the live site.

An error during the build means the update has not been published successfully. The new doctor/practice validators identify the file and field to check.

## Services, career details and reviews

For a service, edit `title`, `shortDescription`, and the text below the closing `---`. Lower `order` numbers appear first. Add `visible: false` above the closing `---` to hide a service; use `visible: true` to show it again. This also updates the homepage list. The same visibility field works for professional content pages such as Awards.

Career, award, membership and publication files use ordinary Markdown: `##` starts a section; `-` starts a list item. Replace sample entries with your actual information.

Reviews live in `patients/`, apart from the page labels. Only `status: approved` entries appear. Set other entries to `status: pending` while reviewing them. Keep patient quotations accurate and publish only feedback you have permission to share. A homepage quotation is selected separately using `featuredQuote` and `featuredAuthor`; leave both empty to hide it.

## Languages and less frequently edited files

`en` means English; `bn` means Bengali. Update both versions when the same fact changes. Names and descriptions are not automatically translated. Shared phone numbers, email, portrait and map coordinates are edited only once.

`hi/resources/` contains prepared Hindi resource translations. Hindi is not currently enabled as a complete doctor profile language.

`site.md` and `appearance/` are normally maintained by the website maintainer. `en/qualifications.md`, `bn/qualifications.md`, and the language/speciality summary files contain automatic placeholders. Change their source data rather than replacing the placeholders.

Legacy files `about.md`, `articles.md`, `faq.md`, `languages.md`, `speciality.md`, `sub-speciality.md` and `chamber.md` have no standalone route in the current menu. The public FAQ comes from `resources/faq.md`, and the public biography comes from `doctor/{language}.md`. `languages.json` and `levels.json` are unused remnants of an earlier project; they do not control this doctor's website.

See [CONTENT-AUDIT.md](CONTENT-AUDIT.md) for existing information that needs the doctor's confirmation.

## বাংলা: দ্রুত নির্দেশনা

ফোন নম্বর বদলাতে মূল `practice.md` খুলুন। বাংলা ঠিকানা ও চেম্বারের সময় `bn/practice.md` এবং ইংরেজি তথ্য `en/practice.md` ফাইলে লিখুন। একই তথ্য হোম, অ্যাপয়েন্টমেন্ট ও যোগাযোগ পাতায় নিজে থেকেই দেখা যাবে।

নাম, ডিগ্রি, পদবি, পরিচিতি ও ভাষা বদলাতে `doctor/bn.md` খুলুন। ইংরেজি সংস্করণের জন্য `doctor/en.md` সম্পাদনা করুন। নতুন ডিগ্রি শুধু `qualifications` তালিকায় যোগ করুন।

রোগীর মতামত `patients/bn.md` ফাইলে রাখুন। যাচাই করা মতামতের `status: approved` দিন। যাচাই বাকি থাকলে `status: pending` রাখুন।

কোলনের আগের নাম, `---` চিহ্ন এবং লাইনের শুরুর ফাঁকা স্থান বদলাবেন না। ফোন নম্বর উদ্ধৃতি চিহ্নের মধ্যে রাখুন। `{{doctorName}}`-এর মতো লেখা অপরিবর্তিত রাখুন। সম্পাদনার পরে ওয়েবসাইটের দায়িত্বে থাকা ব্যক্তিকে প্রিভিউ, বিল্ড ও প্রকাশ করতে বলুন।

## How chamber placeholders work

For a Bengali page, the loader reads `bn/practice.md`; for an English page, it reads `en/practice.md`.

| Placeholder in a page file | Source field in that language's practice file |
| --- | --- |
| `{{chamberName}}` | `chamber.name` |
| `{{chamberAddress}}` | `chamber.address` |
| `{{consultationDays}}` | `chamber.visitingDays` and `chamber.visitingHours`, joined with ` · ` |

These are automatic substitutions during the build, not information collected from a patient or an external service. Edit the practice file, leave the placeholders intact, and rebuild to update the pages. A language without a practice file falls back to English.
