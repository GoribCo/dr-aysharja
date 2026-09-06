'use client'

import { useEffect, useState } from 'react'

import type { Heading } from '@/lib/types'

interface TableOfContentsProps {
  content: string // raw markdown
}

function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split('\n')
  const headings: Heading[] = []
  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)$/)
    if (m) {
      const text = m[2].replace(/\*\*/g, '').trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9-￿\s]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      headings.push({ id, text, level: m[1].length })
    }
  }
  return headings
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [active, setActive] = useState<string>('')
  const headings = extractHeadings(content)

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0% -70% 0%' }
    )
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings.length]) // eslint-disable-line react-hooks/exhaustive-deps

  if (headings.length < 2) return null

  return (
    <nav className="hidden xl:block sticky top-6 w-48 shrink-0">
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map(h => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block text-sm py-0.5 border-l-2 transition-colors ${
                h.level === 3 ? 'pl-4' : 'pl-3'
              } ${
                active === h.id
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-300'
              }`}
              onClick={e => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
                setActive(h.id)
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
