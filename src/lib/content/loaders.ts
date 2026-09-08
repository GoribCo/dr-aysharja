import type { ContentLanguage, DoctorSection, DoctorService, SiteSettings, DoctorContent, DoctorContentByLanguage, DoctorNameParts, ResourcePage, ResourceContent, SettingsPageContent } from '../types'

import { resolveContentTemplates } from './templates'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { formatDoctorName, createDoctorNameVariables } from '../doctor/name'
import { parseChambers } from '../doctor/chambers'
import { getDefaultLanguage, loadSiteConfiguration } from '../site/config'
import { RESOURCE_PAGES } from './resources'
import { loadDoctorDetails, loadPractice, loadPatientFeedback, readEditableFile } from './editable'


// Cache for loaded content to avoid repeated disk reads
const contentCache = new Map<string, any>()

function getContentDir(lang: ContentLanguage = getDefaultLanguage()): string {
  return path.join(process.cwd(), 'content', 'pages', lang)
}

export function loadSiteSettings(): SiteSettings {
  const cacheKey = 'site_settings'
  if (process.env.NODE_ENV === 'production' && contentCache.has(cacheKey)) return contentCache.get(cacheKey)
  const data = loadSiteConfiguration()
  const practice = loadPractice(getDefaultLanguage())
  const shared = readEditableFile('doctor/photo.md')
  if (typeof shared.profileImage !== 'string') throw new Error('doctor/photo.md: profileImage must be text.')
  const settings: SiteSettings = {
    ...data,
    profileImage: shared.profileImage,
    appointment: { phone: practice.bookingPhone, url: practice.bookingUrl },
    contact: { phone: practice.phone, email: practice.email, whatsapp: practice.whatsapp,
      latitude: practice.latitude, longitude: practice.longitude },
  }
  contentCache.set(cacheKey, settings)
  return settings
}

export function loadDoctorIdentity(lang: ContentLanguage = getDefaultLanguage()): DoctorNameParts {
  const data = loadDoctorDetails(lang)
  const field = (key: string) => typeof data[key as keyof typeof data] === 'string' ? String(data[key as keyof typeof data]).trim() : ''
  const name = { salutation: field('salutation'), firstName: field('firstName'), middleName: field('middleName'), lastName: field('lastName') }
  if (!name.firstName && !name.middleName && !name.lastName) {
    return lang === 'en' ? { ...name, firstName: 'Doctor' } : loadDoctorIdentity('en')
  }
  return name
}

export function loadDoctorName(lang: ContentLanguage = getDefaultLanguage()): string {
  return formatDoctorName(loadDoctorIdentity(lang))
}

