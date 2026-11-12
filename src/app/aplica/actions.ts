'use server'

import { sendApplication } from '@/lib/applications/delivery'
import { parseApplication, type ApplicationFormState, type ApplicationPayload } from '@/lib/applications/form'

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
      message: error instanceof Error ? error.message : 'Revisa tus respuestas para continuar.',
    }
  }

  try {
    const applicationId = await sendApplication(payload)
    return {
      status: 'success',
      applicationId,
      message:
        'Recibimos tu solicitud. Revisaremos tu información y te contactaremos si el sistema es compatible con tu contexto actual.',
    }
  } catch {
    // No exponer credenciales, datos personales ni respuestas del proveedor.
    console.error('No se pudo confirmar el envío de /aplica.')
    return {
      status: 'error',
      message: 'No pudimos confirmar el envío de tu solicitud. Intenta nuevamente en unos minutos.',
    }
  }
}
