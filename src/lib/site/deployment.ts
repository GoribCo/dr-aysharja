// Browser-safe deployment path. Public site URLs are resolved on the server in config.ts.
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '')

// Different doctor sites under one domain must not share visitor preferences.
export function preferenceKey(name: string): string {
  return `doctor-profile:${BASE_PATH || '/'}:${name}`
}
