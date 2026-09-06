import type * as React from 'react'

// Shared domain, content, UI and component types. This module contains no runtime code.

export interface HomeClientProps {
    doctorContent: DoctorContent
}

export interface ContentLanguageContextValue {
  lang: ContentLanguage
  availableLangs: ContentLanguage[]
  setLang: (lang: ContentLanguage) => void
  content: DoctorContent | null
}

export interface ContentPageProps {
  sectionKey: DoctorSectionKey
  title: string
  description?: string
}

export interface ContentPageTitleProps {
    eyebrow: string
    heading: string
    intro?: string
}

export type FontSize = 'small' | 'medium' | 'large'

export interface PageHeaderProps {
  backHref: string
  backLabel: string
  /** Extra items for the right side */
  right?: React.ReactNode
}

export interface SpecialityContextValue {
  speciality: Speciality
  theme: SpecialityTheme
  setSpeciality: (speciality: Speciality) => void
}

export interface Heading {
  id: string
  text: string
  level: number
}

export interface TableOfContentsProps {
  content: string // raw markdown
}

export type Theme = 'light' | 'dark'

export type ThemePreference = 'system' | Theme

export interface ThemeContextValue {
  theme: Theme
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => void
  toggleTheme: () => void
}

export interface UiLangContextValue {
  lang: UiLang
  t: Translations
  setLang: (lang: UiLang) => void
}

export type AppointmentContent = {
  title?: string
  description?: string
  content: string
  isVisible: boolean
  chambers?: Chamber[]
}

export type ContactContent = {
  description?: string
  content: string
  isVisible: boolean
  chambers?: Chamber[]
}

export interface ProfileContent {
    doctorName: string
    designation: string
    affiliation: string
    role: string
    yearsOfExperience: string
    languages: string[]
    bio: string
    specializationSummary: string
    specializationTags: string[]
}

export type ReviewContent = Record<string, unknown>

export type PatientReview = {
  name: string
  rating: number
  date: string
  service?: string
  review: string
  status: string
}

export interface SiteHeaderProps {
  initialHome?: Record<string, unknown> | null
  doctorName: string
}

export interface MoreSheetProps {
  open: boolean
  pathname: string
  isAuthenticated: boolean
  onClose: () => void
}

export type Speciality =
  | 'medicine'
  | 'dental'
  | 'orthopaedic'
  | 'gynaecology'
  | 'cardiology'
  | 'ent'
  | 'ophthalmology'
  | 'surgery'
  | 'other'
  | null

export interface SpecialityTheme {
  primary: string
  secondary: string
  accent: string
  gradient: {
    from: string
    to: string
  }
  icon: string
  label: string
  description: string
}

export type ResourcePage = 'privacy' | 'terms' | 'faq' | 'help'

export interface ResourceSection {
  title: string
  body: string
  href?: string
}

export interface ResourceContent {
  intro: string
  sections: ResourceSection[]
}

export type ContentLanguage = 'bn' | 'hi' | 'en'

export interface DoctorSection {
  title: string;
  description: string;
  content: string;
  isVisible: boolean;
  chambers?: Chamber[];
}

export interface DoctorService {
  id: string;
  order?: number;
  title: string;
  shortDescription: string;
  icon?: string;
  image?: string;
  content: string;
  isVisible: boolean;
}

export interface SiteSettings {
  profileImage?: string
  appointment?: { phone?: string; bookingUrl?: string }
  contact?: { phone?: string; email?: string; whatsapp?: string; latitude?: number | null; longitude?: number | null }
  branding?: { shortName?: string; version?: string }
  seo?: { defaultDescription?: string }
  theme?: { colorLight?: string; colorDark?: string; primary?: string }
}

export type DoctorSectionKey = 'profile' | 'about' | 'speciality' | 'subSpeciality' | 'qualifications' | 'experience' | 'languages' | 'memberships' | 'awards' | 'publications' | 'services' | 'chamber' | 'appointment' | 'review' | 'home' | 'articles' | 'faq' | 'contact'

