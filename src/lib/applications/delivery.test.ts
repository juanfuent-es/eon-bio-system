import assert from 'node:assert/strict'
import test from 'node:test'
import { sendApplication } from './delivery'
import type { ApplicationPayload } from './form'

const payload: ApplicationPayload = {
  name: 'Persona',
  email: 'persona@example.com',
  phone: '+52 55 0000 0000',
  age: 35,
  location: 'Ciudad de México, México',
  commitment: 'high',
  accompaniment: 'integral',
  consent: true,
  source: '/aplica',
  schema_version: 1,
  submitted_at: '2026-11-11T18:00:00.000Z',
}

test('delivery verifies API persistence, fails closed, and retains Resend when unconfigured', async (t) => {
  t.mock.method(globalThis, 'fetch', async (_input: unknown, init?: RequestInit) => {
    assert.equal(init?.method, 'POST')
    assert.equal((init?.headers as Record<string, string>).Authorization, 'Bearer test-token')
    assert.deepEqual(JSON.parse(String(init?.body)), payload)
    return Response.json({ id: 'app-1' }, { status: 201 })
  })
  const savedEnv = { ...process.env }
  try {
    process.env.APPLICATION_API_URL = 'https://example.com/applications'
    process.env.APPLICATION_API_TOKEN = 'test-token'
    await sendApplication(payload)

    for (const response of [
      Response.json({ id: 'app-1' }),
      Response.json({}, { status: 201 }),
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

    assert.equal(partialConfigRequests, 0)

    delete process.env.APPLICATION_API_TOKEN
    process.env.RESEND_API_KEY = 'test-key'
    process.env.RESEND_FROM_EMAIL = 'from@example.com'
    process.env.RESEND_TO_EMAIL = 'to@example.com, second@example.com'
    t.mock.method(globalThis, 'fetch', async (input: unknown, init?: RequestInit) => {
      assert.equal(input, 'https://api.resend.com/emails')
      assert.equal((init?.headers as Record<string, string>).Authorization, 'Bearer test-key')
      const message = JSON.parse(String(init?.body))
      assert.deepEqual(message.to, ['to@example.com', 'second@example.com'])
      assert.equal(message.reply_to, payload.email)
      assert.match(message.text, /Nivel de compromiso: Alto:/)
      assert.match(message.text, /Tipo de acompañamiento: Integral:/)
      assert.doesNotMatch(message.text, /Biomarcadores/)
      return Response.json({ id: 'email-1' })
    })
    await sendApplication(payload)
    for (const response of [Response.json({ message: 'Invalid email' }, { status: 422 }), Response.json({})]) {
      t.mock.method(globalThis, 'fetch', async () => response)
      await assert.rejects(sendApplication(payload))
    }
    delete process.env.RESEND_API_KEY
    await assert.rejects(sendApplication(payload))
  } finally {
    for (const key of Object.keys(process.env)) if (!(key in savedEnv)) delete process.env[key]
    Object.assign(process.env, savedEnv)
  }
})
