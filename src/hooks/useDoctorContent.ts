import type { ContentLanguage } from '@/lib/types'

import { useContentLanguage } from '@/components/ContentLanguageProvider'

export function useDoctorContent(lang: ContentLanguage) {
  const context = useContentLanguage()
  return {
    content: context.lang === lang ? context.content : null,
    isLoading: false,
    error: null,
  }
}
