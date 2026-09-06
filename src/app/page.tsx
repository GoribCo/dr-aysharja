import { loadDoctorContent } from '@/lib/content/loaders'
import HomeClient from './HomeClient'
import type { Metadata } from 'next'
import { loadDoctorName, loadSiteSettings } from '@/lib/content/loaders'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName('en');
  const site = loadSiteSettings()
  return {
  title: `${doctorName} - Professional Profile`,
  description: site.seo?.defaultDescription,
  }
}

export default function HomePage() {
  // Load content in default language (bn) - will be dynamically loaded on client
  const doctorContent = loadDoctorContent('bn')

  return <HomeClient doctorContent={doctorContent} />
}
