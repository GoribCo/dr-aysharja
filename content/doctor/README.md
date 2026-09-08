# Doctor updates

This folder contains the facts about your practice. You normally do not need to edit other folders.

## Choose what to change

Paths below are relative to this folder. `en` means English; use the corresponding `bn` or `hi` folder if present.

| Change | File | Where it appears |
| --- | --- | --- |
| Phone, email, WhatsApp or booking link | `contact.md` | Contact and appointment links across the website |
| Photograph | `photo.md` | Home and Profile |
| Name, qualifications, speciality, current job, hospital, biography or spoken languages | `en/profile.md` | Home, Profile and Qualifications |
| Chamber name, address, consultation days or hours | `en/chamber.md` | Home, Appointment and Contact |
| Career history | `en/experience.md` | About → Experience |
| Awards | `en/awards.md` | About → Awards |
| Professional memberships | `en/memberships.md` | About → Memberships |
| Publications | `en/publications.md` | About → Publications |
| Treatments offered | `en/services/` | Services and the homepage service list |
| Patient feedback and featured quotation | `en/reviews.md` | Reviews and Home |

## Example: update consultation hours

Open `en/chamber.md` and change the values, keeping the existing indentation:

```yaml
chamber:
  name: 'Your clinic name'
  address: 'Your clinic address'
  visitingDays: 'Monday'
  visitingHours: '4:00 PM–7:00 PM'
```

Update the same details in `bn/chamber.md` if Bengali is enabled. The website currently supports one chamber.

## Example: add a qualification

In `en/profile.md`, add your qualification to the existing list:

```yaml
qualifications:
  - MBBS
  - 'Your additional qualification'
```

Home and Qualifications update automatically. You do not need to edit the Qualifications page separately. `languages` in this same file supplies the spoken-language list.

## Contact and photograph

Keep phone numbers quoted, for example `phone: '+8801700000000'`. Leave `bookingPhone: ''` to reuse the main number. `bookingUrl` is optional for online appointments. Leave unavailable contact fields empty. Ask the maintainer for help with map coordinates or uploading a new photograph; `photo.md` stores its path under `public/`.

## Services and professional records

Edit the text below the second `---` line in career, award, membership and publication files. Use `##` for headings and `-` for lists. Replace starter wording with your actual information. Set `visible: false` to hide an unused page; `visible: true` shows it again.

Each service has its own file. Edit its title, short description and body. Lower `order` numbers appear first. `visible: false` hides a service from both Services and Home.

## Reviews

Only publish authentic feedback with permission. Use `status: approved` for a published review or `status: pending` while checking it. Leave `featuredQuote` and `featuredAuthor` empty to hide the homepage quotation.

## Before publishing

Keep field names, colons, indentation and `---` lines. Use `''` for empty text and `[]` for an empty list. Leave placeholders such as `{{doctorName}}` unchanged. Update each enabled language and ask the maintainer to preview and publish.
