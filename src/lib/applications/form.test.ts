import assert from 'node:assert/strict'
import test from 'node:test'
import { applicationQuestions, parseApplication } from './form'

function validForm() {
  const data = new FormData()
  for (const [key, value] of Object.entries({
    name: ' Persona de ejemplo ',
    email: 'persona@example.com',
    phone: '+52 55 0000 0000',
    age: '35',
    location: ' Ciudad de México, México ',
    commitment: 'high',
    accompaniment: 'integral',
    consent: 'on',
  }))
    data.set(key, value)
  return data
}

test('payload separates commitment from accompaniment and requires age and location', () => {
  const result = parseApplication(validForm())
  assert.equal(result.name, 'Persona de ejemplo')
  assert.equal(result.commitment, 'high')
  assert.equal(result.accompaniment, 'integral')
  assert.equal(result.age, 35)
  assert.equal(result.location, 'Ciudad de México, México')
  assert.equal(result.consent, true)
  assert.equal(result.source, '/aplica')
  assert.equal(result.schema_version, 1)
  assert.ok(!Number.isNaN(Date.parse(result.submitted_at)))
  assert.ok(!('biomarkers' in result))
  assert.deepEqual(
    applicationQuestions.map(({ name }) => name),
    ['commitment', 'accompaniment'],
  )
})

test('rejects missing, legacy, forged and invalid field values', () => {
  for (const [field, value] of [
    ['name', ''],
    ['name', 'x'.repeat(151)],
    ['email', 'invalid'],
    ['phone', 'abcdefg'],
    ['age', ''],
    ['location', ''],
    ['location', '   '],
    ['age', '-1'],
    ['age', '2.5'],
    ['age', '121'],
    ['location', 'x'.repeat(201)],
    ['commitment', 'toString'],
    ['accompaniment', 'high'],
    ['accompaniment', ''],
    ['consent', 'false'],
  ]) {
    const data = validForm()
    data.set(field, value)
    assert.throws(() => parseApplication(data), Error, `${field}: ${value}`)
  }
})

test('accepts all radio combinations and integer age including zero', () => {
  for (const commitment of applicationQuestions[0].options) {
    for (const accompaniment of applicationQuestions[1].options) {
      const data = validForm()
      data.set('commitment', commitment.value)
      data.set('accompaniment', accompaniment.value)
      data.set('age', '0')
      assert.equal(parseApplication(data).age, 0)
    }
  }
})
