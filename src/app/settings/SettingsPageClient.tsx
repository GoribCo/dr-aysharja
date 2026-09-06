'use client'

import ResourcePageLayout from '@/components/ResourcePageLayout'
import { useUiLang } from '@/components/UiLanguageProvider'
import SettingsClient from './SettingsClient'
import { useContentLanguage } from '@/components/ContentLanguageProvider'

export default function SettingsPageClient() {
  const { t } = useUiLang()
  const { content } = useContentLanguage()
  const inquiry = content?.resources.settings
  return (
    <ResourcePageLayout title={t.nav.settings} intro={t.settings.panelDescription} footer={inquiry &&
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {inquiry.heading}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {inquiry.description}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={inquiry.emailHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-teal-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-teal-800 dark:bg-teal-600"
          >
            {inquiry.emailLabel}
          </a>
          <a
            href={inquiry.phoneHref}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-teal-500 hover:text-teal-700 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {inquiry.phoneLabel}
          </a>
        </div>
      </section>
    }>
      <SettingsClient />
    </ResourcePageLayout>
  )
}
