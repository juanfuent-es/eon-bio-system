import { clsx } from 'clsx/lite'
import Image from 'next/image'
import type { ComponentProps, ReactNode } from 'react'
import sanitizeHtml from 'sanitize-html'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Wallpaper } from '../elements/wallpaper'
export function Hero({
  align = 'center',
  eyebrow,
  headline,
  subtitle,
  subheadline,
  cta,
  footer,
  imageSrc = '/photos/eon-biosystem-home.png',
  imageAlt = 'Imagen de portada de EON BioSystem',
  imageUnoptimized = false,
  className,
  ...props
}: {
  align?: 'left' | 'center' | 'right'
  eyebrow?: ReactNode
  headline: ReactNode
  subtitle?: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
  footer?: ReactNode
  imageSrc?: string
  imageAlt?: string
  imageUnoptimized?: boolean
} & ComponentProps<'section'>) {
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return (
    <section className={clsx('hero text-white flex-col p-4', className)} {...props}>
      <Wallpaper
        className="wallpaper h-full min-h-0 w-full flex-1"
        color="green-copper"
        style={{ backgroundImage: 'none' }}
      >
        <div className="absolute inset-0 -z-20 rounded-lg bg-black" aria-hidden="true" />
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full rounded-lg object-cover opacity-75 xl:rounded-2xl 2xl:rounded-3xl"
          sizes="100vw"
          unoptimized={imageUnoptimized}
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-lg bg-cover bg-center bg-no-repeat mix-blend-multiply"
          style={{ backgroundImage: 'url("/gradients/orange-green.svg")' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] rounded-lg xl:rounded-2xl 2xl:rounded-3xl"
          style={{ backgroundImage: 'linear-gradient(to top, rgb(0 0 0 / 1), rgb(0 0 0 / 0))' }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex h-full w-full items-end sm:px-6 md:px-12 lg:px-0">
          <Container
            className={clsx(
              'flex h-full flex-col justify-end gap-4 md:gap-8 lg:gap-12 xl:gap-16',
              alignmentClasses[align],
            )}
          >
            <div
              className={clsx(
                'flex w-full min-w-0 flex-col gap-4',
                alignmentClasses[align],
                align === 'center' ? 'max-w-7xl' : 'max-w-3xl',
              )}
            >
              {eyebrow}
              {typeof headline === 'string' ? (
                <Heading
                  className="max-w-7xl"
                  color="light"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(headline, {
                      allowedTags: ['br', 'em', 'strong', 'i', 'b', 'span', 'small', 'sup', 'sub'],
                      allowedAttributes: {},
                    }),
                  }}
                />
              ) : (
                <Heading className="max-w-7xl" color="light">
                  {headline}
                </Heading>
              )}
              {subtitle && (
                <p className="text-2xl xl:text-3xl max-w-2xl font-serif leading-snug tracking-tight text-balance text-white">
                  {subtitle}
                </p>
              )}
              <div className="flex max-w-xl mt-0 text-balance flex-col gap-4 text-lg text-white">{subheadline}</div>
              {cta}
            </div>
          </Container>
        </div>
      </Wallpaper>
      {footer && <Container>{footer}</Container>}
    </section>
  )
}
