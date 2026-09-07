'use client'

import ThemeSelector from '@/components/ThemeSelector'
import { useUiLang } from '@/components/UiLanguageProvider'
import { useContentLanguage } from '@/components/ContentLanguageProvider'
import { useFontSize } from '@/components/FontSizeProvider'
import { UI_LANGUAGES } from '@/lib/i18n/translations'

import type { FontSize } from '@/lib/types'

type AppearanceSettingsProps = { embedded?: boolean }

export default function AppearanceSettings({ embedded = false }: AppearanceSettingsProps) {
  const { t } = useUiLang()
  const { lang, availableLangs, setLang } = useContentLanguage()
  const { fontSize, setFontSize: handleFontSize } = useFontSize()
  return <>
      {/* Appearance */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 px-1">
          {t.settings.appearance}
        </h2>
        <div className={embedded ? "divide-y divide-slate-100 dark:divide-slate-700" : "bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700"}>
          <div className={embedded ? "py-4 first:pt-0" : "px-4 py-4"}>
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t.settings.theme}</div>
            <ThemeSelector />
          </div>
          <div className={embedded ? "py-4 first:pt-0" : "px-4 py-4"}>
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t.settings.fontSize}</div>
            <div className="flex gap-2">
              {([['small', t.settings.fontSmall], ['medium', t.settings.fontMedium], ['large', t.settings.fontLarge]] as [FontSize, string][]).map(([size, label]) => (
                <button
                  key={size}
                  onClick={() => handleFontSize(size)}
                  aria-pressed={fontSize === size}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    fontSize === size
                      ? (embedded ? 'bg-teal-700 text-white border-teal-700 dark:bg-teal-600 dark:border-teal-600' : 'bg-indigo-600 text-white border-indigo-600')
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-indigo-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Language */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 px-1">
          {t.settings.language}
        </h2>
        <div className={embedded ? "" : "bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4"}>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t.settings.languageDesc}</p>
          <div className="flex flex-wrap gap-2">
            {UI_LANGUAGES.filter(l => availableLangs.includes(l.code)).map(l => (
              <button
                key={l.code}
                aria-pressed={lang === l.code}
                onClick={() => setLang(l.code)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  lang === l.code
                    ? (embedded ? 'bg-teal-700 text-white border-teal-700 dark:bg-teal-600 dark:border-teal-600' : 'bg-indigo-600 text-white border-indigo-600')
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500'
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.nativeName}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

  </>
}
