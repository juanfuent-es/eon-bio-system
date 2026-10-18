import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
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
      className="w-full bg-white py-24 text-green-950 sm:py-32 lg:py-40"
    >
      <Container>
        <article className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center sm:gap-10">
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
      <Hero
        imageSrc="/photos/eon-biosystem-home.png"
        imageAlt="Mujer entrenando en espacio natural"
        headline={
          <Image
            src="/logos/eon-logotype-slogan.svg"
            alt="Logotipo EON BioSystem"
            width={100}
            height={70}
            className="w-64 drop-shadow-xl drop-shadow-amber-950/50 md:w-80 lg:w-96"
          />
        }
        subtitle="Un sistema de longevidad diseñado desde la ciencia."
        subheadline={
          <p>
            Un sistema integral que une <strong>fuerza, nutrición y biomarcadores</strong> para optimizar tu biología de
            forma sostenible.
          </p>
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
        <p>Con el tiempo, el cuerpo cambia. La recuperación y el rendimiento también.</p>
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
        subheadline={<p>Descúbrelo en 15 minutos.</p>}
        cta={
          <ButtonLink href="/muscle-assessment" size="lg">
            Conoce tu edad muscular <ArrowNarrowRightIcon />
          </ButtonLink>
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
          EON BioSystem es un sistema de longevidad basado en el análisis de biomarcadores para diseñar estrategias
          personalizadas de entrenamiento, nutrición y suplementación.
        </p>
        <p>Un sistema pensado para acompañar tu biología a largo plazo.</p>
      </HomeTextSection>

      <TestimonialLargeQuote
        id="testimonial"
        aria-label="Testimonio de Jesús Josúe"
        quote="Mi experiencia en estos 5 años con el Lic. Ricardo Sánchez, que además lo estimo como un amigo, ha sido de superación. Juntos hemos trabajado en construir un gran físico, pero sobre todo, me ha enseñado sobre salud, nutrición, resiliencia, longevidad y desarrollo personal. Muy contento con la experiencia EON y seguimos trabajando."
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
        imageSrc="/photos/eon-biosystem-muscle-assessment.png"
        imageAlt="Ricardo explicando los resultados de una evaluación a una persona en consulta"
        headline={
          <>
            Este sistema <i>no es para todos</i>
          </>
        }
        subheadline={
          <>
            <p>Es para personas que quieren entender su cuerpo y construir salud con criterio y constancia.</p>
            <p>Para quienes están dispuestos a comprometerse con su proceso y sostenerlo a largo plazo.</p>
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
        imageSrc="/eon-publicaciones-bg.jpg"
        imageAlt="Ricardo Sánchez, EON Publicaciones"
        headline={
          <>
            Entiende a tu <i>cuerpo</i>,<br />
            mejora tus <i>decisiones</i>.
          </>
        }
        subheadline={<p>Artículos, evidencia y casos clínicos explicados con claridad.</p>}
        cta={
          <ButtonLink href="/publicaciones" size="lg">
            Explorar publicaciones <ArrowNarrowRightIcon />
          </ButtonLink>
        }
      />
    </>
  )
}
