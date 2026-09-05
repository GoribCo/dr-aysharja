export interface NavigationItem {
  label: string
  path: string
  children?: NavigationItem[]
}

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