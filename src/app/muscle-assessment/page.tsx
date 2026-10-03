import { Subheading } from '@/components/elements/subheading'
import { Hero } from '@/components/sections/hero'
import { YouTubeVideo } from '@/components/sections/youtube-video'
import type { Metadata } from 'next'
import Image from 'next/image'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { ReactNode } from 'react'
import { AssessmentForm } from './assessment-form'

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
    cardClassName: 'lg:col-span-2 lg:aspect-[1.18/1]',
  },
  {
    number: '02',
    title: 'Composición corporal',
    description: 'Conoce tu masa muscular, grasa y perfil físico.',
    imageSrc: versionedPublicAsset('/muscle-assessment/composicion-corporal.jpg'),
    imageAlt: 'Evaluación de composición corporal en EON BioSystem',
    cardClassName: 'lg:col-span-2 lg:aspect-[1.18/1]',
  },
  {
    number: '03',
    title: 'Función muscular',
    description: 'Evalúa tu capacidad de levantarte, moverte y funcionar.',
    imageSrc: versionedPublicAsset('/muscle-assessment/funcion-muscular.jpg'),
    imageAlt: 'Prueba funcional de levantamiento asistida por una evaluadora',
    cardClassName: 'lg:col-span-2 lg:aspect-[1.18/1]',
  },
  {
    number: '04',
    title: 'Estabilidad',
    description: 'Mide tu equilibrio y control corporal.',
    imageSrc: versionedPublicAsset('/muscle-assessment/estabilidad.jpg'),
    imageAlt: 'Prueba de estabilidad y equilibrio en una pierna',
    cardClassName: 'lg:col-span-3 lg:aspect-[2.2/1]',
  },
  {
    number: '05',
    title: 'Presión arterial',
    description: 'Un indicador cardiovascular básico para contextualizar tu salud.',
    imageSrc: versionedPublicAsset('/muscle-assessment/presion-arterial.jpg'),
    imageAlt: 'Medición de presión arterial con brazalete y estetoscopio',
    cardClassName: 'lg:col-span-3 lg:aspect-[2.2/1]',
  },
]

function Section({
  id,
  title,
  eyebrow,
  children,
  light = false,
}: {
  id?: string
  title: string
  eyebrow: string
  children: ReactNode
  light?: boolean
}) {
  return (
    <section id={id} className="scroll-mt-24 px-4">
      <div className="max-w-4xl">
        <p className="mb-4 text-sm font-semibold tracking-widest uppercase">{eyebrow}</p>
        <Subheading>{title}</Subheading>
      </div>
      {children}
    </section>
  )
}

