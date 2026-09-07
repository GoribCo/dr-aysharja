import type { AppointmentConfig, AppointmentAction } from '../types'

export function normalizePhone(value?: string | null): string | null {
  if (typeof value !== 'string') return null

  const candidate = value.trim()
  if (!candidate || /^(todo|null)$/i.test(candidate)) return null

  const sanitized = candidate.replace(/^tel:/i, '').replace(/[\s()\-]/g, '')
  if (!sanitized || /^(todo|null)$/i.test(sanitized)) return null

  return /^\+?[0-9]+$/.test(sanitized) ? sanitized : null
}

export function normalizeUrl(value?: string | null): string | null {
  if (typeof value !== 'string') return null

  const candidate = value.trim()
  if (!candidate || /^(todo|null)$/i.test(candidate)) return null

  if (/^(https?:\/\/|\/|#)/i.test(candidate)) return candidate
  return null
}

export function getAppointmentAction(input: Partial<AppointmentConfig> = {}): AppointmentAction {
  const phone = normalizePhone(input.phone)
  const url = normalizeUrl(input.url)

  if (!phone && !url) {
    return {
      type: 'none',
      primaryLabel: 'Book Appointment',
      primaryHref: null,
      secondaryLabel: 'Call Now',
      secondaryHref: null,
      phone: null,
      url: null,
    }
  }

  if (phone && !url) {
    const telHref = `tel:${phone}`
    return {
      type: 'phone',
      primaryLabel: 'Book Appointment',
      primaryHref: telHref,
      secondaryLabel: 'Call Now',
      secondaryHref: telHref,
      phone,
      url: null,
    }
  }

  if (!phone && url) {
    return {
      type: 'external',
      primaryLabel: 'Book Appointment',
      primaryHref: url,
      secondaryLabel: null,
      secondaryHref: null,
      phone: null,
      url,
    }
  }

  return {
    type: 'mixed',
    primaryLabel: 'Book Appointment',
    primaryHref: url,
    secondaryLabel: 'Call Now',
    secondaryHref: `tel:${phone}`,
    phone,
    url,
  }
}
