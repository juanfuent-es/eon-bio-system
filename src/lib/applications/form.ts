export type ApplicationFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export const initialApplicationFormState: ApplicationFormState = { status: 'idle', message: '' }

export const commitmentQuestion = {
  name: 'commitment',
  label: 'EON BioSystem requiere constancia y seguimiento. ¿Qué nivel de compromiso estás dispuesto a asumir?',
  options: [
    { value: 'high', label: 'Alto: puedo seguir indicaciones y priorizar el proceso.' },
    { value: 'medium', label: 'Medio: puedo adaptarme al sistema con ciertas limitaciones.' },
    { value: 'low', label: 'Bajo: busco algo flexible con poca estructura.' },
  ],
} as const

export const accompanimentQuestion = {
  name: 'accompaniment',
  label:
    'EON BioSystem trabaja sobre un proceso continuo de evaluación, seguimiento y ajustes. ¿Qué tipo de acompañamiento estás buscando?',
  options: [
    {
      value: 'integral',
      label:
        'Integral: quiero entender mi situación actual y trabajar de forma estructurada en nutrición, fuerza, salud y hábitos a lo largo del tiempo.',
    },
    {
      value: 'partial',
      label: 'Parcial: me interesa mejorar, pero por ahora podría comprometerme solo con algunas áreas del sistema.',
    },
    {
      value: 'one_off',
      label:
        'Puntual: busco principalmente una consulta aislada, una dieta o una solución específica sin seguimiento continuo.',
    },
  ],
} as const

export const applicationQuestions = [commitmentQuestion, accompanimentQuestion] as const

export type ApplicationPayload = {
  name: string
  email: string
  phone: string
  age: number
  location: string
  commitment: (typeof commitmentQuestion.options)[number]['value']
  accompaniment: (typeof accompanimentQuestion.options)[number]['value']
  consent: true
  source: '/aplica'
  schema_version: 1
  submitted_at: string
}

function parseOption<T extends string>(value: string, options: readonly { value: T }[]): T {
  const option = options.find((option) => option.value === value)
  if (!option) throw new Error('Selecciona una opción válida en todas las preguntas.')
  return option.value
}

export function parseApplication(data: FormData): ApplicationPayload {
  const value = (key: string) => {
    const entry = data.get(key)
    return typeof entry === 'string' ? entry.trim() : ''
  }
  const name = value('name')
  const email = value('email')
  const phone = value('phone')
  const age = value('age')
  const location = value('location')

  if (!name || name.length > 150) throw new Error('Ingresa tu nombre completo (máximo 150 caracteres).')
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error('Ingresa un correo electrónico válido.')
  if (!/^[+\d\s()-]{7,25}$/.test(phone) || phone.replace(/\D/g, '').length < 7)
    throw new Error('Ingresa un teléfono válido con código de país.')
  if (!/^\d{1,3}$/.test(age) || Number(age) > 120) throw new Error('Ingresa una edad entera entre 0 y 120 años.')
  if (!location || location.length > 200)
    throw new Error('Ingresa tu ciudad y país de residencia (máximo 200 caracteres).')
  if (value('consent') !== 'on') throw new Error('Debes aceptar el consentimiento para enviar tu solicitud.')

  return {
    name,
    email,
    phone,
    age: Number(age),
    location,
    commitment: parseOption(value('commitment'), commitmentQuestion.options),
    accompaniment: parseOption(value('accompaniment'), accompanimentQuestion.options),
    consent: true,
    source: '/aplica',
    schema_version: 1,
    submitted_at: new Date().toISOString(),
  }
}
