'use client'

import { clsx } from 'clsx/lite'
import { useEffect, useId, useRef, useState, type ComponentProps } from 'react'

/**
 * Ouroboros: la serpiente del símbolo recorriendo el infinito.
 *
 * Geometría: dos círculos (r = 215) unidos por sus tangentes internas, que se
 * cruzan en el centro (500, 250). El trazo va en el sentido en que avanza la
 * cabeza: entra al cruce desde arriba a la izquierda, baja hacia la derecha,
 * rodea el lazo derecho, cruza de nuevo y rodea el lazo izquierdo.
 */
export const OUROBOROS_PATH =
  'M456.22,157.79 L543.78,342.21 A215,215 0 1 0 543.78,157.79 L456.22,342.21 A215,215 0 1 1 456.22,157.79 Z'

/** El trazo se normaliza con pathLength=1000, así que todas las longitudes van de 0 a 1000. */
const LOOP = 1000
const STROKE = 36

/**
 * El cuerpo se dibuja con varias capas que terminan en la cabeza: la más corta es la
 * más gruesa y la más larga la más delgada, así la cola se adelgaza como en el logo.
 * [fracción del largo del cuerpo, fracción del grosor]
 */
const TAPER: ReadonlyArray<readonly [number, number]> = Array.from({ length: 16 }, (_, i) => {
  const t = i / 15 // 0 = capa más corta (junto a la cabeza), 1 = la más larga (punta de la cola)
  return [0.5 + 0.5 * t, 1 - 0.85 * t * t] as const
})

/** Cabeza en coordenadas locales: apunta hacia +x y su cuello queda en el origen. */
const HEAD_PATH = 'M-14,-18 C4,-30 38,-34 58,-20 C72,-10 72,10 58,20 C38,34 4,30 -14,18 Z'

function dash(len: number, head: number) {
  return { dasharray: `${len} ${LOOP - len}`, dashoffset: len - head }
}

function svgId(raw: string) {
  return `ouroboros-${raw.replace(/[^a-zA-Z0-9_-]/g, '')}`
}

/* ------------------------------------------------------------------------------------------------
 * Preloader: animación 100 % SVG (SMIL), corre antes de que hidrate React.
 * --------------------------------------------------------------------------------------------- */

export function OuroborosLoop({
  duration = 2.4,
  bodyLength = 560,
  showTrack = true,
  className,
  ...props
}: { duration?: number; bodyLength?: number; showTrack?: boolean } & ComponentProps<'svg'>) {
  const id = svgId(useId())
  const dur = `${duration}s`

  return (
    <svg viewBox="0 0 1000 500" fill="none" aria-hidden="true" className={className} {...props}>
      <path id={id} d={OUROBOROS_PATH} pathLength={LOOP} stroke="none" />
      {showTrack && (
        <path d={OUROBOROS_PATH} stroke="currentColor" strokeOpacity={0.1} strokeWidth={STROKE * 0.5} />
      )}
      <g stroke="currentColor" strokeLinecap="round">
        {TAPER.map(([lenFactor, widthFactor]) => {
          const len = bodyLength * lenFactor
          const start = dash(len, 0)
          return (
            <path
              key={lenFactor}
              d={OUROBOROS_PATH}
              pathLength={LOOP}
              strokeWidth={STROKE * widthFactor}
              strokeDasharray={start.dasharray}
              strokeDashoffset={start.dashoffset}
            >
              <animate
                attributeName="stroke-dashoffset"
                from={start.dashoffset}
                to={start.dashoffset - LOOP}
                dur={dur}
                repeatCount="indefinite"
              />
            </path>
          )
        })}
      </g>
      <g fill="currentColor">
        <path d={HEAD_PATH} />
        <animateMotion dur={dur} repeatCount="indefinite" rotate="auto" calcMode="paced">
          <mpath href={`#${id}`} />
        </animateMotion>
      </g>
    </svg>
  )
}

/** Duración de la salida: sube el preloader (0.8 s) y entra el contenido (0.25 s de retraso + 0.9 s). */
const PRELOADER_EXIT_MS = 1200

