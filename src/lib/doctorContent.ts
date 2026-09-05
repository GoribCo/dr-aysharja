import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getFullName, getNameTemplateVars, resolveContentTemplates, type DoctorNameParts } from './doctorName'
import type { Chamber } from './chamber'
import { parseChambers } from './chamber'
import { RESOURCE_PAGES, type ResourcePage, type ResourceContent } from './resources'

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

// Default language for content
const DEFAULT_CONTENT_LANG: ContentLanguage = 'bn'

// Cache for loaded content to avoid repeated disk reads
const contentCache = new Map<string, any>()

function getContentDir(lang: ContentLanguage = DEFAULT_CONTENT_LANG): string {
  return path.join(process.cwd(), 'content', lang)
}

export function getSiteSettings(): SiteSettings {
  const cacheKey = 'site_settings'
  if (process.env.NODE_ENV === 'production' && contentCache.has(cacheKey)) return contentCache.get(cacheKey)
  const filePath = path.join(process.cwd(), 'content', 'site.md')
  if (!fs.existsSync(filePath)) return {}
  const { data } = matter(fs.readFileSync(filePath, 'utf-8'))
  contentCache.set(cacheKey, data as SiteSettings)
  return data as SiteSettings
}

export function getDoctorIdentity(lang: ContentLanguage = DEFAULT_CONTENT_LANG): DoctorNameParts {
  const profilePath = path.join(getContentDir(lang), 'profile.md')
  const data = fs.existsSync(profilePath) ? matter(fs.readFileSync(profilePath, 'utf-8')).data : {}
  const field = (key: string) => typeof data[key] === 'string' ? data[key].trim() : ''
  const name = { salutation: field('salutation'), firstName: field('firstName'), middleName: field('middleName'), lastName: field('lastName') }
  if (!name.firstName && !name.middleName && !name.lastName) {
    return lang === 'en' ? { ...name, firstName: 'Doctor' } : getDoctorIdentity('en')
  }
  return name
}

export function getDoctorName(lang: ContentLanguage = DEFAULT_CONTENT_LANG): string {
  return getFullName(getDoctorIdentity(lang))
}

export function getSectionContent(filename: string, lang: ContentLanguage = DEFAULT_CONTENT_LANG): DoctorSection | null {
  const contentDir = getContentDir(lang)
  const cacheKey = `${lang}:${filename}`

  if (process.env.NODE_ENV === 'production' && contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)
  }

  const filePath = path.join(contentDir, filename)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const templateVars = getNameTemplateVars(getDoctorIdentity(lang))
  const finalData = resolveContentTemplates(data, templateVars)
  const finalContent = resolveContentTemplates(content, templateVars)
  const parsedChambers = parseChambers(finalData.chambers ?? [])

  // If the content includes "TODO", we hide the section unless structured chamber data exists.
  const hasStructuredDetails = parsedChambers.length > 0
  const isVisible = !content.includes('TODO') || hasStructuredDetails

  const result = {
    ...finalData,
    ...(filename === 'profile.md' ? { doctorName: templateVars.doctorName, doctorShortName: templateVars.doctorShortName } : {}),
    title: (finalData.title as string) || '',
    description: (finalData.description as string) || '',
    content: finalContent,
    isVisible,
    chambers: parsedChambers.length > 0 ? parsedChambers : undefined,
  }

  contentCache.set(cacheKey, result)
  return result
}

export function getServicesList(lang: ContentLanguage = DEFAULT_CONTENT_LANG): DoctorService[] {
  const contentDir = getContentDir(lang)
  const cacheKey = `${lang}:services_list`

  if (process.env.NODE_ENV === 'production' && contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)
  }

  const servicesDir = path.join(contentDir, 'services')
  if (!fs.existsSync(servicesDir)) return []

  const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.md'))
  const services = files.map(filename => {
    const filePath = path.join(servicesDir, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    
    // If the content includes "TODO", we hide the service.
    const isVisible = !content.includes('TODO');

    const templateVars = getNameTemplateVars(getDoctorIdentity(lang))
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
export function getResourceContent(page: ResourcePage, lang: ContentLanguage = DEFAULT_CONTENT_LANG): ResourceContent | null {
  const section = getSectionContent(`resources/${page}.md`, lang)
  if (!section?.isVisible) return null
  const data = section as DoctorSection & Partial<ResourceContent>
  if (typeof data.intro !== 'string' || !Array.isArray(data.sections)) return null
  const sections = data.sections.filter(item => item && typeof item.title === 'string' &&
    typeof item.body === 'string' && (item.href === undefined || typeof item.href === 'string'))
  return { intro: data.intro, sections }
}

export function getAllDoctorContent(lang: ContentLanguage = DEFAULT_CONTENT_LANG) {
  return {
    site: getSiteSettings(),
    resources: Object.fromEntries(RESOURCE_PAGES.map(page => [page, getResourceContent(page, lang)])) as Record<ResourcePage, ResourceContent | null>,
    profile: getSectionContent('profile.md', lang),
    about: getSectionContent('about.md', lang),
    speciality: getSectionContent('speciality.md', lang),
    subSpeciality: getSectionContent('sub-speciality.md', lang),
    qualifications: getSectionContent('qualifications.md', lang),
    experience: getSectionContent('experience.md', lang),
    languages: getSectionContent('languages.md', lang),
    memberships: getSectionContent('memberships.md', lang),
    awards: getSectionContent('awards.md', lang),
    publications: getSectionContent('publications.md', lang),
    services: getSectionContent('services.md', lang), // Kept for backwards compatibility if needed, but not used in UI anymore
    servicesList: getServicesList(lang),
    chamber: getSectionContent('chamber.md', lang),
    appointment: getSectionContent('appointment.md', lang),
    review: getSectionContent('review.md', lang),
    home: getSectionContent('home.md', lang),
    articles: getSectionContent('articles.md', lang),
    faq: getSectionContent('faq.md', lang),
    contact: getSectionContent('contact.md', lang),
  }
}

export type DoctorContent = ReturnType<typeof getAllDoctorContent>
export type DoctorContentByLanguage = Partial<Record<ContentLanguage, DoctorContent>>

/** Load every configured translation during the static build. */
export function getDoctorContentByLanguage(): DoctorContentByLanguage {
  return Object.fromEntries(
    getAvailableContentLanguages().map(lang => [lang, getAllDoctorContent(lang)]),
  ) as DoctorContentByLanguage
}

// Helper to check if a language's content directory exists
export function contentLanguageExists(lang: ContentLanguage): boolean {
  return fs.existsSync(getContentDir(lang))
}

// Get available content languages
export function getAvailableContentLanguages(): ContentLanguage[] {
  const contentRoot = path.join(process.cwd(), 'content')
  if (!fs.existsSync(contentRoot)) return [DEFAULT_CONTENT_LANG]
  
  const dirs = fs.readdirSync(contentRoot)
    .filter(dir => {
      const fullPath = path.join(contentRoot, dir)
      // Resource-only translations do not enable an incomplete profile language.
      return fs.statSync(fullPath).isDirectory() && ['bn', 'hi', 'en'].includes(dir) &&
        fs.existsSync(path.join(fullPath, 'profile.md'))
    }) as ContentLanguage[]

  const available = ['bn', 'en', 'hi'].filter(lang => dirs.includes(lang as ContentLanguage)) as ContentLanguage[]
  return available.length > 0 ? available : [DEFAULT_CONTENT_LANG]
}
