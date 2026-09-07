import type { ReactNode } from 'react'

const symbols: Record<string, ReactNode> = {
  about: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  profile: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="9" r="3" /><path d="M7 18a5 5 0 0 1 10 0" /></>,
  qualifications: <><path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6M22 9v7" /></>,
  experience: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12c6 4 12 4 18 0M12 12v4" /></>,
  awards: <><circle cx="12" cy="8" r="5" /><path d="m8 12-2 9 6-3 6 3-2-9" /></>,
  memberships: <><circle cx="9" cy="8" r="3" /><path d="M3 21v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v2" /></>,
  publications: <><path d="M12 5C8 2 4 3 2 4v16c3-1 6-1 10 1 4-2 7-2 10-1V4c-2-1-6-2-10 1Zm0 0v16" /></>,
  resources: <><path d="M4 4h4v16H4zM10 4h4v16h-4zM16 5l4-1 3 15-4 1z" /></>,
  privacy: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
  terms: <><path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8M8 16h8" /></>,
  faq: <><path d="M21 11a9 9 0 0 1-9 9H3l1-5a9 9 0 1 1 17-4Z" /><path d="M9 8a3 3 0 0 1 6 0c0 2-3 2-3 4M12 16h.01" /></>,
  settings: <><path d="M4 7h16M4 17h16" /><circle cx="9" cy="7" r="3" /><circle cx="15" cy="17" r="3" /></>,
  help: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="m6 6 3 3m6 6 3 3M6 18l3-3m6-6 3-3" /></>,
}

export default function SectionIcon({ path, small = false }: { path: string; small?: boolean }) {
  const symbol = symbols[path.replace(/^\/|\/$/g, '')]
  if (!symbol) return null
  return <svg aria-hidden="true" focusable="false" className="shrink-0" width={small ? 17 : 22} height={small ? 17 : 22}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {symbol}
  </svg>
}