export function loadContentSection(filename: string, lang: ContentLanguage = getDefaultLanguage()): DoctorSection | null {
  const contentDir = getContentDir(lang)
  const cacheKey = `${lang}:${filename}`

  if (process.env.NODE_ENV === 'production' && contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)
  }

  const filePath = ['experience.md', 'awards.md', 'memberships.md', 'publications.md'].includes(filename)
    ? path.join(process.cwd(), 'content', 'doctor', lang, filename)
    : path.join(contentDir, filename)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const doctor = loadDoctorDetails(lang)
  const practice = loadPractice(lang)
  const chamber = practice.chamber
  const services = filename === 'home.md' ? loadDoctorServices(lang) : []
  const templateVars: Record<string, string> = {
    ...createDoctorNameVariables(loadDoctorIdentity(lang)),
    doctorRole: doctor.role, doctorAffiliation: doctor.affiliation,
    chamberName: chamber.name, chamberAddress: chamber.address,
    consultationDays: [chamber.visitingDays, chamber.visitingHours].filter(Boolean).join(' · '),
    qualificationsList: doctor.qualifications.map(value => `- **${value}**`).join('\n'),
    languagesList: doctor.languages.map(value => `- ${value}`).join('\n'),
    servicesList: services.map(value => `- ${value.title}`).join('\n'),
  }
  let pageData = data
  if (filename === 'profile.md') pageData = { ...data, ...doctor }
  if (filename === 'home.md') {
    const feedback = loadPatientFeedback(lang)
    pageData = { ...data, doctorName: templateVars.doctorName,
      credentials: doctor.qualifications.map(value => value.replace(/\*\*/g, '')).join(', '),
      credentialItems: doctor.qualifications.map(value => value.replace(/\*\*/g, '')),
      specialization: doctor.specialization,
      chamberName: chamber.name, chamberAddress: chamber.address,
      consultationHours: chamber.visitingHours, consultationDays: templateVars.consultationDays,
      availability: practice.availability, availabilityNote: practice.availabilityNote,
      services: services.slice(0, 6).map(service => service.title),
      testimonial: feedback.featuredQuote, testimonialAuthor: feedback.featuredAuthor,
    }
  }
  if (filename === 'review.md') pageData = { ...data, reviews: loadPatientFeedback(lang).reviews }
  const finalData = resolveContentTemplates(pageData, templateVars)
  const finalContent = resolveContentTemplates(content, templateVars)
  const parsedChambers = ['appointment.md', 'contact.md'].includes(filename)
    ? (Object.entries(chamber).some(([key, value]) => key !== 'phone' && Boolean(value)) ? parseChambers([chamber]) : [])
    : []

  // If the content includes "TODO", we hide the section unless structured chamber data exists.
  const hasStructuredDetails = parsedChambers.length > 0
  const isVisible = data.visible !== false && (!content.includes('TODO') || hasStructuredDetails)

  const result = {
    ...finalData,
    ...(['profile.md', 'home.md'].includes(filename) ? { doctorName: templateVars.doctorName, doctorShortName: templateVars.doctorShortName, doctorInitials: [doctor.firstName, doctor.middleName, doctor.lastName].filter(Boolean).map(part => Array.from(part)[0]).join('') } : {}),
    title: (finalData.title as string) || '',
    description: (finalData.description as string) || '',
    content: finalContent,
    isVisible,
    chambers: parsedChambers.length > 0 ? parsedChambers : undefined,
  }

  contentCache.set(cacheKey, result)
  return result
}

export function loadDoctorServices(lang: ContentLanguage = getDefaultLanguage()): DoctorService[] {
  const cacheKey = `${lang}:services_list`

  if (process.env.NODE_ENV === 'production' && contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)
  }

  const servicesDir = path.join(process.cwd(), 'content', 'doctor', lang, 'services')
  if (!fs.existsSync(servicesDir)) return []

  const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.md'))
  const services = files.map(filename => {
    const filePath = path.join(servicesDir, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    
    // If the content includes "TODO", we hide the service.
    const isVisible = data.visible !== false && !content.includes('TODO');

    const templateVars = createDoctorNameVariables(loadDoctorIdentity(lang))
    const finalContent = resolveContentTemplates(content, templateVars)
    
    return {
      id: filename.replace('.md', ''),
      order: typeof data.order === 'number' ? data.order : 100,
      title: resolveContentTemplates((data.title as string) || '', templateVars),
      shortDescription: resolveContentTemplates((data.shortDescription as string) || '', templateVars),
      icon: (data.icon as string) || undefined,
      image: (data.image as string) || undefined,
      content: finalContent,
      isVisible
    }
  })

  const result = services.filter(s => s.isVisible).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
  contentCache.set(cacheKey, result)
  return result
}

/** Resource copy uses the same localized Markdown and template loader as profile content. */
export function loadResourceContent(page: ResourcePage, lang: ContentLanguage = getDefaultLanguage()): ResourceContent | null {
  const section = loadContentSection(`resources/${page}.md`, lang)
  if (!section?.isVisible) return null
  const data = section as DoctorSection & Partial<ResourceContent>
  if (typeof data.intro !== 'string' || !Array.isArray(data.sections)) return null
  const sections = data.sections.filter(item => item && typeof item.title === 'string' &&
    typeof item.body === 'string' && (item.href === undefined || typeof item.href === 'string'))
  return { intro: data.intro, sections }
}

