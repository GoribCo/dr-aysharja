import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'
import { loadDoctorName, loadContentSection } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName();
  return {
  title: 'Services',
  description: loadContentSection('services.md')?.description || `Explore services and consultation information from ${doctorName}.`,
  }
}

export default function ServicesPage() {
  return <ServicesClient />
}
