import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { ViewportScrollSnap } from '@/components/elements/viewport-scroll-snap'
import { Subheading } from '@/components/elements/subheading'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Hero } from '@/components/sections/hero'
import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'El sistema | EON BioSystem',
  description:
    'La ciencia detrás de EON BioSystem: evaluación, entrenamiento, nutrición y seguimiento en una estrategia guiada por tu biología.',
}

const steps = [
  {
    number: '01',
    title: 'Evaluación inicial',
    description: (
      <>
        Conocemos tu contexto y evaluamos <strong>composición corporal, fuerza, función, hábitos y marcadores
        relevantes</strong> para entender <em>cómo estás hoy</em>.
      </>
    ),
    imageSrc: '/muscle-assessment/composicion-corporal.jpg',
    imageAlt: 'Evaluación de composición corporal en EON BioSystem',
  },
  {
    number: '02',
    title: 'Diseño de estrategia',
    description: (
      <>
        Integramos lo que encontramos para <strong>definir prioridades</strong> y construir una estrategia de{' '}
        <strong>nutrición, entrenamiento y estilo de vida</strong> acorde con <em>tu momento y tus objetivos</em>.
      </>
    ),
    imageSrc: '/eon-sistema-bg.jpg',
    imageAlt: 'Ricardo Sánchez durante una consulta individual',
  },
  {
    number: '03',
    title: 'Puesta en práctica',
    description: (
      <>
        Convertimos la estrategia en <strong>acciones claras, medibles y sostenibles</strong> que puedas llevar a tu{' '}
        <em>vida cotidiana</em>.
      </>
    ),
    imageSrc: '/muscle-assessment/no-es-para-todos.jpg',
    imageAlt: 'Entrenamiento de fuerza con supervisión profesional',
  },
  {
    number: '04',
    title: 'Seguimiento y ajustes',
    description: (
      <>
        Observamos <em>cómo responde tu cuerpo</em>, <strong>medimos tu evolución</strong> y ajustamos lo necesario
        para seguir avanzando <em>con criterio</em>.
      </>
    ),
    imageSrc: '/muscle-assessment/muscle-reporte.jpg',
    imageAlt: 'Reporte de evaluación para orientar el seguimiento individual',
  },
]

function AppointmentButton() {
  return (
    <ButtonLink href="https://wa.me/525549562488" size="lg">
      Agenda tu cita <ArrowNarrowRightIcon />
    </ButtonLink>
  )
}

