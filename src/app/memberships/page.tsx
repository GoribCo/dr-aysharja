import type { Metadata } from 'next'
import ContentPage from '@/components/ContentPage'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName();
  return {
  title: 'Memberships',
  description: 'Professional memberships and associations',
  alternates: { canonical: '/memberships/' },
  }
}

export default function MembershipsPage() {
  return <ContentPage 
    sectionKey="memberships"
    title="Memberships"
  />
}
