import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Wallpaper } from '../elements/wallpaper'

export function Hero({
    eyebrow,
    headline,
    subheadline,
    cta,
    footer,
    className,
    ...props
}: {
    eyebrow?: ReactNode
    headline: ReactNode
    subheadline: ReactNode
    cta?: ReactNode
    footer?: ReactNode
} & ComponentProps<'section'>) {
    return (
        <section className={clsx('snap-padding-y px-4', className)} {...props}>
            <Wallpaper className="rounded-lg" color="green">
                <div className="-mx-2 sm:px-6 md:px-12 lg:px-0">
                    <Container className="flex flex-col gap-16 items-center">
                        <div className="flex gap-x-10 gap-y-16 max-lg:flex-col sm:gap-y-24">
                            <div className="flex shrink-0 flex-col items-center gap-6 py-16 sm:py-32 lg:basis-5xl lg:py-40">
                                {eyebrow}
                                <Heading className="max-w-7xl text-center" color="light">
                                    {headline}
                                </Heading>
                                <div className="flex max-w-lg flex-col gap-4 text-lg/8 text-white/80 text-center">{subheadline}</div>
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
