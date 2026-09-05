import type { Metadata } from 'next'
import ResourcePage from '@/components/ResourcePage'

export const dynamic = 'force-static'
export const metadata: Metadata = { title: 'Privacy policy', alternates: { canonical: '/privacy/' } }

export default function Page() {
  return <ResourcePage page="privacy" />
}
