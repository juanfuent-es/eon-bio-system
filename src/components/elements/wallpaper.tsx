import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const html = String.raw

type WallpaperTone = 'green' | 'blue' | 'purple' | 'brown' | 'green-copper' | 'emerald' | 'mist' | 'bone-mist'

const gradientByTone: Record<WallpaperTone, string> = {
 green: '/gradients/orange-green.svg',
 blue: '/gradients/neblina-negra.svg',
 purple: '/gradients/neblina-negra.svg',
 brown: '/gradients/hueso-naranja.svg',
 'green-copper': '/gradients/orange-green.svg',
 emerald: '/gradients/neblina-esmeralda.svg',
 mist: '/gradients/neblina-negra.svg',
 'bone-mist': '/gradients/hueso-neblina.svg',
}

const noisePattern = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
 html`
  <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 100 100">
   <filter id="n">
    <feTurbulence type="turbulence" baseFrequency="1.4" numOctaves="1" seed="2" stitchTiles="stitch" result="n" />
    <feComponentTransfer result="g">
     <feFuncR type="linear" slope="4" intercept="1" />
     <feFuncG type="linear" slope="4" intercept="1" />
     <feFuncB type="linear" slope="4" intercept="1" />
    </feComponentTransfer>
    <feColorMatrix type="saturate" values="0" in="g" />
   </filter>
   <rect width="100%" height="100%" filter="url(#n)" />
  </svg>
 `.replace(/\s+/g, ' '),
)}")`

export function Wallpaper({
 children,
 color,
 className,
 style,
 ...props
}: { color: WallpaperTone } & ComponentProps<'div'>) {
 return (
  <div
   data-color={color}
   className={clsx(
    'relative overflow-hidden bg-cover bg-center bg-no-repeat',
    className,
   )}
   style={{
    backgroundImage: `url("${gradientByTone[color]}")`,
    ...style,
   }}
   {...props}
  >
   <div
    className="absolute inset-0 opacity-30 mix-blend-overlay"
    style={{
     backgroundPosition: 'center',
     backgroundImage: noisePattern,
    }}
   />
    <div className="relative flex w-full items-center">{children}</div>
  </div>
 )
}
