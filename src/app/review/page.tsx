import type { Metadata } from 'next'
import ReviewPageClient from './ReviewClient'
import { loadDoctorName } from '@/lib/content/loaders'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName('en');
  return {
  title: 'Patient Reviews',
  description: `Patient feedback and reviews for ${doctorName}.`,
  }
}

export default function ReviewPage() {
  return <ReviewPageClient />
}
