'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import ResourcePageLayout from './ResourcePageLayout'
import { useContentLanguage } from './ContentLanguageProvider'
import { useUiLang } from './UiLanguageProvider'
import { BASE_PATH } from '@/lib/site/deployment'
import type { DoctorSection, ProfileContent } from '@/lib/types'

const pages = ['profile', 'qualifications', 'experience', 'awards', 'memberships', 'publications'] as const
export type AboutPageKey = typeof pages[number]

export default function AboutPageLayout({ page, title, intro, children }: {
  page: AboutPageKey
  title: string
  intro: string
  children: React.ReactNode
}) {
  const navigationRef = useRef<HTMLElement>(null)
  const [scrollEdges, setScrollEdges] = useState({ start: true, end: true })
  const { t } = useUiLang()
  const { content } = useContentLanguage()
  const profile = content?.profile as (DoctorSection & ProfileContent) | null | undefined

  useEffect(() => {
    const nav = navigationRef.current
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]')
    if (!nav || !active) return
    const updateEdges = () => setScrollEdges({
      start: nav.scrollLeft <= 1,
      end: nav.scrollLeft + nav.clientWidth >= nav.scrollWidth - 1,
    })
    const revealActiveTab = () => {
      if (!nav.clientWidth) return
      nav.scrollLeft += active.getBoundingClientRect().left - nav.getBoundingClientRect().left
        - (nav.clientWidth - active.offsetWidth) / 2
      updateEdges()
    }
    nav.addEventListener('scroll', updateEdges, { passive: true })
    revealActiveTab()
    const observer = new ResizeObserver(revealActiveTab)
    observer.observe(nav)
    return () => {
      observer.disconnect()
      nav.removeEventListener('scroll', updateEdges)
    }
  }, [page, t])

  function scrollTabs(direction: number) {
    const nav = navigationRef.current
    if (!nav) return
    nav.scrollBy({ left: direction * nav.clientWidth * 0.8,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  return <ResourcePageLayout about title={title} intro={intro} category={t.nav.about}
    navigation={<div className="about-navigation-shell">
      <button type="button" className="about-scroll-button" aria-label={t.nav.previousSections}
        aria-controls="about-section-navigation" disabled={scrollEdges.start} onClick={() => scrollTabs(-1)}>
        <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m14 6-6 6 6 6" /></svg>
      </button>
      <nav id="about-section-navigation" ref={navigationRef} className="about-navigation" aria-label={t.nav.about}>
      {pages.filter(key => key === page || content?.[key]?.isVisible).map(key => <Link
        key={key} href={`/${key}/`} aria-current={key === page ? 'page' : undefined}
      >{t.nav[key]}</Link>)}
      </nav>
      <button type="button" className="about-scroll-button" aria-label={t.nav.nextSections}
        aria-controls="about-section-navigation" disabled={scrollEdges.end} onClick={() => scrollTabs(1)}>
        <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m10 6 6 6-6 6" /></svg>
      </button>
    </div>}
    summary={page === 'profile' && profile?.isVisible ? <>
      <div className="about-identity">
        {content?.site.profileImage && <img className="about-avatar" src={`${BASE_PATH}${content.site.profileImage}`} alt={profile.doctorName} />}
        <div className="about-identity-copy">
          <p className="about-identity-label">{t.doctor.profileEyebrow}</p>
          <h2>{profile.doctorName}</h2>
          <p className="about-designation">{profile.designation}</p>
        </div>
      </div>
    </> : undefined}
  >{children}</ResourcePageLayout>
}
