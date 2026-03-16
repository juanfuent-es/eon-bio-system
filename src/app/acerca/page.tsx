import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { Hero } from '@/components/sections/hero'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { Document } from '@/components/elements/document'
import { Wallpaper } from '@/components/elements/wallpaper'
import type { ReactNode } from 'react'

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

export default function Acerca() {
    return (
        <>
            {/* Hero */}
            <Hero
                id="hero"
                imageSrc="/photos/eon-biosystem-acerca-ricardo-sanchez.png"
                imageAlt="Dirección profesional y respaldo clínico EON"
                headline={
                    <>
                        La <i>experiencia</i> detrás <br /> del <em>sistema</em>.
                    </>
                }
                subheadline={
                    <>
                        <p>
                            EON BioSystem nace de años de trabajo en
                            <em>entrenamiento de fuerza</em>,
                            <em>nutrición aplicada</em> y
                            <em>optimización del metabolismo</em>.
                        </p>
                        <p>Un enfoque construido desde la práctica, <br />
                            con una visión clara: <em>longevidad con funcionalidad.</em>
                        </p>
                    </>
                }
            />

            {/* Sección 1: Propósito */}
            <SectionWithHeading
                tone="bone-mist"
                headline="Por qué existe EON Bio."
                subheadline={
                    <>
                        <p>
                            EON Bio nace de una necesidad concreta: ordenar decisiones sobre salud en un entorno saturado de
                            información, modas y soluciones inconexas.
                        </p>
                        <p>
                            Su propósito es ofrecer un marco claro donde entrenamiento, nutrición y datos biológicos trabajen de
                            forma coherente.
                        </p>
                    </>
                }
            />

            {/* Sección 2: Filosofía */}
            <SectionWithHeading
                tone="emerald"
                headline="La filosofía detrás del sistema."
                subheadline={
                    <p>
                        EON Bio parte de una premisa simple: la biología individual debe guiar el proceso. Por eso, el sistema
                        se apoya en:
                    </p>
                }
            >
                <Document className="max-w-2xl rounded-lg bg-bone-50/95 p-6 shadow-sm">
                    <ul>
                        <li>Datos objetivos</li>
                        <li>Estructura clara</li>
                        <li>Seguimiento continuo</li>
                    </ul>
                    <p className="italic">La longevidad no es un evento, es un proceso.</p>
                </Document>
            </SectionWithHeading>

            {/* Sección 3: El sistema (mención breve) */}
            <SectionWithHeading
                tone="mist"
                headline="Qué es EON BioSystem."
                subheadline={
                    <>
                        <p>
                            EON BioSystem es el método que articula el enfoque de EON Bio. Un sistema de ciencia aplicada que
                            integra fuerza, nutrición y biomarcadores en una estructura diseñada para evolucionar con el tiempo.
                        </p>
                        <p>(Para conocer el método completo, ver El Sistema)</p>
                    </>
                }
                cta={
                    <PlainButtonLink href="/sistema" className="text-white/80 hover:text-white">
                        Ver el método completo <ArrowNarrowRightIcon />
                    </PlainButtonLink>
                }
            />

            {/* Sección 4: Respaldo clínico */}
            <SectionWithHeading
                tone="bone-mist"
                headline="Respaldo clínico cuando el proceso lo requiere."
                subheadline={
                    <>
                        <p>
                            Cuando el sistema exige profundidad clínica, EON Bio cuenta con el respaldo profesional de NTS Clinic.
                        </p>
                        <p>
                            NTS Clinic es el brazo clínico donde se supervisan e interpretan los aspectos médicos del proceso con
                            rigor y responsabilidad.
                        </p>
                        <p>EON Bio diseña el sistema. NTS Clinic respalda cuando es necesario.</p>
                    </>
                }
                cta={
                    <PlainButtonLink href="https://ntsclinic.com">
                        Conocer NTS Clinic <ArrowNarrowRightIcon />
                    </PlainButtonLink>
                }
            />

            {/* Cierre */}
            <CallToActionSimple
                id="cta"
                headline="¿Listo para comenzar?"
                subheadline="Aplica al sistema y conoce cómo EON BioSystem puede acompañarte en tu proceso de optimización biológica."
                cta={<ButtonLink href="/aplica">Aplica al sistema</ButtonLink>}
            />
        </>
    )
}
