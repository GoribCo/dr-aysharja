'use client'

import Link from 'next/link'
import { useUiLang } from '@/components/UiLanguageProvider'
import { useEffect, useRef, useState } from 'react'
import { navigation, isNavigationItemActive, type NavigationItem } from '@/lib/navigation'

export default function AboutDropdown({ pathname, item: about = navigation.primary[1] }: { pathname: string; item?: NavigationItem }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useUiLang()
  const label = (value: string) => t.nav[value.toLowerCase() as keyof typeof t.nav] || value

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const aboutActive = isNavigationItemActive(pathname, about.path) || about.children?.some(item => isNavigationItemActive(pathname, item.path))

  return (
    <div ref={containerRef} className="about-dropdown">
      <button
        type="button"
        className={`desktop-nav-link ${aboutActive ? 'active' : ''}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(value => !value)}
      >
        {label(about.label)}<span className={`dropdown-chevron ${open ? 'open' : ''}`} aria-hidden="true">⌄</span>
      </button>
      <div className={`about-menu ${open ? 'open' : ''}`} role="menu" aria-hidden={!open}>
        {about.children?.map(item => (
          <Link
            key={item.path}
            href={item.path}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            className={isNavigationItemActive(pathname, item.path) ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {label(item.label)}
          </Link>
        ))}
      </div>
    </div>
  )
}