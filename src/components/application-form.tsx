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
      <label htmlFor={id} className="block text-sm/6 font-semibold text-white">
        {label}
        {required ? <span className="text-vital-300 ml-1">*</span> : null}
      </label>
      <div className="group relative mt-3">
        <span className="group-focus-within:text-vital-300 pointer-events-none absolute top-1/2 left-0 flex size-6 -translate-y-1/2 items-center justify-center text-white/52 transition-colors">
          {icon}
        </span>
        <input
          id={id}
          required={required}
          className="focus:border-vital-300 w-full border-0 border-b border-white/24 bg-transparent py-3 pr-3 pl-9 text-base text-white transition-colors outline-none placeholder:text-white/42"
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
  options: Array<{ value: string; label: string }>
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base/7 font-semibold text-white">
        {label} <span className="text-vital-300">*</span>
      </p>
      <div className="grid gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="hover:border-vital-300 grid cursor-pointer grid-cols-[1rem_1fr] items-start gap-3 border-l border-white/24 py-2 pl-4 transition-colors"
          >
            <input type="radio" name={name} value={option.value} required className="accent-vital-500 mt-1 size-4" />
            <span className="text-sm/6 text-white/78">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
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
      className="px-6 text-white disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? 'Enviando...' : 'Enviar solicitud'} <ArrowNarrowRightIcon />
    </Button>
  )
}

export function ApplicationForm() {
  const [state, formAction] = useActionState(submitApplication, initialApplicationFormState)

  return (
    <form action={formAction} className="flex flex-col gap-12">
      <fieldset className="grid gap-x-8 gap-y-7 border-t border-white/18 pt-8 md:grid-cols-2">
        <legend className="float-left mb-8 w-full text-lg/7 font-semibold text-white">Datos básicos</legend>

        <TextField
          id="name"
          name="name"
          label="Nombre completo"
          required
          icon={<UserCircleIcon className="size-5" />}
          placeholder="Tu nombre completo"
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Correo electrónico"
          required
          icon={<MailIcon className="size-5" />}
          placeholder="tu@email.com"
        />
        <TextField
          id="phone"
          name="phone"
          type="tel"
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
          className="md:col-span-2"
          icon={<MapPinIcon className="size-5" />}
          placeholder="Ciudad de México, México"
        />
      </fieldset>

      <fieldset className="grid gap-8 border-t border-white/18 pt-8 lg:grid-cols-2">
        <legend className="float-left mb-8 flex w-full items-center gap-3 text-lg/7 font-semibold text-white">
          <HeartPulseIcon className="text-vital-300 size-5" />
          Interés y compromiso
        </legend>

        <OptionGroup
          name="commitment"
          label="EON BioSystem requiere constancia y seguimiento. ¿Qué nivel de compromiso estás dispuesto(a) a asumir?"
          options={[
            {
              value: 'high',
              label: 'Alto: puedo seguir indicaciones y priorizar el proceso.',
            },
            {
              value: 'medium',
              label: 'Medio: puedo adaptarme al sistema con ciertas limitaciones.',
            },
            {
              value: 'low',
              label: 'Bajo: busco algo flexible y con poca estructura.',
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
      </fieldset>

      <fieldset className="border-t border-white/18 pt-8">
        <label className="grid cursor-pointer grid-cols-[1rem_1fr] items-start gap-3">
          <input type="checkbox" name="consent" required className="accent-vital-500 mt-1 size-4" />
          <span className="text-sm/6 text-white/78">
            Entiendo que este formulario corresponde a una solicitud de evaluación inicial y que el envío no garantiza
            el ingreso al sistema.
          </span>
        </label>
      </fieldset>

      {state.status !== 'idle' ? (
        <p
          role="status"
          className={
            state.status === 'success'
              ? 'border-renewal-300 bg-renewal-950/45 border-l px-4 py-3 text-sm text-white'
              : 'border-vital-300 bg-vital-950/45 border-l px-4 py-3 text-sm text-white'
          }
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col items-start justify-between gap-5 border-t border-white/18 pt-8 sm:flex-row sm:items-center">
        <p className="max-w-md text-sm/6 text-white/58">
          Revisaremos tu solicitud y te contactaremos si el sistema es compatible con tu contexto actual.
        </p>
        <SubmitButton />
      </div>
    </form>
  )
}
