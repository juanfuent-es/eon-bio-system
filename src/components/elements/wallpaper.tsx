import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

const html = String.raw

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
 ...props
}: { color: 'green' | 'blue' | 'purple' | 'brown' | 'green-copper' | 'emerald' | 'mist' | 'bone-mist' } & ComponentProps<'div'>) {
 return (
  <div
   data-color={color}
   className={clsx(
    'relative overflow-hidden bg-linear-to-b data-[color=green-copper]:from-[color-mix(in_srgb,var(--metabolic-copper)_70%,var(--bio-emerald)_30%)] data-[color=green-copper]:via-[color-mix(in_srgb,var(--bio-emerald)_50%,var(--core-black)_30%)] data-[color=green-copper]:to-[color-mix(in_srgb,var(--bio-emerald)_80%,var(--mist-steel)_35%)] data-[color=emerald]:from-[color-mix(in_srgb,var(--bio-emerald)_50%,var(--mist-steel)_22%)] data-[color=emerald]:to-[color-mix(in_srgb,var(--bio-emerald)_52%,var(--bone-light)_48%)] data-[color=mist]:from-[color-mix(in_srgb,var(--mist-steel)_70%,var(--bio-emerald)_30%)] data-[color=mist]:to-[color-mix(in_srgb,var(--mist-steel)_58%,var(--bone-light)_42%)] data-[color=bone-mist]:from-[color-mix(in_srgb,var(--bone-light)_68%,var(--mist-steel)_32%)] data-[color=bone-mist]:to-[color-mix(in_srgb,var(--bone-light)_92%,white_8%)]',
    className,
   )}
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
