import type { NavigationItem } from '../types'

export const navigation: { primary: NavigationItem[]; authenticatedOnly: NavigationItem[] } = {
  primary: [
    { label: 'Home', path: '/' },
    {
      label: 'About',
      path: '/about/',
      children: [
        { label: 'Profile', path: '/profile/' },
        { label: 'Qualifications', path: '/qualifications/' },
        { label: 'Experience', path: '/experience/' },
        { label: 'Awards', path: '/awards/' },
        { label: 'Memberships', path: '/memberships/' },
        { label: 'Publications', path: '/publications/' },
      ],
    },
    { label: 'Services', path: '/services/' },
    { label: 'Reviews', path: '/review/' },
    { label: 'Appointment', path: '/appointment/' },
    { label: 'Contact', path: '/contact/' },
    {
      label: 'Resources', path: '/resources/',
      children: [
        { label: 'Privacy', path: '/privacy/' },
        { label: 'Terms', path: '/terms/' },
        { label: 'FAQ', path: '/faq/' },
        { label: 'Settings', path: '/settings/' },
        { label: 'Help', path: '/help/' },
      ],
    },
  ],
  authenticatedOnly: [],
}

export function isNavigationItemActive(pathname: string, path: string) {
  if (path === '/') return pathname === '/'
  return pathname === path.replace(/\/$/, '') || pathname.startsWith(path)
}
/** Published sections only; an omitted/hidden section needs no navigation entry. */
export function visibleNavigation(content: import('../types').DoctorContent | null): NavigationItem[] {
  if (!content) return navigation.primary
  const visible = (item: NavigationItem) => {
    const key = item.path.replace(/^\/|\/$/g, '')
    if (key === 'settings' || key === '') return true
    if (key in content.resources) return Boolean(content.resources[key as keyof typeof content.resources])
    const section = content[key as import('../types').DoctorSectionKey]
    return Boolean(section?.isVisible)
  }
  return navigation.primary.map(item => item.children ? { ...item, children: item.children.filter(visible) } : item)
    .filter(item => item.children ? item.children.length > 0 : visible(item))
}
