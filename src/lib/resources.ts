export const RESOURCE_PAGES = ['privacy', 'terms', 'faq', 'help'] as const
export type ResourcePage = typeof RESOURCE_PAGES[number]

export interface ResourceSection {
  title: string
  body: string
  href?: string
}

export interface ResourceContent {
  intro: string
  sections: ResourceSection[]
}
