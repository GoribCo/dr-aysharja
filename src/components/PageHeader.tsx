import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

interface PageHeaderProps {
  backHref: string
  backLabel: string
  /** Extra items for the right side */
  right?: React.ReactNode
}

export default function PageHeader({ backHref, backLabel, right }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left: logo (mobile only) + back link */}
      <div className="flex items-center gap-3">
        {/* RxProfile logo — only visible when sidebar is hidden (mobile/tablet) */}
        <Link href="/" className="flex items-center gap-2 lg:hidden">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">L</span>
          </div>
          <span className="text-base font-bold text-gray-900 dark:text-white">RxProfile</span>
        </Link>

        {/* Divider between logo and back link — mobile only */}
        <span className="text-gray-300 dark:text-gray-600 lg:hidden">·</span>

        {/* Back link */}
        <Link
          href={backHref}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">{backLabel}</span>
        </Link>
      </div>

      {/* Right: extra content + theme toggle */}
      <div className="flex items-center gap-1">
        {right}
        <ThemeToggle />
      </div>
    </div>
  )
}
