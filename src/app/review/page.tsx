import type { Metadata } from 'next'
import ReviewPageClient from './ReviewClient'
import { loadDoctorName } from '@/lib/content/loaders'

export const dynamic = 'force-static'

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName();
  return {
  title: 'Patient Reviews',
  description: `Patient feedback and reviews for ${doctorName}.`,
  alternates: { canonical: '/review/' },
  }
}

export default function ReviewPage() {
  return <ReviewPageClient />
}
