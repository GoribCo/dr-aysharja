import type { Metadata } from 'next'
import { loadContentSection } from '@/lib/content/loaders'
import ProfileClient from './ProfileClient'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName();
  return {
  title: 'Professional Profile',
  description: `Meet ${doctorName} and learn about their approach to patient care.`,
  alternates: { canonical: '/profile/' },
  }
}

export default function ProfilePage() {
  return <ProfileClient initialProfile={loadContentSection('profile.md')} />
}
