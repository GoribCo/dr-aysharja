import { resolveContentTemplates } from '../content/templates'
import test from 'node:test'
import assert from 'node:assert/strict'
import { formatDoctorName, formatDoctorShortName, getSalutation, createDoctorNameVariables } from './name'
import { loadDoctorContent, loadDoctorIdentity, listContentLanguages } from '../content/loaders'

const bangla = { salutation: 'ডা.', firstName: 'নমুনা', middleName: 'কুমার', lastName: 'দাস' }

test('formats full, short, and untitled names without duplicate salutations', () => {
  assert.equal(formatDoctorName(bangla), 'ডা. নমুনা কুমার দাস')
  assert.equal(formatDoctorName(bangla, false), 'নমুনা কুমার দাস')
  assert.equal(formatDoctorShortName(bangla), 'ডা. নমুনা')
  assert.equal(getSalutation(bangla), 'ডা.')
  const partial = { salutation: ' Dr. ', firstName: ' Jane ', middleName: '', lastName: '' }
  assert.equal(formatDoctorName(partial), 'Dr. Jane')
  assert.equal(formatDoctorShortName({ ...partial, firstName: '', lastName: ' Doe ' }), 'Dr. Doe')
})

test('resolves nested content, preserves nonstrings and literal replacement characters', () => {
  const vars = { ...createDoctorNameVariables(bangla), literal: '$&' }
  const original = { bio: '{{ doctorName }}', reviews: [{ text: '{{doctorShortName}} / {{literal}}', rating: 5 }], visible: true, empty: null }
  assert.deepEqual(resolveContentTemplates(original, vars), {
    bio: 'ডা. নমুনা কুমার দাস', reviews: [{ text: 'ডা. নমুনা / $&', rating: 5 }], visible: true, empty: null,
  })
  assert.equal(original.bio, '{{ doctorName }}')
})

test('all loaded content resolves name templates, including profile biographies and homepage links', () => {
  for (const lang of listContentLanguages()) {
    const data = loadDoctorContent(lang)
    const name = loadDoctorIdentity(lang)
    assert.doesNotMatch(JSON.stringify(data), /{{\s*(?:doctor\w*|salutation|firstName|middleName|lastName)\s*}}/)
    assert.ok(JSON.stringify(data.profile).includes(formatDoctorName(name)))
    assert.ok(JSON.stringify(data.home).includes(formatDoctorShortName(name)))
  }
})
