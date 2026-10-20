<script setup lang="ts">
/**
 * Galeri multi-gambar untuk field 'gallery'.
 *
 * Backend LKR tidak punya endpoint unggah terpisah: berkas dikirim sebagai
 * multipart pada request `-create`. Jadi nilai yang disimpan berupa campuran
 * media lama ({ id, url }) dan File baru, dan useAdminApi/buildPayload yang
 * mengirimnya.
 */

export interface GalleryItem {
  id?: number | null
  mediaId?: number | null
  url: string
}

const props = defineProps<{
  modelValue?: unknown[] | GalleryItem[] | File[]
  label?: string
  disabled?: boolean
  /** Jumlah maksimal foto. */
  max?: number
}>()

const emit = defineEmits<{ 'update:modelValue': [value: unknown] }>()

const { remove: deleteMedia, lastError } = useAdminApi()

const fileInput = ref<HTMLInputElement | null>(null)
/** Pratinjau berkas baru, dikunci ke objek File-nya (bukan ke posisi). */
const objectUrls = ref<Map<File, string>>(new Map())
/** Index foto yang sedang diminta konfirmasi hapus. */
const pendingIndex = ref<number | null>(null)
const deleting = ref(false)
/** Respons terakhir dari media-delete. */
const response = ref<{ type: 'ok' | 'error'; text: string } | null>(null)

const previewBase = computed(() => {
  const config = useRuntimeConfig()
  return String(config.public.apiBase || '').replace(/\/+$/, '').replace(/\/api\/v1\/?$/, '')
})

const max = computed(() => props.max ?? 10)

const current = computed(() => (Array.isArray(props.modelValue) ? props.modelValue : []))

const isFile = (item: unknown): item is File => item instanceof File

const isFull = computed(() => current.value.length >= max.value)

