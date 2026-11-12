'use server'

import { sendEmail } from '@/lib/email/resend'

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
  const failure: AssessmentState = {
    status: 'error',
    message: 'No pudimos enviar tu pre-evaluación. Intenta nuevamente en unos minutos.',
  }
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
    await sendEmail({
      replyTo: email,
      subject: `EON Muscle Assessment — ${modality}`,
      text: Object.entries(fields)
        .map(([key, content]) => `${key}: ${content}`)
        .join('\n'),
    })
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
