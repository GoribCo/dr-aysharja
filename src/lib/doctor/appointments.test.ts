import test from 'node:test'
import assert from 'node:assert/strict'

import { getAppointmentAction, normalizePhone } from './appointments'

test('normalizePhone ignores TODO and blank values', () => {
  assert.equal(normalizePhone('TODO'), null)
  assert.equal(normalizePhone(''), null)
  assert.equal(normalizePhone('   '), null)
  assert.equal(normalizePhone('+8801712345678'), '+8801712345678')
})

test('getAppointmentAction returns no action when nothing is configured', () => {
  assert.deepEqual(getAppointmentAction({ phone: 'TODO', url: 'TODO' }), {
    type: 'none',
    primaryLabel: 'Book Appointment',
    primaryHref: null,
    secondaryLabel: 'Call Now',
    secondaryHref: null,
    phone: null,
    url: null,
  })
})

test('getAppointmentAction builds a phone-based action for mobile', () => {
  const action = getAppointmentAction({ phone: '+8801712345678' })

  assert.equal(action.type, 'phone')
  assert.equal(action.primaryLabel, 'Book Appointment')
  assert.equal(action.primaryHref, 'tel:+8801712345678')
  assert.equal(action.secondaryLabel, 'Call Now')
  assert.equal(action.secondaryHref, 'tel:+8801712345678')
})

test('getAppointmentAction keeps external booking URL support for later', () => {
  const action = getAppointmentAction({ url: 'https://example.com/book' })

  assert.equal(action.type, 'external')
  assert.equal(action.primaryHref, 'https://example.com/book')
  assert.equal(action.secondaryHref, null)
})
