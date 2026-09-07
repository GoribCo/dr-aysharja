import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site/config'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = getSiteUrl()
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