function abs(url: string): string {
  if (!url) return ''
  if (/^https?:\/\//.test(url)) return url
  const base = previewBase.value.replace(/\/+$/, '')
  return base ? `${base}${url.startsWith('/') ? '' : '/'}${url}` : url
}

function urlOf(item: unknown): string {
  if (isFile(item)) return ''
  return typeof item === 'string' ? item : String((item as GalleryItem)?.url || '')
}

function previewOf(item: unknown): string {
  if (isFile(item)) return objectUrls.value.get(item) || ''
  return abs(urlOf(item))
}

function set(items: unknown[]) {
  emit('update:modelValue', items)
}

function onFile(event: Event) {
  const input = event.target as HTMLInputElement
  const picked = Array.from(input.files || [])
  input.value = ''
  if (!picked.length || isFull.value) return
  const room = max.value - current.value.length
  const added = picked.slice(0, room)
  for (const file of added) objectUrls.value.set(file, URL.createObjectURL(file))
  set([...current.value, ...added])
}

function releasePreview(item: unknown) {
  if (!isFile(item)) return
  const url = objectUrls.value.get(item)
  if (url) URL.revokeObjectURL(url)
  objectUrls.value.delete(item)
}

function dropItem(index: number) {
  const item = current.value[index]
  if (item) releasePreview(item)
  set(current.value.filter((_, i) => i !== index))
}

function askRemove(index: number) {
  pendingIndex.value = index
  response.value = null
}

function cancelRemove() {
  pendingIndex.value = null
}

/** Id media (id di dalam `media`) dari sebuah item galeri. */
function mediaIdOf(item: unknown): number | null {
  if (isFile(item)) return null
  if (typeof item === 'string') return null
  const entry = item as GalleryItem
  const id = entry?.mediaId ?? entry?.id ?? null
  return typeof id === 'number' ? id : null
}

async function applyRemove() {
  const index = pendingIndex.value
  if (index === null) return
  const item = current.value[index]
  const mediaId = mediaIdOf(item)
  pendingIndex.value = null
  // Foto yang baru dipilih belum punya media di backend: cukup dilepas.
  if (mediaId === null) {
    dropItem(index)
    return
  }
  // Foto lama langsung dihapus dari backend, responsnya ditampilkan.
  deleting.value = true
  const ok = await deleteMedia('media', mediaId)
  deleting.value = false
  response.value = ok
    ? { type: 'ok', text: `Foto dihapus (media ${mediaId}).` }
    : { type: 'error', text: lastError.value || `Gagal menghapus foto (media ${mediaId}).` }
  // Hanya lepas dari daftar kalau benar-benar terhapus di backend.
  if (ok) dropItem(index)
}

function moveUp(index: number) {
  if (index === 0) return
  const next = [...current.value]
  const item = next.splice(index, 1)[0]!
  next.splice(index - 1, 0, item)
  set(next)
}

function moveDown(index: number) {
  if (index >= current.value.length - 1) return
  const next = [...current.value]
  const item = next.splice(index, 1)[0]!
  next.splice(index + 1, 0, item)
  set(next)
}

onBeforeUnmount(() => {
  objectUrls.value.forEach((url) => URL.revokeObjectURL(url))
  objectUrls.value.clear()
})
</script>

<template>
  <div class="space-y-3">
    <div v-if="current.length" class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="(item, index) in current"
        :key="index"
        class="relative group"
      >
        <div class="aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
          <img :src="previewOf(item)" :alt="`${label || 'Galeri'} ${index + 1}`" class="h-full w-full object-cover">
        </div>

        <div class="absolute inset-x-1 top-1 flex items-start justify-between gap-1 opacity-0 transition group-hover:opacity-100">
          <div class="flex gap-1 rounded-full bg-white/90 p-1 dark:bg-brand-900/90">
            <button type="button" class="text-slate-600 dark:text-slate-300" :disabled="disabled || index === 0" title="Geser ke kiri" @click="moveUp(index)">
              <UiIcon name="arrow-right" :size="14" style="transform: rotate(180deg)" />
            </button>
            <button type="button" class="text-slate-600 dark:text-slate-300" :disabled="disabled || index >= current.length - 1" title="Geser ke kanan" @click="moveDown(index)">
              <UiIcon name="arrow-right" :size="14" />
            </button>
          </div>
          <button type="button" class="rounded-full bg-white/90 p-1 text-red-600 dark:bg-brand-900/90" :disabled="disabled" title="Hapus" @click="askRemove(index)">
            <UiIcon name="close" :size="14" />
          </button>
        </div>

        <span
          v-if="isFile(item)"
          class="absolute bottom-1 left-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-medium text-white"
        >
          Baru
        </span>
      </div>

      <button
        v-if="!isFull"
        type="button"
        class="btn-outline flex aspect-square flex-col items-center justify-center gap-1 !py-3"
        :disabled="disabled"
        @click="fileInput?.click()"
      >
        <UiIcon name="download" :size="20" />
        <span class="text-xs">Tambah foto</span>
      </button>
    </div>

    <div v-else class="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center dark:border-white/10">
      <UiIcon name="document" :size="32" class="mx-auto text-slate-400" />
      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Belum ada foto</p>
      <button type="button" class="btn-outline mt-3" :disabled="disabled" @click="fileInput?.click()">
        Pilih foto
      </button>
    </div>

    <p class="text-xs text-slate-500">
      {{ current.length }} dari maksimal {{ max }} foto.
    </p>

    <p
      v-if="response"
      class="rounded-lg px-3 py-2 text-xs"
      :class="response.type === 'ok'
        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
        : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300'"
      role="status"
    >
      {{ response.text }}
    </p>
    <p v-else-if="deleting" class="text-xs text-slate-500">
      Menghapus foto...
    </p>

    <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="onFile">

    <Teleport to="body">
      <div v-if="pendingIndex !== null" class="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-brand-950">
          <h2 class="text-lg">
            Hapus foto ini?
          </h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Foto akan dihapus dari galeri dan berkasnya dihapus dari server.
          </p>
          <div class="mt-6 flex justify-end gap-2">
            <button type="button" class="btn-outline" :disabled="deleting" @click="cancelRemove">
              Batal
            </button>
            <button type="button" class="btn-accent" :disabled="deleting" @click="applyRemove">
              {{ deleting ? 'Menghapus...' : 'Ya, hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
