'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import AppearanceSettings from '@/components/AppearanceSettings'
import { useUiLang } from '@/components/UiLanguageProvider'
import { CloseIcon, SettingsIcon } from '@/components/Icons'

export default function SettingsDrawer() {
  const { t } = useUiLang()
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open])

  function close() { dialog.current?.close() }

  return <>
    <button ref={trigger} type="button" className="header-settings" aria-label={t.settings.panelTitle}
      title={t.settings.panelTitle} aria-haspopup="dialog" aria-expanded={open} aria-controls="display-settings"
      onClick={() => { dialog.current?.showModal(); setOpen(true) }}>
      <SettingsIcon />
    </button>
    <dialog ref={dialog} id="display-settings" className="settings-drawer" aria-labelledby="display-settings-title"
      onClose={() => { setOpen(false); trigger.current?.focus() }}
      onClick={event => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close()
      }}>
      <div className="settings-drawer-heading">
        <div><h2 id="display-settings-title">{t.settings.panelTitle}</h2><p>{t.settings.panelDescription}</p></div>
        <button type="button" autoFocus className="header-settings" aria-label={t.settings.closePanel} onClick={close}>
          <CloseIcon />
        </button>
      </div>
      <div className="settings-drawer-content"><AppearanceSettings />
        <Link href="/settings/" onClick={close} className="settings-drawer-link">{t.settings.allSettings}<span aria-hidden="true"> →</span></Link>
      </div>
    </dialog>
  </>
}
