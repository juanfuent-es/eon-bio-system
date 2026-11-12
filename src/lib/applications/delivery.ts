import { sendEmail } from '../email/resend'
import { accompanimentQuestion, commitmentQuestion, type ApplicationPayload } from './form'

function optionLabel(question: { options: readonly { value: string; label: string }[] }, value: string) {
  return question.options.find((option) => option.value === value)!.label
}

async function sendApplicationEmail(payload: ApplicationPayload) {
  const fields = {
    Fecha: payload.submitted_at,
    'Nombre completo': payload.name,
    'Correo electrónico': payload.email,
    'Teléfono / WhatsApp': payload.phone,
    Edad: payload.age,
    'Ciudad y país': payload.location,
    'Nivel de compromiso': optionLabel(commitmentQuestion, payload.commitment),
    'Tipo de acompañamiento': optionLabel(accompanimentQuestion, payload.accompaniment),
    Consentimiento: 'Aceptado',
  }
  await sendEmail({
    replyTo: payload.email,
    subject: `Nueva solicitud EON BioSystem - ${payload.name}`,
    text:
      'Nueva solicitud desde /aplica\n\n' +
      Object.entries(fields)
        .map(([label, value]) => `${label}: ${value}`)
        .join('\n'),
  })
}

export async function sendApplication(payload: ApplicationPayload) {
  const url = process.env.APPLICATION_API_URL
  if (!url) {
    if (process.env.APPLICATION_API_TOKEN) throw new Error('Falta APPLICATION_API_URL.')
    return sendApplicationEmail(payload)
  }

  const token = process.env.APPLICATION_API_TOKEN
  if (!token || new URL(url).protocol !== 'https:') throw new Error('Configuración de API incompleta.')

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
    redirect: 'error',
  })
  if (response.status !== 201) throw new Error('La API no confirmó el registro.')
  const result = await response.json()
  if (typeof result.id !== 'string' || !result.id.trim()) throw new Error('Respuesta de API inválida.')
}
