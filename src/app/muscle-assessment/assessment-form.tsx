'use client'

import { Button, ButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { useActionState, useEffect, useState, type ComponentProps } from 'react'
import { submitAssessment } from './actions'
import { objectives, sources, type AssessmentState } from './options'

function track(event: string, parameters: Record<string, string> = {}) {
  const analytics = window as Window & {
    dataLayer?: unknown[]
    gtag?: (command: string, event: string, parameters: Record<string, string>) => void
  }
  analytics.dataLayer ??= []
  analytics.gtag ??= function () {
    // gtag queues Arguments objects, as required by its command interface.
    // eslint-disable-next-line prefer-rest-params
    analytics.dataLayer!.push(arguments)
  }
  analytics.gtag('event', event, parameters)
}

export function AssessmentLink({ placement, className }: { placement: string; className?: string }) {
  return (
    <ButtonLink
      href="https://wa.me/+525549562488"
      size="lg"
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('assessment_request_click', { placement })}
    >
      Solicitar mi pre-evaluación <ArrowNarrowRightIcon />
    </ButtonLink>
  )
}

function Field({ label, name, ...props }: ComponentProps<'input'> & { label: string; name: string }) {
  return (
    <label className="flex flex-col gap-3 text-sm/6 font-semibold">
      {label}
      <input
        {...props}
        name={name}
        required
        className="w-full border-0 border-b border-white/30 bg-transparent px-1 py-3 text-base text-white outline-none focus:border-orange-300"
      />
    </label>
  )
}
function Options({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="flex flex-col gap-3 text-sm/6 font-semibold">
      {label}
      <select
        name={name}
        required
        defaultValue=""
        className="w-full rounded-lg border border-white/30 bg-green-900 p-3 text-base text-white focus:outline-orange-300"
      >
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

export function AssessmentForm() {
  const [started, setStarted] = useState(false)
  const [modality, setModality] = useState('')
  const [qrSource, setQrSource] = useState('')
  const [state, action, pending] = useActionState(submitAssessment, { status: 'idle', message: '' } as AssessmentState)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const source = params.get('qr_source') ?? ''
    const allowed = ['gimnasio', 'futbol-americano', 'pacientes', 'tarjeta-general']
    if (allowed.includes(source)) {
      track('assessment_qr_visit', { source })
    }
  }, [])
  useEffect(() => {
    if (state.status === 'success') {
      track('assessment_form_submit', { modality: state.modality! })
      track(state.modality === 'presencial' ? 'assessment_lead_cdmx' : 'assessment_lead_remote')
    }
  }, [state])
  if (state.status === 'success')
    return (
      <div role="status" className="flex max-w-2xl flex-col items-start gap-6">
        <p className="text-xl/8">{state.message}</p>
        <ButtonLink href="https://wa.me/525549562488" onClick={() => track('assessment_whatsapp_click')}>
          Contactar a EON por WhatsApp
        </ButtonLink>
      </div>
    )
  return (
    <div className="w-full max-w-3xl">
      {!started ? (
        <Button
          size="lg"
          onClick={() => {
            setQrSource(new URLSearchParams(window.location.search).get('qr_source')?.slice(0, 100) ?? '')
            setStarted(true)
            track('assessment_form_start')
          }}
        >
          Comenzar pre-evaluación
        </Button>
      ) : (
        <div className="flex flex-col gap-8">
          <fieldset disabled={pending} className="flex flex-col gap-4">
            <legend className="mb-4 text-xl">¿Dónde vives?</legend>
            {[
              ['presencial', 'Vivo en Ciudad de México o puedo acudir presencialmente.'],
              ['remota', 'Vivo fuera de Ciudad de México.'],
            ].map(([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/25 p-4"
              >
                <input
                  autoFocus={value === 'presencial'}
                  type="radio"
                  name="location-choice"
                  value={value}
                  checked={modality === value}
                  onChange={() => setModality(value)}
                  className="mt-1 size-4 accent-orange-500"
                />
                {label}
              </label>
            ))}
          </fieldset>
          {modality && (
            <form action={action} className="flex flex-col gap-8">
              <input type="hidden" name="modality" value={modality} />
              <input type="hidden" name="qr_source" value={qrSource} />
              {modality === 'remota' && (
                <p className="text-base/7 text-white/80">
                  Actualmente el EON Muscle Assessment™ completo se realiza de forma presencial en Ciudad de México.
                  Estamos desarrollando una modalidad remota. Deja tus datos para recibir información cuando esté
                  disponible.
                </p>
              )}
              <fieldset disabled={pending} className="grid gap-6 sm:grid-cols-2">
                <Field label="Nombre" name="name" autoComplete="name" maxLength={150} />
                <Field
                  label="WhatsApp"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={25}
                  pattern="[+0-9\s()\-]{7,25}"
                />
                <Field label="Correo electrónico" name="email" type="email" autoComplete="email" maxLength={254} />
                {modality === 'presencial' ? (
                  <Field label="Edad" name="age" type="number" min={1} max={120} />
                ) : (
                  <Field label="Ciudad / país" name="location" maxLength={200} />
                )}
                <Options label="Objetivo principal" name="objective" options={objectives} />
                {modality === 'presencial' && (
                  <>
                    <Options
                      label="¿Has entrenado fuerza en los últimos 6 meses?"
                      name="training"
                      options={['Sí', 'No']}
                    />
                    <Options label="¿Qué te motivó a solicitar esta evaluación?" name="source" options={sources} />
                  </>
                )}
                <label className="flex items-start gap-3 text-sm/6 sm:col-span-2">
                  <input type="checkbox" name="consent" required className="mt-1 size-4 accent-orange-500" />
                  <span>
                    He leído el{' '}
                    <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="underline">
                      aviso de privacidad
                    </a>{' '}
                    y acepto que EON me contacte para dar seguimiento a esta solicitud.
                  </span>
                </label>
              </fieldset>
              {state.status === 'error' && (
                <p role="alert" className="border-l border-orange-300 p-4">
                  {state.message}
                </p>
              )}
              <Button type="submit" size="lg" disabled={pending} className="self-start disabled:opacity-50">
                {pending ? 'Enviando…' : 'Enviar pre-evaluación'}
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
