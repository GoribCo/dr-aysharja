'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { isNavigationItemActive } from '@/lib/navigation/routes'
import { useUiLang } from './UiLanguageProvider'

export default function MobileSectionTabs({ label, items }: {
  label: string
  items: { href: string; label: string }[]
}) {
  const id = useId()
  const pathname = usePathname()
  const navigationRef = useRef<HTMLElement>(null)
  const [scrollEdges, setScrollEdges] = useState({ start: true, end: true })
  const { t } = useUiLang()

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
  }, [pathname, t, items])

  function scrollTabs(direction: number) {
    const nav = navigationRef.current
    if (!nav) return
    nav.scrollBy({ left: direction * nav.clientWidth * 0.8,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  return <div className="section-tabs-shell">
      <button type="button" className="section-tabs-button" aria-label={t.nav.previousSections}
        aria-controls={id} disabled={scrollEdges.start} onClick={() => scrollTabs(-1)}>
        <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m14 6-6 6 6 6" /></svg>
      </button>
      <nav id={id} ref={navigationRef} className="section-tabs" aria-label={label}>
      {items.map(item => <Link key={item.href} href={item.href}
        aria-current={isNavigationItemActive(pathname, item.href) ? 'page' : undefined}
      >{item.label}</Link>)}
      </nav>
      <button type="button" className="section-tabs-button" aria-label={t.nav.nextSections}
        aria-controls={id} disabled={scrollEdges.end} onClick={() => scrollTabs(1)}>
        <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m10 6 6 6-6 6" /></svg>
      </button>
    </div>
}
