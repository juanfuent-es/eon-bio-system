import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { SectionScrollSnap } from '@/components/elements/section-scroll-snap'
import { Subheading } from '@/components/elements/subheading'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Hero } from '@/components/sections/hero'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import Image from 'next/image'
import type { ReactNode } from 'react'

function HomeTextSection({
  id,
  headline,
  children,
  cta,
}: {
  id: string
  headline: ReactNode
  children: ReactNode
  cta?: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="text-section w-full text-green-950"
    >
      <Container className="max-sm:px-0">
        <article className="mx-auto flex w-[90%] max-w-4xl flex-col items-center gap-8 text-center sm:gap-10">
          <Subheading id={`${id}-heading`}>{headline}</Subheading>
          <div className="flex max-w-2xl flex-col gap-6 text-balance text-green-900">{children}</div>
          {cta && <div className="flex max-w-full flex-wrap justify-center gap-3 pt-2">{cta}</div>}
        </article>
      </Container>
    </section>
  )
}

export default function Page() {
  return (
    <>
      <SectionScrollSnap closingId="publicaciones" />
      <Hero
        data-snap-page="responsive"
        imageSrc="/photos/eon-biosystem-home.png"
        imageAlt="Mujer entrenando en espacio natural"
        eyebrow={
          <p className="mb-6 max-w-[calc(100%-2rem)] rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-xs/5 font-medium text-white/90 backdrop-blur-sm sm:px-5 sm:text-sm/5">
            Preserva tu capacidad, salud y autonomía a largo plazo.
          </p>
        }
        logo={{ src: '/logos/eon-logotype-descriptor.svg', alt: 'Logotipo EON BioSystem' }}
        subtitle={
          <>
            La <em>longevidad</em> no se improvisa.
          </>
        }
        subheadline={
          <>
            <p>
              Un sistema de <strong>evaluación, fuerza, nutrición y seguimiento biológico</strong> para entender
              cómo estás hoy y construir <em>cómo quieres vivir mañana</em>.
            </p>
          </>
        }
        cta={
          <>
            <div className="flex w-full flex-wrap justify-center gap-3">
              <ButtonLink href="/aplica" size="lg">
                Aplica al sistema <ArrowNarrowRightIcon />
              </ButtonLink>
              <PlainButtonLink href="/sistema" size="lg">
                Conoce más <ArrowNarrowRightIcon />
              </PlainButtonLink>
            </div>
            <p className="text-green-200 italic">
              <small>*Acceso mediante evaluación previa.</small>
            </p>
          </>
        }
      />

      <HomeTextSection
        id="longevidad"
        headline={
          <>
            La <i>longevidad</i> se construye
            <br />
            <i>todos los días</i>
          </>
        }
      >
        <p>
          Con el tiempo, <em>el cuerpo cambia</em>. La recuperación, <strong>la fuerza</strong> y la forma en que respondemos
          también.
        </p>
        <p>
          Sin datos claros, nuestras decisiones se suelen basar en intuición o ensayo y error.{' '}
          <strong>EON BioSystem</strong> reemplaza la improvisación por un sistema diseñado desde la ciencia.
        </p>
      </HomeTextSection>

      <Hero
        id="edad-muscular"
        headingLevel={2}
        imagePriority={false}
        imageSrc="/muscle-assessment/video-cover-yt.jpg"
        imageAlt="Ricardo realizando una evaluación de fuerza de agarre"
        headline={
          <Image
            src="/logos/muscle-assessment-discover.svg"
            alt="Descubre qué edad tienen tus músculos"
            width={623}
            height={135}
            className="h-auto w-full max-w-3xl"
          />
        }
        subheadline={null}
        cta={
          <>
            <ButtonLink href="/muscle-assessment" size="lg">
              Conoce tu edad muscular <ArrowNarrowRightIcon />
            </ButtonLink>
            <p className="text-green-200 italic">
              <small>*Descúbrelo en 15 minutos.</small>
            </p>
          </>
        }
      />

      <HomeTextSection
        id="sistema"
        headline={
          <>
            Un <i>sistema</i>, no un plan
          </>
        }
        cta={
          <ButtonLink href="/sistema" size="lg">
            Conoce el sistema <ArrowNarrowRightIcon />
          </ButtonLink>
        }
      >
        <p>
          EON BioSystem integra <strong>información biológica, composición corporal, fuerza, función y hábitos</strong>{' '}
          para entender qué necesita tu cuerpo y orientar <em>decisiones personalizadas</em>.
        </p>
        <p>
          No buscamos una intervención aislada, sino <strong>acompañar tu evolución</strong> a lo largo del tiempo.
        </p>
      </HomeTextSection>

      <TestimonialLargeQuote
        id="testimonial"
        aria-label="Testimonio de Jesús Josúe"
        quote={
          <>
            Mi experiencia en estos 5 años con el <a href="https://instagram.com/ricardo.sanchez.mx/" className="underline font-bold" target="_blank" rel="noopener noreferrer">Lic. Ricardo Sánchez</a>, que además lo estimo como un amigo, ha sido de{' '}
            <strong>superación</strong>. <br /><br />Juntos hemos trabajado en construir un gran físico, pero sobre todo, me ha
            enseñado sobre <strong>salud, nutrición, resiliencia, longevidad y desarrollo personal</strong>.<br /><br />Muy contento con la
            experiencia EON.
          </>
        }
        img={
          <a href="https://www.instagram.com/jesuslae/" target="_blank" rel="noopener noreferrer">
            <Image src="/avatars/jesus-sanchez.png" alt="Jesús Josúe" width={240} height={240} />
          </a>
        }
        name="Jesús Josúe"
        byline={
          <a
            href="https://www.instagram.com/jesuslae/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-900 transition-colors hover:text-orange-500"
          >
            @jesuslae
          </a>
        }
      />

      <Hero
        id="para-quien-es"
        headingLevel={2}
        imagePriority={false}
        imageSrc="/muscle-assessment/no-es-para-todos.jpg"
        imageAlt="Un adulto mayor realizando un ejercicio de fuerza con una barra bajo supervisión profesional"
        imageClassName="object-[65%_center] sm:object-center"
        headline={
          <>
            Este sistema <i>no es para todos</i>
          </>
        }
        subheadline={
          <>
            <p>
              Es para personas que quieren <strong>cuidar su bienestar</strong>, entender su cuerpo y preservar su{' '}
              <em>fuerza y autonomía</em> con el paso del tiempo.
            </p>
            <p>
              Para quienes están dispuestos a <strong>comprometerse con su proceso</strong> y construir salud con criterio
              y constancia, <em>en cada etapa de la vida</em>.
            </p>
          </>
        }
        cta={
          <ButtonLink href="/aplica" size="lg">
            Aplica al sistema <ArrowNarrowRightIcon />
          </ButtonLink>
        }
      />

      <Hero
        id="publicaciones"
        headingLevel={2}
        imagePriority={false}
        imageSrc="/eon-publicaciones.jpg"
        imageAlt="Ricardo Sánchez, EON Publicaciones"
        headline={
          <>
            Entiende a tu <i>cuerpo</i>,<br />
            mejora tus <i>decisiones</i>.
          </>
        }
        subheadline={
          <p>
            <strong>Artículos, evidencia y casos clínicos</strong> explicados con claridad para ayudarte a comprender mejor
            tu <strong>metabolismo, tu fuerza y tu salud</strong>, y tomar <em>decisiones con más criterio</em>.
          </p>
        }
        cta={
          <ButtonLink href="/publicaciones" size="lg">
            Explorar publicaciones <ArrowNarrowRightIcon />
          </ButtonLink>
        }
      />
    </>
  )
}
