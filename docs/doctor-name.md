# Doctor name configuration

Edit the name fields in `content/en/profile.md` and `content/bn/profile.md`. Each language owns its spelling. Keep the title in `salutation` only.

```yaml
salutation: Dr.
firstName: Aysharja
middleName: Laxmi
lastName: Podder
```

`middleName` and `salutation` can be empty strings.

Use these placeholders in Markdown bodies or frontmatter, including nested lists:

| Placeholder | English example |
| --- | --- |
| `{{doctorName}}` or `{{doctorFullName}}` | Dr. Aysharja Laxmi Podder |
| `{{doctorShortName}}` | Dr. Aysharja |
| `{{doctorSalutation}}` or `{{salutation}}` | Dr. |
| `{{firstName}}` | Aysharja |
| `{{middleName}}` | Laxmi |
| `{{lastName}}` | Podder |

Do not add another title before a full-name or short-name placeholder. Templates resolve when content is loaded, including the profile itself.

For code, `src/lib/doctor/name.ts` provides `formatDoctorName(parts)`, `formatDoctorShortName(parts)`, and `getSalutation(parts)`. Pass `false` as the second argument to either name helper to omit the salutation. Server code can load the language-specific fields with `loadDoctorIdentity(lang)` or obtain the formatted full name with `loadDoctorName(lang)` from `src/lib/content/loaders.ts`.
