import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { UiLang, Speciality } from '../types'

type SpecialityLabels = Record<UiLang, Record<Exclude<Speciality, null>, string>>

/** Read on the server and validate labels against the loaded theme keys. */
export function loadSpecialityLabels(
  keys: Exclude<Speciality, null>[],
  filePath = path.join(process.cwd(), 'content/appearance/speciality-labels.md'),
): SpecialityLabels {
  const { data } = matter(fs.readFileSync(filePath, 'utf8'))
  for (const lang of ['en', 'bn', 'hi'] as const) {
    for (const key of keys) {
      const label = data.labels?.[lang]?.[key]
      if (typeof label !== 'string' || !label.trim()) {
        throw new Error(`Expected a non-empty label at ${filePath}: labels.${lang}.${key}`)
      }
    }
  }
  return structuredClone(data.labels) as SpecialityLabels
}
