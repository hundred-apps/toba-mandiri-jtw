<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const { get, update, remove, lastError } = useAdminApi()

const fields: FieldDef[] = [
  { name: 'companyName', label: 'Nama perusahaan', kind: 'text', bilingual: true, required: true },
  { name: 'legalName', label: 'Badan hukum', kind: 'text', required: true, help: 'Dipakai di footer, contoh: PT. Toba Mandiri Sukses.' },
  { name: 'tagline', label: 'Tagline', kind: 'text', bilingual: true, required: true },
  { name: 'description', label: 'Deskripsi perusahaan', kind: 'textarea', bilingual: true, required: true, rows: 4, help: 'Tampil di aside profil dan meta description.' },
  { name: 'agencyNumber', label: 'Nomor agen', kind: 'text', required: false, help: 'Opsional.' },
  { name: 'foundedYear', label: 'Tahun berdiri', kind: 'text', required: true },
  { name: 'address', label: 'Alamat', kind: 'textarea', bilingual: true, required: true, rows: 2 },
  { name: 'phone', label: 'Nomor telepon', kind: 'repeater', required: true, help: 'Satu baris satu nomor. Baris pertama dipakai di header.' },
  { name: 'whatsapp', label: 'Nomor WhatsApp', kind: 'text', required: true, help: 'Format internasional tanpa tanda plus, contoh: 6285282400976' },
  { name: 'email', label: 'Email', kind: 'text', required: true },
  { name: 'officeHours', label: 'Jam operasional', kind: 'text', bilingual: true, required: true },
  { name: 'logo', label: 'Logo', kind: 'image', required: true, help: 'Wajib. Dipakai di header, footer, dan ikon tab browser (favicon).' },
  { name: 'companyProfile', label: 'Company profile', kind: 'image', help: 'Opsional. Berkas PDF profil perusahaan untuk diunduh di halaman profil.' },
  { name: 'profile', label: 'Gambar halaman profil', kind: 'image', help: 'Opsional. Gambar utama (hero) pada halaman profil.' },
  { name: 'gallery', label: 'Galeri foto', kind: 'gallery', max: 10, help: 'Maksimal 10 foto. Bisa diurutkan; foto tampil di halaman profil.' }
]

const model = ref<Record<string, unknown>>({})
const loading = ref(true)
const saving = ref(false)
const notice = ref<{ type: 'ok' | 'error'; text: string } | null>(null)

function defaults(): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const field of fields) {
    result[field.name] = field.kind === 'repeater' || field.kind === 'gallery'
      ? []
      : field.bilingual ? { id: '', en: '' } : field.kind === 'image' ? '' : ''
  }
  return result
}

onMounted(async () => {
  const row = await get<Record<string, unknown>>('settings', 'site')
  model.value = { ...defaults(), ...(row || {}) }
  loading.value = false
})

function isEmpty(field: FieldDef, value: unknown): boolean {
  if (field.bilingual) {
    const bi = (value ?? {}) as { id?: unknown; en?: unknown }
    return !String(bi.id ?? '').trim() || !String(bi.en ?? '').trim()
  }
  if (field.kind === 'repeater') return !Array.isArray(value) || value.length === 0
  return !String(value ?? '').trim()
}

async function save() {
  notice.value = null
  const missing = fields.filter((field) => field.required && isEmpty(field, model.value[field.name]))
  if (missing.length) {
    notice.value = { type: 'error', text: `Lengkapi field wajib: ${missing.map((f) => f.label).join(', ')}.` }
    return
  }
  saving.value = true
  const result = await update<Record<string, unknown>>('settings', 'site', model.value)
  saving.value = false
  if (result === null) {
    notice.value = { type: 'error', text: lastError.value || 'Gagal menyimpan pengaturan.' }
    return
  }
  // Muat ulang dari API supaya bentuk form (bilingual/media) tetap benar.
  const fresh = await get<Record<string, unknown>>('settings', 'site')
  model.value = { ...defaults(), ...(fresh || {}) }
  await refreshNuxtData(['cms:settings:site', 'cms:home:home'])
  notice.value = { type: 'ok', text: 'Pengaturan disimpan.' }
}

useSeoMeta({ title: 'Pengaturan situs | CMS Toba Mandiri Sukses' })
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl">
          Pengaturan situs
        </h1>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Data perusahaan yang dipakai di header, footer, halaman kontak, dan meta tag.
        </p>
      </div>
      <button type="button" class="btn-primary" :disabled="saving || loading" @click="save">
        {{ saving ? 'Menyimpan...' : 'Simpan' }}
      </button>
    </div>

    <p
      v-if="notice"
      class="rounded-lg px-4 py-3 text-sm"
      :class="notice.type === 'ok'
        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
        : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300'"
      role="status"
    >
      {{ notice.text }}
    </p>

    <div v-if="loading" class="card px-5 py-10 text-center text-sm text-slate-500">
      Memuat pengaturan...
    </div>

    <form v-else class="card space-y-6 p-6" @submit.prevent="save">
      <AdminField
        v-for="field in fields"
        :key="field.name"
        v-model="model[field.name]"
        :field="field"
      />
    </form>

    <div class="card p-5 text-xs text-slate-500">
      Endpoint: <code class="font-mono">GET /api/v1/admin/settings</code> dan
      <code class="font-mono">PUT /api/v1/admin/settings</code>. Menyimpan di sini langsung mengubah
      seluruh website karena frontend publik membaca sumber yang sama.
    </div>
  </div>
</template>