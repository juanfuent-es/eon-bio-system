import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { SectionScrollSnap } from '@/components/elements/section-scroll-snap'
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
    description: 'Conocemos tu contexto, composición corporal, fuerza, función y biomarcadores.',
    imageSrc: '/muscle-assessment/composicion-corporal.jpg',
    imageAlt: 'Evaluación de composición corporal en EON BioSystem',
  },
  {
    number: '02',
    title: 'Estrategia personalizada',
    description: 'Definimos entrenamiento, nutrición y hábitos de acuerdo con tus objetivos y respuesta individual.',
    imageSrc: '/eon-sistema-bg.jpg',
    imageAlt: 'Ricardo Sánchez durante una consulta individual',
  },
  {
    number: '03',
    title: 'Puesta en práctica',
    description: 'La estrategia se convierte en acciones claras que puedes integrar a tu vida cotidiana.',
    imageSrc: '/muscle-assessment/no-es-para-todos.jpg',
    imageAlt: 'Entrenamiento de fuerza con supervisión profesional',
  },
  {
    number: '04',
    title: 'Seguimiento y ajustes',
    description: 'Observamos cómo responde tu cuerpo y adaptamos el sistema conforme evoluciona.',
    imageSrc: '/muscle-assessment/muscle-reporte.jpg',
    imageAlt: 'Reporte de evaluación para orientar el seguimiento individual',
  },
]

function ApplyButton() {
  return (
    <ButtonLink href="/aplica" size="lg">
      Aplica al sistema <ArrowNarrowRightIcon />
    </ButtonLink>
  )
}

export default function Sistema() {
  return (
    <>
      <SectionScrollSnap closingId="cierre-sistema" />
      <Hero
        id="hero-sistema"
        data-snap-page="responsive"
        imageSrc="/eon-sistema-bg.jpg"
        imageAlt="Ricardo Sánchez atendiendo una consulta en EON BioSystem"
        eyebrow={
          <p className="mb-6 max-w-[calc(100%-2rem)] rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-xs/5 text-white/90 backdrop-blur-sm sm:px-5 sm:text-sm/5">
            No es un plan aislado. <strong>Es un sistema que evoluciona contigo.</strong>
          </p>
        }
        logo={{ src: '/logos/eon-logotype-slogan.svg', alt: 'Logotipo completo de EON BioSystem' }}
        subtitle={
          <>
            La <i>ciencia</i> detrás del sistema.
          </>
        }
        subheadline={
          <>
            <p>
              EON BioSystem organiza <strong>entrenamiento, nutrición y seguimiento</strong> dentro de una misma
              estrategia, guiada por tu biología y ajustada conforme cambia tu cuerpo.
            </p>
          </>
        }
        cta={<ApplyButton />}
      />

      <section
        id="origen-del-metodo"
        aria-labelledby="origen-del-metodo-heading"
        className="text-section w-full bg-white text-green-950"
      >
        <Container className="max-sm:px-0">
          <article className="mx-auto flex w-[90%] max-w-4xl flex-col items-center gap-8 text-center sm:gap-10">
            <Subheading id="origen-del-metodo-heading">
              De la <i>práctica</i> nació el método.
            </Subheading>
            <p className="max-w-2xl text-balance text-green-900">
              La práctica, el estudio continuo y el seguimiento individual dieron forma a un sistema que transforma
              información en decisiones claras y aplicables.
            </p>
          </article>
        </Container>
      </section>

      <Hero
        id="experiencia"
        headingLevel={2}
        imagePriority={false}
        imageSrc="/hero-about.jpg"
        imageAlt="Ricardo Sánchez entrenando fuerza en el gimnasio"
        eyebrow={
          <p className="mb-6 text-sm font-semibold tracking-widest uppercase">La experiencia detrás del sistema</p>
        }
        headline="Ricardo Sánchez"
        subheadline={
          <>
            <p>
              EON BioSystem fue creado por <strong>Ricardo Sánchez</strong> a partir de años de trabajo en entrenamiento
              de fuerza, nutrición aplicada, composición corporal y metabolismo.
            </p>
          </>
        }
        cta={
          <p className="text-white">
            <strong>Ricardo Sánchez</strong>
            <br />
            <span className="text-sm text-white/80">Director de optimización fisiometabólica</span>
          </p>
        }
      />

      <section
        id="como-funciona"
        aria-labelledby="como-funciona-heading"
        className="assessment-gallery flex-col justify-center gap-6 py-8 text-green-950 sm:gap-8 sm:py-12"
      >
        <Container>
          <header className="mx-auto flex max-w-4xl flex-col gap-4 text-center">
            <Heading level={1} id="como-funciona-heading">
              Cómo funciona
            </Heading>
            <p className="text-sm font-semibold tracking-widest uppercase">Proceso en cuatro pasos</p>
            <p className="mx-auto max-w-2xl text-balance text-green-900">
              El proceso se desarrolla a partir de cuatro momentos que permiten conocer, actuar, observar y ajustar.
            </p>
          </header>
        </Container>
        <ol className="system-grid m-0 grid w-full list-none gap-3 px-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="assessment-card group relative flex min-w-0 flex-col justify-end overflow-hidden rounded-panel bg-black text-white"
            >
              <Image
                src={step.imageSrc}
                alt={step.imageAlt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/10"
                aria-hidden="true"
              />
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
            El Lic. Ricardo Sanchez no solo me dió un plan alimenticio y de ejercicios, me ha ayudado a construir
            hábitos, a cambiar mi mentalidad y relación con la comida, a disfrutar de este maravilloso proceso de
            alcanzar mi mejor versión.
            <br />
            <br />
            Ya no entreno por un físico marcado, entreno y me cuido por que quiero caminar sin bastón a los 60,
            disfrutar de mis seres queridos con libertad de movimiento.
            <br />
            <br />
            Gracias por ser un gran mentor Licenciado y ayudarme a optimizar mi metabolismo para el beneficio de una
            longevidad saludable en EON Biosystem.
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

      <section
        id="cierre-sistema"
        aria-labelledby="cierre-sistema-heading"
        className="text-section w-full bg-white text-green-950"
      >
        <Container className="max-sm:px-0">
          <article className="mx-auto flex w-[90%] max-w-4xl flex-col items-center gap-8 text-center sm:gap-10">
            <Subheading id="cierre-sistema-heading">
              Construye cómo quieres <i>vivir mañana.</i>
            </Subheading>
            <p className="max-w-2xl text-balance text-green-900">
              EON BioSystem no parte de soluciones rápidas, sino de entender cómo estás hoy y acompañar tu evolución a
              lo largo del tiempo.
            </p>
            <div className="flex max-w-full flex-col items-center gap-3 pt-2">
              <ApplyButton />
              <p className="text-green-800 italic">
                <small>*Acceso mediante evaluación previa.</small>
              </p>
            </div>
          </article>
        </Container>
      </section>
    </>
  )
}
