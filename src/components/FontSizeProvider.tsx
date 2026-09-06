'use client'

import type { FontSizeProviderProps, FontSize } from '@/lib/types'

import { createContext, useContext, useEffect, useState } from 'react'

const sizes: Record<FontSize, string> = { small: '14px', medium: '16px', large: '18px' }
const storageKey = 'rxprofile_font_size'
const FontSizeContext = createContext({ fontSize: 'medium' as FontSize, setFontSize: (_size: FontSize) => {} })

export const useFontSize = () => useContext(FontSizeContext)

export default function FontSizeProvider({ children }: FontSizeProviderProps) {
  const [fontSize, setSize] = useState<FontSize>('medium')
  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored === 'small' || stored === 'medium' || stored === 'large') {
      setSize(stored)
      document.documentElement.style.fontSize = sizes[stored]
    }
  }, [])

  function setFontSize(size: FontSize) {
    setSize(size)
    localStorage.setItem(storageKey, size)
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg')
    document.documentElement.style.fontSize = sizes[size]
  }

  return <FontSizeContext.Provider value={{ fontSize, setFontSize }}>{children}</FontSizeContext.Provider>
}
