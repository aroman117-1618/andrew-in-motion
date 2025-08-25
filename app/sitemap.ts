import type { MetadataRoute } from 'next'

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
  'https://andrewinmotion.tech'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,
      changeFrequency: 'monthly',
      priority: 1,
      lastModified: new Date(),
    },
  ]
}
