import type { Metadata } from 'next'
import ContactClient from './ContactClient'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName();
  return {
  title: 'Contact',
  description: 'Contact details and clinic information.',
  alternates: { canonical: '/contact/' },
  }
}

export default function ContactPage() {
  return <ContactClient />
}
