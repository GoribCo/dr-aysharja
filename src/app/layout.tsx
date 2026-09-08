import { BASE_PATH } from '@/lib/site/deployment'
import { getDefaultLanguage, getSiteUrl } from '@/lib/site/config'
import type { Metadata, Viewport } from 'next'
import type { CSSProperties } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import FontSizeProvider from '@/components/FontSizeProvider'
import UiLanguageProvider from '@/components/UiLanguageProvider'
import SpecialityProvider from '@/components/SpecialityProvider'
import { loadSpecialityThemes } from '@/lib/appearance/speciality-themes'
import { loadSpecialityLabels } from '@/lib/appearance/speciality-labels'
import type { Speciality } from '@/lib/types'
import ContentLanguageProvider from '@/components/ContentLanguageProvider'
import BottomNav from '@/components/navs/BottomNav'
import ServiceWorkerRegistrar from '@/components/ServiceWorkerRegistrar'
import StickyAppointmentCTA from '@/components/StickyAppointmentCTA'
import SiteHeader from '@/components/layouts/SiteHeader'
import { loadDoctorContent, loadDoctorContentByLanguage, loadSiteSettings } from '@/lib/content/loaders'
import { loadDoctorName } from '@/lib/content/loaders'
import Script from 'next/script'

type RootLayoutProps = {
  children: React.ReactNode
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const doctorName = loadDoctorName();
  const site = loadSiteSettings()
  const SITE_URL = getSiteUrl()
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: doctorName,
    icons: {
      icon: `${BASE_PATH}${site.branding?.icon || '/icon.svg'}`,
      apple: `${BASE_PATH}${site.branding?.icon || '/icon.svg'}`,
    },
    title: {
      default: `${doctorName} - Professional Profile`,
      template: `%s | ${doctorName}`,
    },
    description: site.seo?.defaultDescription,
    keywords: ['doctor', 'medical', doctorName],
    authors: [{ name: doctorName }],
    creator: doctorName,
    openGraph: {
      title: `${doctorName} - Professional Profile`,
      description: site.seo?.defaultDescription,
      url: SITE_URL,
      siteName: doctorName,
      locale: { en: 'en_US', bn: 'bn_BD', hi: 'hi_IN' }[getDefaultLanguage()],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${doctorName} - Professional Profile`,
      description: site.seo?.defaultDescription,
    },
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export function generateViewport(): Viewport {
  const theme = loadSiteSettings().theme
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: theme?.colorLight ?? '#f9fafb' },
      { media: '(prefers-color-scheme: dark)', color: theme?.colorDark ?? '#0f172a' },
    ],
  }
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  const contentByLanguage = loadDoctorContentByLanguage()
  const site = loadSiteSettings()
  const defaultLanguage = getDefaultLanguage()
  const gaMeasurementId = site.analytics?.measurementId
  const appearance = loadSpecialityThemes()
  const specialityConfiguration = {
    ...appearance,
    defaultSpeciality: site.speciality,
    primaryColor: site.theme?.primary,
    labels: loadSpecialityLabels(Object.keys(appearance.themes) as Exclude<Speciality, null>[]),
  }

  return (
    <html lang={defaultLanguage} style={{ '--site-accent': site.theme?.primary || appearance.neutralTheme.primary } as CSSProperties} suppressHydrationWarning>
      <head>
        <link rel="manifest" href={`${BASE_PATH}/manifest.webmanifest`} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-dvh`}>
        <ThemeProvider>
          <FontSizeProvider>
          <ContentLanguageProvider contentByLanguage={contentByLanguage} defaultLanguage={defaultLanguage}>
            <SpecialityProvider configuration={specialityConfiguration}>
              <UiLanguageProvider>
                <ServiceWorkerRegistrar />
                {/*
                  max-w-6xl caps the whole layout (sidebar + content) at 1152px.
                  On desktop: flex row — sticky sidebar on the left, content fills the rest.
                  On mobile: sidebar is hidden, bottom nav is fixed.
                */}
                <div className="max-w-6xl mx-auto min-h-dvh lg:flex lg:items-start">
                  <BottomNav />
                  <main className="flex-1 min-w-0 min-h-dvh pb-24 lg:pb-0">
                    <SiteHeader
                        initialHome={loadDoctorContent(defaultLanguage).home as Record<string, unknown> | null}
                        doctorName={loadDoctorName(defaultLanguage)}
                    />
                    {children}
                  </main>
                  <StickyAppointmentCTA />
                </div>
              </UiLanguageProvider>
            </SpecialityProvider>
          </ContentLanguageProvider>
          </FontSizeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
