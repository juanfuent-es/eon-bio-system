import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Wallpaper } from '@/components/elements/wallpaper'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Hero } from '@/components/sections/hero'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import { clsx } from 'clsx/lite'
import Image from 'next/image'
import type { ReactNode } from 'react'

function SectionWithHeading({
  headline,
  subheadline,
  cta,
  layout = 'stack',
  tone = 'green-copper',
  full = false,
  children,
}: {
  headline: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
  layout?: 'stack' | 'split'
  tone?: 'green-copper' | 'emerald' | 'mist' | 'bone-mist'
  full?: boolean
  children?: ReactNode
}) {
  const isLightTone = tone === 'bone-mist'

  return (
    <section className="h-full w-full">
      <Wallpaper color={tone} className="wallpaper">
        <Container
          className={clsx(
            'flex flex-col gap-10 py-12 sm:gap-16 sm:py-16',
            full ? 'items-center text-center' : 'items-start text-left',
          )}
        >
          <div
            className={
              layout === 'split'
                ? 'grid w-full max-w-6xl gap-8 lg:grid-cols-2 lg:items-center'
                : `flex w-full max-w-6xl flex-col gap-6 ${full ? 'mx-auto' : ''}`
            }
          >
            <div
              className={
                layout === 'split'
                  ? `flex flex-col gap-6 text-left ${isLightTone ? 'text-green-900' : 'text-white'}`
                  : isLightTone
                    ? 'text-green-900'
                    : 'text-white'
              }
            >
              <Subheading>{headline}</Subheading>
              <Text
                size="lg"
                className={
                  layout === 'split'
                    ? `flex flex-col gap-4`
                    : `flex max-w-2xl flex-col gap-4 ${full ? 'mx-auto' : ''} ${isLightTone ? 'text-green-800/90' : 'text-white/90'}`
                }
              >
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

export default function Page() {
  return (
    <>
      {/* Hero */}
      <Hero
        imageSrc="/photos/eon-biosystem-home.png"
        imageAlt="Mujer entrenando en espacio natural"
        headline={
          <>
            <Image
              src="/logos/eon-logotype-descriptor.svg"
              alt="Logotipo EON BioSystem"
              width={100}
              height={70}
              className="w-64 drop-shadow-xl drop-shadow-amber-950/50 md:w-80 lg:w-96"
            />
          </>
        }
        eyebrow={
          <AnnouncementBadge
            href="/sistema"
            text="Un sistema de longevidad diseñado desde la ciencia."
            cta="Conoce más"
            variant="overlay"
          />
        }
        subheadline={
          <>
            <p>
              Un sistema integral que une <strong>fuerza, nutrición y biomarcadores</strong> para optimizar tu biología
              de forma sostenible.
            </p>
          </>
        }
        cta={
          <>
            {/* <ButtonLink href="/aplica" size="lg">
              Aplica al sistema <ArrowNarrowRightIcon />
            </ButtonLink> */}
            <p className="text-sm font-light text-green-200 italic">*Acceso mediante evaluación previa.</p>
          </>
        }
      />

      {/* Sección 2: Contexto / Problema y Sección 3: Qué es EON BioSystem, distribuidas en bento de 2 columnas */}
      <div className="grid grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2">
        <SectionWithHeading
          headline={
            <>
              La <i>longevidad</i> se construye <br />
              <i>todos los días</i>
            </>
          }
          subheadline={
            <>
              <p className="italic">Con el tiempo, el cuerpo cambia. La recuperación y el rendimiento también.</p>
              <p className="text-balance">
                Sin datos claros, nuestras decisiones se suelen basar en intuición o ensayo y error.{' '}
                <strong>EON BioSystem</strong> reemplaza la improvisación por un sistema diseñado desde la ciencia.
              </p>
            </>
          }
          cta={
            <PlainButtonLink href="/sistema">
              Conoce el método <ArrowNarrowRightIcon />
            </PlainButtonLink>
          }
          tone="emerald"
        />

        <SectionWithHeading
          headline={<>Un sistema, no un plan</>}
          subheadline={
            <>
              <p>
                EON BioSystem es un sistema de longevidad basado en el análisis de biomarcadores para diseñar
                estrategias personalizadas de entrenamiento, nutrición y suplementación.
              </p>
              <p>
                No es genérico ni una solución rápida.
                <br />
                Es un sistema pensado para acompañar tu biología a largo plazo.
              </p>
            </>
          }
          cta={
            <PlainButtonLink href="/sistema">
              Ver cómo funciona <ArrowNarrowRightIcon />
            </PlainButtonLink>
          }
          tone="emerald"
        />

        {/* Testimonio: Pamela Reyna, a todo el ancho del bento */}
        <section className="h-full w-full sm:col-span-2">
          <Wallpaper color="colors" className="wallpaper">
            <TestimonialLargeQuote
              id="testimonial"
              quote="Hace casi un año inicié mi cambio con pesas, hábitos y nutrición. Ricardo me ayudó a mejorar decisiones y mentalidad. El cambio ha sido impresionante: mejor condición física, técnica y casi no me enfermo."
              img={
                <a href="https://instagram.com/spadmereyna/" target="_blank" rel="noopener noreferrer">
                  <Image src="/avatars/pamela-reyna.png" alt="Pamela Reyna" width={240} height={240} />
                </a>
              }
              name="Pamela Reyna"
              byline={
                <a
                  href="https://instagram.com/spadmereyna/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-900 transition-colors hover:text-green-700"
                >
                  @spadmereyna
                </a>
              }
            />
          </Wallpaper>
        </section>

        {/* Sección 6: Para quién es */}
        <SectionWithHeading
          headline={
            <>
              EON no es para todos <br /> <small>*Esto es parte de nuestro sistema*</small>
            </>
          }
          subheadline={
            <>
              <p>
                Diseñado para quienes valoran la valoran la ciencia, buscan estructura y están dispuestas a seguir un
                sistema con criterio y constancia.
              </p>
              <p>No es para quienes buscan soluciones rápidas o atajos.</p>
              <p>
                <small>
                  <i>
                    *Trabajamos con un número limitado de personas para asegurar seguimiento, profundidad y calidad
                    real.
                  </i>
                </small>
              </p>
            </>
          }
          cta={
            <PlainButtonLink href="/aplica">
              Ver si califico <ArrowNarrowRightIcon />
            </PlainButtonLink>
          }
          tone="mist"
        />

        {/* Sección 7: Respaldo clínico */}
        <SectionWithHeading
          headline="Dirección y respaldo profesional"
          subheadline={
            <>
              <p className="">
                EON BioSystem opera con respaldo clínico de{' '}
                <a
                  href="https://ntsclinic.com"
                  title="Visita el sitio de NTS Clinic"
                  target="_blank"
                  className="underline transition-colors hover:text-orange-500"
                >
                  NTS Clinic
                </a>
                , que supervisa los aspectos médicos cuando el proceso lo exige.
              </p>
              <p className="mt-2 italic">*Acceso mediante evaluación previa.</p>
            </>
          }
          cta={
            <>
              <PlainButtonLink href="/acerca">
                Aplica ahora <ArrowNarrowRightIcon />
              </PlainButtonLink>
            </>
          }
          tone="bone-mist"
        />
      </div>
    </>
  )
}
