import test from 'node:test'
import assert from 'node:assert/strict'

import { parseChamberList, normalizeChamber } from './chambers'

test('normalizeChamber filters empty entries', () => {
  assert.equal(normalizeChamber(null), null)
  assert.equal(normalizeChamber({}), null)
  assert.deepEqual(normalizeChamber({
    name: 'Clinic A',
    address: 'Road 7, Dhaka',
    visitingDays: 'Sun, Tue',
    visitingHours: '5:00 PM - 8:00 PM',
    phone: '+8801712345678',
    googleMapsUrl: 'https://maps.google.com/?q=Dhaka'
  }), {
    name: 'Clinic A',
    address: 'Road 7, Dhaka',
    visitingDays: 'Sun, Tue',
    visitingHours: '5:00 PM - 8:00 PM',
    phone: '+8801712345678',
    googleMapsUrl: 'https://maps.google.com/?q=Dhaka'
  })
})

test('parseChamberList extracts chambers from markdown config', () => {
  const chambers = parseChamberList(`---
  title: Chamber
  chambers:
    - name: Clinic A
      address: Road 7, Dhaka
      visitingDays: Saturday, Tuesday
      visitingHours: 5:00 PM - 8:00 PM
      phone: +8801712345678
      googleMapsUrl: https://maps.google.com/?q=Dhaka
---

# Chamber
`)

  assert.equal(chambers.length, 1)
  assert.equal(chambers[0].name, 'Clinic A')
  assert.equal(chambers[0].phone, '+8801712345678')
})
