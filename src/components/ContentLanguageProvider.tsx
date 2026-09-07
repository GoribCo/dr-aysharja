'use client'

import { preferenceKey } from '@/lib/site/deployment'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { DoctorContentByLanguage, ContentLanguageContextValue, ContentLanguage } from '@/lib/types'

type ContentLanguageProviderProps = {
  children: React.ReactNode
  contentByLanguage: DoctorContentByLanguage
  defaultLanguage: ContentLanguage
}

const STORAGE_KEY = preferenceKey('language')
const DEFAULT_CONTENT_LANG: ContentLanguage = 'en'

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
  defaultLanguage,
}: ContentLanguageProviderProps) {
  const availableLangs = useMemo(
    () => Object.keys(contentByLanguage) as ContentLanguage[],
    [contentByLanguage],
  )
  const defaultLang = availableLangs.includes(defaultLanguage)
    ? defaultLanguage
    : availableLangs[0] ?? defaultLanguage
  const [lang, setLangState] = useState<ContentLanguage>(defaultLang)

  useEffect(() => {
    const value = localStorage.getItem(STORAGE_KEY) as ContentLanguage | null
    const stored = value && availableLangs.includes(value) ? value : null
    const resolved = stored ?? defaultLang
    setLangState(resolved)
    localStorage.setItem(STORAGE_KEY, resolved)
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
