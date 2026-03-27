import { ButtonLink } from '@/components/elements/button'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import { Hero } from '@/components/sections/hero'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import type { ReactNode } from 'react'
import { Wallpaper } from '@/components/elements/wallpaper'

function SectionWithHeading({
  headline,
  subheadline,
  cta,
  layout = 'stack',
  tone = 'emerald',
  children,
}: {
  headline: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
  layout?: 'stack' | 'split'
  tone?: 'green-copper' | 'emerald' | 'mist' | 'bone-mist'
  children?: ReactNode
}) {
  const isLightTone = tone === 'bone-mist'

  return (
    <section className="px-4">
      <Wallpaper color={tone} className="wallpaper rounded-lg">
        <Container className="flex flex-col gap-10 sm:gap-16 items-center text-left md:text-center py-12 sm:py-16">
          <div className={layout === 'split' ? 'grid w-full max-w-6xl gap-8 lg:grid-cols-2 lg:items-center' : 'flex w-full max-w-6xl flex-col gap-6'}>
            <div className={layout === 'split' ? `flex flex-col gap-6 text-left ${isLightTone ? 'text-green-900' : 'text-white'}` : isLightTone ? 'text-green-900' : 'text-white'}>
              <Subheading>{headline}</Subheading>
              <Text size="lg" className={layout === 'split' ? 'flex flex-col gap-4' : `mx-auto flex max-w-2xl flex-col gap-4 ${isLightTone ? 'text-green-800/90' : 'text-white/90'}`}>
                {subheadline}
              </Text>
              {cta && <div className="pt-2">{cta}</div>}
            </div>
            {layout === 'split' && children ? <div className="w-full">{children}</div> : null}
          </div>
          {layout === 'stack' ? children : null}
        </Container>
      </Wallpaper>
    </section>
  )
}

