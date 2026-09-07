'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { SpecialityContextValue, Speciality, SpecialityConfiguration } from '@/lib/types'

type SpecialityProviderProps = { children: React.ReactNode; configuration: SpecialityConfiguration }

const STORAGE_KEY = 'rxprofile_speciality'
const SpecialityContext = createContext<SpecialityContextValue | null>(null)

export function useSpeciality() {
  const context = useContext(SpecialityContext)
  if (!context) throw new Error('useSpeciality must be used within SpecialityProvider')
  return context
}

export default function SpecialityProvider({ children, configuration }: SpecialityProviderProps) {
  const [speciality, setSpecialityState] = useState<Speciality>(null)
  const { themes, neutralTheme } = configuration
  const theme = speciality ? themes[speciality] ?? neutralTheme : neutralTheme

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const resolved = stored && Object.hasOwn(themes, stored) ? stored as Speciality : null
    setSpecialityState(resolved)
    if (stored && !resolved) localStorage.removeItem(STORAGE_KEY)
  }, [themes])

  function setSpeciality(next: Speciality) {
    setSpecialityState(next)
    if (next) localStorage.setItem(STORAGE_KEY, next)
    else localStorage.removeItem(STORAGE_KEY)
  }

  return <SpecialityContext.Provider value={{ speciality, theme, setSpeciality, configuration }}>
    {children}
  </SpecialityContext.Provider>
}
