import type { MaybeRefOrGetter } from 'vue'

interface PageSeoOptions {
  /** Judul lengkap halaman (sudah termasuk nama perusahaan). */
  title: MaybeRefOrGetter<string>
  /** Deskripsi meta. Kosong akan jatuh ke deskripsi beranda. */
  description?: MaybeRefOrGetter<string | undefined>
  /** Gambar OG/Twitter (relatif atau absolut). Kosong memakai logo situs. */
  image?: MaybeRefOrGetter<string | undefined>
  /** og:type, contoh `website` atau `article`. */
  type?: MaybeRefOrGetter<'website' | 'article' | undefined>
  /** Path/URL kanonik. Kosong memakai rute saat ini. */
  url?: MaybeRefOrGetter<string | undefined>
}

/**
 * Pasang meta SEO standar untuk satu halaman: title, description, Open Graph,
 * Twitter Card, dan canonical. Semua nilai reaktif supaya ikut berubah saat
 * bahasa diganti.
 */
export function usePageSeo(options: PageSeoOptions) {
  const { locale, t } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()

  const siteUrl = String(config.public.siteUrl || '').replace(/\/+$/, '')

  function toAbsolute(value?: string): string {
    if (!value) return `${siteUrl}/img/logo.svg`
    if (/^https?:\/\//i.test(value)) return value
    return `${siteUrl}${value.startsWith('/') ? '' : '/'}${value}`
  }

  const description = () => toValue(options.description) || t('meta.homeDescription')
  const image = () => toAbsolute(toValue(options.image))
  const pageUrl = () => {
    const custom = toValue(options.url)
    if (custom) return toAbsolute(custom)
    return `${siteUrl}${route.fullPath}`
  }
  const title = () => toValue(options.title)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: () => toValue(options.type) || 'website',
    ogUrl: pageUrl,
    ogImage: image,
    ogSiteName: 'PT. Toba Mandiri Sukses',
    ogLocale: () => (locale.value === 'id' ? 'id_ID' : 'en_US'),
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image
  })

  useHead({
    link: [{ rel: 'canonical', href: pageUrl }]
  })
}
