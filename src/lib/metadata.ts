import type { Metadata } from 'next'

export const defaultShareImage = {
  url: '/eon-share.png',
  width: 1280,
  height: 640,
  alt: 'EON BioSystem',
}

export function pageMetadata({
  title,
  description,
  image = defaultShareImage,
}: {
  title: string
  description?: string
  image?: { url: string; alt: string; width?: number; height?: number }
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: 'EON BioSystem',
      locale: 'es_MX',
      title,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