export default function Sistema() {
  return (
    <>
      <ViewportScrollSnap />
      <Hero
        id="hero-sistema"
        data-snap-page="viewport"
        data-viewport-snap=""
        imageSrc="/eon-sistema-bg.jpg"
        imageAlt="Ricardo Sánchez atendiendo una consulta en EON BioSystem"
        eyebrow={
          <p className="mb-6 max-w-[calc(100%-2rem)] rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-xs/5 font-medium text-white/90 backdrop-blur-sm sm:px-5 sm:text-sm/5">
            Un <strong>sistema</strong>, no un <em>plan</em>.
          </p>
        }
        logo={{ src: '/logos/eon-logotype-descriptor.svg', alt: 'Logotipo EON BioSystem' }}
        subtitle={
          <>
            La <i>ciencia</i> detrás del sistema.
          </>
        }
        subheadline={
          <>
            <p>
              Integramos <strong>información biológica, composición corporal, fuerza, función y hábitos</strong> para <i>entender qué necesita tu cuerpo y orientar decisiones personalizadas.</i>
            </p>
          </>
        }
        cta={<AppointmentButton />}
      />

      <section
        id="origen-del-metodo"
        aria-labelledby="origen-del-metodo-heading"
        className="text-section w-full text-green-950"
      >
        <Container className="max-sm:px-0">
          <article className="mx-auto flex w-[90%] max-w-4xl flex-col items-center gap-8 text-center sm:gap-10">
            <Subheading id="origen-del-metodo-heading">
              <span className="heading-line">De la <i>práctica</i></span>
              <span className="heading-line">nació el método.</span>
            </Subheading>
            <p className="max-w-2xl text-balance text-green-900">
              La <em>práctica</em>, el <strong>estudio continuo y el seguimiento individual</strong> dieron forma a un
              sistema que transforma información en <strong>decisiones claras y aplicables</strong>.
            </p>
          </article>
        </Container>
      </section>

      <Hero
        id="experiencia"
        data-viewport-snap=""
        headingLevel={2}
        imagePriority={false}
        imageSrc="/eon-about-bg.jpg"
        imageAlt="Ricardo Sánchez entrenando fuerza en el gimnasio"
        eyebrow={
          <p className="mb-6 max-w-[calc(100%-2rem)] rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-xs/5 font-medium text-white/90 backdrop-blur-sm sm:px-5 sm:text-sm/5">
            La experiencia detrás del sistema
          </p>
        }
        headline={
          <>
            <span className="whitespace-nowrap">Ricardo <em>Sánchez</em></span>
          </>
        }
        subheadline={
          <>
            <p>
              EON BioSystem fue creado por su director a partir de <em>años de trabajo</em> en{' '}
              <strong>entrenamiento de fuerza</strong>, estudio de{' '}
              <strong>nutrición aplicada, composición corporal y metabolismo</strong>.
            </p>
          </>
        }
        cta={
          <ButtonLink
            href="https://instagram.com/ricardo.sanchez.mx"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Conóceme <ArrowNarrowRightIcon />
          </ButtonLink>
        }
      />

      <section
        id="como-funciona"
        aria-labelledby="como-funciona-heading"
        className="assessment-gallery flex-col justify-center gap-6 pt-4 text-green-950 sm:gap-8"
      >
        <Container>
          <header className="mx-auto flex max-w-4xl flex-col gap-4 text-center">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold tracking-widest uppercase">Cómo funciona</p>
              <Heading level={2} id="como-funciona-heading">
                <span className="heading-line">Proceso en</span>
                <span className="heading-line"><em>cuatro pasos</em></span>
              </Heading>
            </div>
            <p className="mx-auto max-w-2xl text-balance text-green-900">
              El proceso se desarrolla a partir de cuatro momentos que permiten{' '}
              <strong>
                <em>conocer, actuar, observar y ajustar</em>
              </strong>
              .
            </p>
          </header>
        </Container>
        <ol className="system-grid m-0 grid w-full list-none gap-3 px-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="assessment-card group relative isolate flex min-w-0 flex-col justify-end overflow-hidden rounded-panel bg-black text-white"
            >
              <Image
                src={step.imageSrc}
                alt={step.imageAlt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-cover bg-center bg-no-repeat mix-blend-multiply"
                style={{ backgroundImage: 'url("/gradients/orange-green.svg")' }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-linear-to-t from-black via-black/60 to-black/10"
                aria-hidden="true"
              />
              <div className="noise-overlay" aria-hidden="true" />
              <div className="assessment-card-content relative z-10 flex flex-col items-start p-4 pb-8 sm:p-6">
                <span className="font-serif text-5xl leading-none" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="mt-1 w-full text-left font-serif text-2xl leading-tight xl:text-3xl">{step.title}</h3>
                <p className="mt-2 max-w-lg text-base leading-snug text-balance xl:text-lg">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <TestimonialLargeQuote
        id="testimonial-liliana"
        aria-label="Testimonio de Liliana Márquez"
        quote={
          <>
            El Lic. Ricardo Sanchez no solo me dió un plan alimenticio y de ejercicios, me ha ayudado a{' '}
            <strong>construir hábitos</strong>, a cambiar mi <em>mentalidad y relación con la comida</em>, a disfrutar
            de este maravilloso proceso de alcanzar mi mejor versión.
            <br />
            <br />
            Ya no entreno por un físico marcado, entreno y me cuido por que quiero{' '}
            <strong>caminar sin bastón a los 60</strong>, disfrutar de mis seres queridos con{' '}
            <em>libertad de movimiento</em>.
            <br />
            <br />
            Gracias por ser un gran mentor Licenciado y ayudarme a optimizar mi metabolismo para el beneficio de una
            <strong>longevidad saludable</strong> en EON Biosystem.
          </>
        }
        img={
          <a href="https://www.instagram.com/li.liana4391/" target="_blank" rel="noopener noreferrer">
            <Image src="/avatars/liliana.png" alt="Liliana Márquez" width={240} height={240} />
          </a>
        }
        name="Liliana Márquez"
        byline={
          <a
            href="https://www.instagram.com/li.liana4391/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-900 transition-colors hover:text-orange-500"
          >
            @li.liana4391
          </a>
        }
      />

      <Hero
        id="cierre-sistema"
        aria-label="Construye cómo quieres vivir mañana"
        headingLevel={2}
        imagePriority={false}
        imageSrc="/eon-about-construye.jpg"
        imageAlt="Ricardo Sánchez revisando una evaluación con una paciente en consulta"
        imageClassName="object-[35%_center] sm:object-center"
        headline={
          <>
            <span className="heading-line">Construye cómo quieres</span>
            <span className="heading-line"><i>vivir mañana.</i></span>
          </>
        }
        subheadline={
          <>
            <p>
              Tu <strong>fuerza, salud y autonomía</strong> de mañana empiezan con las{' '}
              <em>decisiones que tomas hoy</em>.
            </p>
            <p>
              Conoce tu <em>punto de partida</em> y conviértelo en una estrategia de{' '}
              <strong>nutrición, entrenamiento y seguimiento</strong> que <em>evoluciona contigo</em>.
            </p>
          </>
        }
        cta={
          <>
            <AppointmentButton />
            <p className="mt-3 text-sm text-green-200 italic">
              <small>*Acceso mediante evaluación previa.</small>
            </p>
          </>
        }
      />
    </>
  )
}
