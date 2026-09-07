import { loadDoctorContent } from '@/lib/content/loaders'
import HomeClient from './HomeClient'
import type { Metadata } from 'next'
import { loadDoctorName, loadSiteSettings } from '@/lib/content/loaders'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName();
  const site = loadSiteSettings()
  return {
  title: `${doctorName} - Professional Profile`,
  description: site.seo?.defaultDescription,
  }
}

export default function HomePage() {
  // Render the configured default language; visitors can select another supported language.
  const doctorContent = loadDoctorContent()

  return <HomeClient doctorContent={doctorContent} />
}
