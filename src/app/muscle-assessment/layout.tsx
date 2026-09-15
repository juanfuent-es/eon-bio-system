import Script from 'next/script'
import type { ReactNode } from 'react'

export default function AssessmentLayout({ children }: { children: ReactNode }) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const enabled = measurementId && /^G-[A-Z0-9]+$/.test(measurementId)
  return (
    <>
      {enabled && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script
            id="assessment-analytics"
            strategy="afterInteractive"
          >{`window.dataLayer = window.dataLayer || []; window.gtag = window.gtag || function(){dataLayer.push(arguments);}; gtag('js', new Date()); gtag('config', '${measurementId}');`}</Script>
        </>
      )}
      {children}
    </>
  )
}
