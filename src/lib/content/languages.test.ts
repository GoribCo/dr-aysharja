import test from 'node:test'
import assert from 'node:assert/strict'
import { listContentLanguages } from './loaders'
import { getDefaultLanguage } from '../site/config'

test('configured default language is available and language list is unique', () => {
  const languages = listContentLanguages()
  assert.ok(languages.includes(getDefaultLanguage()))
  assert.equal(new Set(languages).size, languages.length)
})
