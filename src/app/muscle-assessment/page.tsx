import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Wallpaper } from '@/components/elements/wallpaper'
import { Hero } from '@/components/sections/hero'
import { YouTubeVideo } from '@/components/sections/youtube-video'
import type { Metadata } from 'next'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { AssessmentForm } from './assessment-form'

export const metadata: Metadata = {
  title: 'EON Muscle Assessment™ | EON BioSystem',
  description:
    'Conoce tu edad muscular estimada, fuerza, estabilidad y composición corporal. Solicita una pre-evaluación para confirmar modalidad y disponibilidad.',
}

const assessments = [
  [
    '01',
    'Fuerza de agarre',
    'Medimos tu fuerza con dinamometría manual. Este indicador se relaciona con fuerza global, reserva muscular y funcionalidad.',
  ],
  [
    '02',
    'Composición corporal',
    'Analizamos masa muscular, porcentaje de grasa, grasa visceral y relación cintura/estatura para entender mejor tu perfil físico y metabólico.',
  ],
  [
    '03',
    'Función muscular',
    'Evaluamos qué tan eficiente es tu cuerpo para levantarse, estabilizarse y ejecutar movimientos básicos de la vida diaria.',
  ],
  [
    '04',
    'Estabilidad',
    'Medimos equilibrio y control corporal, factores clave para identificar deterioro funcional y riesgo de caídas.',
  ],
  [
    '05',
    'Presión arterial',
    'Integramos indicadores cardiovasculares básicos para contextualizar mejor tu salud metabólica y funcional.',
  ],
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
      <Wallpaper color={light ? 'bone-mist' : 'emerald'} className="wallpaper">
        <Container
          className={`flex flex-col gap-8 py-12 sm:gap-12 sm:py-16 ${light ? 'text-green-900' : 'text-white'}`}
        >
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold tracking-widest uppercase">{eyebrow}</p>
            <Subheading>{title}</Subheading>
          </div>
          {children}
        </Container>
      </Wallpaper>
    </section>
  )
}

export default function MuscleAssessmentPage() {
  return (
    <>
      <Hero
        className="[&_h1]:leading-[0.8em] [&_h1::first-line]:text-[1.2em]"
        imageSrc="/photos/eon-biosystem-muscle-assessment.jpg"
        imageAlt="Ricardo Sánchez, EON BioSystem"
        headline="Muscle </br><i>Assessment</i>"
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
        posterSrc="/photos/eon-biosystem-sistema.png"
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

      <Section eyebrow="Qué evaluamos" title="Cinco indicadores para entender tu salud muscular." light>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {assessments.map(([number, title, description]) => (
            <article
              key={number}
              className="flex flex-col gap-5 rounded-2xl border border-green-900/15 bg-white/30 p-6 sm:p-8"
            >
              <span className="font-serif text-5xl text-green-700">{number}</span>
              <h3 className="font-serif text-3xl">{title}</h3>
              <p className="text-base/7 text-green-800">{description}</p>
            </article>
          ))}
        </div>
      </Section>

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
