'use client'

import { Subheading } from '@/components/elements/subheading'
import Image from 'next/image'
import { useState } from 'react'

export function YouTubeVideo({
  videoId,
  posterSrc,
  posterUnoptimized = false,
}: {
  videoId: string
  posterSrc: string
  posterUnoptimized?: boolean
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="h-dvh px-4">
      <div className="relative h-full overflow-hidden rounded-lg bg-black lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&controls=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={(event) => event.currentTarget.focus()}
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <>
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center text-white focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
            >
              <Image
                src={posterSrc}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                unoptimized={posterUnoptimized}
              />
              <Image
                src="/logos/muscle-assessment-discover.svg"
                alt="Descubre"
                width="623"
                height="135"
                className="w-2/3 min-w-96 object-contain h-auto absolute left-8 bottom-8 z-10 pointer-events-none"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45"
              />
              <span
                aria-hidden="true"
                className="relative flex size-20 items-center justify-center rounded-full border border-white/90 bg-transparent transition-colors group-hover:bg-white/10 sm:size-24"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth=".5"
                  strokeLinejoin="round"
                  className="ml-1 size-8 text-white sm:size-10"
                >
                  <path d="M8 4 20 12 8 20Z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>
    </section>
  )
}
