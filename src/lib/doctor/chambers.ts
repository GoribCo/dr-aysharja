import type { Chamber } from '../types'

export function normalizeChamber(value: Partial<Chamber> | null | undefined): Chamber | null {
  if (!value || typeof value !== 'object') return null

  const chamber = {
    name: typeof value.name === 'string' ? value.name.trim() : '',
    address: typeof value.address === 'string' ? value.address.trim() : '',
    visitingDays: typeof value.visitingDays === 'string' ? value.visitingDays.trim() : '',
    visitingHours: typeof value.visitingHours === 'string' ? value.visitingHours.trim() : '',
    phone: typeof value.phone === 'string' ? value.phone.trim() : '',
    googleMapsUrl: typeof value.googleMapsUrl === 'string' ? value.googleMapsUrl.trim() : '',
  }

  const hasAnyValue = Object.values(chamber).some(Boolean)
  if (!hasAnyValue) return null

  return {
    name: chamber.name || 'Clinic',
    address: chamber.address || 'Address not provided',
    visitingDays: chamber.visitingDays || 'By appointment',
    visitingHours: chamber.visitingHours || 'Please call for schedule',
    phone: chamber.phone || '',
    googleMapsUrl: chamber.googleMapsUrl || '',
  }
}

export function parseChambers(value: unknown): Chamber[] {
  if (Array.isArray(value)) {
    return value
      .map(entry => normalizeChamber(entry as Partial<Chamber>))
      .filter((entry): entry is Chamber => entry !== null)
  }

  if (value && typeof value === 'object') {
    const maybeList = (value as { chambers?: unknown }).chambers
    if (Array.isArray(maybeList)) {
      return parseChambers(maybeList)
    }
  }

  return []
}

export function parseChamberList(markdownOrYaml?: string | null): Chamber[] {
  if (!markdownOrYaml || !markdownOrYaml.trim()) return []

  const entries: Chamber[] = []
  const lines = markdownOrYaml.split('\n')
  let current: Partial<Chamber> | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    const itemMatch = trimmed.match(/^\-\s*name:\s*(.+)$/)

    if (itemMatch) {
      if (current) {
        const normalized = normalizeChamber(current)
        if (normalized) entries.push(normalized)
      }
      current = { name: itemMatch[1].trim() }
      continue
    }

    if (!current) continue

    const keyValue = trimmed.match(/^([A-Za-z]+):\s*(.+)$/)
    if (!keyValue) continue

    const [, key, value] = keyValue
    const fieldMap: Record<string, keyof Chamber> = {
      name: 'name',
      address: 'address',
      visitingDays: 'visitingDays',
      visitingHours: 'visitingHours',
      phone: 'phone',
      googleMapsUrl: 'googleMapsUrl',
    }

    const field = fieldMap[key]
    if (field) {
      current[field] = value.trim()
    }
  }

  if (current) {
    const normalized = normalizeChamber(current)
    if (normalized) entries.push(normalized)
  }

  return entries.filter(chamber => chamber.phone || chamber.address || chamber.googleMapsUrl || chamber.visitingDays || chamber.visitingHours)
}

export function extractChambersFromMarkdown(content?: string | null): Chamber[] {
  if (!content) return []

  const frontmatterBlock = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterBlock) return []

  return parseChamberList(frontmatterBlock[1])
}
