'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { isNavigationItemActive } from '@/lib/navigation/routes'
import { useUiLang } from '../UiLanguageProvider'

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

  return ''
}
