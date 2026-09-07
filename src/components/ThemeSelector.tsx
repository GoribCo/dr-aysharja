'use client'

import type { ThemePreference } from '@/lib/types'

import { useTheme } from './ThemeProvider'
import { useUiLang } from './UiLanguageProvider'

export default function ThemeSelector() {
  const { preference, setPreference } = useTheme()
  const { t } = useUiLang()
  const options: [ThemePreference, string][] = [
    ['system', t.settings.themeSystem],
    ['light', t.settings.themeLight],
    ['dark', t.settings.themeDark],
  ]

  return <div role="group" aria-label={t.settings.theme} className="flex gap-2">
    {options.map(([value, label]) => <button key={value} type="button" aria-pressed={preference === value}
      onClick={() => setPreference(value)}
      className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${preference === value
        ? 'bg-indigo-600 text-white border-indigo-600'
        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-indigo-300'}`}>
      {label}
    </button>)}
  </div>
}
