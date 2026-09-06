'use client'

import type { ContactContent } from '@/lib/types'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import ContentPageTitle from '@/components/ContentPageTitle'
import { useContentLanguage } from '@/components/ContentLanguageProvider'
import { useDoctorContent } from '@/hooks/useDoctorContent'
import { getAppointmentAction, normalizePhone } from '@/lib/doctor/appointments'

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L6.96 9.74a16 16 0 0 0 7.3 7.3l1.29-1.29a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

function configuredValue(value?: string | null) {
  return value && value !== 'TODO' ? value : null
}

export default function ContactClient() {
  const { lang } = useContentLanguage()
  const { content, isLoading, error } = useDoctorContent(lang)
  const contact = content?.contact as ContactContent | null
  const chamber = contact?.chambers?.[0]
  const site = content?.site
  const phone = normalizePhone(site?.appointment?.phone) ?? normalizePhone(site?.contact?.phone)
  const email = configuredValue(site?.contact?.email)
  const whatsapp = normalizePhone(site?.contact?.whatsapp)
  const latitude = site?.contact?.latitude ?? null
  const longitude = site?.contact?.longitude ?? null
  const mapConfigured = latitude !== null && longitude !== null
  const appointment = getAppointmentAction({ phone })

  if (isLoading) {
    return <div className="px-5 pb-28 pt-10 text-center text-sm text-slate-500 dark:text-slate-400">Loading...</div>
  }

  if (error || !contact || !contact.isVisible) {
    return <div className="px-5 pb-28 pt-10 text-center text-sm text-slate-500 dark:text-slate-400">Contact information is not available.</div>
  }

  return (
    <div className="px-5 pb-28 pt-6 sm:px-8 lg:pb-10 lg:pt-10">
      <div className="mx-auto max-w-4xl">
        <ContentPageTitle eyebrow="contact" heading="Contact" intro={contact.description} />
        <section className="grid gap-5 md:grid-cols-[1fr_1.1fr]" aria-labelledby="contact-details-heading">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">Contact details</p>
            <h2 id="contact-details-heading" className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{chamber?.name ?? 'Clinic contact'}</h2>
            {chamber && <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">{chamber.address}</p>}
            <div className="prose mt-5 max-w-none text-sm dark:prose-invert"><ReactMarkdown>{contact.content}</ReactMarkdown></div>
            <div className="mt-7 flex flex-wrap gap-3">
              {phone && <a href={appointment.primaryHref ?? `tel:${phone}`} className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"><PhoneIcon /> Call {phone}</a>}
              {whatsapp && <a href={`https://wa.me/${whatsapp}`} className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-teal-400">WhatsApp</a>}
              {email && <a href={`mailto:${email}`} className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-600 dark:text-slate-200 dark:hover:border-teal-400">Email</a>}
            </div>
          </div>
          <div className="min-h-64 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900">
            {mapConfigured ? <iframe title={`Map of ${chamber?.name ?? 'the clinic'}`} src={`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`} className="h-full min-h-64 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <div className="flex h-full min-h-64 items-center justify-center p-6 text-center text-sm text-slate-500 dark:text-slate-400">Map location will be added when coordinates are configured.</div>}
          </div>
        </section>
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8" aria-labelledby="appointment-link-heading">
          <h2 id="appointment-link-heading" className="text-xl font-semibold text-slate-900 dark:text-white">Plan your visit</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">See consultation days, hours, and booking information on the Appointment page.</p>
          <Link href="/appointment" className="mt-5 inline-flex rounded-lg border border-teal-700 px-4 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 dark:border-teal-500 dark:text-teal-300 dark:hover:bg-teal-950/40">View appointment details</Link>
        </section>
      </div>
    </div>
  )
}
