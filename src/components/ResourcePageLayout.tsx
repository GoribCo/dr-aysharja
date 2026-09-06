'use client'

import Link from 'next/link'
import ContentPageTitle from './ContentPageTitle'
import { useUiLang } from './UiLanguageProvider'

type ResourcePageLayoutProps = {
  title: string
  intro: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function ResourcePageLayout({ title, intro, children, footer }: ResourcePageLayoutProps) {
  const { t } = useUiLang()
  return <div className="px-5 pb-28 pt-6 sm:px-8 lg:pb-10 lg:pt-10">
    <div className="mx-auto max-w-4xl">
      <ContentPageTitle eyebrow={t.nav.resources} heading={title} intro={intro} />
      <section className="grid items-start gap-5 md:grid-cols-[1fr_1.35fr]">
        <div className="rounded-2xl bg-teal-800 p-6 text-white shadow-sm dark:bg-teal-950 sm:p-8">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/12" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></svg>
          </div>
          <p className="text-sm font-medium text-teal-100">{t.nav.resources}</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight">{title}</h2>
          <p className="mt-4 text-sm leading-6 text-teal-100/80">{intro}</p>
          <Link href="/contact/" className="mt-7 inline-flex items-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-50">{t.nav.contact}<span className="ml-2" aria-hidden="true">→</span></Link>
        </div>
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
          <div className="border-b border-slate-100 pb-5 dark:border-slate-700">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{t.nav.resources}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
          </div>
          <div className="mt-6">{children}</div>
        </div>
      </section>
      {footer}
      <section className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/60 sm:flex-row sm:items-center sm:p-7">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.nav.help}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.doctor.readyToScheduleText}</p>
        </div>
        <div className="flex w-full shrink-0 flex-wrap gap-3 sm:w-auto">
          <Link href="/appointment/" className="rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500">{t.nav.appointment}</Link>
          <Link href="/contact/" className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-300">{t.nav.contact}</Link>
        </div>
      </section>
    </div>
  </div>
}
