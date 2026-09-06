'use client'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import AboutPageLayout from '@/components/AboutPageLayout'
import { useContentLanguage } from '@/components/ContentLanguageProvider'
import { useUiLang } from '@/components/UiLanguageProvider'
import type { DoctorSection, ProfileContent } from '@/lib/types'

export default function ProfileClient({ initialProfile }: { initialProfile: DoctorSection | null }) {
  const { content } = useContentLanguage()
  const { t } = useUiLang()
  const profile = (content ? content.profile : initialProfile) as (DoctorSection & ProfileContent) | null

  return <AboutPageLayout page="profile" title={profile?.title || t.nav.profile} intro={profile?.description || ''}>
    {profile?.isVisible ? <div className="about-content about-profile-content">
      <section aria-labelledby="profile-bio">
        <p className="about-section-label">{t.doctor.profileBioLabel}</p>
        <h3 id="profile-bio">{t.doctor.profileBioHeading}</h3>
        <ReactMarkdown>{profile.bio}</ReactMarkdown>
      </section>
      <section aria-labelledby="profile-focus">
        <p className="about-section-label">{t.doctor.profileFocusLabel}</p>
        <h3 id="profile-focus">{t.doctor.profileFocusHeading}</h3>
        <ReactMarkdown>{profile.specializationSummary}</ReactMarkdown>
        <div className="about-tags">{profile.specializationTags?.map(tag => <span key={tag}>{tag}</span>)}</div>
        <Link href="/services/">{t.doctor.viewServices} <span aria-hidden="true">→</span></Link>
      </section>
      <section aria-labelledby="profile-details">
        <p className="about-section-label">{t.doctor.profileDetailsLabel}</p>
        <h3 id="profile-details">{t.doctor.profileDetailsHeading}</h3>
        <dl className="about-details">
          <div><dt>{t.doctor.currentPosition}</dt><dd>{[profile.role, profile.affiliation].filter(Boolean).join(', ')}</dd></div>
          <div><dt>{t.doctor.languagesSpoken}</dt><dd>{profile.languages?.join(' · ')}</dd></div>
        </dl>
      </section>
    </div> : <p className="about-empty">{t.common.unavailable}</p>}
  </AboutPageLayout>
}