export function loadSettingsPageContent(): SettingsPageContent | null {
  const data = loadSiteSettings().websiteInquiry
  if (!data) return null
  const { heading, description, emailLabel, phoneLabel, phoneHref } = data
  if (typeof data.emailAddress !== 'string' || typeof data.emailSubject !== 'string' ||
    typeof data.emailBody !== 'string') return null
  // Shared English copy stays readable in settings/site.md; encode only the generated link.
  const emailHref = `mailto:${data.emailAddress}?subject=${encodeURIComponent(data.emailSubject)}&body=${encodeURIComponent(data.emailBody)}`
  if (typeof heading !== 'string' || typeof description !== 'string' ||
    typeof emailLabel !== 'string' || typeof emailHref !== 'string' ||
    typeof phoneLabel !== 'string' || typeof phoneHref !== 'string') return null
  return { heading, description, emailLabel, emailHref, phoneLabel, phoneHref }
}

export function loadDoctorContent(lang: ContentLanguage = getDefaultLanguage()): DoctorContent {
  return {
    site: loadSiteSettings(),
    resources: {
      ...Object.fromEntries(RESOURCE_PAGES.map(page => [page, loadResourceContent(page, lang)])) as Record<ResourcePage, ResourceContent | null>,
      settings: loadSettingsPageContent(),
    },
    profile: loadContentSection('profile.md', lang),
    qualifications: loadContentSection('qualifications.md', lang),
    experience: loadContentSection('experience.md', lang),
    memberships: loadContentSection('memberships.md', lang),
    awards: loadContentSection('awards.md', lang),
    publications: loadContentSection('publications.md', lang),
    services: loadContentSection('services.md', lang), // Kept for backwards compatibility if needed, but not used in UI anymore
    servicesList: loadDoctorServices(lang),
    appointment: loadContentSection('appointment.md', lang),
    review: loadContentSection('review.md', lang),
    home: loadContentSection('home.md', lang),
    contact: loadContentSection('contact.md', lang),
  }
}

/** Load every configured translation during the static build. */
export function loadDoctorContentByLanguage(): DoctorContentByLanguage {
  const languages = listContentLanguages()
  if (!languages.includes(getDefaultLanguage())) throw new Error('settings/site.md: defaultLanguage needs a complete doctor profile and page content folder.')
  return Object.fromEntries(
    languages.map(lang => [lang, loadDoctorContent(lang)]),
  ) as DoctorContentByLanguage
}

// Helper to check if a language's content directory exists
export function hasContentLanguageDirectory(lang: ContentLanguage): boolean {
  return fs.existsSync(getContentDir(lang))
}

// Get available content languages
export function listContentLanguages(): ContentLanguage[] {
  const contentRoot = path.join(process.cwd(), 'content', 'pages')
  if (!fs.existsSync(contentRoot)) return [getDefaultLanguage()]
  
  const dirs = fs.readdirSync(contentRoot)
    .filter(dir => {
      const fullPath = path.join(contentRoot, dir)
      // Resource-only translations do not enable an incomplete profile language.
      return fs.statSync(fullPath).isDirectory() && ['bn', 'hi', 'en'].includes(dir) &&
        fs.existsSync(path.join(fullPath, 'profile.md')) &&
        fs.existsSync(path.join(process.cwd(), 'content', 'doctor', dir, 'profile.md'))
    }) as ContentLanguage[]

  const available = ['bn', 'en', 'hi'].filter(lang => dirs.includes(lang as ContentLanguage)) as ContentLanguage[]
  return available.length > 0 ? available : [getDefaultLanguage()]
}
