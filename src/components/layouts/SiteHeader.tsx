'use client'

import type { SiteHeaderProps } from '@/lib/types'

import Link from 'next/link'
import SettingsDrawer from '@/components/SettingsDrawer'
import { useContentLanguage } from '@/components/ContentLanguageProvider'
import { useDoctorContent } from '@/hooks/useDoctorContent'
import { useUiLang } from '@/components/UiLanguageProvider'

function text(content: Record<string, unknown>, key: string, fallback = '') {
  return typeof content[key] === 'string' ? content[key] as string : fallback
}

function PhoneIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L6.96 9.74a16 16 0 0 0 7.3 7.3l1.29-1.29a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z" /></svg>
}

export default function SiteHeader({ initialHome, doctorName }: SiteHeaderProps) {
  const {lang} = useContentLanguage()
  const { t } = useUiLang()
  const {content: fetchedContent} = useDoctorContent(lang)
  const home = (fetchedContent?.home ?? initialHome ?? {}) as Record<string, unknown>
  const name = text(home, 'doctorName', doctorName)
  const phone = text(home, 'phone', fetchedContent?.site.appointment?.phone || '')
  const phoneHref = phone ? `tel:${phone}` : '/appointment/'

  return <header className="site-header">
    <div className="site-header-inner">
      <Link href="/" className="brand" aria-label={`${name} ${t.nav.home}`}>
        <span className="brand-mark">ALP</span>
        <span><strong>{name}</strong>
                  <small>{text(home, 'brandSubtitle')}</small>
                  </span>
      </Link>
      <div className="header-actions">
        <Link
            href={phoneHref} aria-label={text(home, 'callToBook')} className="header-phone"><PhoneIcon/><span>{text(home, 'callToBook')}</span>
        </Link>
        <SettingsDrawer />
      </div>
    </div>
  </header>
}
