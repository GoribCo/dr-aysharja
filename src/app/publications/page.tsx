import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName('en');
  return {
  title: 'Publications',
  description: 'Published research and articles',
  }
}

export default function PublicationsPage() {
  return <ContentPage 
    sectionKey="publications"
    title="Publications"
    description="Published research and articles"
  />
}
