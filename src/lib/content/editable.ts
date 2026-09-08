import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { ContentLanguage, DoctorNameParts, ProfileContent, PatientReview, Chamber } from '../types'

/** Editable content is read on the server and validated before static publication. */
export function readEditableFile(relativePath: string): Record<string, unknown> {
  const filename = path.join(process.cwd(), 'content', relativePath)
  const { data } = matter(fs.readFileSync(filename, 'utf8'))
  return structuredClone(data)
}

function text(data: Record<string, unknown>, key: string, filename: string): string {
  if (typeof data[key] !== 'string') throw new Error(`${filename}: ${key} must be text. Use "" for an empty value and quote phone numbers.`)
  return data[key]
}

export type DoctorDetails = DoctorNameParts & Omit<ProfileContent, 'doctorName'> & {
  qualifications: string[]
  specialization: string
}

export function loadDoctorDetails(lang: ContentLanguage): DoctorDetails {
  const relative = `doctor/${lang}/profile.md`
  const filename = fs.existsSync(path.join(process.cwd(), 'content', relative)) ? relative : 'doctor/en/profile.md'
  const data = readEditableFile(filename)
  for (const key of ['salutation', 'firstName', 'middleName', 'lastName', 'designation', 'affiliation', 'role', 'yearsOfExperience', 'bio', 'specializationSummary', 'specialization']) text(data, key, filename)
  for (const key of ['qualifications', 'languages', 'specializationTags']) {
    if (!Array.isArray(data[key]) || !data[key].every(item => typeof item === 'string')) {
      throw new Error(`${filename}: ${key} must be a list of text values. Use [] for an empty list.`)
    }
  }
  return data as unknown as DoctorDetails
}

export function loadPractice(lang: ContentLanguage) {
  const data = readEditableFile('doctor/contact.md')
  for (const key of ['phone', 'email', 'whatsapp', 'bookingPhone', 'bookingUrl']) text(data, key, 'doctor/contact.md')
  for (const key of ['latitude', 'longitude']) {
    if (data[key] !== null && (typeof data[key] !== 'number' || !Number.isFinite(data[key]))) {
      throw new Error(`doctor/contact.md: ${key} must be a number or null.`)
    }
  }
  const requestedFile = `doctor/${lang}/chamber.md`
  const localizedFile = fs.existsSync(path.join(process.cwd(), 'content', requestedFile))
    ? requestedFile : 'doctor/en/chamber.md'
  const localized = readEditableFile(localizedFile)
  const chamber = localized.chamber as Record<string, unknown> | undefined
  if (!chamber) throw new Error(`${localizedFile}: missing chamber`)
  const fields = Object.fromEntries(['name', 'address', 'visitingDays', 'visitingHours', 'googleMapsUrl']
    .map(key => [key, text(chamber, key, `${localizedFile}: chamber`)])) as Omit<Chamber, 'phone'>
  return {
    phone: data.phone as string, email: data.email as string, whatsapp: data.whatsapp as string,
    bookingPhone: (data.bookingPhone || data.phone) as string, bookingUrl: data.bookingUrl as string,
    latitude: data.latitude as number | null, longitude: data.longitude as number | null,
    chamber: { ...fields, phone: (data.bookingPhone || data.phone) as string },
    availability: text(localized, 'availability', localizedFile),
    availabilityNote: text(localized, 'availabilityNote', localizedFile),
  }
}

export function loadPatientFeedback(lang: ContentLanguage) {
  const filename = `doctor/${lang}/reviews.md`
  if (!fs.existsSync(path.join(process.cwd(), 'content', filename))) return { featuredQuote: '', featuredAuthor: '', reviews: [] }
  const data = readEditableFile(filename)
  const featuredQuote = text(data, 'featuredQuote', filename)
  const featuredAuthor = text(data, 'featuredAuthor', filename)
  if (!Array.isArray(data.reviews)) throw new Error(`${filename}: reviews must be a list. Use [] for no reviews.`)
  for (const entry of data.reviews) {
    if (!entry || typeof entry !== 'object') throw new Error(`${filename}: every review must contain named fields.`)
    for (const key of ['name', 'date', 'service', 'review', 'status']) text(entry, key, filename)
    if (!Number.isInteger(entry.rating) || entry.rating < 1 || entry.rating > 5) throw new Error(`${filename}: review rating must be a whole number from 1 to 5.`)
  }
  return { featuredQuote, featuredAuthor, reviews: data.reviews as PatientReview[] }
}
