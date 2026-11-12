'use server'

import { sendApplication } from '@/lib/applications/delivery'
import {
  applicationDeliveryError,
  parseApplication,
  type ApplicationFormState,
  type ApplicationPayload,
} from '@/lib/applications/form'

export async function submitApplication(
  _previousState: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  let payload: ApplicationPayload
  try {
    payload = parseApplication(formData)
  } catch (error) {
    return {
      status: 'error',
      title: 'Revisemos tus respuestas',
      message: error instanceof Error ? error.message : 'Revisa tus respuestas para continuar.',
    }
  }

  try {
    await sendApplication(payload)
    return {
      status: 'success',
      name: payload.name,
      email: payload.email,
      title: 'Tu primer paso está dado',
      message:
        'Gracias por compartir tu contexto con EON BioSystem. Revisaremos tus respuestas para evaluar cómo podemos acompañarte. Te enviaremos el resultado de la evaluación por correo electrónico.',
    }
  } catch {
    // No exponer credenciales, datos personales ni respuestas del proveedor.
    console.error('No se pudo confirmar el envío de /aplica.')
    return applicationDeliveryError
  }
}
