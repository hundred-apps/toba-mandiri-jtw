<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const { get, update, lastError } = useAdminApi()

const fields: FieldDef[] = [
  { name: 'eyebrow', label: 'Label kecil (eyebrow)', kind: 'text', bilingual: true, help: 'Teks kecil di atas judul, contoh: Distributor Resmi' },
  { name: 'heading', label: 'Judul utama', kind: 'text', bilingual: true, required: true, help: 'Judul besar hero beranda' },
  { name: 'description', label: 'Deskripsi', kind: 'textarea', bilingual: true, rows: 4, help: 'Teks deskripsi di bawah judul' },
  { name: 'imageUrl', label: 'Gambar hero', kind: 'image', help: 'Gambar hero. Berkas dikirim saat menyimpan.' },
  { name: 'imagePosition', label: 'Posisi gambar', kind: 'select', options: [
    { value: 'left', label: 'Kiri' },
    { value: 'right', label: 'Kanan' }
  ], help: 'Posisi gambar di hero section' },
  { name: 'ctaLabel', label: 'Label tombol utama', kind: 'text', bilingual: true, help: 'Teks tombol utama, contoh: Lihat Produk' },
  { name: 'ctaTo', label: 'Link tombol utama', kind: 'text', help: 'URL tujuan tombol utama, contoh: /products' },
  { name: 'ctaSecondaryLabel', label: 'Label tombol sekunder', kind: 'text', bilingual: true, help: 'Teks tombol sekunder, contoh: Konsultasi Gratis' },
  { name: 'ctaSecondaryTo', label: 'Link tombol sekunder', kind: 'text', help: 'URL tujuan tombol sekunder, contoh: /contact' },
  { name: 'isActive', label: 'Tampilkan hero', kind: 'toggle', help: 'Nonaktifkan untuk menyembunyikan hero' }
]

const model = ref<Record<string, unknown>>({})
const loading = ref(true)
const saving = ref(false)
const notice = ref<{ type: 'ok' | 'error'; text: string } | null>(null)

function emptyValue(field: FieldDef): unknown {
  switch (field.kind) {
    case 'toggle': return true
    case 'number': return 0
    case 'repeater': return []
    case 'pair': return []
    case 'tags': return []
    case 'image': return ''
    case 'select': return field.options?.[0]?.value ?? ''
    default:
      return field.bilingual ? { id: '', en: '' } : ''
  }
}

function defaults(): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const field of fields) result[field.name] = emptyValue(field)
  return result
}

onMounted(async () => {
  const row = await get<Record<string, unknown>>('home-hero', 'singleton')
  model.value = { ...defaults(), ...(row || {}) }
  loading.value = false
})

async function save() {
  notice.value = null
  saving.value = true
  const id = String(model.value.id ?? '')
  const result = await update<Record<string, unknown>>('home-hero', id, model.value)
  saving.value = false
  if (result === null) {
    notice.value = { type: 'error', text: lastError.value || 'Gagal menyimpan hero.' }
    return
  }
  const fresh = await get<Record<string, unknown>>('home-hero', 'singleton')
  model.value = { ...defaults(), ...(fresh || {}) }
  await refreshNuxtData(['cms:home:home'])
  notice.value = { type: 'ok', text: 'Hero beranda disimpan.' }
}

useSeoMeta({ title: 'Hero Beranda | CMS Toba Mandiri Sukses' })
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl">
          Hero Beranda
        </h1>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Hero pada halaman beranda. Hanya satu data — perubahan langsung mengubah beranda.
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
      Memuat hero...
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
      Endpoint: <code class="font-mono">GET /api/home-hero-read/</code> dan
      <code class="font-mono">POST /api/home-hero-create</code>.
    </div>
  </div>
</template>
