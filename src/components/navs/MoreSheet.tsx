'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { navigation, isNavigationItemActive } from '@/lib/navigation/routes'
import { useUiLang } from '@/components/UiLanguageProvider'

interface MoreSheetProps {
  open: boolean
  pathname: string
  isAuthenticated: boolean
  onClose: () => void
}

export default function MoreSheet({ open, pathname, isAuthenticated, onClose }: MoreSheetProps) {
  const { t } = useUiLang()
  const label = (value: string) => t.nav[value.toLowerCase() as keyof typeof t.nav] || value
  const about = navigation.primary.find(item => item.children)
  const contact = navigation.primary.find(item => item.path === '/contact/')
  const childActive = about?.children?.some(item => isNavigationItemActive(pathname, item.path)) ?? false
  const [aboutOpen, setAboutOpen] = useState(childActive)

  useEffect(() => {
    if (childActive) setAboutOpen(true)
  }, [childActive])

  return (
    <div className={`more-sheet-layer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <button type="button" className="more-sheet-backdrop" aria-label="Close menu" tabIndex={open ? 0 : -1} onClick={onClose} />
      <section className="more-sheet" role="dialog" aria-modal="true" aria-labelledby="more-sheet-title">
        <div className="more-sheet-handle" aria-hidden="true" />
        <div className="more-sheet-heading">
          <h2 id="more-sheet-title">More</h2>
          <button type="button" className="sheet-close" tabIndex={open ? 0 : -1} onClick={onClose} aria-label="Close menu">×</button>
        </div>
        <div className="more-sheet-links">
          {about && <div className="more-sheet-group">
            <button type="button" className="more-sheet-group-toggle" aria-expanded={aboutOpen} aria-controls="more-sheet-about-links" onClick={() => setAboutOpen(value => !value)}>
              {label(about.label)}<span className={aboutOpen ? 'open' : ''} aria-hidden="true">⌄</span>
            </button>
            <div id="more-sheet-about-links" className={`more-sheet-group-links ${aboutOpen ? 'open' : ''}`} aria-hidden={!aboutOpen}>
              {about.children?.map(item => <Link key={item.path} href={item.path} className={isNavigationItemActive(pathname, item.path) ? 'active' : ''} tabIndex={open && aboutOpen ? 0 : -1} onClick={onClose}>{label(item.label)}</Link>)}
            </div>
          </div>}
          {contact && <Link href={contact.path} className={isNavigationItemActive(pathname, contact.path) ? 'active' : ''} tabIndex={open ? 0 : -1} onClick={onClose}>{label(contact.label)}</Link>}
          {isAuthenticated && navigation.authenticatedOnly.map(item => <Link key={item.path} href={item.path} className={isNavigationItemActive(pathname, item.path) ? 'active' : ''} tabIndex={open ? 0 : -1} onClick={onClose}>{item.label}</Link>)}
        </div>
      </section>
    </div>
  )
}
