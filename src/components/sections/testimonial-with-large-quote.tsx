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
            <blockquote>“{quote}”</blockquote>
            <figcaption className="testimonial-profile">
              <div className="flex size-12 overflow-hidden rounded-full outline -outline-offset-1 outline-black/5 transition-transform duration-150 *:size-full *:object-cover md:size-16 md:hover:scale-105 lg:size-20">
                {img}
              </div>
              <p className="testimonial-author">{name}</p>
              <p className="testimonial-byline text-center text-green-700">{byline}</p>
            </figcaption>
          </figure>
        </Container>
      </Wallpaper>
    </section>
  )
}
