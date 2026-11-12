import type { ApplicationPayload } from './form'

export async function sendApplication(payload: ApplicationPayload): Promise<string> {
  const url = process.env.APPLICATION_API_URL
  const token = process.env.APPLICATION_API_TOKEN
  if (!url || !token) throw new Error('Configuración de API incompleta.')
  if (new URL(url).protocol !== 'https:') throw new Error('La API requiere HTTPS.')

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
    redirect: 'error',
  })
  if (response.status !== 201) throw new Error('La API no confirmó el registro.')
  const result: unknown = await response.json()
  if (
    !result ||
    typeof result !== 'object' ||
    !('id' in result) ||
    typeof result.id !== 'string' ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(result.id)
  )
    throw new Error('Respuesta de API inválida.')

  return result.id
}
