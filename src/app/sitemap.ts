import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/profile',
    '/qualifications',
    '/experience',
    '/awards',
    '/memberships',
    '/publications',
    '/services',
    '/review',
    '/appointment',
    '/contact',
    '/privacy',
    '/terms',
    '/faq',
    '/settings',
    '/help',
  ]

  return routes.map((route, index) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.7,
  }))
}
