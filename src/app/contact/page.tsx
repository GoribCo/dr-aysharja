import type { Metadata } from 'next'
import ContactClient from './ContactClient'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName('en');
  return {
  title: 'Contact',
  description: 'Contact details and clinic information.',
  }
}

export default function ContactPage() {
  return <ContactClient />
}
