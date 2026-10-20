export type LocaleCode = 'id' | 'en'

export interface Localized {
  id: string
  en: string
}

export interface LocalizedHtml {
  id: string
  en: string
}

export interface LocalizedLink {
  label: Localized
  to: string
}

export interface Media {
  id: number
  url: string
  alt?: Localized
  width?: number
  height?: number
}

export interface SiteSettings {
  companyName: Localized
  legalName: string
  tagline: Localized
  description: Localized
  agencyNumber: string
  foundedYear: string
  address: Localized
  phone: string[]
  whatsapp: string
  email: string
  officeHours: Localized
  logo: string
  profile: string
  companyProfile: string
  gallery: string[]
  social: {
    facebook?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  menuVisibility?: Record<string, boolean>
}

export interface HeroConfig {
  eyebrow?: Localized
  heading: Localized
  subheading?: Localized
  image: string
  imagePosition?: 'left' | 'right'
  textPosition?: 'left' | 'right'
  description?: Localized
  ctaProduct?: LocalizedLink
  ctaContact?: LocalizedLink
  ctaPrimary?: LocalizedLink
  ctaSecondary?: LocalizedLink
}

export interface ProfileSection {
  title: Localized
  history: Localized
  gallery: Media[]
}

export interface ProductCategory {
  id: number
  slug: string
  name: Localized
  description: Localized
  image: string
  icon: string
  order: number
  productCount: number
  applications: { id: Localized[]; en: Localized[] }
}

export interface ProductItem {
  id: number
  slug: string
  sku?: string
  name: Localized
  categorySlug: string
  image: string
  packaging: Localized
  weight: Localized
  spec: { label: Localized; value: Localized }[]
  tdsMediaId?: number
  msdsMediaId?: number
  tdsFile?: string
  msdsFile?: string
  description: Localized
  featured: boolean
  status: 'published' | 'draft'
  views?: number
}

export interface ServiceItem {
  id: number
  slug: string
  icon?: string
  order?: number
  title: Localized
  excerpt: Localized
  body: LocalizedHtml
  highlights?: { id: Localized[]; en: Localized[] }
  image: string
  featured: boolean
}

export interface CustomerItem {
  id: number
  name: string
  logo: string
  image?: string
  industry?: Localized
  order: number
}

export interface CustomerImage {
  id: number
  image: string
  alt?: Localized
}

export interface HeroBlock extends HeroConfig {}

export interface Milestone {
  id: number
  year: string
  order: number
  title: Localized
  description: Localized
}

export interface StatItem {
  id: number
  label: Localized
  value: string
  order: number
}

export interface TestimonialItem {
  id: number
  author: string
  role?: Localized
  company: string
  rating?: number
  quote: Localized
}

export interface PageContent {
  slug: string
  title: Localized
  heading: Localized
  intro: Localized
  body: LocalizedHtml
  heroImage: string
  metaTitle: Localized
  metaDescription: Localized
  updatedAt: string
}

export interface BlogItem {
  id: number
  slug: string
  title: Localized
  excerpt: Localized
  body: LocalizedHtml
  cover: string
  metaTitle: Localized
  metaDescription: Localized
  publishedAt: string
}

export interface PostItem {
  id: number
  slug: string
  title: Localized
  excerpt: Localized
  body: LocalizedHtml
  cover: string
  author: string
  category: Localized
  tags: string[]
  publishedAt: string
  readingMinutes: number
  status: 'published' | 'draft'
  views?: number
}

export interface HomeContent {
  hero: HeroConfig
  categories: ProductCategory[]
  customers: CustomerItem[]
}

export interface CareerItem {
  id: number
  slug: string
  title: Localized
  location: Localized
  employmentType: Localized
  department: Localized
  description: LocalizedHtml
  requirements: { id: Localized[]; en: Localized[] }
  isOpen: boolean
  postedAt: string
}