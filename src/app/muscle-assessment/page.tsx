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

  const heroImageSrc = versionedPublicAsset('/photos/eon-biosystem-muscle-assessment.png');
  const videoImageSrc = versionedPublicAsset('/muscle-assessment/video-cover-yt.jpg');

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
            Más allá del peso, evaluamos tu fuerza, función, estabilidad y composición corporal para estimar tu edad muscular en sólo 15 minutos.
          </p>
        }
      />

      <section>
        <article className="flex flex-col gap-8 max-w-4xl mx-auto text-center">
          <header className="text-center max-w-2xl mx-auto">
            <p className="uppercase text-bold tracking-wider"><small>Más allá del peso</small></p>
            <Subheading className='leading-none'><i>Conoce</i> el estado real de tus <i>músculos</i></Subheading>
          </header>
          <p className="text-balance">
            El músculo influye en tu <strong>metabolismo, fuerza, estabilidad y forma de envejecer</strong>. <br />En EON BioSystem evaluamos estos indicadores para darte un punto de partida claro sobre cómo está respondiendo tu cuerpo al paso del tiempo.</p>
        </article>
      </section>

      <YouTubeVideo
        videoId="46-jnsUixlM"
        posterSrc={videoImageSrc}
        posterUnoptimized
      />

      <section className="flex flex-col gap-8 bg-neutral-100 px-4 py-8 sm:py-10 text-center min-h-auto">
        <header className="">
            <p className="uppercase tracking-widest"><small>El punto de partida</small></p>
          <Subheading>
            El <i>problema no</i><br /> siempre <i>es el peso</i>.
          </Subheading>
        </header>
        <div className="max-w-3xl">
          <p className="text-balance py-2">Puedes sentirte bien, entrenar o incluso bajar de peso, y aun así estar perdiendo fuerza, estabilidad o masa muscular sin darte cuenta.</p>
          <p className="text-balance py-2">Por eso evaluamos <b>cinco indicadores</b> que ayudan a entender cómo está funcionando tu cuerpo: <i>metabolismo, energía, rendimiento físico, composición corporal e independencia funcional.</i></p>
        </div>
      </section>

      <section className="flex-col justify-center bg-neutral-100 px-4 pt-0 mt-0 min-h-auto">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
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
                <div className="z-10 flex flex-col justify-end p-5 sm:p-6 h-1/2 absolute bottom-0 items-start">
                  <span className="font-serif text-4xl leading-none">{assessment.number}</span>
                  <h3 className="mt-1 font-serif text-2xl leading-none">{assessment.title}</h3>
                  <p className="mt-0 max-w-sm text-base text-balance">{assessment.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-8 bg-neutral-100 px-4 py-12 text-center min-h-auto">
        <header className="text-center max-w-lg text-balance">
          <Subheading>
            <small>Para quienes quieren <i>mantenerse fuertes</i></small>
          </Subheading>
        </header>
        <p className="max-w-3xl text-lg/8">
          <b>EON Muscle Assessment</b> es ideal para personas que quieren prevenir deterioro físico, mejorar su composición
          corporal, optimizar su entrenamiento o entender mejor cómo está envejeciendo su cuerpo.
        </p>
      </section>

      
      <section className="bg-neutral-100 py-12 flex flex-col gap-8 px-4 min-h-auto">
        <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
          <article className="w-full">
            <header className="text-center">
              <p className="text-sm font-semibold text-green-800">Tu reporte EON</p>
              <h2 className="mt-1 font-serif text-2xl leading-none">
                Recibirás un reporte claro de tu estado muscular actual.
              </h2>
            </header>
            <div className="flex flex-col gap-6 text-lg/8 ">
              <p>
                Al finalizar tu evaluación conocerás tu edad muscular estimada, nivel EON, áreas fuertes, áreas de
                atención y una recomendación inicial personalizada.
              </p>
              <p>Información que puedes entender y un punto de partida para decidir tu siguiente paso.</p>
            </div>
          </article>
          <figure>
            <img src="" alt="" />
          </figure>
        </div>
      </section>

      <section eyebrow="15 minutos para conocer tu punto de partida" title="Solicita tu EON Muscle Assessment™.">
        <p className="max-w-3xl text-lg/8 ">
          Actualmente la evaluación completa se realiza de forma presencial en Ciudad de México. Si vives fuera de CDMX,
          puedes dejar tus datos para recibir información sobre la futura modalidad remota.
        </p>
      </section>
    </>
  )
}
