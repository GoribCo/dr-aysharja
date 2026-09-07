import { readEditableFile } from '../content/editable'
import type { ContentLanguage, SiteSettings } from '../types'

/** Server-only site configuration; content files own identity and deployment defaults. */
export function loadSiteConfiguration(): SiteSettings {
  const data = readEditableFile('site.md')
  const defaultLanguage = data.defaultLanguage ?? 'en'
  if (!['en', 'bn', 'hi'].includes(String(defaultLanguage))) throw new Error('site.md: defaultLanguage must be en, bn or hi.')
  if (data.speciality !== undefined && data.speciality !== null) {
    const themes = readEditableFile('appearance/speciality-themes.md').themes as Record<string, unknown>
    if (typeof data.speciality !== 'string' || !Object.hasOwn(themes, data.speciality)) throw new Error('site.md: speciality must match a key in appearance/speciality-themes.md, or null.')
  }
  const theme = data.theme as { primary?: unknown } | undefined
  if (theme?.primary !== undefined && (typeof theme.primary !== 'string' || !/^#[0-9a-f]{6}$/i.test(theme.primary))) throw new Error('site.md: theme.primary must be a quoted six-digit hex color.')
  const branding = data.branding as { icon?: unknown } | undefined
  if (branding?.icon && (typeof branding.icon !== 'string' || !branding.icon.startsWith('/') || branding.icon.startsWith('//'))) throw new Error('site.md: branding.icon must be a local path starting with /.')
  return { ...data, defaultLanguage } as SiteSettings
}

export function getDefaultLanguage(): ContentLanguage {
  return loadSiteConfiguration().defaultLanguage ?? 'en'
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || loadSiteConfiguration().url || 'http://localhost:3000'
  const url = new URL(configured)
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('site.md: url must use http or https.')
  if (url.search || url.hash || url.username || url.password) throw new Error('site.md: url must not include a query, fragment or credentials.')
  return url.href.replace(/\/$/, '')
}
