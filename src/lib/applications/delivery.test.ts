import assert from 'node:assert/strict'
import test from 'node:test'
import { sendApplication } from './delivery'
import type { ApplicationPayload } from './form'

const payload: ApplicationPayload = {
  name: 'Persona',
  email: 'persona@example.com',
  phone: '+52 55 0000 0000',
  age: 35,
  city: 'Ciudad de México',
  country_code: 'MX',
  state_code: 'MX-CMX',
  commitment: 'high',
  accompaniment: 'integral',
  consent: true,
  source: '/aplica',
  schema_version: 2,
  submitted_at: '2026-11-11T18:00:00.000Z',
}

test('delivery requires the dashboard API and confirms a persisted UUID', async (t) => {
  t.mock.method(globalThis, 'fetch', async (_input: unknown, init?: RequestInit) => {
    assert.equal(init?.method, 'POST')
    assert.equal((init?.headers as Record<string, string>).Authorization, 'Bearer test-token')
    assert.equal(_input, 'https://example.com/api/aplica')
    assert.equal((init?.headers as Record<string, string>)['Content-Type'], 'application/json')
    assert.equal(init?.cache, 'no-store')
    assert.equal(init?.redirect, 'error')
    assert.ok(init?.signal instanceof AbortSignal)
    assert.deepEqual(JSON.parse(String(init?.body)), payload)
    return Response.json({ id: '123e4567-e89b-42d3-a456-426614174000' }, { status: 201 })
  })
  const savedEnv = { ...process.env }
  try {
    process.env.APPLICATION_API_URL = 'https://example.com/api/aplica'
    process.env.APPLICATION_API_TOKEN = 'test-token'
    assert.equal(await sendApplication(payload), '123e4567-e89b-42d3-a456-426614174000')

    for (const response of [
      Response.json({ id: '123e4567-e89b-42d3-a456-426614174000' }),
      Response.json({}, { status: 201 }),
      Response.json(null, { status: 201 }),
      Response.json({ id: 'email-1' }, { status: 201 }),
      new Response('invalid JSON', { status: 201 }),
      Response.json({}, { status: 401 }),
      Response.json({}, { status: 429, headers: { 'Retry-After': '60' } }),
      Response.json({}, { status: 503 }),
      Response.json({ error: 'invalid' }, { status: 422 }),
      Response.json({}, { status: 500 }),
    ]) {
      t.mock.method(globalThis, 'fetch', async () => response)
      await assert.rejects(sendApplication(payload))
    }
    t.mock.method(globalThis, 'fetch', async () => {
      throw new Error('timeout')
    })
    await assert.rejects(sendApplication(payload))

    let partialConfigRequests = 0
    t.mock.method(globalThis, 'fetch', async () => {
      partialConfigRequests += 1
      return Response.json({ id: 'unexpected' })
    })
    delete process.env.APPLICATION_API_TOKEN
    await assert.rejects(sendApplication(payload))
    process.env.APPLICATION_API_TOKEN = 'test-token'
    delete process.env.APPLICATION_API_URL
    await assert.rejects(sendApplication(payload))

    // Even valid Resend credentials must never bypass dashboard persistence.
    delete process.env.APPLICATION_API_TOKEN
    process.env.RESEND_API_KEY = 'test-key'
    process.env.RESEND_FROM_EMAIL = 'from@example.com'
    process.env.RESEND_TO_EMAIL = 'to@example.com'
    await assert.rejects(sendApplication(payload))

    process.env.APPLICATION_API_TOKEN = 'test-token'
    for (const url of ['http://example.com/api/aplica', 'invalid-url']) {
      process.env.APPLICATION_API_URL = url
      await assert.rejects(sendApplication(payload))
    }
    assert.equal(partialConfigRequests, 0)
  } finally {
    for (const key of Object.keys(process.env)) if (!(key in savedEnv)) delete process.env[key]
    Object.assign(process.env, savedEnv)
  }
})
