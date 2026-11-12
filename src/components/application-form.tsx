'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { submitApplication } from '@/app/aplica/actions'
import { Button } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'
import { HeartPulseIcon } from '@/components/icons/heart-pulse-icon'
import { MailIcon } from '@/components/icons/mail-icon'
import { MapPinIcon } from '@/components/icons/map-pin-icon'
import { WhatsAppIcon } from '@/components/icons/social/whatsapp-icon'
import { UserCircleIcon } from '@/components/icons/user-circle-icon'
import { applicationDeliveryError, applicationQuestions, initialApplicationFormState } from '@/lib/applications/form'
import { countries, mexicanStates } from '@/lib/applications/residence'
import type { ComponentProps, ReactNode } from 'react'

type TextFieldProps = {
  icon: ReactNode
  label: string
  required?: boolean
  className?: string
} & ComponentProps<'input'>

function TextField({ icon, label, required, className, id, ...props }: TextFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm/6 font-semibold text-green-950">
        {label}
      </label>
      <div className="group relative mt-2">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 flex size-5 -translate-y-1/2 items-center justify-center text-green-600 transition-colors group-focus-within:text-green-900"
        >
          {icon}
        </span>
        <input
          id={id}
          required={required}
          className="min-h-14 w-full min-w-0 rounded-xl border border-green-300 bg-green-50/50 py-3 pr-4 pl-12 text-base text-green-950 transition-colors outline-none placeholder:text-green-600 hover:border-green-500 focus:border-green-700 focus:bg-white focus:ring-2 focus:ring-green-700/20"
          {...props}
        />
      </div>
    </div>
  )
}

function OptionGroup({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: ReactNode
  name: string
  value: string
  onChange: (value: string) => void
  options: readonly { value: string; label: ReactNode }[]
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="max-w-2xl text-base/7 font-medium text-green-950 sm:text-lg/7">{label}</legend>
      <div className="mt-5 grid gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="grid min-h-14 cursor-pointer grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-3 rounded-xl border border-green-200 bg-white p-4 transition-colors hover:border-green-500 has-checked:border-green-700 has-checked:bg-green-50 has-focus-visible:ring-2 has-focus-visible:ring-green-700/30 sm:p-5"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              required
              onChange={(event) => onChange(event.target.value)}
              className="mt-1 size-5 accent-green-800"
            />
            <span className="text-base/7 text-green-900">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      aria-disabled={pending}
      className="w-full shrink-0 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {pending ? 'Enviando...' : 'Enviar solicitud'} <ArrowNarrowRightIcon />
    </Button>
  )
}

