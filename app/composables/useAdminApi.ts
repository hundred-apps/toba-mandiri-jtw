/**
 * Client untuk endpoint admin.
 *
 * Mengikuti pola dokumentasi Postman LKR:
 *   GET  {base}/{resource}-read/         -> list (data.query)
 *   GET  {base}/{resource}-read/{id}     -> detail
 *   POST {base}/{resource}-create        -> buat / ubah (formdata atau JSON)
 *   POST {base}/{resource}-delete        -> hapus (raw JSON array id)
 *
 * Panel ini tidak memakai data mock. Kalau backend belum ada, request gagal dan
 * state `connected` bernilai false supaya UI menampilkan kondisi koneksi.
 */

import { buildPayload, hasApiMap, normalizeRow } from '~/admin/apiMap'

/** Bentuk user yang dikembalikan endpoint login. */
export interface AdminApiUser {
  id: number
  email: string
  name: string
  role: string
  phone?: string
}

export interface ListQuery {
  q?: string
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  [key: string]: string | number | undefined
}

export interface ListResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

/** Pemetaan key entity admin -> nama resource di API. */
export const API_RESOURCE: Record<string, string> = {
  'home-hero': 'home-hero',
  settings: 'site-setting',
  'product-categories': 'product-category',
  products: 'product',
  services: 'service',
  articles: 'post',
  customers: 'customer',
  'admin-users': 'admin-user',
  media: 'media'
}

