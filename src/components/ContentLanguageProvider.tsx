'use client'

import type { ContentLanguageProviderProps, ContentLanguageContextValue, ContentLanguage } from '@/lib/types'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'rxprofile_language'
const DEFAULT_CONTENT_LANG: ContentLanguage = 'bn'

const ContentLanguageContext = createContext<ContentLanguageContextValue>({
  lang: DEFAULT_CONTENT_LANG,
  availableLangs: [DEFAULT_CONTENT_LANG],
  setLang: () => {},
  content: null,
})

export function useContentLanguage() {
  return useContext(ContentLanguageContext)
}

export default function ContentLanguageProvider({
  children,
  contentByLanguage,
}: ContentLanguageProviderProps) {
  const availableLangs = useMemo(
    () => Object.keys(contentByLanguage) as ContentLanguage[],
    [contentByLanguage],
  )
  const defaultLang = availableLangs.includes(DEFAULT_CONTENT_LANG)
    ? DEFAULT_CONTENT_LANG
    : availableLangs[0] ?? DEFAULT_CONTENT_LANG
  const [lang, setLangState] = useState<ContentLanguage>(defaultLang)

  useEffect(() => {
    // Migrate either previous preference to one supported site language.
    const stored = [STORAGE_KEY, 'rxprofile_content_lang', 'rxprofile_ui_lang']
      .map(key => localStorage.getItem(key) as ContentLanguage | null)
      .find(value => value && availableLangs.includes(value))
    const resolved = stored ?? defaultLang
    setLangState(resolved)
    localStorage.setItem(STORAGE_KEY, resolved)
    localStorage.removeItem('rxprofile_content_lang')
    localStorage.removeItem('rxprofile_ui_lang')
  }, [availableLangs, defaultLang])

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  function setLang(next: ContentLanguage) {
    if (availableLangs.includes(next)) {
      setLangState(next)
      localStorage.setItem(STORAGE_KEY, next)

    }
  }

  return (
    <ContentLanguageContext.Provider value={{
      lang,
      availableLangs,
      setLang,
      content: contentByLanguage[lang] ?? contentByLanguage[defaultLang] ?? null,
    }}>
      {children}
    </ContentLanguageContext.Provider>
  )
}
