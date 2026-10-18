import { TestimonialLargeQuote } from '@/components/sections/testimonial-with-large-quote'
import { Subheading } from '@/components/elements/subheading'
import { SectionScrollSnap } from '@/components/elements/section-scroll-snap'
import { Hero } from '@/components/sections/hero'
import { YouTubeVideo } from '@/components/sections/youtube-video'
import type { Metadata } from 'next'
import Image from 'next/image'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { AssessmentLink } from './assessment-form'

export const metadata: Metadata = {
  title: 'EON Muscle Assessment™ | EON BioSystem',
  description:
    'Conoce tu edad muscular estimada, fuerza, estabilidad y composición corporal. Solicita una pre-evaluación para confirmar modalidad y disponibilidad.',
}

function versionedPublicAsset(src: string) {
  const cleanSrc = src.replace(/^\/+/, '')
  const file = readFileSync(path.join(process.cwd(), 'public', cleanSrc))
  const version = createHash('sha256').update(file).digest('hex').slice(0, 12)

  return '/' + cleanSrc + '?v=' + version
}

const assessments = [
  {
    number: '01',
    title: 'Fuerza de agarre',
    description: 'Un indicador clave de tu fuerza global.',
    imageSrc: versionedPublicAsset('/muscle-assessment/fuerza-de-agarre.jpg'),
    imageAlt: 'Dinamómetro manual durante una evaluación de fuerza de agarre',
    cardClassName: 'lg:col-span-2',
  },
  {
    number: '02',
    title: 'Composición corporal',
    description: 'Conoce tu masa muscular, grasa y perfil físico.',
    imageSrc: versionedPublicAsset('/muscle-assessment/composicion-corporal.jpg'),
    imageAlt: 'Evaluación de composición corporal en EON BioSystem',
    cardClassName: 'lg:col-span-2',
  },
  {
    number: '03',
    title: 'Función muscular',
    description: 'Evalúa tu capacidad de levantarte, moverte y funcionar.',
    imageSrc: versionedPublicAsset('/muscle-assessment/funcion-muscular.jpg'),
    imageAlt: 'Prueba funcional de levantamiento asistida por una evaluadora',
    cardClassName: 'lg:col-span-2',
  },
  {
    number: '04',
    title: 'Estabilidad',
    description: 'Mide tu equilibrio y control corporal.',
    imageSrc: versionedPublicAsset('/muscle-assessment/estabilidad.jpg'),
    imageAlt: 'Prueba de estabilidad y equilibrio en una pierna',
    cardClassName: 'lg:col-span-3',
  },
  {
    number: '05',
    title: 'Presión arterial',
    description: 'Un indicador cardiovascular básico para contextualizar tu salud.',
    imageSrc: versionedPublicAsset('/muscle-assessment/presion-arterial.jpg'),
    imageAlt: 'Medición de presión arterial con brazalete y estetoscopio',
    cardClassName: 'sm:col-span-2 lg:col-span-3',
  },
]

