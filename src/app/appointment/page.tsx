import type { Metadata } from 'next'
import AppointmentClient from './AppointmentClient'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName();
  return {
  title: 'Appointment',
  description: 'Book an appointment by phone or contact the clinic directly.',
  alternates: { canonical: '/appointment/' },
  }
}

export default function AppointmentPage() {
  return <AppointmentClient />
}
