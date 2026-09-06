'use client'

import type { StarsProps, ReviewContent, PatientReview } from '@/lib/types'

import { useState } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import { useContentLanguage } from '@/components/ContentLanguageProvider'
import { useDoctorContent } from '@/hooks/useDoctorContent'
import ContentPageTitle from "@/components/ContentPageTitle";

function text(content: ReviewContent | null, key: string, fallback: string) {
  return typeof content?.[key] === 'string' ? content[key] as string : fallback
}

function reviews(content: ReviewContent): PatientReview[] {
  return Array.isArray(content.reviews)
    ? content.reviews.filter((item): item is PatientReview => {
        if (!item || typeof item !== 'object') return false
        const review = item as Record<string, unknown>
        return review.status === 'approved' && typeof review.name === 'string' &&
          typeof review.rating === 'number' && typeof review.date === 'string' &&
          typeof review.review === 'string'
      })
    : []
}

function Stars({ rating, label }: StarsProps) {
  return (
    <span className="flex items-center gap-0.5 text-amber-400" aria-label={label ?? `${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(star => <span key={star} aria-hidden="true">{star <= rating ? '★' : '☆'}</span>)}
    </span>
  )
}

export default function ReviewClient() {
  const { lang } = useContentLanguage()
  const { content, isLoading, error } = useDoctorContent(lang)
  const review = content?.review as ReviewContent | null
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  if (isLoading) {
    return <div className="px-5 pb-28 pt-10 text-center text-sm text-slate-500 dark:text-slate-400">Loading...</div>
  }

  if (error || !review || !review.isVisible) {
    return <div className="px-5 pb-28 pt-10 text-center text-sm text-slate-500 dark:text-slate-400">Review content is not available.</div>
  }

  const approvedReviews = reviews(review)
  const averageRating = approvedReviews.length
    ? (approvedReviews.reduce((total, item) => total + item.rating, 0) / approvedReviews.length).toFixed(1)
    : '-'
  const reviewCount = approvedReviews.length
  const reviewEmail = content?.site.contact?.email
  const mailConfigured = Boolean(reviewEmail)

  function submitReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const message = [
      `Name: ${form.get('name') || 'Anonymous'}`,
      `Rating: ${rating}/5`,
      `Service: ${form.get('service') || 'Not specified'}`,
      `Contact: ${form.get('contact') || 'Not provided'}`,
      '',
      String(form.get('message') || ''),
    ].join('\n')

    if (mailConfigured) {
      window.location.href = `mailto:${reviewEmail}?subject=Patient review submission&body=${encodeURIComponent(message)}`
    } else {
      setSubmitted(true)
    }
  }

  return (
    <div className="px-5 pb-28 pt-6 sm:px-8 lg:pb-10 lg:pt-10">
      <div className="mx-auto max-w-4xl">
          <ContentPageTitle
            eyebrow={text(review, 'eyebrow', 'Patient voice')}
            heading={text(review, 'heading', 'Reviews and experiences')}
            intro={text(review, 'intro', '')}/>

        <section className="grid gap-5 md:grid-cols-[1fr_1.35fr]">
          <div className="rounded-2xl bg-teal-800 p-6 text-white shadow-sm dark:bg-teal-950 sm:p-8">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-xl" aria-hidden="true">★</div>
            <p className="text-sm font-medium text-teal-100">{text(review, 'feedbackLabel', 'Your feedback matters')}</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight">{text(review, 'feedbackHeading', '')}</h2>
            <p className="mt-4 text-sm leading-6 text-teal-100/80">{text(review, 'feedbackText', '')}</p>
            <Link href="/contact" className="mt-7 inline-flex items-center rounded-lg bg-white px-4 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-50">{text(review, 'feedbackCta', 'Share your experience')} <span className="ml-2" aria-hidden="true">→</span></Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-700">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{text(review, 'reviewsLabel', 'Patient reviews')}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{text(review, 'reviewsHeading', 'A growing collection')}</h2>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-slate-900 dark:text-white">{averageRating}<span className="text-sm text-slate-400">/5</span></p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{reviewCount} {text(review, 'reviewCountLabel', 'approved reviews')}</p>
              </div>
            </div>
            {approvedReviews.length > 0 ? (
              <div className="mt-6 space-y-4">
                {approvedReviews.map(item => (
                  <article key={`${item.name}-${item.date}`} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-700">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3"><strong className="text-sm text-slate-900 dark:text-white">{item.name}</strong><Stars rating={item.rating} /></div>
                      <time className="text-xs text-slate-400 dark:text-slate-500">{item.date}</time>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.review}</p>
                    {item.service && <span className="mt-3 inline-flex rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">{item.service}</span>}
                  </article>
                ))}
              </div>
            ) : <div className="py-10 text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl text-teal-700 dark:bg-teal-950/60 dark:text-teal-300" aria-hidden="true">“</div><h3 className="text-lg font-semibold text-slate-900 dark:text-white">{text(review, 'emptyHeading', '')}</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">{text(review, 'emptyText', '')}</p></div>}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">{text(review, 'formEyebrow', 'Share your experience')}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{text(review, 'formHeading', 'Leave a review')}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{text(review, 'moderationNote', 'Submissions are reviewed before they are published.')}</p>
          </div>
          {submitted ? <div className="rounded-xl bg-teal-50 p-5 text-sm leading-6 text-teal-800 dark:bg-teal-950/50 dark:text-teal-200">{text(review, 'fallbackSubmissionNote', 'Please contact the clinic to submit your review. It will be reviewed before publication.')}</div> : <form onSubmit={submitReview} className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{text(review, 'nameLabel', 'Name or initials')}<input name="name" placeholder={text(review, 'namePlaceholder', 'e.g. Farhana S.')} className="mt-2 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-3 font-normal outline-none focus:border-teal-600 dark:border-slate-600" /></label>
            <fieldset><legend className="text-sm font-medium text-slate-700 dark:text-slate-300">{text(review, 'ratingLabel', 'Rating')}</legend><div className="mt-2 flex gap-1">{[1, 2, 3, 4, 5].map(value => <button key={value} type="button" aria-label={`${value} stars`} onClick={() => setRating(value)} className={`text-2xl ${value <= rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}>★</button>)}</div></fieldset>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{text(review, 'serviceLabel', 'Reason for visit')}<select name="service" className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 font-normal dark:border-slate-600 dark:bg-slate-800"><option value="">{text(review, 'serviceOptional', 'Optional')}</option>{content?.servicesList.map(service => <option key={service.id} value={service.title}>{service.title}</option>)}</select></label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{text(review, 'contactLabel', 'Phone or email (optional)')}<input name="contact" className="mt-2 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-3 font-normal outline-none focus:border-teal-600 dark:border-slate-600" /></label>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 sm:col-span-2">{text(review, 'messageLabel', 'Your review')}<textarea name="message" required rows={5} className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-transparent px-3 py-3 font-normal outline-none focus:border-teal-600 dark:border-slate-600" /></label>
            <div className="sm:col-span-2"><button type="submit" disabled={rating === 0} className="rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-teal-600">{text(review, 'submitLabel', 'Submit for review')}</button><p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{text(review, 'privacyNote', 'Your contact details are used only for verification and are not shown publicly.')}</p></div>
          </form>}
        </section>

        <section className="mt-6 flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/60 sm:flex-row sm:items-center sm:p-7">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{text(review, 'questionsHeading', '')}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{text(review, 'questionsText', '')}</p>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto">
            <Link href="/appointment" className="rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500">{text(review, 'appointmentCta', 'Book an appointment')}</Link>
            <Link href="/contact" className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-400 dark:hover:text-teal-300">{text(review, 'contactCta', 'Contact clinic')}</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
