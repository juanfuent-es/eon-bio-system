import type { NextConfig } from 'next'

const noStoreHeaders = [
  { key: 'Cache-Control', value: 'no-store, max-age=0, must-revalidate' },
  { key: 'CDN-Cache-Control', value: 'no-store' },
  { key: 'Vercel-CDN-Cache-Control', value: 'no-store' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/muscle-assessment',
        headers: noStoreHeaders,
      },
      {
        source: '/muscle-assessment/:path*',
        headers: noStoreHeaders,
      },
    ]
  },
}

export default nextConfig
