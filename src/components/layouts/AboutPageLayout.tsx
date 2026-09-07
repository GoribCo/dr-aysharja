'use client'

import MobileSectionTabs from '../MobileSectionTabs'
import ResourcePageLayout from './ResourcePageLayout'
import { useContentLanguage } from '../ContentLanguageProvider'
import { useUiLang } from '../UiLanguageProvider'
import { BASE_PATH } from '@/lib/site/deployment'
import type { DoctorSection, ProfileContent } from '@/lib/types'

const pages = ['profile', 'qualifications', 'experience', 'awards', 'memberships', 'publications'] as const
export type AboutPageKey = typeof pages[number]

export default function AboutPageLayout({ page, title, intro, children }: {
  page: AboutPageKey
  title: string
  intro: string
  children: React.ReactNode
}) {
  const { t } = useUiLang()
  const { content } = useContentLanguage()
  const profile = content?.profile as (DoctorSection & ProfileContent) | null | undefined

  return <ResourcePageLayout about title={title} intro={intro} category={t.nav.about}
    navigation={<MobileSectionTabs label={t.nav.about}
      items={pages.filter(key => key === page || content?.[key]?.isVisible)
        .map(key => ({ href: `/${key}/`, label: t.nav[key] }))} />}
    summary={page === 'profile' && profile?.isVisible ? <>
      <div className="about-identity">
        {content?.site.profileImage && <img className="about-avatar" src={`${BASE_PATH}${content.site.profileImage}`} alt={profile.doctorName} />}
        <div className="about-identity-copy">
          <p className="about-identity-label">{t.doctor.profileEyebrow}</p>
          <h2>{profile.doctorName}</h2>
          <p className="about-designation">{profile.designation}</p>
        </div>
      </div>
    </> : undefined}
  >{children}</ResourcePageLayout>
}
