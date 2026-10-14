import type { LocaleCode } from '~/types/content'

/** Bahasa aktif tanpa memicu error kalau dipanggil di luar setup. */
function currentLocale(locale?: string): LocaleCode {
  if (locale === 'id' || locale === 'en') return locale
  try {
    const value = String(useI18n().locale.value)
    return value === 'en' ? 'en' : 'id'
  } catch {
    return 'id'
  }
}

/**
 * Ambil nilai bilingual sesuai bahasa aktif.
 * Kalau nilai untuk bahasa aktif kosong, jatuh ke bahasa lain lalu ke string
 * pertama yang terisi. Ini menjaga halaman tetap terbaca walau satu
 * terjemahan belum diisi di CMS.
 */
export function pick(value: { id: string; en: string } | null | undefined, locale?: string): string
export function pick<T>(value: T, locale?: string): T
export function pick(value: unknown, locale?: string): unknown {
  const lang = currentLocale(locale)
  const fallback: LocaleCode = lang === 'id' ? 'en' : 'id'

  if (value === null || value === undefined) return ''

  if (typeof value === 'object' && ('id' in value || 'en' in value)) {
    const record = value as Record<string, unknown>
    const primary = record[lang]
    if (!isBlank(primary)) return primary
    const secondary = record[fallback]
    if (!isBlank(secondary)) return secondary
    const firstFilled = Object.values(record).find((item) => !isBlank(item))
    return firstFilled ?? ''
  }

  return value
}

export function pickList<T>(value: { id: T[]; en: T[] } | T[] | null | undefined, locale?: string): T[] {
  if (!value) return []
  const list = Array.isArray(value) ? value : (pick(value, locale) as unknown as T[])
  return list.filter((item) => !isBlank(item))
}

function isBlank(value: unknown): boolean {
  return value === null || value === undefined || (typeof value === 'string' && value.trim() === '')
}

/** URL WhatsApp dengan pesan pembuka, dipakai tombol mengambang dan CTA. */
export function whatsappLink(phone: string, message?: string): string {
  const digits = String(phone || '').replace(/\D/g, '')
  if (!digits) return '#'
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${text}`
}

export function formatDate(value: string | Date, locale?: string): string {
  if (!value) return ''
  const date = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(date.getTime())) return String(value)
  const lang = locale === 'id' ? 'id-ID' : 'en-US'
  return new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(date)
}