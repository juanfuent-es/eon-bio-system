import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Wallpaper } from '../elements/wallpaper'

export function HeroWithDemoOnBackground({
 eyebrow,
 headline,
 subheadline,
 cta,
 demo,
 footer,
 className,
 ...props
}: {
 eyebrow?: ReactNode
 headline: ReactNode
 subheadline: ReactNode
 cta?: ReactNode
 demo?: ReactNode
 footer?: ReactNode
} & ComponentProps<'section'>) {
 return (
  <section className={clsx('flex flex-col gap-16 px-2 pb-16', className)} {...props}>
   <Wallpaper className="rounded-lg" color="green">
    <div className="-mx-2 sm:px-6 md:px-12 lg:px-0">
     <Container className="flex flex-col gap-16 items-center">
      <div className="flex gap-x-10 gap-y-16 max-lg:flex-col sm:gap-y-24">
       <div className="flex shrink-0 flex-col items-center gap-6 py-16 sm:py-32 lg:basis-3xl lg:py-40">
        {eyebrow}
        <Heading className="max-w-7xl text-center" color="light">
         {headline}
        </Heading>
        <div className="flex max-w-xl flex-col gap-4 text-lg/8 text-white/70 text-center">{subheadline}</div>
        {cta}
       </div>
      </div>
     </Container>
    </div>
   </Wallpaper>
   <Container>{footer}</Container>
  </section>
 )
}
