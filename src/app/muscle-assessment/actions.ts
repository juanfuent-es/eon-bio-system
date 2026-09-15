'use server'

import { objectives, sources, type AssessmentState } from './options'

export async function submitAssessment(_: AssessmentState, data: FormData): Promise<AssessmentState> {
  const value = (key: string) => (typeof data.get(key) === 'string' ? String(data.get(key)).trim() : '')
  const modality = value('modality')
  const name = value('name'),
    email = value('email'),
    phone = value('phone'),
    age = value('age')
  if (
    !['presencial', 'remota'].includes(modality) ||
    !name ||
    name.length > 150 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    !/^[+\d\s()-]{7,25}$/.test(phone) ||
    phone.replace(/\D/g, '').length < 7 ||
    !objectives.includes(value('objective')) ||
    value('consent') !== 'on'
  ) {
    return { status: 'error', message: 'Revisa tus datos y acepta el aviso de privacidad para continuar.' }
  }
  if (
    modality === 'presencial' &&
    (!/^\d{1,3}$/.test(age) ||
      Number(age) < 1 ||
      Number(age) > 120 ||
      !['Sí', 'No'].includes(value('training')) ||
      !sources.includes(value('source')))
  ) {
    return { status: 'error', message: 'Completa tu edad, contexto de entrenamiento y fuente de referencia.' }
  }
  if (modality === 'remota' && (!value('location') || value('location').length > 200))
    return { status: 'error', message: 'Indica tu ciudad y país.' }
  const apiKey = process.env.MAILJET_API_KEY,
    secret = process.env.MAILJET_API_SECRET,
    from = process.env.MAILJET_FROM_EMAIL
  const recipients = (process.env.MAILJET_TO_EMAIL ?? '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
    .map((Email) => ({ Email }))
  const failure: AssessmentState = {
    status: 'error',
    message: 'No pudimos enviar tu pre-evaluación. Intenta nuevamente en unos minutos.',
  }
  if (!apiKey || !secret || !from || !recipients.length) return failure
  const fields = {
    Modalidad: modality,
    Nombre: name,
    Edad: modality === 'presencial' ? age : 'No solicitada',
    WhatsApp: phone,
    Correo: email,
    Ubicación: modality === 'presencial' ? 'CDMX / puede acudir presencialmente' : value('location'),
    Objetivo: value('objective'),
    'Entrena fuerza': modality === 'presencial' ? value('training') : 'No solicitado',
    Fuente: modality === 'presencial' ? value('source') : 'No solicitada',
    'Fuente QR': value('qr_source').slice(0, 100),
    Fecha: new Date().toISOString(),
    'Aviso de privacidad': 'Aceptado',
  }
  try {
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${apiKey}:${secret}`).toString('base64')}`,
      },
      body: JSON.stringify({
        Messages: [
          {
            From: { Email: from, Name: process.env.MAILJET_FROM_NAME ?? 'EON BioSystem' },
            To: recipients,
            ReplyTo: { Email: email, Name: name },
            Subject: `EON Muscle Assessment — ${modality}`,
            TextPart: Object.entries(fields)
              .map(([key, content]) => `${key}: ${content}`)
              .join('\n'),
          },
        ],
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) return failure
    const result = await response.json()
    if (result.Messages?.[0]?.Status !== 'success') return failure
    return {
      status: 'success',
      modality: modality as 'presencial' | 'remota',
      message:
        modality === 'presencial'
          ? 'Gracias. Recibimos tu pre-evaluación. Revisaremos tu información para confirmar modalidad y disponibilidad. Nos pondremos en contacto contigo por WhatsApp para coordinar tu EON Muscle Assessment™.'
          : 'Gracias. Registramos tu interés en la modalidad remota del EON Muscle Assessment™. Te contactaremos cuando exista una alternativa adecuada para tu caso.',
    }
  } catch {
    return failure
  }
}
