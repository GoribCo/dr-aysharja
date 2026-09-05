import SettingsPageClient from './SettingsPageClient'
import type { Metadata } from 'next'
import { getDoctorName } from '@/lib/doctorContent'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = getDoctorName('en');
  return {
  title: 'Settings',
  alternates: { canonical: '/settings/' },
  description: `Customize your ${doctorName} profile experience.`,
  }
}

export default function SettingsPage() {
  return <SettingsPageClient />
}
