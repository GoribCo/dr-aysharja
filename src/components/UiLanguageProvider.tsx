'use client'

import { createContext, useContext } from 'react'
import { useContentLanguage } from './ContentLanguageProvider'
import { translations } from '@/lib/i18n/translations'

import type { UiLangContextValue } from '@/lib/types'

type UiLanguageProviderProps = { children: React.ReactNode }

const UiLangContext = createContext<UiLangContextValue>({
  lang: 'en',
  t: translations.en,
  setLang: () => {},
})

export function useUiLang() {
  return useContext(UiLangContext)
}

export default function UiLanguageProvider({ children }: UiLanguageProviderProps) {
  const { lang, setLang } = useContentLanguage()

  return (
    <UiLangContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </UiLangContext.Provider>
  )
}
