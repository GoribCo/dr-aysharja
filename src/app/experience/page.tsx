import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName('en');
  return {
  title: 'Experience',
  description: 'Professional experience and career history',
  }
}

export default function ExperiencePage() {
  return <ContentPage 
    sectionKey="experience"
    title="Experience"
  />
}
