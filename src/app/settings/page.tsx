import SettingsPageClient from './SettingsPageClient'
import type { Metadata } from 'next'
import { loadDoctorName } from '@/lib/content/loaders'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName('en');
  return {
  title: 'Settings',
  alternates: { canonical: '/settings/' },
  description: `Customize your ${doctorName} profile experience.`,
  }
}

export default function SettingsPage() {
  return <SettingsPageClient />
}
