import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import matter from 'gray-matter'
import { loadSpecialityThemes } from './speciality-themes'
import { loadSpecialityLabels } from './speciality-labels'
import type { Speciality } from '../types'

function withMarkdown(data: object, check: (file: string) => void) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'speciality-content-'))
  try {
    const file = path.join(dir, 'content.md')
    fs.writeFileSync(file, matter.stringify('', data))
    check(file)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

test('Markdown supplies all themes, neutral appearance, and translated labels', () => {
  const { themes, neutralTheme } = loadSpecialityThemes()
  const keys = Object.keys(themes) as Exclude<Speciality, null>[]
  const labels = loadSpecialityLabels(keys)
  assert.equal(keys.length, 9)
  assert.ok(neutralTheme.primary)
  for (const language of ['en', 'bn', 'hi'] as const) {
    assert.deepEqual(Object.keys(labels[language]).sort(), [...keys].sort())
  }
})

test('theme edits load from Markdown and malformed colors fail with a field location', () => {
  const data = loadSpecialityThemes()
  data.themes.dental.primary = '#123456'
  withMarkdown(data, file => assert.equal(loadSpecialityThemes(file).themes.dental.primary, '#123456'))
  data.themes.dental.primary = 'invalid'
  withMarkdown(data, file => assert.throws(() => loadSpecialityThemes(file), /themes.dental.primary/))
})

test('missing themes and translations fail rather than shipping incomplete settings', () => {
  const data = loadSpecialityThemes()
  const { dental, ...remaining } = data.themes
  withMarkdown({ ...data, themes: remaining }, file => assert.throws(() => loadSpecialityThemes(file), /themes.dental/))
  withMarkdown({ labels: { en: { dental: 'Dental' } } }, file => {
    assert.throws(() => loadSpecialityLabels(['dental'], file), /labels.bn.dental/)
  })
})
