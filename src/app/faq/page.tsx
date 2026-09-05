import type { Metadata } from 'next'
import ResourcePage from '@/components/ResourcePage'

export const dynamic = 'force-static'
export const metadata: Metadata = { title: 'Frequently asked questions', alternates: { canonical: '/faq/' } }

export default function Page() {
  return <ResourcePage page="faq" />
}
