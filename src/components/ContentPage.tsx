'use client'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useUiLang } from './UiLanguageProvider'
import { useContentLanguage } from './ContentLanguageProvider'
import AboutPageLayout, { type AboutPageKey } from './AboutPageLayout'

interface ContentPageProps {
  sectionKey: Exclude<AboutPageKey, 'profile'>
  title: string
  description?: string
}

export default function ContentPage({ sectionKey, title, description }: ContentPageProps) {
  const { t } = useUiLang()
  const { content } = useContentLanguage()
  const section = content?.[sectionKey]

  return <AboutPageLayout page={sectionKey} title={section?.title || t.nav[sectionKey] || title}
    intro={section?.description || description || ''}>
    {section?.isVisible ? <div className={`about-content about-content-${sectionKey}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.content}</ReactMarkdown>
    </div> : <div className="about-empty">
      <p>{t.common.unavailable}</p>
      <Link href="/">{t.common.home} <span aria-hidden="true">→</span></Link>
    </div>}
  </AboutPageLayout>
}
