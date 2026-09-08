'use client'

import { useContentLanguage } from '@/components/ContentLanguageProvider'
import ContentPageTitle from '@/components/ContentPageTitle'
import { useDoctorContent } from '@/hooks/useDoctorContent'
import { getAppointmentAction } from '@/lib/doctor/appointments'

import { useUiLang } from '@/components/UiLanguageProvider'
import ReactMarkdown from 'react-markdown'

import type { DoctorService } from '@/lib/types'
import { ServiceIcon } from '@/components/Icons'

export default function ServicesClient() {
  const { lang } = useContentLanguage()
  const { t } = useUiLang()
  const { content: data, isLoading, error } = useDoctorContent(lang)
  const section = data?.services
  const services = (data?.servicesList ?? []) as DoctorService[]
  const appointment = getAppointmentAction(data?.site.appointment ?? {})

  if (isLoading) {
    return (
      <div className="px-5 pb-28 pt-6 sm:px-8 lg:pb-10 lg:pt-10">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="mb-4 h-8 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-8 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-700" />
            <div className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !section?.isVisible) {
    return (
      <div className="px-5 pb-28 pt-10 text-center text-sm text-slate-500 dark:text-slate-400">
        <div>
          <p className="text-gray-600 dark:text-gray-400">{t.common.unavailable}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 pb-28 pt-6 sm:px-8 lg:pb-10 lg:pt-10">
      <div className="mx-auto max-w-4xl">
        <ContentPageTitle eyebrow={t.doctor.servicesEyebrow} heading={section.title} intro={section.description} />
        {section.content && (
          <div className="prose mb-6 max-w-none text-sm leading-7 text-slate-600 dark:prose-invert dark:text-slate-300">
            <ReactMarkdown>{section.content}</ReactMarkdown>
          </div>
        )}
        <section aria-labelledby="services-list-heading" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
          <h2 id="services-list-heading" className="sr-only">{t.doctor.availableServices}</h2>
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2" aria-label={t.doctor.availableServices}>
            {services.map(service => (
              <li key={service.id}>
                <article className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/60">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{service.shortDescription}</p>
                  {service.content.trim() && (
                    <details className="group mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
                      <summary className="cursor-pointer rounded text-sm font-semibold text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 dark:text-teal-300">
                        {lang === 'bn' ? 'পরামর্শে যা নিয়ে আলোচনা হবে' : lang === 'hi' ? 'परामर्श में क्या चर्चा होगी' : 'What we can discuss'}
                      </summary>
                      <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300 [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
                        <ReactMarkdown>{service.content}</ReactMarkdown>
                      </div>
                    </details>
                  )}
                </article>
              </li>
            ))}
          </ul>
        </section>
        {appointment.primaryHref && (
          <section className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/60 sm:flex-row sm:items-center sm:p-7">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.doctor.consultationCtaHeading}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.doctor.consultationCtaText}</p>
            </div>
            <a
              href={appointment.primaryHref}
              className="w-full rounded-lg bg-teal-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 sm:w-auto"
            >
              {t.doctor.bookAppointment}
            </a>
          </section>
        )}
      </div>
    </div>
  )
}
