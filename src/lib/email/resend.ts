type EmailMessage = {
  replyTo: string
  subject: string
  text: string
}

// HTTP directo: ambos formularios comparten configuración y confirmación de envío.
export async function sendEmail({ replyTo, subject, text }: EmailMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const fromName = process.env.RESEND_FROM_NAME ?? 'EON BioSystem'
  const to = (process.env.RESEND_TO_EMAIL ?? '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
  if (!apiKey || !fromEmail || !to.length) throw new Error('Falta configurar Resend.')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ from: `${fromName} <${fromEmail}>`, to, reply_to: replyTo, subject, text }),
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
    redirect: 'error',
  })
  if (!response.ok) throw new Error('Resend rechazó el envío.')
  const result = await response.json()
  if (typeof result.id !== 'string' || !result.id.trim()) throw new Error('Resend no confirmó el envío.')
}
