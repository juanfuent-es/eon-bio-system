'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import { initialApplicationFormState, submitApplication } from '@/app/aplica/actions'
import { Button } from '@/components/elements/button'

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
      {pending ? 'Enviando...' : 'Enviar solicitud'}
    </Button>
  )
}

export function ApplicationForm() {
  const [state, formAction] = useActionState(submitApplication, initialApplicationFormState)

  return (
    <form action={formAction} className="bg-bone-50/95 flex flex-col gap-8 rounded-lg p-6 shadow-sm sm:p-8">
      <fieldset className="border-mineral-200 flex flex-col gap-6 border-t pt-8">
        <legend className="text-obsidian-900 font-sans text-lg font-bold">Datos basicos</legend>

        <div>
          <label htmlFor="name" className="text-obsidian-900 block text-sm font-semibold">
            Nombre completo <span className="text-vital-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="border-mineral-300 bg-bone-50 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:ring-vital-100 mt-2 w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-obsidian-900 block text-sm font-semibold">
            Correo electronico <span className="text-vital-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="border-mineral-300 bg-bone-50 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:ring-vital-100 mt-2 w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-obsidian-900 block text-sm font-semibold">
            Telefono / WhatsApp <span className="text-vital-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="border-mineral-300 bg-bone-50 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:ring-vital-100 mt-2 w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
            placeholder="+52 55 0000 0000"
          />
        </div>

        <div>
          <label htmlFor="age" className="text-obsidian-900 block text-sm font-semibold">
            Edad
          </label>
          <input
            type="number"
            id="age"
            name="age"
            min="0"
            inputMode="numeric"
            className="border-mineral-300 bg-bone-50 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:ring-vital-100 mt-2 w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
            placeholder="35"
          />
        </div>

        <div>
          <label htmlFor="location" className="text-obsidian-900 block text-sm font-semibold">
            Ciudad y pais de residencia
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="border-mineral-300 bg-bone-50 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:ring-vital-100 mt-2 w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
            placeholder="Ciudad de Mexico, Mexico"
          />
        </div>
      </fieldset>

      <fieldset className="border-mineral-200 flex flex-col gap-6 border-t pt-8">
        <legend className="text-obsidian-900 font-sans text-lg font-bold">Preguntas de interes y compromiso</legend>

        <div className="flex flex-col gap-4">
          <label className="text-obsidian-900 block text-sm font-semibold">
            EON BioSystem requiere constancia y seguimiento. ¿Que nivel de compromiso estas dispuesto(a) a asumir?{' '}
            <span className="text-vital-600">*</span>
          </label>
          <div className="flex flex-col gap-3">
            {[
              {
                value: 'high',
                label: 'Alto - Puedo seguir indicaciones y priorizar el proceso.',
              },
              {
                value: 'medium',
                label: 'Medio - Puedo adaptarme al sistema con ciertas limitaciones.',
              },
              {
                value: 'low',
                label: 'Bajo - Busco algo flexible y con poca estructura.',
              },
            ].map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="commitment"
                  value={option.value}
                  required
                  className="text-vital-600 focus:ring-vital-100 h-4 w-4 focus:ring-2"
                />
                <span className="text-obsidian-700 text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-obsidian-900 block text-sm font-semibold">
            EON BioSystem se basa en la lectura y analisis de biomarcadores. ¿Estas dispuesto(a) a realizar analiticas
            de laboratorio de forma periodica (al menos cada 6 meses)? <span className="text-vital-600">*</span>
          </label>
          <div className="flex flex-col gap-3">
            {[
              {
                value: 'yes',
                label: 'Si - Entiendo que el laboratorio es parte central del sistema.',
              },
              {
                value: 'conditional',
                label: 'Si, con ciertas limitaciones - Dependeria del contexto o indicacion.',
              },
              {
                value: 'no',
                label: 'No - Prefiero no realizar estudios de laboratorio de forma periodica.',
              },
            ].map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="biomarkers"
                  value={option.value}
                  required
                  className="text-vital-600 focus:ring-vital-100 h-4 w-4 focus:ring-2"
                />
                <span className="text-obsidian-700 text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="border-mineral-200 flex flex-col gap-4 border-t pt-8">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            required
            className="text-vital-600 focus:ring-vital-100 mt-1 h-4 w-4 focus:ring-2"
          />
          <span className="text-obsidian-700 text-sm">
            Entiendo que este formulario corresponde a una solicitud de evaluacion inicial y que el envio no garantiza
            el ingreso al sistema.
          </span>
        </label>
      </fieldset>

      {state.status !== 'idle' ? (
        <p
          role="status"
          className={
            state.status === 'success'
              ? 'rounded-lg bg-green-100 px-4 py-3 text-sm text-green-900'
              : 'rounded-lg bg-red-100 px-4 py-3 text-sm text-red-900'
          }
        >
          {state.message}
        </p>
      ) : null}

      <div className="border-mineral-200 flex gap-4 border-t pt-8">
        <SubmitButton />
      </div>
    </form>
  )
}
