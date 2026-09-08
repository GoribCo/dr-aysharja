import type { ReactNode } from 'react'

export function PhoneIcon({ size = 'md' }: { size?: 'sm' | 'md' } = {}) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L6.96 9.74a16 16 0 0 0 7.3 7.3l1.29-1.29a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z" /></svg>
}

export function ArrowIcon() { return <span aria-hidden="true">&#8594;</span> }

export function ServiceIcon({ name }: { name?: string }) {
  const paths: Record<string, ReactNode> = {
    Bone: <path strokeLinecap="round" strokeLinejoin="round" d="M8 16 16 8a3 3 0 1 0 4-4 3 3 0 1 0-4 4L8 16a3 3 0 1 0-4 4 3 3 0 0 0 4-4Z" />,
    Heart: <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />,
    Stethoscope: <><path strokeLinecap="round" strokeLinejoin="round" d="M6 3v5a6 6 0 0 0 12 0V3M4 3h4M16 3h4M18 14a4 4 0 1 0 4 4v-1" /><circle cx="21" cy="17" r="1" /></>,
  }
  return paths[name || ''] ? <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">{paths[name || '']}</svg> : <span aria-hidden="true" className="text-lg">+</span>
}
