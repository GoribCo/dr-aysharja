'use client'

import type { AppointmentContent } from '@/lib/types'

import ReactMarkdown from 'react-markdown'
import ContentPageTitle from '@/components/ContentPageTitle'
import { useContentLanguage } from '@/components/ContentLanguageProvider'
import { useDoctorContent } from '@/hooks/useDoctorContent'
import { getAppointmentAction } from '@/lib/doctor/appointments'

import { useUiLang } from '@/components/UiLanguageProvider'

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L6.96 9.74a16 16 0 0 0 7.3 7.3l1.29-1.29a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

export default function AppointmentClient() {
  const { lang } = useContentLanguage()
  const { t } = useUiLang()
  const { content, isLoading, error } = useDoctorContent(lang)
  const appointment = content?.appointment as AppointmentContent | null
  const action = getAppointmentAction(content?.site.appointment ?? {})
  const chamber = appointment?.chambers?.[0]

  if (isLoading) {
    return <div className="px-5 pb-28 pt-10 text-center text-sm text-slate-500 dark:text-slate-400">{t.common.loading}</div>
  }

  if (error || !appointment || !appointment.isVisible) {
    return <div className="px-5 pb-28 pt-10 text-center text-sm text-slate-500 dark:text-slate-400">Appointment information is not available.</div>
  }

  return (
    <div className="px-5 pb-28 pt-6 sm:px-8 lg:pb-10 lg:pt-10">
      <div className="mx-auto max-w-4xl">
        <ContentPageTitle eyebrow={t.doctor.bookAppointment} heading={appointment.title ?? t.doctor.bookAppointment} intro={appointment.description} />

        {action.phone && (
          <section className="rounded-2xl bg-teal-800 p-6 text-white shadow-sm dark:bg-teal-950 sm:p-8" aria-labelledby="call-heading">
            <p className="text-sm font-medium text-teal-100">{t.doctor.phoneBooking}</p>
            <h2 id="call-heading" className="mt-2 text-2xl font-semibold leading-tight">{t.doctor.phoneBookingHeading}</h2>
            <p className="mt-4 text-sm leading-6 text-teal-100/80">{t.doctor.phoneBookingText}</p>
            <a href={action.primaryHref ?? `tel:${action.phone}`} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-4 text-base font-semibold text-teal-800 transition hover:bg-teal-50 sm:w-auto">
              <PhoneIcon /> Call {action.phone}
            </a>
          </section>
        )}

        {chamber && (
          <section className="mt-6 grid gap-5 md:grid-cols-[1fr_1.1fr]" aria-labelledby="chamber-heading">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">{t.doctor.visitDetails}</p>
              <h2 id="chamber-heading" className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{chamber.name}</h2>
              <dl className="mt-6 space-y-4 text-sm">
                <div><dt className="font-semibold text-slate-900 dark:text-white">{t.doctor.address}</dt><dd className="mt-1 leading-6 text-slate-600 dark:text-slate-300">{chamber.address}</dd></div>
                <div><dt className="font-semibold text-slate-900 dark:text-white">{t.doctor.consultationDays}</dt><dd className="mt-1 text-slate-600 dark:text-slate-300">{chamber.visitingDays}</dd></div>
                <div><dt className="font-semibold text-slate-900 dark:text-white">{t.doctor.hours}</dt><dd className="mt-1 text-slate-600 dark:text-slate-300">{chamber.visitingHours}</dd></div>
              </dl>
            </div>
            <div className="min-h-64 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900">
              {chamber.googleMapsUrl ? (
                <iframe title={`Map of ${chamber.name}`} src={chamber.googleMapsUrl} className="h-full min-h-64 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              ) : (
                <div className="flex h-full min-h-64 items-center justify-center p-6 text-center text-sm text-slate-500 dark:text-slate-400">Map location will be added when the chamber address is confirmed.</div>
              )}
            </div>
          </section>
        )}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8" aria-labelledby="prepare-heading">
          <h2 id="prepare-heading" className="text-xl font-semibold text-slate-900 dark:text-white">{t.doctor.beforeVisit}</h2>
          <div className="prose mt-4 max-w-none dark:prose-invert"><ReactMarkdown>{appointment.content}</ReactMarkdown></div>
        </section>

        {action.phone && (
          <section className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/60 sm:flex-row sm:items-center sm:p-7">
            <div><p className="text-sm font-semibold text-slate-900 dark:text-white">{t.doctor.readyToSchedule}</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.doctor.readyToScheduleText}</p></div>
            <a href={action.primaryHref ?? `tel:${action.phone}`} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:w-auto"><PhoneIcon /> {t.doctor.bookByPhone}</a>
          </section>
        )}
      </div>
    </div>
  )
}
