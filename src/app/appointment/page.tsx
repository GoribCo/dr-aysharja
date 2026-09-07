import type { Metadata } from 'next'
import AppointmentClient from './AppointmentClient'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName('en');
  return {
  title: 'Appointment',
  description: 'Book an appointment by phone or contact the clinic directly.',
  }
}

export default function AppointmentPage() {
  return <AppointmentClient />
}
