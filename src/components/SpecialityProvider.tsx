'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { NEUTRAL_THEME, getSpecialityTheme } from '@/lib/appearance/speciality-themes'

import type { SpecialityContextValue, Speciality, SpecialityTheme } from '@/lib/types'

type SpecialityProviderProps = { children: React.ReactNode }

const STORAGE_KEY = 'rxprofile_speciality'

const SpecialityContext = createContext<SpecialityContextValue>({
  speciality: null,
  theme: NEUTRAL_THEME,
  setSpeciality: () => {},
})

export function useSpeciality() {
  return useContext(SpecialityContext)
}

export default function SpecialityProvider({ children }: SpecialityProviderProps) {
  const [speciality, setSpecialityState] = useState<Speciality>(null)
  const [theme, setTheme] = useState<SpecialityTheme>(NEUTRAL_THEME)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Speciality | null
    const resolved = stored || null
    setSpecialityState(resolved)
    setTheme(getSpecialityTheme(resolved) || NEUTRAL_THEME)
  }, [])

  function setSpeciality(next: Speciality) {
    setSpecialityState(next)
    if (next) {
      localStorage.setItem(STORAGE_KEY, next)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
    setTheme(getSpecialityTheme(next) || NEUTRAL_THEME)
  }

  return (
    <SpecialityContext.Provider value={{ speciality, theme, setSpeciality }}>
      {children}
    </SpecialityContext.Provider>
  )
}
