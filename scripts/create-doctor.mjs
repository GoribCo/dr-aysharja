#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
if (args.includes('--help') || !args.length) {
  console.log('Usage: npm run create:doctor -- ../new-doctor --name "Dr. Alex Morgan" --speciality cardiology\nCreates a separate English starter. The destination must not exist. No patient records, contacts, photos, git history or dependencies are copied.')
  process.exit(args.length ? 0 : 1)
}
const destination = path.resolve(args.shift())
const options = {}
while (args.length) {
  const key = args.shift()
  if (!['--name', '--speciality'].includes(key) || !args.length || args[0].startsWith('--')) throw new Error(`Unknown or incomplete option: ${key}`)
  options[key.slice(2)] = args.shift()
}
if (!options.name?.trim()) throw new Error('Provide the doctor name with --name.')
if (fs.existsSync(destination)) throw new Error('Destination already exists. Choose a new directory; existing files are never overwritten.')
const relative = path.relative(source, destination)
if (!relative || (!relative.startsWith('..' + path.sep) && relative !== '..' && !path.isAbsolute(relative))) throw new Error('Choose a destination outside this project.')
const appearance = matter(fs.readFileSync(path.join(source, 'content/appearance/speciality-themes.md'), 'utf8')).data
const speciality = options.speciality || 'other'
if (!Object.hasOwn(appearance.themes, speciality)) throw new Error(`Unknown speciality. Choose: ${Object.keys(appearance.themes).join(', ')}`)
const theme = appearance.themes[speciality]
const name = options.name.trim().split(/\s+/)
const salutation = /^(dr\.?|prof\.?)$/i.test(name[0]) ? name.shift() : ''
if (!name.length) throw new Error('Provide a name after the salutation.')
const firstName = name.shift()
const lastName = name.length ? name.pop() : ''
const middleName = name.join(' ')
const monogram = [firstName, middleName, lastName].filter(Boolean).map(part => Array.from(part)[0]).join('')

function copy(from, to = from) {
  fs.mkdirSync(path.dirname(path.join(destination, to)), { recursive: true })
  fs.cpSync(path.join(source, from), path.join(destination, to), { recursive: true, filter: filename => !filename.endsWith('.DS_Store') })
}
function write(relativePath, data, body = '') {
  const file = path.join(destination, relativePath)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, matter.stringify(body, data))
}
fs.mkdirSync(destination, { recursive: true })
for (const file of ['src', 'scripts', 'templates', 'package.json', 'package-lock.json', 'tsconfig.json', 'next.config.ts', 'postcss.config.mjs', '.gitignore', 'run.sh', 'docs/new-doctor.md', '.github/workflows/deploy.yml']) copy(file)
for (const file of ['sw.js', 'icon.svg', 'doctor-placeholder.svg', '.nojekyll']) copy('public/' + file)
copy('content/appearance')
copy('templates/doctor-starter/en', 'content/en')
write('content/site.md', {
  url: 'http://localhost:3000', defaultLanguage: 'en', speciality,
  branding: { shortName: [salutation, firstName].filter(Boolean).join(' '), monogram, icon: '/icon.svg' },
  seo: { defaultDescription: `Profile, services and appointment information for ${options.name}.` },
  theme: { colorLight: '#f7f9f8', colorDark: '#101c1f', primary: theme.accent },
}, '\nSet url to the complete public website address before publishing. Set theme.primary to a readable brand color.\n')
write('content/doctor/en.md', {
  salutation, firstName, middleName, lastName, designation: theme.label, affiliation: '', role: '', yearsOfExperience: '',
  languages: [], bio: 'Contact {{doctorName}} for information about the practice and consultation options.',
  specialization: theme.label, specializationSummary: '', specializationTags: [], qualifications: [],
}, '\nAdd verified personal details. Qualifications are reused across the website.\n')
write('content/doctor/shared.md', { profileImage: '/doctor-placeholder.svg' }, '\nUpload your own portrait under public/ and update this path.\n')
write('content/practice.md', { phone: '', email: '', whatsapp: '', bookingPhone: '', bookingUrl: '', latitude: null, longitude: null }, '\nKeep phone numbers in quotes. Leave bookingPhone empty to reuse phone. Use a full HTTPS URL for online booking.\n')
write('content/en/practice.md', { chamber: { name: '', address: '', visitingDays: '', visitingHours: '', googleMapsUrl: '' }, availability: '', availabilityNote: '' })
write('content/patients/en.md', { featuredQuote: '', featuredAuthor: '', reviews: [] }, '\nOnly add authentic feedback that you have permission to publish.\n')
copy('docs/new-doctor.md', 'README.md')
fs.writeFileSync(path.join(destination, 'content/README.md'), `# Edit your doctor website\n\n- doctor/en.md: name, qualifications, biography and spoken languages.\n- doctor/shared.md: portrait path.\n- practice.md: shared contact and booking information.\n- en/practice.md: chamber name, address and schedule.\n- en/services/: service files; set visible: true when ready.\n- patients/en.md: permitted feedback only; no patient data is copied from another site.\n- site.md: speciality, brand, language and public website URL.\n- en/: page wording and professional records; all About pages are included; set visible: false to hide any unused page.\n\nKeep field names and indentation. Quote phone numbers. Leave {{doctorName}} placeholders unchanged. Run npm run build and preview before publishing. See the main README for setup and additional languages.\n`)
console.log(`Created ${destination}\nNext: cd ${destination}\nnpm install\nnpm run dev\nEdit content before publishing. No changes were made to the original website.`)
