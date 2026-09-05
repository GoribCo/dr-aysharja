import type { Metadata } from 'next'
import ResourcePage from '@/components/ResourcePage'

export const dynamic = 'force-static'
export const metadata: Metadata = { title: 'Terms of use', alternates: { canonical: '/terms/' } }

export default function Page() {
  return <ResourcePage page="terms" />
}