export type DoctorContent = Record<DoctorSectionKey, DoctorSection | null> & {
  site: SiteSettings
  resources: Record<ResourcePage, ResourceContent | null>
  servicesList: DoctorService[]
}

export type DoctorContentByLanguage = Partial<Record<ContentLanguage, DoctorContent>>

export interface AppointmentConfig {
  phone?: string | null
  url?: string | null
  instructions?: string | null
}

export interface AppointmentAction {
  type: 'none' | 'phone' | 'external' | 'mixed'
  primaryLabel: string
  primaryHref: string | null
  secondaryLabel: string | null
  secondaryHref: string | null
  phone: string | null
  url: string | null
}

export interface Chamber {
  name: string
  address: string
  visitingDays: string
  visitingHours: string
  phone: string
  googleMapsUrl: string
}

export interface DoctorNameParts {
  salutation: string
  firstName: string
  middleName: string
  lastName: string
}

export type UiLang = 'en' | 'bn' | 'hi'

export interface Translations {
  nav: {
    home: string
    reviews: string
    settings: string
    about: string
    profile: string
    qualifications: string
    experience: string
    awards: string
    memberships: string
    publications: string
    services: string
    appointment: string
    contact: string
    resources: string
    privacy: string
    terms: string
    faq: string
    help: string
    more: string
  }
  settings: {
    panelTitle: string
    panelDescription: string
    closePanel: string
    allSettings: string
    appearance: string
    theme: string
    themeSystem: string
    themeLight: string
    themeDark: string
    switchToLight: string
    switchToDark: string
    fontSize: string
    fontSmall: string
    fontMedium: string
    fontLarge: string
    language: string
    languageDesc: string
    speciality: string
    specialityDesc: string
    specialityNone: string
  }
  common: {
    home: string
    loading: string
    unavailable: string
    changeLanguage: string
  }
  doctor: {
    profileEyebrow: string
    profileBioLabel: string
    profileBioHeading: string
    profileFocusLabel: string
    profileFocusHeading: string
    viewServices: string
    profileDetailsLabel: string
    profileDetailsHeading: string
    currentPosition: string
    languagesSpoken: string
    nextStep: string
    bookAppointment: string
    servicesEyebrow: string
    availableServices: string
    consultationCtaHeading: string
    consultationCtaText: string
    phoneBooking: string
    phoneBookingHeading: string
    phoneBookingText: string
    visitDetails: string
    address: string
    consultationDays: string
    hours: string
    beforeVisit: string
    readyToSchedule: string
    readyToScheduleText: string
    bookByPhone: string
  }
  notes: {
    title: string
    placeholder: string
    saved: string
  }
  quiz: {
    correct: string
    wrong: string
    score: string
    retry: string
    next: string
  }
  wotd: {
    title: string
    viewStage: string
  }
}

export interface NavigationItem {
  label: string
  path: string
  children?: NavigationItem[]
}

export type SectionLabelProps = { children: React.ReactNode }

export type RootLayoutProps = {
  children: React.ReactNode
}

export type AppearanceSettingsProps = { embedded?: boolean }

export type ContentLanguageProviderProps = {
  children: React.ReactNode
  contentByLanguage: DoctorContentByLanguage
}

export type FontSizeProviderProps = { children: React.ReactNode }

export type ResourcePageProps = { page: ResourcePage }

export type ResourcePageLayoutProps = {
  title: string
  intro: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export type SpecialityProviderProps = { children: React.ReactNode }

export type ThemeProviderProps = { children: React.ReactNode }

export type UiLanguageProviderProps = { children: React.ReactNode }

export type ProfileClientProps = {initialProfile: DoctorSection | null}

export type StarsProps = { rating: number; label?: string }

export type ServiceIconProps = { name?: string }

export type AboutDropdownProps = { pathname: string; item?: NavigationItem }

export type ChevronProps = { open: boolean }

export type NavigationAccordionProps = { item: NavigationItem; pathname: string; mobile?: boolean; onNavigate?: () => void }

export type BottomNavProps = { isAuthenticated?: boolean }

export type DesktopNavProps = { isAuthenticated?: boolean }