/**
 * La coreografía vive en globals.css y se controla con `data-preloader` en <html>
 * (el layout lo renderiza en "active" para que el contenido nazca oculto desde el servidor).
 */
export function OuroborosPreloader({ minDuration = 1200 }: { minDuration?: number }) {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const started = performance.now()
    let timer: ReturnType<typeof setTimeout>

    function leave() {
      root.dataset.preloader = 'leaving'
      timer = setTimeout(() => {
        delete root.dataset.preloader
        setGone(true)
      }, PRELOADER_EXIT_MS)
    }

    function onLoad() {
      timer = setTimeout(leave, Math.max(0, minDuration - (performance.now() - started)))
    }

    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', onLoad)
    }
  }, [minDuration])

  if (gone) return null

  return (
    <div
      role="status"
      aria-label="Cargando"
      className="ouroboros-preloader fixed inset-0 z-[100] flex items-center justify-center bg-neutral-100 text-green-800"
    >
      <OuroborosLoop className="w-[clamp(120px,30vw,180px)]" />
    </div>
  )
}

/* ------------------------------------------------------------------------------------------------
 * Fondo fijo: la serpiente avanza conforme se hace scroll.
 * --------------------------------------------------------------------------------------------- */

export function OuroborosScrollBackground({
  laps = 1,
  minBody = 220,
  maxBody = 940,
  className,
}: {
  /** Vueltas completas que da la cabeza entre el inicio y el final de la página. */
  laps?: number
  /** Largo del cuerpo al inicio de la página (de 1000). */
  minBody?: number
  /** Largo del cuerpo al final: cerca de 1000 la boca alcanza la cola. */
  maxBody?: number
  className?: string
}) {
  const trackRef = useRef<SVGPathElement>(null)
  const layerRefs = useRef<Array<SVGPathElement | null>>([])
  const headRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const headEl = headRef.current
    if (!track || !headEl) return

    const realLength = track.getTotalLength()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let current = -1
    let target = 0
    let frame = 0

    function readScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }

    function draw(progress: number) {
      const body = minBody + (maxBody - minBody) * progress
      // La cabeza arranca adelantada para que la cola nunca quede antes del inicio.
      const head = body + progress * laps * LOOP

      TAPER.forEach(([lenFactor], i) => {
        const el = layerRefs.current[i]
        if (!el) return
        const d = dash(body * lenFactor, head)
        el.style.strokeDasharray = d.dasharray
        el.style.strokeDashoffset = String(d.dashoffset)
      })

      const at = (((head % LOOP) + LOOP) % LOOP) * (realLength / LOOP)
      const p = track!.getPointAtLength(at)
      const q = track!.getPointAtLength((at + 1) % realLength)
      const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI
      headEl!.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${angle})`)
    }

    function tick() {
      const next = reduceMotion || current < 0 ? target : current + (target - current) * 0.12
      current = Math.abs(target - next) < 0.0002 ? target : next
      draw(current)
      frame = current === target ? 0 : requestAnimationFrame(tick)
    }

    function onScroll() {
      readScroll()
      if (!frame) frame = requestAnimationFrame(tick)
    }

    readScroll()
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [laps, minBody, maxBody])

  return (
    <div
      aria-hidden="true"
      className={clsx('pointer-events-none fixed inset-0 -z-10 flex items-center justify-center', className)}
    >
      <svg viewBox="0 0 1000 500" fill="none" className="w-[min(130vw,1400px)] text-green-800 opacity-[0.07]">
        <path ref={trackRef} d={OUROBOROS_PATH} stroke="currentColor" strokeOpacity={0.35} strokeWidth={STROKE * 0.5} />
        <g stroke="currentColor" strokeLinecap="round">
          {TAPER.map(([lenFactor, widthFactor], i) => (
            <path
              key={lenFactor}
              ref={(el) => {
                layerRefs.current[i] = el
              }}
              d={OUROBOROS_PATH}
              pathLength={LOOP}
              strokeWidth={STROKE * widthFactor}
              strokeDasharray={`0 ${LOOP}`}
            />
          ))}
        </g>
        <g ref={headRef} fill="currentColor" transform="translate(-100 -100)">
          <path d={HEAD_PATH} />
        </g>
      </svg>
    </div>
  )
}
