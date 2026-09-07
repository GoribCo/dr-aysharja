'use client'

import type { Speciality } from '@/lib/types'

import AppearanceSettings from '@/components/AppearanceSettings'
import { useUiLang } from '@/components/UiLanguageProvider'
import { useSpeciality } from '@/components/SpecialityProvider'

export default function SettingsClient() {
  const { t, lang } = useUiLang()
  const { speciality, setSpeciality, configuration } = useSpeciality()
  const { themes, labels, neutralTheme } = configuration
  return (
    <>
      <AppearanceSettings embedded />

      {/* Medical Speciality */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3 px-1">
          {t.settings.speciality}
        </h2>
        <div className="border-t border-slate-100 pt-4 dark:border-slate-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t.settings.specialityDesc}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSpeciality(null)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
                speciality === null
                  ? 'bg-gray-900 dark:bg-gray-700 text-white border-gray-900 dark:border-gray-700'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              <span>{neutralTheme.icon}</span>
              <span>{t.settings.specialityNone}</span>
            </button>
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setSpeciality(key as Speciality)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  speciality === key
                    ? 'text-white border-current'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-current'
                }`}
                style={{
                  backgroundColor: speciality === key ? theme.primary : 'transparent',
                  borderColor: speciality === key ? theme.primary : 'inherit',
                  color: speciality === key ? 'white' : 'inherit',
                }}
              >
                <span>{theme.icon}</span>
                <span>{labels[lang][key as Exclude<Speciality, null>]}</span>
              </button>
            ))}
          </div>
          {speciality && themes[speciality] && (
            <div className="text-xs text-gray-500 dark:text-gray-400 p-3 rounded-lg" style={{ backgroundColor: themes[speciality].secondary }}>
              <p className="font-medium">{labels[lang][speciality]}</p>
            </div>
          )}
        </div>
      </section>

    </>
  )
}
