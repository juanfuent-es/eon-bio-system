import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

type WallpaperTone = 'green' | 'blue' | 'purple' | 'brown' | 'green-copper' | 'emerald' | 'mist' | 'bone-mist' | 'colors'

const gradientByTone: Record<WallpaperTone, string> = {
 green: '/gradients/orange-green.svg',
 blue: '/gradients/neblina-negra.svg',
 purple: '/gradients/neblina-negra.svg',
 brown: '/gradients/hueso-naranja.svg',
 'green-copper': '/gradients/orange-green.svg',
 emerald: '/gradients/neblina-esmeralda.svg',
 mist: '/gradients/neblina-negra.svg',
 'bone-mist': '/gradients/hueso-neblina.svg',
 colors: '/gradients/colors.png',
}

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
    'relative isolate overflow-hidden bg-cover bg-center bg-no-repeat rounded-panel ',
    className,
   )}
   style={{
    backgroundImage: `url("${gradientByTone[color]}")`,
    ...style,
   }}
   {...props}
  >
   <div className="noise-overlay" aria-hidden="true" />
    {children}
  </div>
 )
}
