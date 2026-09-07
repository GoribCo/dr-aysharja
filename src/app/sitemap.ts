import { loadDoctorContent } from '@/lib/content/loaders'
import { visibleNavigation } from '@/lib/navigation/routes'
import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site/config'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = getSiteUrl()
  const routes = visibleNavigation(loadDoctorContent()).flatMap(item => item.children ?? [item])
    .map(item => item.path === '/' ? '' : item.path.replace(/\/$/, ''))

  return routes.map((route, index) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.7,
  }))
}
