/** Resolve strings at every depth, including lists and nested frontmatter. */
export function resolveContentTemplates<T>(value: T, vars: Record<string, string>): T {
  if (typeof value === 'string') {
    return value.replace(/{{\s*(\w+)\s*}}/g, (match, key: string) => vars[key] ?? match) as T
  }
  if (Array.isArray(value)) return value.map(item => resolveContentTemplates(item, vars)) as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveContentTemplates(item, vars)])) as T
  }
  return value
}
