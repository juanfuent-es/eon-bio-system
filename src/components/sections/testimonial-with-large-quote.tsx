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
      <Wallpaper color="colors" className="wallpaper py-12 max-sm:px-0 sm:py-16">
        <Container className="relative z-10 max-sm:px-0">
          <figure className="mx-auto w-[90%] text-green-950">
            <blockquote>“{quote}”</blockquote>
            <figcaption className="testimonial-profile px-4">
              <div className="flex mt-2 size-12 overflow-hidden rounded-full outline -outline-offset-1 outline-black/5 transition-transform duration-150 *:size-full *:object-cover md:size-16 md:hover:scale-105 lg:size-20">
                {img}
              </div>
              <p className="testimonial-author mb-0 pb-0">{name}</p>
              <p className="testimonial-byline pt-0 mt-0 text-center text-green-700">{byline}</p>
            </figcaption>
          </figure>
        </Container>
      </Wallpaper>
    </section>
  )
}
