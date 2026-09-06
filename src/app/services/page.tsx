import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName('en');
  return {
  title: 'Services',
  description: `Orthopedic care with ${doctorName}, including fractures, joint pain, arthritis, sports injuries, spine care, and rehabilitation.`,
  }
}

export default function ServicesPage() {
  return <ServicesClient />
}
