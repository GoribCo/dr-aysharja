import type { Metadata } from 'next'
import ResourcePage from '@/components/ResourcePage'

export const dynamic = 'force-static'
export const metadata: Metadata = { title: 'Help', alternates: { canonical: '/help/' } }

export default function Page() {
  return <ResourcePage page="help" />
}
