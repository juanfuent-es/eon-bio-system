import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'

export function TestimonialLargeQuote({
 quote,
 img,
 name,
 byline,
 className,
 ...props
}: {
 quote: ReactNode
 img: ReactNode
 name: ReactNode
 byline: ReactNode
} & ComponentProps<'section'>) {
 return (
  <section className={clsx('py-16 mx-auto', className)} {...props}>
   <Container>
    <figure className="text-green-950">
     <blockquote className="mx-auto flex max-w-5xl text-xl md:text-2xl lg:text-3xl leading-relaxed flex-col gap-4 text-center tracking-tight text-balance">
      “{quote}”
     </blockquote>
     <figcaption className="mt-6 md:mt-8 lg:mt-12 flex flex-col items-center">
      <div className="flex size-12 md:size-16 lg:size-20 overflow-hidden rounded-full outline -outline-offset-1 outline-black/5 *:size-full *:object-cover md:hover:scale-105 transition-transform duration-150">
       {img}
      </div>
      <p className="mt-4 text-center text-lg lg:text-xl font-serif font-semibold">{name}</p>
      <p className="text-center text-sm lg:text-md font-medium text-green-700">{byline}</p>
     </figcaption>
    </figure>
   </Container>
  </section>
 )
}
