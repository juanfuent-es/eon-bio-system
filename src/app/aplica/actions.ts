'use server'

type FormStatus = 'idle' | 'success' | 'error'

export type ApplicationFormState = {
  status: FormStatus
  message: string
}

export const initialApplicationFormState: ApplicationFormState = {
  status: 'idle',
  message: '',
}

const commitmentLabels: Record<string, string> = {
  high: 'Alto - Puedo seguir indicaciones y priorizar el proceso.',
  medium: 'Medio - Puedo adaptarme al sistema con ciertas limitaciones.',
  low: 'Bajo - Busco algo flexible y con poca estructura.',
}

const biomarkersLabels: Record<string, string> = {
  yes: 'Si - Entiendo que el laboratorio es parte central del sistema.',
  conditional: 'Si, con ciertas limitaciones - Dependeria del contexto o indicacion.',
  no: 'No - Prefiero no realizar estudios de laboratorio de forma periodica.',
}

function getValue(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function getRequiredValue(formData: FormData, key: string, label: string) {
  const value = getValue(formData, key)

  if (!value) {
    throw new Error(`El campo "${label}" es obligatorio.`)
  }

  return value
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function getMailjetRecipients() {
  const rawRecipients = process.env.MAILJET_TO_EMAIL ?? ''
  const recipients = rawRecipients
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
    .map((email) => ({ Email: email }))

  if (recipients.length === 0) {
    throw new Error('Falta configurar MAILJET_TO_EMAIL.')
  }

  return recipients
}

async function sendApplicationMail(payload: {
  name: string
  email: string
  phone: string
  age: string
  location: string
  commitment: string
  biomarkers: string
}) {
  const apiKey = process.env.MAILJET_API_KEY
  const apiSecret = process.env.MAILJET_API_SECRET
  const fromEmail = process.env.MAILJET_FROM_EMAIL
  const fromName = process.env.MAILJET_FROM_NAME ?? 'EON BioSystem'

  if (!apiKey || !apiSecret || !fromEmail) {
    throw new Error('Falta configurar Mailjet en las variables de entorno.')
  }

  const submittedAt = new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  }).format(new Date())

  const textPart = `
Nueva solicitud desde /aplica

Fecha: ${submittedAt}
Nombre completo: ${payload.name}
Correo electronico: ${payload.email}
Telefono / WhatsApp: ${payload.phone}
Edad: ${payload.age || 'No proporcionada'}
Ciudad y pais: ${payload.location || 'No proporcionados'}
Nivel de compromiso: ${payload.commitment}
Biomarcadores / laboratorio: ${payload.biomarkers}
Consentimiento: Aceptado
  `.trim()

  const htmlPart = `
    <h2>Nueva solicitud desde /aplica</h2>
    <p><strong>Fecha:</strong> ${escapeHtml(submittedAt)}</p>
    <p><strong>Nombre completo:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Correo electronico:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Telefono / WhatsApp:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Edad:</strong> ${escapeHtml(payload.age || 'No proporcionada')}</p>
    <p><strong>Ciudad y pais:</strong> ${escapeHtml(payload.location || 'No proporcionados')}</p>
    <p><strong>Nivel de compromiso:</strong> ${escapeHtml(payload.commitment)}</p>
    <p><strong>Biomarcadores / laboratorio:</strong> ${escapeHtml(payload.biomarkers)}</p>
    <p><strong>Consentimiento:</strong> Aceptado</p>
  `.trim()

  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
    },
    body: JSON.stringify({
      Messages: [
        {
          From: {
            Email: fromEmail,
            Name: fromName,
          },
          To: getMailjetRecipients(),
          ReplyTo: {
            Email: payload.email,
            Name: payload.name,
          },
          Subject: `Nueva solicitud EON BioSystem - ${payload.name}`,
          TextPart: textPart,
          HTMLPart: htmlPart,
        },
      ],
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Mailjet respondio con ${response.status}: ${errorText}`)
  }
}

export async function submitApplication(
  _previousState: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  try {
    const name = getRequiredValue(formData, 'name', 'Nombre completo')
    const email = getRequiredValue(formData, 'email', 'Correo electronico')
    const phone = getRequiredValue(formData, 'phone', 'Telefono / WhatsApp')
    const commitmentValue = getRequiredValue(formData, 'commitment', 'Nivel de compromiso')
    const biomarkersValue = getRequiredValue(formData, 'biomarkers', 'Biomarcadores')
    const consent = formData.get('consent')
    const age = getValue(formData, 'age')
    const location = getValue(formData, 'location')

    if (!isValidEmail(email)) {
      throw new Error('Ingresa un correo electronico valido.')
    }

    if (!consent) {
      throw new Error('Debes aceptar el consentimiento para enviar tu solicitud.')
    }

    const commitment = commitmentLabels[commitmentValue]
    const biomarkers = biomarkersLabels[biomarkersValue]

    if (!commitment || !biomarkers) {
      throw new Error('Selecciona una opcion valida en todas las preguntas.')
    }

    await sendApplicationMail({
      name,
      email,
      phone,
      age,
      location,
      commitment,
      biomarkers,
    })

    return {
      status: 'success',
      message: 'Recibimos tu solicitud. Te contactaremos pronto para dar seguimiento.',
    }
  } catch (error) {
    console.error('Error sending /aplica submission', error)

    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'No pudimos enviar tu solicitud en este momento. Intenta nuevamente.',
    }
  }
}
