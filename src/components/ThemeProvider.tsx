'use client'

import type { ThemeProviderProps, Theme, ThemePreference, ThemeContextValue } from '@/lib/types'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  preference: 'system',
  setPreference: () => {},
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [preference, setPreferenceState] = useState<ThemePreference>('system')
  const [systemTheme, setSystemTheme] = useState<Theme>('light')
  const theme = preference === 'system' ? systemTheme : preference

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark' || stored === 'system') setPreferenceState(stored)
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => setSystemTheme(media.matches ? 'dark' : 'light')
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [theme])

  function setPreference(next: ThemePreference) {
    localStorage.setItem('theme', next)
    setPreferenceState(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference, toggleTheme: () => setPreference(theme === 'dark' ? 'light' : 'dark') }}>
      {children}
    </ThemeContext.Provider>
  )
}
