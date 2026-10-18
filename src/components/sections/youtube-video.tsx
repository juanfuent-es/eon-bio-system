'use client'

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
    <section className="video-section p-0 sm:p-4">
      <div className="video-frame relative overflow-hidden rounded-panel bg-black">
        {playing ? (
          <iframe
            title="Video de EON Muscle Assessment"
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
              <span className="pointer-events-none absolute inset-x-0 bottom-4 z-10 px-4 sm:inset-x-auto sm:bottom-8 sm:left-8 sm:w-2/3 sm:px-0">
                <Image
                  src="/logos/muscle-assessment-discover.svg"
                  alt="Descubre"
                  width={623}
                  height={135}
                  className="h-auto w-full object-contain"
                />
              </span>
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
