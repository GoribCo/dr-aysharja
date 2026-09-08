# Content audit and migration notes

Reviewed English and Bengali doctor/page content, all service entries, English/Bengali/Hindi Resources, shared settings, appearance definitions, image references and legacy JSON files. Subsequent cleanup removed unused legacy pages, language-learning JSON and byte-identical image copies.

## Repetition resolved

- Chamber name, address, days and hours were independently stored in Home, Appointment and Contact. `doctor/{language}/chamber.md` now supplies all three. The former Appointment entries were used as the common source because they contained the full schedule; Home had empty values or bracketed prompts. The Bengali Contact address was outside its chamber entry, and the English Appointment/Contact files used tab indentation. Those duplicate structures have been removed.
- `footerAddress` was an unused combination of chamber name and address, not an independent fact. It has been removed from Home.
- Phone numbers were repeated under shared Contact and Appointment settings. `doctor/contact.md` now provides one main number with an optional booking override.
- Qualifications were repeated as a sentence, a homepage list and a Qualifications list. Plain qualification entries in `doctor/{language}/profile.md` now supply each display.
- Profile names, biography, title, affiliation and language list now live in `doctor/{language}/profile.md`. Profile page files contain page wording only.
- Home now derives names from visible service files; the unused speciality summary has been removed. Home displays the first six in service order.
- Patient records and homepage quotations now live in `doctor/{language}/reviews.md`, separately from Reviews page instructions and form labels.
- Technical settings, theme definitions and the developer inquiry remain separate from the doctor's personal information.

Different page introductions have been preserved: short homepage introductions and longer biographies serve different purposes. They are not treated as separate sources for contact or qualification data.

## Information still needing confirmation

These are existing content issues, not newly verified facts:

- Chamber details are now supplied by the doctor: Life Care Diagnostic & Clinic, Upajela More (Muktijodda Bhaban), Fakirhat, Bagerhat; every Monday, 4–7 PM. The appointment phone is 01762-575454. The previous unconfirmed map coordinates were cleared; exact coordinates for this chamber have not been supplied.
- Both languages now list Orthopedics Specialist at Khulna Medical College & Hospital. English still has placeholder years of experience; Bengali lists seven years. No date of starting practice was supplied, so experience has not been calculated or guessed.
- The Profile listed Bengali and English. The older, unused language page additionally claimed conversational Hindi and proficiency levels. The new shared list preserves the Profile's two languages. Confirm Hindi and proficiency before adding them to the doctor details.
- Availability now shows the supplied Monday 4–7 PM schedule in both languages.
- The English homepage quotation is a placeholder, whereas Bengali is empty. Both were moved without inventing a testimonial.
- The existing reviews are marked approved, but two describe prenatal/gynecological care while the site describes orthopaedics. They have been preserved in `doctor/{language}/reviews.md` for review, without rewriting patient statements or changing approval status. Confirm whether they belong to this doctor.
- Experience now lists the supplied current hospital role. Awards, Memberships and Publications still contain explicitly labeled sample entries. Replace these with actual records, or set `visible: false` on those pages until ready.
- The unused Articles and Sub-speciality sample files were removed because they had no public routes.
- English and Bengali sometimes use different editorial wording. Shared factual fields now have one source per language, but translating an edit remains a human task.

## Current limitations

This is still a file-based website, not an online editing dashboard. The editing guide reduces duplication and explains the fields, but publishing requires a rebuild and deployment. The current public layout displays one chamber. Adding support for several independently scheduled chambers would require a separate UI change.
