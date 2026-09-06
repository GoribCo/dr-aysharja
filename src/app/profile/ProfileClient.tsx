'use client'

import type { ProfileClientProps, ProfileContent } from '@/lib/types'

import { BASE_PATH } from '@/lib/site/deployment'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import {useEffect, useRef, useState} from 'react'
import { useContentLanguage } from '@/components/ContentLanguageProvider'
import { useDoctorContent } from '@/hooks/useDoctorContent'

import { useUiLang } from '@/components/UiLanguageProvider'

function ArrowIcon() {
    return <span aria-hidden="true">&#8594;</span>
}

function PhoneIcon() {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className="profile-icon" fill="none" stroke="currentColor"
                strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L6.96 9.74a16 16 0 0 0 7.3 7.3l1.29-1.29a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z"/>
    </svg>
}

export default function ProfileClient({initialProfile}: ProfileClientProps) {
    const [visible, setVisible] = useState(false)
    const pageRef = useRef<HTMLDivElement>(null)
    const {lang} = useContentLanguage()
    const { t } = useUiLang()
    const {content, isLoading, error} = useDoctorContent(lang)
    const profile = (content?.profile ?? initialProfile) as ProfileContent | null
    const site = content?.site
    const phone = site?.appointment?.phone ?? ''

    useEffect(() => {
        const sections = pageRef.current?.querySelectorAll<HTMLElement>('[data-profile-reveal]')
        if (!sections) return
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target as HTMLElement
                    section.dataset.visible = 'true'
                    observer.unobserve(entry.target)
                }
            })
        }, {threshold: 0.12})
        sections.forEach(section => observer.observe(section))
        setVisible(true)
        return () => observer.disconnect()
    }, [])

    if (isLoading && !profile) return <div className="profile-page"><p className="profile-loading">Loading profile...</p></div>
    if (error || !profile) return <div className="profile-page"><p className="profile-loading">This profile could not be
        loaded.</p></div>

    return (
        <div ref={pageRef} className="profile-page" data-visible={visible}>
            <div>
                <section className="profile-hero" aria-labelledby="profile-title">
                    <div className="profile-hero-copy profile-reveal"><p className="profile-eyebrow">{t.doctor.profileEyebrow}</p><h1 id="profile-title">{profile.doctorName}</h1><p
                        className="profile-designation">{profile.designation}</p></div>
                    <figure className="profile-portrait profile-reveal profile-reveal-delay">
                        <div className="profile-portrait-frame">
                            {site?.profileImage && <img src={`${BASE_PATH}${site.profileImage}`} alt={`Portrait of ${profile.doctorName}`}/>}
                        </div>
                    </figure>
                </section>

                <section className="profile-section profile-bio profile-reveal" data-profile-reveal
                         aria-labelledby="bio-title">
                    <div><p className="profile-section-label">{t.doctor.profileBioLabel}</p><h2 id="bio-title">{t.doctor.profileBioHeading}</h2></div>
                    <div className="profile-copy prose"><ReactMarkdown>{profile.bio}</ReactMarkdown></div>
                </section>
                <section className="profile-section profile-specialty profile-reveal" data-profile-reveal
                         aria-labelledby="specialty-title">
                    <div><p className="profile-section-label">{t.doctor.profileFocusLabel}</p><h2 id="specialty-title">{t.doctor.profileFocusHeading}</h2></div>
                    <div className="profile-copy prose"><ReactMarkdown>{profile.specializationSummary}</ReactMarkdown><Link href="/services"
                                                                                              className="profile-text-link">{t.doctor.viewServices} <ArrowIcon/></Link></div>
                </section>
                <section className="profile-section profile-details profile-reveal" data-profile-reveal
                         aria-labelledby="details-title">
                    <div><p className="profile-section-label">{t.doctor.profileDetailsLabel}</p><h2 id="details-title">{t.doctor.profileDetailsHeading}</h2></div>
                    <div className="profile-detail-list">
                        <div><span
                            className="profile-detail-label">{t.doctor.currentPosition}</span><strong>{[profile.role, profile.affiliation].filter(Boolean).join(', ')}</strong>
                        </div>
                        <div><span className="profile-detail-label">{t.doctor.languagesSpoken}</span>
                            <div className="profile-tags">{profile.languages.map(language => <span
                                key={language}>{language}</span>)}</div>
                        </div>
                    </div>
                </section>
                <section className="profile-cta profile-reveal" data-profile-reveal aria-labelledby="cta-title">
                    <div><p className="profile-section-label">{t.doctor.nextStep}</p><h2 id="cta-title">{t.doctor.bookAppointment}</h2></div>
                    <div className="profile-cta-actions"><a href={`tel:${phone}`}
                                                               className="profile-button profile-button-light">{t.doctor.bookAppointment} <ArrowIcon/></a><a href={`tel:${phone}`}
                                                          className="profile-phone"><PhoneIcon/> {phone}</a></div>
                </section>
            </div>
        </div>
    )
}