export default function Aplica() {
  return (
    <>
      {/* Hero */}
      <Hero
        id="hero"
        imageSrc="/photos/eon-biosystem-aplica.png"
        imageAlt="Evaluación inicial y acompañamiento personalizado"
        headline={
          <>
            Todo gran cambio comienza <br />
            por el <em>primer paso</em>
          </>
        }
        subheadline={
          <>
            <p>Si estás listo para transformar tu biología de forma consciente y estructurada,
              <em>este es el momento de empezar.</em></p>
            <p>El proceso comienza con una evaluación de compatibilidad y compromiso.</p>

          </>
        }
        cta={
          <ButtonLink href="#form" size="lg">
            Enviar solicitud
          </ButtonLink>
        }
      />

      {/* Sección 3: Formulario */}
      <section id="form" className="p-4">
        <Wallpaper color="mist" className="wallpaper rounded-lg">
          <Container className="max-w-2xl py-12 sm:py-16">
            <div className="mb-12 flex flex-col gap-6 text-white">
              <Subheading>Aplicación</Subheading>
              <Text size="lg" className="text-white/90">
                Déjanos tus datos y responde brevemente las preguntas. La información se utiliza únicamente para
                evaluar tu solicitud.
              </Text>
            </div>

            <form className="flex flex-col gap-8 rounded-lg bg-bone-50/95 p-6 sm:p-8 shadow-sm">
              {/* Datos básicos */}
              <fieldset className="flex flex-col gap-6 border-t border-mineral-200 pt-8 ">
                <legend className="text-lg font-sans font-bold text-obsidian-900 ">
                  Datos básicos
                </legend>

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-obsidian-900 ">
                    Nombre completo <span className="text-vital-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-2 w-full rounded-lg border border-mineral-300 bg-bone-50 px-4 py-3 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:outline-none focus:ring-2 focus:ring-vital-100"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-obsidian-900 ">
                    Correo electrónico <span className="text-vital-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-2 w-full rounded-lg border border-mineral-300 bg-bone-50 px-4 py-3 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:outline-none focus:ring-2 focus:ring-vital-100"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-obsidian-900 "
                  >
                    Teléfono / WhatsApp <span className="text-vital-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="mt-2 w-full rounded-lg border border-mineral-300 bg-bone-50 px-4 py-3 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:outline-none focus:ring-2 focus:ring-vital-100"
                    placeholder="+57 300 000 0000"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-semibold text-obsidian-900 ">
                    Edad
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    className="mt-2 w-full rounded-lg border border-mineral-300 bg-bone-50 px-4 py-3 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:outline-none focus:ring-2 focus:ring-vital-100"
                    placeholder="35"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold text-obsidian-900 "
                  >
                    Ciudad y país de residencia
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="mt-2 w-full rounded-lg border border-mineral-300 bg-bone-50 px-4 py-3 text-obsidian-900 placeholder-mineral-500 focus:border-vital-500 focus:outline-none focus:ring-2 focus:ring-vital-100"
                    placeholder="Medellín, Colombia"
                  />
                </div>
              </fieldset>

              {/* Preguntas de compromiso */}
              <fieldset className="flex flex-col gap-6 border-t border-mineral-200 pt-8 ">
                <legend className="text-lg font-sans font-bold text-obsidian-900 ">
                  Preguntas de interés y compromiso
                </legend>

                <div className="flex flex-col gap-4">
                  <label className="block text-sm font-semibold text-obsidian-900 ">
                    EON BioSystem requiere constancia y seguimiento. ¿Qué nivel de compromiso estás dispuesto(a) a
                    asumir? <span className="text-vital-600">*</span>
                  </label>
                  <div className="flex flex-col gap-3">
                    {[
                      {
                        value: 'high',
                        label: 'Alto — Puedo seguir indicaciones y priorizar el proceso.',
                      },
                      {
                        value: 'medium',
                        label: 'Medio — Puedo adaptarme al sistema con ciertas limitaciones.',
                      },
                      {
                        value: 'low',
                        label: 'Bajo — Busco algo flexible y con poca estructura.',
                      },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="commitment"
                          value={option.value}
                          required
                          className="h-4 w-4 text-vital-600 focus:ring-2 focus:ring-vital-100"
                        />
                        <span className="text-sm text-obsidian-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="block text-sm font-semibold text-obsidian-900 ">
                    EON BioSystem se basa en la lectura y análisis de biomarcadores. ¿Estás dispuesto(a) a realizar
                    analíticas de laboratorio de forma periódica (al menos cada 6 meses)? <span className="text-vital-600">*</span>
                  </label>
                  <div className="flex flex-col gap-3">
                    {[
                      {
                        value: 'yes',
                        label: 'Sí — Entiendo que el laboratorio es parte central del sistema.',
                      },
                      {
                        value: 'conditional',
                        label: 'Sí, con ciertas limitaciones — Dependería del contexto o indicación.',
                      },
                      {
                        value: 'no',
                        label: 'No — Prefiero no realizar estudios de laboratorio de forma periódica.',
                      },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="biomarkers"
                          value={option.value}
                          required
                          className="h-4 w-4 text-vital-600 focus:ring-2 focus:ring-vital-100"
                        />
                        <span className="text-sm text-obsidian-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* Consentimiento */}
              <fieldset className="flex flex-col gap-4 border-t border-mineral-200 pt-8 ">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-4 w-4 text-vital-600 focus:ring-2 focus:ring-vital-100"
                  />
                  <span className="text-sm text-obsidian-700">
                    Entiendo que este formulario corresponde a una solicitud de evaluación inicial y que el envío no
                    garantiza el ingreso al sistema.
                  </span>
                </label>
              </fieldset>

              {/* Botón de envío */}
              <div className="flex gap-4 border-t border-mineral-200 pt-8 ">
                <ButtonLink href="#" type="submit">
                  Enviar solicitud
                </ButtonLink>
              </div>
            </form>
          </Container>
        </Wallpaper>
      </section>


    </>
  )
}