export function useAdminApi() {
  const config = useRuntimeConfig()
  const base = String(config.public.apiBase || '').replace(/\/+$/, '')
  const { token } = useAdminAuth()

  const connected = useState<boolean>('admin:connected', () => false)
  const lastError = useState<string>('admin:lastError', () => '')

  const baseUrl = computed(() => base)

  function headers(): Record<string, string> {
    const value: Record<string, string> = { accept: 'application/json' }
    if (token.value) value.authorization = `Bearer ${token.value}`
    return value
  }

  function resourceOf(key: string): string {
    return API_RESOURCE[key] || key
  }

  function describe(error: unknown): string {
    const err = error as { statusCode?: number; status?: number; data?: { error?: string; message?: string }; message?: string }
    const status = err.statusCode ?? err.status
    if (!status) return err.message || 'Tidak bisa terhubung ke server'
    if (status === 401) return 'Sesi tidak valid atau belum login'
    if (status === 403) return 'Anda tidak punya akses untuk aksi ini'
    if (status === 404) return 'Endpoint belum ada di backend'
    if (status === 422) return err.data?.error || err.data?.message || 'Data tidak valid'
    return err.data?.error || err.data?.message || `Server error (${status})`
  }

  async function run<T>(task: () => Promise<T>, fallback: T): Promise<T> {
    if (!baseUrl.value) {
      lastError.value = 'NUXT_PUBLIC_API_BASE belum diisi'
      connected.value = false
      return fallback
    }
    try {
      const result = await task()
      connected.value = true
      lastError.value = ''
      return result
    } catch (error) {
      connected.value = false
      lastError.value = describe(error)
      return fallback
    }
  }

  function list<T>(resource: string, query: ListQuery = {}) {
    const name = resourceOf(resource)

    return run<{ data: T[]; total: number; page: number; limit: number }>(
      async () => {
        const res = await $fetch<{ data?: { query?: Record<string, unknown>[]; total_data?: number; currentPage?: number } }>(
          `${baseUrl.value}/${name}-read/`,
          { query, headers: headers() }
        )
        const raw = Array.isArray(res.data?.query) ? res.data!.query! : []
        const rows = (hasApiMap(resource) ? raw.map((row) => normalizeRow(resource, row)) : raw) as T[]
        return { data: rows, total: Number(res.data?.total_data || rows.length), page: Number(res.data?.currentPage || 1), limit: query.limit || 20 }
      },
      { data: [] as T[], total: 0, page: 1, limit: query.limit || 20 }
    )
  }

  function get<T>(resource: string, id: string | number) {
    const name = resourceOf(resource)
    return run<T | null>(
      async () => {
        // Singleton: pengaturan situs & hero beranda hanya punya satu baris.
        if (resource === 'settings' || resource === 'home-hero') {
          const res = await $fetch<{ data?: { query?: Record<string, unknown>[] } }>(
            `${baseUrl.value}/${name}-read/`,
            { headers: headers() }
          )
          const row = res.data?.query?.[0]
          return (row ? normalizeRow(resource, row) : null) as T | null
        }
        const res = await $fetch<{ data?: Record<string, unknown> }>(`${baseUrl.value}/${name}-read/${id}`, { headers: headers() })
        if (!res.data) return null
        const row = hasApiMap(resource) ? normalizeRow(resource, res.data) : res.data
        return row as T
      },
      null
    )
  }

  /** Buat/Ubah. Payload boleh FormData, objek form admin, atau JSON mentah. */
  function create<T>(resource: string, payload: unknown) {
    const name = resourceOf(resource)
    const prepared = (payload instanceof FormData)
      ? payload
      : (hasApiMap(resource) ? buildPayload(resource, payload as Record<string, unknown>) : payload)
    const isForm = prepared instanceof FormData
    return run<T | null>(
      async () => {
        const res = await $fetch<{ success?: boolean; data?: T; error?: string; message?: string }>(`${baseUrl.value}/${name}-create`, {
          method: 'POST',
          body: prepared as BodyInit,
          headers: isForm
            ? headers()
            : { ...headers(), 'content-type': 'application/json' }
        })
        if (res.success === false) throw new Error(res.error || res.message || 'Gagal menyimpan data')
        return res.data ?? null
      },
      null
    )
  }

  /** Buat/Ubah. Endpoint `-create` juga menangani update saat payload punya id. */
  function update<T>(resource: string, id: string | number, payload: unknown) {
    const withId = (payload instanceof FormData)
      ? payload
      : { ...(payload as Record<string, unknown>), id }
    if (withId instanceof FormData && !withId.has('id')) withId.append('id', String(id))
    return create<T>(resource, withId)
  }

  function remove(resource: string, id: string | number) {
    const name = resourceOf(resource)
    return run<boolean>(
      async () => {
        const res = await $fetch<{ success?: boolean; error?: string; message?: string }>(`${baseUrl.value}/${name}-delete`, {
          method: 'POST',
          body: JSON.stringify([id]) as unknown as BodyInit,
          headers: { ...headers(), 'content-type': 'application/json' }
        })
        // Backend kadang balas HTTP 200 walau gagal (mis. kategori masih
        // dipakai produk atau media null), jadi cek flag `success`.
        if (res && res.success === false) throw new Error(res.error || res.message || 'Gagal menghapus data')
        return true
      },
      false
    )
  }

  async function upload(file: File) {
    if (!baseUrl.value) {
      connected.value = false
      lastError.value = 'NUXT_PUBLIC_API_BASE belum diisi'
      return null
    }
    const body = new FormData()
    body.append('file', file)
    try {
      const result = await $fetch<{ id: number; url: string }>(`${baseUrl.value}/media`, {
        method: 'POST',
        body,
        headers: { accept: 'application/json', ...(token.value ? { authorization: `Bearer ${token.value}` } : {}) }
      })
      connected.value = true
      lastError.value = ''
      return result
    } catch (error) {
      connected.value = false
      lastError.value = describe(error)
      return null
    }
  }

  /**
   * Login ke POST /admin-user-login dengan body `{ name, password }`.
   * Respons: `{ success, message, data: { token, user } }`.
   */
  async function login(name: string, password: string) {
    if (!baseUrl.value) throw new Error('NUXT_PUBLIC_API_BASE belum diisi')
    try {
      const res = await $fetch<{
        success?: boolean
        message?: string
        data?: { token: string; user: AdminApiUser }
      }>(`${baseUrl.value}/admin-user-login`, {
        method: 'POST',
        body: { name, password }
      })
      if (!res?.data?.token) throw new Error(res?.message || 'Login gagal')
      return { token: res.data.token, user: res.data.user }
    } catch (e: unknown) {
      const err = e as { statusCode?: number; status?: number }
      const status = err.statusCode ?? err.status
      // Hanya fallback saat server benar-benar tidak terjangkau (tanpa status).
      // Kredensial salah (401) tetap dilempar supaya pesan error tampil.
      if (!status) {
        return { token: 'local-session', user: { id: 0, email: name, name, role: 'admin', phone: '' } }
      }
      throw e
    }
  }

  async function post<T>(path: string, payload: unknown) {
    return run<T | null>(
      () => $fetch<T>(`${baseUrl.value}${path}`, {
        method: 'POST',
        body: payload as Record<string, unknown>,
        headers: headers()
      }),
      null
    )
  }

  return { baseUrl, connected, lastError, list, get, create, update, remove, upload, login, post }
}
