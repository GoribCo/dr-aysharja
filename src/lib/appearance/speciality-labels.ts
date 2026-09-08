import fs from 'node:fs'
import matter from 'gray-matter'
import type { UiLang, Speciality } from '../types'
import { specialityLabels } from '../i18n/translations'

type SpecialityLabels = Record<UiLang, Record<Exclude<Speciality, null>, string>>

/** Read on the server and validate labels against the loaded theme keys. */
export function loadSpecialityLabels(
  keys: Exclude<Speciality, null>[],
  filePath?: string,
): SpecialityLabels {
  if (!filePath) return validateLabels(keys, specialityLabels, 'src/lib/i18n/translations.ts')
  const { data } = matter(fs.readFileSync(filePath, 'utf8'))
  return validateLabels(keys, data.labels, filePath)
}

function validateLabels(keys: Exclude<Speciality, null>[], labels: unknown, filePath: string): SpecialityLabels {
  for (const lang of ['en', 'bn', 'hi'] as const) {
    for (const key of keys) {
      const label = (labels as Record<string, Record<string, unknown>> | undefined)?.[lang]?.[key]
      if (typeof label !== 'string' || !label.trim()) {
        throw new Error(`Expected a non-empty label at ${filePath}: labels.${lang}.${key}`)
      }
    }
  }
  return structuredClone(labels) as SpecialityLabels
}
