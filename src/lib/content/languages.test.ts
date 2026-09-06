import test from 'node:test'
import assert from 'node:assert/strict'

import { listContentLanguages } from './loaders'

test('doctor content reports the available Markdown languages in stable order', () => {
  assert.deepEqual(listContentLanguages(), ['bn', 'en'])
})