function ResidenceSelect({
  name,
  label,
  value,
  options,
  onChange,
}: {
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly { value: string; label: string }[]
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm/6 font-semibold text-green-950">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        required
        autoComplete={name === 'state_code' ? 'address-level1' : 'country'}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-14 w-full rounded-xl border border-green-300 bg-green-50/50 px-4 py-3 text-base text-green-950 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
      >
        <option value="">{name === 'state_code' ? 'Selecciona tu estado' : 'Selecciona tu país'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function ApplicationForm() {
  const [draft, setDraft] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const resultRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState(
    async (previousState: typeof initialApplicationFormState, data: FormData) => {
      let result
      try {
        result = await submitApplication(previousState, data)
      } catch {
        // A lost connection to the Server Action also keeps the draft available.
        result = applicationDeliveryError
      }
      setShowResult(true)
      return result
    },
    initialApplicationFormState,
  )

  useEffect(() => {
    if (showResult) resultRef.current?.focus()
  }, [showResult, state])

  // All fields are controlled so React's action reset cannot erase a failed submission.
  const updateField = (name: string, value: string) => setDraft((previous) => ({ ...previous, [name]: value }))
  const field = (name: string) => ({
    value: draft[name] ?? '',
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => updateField(name, event.target.value),
  })

  return (
    <>
      {showResult ? (
        <section
          ref={resultRef}
          tabIndex={-1}
          aria-labelledby="application-result-title"
          className="rounded-3xl border border-green-200 bg-green-50/60 px-6 py-10 text-green-950 outline-none sm:px-12 sm:py-14"
        >
          <span
            className="flex size-12 items-center justify-center rounded-full bg-white text-green-700"
            aria-hidden="true"
          >
            {state.status === 'success' ? <HeartPulseIcon className="size-6" /> : <MailIcon className="size-6" />}
          </span>
          <p className="mt-6 text-sm font-semibold tracking-widest uppercase">EON BioSystem</p>
          <h2 id="application-result-title" className="mt-3 font-serif text-3xl sm:text-4xl">
            {state.status === 'success' && state.name ? `${state.name}, tu primer paso está dado.` : state.title}
          </h2>
          <p role={state.status === 'error' ? 'alert' : 'status'} className="mt-5 max-w-2xl text-base/8 text-green-900">
            {state.message}
          </p>
          {state.status === 'success' ? (
            <p className="mt-5 text-sm/7 text-green-800">
              {state.email ? (
                <>
                  El resultado llegará a <strong className="break-all">{state.email}</strong>.{' '}
                </>
              ) : null}
              Revisa también tu carpeta de correo no deseado. Por ahora, no necesitas enviar otra solicitud.
            </p>
          ) : (
            <Button
              className="mt-8"
              onClick={() => {
                setShowResult(false)
                requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('input')?.focus())
              }}
            >
              Volver a mis respuestas <ArrowNarrowRightIcon />
            </Button>
          )}
        </section>
      ) : null}
      <form
        ref={formRef}
        action={formAction}
        hidden={showResult}
        className={showResult ? 'hidden' : 'flex min-w-0 flex-col gap-8 text-green-950 sm:gap-10'}
      >
        <fieldset className="min-w-0">
          <legend className="font-serif text-2xl text-green-950 sm:text-3xl">Completa estos campos</legend>
          <p className="mt-2 border-b border-green-200 pb-4 text-sm text-green-700">
            Todos los campos son obligatorios.
          </p>
          <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-8">
            <TextField
              {...field('name')}
              id="name"
              name="name"
              label="Nombre completo"
              maxLength={150}
              required
              autoComplete="name"
              icon={<UserCircleIcon className="size-5" />}
              placeholder="Tu nombre completo"
            />
            <TextField
              {...field('email')}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              label="Correo electrónico"
              maxLength={254}
              required
              icon={<MailIcon className="size-5" />}
              placeholder="tu@email.com"
            />
            <TextField
              {...field('phone')}
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              label="Teléfono / WhatsApp"
              maxLength={25}
              required
              icon={<WhatsAppIcon className="size-5" />}
              placeholder="+52 55 0000 0000"
            />
            <TextField
              {...field('age')}
              id="age"
              name="age"
              type="number"
              min="0"
              max="120"
              step="1"
              inputMode="numeric"
              label="Edad"
              required
              icon={<CalendarIcon className="size-5" />}
              placeholder="35"
            />
          </div>
        </fieldset>

        <fieldset className="min-w-0 border-t border-green-200 pt-8 sm:pt-10">
          <legend className="flex items-center gap-3 pr-4 font-serif text-2xl sm:text-3xl">
            <MapPinIcon className="size-6 text-green-700" /> Tu residencia
          </legend>
          <OptionGroup
            name="residence"
            label="¿Vives en México o en otro país?"
            value={draft.residence ?? ''}
            onChange={(value) => updateField('residence', value)}
            options={[
              { value: 'mexico', label: 'Vivo en México' },
              { value: 'abroad', label: 'Vivo en otro país' },
            ]}
          />
          {draft.residence ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <TextField
                {...field('city')}
                id="city"
                name="city"
                label="Ciudad de residencia"
                required
                maxLength={100}
                autoComplete="address-level2"
                icon={<MapPinIcon className="size-5" />}
                placeholder="Tu ciudad"
              />
              {draft.residence === 'mexico' ? (
                <ResidenceSelect
                  onChange={(value) => updateField('state_code', value)}
                  name="state_code"
                  label="Estado"
                  value={draft.state_code ?? ''}
                  options={mexicanStates}
                />
              ) : (
                <ResidenceSelect
                  onChange={(value) => updateField('country_code', value)}
                  name="country_code"
                  label="País"
                  value={draft.country_code ?? ''}
                  options={countries.filter(({ value }) => value !== 'MX')}
                />
              )}
            </div>
          ) : null}
        </fieldset>

        <fieldset className="min-w-0 border-t border-green-200 pt-8 sm:pt-10">
          <legend className="flex items-center gap-3 pr-4 font-serif text-2xl text-green-950 sm:text-3xl">
            <HeartPulseIcon className="size-6 shrink-0 text-green-700" />
            Interés y compromiso
          </legend>

          <div className="flex flex-col gap-10 sm:gap-12">
            {applicationQuestions.map((question) => (
              <OptionGroup
                onChange={(value) => updateField(question.name, value)}
                key={question.name}
                {...question}
                value={draft[question.name] ?? ''}
              />
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-green-200 bg-green-50/50 p-4">
            <label className="grid cursor-pointer grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                checked={draft.consent === 'on'}
                onChange={(event) => updateField('consent', event.target.checked ? 'on' : '')}
                required
                className="mt-1 size-5 accent-green-800"
              />
              <span className="text-sm/6 text-green-900">
                Entiendo que este formulario corresponde a una solicitud de evaluación inicial y que el envío no
                garantiza el ingreso al sistema.
              </span>
            </label>
          </div>

          <div className="flex justify-end">
            <SubmitButton />
          </div>
        </div>
      </form>
    </>
  )
}
