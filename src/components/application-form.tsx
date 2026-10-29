'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import { initialApplicationFormState, submitApplication } from '@/app/aplica/actions'
import { Button } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CalendarIcon } from '@/components/icons/calendar-icon'
import { HeartPulseIcon } from '@/components/icons/heart-pulse-icon'
import { MailIcon } from '@/components/icons/mail-icon'
import { MapPinIcon } from '@/components/icons/map-pin-icon'
import { WhatsAppIcon } from '@/components/icons/social/whatsapp-icon'
import { UserCircleIcon } from '@/components/icons/user-circle-icon'
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
        {required ? (
          <span className="ml-1 text-orange-700" aria-hidden="true">
            *
          </span>
        ) : null}
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
}: {
  label: ReactNode
  name: string
  options: Array<{ value: string; label: ReactNode }>
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="max-w-2xl text-base/7 font-medium text-green-950 sm:text-lg/7">
        {label}{' '}
        <span className="text-orange-700" aria-hidden="true">
          *
        </span>
      </legend>
      <div className="mt-5 grid gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="grid min-h-14 cursor-pointer grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-3 rounded-xl border border-green-200 bg-white p-4 transition-colors hover:border-green-500 has-checked:border-green-700 has-checked:bg-green-50 has-focus-visible:ring-2 has-focus-visible:ring-green-700/30 sm:p-5"
          >
            <input type="radio" name={name} value={option.value} required className="mt-1 size-5 accent-green-800" />
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

export function ApplicationForm() {
  const [state, formAction] = useActionState(submitApplication, initialApplicationFormState)

  return (
    <form action={formAction} className="flex min-w-0 flex-col gap-12 text-green-950 sm:gap-16">
      <p className="border-b border-green-200 pb-6 text-sm text-green-700">
        Los campos marcados con <span className="text-orange-700">*</span> son obligatorios.
      </p>
      <fieldset className="min-w-0">
        <legend className="font-serif text-2xl text-green-950 sm:text-3xl">Datos básicos</legend>
        <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-8">
          <TextField
            id="name"
            name="name"
            label="Nombre completo"
            required
            autoComplete="name"
            icon={<UserCircleIcon className="size-5" />}
            placeholder="Tu nombre completo"
          />
          <TextField
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            label="Correo electrónico"
            required
            icon={<MailIcon className="size-5" />}
            placeholder="tu@email.com"
          />
          <TextField
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            label="Teléfono / WhatsApp"
            required
            icon={<WhatsAppIcon className="size-5" />}
            placeholder="+52 55 0000 0000"
          />
          <TextField
            id="age"
            name="age"
            type="number"
            min="0"
            inputMode="numeric"
            label="Edad"
            icon={<CalendarIcon className="size-5" />}
            placeholder="35"
          />
          <TextField
            id="location"
            name="location"
            label="Ciudad y país de residencia"
            className="sm:col-span-2"
            icon={<MapPinIcon className="size-5" />}
            placeholder="Ciudad de México, México"
          />
        </div>
      </fieldset>

      <fieldset className="min-w-0 border-t border-green-200 pt-8 sm:pt-10">
        <legend className="flex items-center gap-3 pr-4 font-serif text-2xl text-green-950 sm:text-3xl">
          <HeartPulseIcon className="size-6 shrink-0 text-green-700" />
          Interés y compromiso
        </legend>

        <div className="flex flex-col gap-10 sm:gap-12">
          <OptionGroup
            name="commitment"
            label={
              <>
                <strong>EON BioSystem</strong> trabaja sobre un <em>proceso continuo</em> de{' '}
                <strong>evaluación, seguimiento y ajustes</strong>. ¿Qué tipo de <em>acompañamiento</em> estás buscando?
              </>
            }
            options={[
              {
                value: 'high',
                label: (
                  <>
                    <strong>Integral:</strong> quiero entender mi <em>situación actual</em> y trabajar de forma{' '}
                    <strong>estructurada en nutrición, fuerza, salud y hábitos</strong> a lo largo del tiempo.
                  </>
                ),
              },
              {
                value: 'medium',
                label: (
                  <>
                    <strong>Parcial:</strong> me interesa mejorar, pero por ahora podría comprometerme solo con{' '}
                    <em>algunas áreas del sistema</em>.
                  </>
                ),
              },
              {
                value: 'low',
                label: (
                  <>
                    <strong>Puntual:</strong> busco principalmente una <em>consulta aislada</em>, una dieta o una{' '}
                    solución específica <strong>sin seguimiento continuo</strong>.
                  </>
                ),
              },
            ]}
          />

          <OptionGroup
            name="biomarkers"
            label="EON BioSystem se basa en la lectura y el análisis de biomarcadores. ¿Estás dispuesto(a) a realizar analíticas de laboratorio de forma periódica?"
            options={[
              {
                value: 'yes',
                label: 'Sí: entiendo que el laboratorio es parte central del sistema.',
              },
              {
                value: 'conditional',
                label: 'Sí, con ciertas limitaciones: dependería del contexto o de la indicación.',
              },
              {
                value: 'no',
                label: 'No: prefiero no realizar estudios de laboratorio de forma periódica.',
              },
            ]}
          />
        </div>
      </fieldset>

      <div className="rounded-xl border border-green-200 bg-green-50/50 p-5 sm:p-6">
        <label className="grid cursor-pointer grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-3">
          <input type="checkbox" name="consent" required className="mt-1 size-5 accent-green-800" />
          <span className="text-sm/6 text-green-900">
            Entiendo que este formulario corresponde a una solicitud de evaluación inicial y que el envío no garantiza
            el ingreso al sistema.
          </span>
        </label>
      </div>

      {state.status !== 'idle' ? (
        <p
          role={state.status === 'error' ? 'alert' : 'status'}
          className={
            state.status === 'success'
              ? 'rounded-xl border border-green-300 bg-green-50 p-5 text-green-950'
              : 'rounded-xl border border-orange-300 bg-orange-50 p-5 text-orange-900'
          }
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col items-start justify-between gap-6 border-t border-green-200 pt-8 sm:gap-8 md:flex-row md:items-center">
        <p className="max-w-md text-sm/7 text-green-700">
          Revisaremos tu solicitud y te contactaremos si el sistema es compatible con tu contexto actual.
        </p>
        <SubmitButton />
      </div>
    </form>
  )
}
