import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName('en');
  return {
  title: 'Qualifications',
  description: 'Professional qualifications and credentials',
  }
}

export default function QualificationsPage() {
  return <ContentPage 
    sectionKey="qualifications"
    title="Qualifications"
  />
}
