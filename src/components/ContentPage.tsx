'use client'

import type { ContentPageProps, DoctorSection } from '@/lib/types'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { useUiLang } from '@/components/UiLanguageProvider'
import { useContentLanguage } from '@/components/ContentLanguageProvider'
import { useSpeciality } from '@/components/SpecialityProvider'
import ThemeToggle from '@/components/ThemeToggle'
import { useDoctorContent } from '@/hooks/useDoctorContent'

import ContentPageTitle from "@/components/ContentPageTitle";

export default function ContentPage({ sectionKey, title, description }: ContentPageProps) {
  const { t } = useUiLang()
  const { lang: contentLang } = useContentLanguage()
  const { speciality, theme } = useSpeciality()
  const { content: data, isLoading, error } = useDoctorContent(contentLang)

  const section: DoctorSection | null = data?.[sectionKey] ?? null
  const pageDescription = description ?? section?.description

  if (isLoading) {
    return (
      <div className="px-6 pb-28 lg:pb-10 pt-6 max-w-3xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !section || !section.isVisible) {
    return (
      <div className="px-6 pb-28 lg:pb-10 pt-6 max-w-3xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">{t.common.unavailable}</p>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            {t.common.home}
          </Link>
        </div>
      </div>
    )
  }

  return (
      <div className="px-5 pb-28 pt-6 sm:px-8 lg:pb-10 lg:pt-10">
        <ContentPageTitle
            eyebrow={sectionKey}
            heading={title}
            intro={pageDescription}/>
        {/* Content */}
          <section
              className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8"
              aria-labelledby="appointment-link-heading">
              {/*<h2 id="appointment-link-heading" className="text-xl font-semibold text-slate-900 dark:text-white">*/}
              {/*    {title}*/}
              {/*</h2>*/}
              {/*<p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400 mb-8">*/}
              {/*    {pageDescription}*/}
              {/*</p>*/}

              <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{section.content}</ReactMarkdown>
              </div>
          </section>
      </div>
  )
}
