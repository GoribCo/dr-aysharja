'use client'

import Link from 'next/link'
import SectionIcon from './SectionIcon'
import { version as appVersion } from '../../../package.json'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { navigation, isNavigationItemActive } from '@/lib/navigation/routes'
import { useUiLang } from '@/components/UiLanguageProvider'

import type { NavigationItem } from '@/lib/types'

type ChevronProps = { open: boolean }

type NavigationAccordionProps = { item: NavigationItem; pathname: string; mobile?: boolean; onNavigate?: () => void }

type BottomNavProps = { isAuthenticated?: boolean }

function translatedLabel(label: string, nav: Record<string, string>) {
  return nav[label.toLowerCase()] || label
}

const icons = {
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  courses: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
  profile: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  ),
  review: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  settings: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  more: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </svg>
  ),
}

function Chevron({ open }: ChevronProps) {
  return <svg aria-hidden="true" className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
}

function NavigationAccordion({ item: about, pathname, mobile = false, onNavigate }: NavigationAccordionProps) {
  const { t } = useUiLang()
  const childActive = about.children?.some(item => isNavigationItemActive(pathname, item.path)) ?? false
  const [open, setOpen] = useState(childActive)

  function toggle() {
    setOpen(value => !value)
  }

  useEffect(() => {
    if (childActive) setOpen(true)
  }, [childActive])

  return (
    <div className={mobile ? '' : 'flex flex-col'}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${mobile ? 'mobile' : 'desktop'}-${about.label.toLowerCase()}-links`}
        onClick={toggle}
        className={mobile
          ? `flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${childActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'}`
          : `flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left font-medium text-sm transition-colors ${childActive ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}`}
      >
        <span className="flex items-center gap-3"><SectionIcon path={about.path} />{translatedLabel(about.label, t.nav)}</span>
        <Chevron open={open} />
      </button>
      <div
        id={`${mobile ? 'mobile' : 'desktop'}-${about.label.toLowerCase()}-links`}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className={mobile ? 'ml-4' : 'ml-4'}>
            {about.children?.map(item => {
              const active = isNavigationItemActive(pathname, item.path)
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  tabIndex={open ? 0 : -1}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={mobile
                    ? `flex items-center gap-2.5 border-b border-gray-100 px-3 py-2.5 text-sm dark:border-gray-800 ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'}`
                    : `flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm ${active ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <SectionIcon path={item.path} small />
                  {translatedLabel(item.label, t.nav)}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BottomNav({ isAuthenticated = true }: BottomNavProps) {
  const { t } = useUiLang()
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)

  const moreRef = useRef<HTMLDivElement>(null)
  useEffect(() => { setMoreOpen(false) }, [pathname])
  useEffect(() => {
    if (!moreOpen) return
    function dismiss(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false)
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMoreOpen(false)
        moreRef.current?.querySelector<HTMLButtonElement>('[aria-controls="mobile-more-links"]')?.focus()
      }
    }
    document.addEventListener('mousedown', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('mousedown', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [moreOpen])

  const iconFor = (path: string) => path === '/' ? icons.home : path === '/profile/' ? icons.profile : path === '/settings/' ? icons.settings : path === '/review/' ? icons.review : icons.courses
  const primaryItems = navigation.primary.filter(item => !item.children)
  const navItems = [...navigation.primary, ...(isAuthenticated ? navigation.authenticatedOnly : [])]

  const mobileItems = ['/', '/profile/', '/services/', '/appointment/']
    .map(path => primaryItems.find(item => item.path === path))
    .filter((item): item is NavigationItem => Boolean(item))
  const moreItems = ['/about/', '/resources/', '/review/']
    .map(path => navigation.primary.find(item => item.path === path))
    .filter((item): item is NavigationItem => Boolean(item))
  const contact = navigation.primary.find(item => item.path === '/contact/')

  return (
    <>
      {/* ── Mobile bottom bar (hidden on lg+) ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)] backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-t border-gray-200/60 dark:border-gray-700/60">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {mobileItems.map(item => {
            const active = isNavigationItemActive(pathname, item.path)
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-0.5 py-2 px-4 min-w-14 transition-colors ${
                  active
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <span className={`transition-transform ${active ? 'scale-110' : ''}`}>
                  {iconFor(item.path)}
                </span>
                <span className={`text-[10px] font-medium ${active ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                  {translatedLabel(item.label, t.nav)}
                </span>
              </Link>
            )
          })}
          <div className="relative" ref={moreRef}>
            {moreOpen && (
              <div id="mobile-more-links" className="absolute bottom-full right-0 mb-2 max-h-[70dvh] overflow-y-auto w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                {moreItems.map(item => (
                  item.children ? <NavigationAccordion key={item.path} item={item} pathname={pathname} mobile onNavigate={() => setMoreOpen(false)} /> : (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMoreOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isNavigationItemActive(pathname, item.path)
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                    }`}
                  >
                    {iconFor(item.path)}
                    {translatedLabel(item.label, t.nav)}
                  </Link>
                  )
                ))}
                {contact && <Link href={contact.path} onClick={() => setMoreOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${isNavigationItemActive(pathname, contact.path) ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'}`}>{iconFor(contact.path)}{translatedLabel(contact.label, t.nav)}</Link>}
                {isAuthenticated && navigation.authenticatedOnly.map(item => <Link key={item.path} href={item.path} onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400">{iconFor(item.path)}{translatedLabel(item.label, t.nav)}</Link>)}
              </div>
            )}
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-controls="mobile-more-links"
              aria-label={t.nav.more}
              onClick={() => setMoreOpen(open => !open)}
              className={`flex flex-col items-center gap-0.5 py-2 px-4 min-w-14 transition-colors ${
                moreItems.some(item => item.children?.some(child => isNavigationItemActive(pathname, child.path)) || isNavigationItemActive(pathname, item.path)) || Boolean(contact && isNavigationItemActive(pathname, contact.path))
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {icons.more}
              <span className="text-[10px] font-medium">{t.nav.more}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Desktop sidebar (hidden below lg) ── */}
      <nav className="hidden lg:flex flex-col sticky top-0 h-dvh w-56 shrink-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">L</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">RxProfile</span>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-1 px-3 py-4">
          {navItems.map(item => item.children ? <NavigationAccordion key={item.path} item={item} pathname={pathname} /> : (() => {
            const active = isNavigationItemActive(pathname, item.path)
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium text-sm ${
                  active
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className={active ? 'text-indigo-600 dark:text-indigo-400' : ''}>
                  {iconFor(item.path)}
                </span>
                {translatedLabel(item.label, t.nav)}
              </Link>
            )
          })())}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-600">v{appVersion}</p>
        </div>
      </nav>
    </>
  )
}
