'use client'

import { getAppointmentAction } from '@/lib/doctor/appointments'
import { useContentLanguage } from '@/components/ContentLanguageProvider'

export default function StickyAppointmentCTA() {
  const { content } = useContentLanguage()
  const appointmentAction = getAppointmentAction(content?.site.appointment ?? {})

  if (appointmentAction.type === 'none') return null

  return (
    <div className="fixed inset-x-0 bottom-[72px] z-40 px-4 pb-2 lg:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
        {appointmentAction.primaryHref && (
          <a
            href={appointmentAction.primaryHref}
            target={appointmentAction.type === 'external' ? '_blank' : undefined}
            rel={appointmentAction.type === 'external' ? 'noopener noreferrer' : undefined}
            className="flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold text-white shadow-sm"
            style={{ backgroundColor: '#2563eb' }}
          >
            {appointmentAction.primaryLabel}
          </a>
        )}
        {appointmentAction.secondaryHref && (
          <a
            href={appointmentAction.secondaryHref}
            className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {appointmentAction.secondaryLabel}
          </a>
        )}
      </div>
    </div>
  )
}
