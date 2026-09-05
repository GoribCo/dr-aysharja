'use client'

import Link from 'next/link'
import { useUiLang } from '@/components/UiLanguageProvider'
import { usePathname } from 'next/navigation'
import { navigation, isNavigationItemActive } from '@/lib/navigation'
import AboutDropdown from './AboutDropdown'

export default function DesktopNav({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const pathname = usePathname()
  const { t } = useUiLang()
  const items = isAuthenticated ? [...navigation.primary, ...navigation.authenticatedOnly] : navigation.primary

  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      {items.map(item => item.children ? (
        <AboutDropdown key={item.path} pathname={pathname} item={item} />
      ) : (
        <Link key={item.path} href={item.path} className={`desktop-nav-link ${isNavigationItemActive(pathname, item.path) ? 'active' : ''}`}>
          {t.nav[item.label.toLowerCase() as keyof typeof t.nav] || item.label}
        </Link>
      ))}
    </nav>
  )
}