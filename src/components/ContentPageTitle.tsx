'use client'

import type { ContentPageTitleProps } from '@/lib/types'

export default function ContentPageTitle({
                                             eyebrow,
                                             heading,
                                             intro,
                                         }: ContentPageTitleProps) {
    return <div className="mb-10 flex items-start justify-between gap-6">
        <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">{eyebrow}</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{heading}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">{intro}</p>
        </div>
    </div>
}
