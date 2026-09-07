# Content audit and migration notes

Reviewed English and Bengali doctor/page content, all service entries, English/Bengali/Hindi Resources, shared settings, appearance definitions, image references and legacy JSON files.

## Repetition resolved

- Chamber name, address, days and hours were independently stored in Home, Appointment and Contact. `{language}/practice.md` now supplies all three. The former Appointment entries were used as the common source because they contained the full schedule; Home had empty values or bracketed prompts. The Bengali Contact address was outside its chamber entry, and the English Appointment/Contact files used tab indentation. Those duplicate structures have been removed.
- `footerAddress` was an unused combination of chamber name and address, not an independent fact. It has been removed from Home.
- Phone numbers were repeated under shared Contact and Appointment settings. `practice.md` now provides one main number with an optional booking override.
- Qualifications were repeated as a sentence, a homepage list and a Qualifications list. Plain qualification entries in `doctor/{language}.md` now supply each display.
- Profile names, biography, title, affiliation and language list now live in `doctor/{language}.md`. Profile page files contain page wording only.
- Home and the legacy speciality summary repeated service names. Both now derive names from visible service files. Home displays the first six in service order.
- Patient records and homepage quotations now live in `patients/{language}.md`, separately from Reviews page instructions and form labels.
- Technical settings, theme definitions and the developer inquiry remain separate from the doctor's personal information.

Different page introductions have been preserved: short homepage introductions and longer biographies serve different purposes. They are not treated as separate sources for contact or qualification data.

## Information still needing confirmation

These are existing content issues, not newly verified facts:

- Chamber name, address and visiting times are still explicitly unconfirmed. The existing map coordinates were preserved, but the doctor must confirm that they match the actual chamber.
- English doctor details have placeholder affiliation and years of experience; Bengali lists seven years and no affiliation. No date of starting practice was supplied, so experience has not been calculated or guessed.
- The Profile listed Bengali and English. The older, unused language page additionally claimed conversational Hindi and proficiency levels. The new shared list preserves the Profile's two languages. Confirm Hindi and proficiency before adding them to the doctor details.
- English availability says “Taking appointments” and contains `[Confirm availability]`; Bengali availability is empty. Confirm these in `en/practice.md` and `bn/practice.md`.
- The English homepage quotation is a placeholder, whereas Bengali is empty. Both were moved without inventing a testimonial.
- The existing reviews are marked approved, but two describe prenatal/gynecological care while the site describes orthopaedics. They have been preserved in `patients/` for review, without rewriting patient statements or changing approval status. Confirm whether they belong to this doctor.
- Experience, Awards, Memberships and Publications contain explicitly labeled sample entries. Replace these with actual records, or set `visible: false` on those pages until ready.
- The unused Articles and Sub-speciality files also contain sample material. There are no corresponding public routes currently.
- English and Bengali sometimes use different editorial wording. Shared factual fields now have one source per language, but translating an edit remains a human task.

## Current limitations

This is still a file-based website, not an online editing dashboard. The editing guide reduces duplication and explains the fields, but publishing requires a rebuild and deployment. The current public layout displays one chamber. Adding support for several independently scheduled chambers would require a separate UI change.
