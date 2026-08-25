import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Wallpaper } from '../elements/wallpaper'
import Image from 'next/image'
export function Hero({
    eyebrow,
    headline,
    subheadline,
    cta,
    footer,
    imageSrc = '/photos/eon-biosystem-home.png',
    imageAlt = 'Imagen de portada de EON BioSystem',
    className,
    ...props
}: {
    eyebrow?: ReactNode
    headline: ReactNode
    subheadline: ReactNode
    cta?: ReactNode
    footer?: ReactNode
    imageSrc?: string
    imageAlt?: string
} & ComponentProps<'section'>) {
    return (
        <section className={clsx('hero flex-col px-4', className)} {...props}>
            <Wallpaper className="wallpaper h-full min-h-0 w-full flex-1" color="green-copper" style={{ backgroundImage: 'none' }}>
                <div className="absolute inset-0 -z-20 rounded-lg bg-black" aria-hidden="true" />
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={1920}
                    height={1280}
                    className="h-full w-full object-cover absolute inset-0 -z-10 rounded-lg xl:rounded-2xl 2xl:rounded-3xl opacity-80"
                    priority
                />
                <div
                    className="absolute inset-0 z-0 rounded-lg bg-cover bg-center bg-no-repeat mix-blend-multiply pointer-events-none"
                    style={{ backgroundImage: 'url("/gradients/orange-green.svg")' }}
                    aria-hidden="true"
                />
                <div className="relative z-10 mx-auto flex h-full items-end sm:px-6 md:px-12 lg:px-0">
                    <Container className="flex h-full flex-col items-center justify-end gap-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
                        <div className="flex gap-x-10 gap-y-16 max-lg:flex-col sm:gap-y-24">
                            <div className="flex shrink-0 flex-col items-center gap-6 px-2 py-8">
                                {eyebrow}
                                <Heading className="max-w-7xl text-center" color="light">
                                    {headline}
                                </Heading>
                                <div className="flex max-w-lg flex-col gap-4 text-xl text-white text-center">{subheadline}</div>
                                {cta}
                            </div>
                        </div>
                    </Container>
                </div>
            </Wallpaper>
            {footer && <Container>{footer}</Container>}
        </section>
    )
}
