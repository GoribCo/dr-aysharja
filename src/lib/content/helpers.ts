export function text(content: Record<string, unknown> | null | undefined, key: string, fallback = ''): string {
  return typeof content?.[key] === 'string' ? content[key] as string : fallback
}

export function list(content: Record<string, unknown> | null | undefined, key: string): string[] {
  return Array.isArray(content?.[key]) ? content[key].filter((item): item is string => typeof item === 'string') : []
}
