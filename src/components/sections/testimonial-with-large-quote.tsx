import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Wallpaper } from '../elements/wallpaper'

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
    <section className={clsx('testimonial mx-auto w-full', className)} {...props}>
      <Wallpaper color="colors" className="wallpaper min-h-[calc(100dvh-2rem)] py-16">
        <Container className="relative z-10">
          <figure className="text-green-950">
            <blockquote className="mx-auto flex max-w-5xl flex-col gap-4 text-center text-xl leading-relaxed tracking-tight text-balance md:text-2xl lg:text-3xl">
              “{quote}”
            </blockquote>
            <figcaption className="mt-6 flex flex-col items-center md:mt-8 lg:mt-12">
              <div className="flex size-12 overflow-hidden rounded-full outline -outline-offset-1 outline-black/5 transition-transform duration-150 *:size-full *:object-cover md:size-16 md:hover:scale-105 lg:size-20">
                {img}
              </div>
              <p className="mt-4 text-center font-serif text-lg font-semibold lg:text-xl">{name}</p>
              <p className="lg:text-md text-center text-sm font-medium text-green-700">{byline}</p>
            </figcaption>
          </figure>
        </Container>
      </Wallpaper>
    </section>
  )
}
