'use client'

import Link from 'next/link'
import ResourcePageLayout from './ResourcePageLayout'
import { useUiLang } from './UiLanguageProvider'

import { useContentLanguage } from './ContentLanguageProvider'
import { navigation } from '@/lib/navigation/routes'

import type { ResourcePage as ResourcePageKind } from '@/lib/types'

type ResourcePageProps = { page: ResourcePageKind }

export default function ResourcePage({ page }: ResourcePageProps) {
  const { t } = useUiLang()
  const { content: doctorContent } = useContentLanguage()
  const content = doctorContent?.resources[page]
  if (!content) return <ResourcePageLayout title={t.nav[page]} intro={t.common.unavailable}>
    <p className="text-sm text-slate-600 dark:text-slate-300">{t.common.unavailable}</p>
  </ResourcePageLayout>
  const linkLabel = (href: string) => {
    const item = navigation.primary.flatMap(item => item.children ?? [item]).find(item => item.path === href)
    return item ? t.nav[item.label.toLowerCase() as keyof typeof t.nav] : t.nav.contact
  }
  return <ResourcePageLayout title={t.nav[page]} intro={content.intro}>
    <div className="space-y-4">
      {content.sections.map(section => {
        const body = <>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{section.body}</p>
          {section.href && <Link className="mt-4 inline-block rounded font-semibold text-teal-700 underline underline-offset-4 dark:text-teal-300" href={section.href}>{linkLabel(section.href)} <span aria-hidden="true">→</span></Link>}
        </>
        return page === 'faq'
          ? <details key={section.title} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-700"><summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">{section.title}</summary>{body}</details>
          : <section key={section.title} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-700"><h3 className="text-sm font-semibold text-slate-900 dark:text-white">{section.title}</h3>{body}</section>
      })}
    </div>
  </ResourcePageLayout>
}
