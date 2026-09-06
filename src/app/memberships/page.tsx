import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName('en');
  return {
  title: 'Memberships',
  description: 'Professional memberships and associations',
  }
}

export default function MembershipsPage() {
  return <ContentPage 
    sectionKey="memberships"
    title="Memberships"
  />
}
