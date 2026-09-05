'use client'

import ResourcePageLayout from '@/components/ResourcePageLayout'
import { useUiLang } from '@/components/UiLanguageProvider'
import SettingsClient from './SettingsClient'

export default function SettingsPageClient() {
  const { t, lang } = useUiLang()
  return (
    <ResourcePageLayout title={t.nav.settings} intro={t.settings.panelDescription} footer={
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {lang === 'bn' ? 'এমন একটি ওয়েবসাইট চান?' : lang === 'hi' ? 'ऐसी वेबसाइट चाहते हैं?' : 'Want a website like this?'}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {lang === 'bn' ? 'আপনার চেম্বার বা ব্যবসার জন্য ওয়েবসাইট তৈরি করতে যোগাযোগ করুন।' : lang === 'hi' ? 'अपने क्लिनिक या व्यवसाय के लिए वेबसाइट बनवाने हेतु संपर्क करें।' : 'Get in touch to create a polished website for your practice or business.'}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:sdiptapaik@gmail.com?subject=Website%20Development%20Inquiry&body=Hello%2C%0A%0AI%20would%20like%20to%20create%20a%20website%20like%20this.%20Please%20share%20more%20details.%0A%0AThank%20you."
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-teal-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-teal-800 dark:bg-teal-600"
          >
            {lang === 'bn' ? 'ইমেইল' : lang === 'hi' ? 'ईमेल' : 'Email'} sdiptapaik@gmail.com
          </a>
          <a
            href="tel:+8801719100070"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-teal-500 hover:text-teal-700 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {lang === 'bn' ? 'কল করুন' : lang === 'hi' ? 'कॉल करें' : 'Call'} +880 1719 100070
          </a>
        </div>
      </section>
    }>
      <SettingsClient />
    </ResourcePageLayout>
  )
}
