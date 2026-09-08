import type { MetadataRoute } from 'next'
import { loadDoctorIdentity, loadDoctorName, loadSiteSettings } from '@/lib/content/loaders'
import { formatDoctorShortName } from '@/lib/doctor/name'
import { getDefaultLanguage } from '@/lib/site/config'
import { BASE_PATH } from '@/lib/site/deployment'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  const site = loadSiteSettings()
  const root = `${BASE_PATH}/`
  return {
    id: root,
    name: loadDoctorName(),
    short_name: site.branding?.shortName || formatDoctorShortName(loadDoctorIdentity()),
    description: site.seo?.defaultDescription,
    lang: getDefaultLanguage(),
    start_url: root,
    scope: root,
    display: 'standalone',
    background_color: site.theme?.colorLight || '#f7f9f8',
    theme_color: site.theme?.primary || '#176f73',
    icons: [
      { src: `${BASE_PATH}${site.branding?.icon || '/icon.svg'}`, sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
      { src: `${BASE_PATH}${site.branding?.icon || '/icon.svg'}`, sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  }
}
