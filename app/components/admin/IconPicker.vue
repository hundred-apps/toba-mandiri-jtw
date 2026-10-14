<script setup lang="ts">
import type { IconifyJSON } from '@iconify/types'

const props = defineProps<{ modelValue: string; disabled?: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

/** Koleksi Iconify (Icones) yang dibundel lokal via @iconify-json/*. */
const COLLECTIONS = [
  { prefix: 'lucide', label: 'Lucide' },
  { prefix: 'mdi', label: 'Material' },
  { prefix: 'tabler', label: 'Tabler' }
]

const LOADERS: Record<string, () => Promise<{ icons: IconifyJSON }>> = {
  lucide: () => import('@iconify-json/lucide'),
  mdi: () => import('@iconify-json/mdi'),
  tabler: () => import('@iconify-json/tabler')
}

const loading = ref(false)
const ready = ref(false)
const catalog = ref<Record<string, string[]>>({})
const active = ref('lucide')
const query = ref('')

const current = computed<string>({
  get: () => props.modelValue || '',
  set: (value) => emit('update:modelValue', value)
})

const results = computed<string[]>(() => {
  const list = catalog.value[active.value] || []
  const q = query.value.trim().toLowerCase()
  const base = q ? list.filter((name) => name.includes(q)) : list
  return base.slice(0, 200)
})

async function load() {
  if (ready.value || loading.value) return
  loading.value = true
  const next: Record<string, string[]> = {}
  for (const collection of COLLECTIONS) {
    const loader = LOADERS[collection.prefix]
    if (!loader) continue
    try {
      const mod = await loader()
      next[collection.prefix] = Object.keys(mod.icons.icons)
    } catch {
      next[collection.prefix] = []
    }
  }
  catalog.value = next
  loading.value = false
  ready.value = true
}

onMounted(load)
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center gap-3">
      <span class="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-slate-200 text-brand-700 dark:border-white/10 dark:text-brand-200">
        <UiIcon v-if="current" :name="current" :size="22" />
        <UiIcon v-else name="target" :size="22" class="text-slate-400" />
      </span>
      <input
        v-model="current"
        type="text"
        class="field"
        placeholder="mis. lucide:truck"
        :disabled="disabled"
      >
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="collection in COLLECTIONS"
        :key="collection.prefix"
        type="button"
        class="rounded-full px-3 py-1 text-xs font-semibold transition disabled:opacity-60"
        :class="
          active === collection.prefix
            ? 'bg-brand-700 text-white'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300'
        "
        :disabled="disabled"
        @click="active = collection.prefix"
      >
        {{ collection.label }}
      </button>
    </div>

    <input
      v-model="query"
      type="search"
      class="field"
      placeholder="Cari ikon..."
      :disabled="disabled"
    >

    <p v-if="loading" class="text-xs text-slate-500">
      Memuat katalog ikon...
    </p>
    <div
      v-else-if="results.length"
      class="grid max-h-56 grid-cols-8 gap-1 overflow-y-auto rounded-lg border border-slate-200 p-2 dark:border-white/10"
    >
      <button
        v-for="name in results"
        :key="name"
        type="button"
        class="grid h-9 w-9 place-items-center rounded-md border transition disabled:opacity-60"
        :class="
          current === `${active}:${name}`
            ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200'
            : 'border-transparent text-slate-500 hover:border-brand-300 hover:text-brand-700 dark:text-slate-300'
        "
        :title="`${active}:${name}`"
        :disabled="disabled"
        @click="current = `${active}:${name}`"
      >
        <UiIcon :name="`${active}:${name}`" :size="18" />
      </button>
    </div>
    <p v-else class="text-xs text-slate-500">
      Tidak ada ikon yang cocok.
    </p>
  </div>
</template>