export default function MuscleAssessmentPage() {
  const heroImageSrc = versionedPublicAsset('/photos/eon-biosystem-muscle-assessment.png')

  return (
    <>
      <Hero
        imageSrc={heroImageSrc}
        imageAlt="Evaluación EON Muscle Assessment"
        imageUnoptimized
        headline={
          <Image
            src="/logos/eon-muscle-assessment.svg"
            alt="Logotipo EON Muscle Assessment"
            width={762}
            height={815}
            className="w-52 lg:w-52 xl:w-60 drop-shadow-xl drop-shadow-black"
          />
        }
        subtitle="Tus músculos pueden estar envejeciendo más rápido que tú."
        subheadline={
          <p>
            Más allá del peso, evaluamos tu fuerza, función, estabilidad y composición corporal para estimar tu edad
            muscular en sólo 15 minutos.
          </p>
        }
      />

      <YouTubeVideo
        videoId="SzYJuStg_IQ"
        title="¿Qué es EON Muscle Assessment?"
        posterSrc={heroImageSrc}
        posterUnoptimized
      />

      <Section eyebrow="Más allá del peso" title="Conoce el estado real de tus músculos." light>
        <div className="grid gap-8 md:grid-cols-2">
          <p className="text-xl/8">
            El músculo también está relacionado con tu metabolismo, tu fuerza, tu estabilidad, tu capacidad de
            movimiento y la forma en que envejeces.
          </p>
          <div className="flex flex-col gap-4 text-lg/8">
            <p>
              En EON BioSystem evaluamos tu edad muscular, fuerza, función, estabilidad y composición corporal para
              conocer cómo está respondiendo tu cuerpo al paso del tiempo.
            </p>
            <p>Una evaluación breve. Un punto de partida claro para entender tu cuerpo.</p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="El punto de partida"
        title="El problema no siempre es el peso. Es perder músculo sin darte cuenta."
      >
        <p className="max-w-3xl text-lg/8 text-white/85">
          Muchas personas bajan de peso, entrenan ocasionalmente o se sienten “bien”, pero no saben si están perdiendo
          fuerza, estabilidad, masa muscular o capacidad funcional.
        </p>
        <div>
          <p className="mb-6 text-lg">Con el paso del tiempo, esta pérdida puede afectar:</p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Metabolismo',
              'Glucosa',
              'Energía',
              'Riesgo de caídas',
              'Rendimiento físico',
              'Composición corporal',
              'Independencia funcional',
            ].map((item) => (
              <li key={item} className="border-l border-white/30 py-2 pl-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <section className="scroll-mt-24 flex-col justify-center bg-neutral-100 px-4 py-8 text-green-950 sm:py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <h2 className="text-center font-serif text-4xl leading-none text-balance sm:text-5xl lg:text-6xl">
            Cinco indicadores para <i className="font-normal">entender tu salud muscular.</i>
          </h2>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
            {assessments.map((assessment) => (
              <article
                key={assessment.number}
                className={`group relative min-h-[22rem] overflow-hidden rounded-lg bg-black text-white lg:min-h-0 ${assessment.cardClassName}`}
              >
                <Image
                  src={assessment.imageSrc}
                  alt={assessment.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  unoptimized
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ backgroundImage: 'linear-gradient(to top, rgb(0 0 0 / 1), rgb(0 0 0 / 0))' }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
                  <span className="font-serif text-4xl leading-none sm:text-5xl">{assessment.number}</span>
                  <h3 className="mt-1 font-serif text-3xl leading-none sm:text-4xl">{assessment.title}</h3>
                  <p className="mt-2 max-w-sm text-base/6 text-white sm:text-lg/6">{assessment.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="Tu reporte EON" title="Recibirás un reporte claro de tu estado muscular actual.">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6 text-lg/8 text-white/85">
            <p>
              Al finalizar tu evaluación conocerás tu edad muscular estimada, nivel EON, áreas fuertes, áreas de
              atención y una recomendación inicial personalizada.
            </p>
            <p>Información que puedes entender y un punto de partida para decidir tu siguiente paso.</p>
          </div>
          <div className="rounded-2xl bg-neutral-100 p-6 text-green-900 sm:p-10">
            <Image src="/logo.svg" alt="EON BioSystem" width={100} height={60} className="mb-8 h-12 w-auto" />
            <p className="text-xs tracking-widest uppercase">Contenido de tu reporte</p>
            <h3 className="mt-3 font-serif text-3xl">EON Muscle Assessment™</h3>
            <ul className="mt-6 divide-y divide-green-900/15">
              {[
                'Edad muscular estimada',
                'Nivel EON',
                'Áreas fuertes',
                'Áreas de atención',
                'Recomendación inicial personalizada',
              ].map((item) => (
                <li key={item} className="py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Para quién es" title="Para quienes quieren mantenerse fuertes e independientes." light>
        <p className="max-w-3xl text-lg/8">
          El EON Muscle Assessment™ es ideal para personas que quieren prevenir deterioro físico, mejorar su composición
          corporal, optimizar su entrenamiento o entender mejor cómo está envejeciendo su cuerpo.
        </p>
        <ul className="grid gap-5 md:grid-cols-2">
          {[
            'Personas mayores de 30 años.',
            'Personas con sobrepeso u obesidad.',
            'Personas que entrenan pero no miden su progreso funcional.',
            'Personas interesadas en longevidad.',
            'Personas que quieren preservar músculo durante pérdida de peso.',
            'Padres, madres o adultos que quieren mantenerse fuertes e independientes.',
            'Personas que quieren conocer objetivamente su punto de partida.',
          ].map((item) => (
            <li key={item} className="border-l border-green-800/30 py-2 pl-4 text-lg/7">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="15 minutos para conocer tu punto de partida" title="Solicita tu EON Muscle Assessment™.">
        <p className="max-w-3xl text-xl/8">
          Descubre cómo está tu edad muscular, fuerza, estabilidad y composición corporal.
        </p>
        <p className="max-w-3xl text-lg/8 text-white/85">
          Actualmente la evaluación completa se realiza de forma presencial en Ciudad de México. Si vives fuera de CDMX,
          puedes dejar tus datos para recibir información sobre la futura modalidad remota.
        </p>
      </Section>

      <Section id="pre-evaluacion" eyebrow="Tiempo estimado: 1 minuto" title="Primero, conozcamos un poco de ti.">
        <p className="max-w-3xl text-lg/8 text-white/85">
          Para ofrecer una experiencia personalizada, primero conoceremos algunos datos básicos sobre ti. Con esta
          información confirmaremos la modalidad más adecuada —presencial o futura modalidad remota— y la disponibilidad
          de agenda.
        </p>
        <AssessmentForm />
      </Section>
    </>
  )
}
