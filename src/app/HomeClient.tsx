'use client'

import type { SectionLabelProps, HomeClientProps } from '@/lib/types'

import { BASE_PATH } from '@/lib/site/deployment'

import Link from 'next/link'
import {useEffect, useState} from 'react'
import { useContentLanguage } from '@/components/ContentLanguageProvider'
import { useDoctorContent } from '@/hooks/useDoctorContent'

function text(content: Record<string, unknown>, key: string, fallback = '') {
    return typeof content[key] === 'string' ? content[key] as string : fallback
}

function list(content: Record<string, unknown>, key: string) {
    return Array.isArray(content[key]) ? content[key].filter((item): item is string => typeof item === 'string') : []
}

function ArrowIcon() {
    return <span aria-hidden="true">&#8594;</span>
}

function PhoneIcon() {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor"
                strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L6.96 9.74a16 16 0 0 0 7.3 7.3l1.29-1.29a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z"/>
    </svg>
}

function SectionLabel({children}: SectionLabelProps) {
    return <p
        className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-300">{children}</p>
}

export default function HomeClient({doctorContent: initialContent}: HomeClientProps) {
    const [visible, setVisible] = useState(false)
    const {lang} = useContentLanguage()
    const {content: fetchedContent} = useDoctorContent(lang)
    const home = (fetchedContent?.home ?? initialContent.home ?? {}) as Record<string, unknown>
    const phone = text(home, 'phone', fetchedContent?.site.appointment?.phone || '')
    const phoneHref = phone ? `tel:${phone}` : '#'
    const doctorName = text(home, 'doctorName')
    const services = list(home, 'services')
    const credentials = list(home, 'credentialItems')
    const profileImage = fetchedContent?.site.profileImage

    useEffect(() => {
        const frame = requestAnimationFrame(() => setVisible(true))
        return () => cancelAnimationFrame(frame)
    }, [])

    return <div className="homepage" data-visible={visible}>
        <main>
            <section className="hero-section" aria-labelledby="hero-title">
                <div className="hero-copy reveal"><p className="eyebrow">{text(home, 'heroEyebrow')}</p><h1
                    id="hero-title">{text(home, 'heroTitle')}</h1>
                    <p className="hero-name">{doctorName}</p>
                    <p className="hero-role">{text(home, 'credentials')}
                        <span aria-hidden="true">&#183;</span> {text(home, 'specialization')}</p>
                    <p className="hero-description">{text(home, 'heroDescription')}</p>
                    <a href={phoneHref}
                       className="button button-primary"><PhoneIcon/> {text(home, 'callToBook')}
                    </a>
                    <p className="hero-note">{text(home, 'appointmentNote')} <span
                        aria-hidden="true">&#183;</span> {text(home, 'consultationHours')}</p>
                </div>
                <div className="hero-portrait reveal reveal-delay">
                    <div className="portrait-frame">
                      {profileImage && <img src={`${BASE_PATH}${profileImage}`} alt={doctorName}/>}
                    </div>
                    <div className="portrait-caption"><span className="status-dot"/> {text(home, 'availability')}
                        <small>{text(home, 'availabilityNote')}</small>
                    </div>
                </div>
            </section>

            <section className="intro-section content-section reveal" aria-labelledby="intro-title">
                <div>
                    <SectionLabel>{text(home, 'introLabel')}</SectionLabel>
                    <h2 id="intro-title">{text(home, 'introTitle')}</h2>
                </div>
                <div className="intro-text">
                    <p>{text(home, 'introText')}</p>
                    <Link href="/profile"
                          className="text-link">{text(home, 'learnMore')}
                        <ArrowIcon/>
                    </Link>
                </div>
            </section>

            <section className="services-section content-section reveal" aria-labelledby="services-title">
                <div className="section-heading">
                    <div>
                        <SectionLabel>{text(home, 'servicesLabel')}</SectionLabel>
                        <h2 id="services-title">{text(home, 'servicesTitle')}</h2>
                    </div>
                    <Link href="/services" className="text-link desktop-link">{text(home, 'viewServices')} <ArrowIcon/></Link>
                </div>
                <div className="service-grid">{services.map((service, index) =>
                    <Link href="/services"
                          className="service-item"
                          key={service}>
                      <span
                          className="service-number">0{index + 1}</span>
                        <h3>{service}</h3>
                        <span className="service-arrow"
                              aria-hidden="true">&#8599;</span></Link>)}
                </div>
                <Link href="/services" className="text-link mobile-link">{text(home, 'viewServices')}
                    <ArrowIcon/>
                </Link>
            </section>

            <section className="visit-section content-section reveal" aria-labelledby="visit-title">
                <div className="visit-card">
                    <div>
                        <SectionLabel>{text(home, 'chamberLabel')}</SectionLabel>
                        <h2 id="visit-title">{text(home, 'chamberTitle')}</h2>
                    </div>
                    <div className="visit-details">
                        <div>
                          <span
                              className="detail-label">{text(home, 'chamberLabel')}</span>
                            <strong>{text(home, 'chamberName')}</strong>
                        </div>
                        <div>
                          <span
                              className="detail-label">{text(home, 'addressLabel', 'Address')}</span>
                            <strong>{text(home, 'chamberAddress')}</strong>
                        </div>
                        <div>
                          <span
                              className="detail-label">{text(home, 'availabilityLabel')}</span>
                            <strong>{text(home, 'consultationDays')}</strong>
                        </div>
                        <a href={phoneHref} className="button button-light"><PhoneIcon/> {text(home, 'callToBook')}</a>
                    </div>
                </div>
            </section>

            <section className="credentials-section content-section reveal" aria-labelledby="credentials-title">
                <SectionLabel>{text(home, 'credentialsLabel')}</SectionLabel>
                <h2 id="credentials-title"
                    className="sr-only">{text(home, 'credentialsLabel')}</h2>
                <div className="credential-list">{credentials.map(credential =>
                    <span key={credential}>{credential}</span>)}
                </div>
            </section>
            <section className="quote-section reveal"
                     aria-label={text(home, 'testimonialLabel', 'Patient testimonial')}>
                <blockquote>“{text(home, 'testimonial')}”</blockquote>
                <cite>{text(home, 'testimonialAuthor')}</cite>
            </section>
            <section className="final-cta reveal" aria-labelledby="cta-title">
                <div>
                    <SectionLabel>{text(home, 'ctaLabel')}</SectionLabel>
                    <h2 id="cta-title">{text(home, 'ctaTitle')}</h2>
                </div>
                <a href={phoneHref}
                   className="cta-phone">{phone}<span><PhoneIcon/> {text(home, 'callToBook')}</span>
                </a>
            </section>
        </main>
    </div>
}
