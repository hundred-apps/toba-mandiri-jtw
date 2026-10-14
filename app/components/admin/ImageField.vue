<script setup lang="ts">
/**
 * Pilih gambar.
 *
 * Backend LKR tidak punya endpoint upload terpisah: berkas `media` dikirim
 * langsung sebagai multipart pada request `-create`. Jadi komponen ini hanya
 * menyimpan File di model; useAdminApi/buildPayload yang mengirimnya.
 */

const props = defineProps<{
  modelValue?: unknown
  label?: string
  disabled?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: unknown] }>()

const fileInput = ref<HTMLInputElement | null>(null)
const objectUrl = ref('')

const previewBase = computed(() => {
  const config = useRuntimeConfig()
  return String(config.public.apiBase || '').replace(/\/+$/, '').replace(/\/api$/, '')
})

const current = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isFile = computed(() => current.value instanceof File)
const existingUrl = computed(() => (typeof current.value === 'string' ? current.value : ''))

const previewSrc = computed(() => {
  if (isFile.value) return objectUrl.value
  const url = existingUrl.value
  if (!url) return ''
  if (/^https?:\/\//.test(url)) return url
  return `${previewBase.value}${url.startsWith('/') ? '' : '/'}${url}`
})

const fileName = computed(() => (isFile.value ? (current.value as File).name : ''))

function onFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  if (objectUrl.value) URL.revokeObjectURL(objectUrl.value)
  objectUrl.value = URL.createObjectURL(file)
  current.value = file
}

function remove() {
  if (objectUrl.value) URL.revokeObjectURL(objectUrl.value)
  objectUrl.value = ''
  current.value = ''
}

onBeforeUnmount(() => {
  if (objectUrl.value) URL.revokeObjectURL(objectUrl.value)
})
</script>

<template>
  <div class="space-y-2">
    <div class="flex flex-wrap items-center gap-3">
      <div
        class="grid h-20 w-28 place-items-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5"
      >
        <img v-if="previewSrc" :src="previewSrc" :alt="label || 'Gambar'" class="h-full w-full object-contain">
        <span v-else class="text-xs text-slate-400">
          <UiIcon name="document" :size="22" />
        </span>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="btn-outline !py-2"
          :disabled="disabled"
          @click="fileInput?.click()"
        >
          {{ isFile ? 'Ganti berkas' : 'Pilih berkas' }}
        </button>
        <button v-if="current" type="button" class="btn-ghost !py-2 text-red-600" :disabled="disabled" @click="remove">
          Hapus
        </button>
      </div>

      <input ref="fileInput" type="file" accept="image/*,application/pdf" class="hidden" @change="onFile">
    </div>

    <p v-if="isFile" class="text-xs text-emerald-600 dark:text-emerald-400">
      Berkas siap dikirim: {{ fileName }}
    </p>
    <p v-else-if="existingUrl" class="text-xs text-slate-500">
      {{ existingUrl }}
    </p>
    <p v-else class="text-xs text-slate-400">
      Belum ada gambar. Berkas dikirim saat data disimpan.
    </p>
  </div>
</template>
