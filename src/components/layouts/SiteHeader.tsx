'use client'

import Link from 'next/link'
import SettingsDrawer from '@/components/SettingsDrawer'
import { useContentLanguage } from '@/components/ContentLanguageProvider'
import { useDoctorContent } from '@/hooks/useDoctorContent'
import { useUiLang } from '@/components/UiLanguageProvider'
import { PhoneIcon } from '@/components/Icons'
import { text } from '@/lib/content/helpers'

interface SiteHeaderProps {
  initialHome?: Record<string, unknown> | null
  doctorName: string
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
        <span className="brand-mark">{fetchedContent?.site.branding?.monogram || text(home, 'doctorInitials', '+')}</span>
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
