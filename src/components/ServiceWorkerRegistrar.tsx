'use client'

import { BASE_PATH } from '@/lib/site/deployment'

import { useEffect } from 'react'

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(`${BASE_PATH}/sw.js`, { scope: `${BASE_PATH || '/'}` })
        .catch(() => {
          // SW registration is best-effort — ignore errors in non-HTTPS contexts etc.
        })
    }
  }, [])

  return null
}
