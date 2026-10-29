import { clsx } from 'clsx/lite'
import Image from 'next/image'
import type { ComponentProps, ReactNode } from 'react'
import sanitizeHtml from 'sanitize-html'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Wallpaper } from '../elements/wallpaper'

type HeroIdentity =
  | { logo: { src: string; alt: string }; headline?: never }
  | { logo?: never; headline: ReactNode }

export function Hero({
  align = 'center',
  eyebrow,
  headline,
  logo,
  headingLevel = 1,
  subtitle,
  subheadline,
  cta,
  footer,
  imageSrc = '/photos/eon-biosystem-home.png',
  imageAlt = 'Imagen de portada de EON BioSystem',
  imageClassName,
  imageUnoptimized = false,
  imagePriority = true,
  className,
  ...props
}: {
  align?: 'left' | 'center' | 'right'
  eyebrow?: ReactNode
  headingLevel?: 1 | 2
  subtitle?: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
  footer?: ReactNode
  imageSrc?: string
  imageAlt?: string
  imageClassName?: string
  imageUnoptimized?: boolean
  imagePriority?: boolean
} & HeroIdentity & ComponentProps<'section'>) {
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-start text-left sm:items-end sm:text-right',
  }

  return (
    <section className={clsx('hero text-white flex-col p-4', className)} {...props}>
      <Wallpaper
        className="wallpaper w-full"
        color="green-copper"
        style={{ backgroundImage: 'none' }}
      >
        <div className="absolute inset-0 -z-20 rounded-[inherit] bg-black" aria-hidden="true" />
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1920}
          height={1280}
          className={clsx(
            'absolute inset-0 -z-10 h-full w-full rounded-[inherit] object-cover opacity-75',
            imageClassName,
          )}
          sizes="100vw"
          unoptimized={imageUnoptimized}
          priority={imagePriority}
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] bg-cover bg-center bg-no-repeat mix-blend-multiply"
          style={{ backgroundImage: 'url("/gradients/orange-green.svg")' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
          style={{ backgroundImage: 'linear-gradient(to top, rgb(0 0 0 / 1), rgb(0 0 0 / 0))' }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex w-full items-end sm:px-6 md:px-12 lg:px-0">
          <Container
            className={clsx(
              'flex flex-col justify-end gap-4 md:gap-8 lg:gap-12 xl:gap-16',
              alignmentClasses[align],
            )}
          >
            <div
              className={clsx(
                'flex w-full min-w-0 flex-col',
                alignmentClasses[align],
                align === 'center' ? 'max-w-7xl' : 'max-w-3xl',
              )}
            >
              {eyebrow}
              {logo ? (
                // Match Sistema's desktop logo height; each SVG keeps its own aspect ratio.
                <Heading level={headingLevel} className="relative w-full h-44 md:h-48 lg:h-52 xl:h-56 2xl:h-64" color="light">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="100vw"
                    className={clsx(
                      'object-contain drop-shadow-xl drop-shadow-amber-950/50',
                      align === 'left' && 'object-left',
                      align === 'center' && 'object-center',
                      align === 'right' && 'object-left sm:object-right',
                    )}
                  />
                </Heading>
              ) : typeof headline === 'string' ? (
                <Heading
                  level={headingLevel}
                  className="w-full min-w-0 max-w-7xl"
                  color="light"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(headline, {
                      allowedTags: ['br', 'em', 'strong', 'i', 'b', 'span', 'small', 'sup', 'sub'],
                      allowedAttributes: {},
                    }),
                  }}
                />
              ) : (
                <Heading level={headingLevel} className="w-full min-w-0 max-w-7xl" color="light">
                  {headline}
                </Heading>
              )}
              {subtitle && (
                <p className="hero-subtitle max-w-3xl text-white py-4">
                  {subtitle}
                </p>
              )}
              <div
                className={clsx(
                  'mt-0 flex max-w-xl flex-col gap-4 text-left text-white pb-4',
                  align === 'center' && 'sm:text-center',
                  align === 'right' && 'sm:text-right',
                )}
              >
                {subheadline}
              </div>
              {cta && <div className={clsx('flex w-full flex-col pt-1', alignmentClasses[align])}>{cta}</div>}
            </div>
          </Container>
        </div>
      </Wallpaper>
      {footer && <Container>{footer}</Container>}
    </section>
  )
}
