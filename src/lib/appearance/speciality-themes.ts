import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Speciality, SpecialityTheme } from '../types'

const specialityKeys: Exclude<Speciality, null>[] = [
  'medicine', 'dental', 'orthopaedic', 'gynaecology', 'cardiology',
  'ent', 'ophthalmology', 'surgery', 'other',
]

function validateTheme(value: unknown, location: string): asserts value is SpecialityTheme {
  if (!value || typeof value !== 'object') throw new Error(`Missing theme: ${location}`)
  const theme = value as Record<string, unknown>
  for (const field of ['primary', 'secondary', 'accent', 'icon', 'label', 'description']) {
    if (typeof theme[field] !== 'string' || !theme[field].trim()) {
      throw new Error(`Expected non-empty text at ${location}.${field}`)
    }
  }
  for (const field of ['primary', 'secondary', 'accent']) {
    if (!/^#[\da-f]{6}$/i.test(theme[field] as string)) {
      throw new Error(`Expected a quoted six-digit hex color at ${location}.${field}`)
    }
  }
  const gradient = theme.gradient as Record<string, unknown> | undefined
  if (!gradient || typeof gradient.from !== 'string' || !gradient.from.trim()
    || typeof gradient.to !== 'string' || !gradient.to.trim()) {
    throw new Error(`Expected from and to classes at ${location}.gradient`)
  }
}

/** Read on the server; pass the result to SpecialityProvider for browser use. */
export function loadSpecialityThemes(filePath = path.join(process.cwd(), 'content/appearance/speciality-themes.md')) {
  const { data } = matter(fs.readFileSync(filePath, 'utf8'))
  for (const key of specialityKeys) validateTheme(data.themes?.[key], `${filePath}: themes.${key}`)
  for (const key of Object.keys(data.themes)) {
    if (!specialityKeys.includes(key as Exclude<Speciality, null>)) throw new Error(`Unknown speciality at ${filePath}: ${key}`)
  }
  validateTheme(data.neutralTheme, `${filePath}: neutralTheme`)
  return structuredClone({
    themes: data.themes as Record<Exclude<Speciality, null>, SpecialityTheme>,
    neutralTheme: data.neutralTheme,
  })
}
