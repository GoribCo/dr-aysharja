'use client'

import { preferenceKey } from '@/lib/site/deployment'
import { createContext, useContext, useEffect, useState } from 'react'
import type { SpecialityContextValue, Speciality, SpecialityConfiguration } from '@/lib/types'

type SpecialityProviderProps = { children: React.ReactNode; configuration: SpecialityConfiguration }

const STORAGE_KEY = preferenceKey('speciality')
const SpecialityContext = createContext<SpecialityContextValue | null>(null)

export function useSpeciality() {
  const context = useContext(SpecialityContext)
  if (!context) throw new Error('useSpeciality must be used within SpecialityProvider')
  return context
}

export default function SpecialityProvider({ children, configuration }: SpecialityProviderProps) {
  const [speciality, setSpecialityState] = useState<Speciality>(configuration.defaultSpeciality ?? null)
  const { themes, neutralTheme } = configuration
  const theme = speciality ? themes[speciality] ?? neutralTheme : neutralTheme

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const resolved = stored === 'neutral' ? null : stored && Object.hasOwn(themes, stored) ? stored as Speciality : configuration.defaultSpeciality ?? null
    setSpecialityState(resolved)
    if (stored && stored !== 'neutral' && !Object.hasOwn(themes, stored)) localStorage.removeItem(STORAGE_KEY)
  }, [themes, configuration.defaultSpeciality])

  useEffect(() => {
    const color = speciality === (configuration.defaultSpeciality ?? null) && configuration.primaryColor
      ? configuration.primaryColor : theme.accent
    document.documentElement.style.setProperty('--site-accent', color)
    return () => { document.documentElement.style.removeProperty('--site-accent') }
  }, [speciality, theme.accent, configuration.defaultSpeciality, configuration.primaryColor])

  function setSpeciality(next: Speciality) {
    setSpecialityState(next)
    if (next) localStorage.setItem(STORAGE_KEY, next)
    else localStorage.setItem(STORAGE_KEY, 'neutral')
  }

  return <SpecialityContext.Provider value={{ speciality, theme, setSpeciality, configuration }}>
    {children}
  </SpecialityContext.Provider>
}
