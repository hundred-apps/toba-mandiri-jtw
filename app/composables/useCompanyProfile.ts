import {
  companyContact,
  companyProfile,
  staticPages,
  type CompanyLocale,
  type CompanyMilestone,
  type CompanyPackaging,
  type CompanySegment,
  type CompanyService,
  type LocalizedText
} from '~/content/companyProfile'

export interface CompanyProfileView {
  locale: CompanyLocale
  tagline: string
  aboutTitle: string
  aboutBody: string
  servicesTitle: string
  servicesBody: string
  segmentsTitle: string
  segmentsBody: string
  packagingTitle: string
  packagingBody: string
  timelineTitle: string
  timelineBody: string
  contactTitle: string
  services: Array<{ icon: string; slug: string; title: string; excerpt: string; points: string[] }>
  segments: Array<{ icon: string; slug: string; name: string; desc: string; products: string[] }>
  packaging: Array<{ icon: string; title: string; desc: string }>
  milestones: Array<{ year: string; title: string; description: string }>
}

/**
 * Isi company profile (about, layanan, segmen, kemasan, timeline) dalam bahasa
 * aktif. Sumber data ada di `~/content/companyProfile`, bukan di i18n, supaya
 * konten HTML tidak masuk ke message i18n (ditolak `strictMessage`) dan array
 * object tidak berubah jadi message AST saat bundle dioptimasi.
 */
export function useCompanyProfile() {
  const { locale } = useI18n()

  const lang = computed<CompanyLocale>(() => (locale.value === 'en' ? 'en' : 'id'))
  const text = (value: LocalizedText) => value[lang.value]

  const view = computed<CompanyProfileView>(() => ({
    locale: lang.value,
    tagline: text(companyProfile.tagline),
    aboutTitle: text(companyProfile.aboutTitle),
    aboutBody: text(companyProfile.aboutBody),
    servicesTitle: text(companyProfile.servicesTitle),
    servicesBody: text(companyProfile.servicesBody),
    segmentsTitle: text(companyProfile.segmentsTitle),
    segmentsBody: text(companyProfile.segmentsBody),
    packagingTitle: text(companyProfile.packagingTitle),
    packagingBody: text(companyProfile.packagingBody),
    timelineTitle: text(companyProfile.timelineTitle),
    timelineBody: text(companyProfile.timelineBody),
    contactTitle: text(companyProfile.contactTitle),
    services: companyProfile.services.map((service: CompanyService) => ({
      icon: service.icon,
      slug: service.slug,
      title: text(service.title),
      excerpt: text(service.excerpt),
      points: service.points.map((point) => text(point))
    })),
    segments: companyProfile.segments.map((segment: CompanySegment) => ({
      icon: segment.icon,
      slug: segment.slug,
      name: text(segment.name),
      desc: text(segment.desc),
      products: [...segment.products]
    })),
    packaging: companyProfile.packaging.map((item: CompanyPackaging) => ({
      icon: item.icon,
      title: text(item.title),
      desc: text(item.desc)
    })),
    milestones: companyProfile.milestones.map((item: CompanyMilestone) => ({
      year: item.year,
      title: text(item.title),
      description: text(item.description)
    }))
  }))

  return { lang, view }
}

/**
 * Isi halaman statis (FAQ, Syarat & Ketentuan, Kebijakan Privasi) yang sudah
 * diterjemahkan ke bahasa aktif.
 * `body` berupa HTML dan dirender lewat `ProseBlock` (v-html).
 */
export interface ResolvedStaticPage {
  title: string
  heading: string
  intro: string
  body: string
}

export function useStaticPage(page: 'faq' | 'termsConditions' | 'privacyPolicy') {
  const { lang } = useCompanyProfile()

  return computed<ResolvedStaticPage>(() => {
    const source = staticPages[page]
    return {
      title: source.title[lang.value],
      heading: source.heading[lang.value],
      intro: source.intro[lang.value],
      body: source.body[lang.value]
    }
  })
}

/**
 * Data kontak resmi (alamat, telepon, WhatsApp, email, situs).
 */
export function useCompanyContact() {
  const { lang } = useCompanyProfile()

  return computed(() => ({
    address: companyContact.address[lang.value],
    phone: companyContact.phone,
    whatsapp: companyContact.whatsapp,
    email: companyContact.email,
    website: companyContact.website
  }))
}
