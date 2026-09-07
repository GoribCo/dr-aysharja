import type { Metadata } from 'next'
import { loadContentSection } from '@/lib/content/loaders'
import ProfileClient from './ProfileClient'
import { loadDoctorName } from '@/lib/content/loaders'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName('en');
  return {
  title: 'Professional Profile',
  description: `Meet ${doctorName} and learn about her approach to patient care.`,
  }
}

export default function ProfilePage() {
  return <ProfileClient initialProfile={loadContentSection('profile.md', 'bn')} />
}