export default function MuscleAssessmentPage() {
  const heroImageSrc = versionedPublicAsset('/photos/eon-biosystem-muscle-assessment.png')
  const videoImageSrc = versionedPublicAsset('/muscle-assessment/video-cover-yt.jpg')
  const reportImageSrc = versionedPublicAsset('/muscle-assessment/muscle-reporte.jpg')

  return (
    <>
      <SectionScrollSnap closingId="reporte" />
      <Hero
        data-snap-page
        imageSrc={heroImageSrc}
        imageAlt="Evaluación EON Muscle Assessment"
        imageUnoptimized
        logo={{ src: '/logos/eon-muscle-assessment.svg', alt: 'Logotipo EON Muscle Assessment' }}
        subtitle="Tus músculos pueden estar envejeciendo más rápido que tú."
        subheadline={
          <p>
            Más allá del peso, evaluamos tu fuerza, función, estabilidad y composición corporal para estimar tu edad
            muscular en sólo 15 minutos.
          </p>
        }
        cta={
          <AssessmentLink
            placement="hero"
            className="max-w-full shrink self-center text-center"
          />
        }
      />

      <section>
        <article className="mx-auto flex max-w-4xl flex-col gap-8 text-center">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-bold tracking-wider uppercase">
              <small>Más allá del peso</small>
            </p>
            <Subheading>
              <i>Conoce</i> el estado real de tus <i>músculos</i>
            </Subheading>
          </header>
          <p className="text-balance">
            El músculo influye en tu <strong>metabolismo, fuerza, estabilidad y forma de envejecer</strong>. <br />
          </p>
          <p className="text-balance">
            En EON BioSystem evaluamos estos indicadores para darte un punto de partida claro sobre cómo está
            respondiendo tu cuerpo al paso del tiempo.
          </p>
        </article>
      </section>

      <YouTubeVideo videoId="46-jnsUixlM" posterSrc={videoImageSrc} posterUnoptimized />

      <section className="flex flex-col justify-center gap-8 px-4 py-8 text-center sm:py-10">
        <header className="">
          <p className="tracking-widest uppercase">
            <small>El punto de partida</small>
          </p>
          <Subheading>
            El <i>problema no</i>
            <br /> siempre <i>es el peso</i>.
          </Subheading>
        </header>
        <div className="max-w-3xl">
          <p className="py-2 text-balance">
            Puedes sentirte bien, entrenar o incluso bajar de peso, y aun así estar perdiendo fuerza, estabilidad o masa
            muscular sin darte cuenta.
          </p>
          <p className="py-2 text-balance">
            Por eso evaluamos <b>cinco indicadores</b> que ayudan a entender cómo está funcionando tu cuerpo:{' '}
            <i>metabolismo, energía, rendimiento físico, composición corporal e independencia funcional.</i>
          </p>
        </div>
      </section>

      <section className="assessment-gallery mt-0 flex-col justify-center">
        <div className="mx-auto flex w-full flex-col gap-6 p-4">
          <div className="grid min-h-[calc(100dvh-2rem)] auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {assessments.map((assessment) => (
              <article
                key={assessment.number}
                className={`group relative flex min-h-96 w-full min-w-0 flex-col justify-end overflow-hidden rounded-panel bg-black text-white ${assessment.cardClassName}`}
              >
                <Image
                  src={assessment.imageSrc}
                  alt={assessment.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  unoptimized
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ backgroundImage: 'linear-gradient(to top, rgb(0 0 0 / 1), rgb(0 0 0 / 0))' }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex min-h-56 w-full min-w-0 flex-col items-start justify-start p-5 sm:p-6">
                  <span className="font-serif text-5xl leading-none">{assessment.number}</span>
                  <h3 className="mt-1 font-serif text-2xl leading-tight">{assessment.title}</h3>
                  <p className="mt-1 max-w-sm text-base leading-snug text-balance xl:text-lg">{assessment.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TestimonialLargeQuote
        id="testimonial-maritere"
        aria-label="Testimonio de Maritere Santiago"
        quote={
          <>
            Mi experiencia en EON Biosystem, me ha ayudado a <strong>evolucionar físico-mentalmente,</strong> ser más disciplinada y lograr mis objetivos a la par de <em>cuidar de mi longevidad.</em> 🤝 💪 gracias.
          </>
        }
        img={
          <a href="https://www.instagram.com/smaritere21/" target="_blank" rel="noopener noreferrer">
            <Image src="/avatars/maritere.png" alt="Maritere Santiago" width={240} height={240} />
          </a>
        }
        name="Maritere Santiago"
        byline={
          <a
            href="https://www.instagram.com/smaritere21/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-900 transition-colors hover:text-orange-500"
          >
            @smaritere21
          </a>
        }
      />

      <section className="flex flex-col justify-center gap-8 px-4 py-12 text-center">
        <header className="max-w-2xl text-center text-balance">
          <Subheading>
            Para quienes quieren <i>mantenerse fuertes</i>
          </Subheading>
        </header>
        <p className="max-w-2xl text-balance">
          <b>EON Muscle Assessment</b> es ideal para personas que quieren prevenir deterioro físico, mejorar su
          composición corporal, optimizar su entrenamiento o entender mejor cómo está envejeciendo su cuerpo.
        </p>
      </section>

      <Hero
        id="reporte"
        headingLevel={2}
        imageSrc={reportImageSrc}
        imageAlt="Reporte EON Muscle Assessment con resultados de estado muscular"
        imageUnoptimized
        imagePriority={false}
        eyebrow={
          <p className="text-sm font-semibold tracking-widest uppercase">Reporte de Reserva Muscular</p>
        }
        headline="Conoce tu punto de partida."
        subheadline={
          <p>
            Agenda tu evaluación y recibe un reporte con tu edad muscular estimada, nivel EON, fortalezas, áreas de
            atención y una recomendación inicial.
          </p>
        }
        cta={
          <div className="flex max-w-full flex-col items-center gap-3" id="footer-muscle">
            <AssessmentLink
              placement="footer-muscle"
              label="Agendar evaluación"
              className="max-w-full shrink text-center"
            />
            <p className="text-sm text-white/80">Evaluación presencial · 15 minutos</p>
          </div>
        }
      />
    </>
  )
}
