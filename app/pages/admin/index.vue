<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { list, connected } = useAdminApi()

const countable = [
  { key: 'product-categories', label: 'Kategori Produk', icon: 'delivery' },
  { key: 'products', label: 'Produk', icon: 'lab' },
  { key: 'services', label: 'Layanan', icon: 'lab' },
  { key: 'articles', label: 'Artikel', icon: 'document' },
  { key: 'customers', label: 'Customer', icon: 'factory' }
]
const counts = reactive<Record<string, number | null>>({})
const loading = ref(true)

async function load() {
  loading.value = true
  for (const item of countable) {
    const result = await list(item.key, { limit: 1 })
    counts[item.key] = result.total
  }
  loading.value = false
}

await load()

useSeoMeta({ title: 'Dashboard CMS | PT. Toba Mandiri Sukses' })
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl">
      Dashboard
    </h1>
    <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
      Ringkasan isi website. Semua perubahan disimpan lewat backend.
    </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink
        v-for="entity in countable"
        :key="entity.key"
        :to="`/admin/${entity.key}`"
        class="card flex items-center justify-between p-5 transition hover:-translate-y-0.5 hover:border-brand-300"
      >
        <span>
          <span class="block text-xs uppercase tracking-wider text-slate-500">{{ entity.label }}</span>
          <span class="mt-1 block font-display text-3xl font-black text-brand-800 dark:text-brand-200">
            {{ loading ? '-' : (counts[entity.key] ?? '-') }}
          </span>
        </span>
        <UiIcon :name="entity.icon" :size="26" class="text-brand-400" />
      </NuxtLink>
    </div>

    <div class="card p-6">
      <h2 class="text-base">
        Status koneksi
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        <template v-if="connected">
          Backend menjawab normal. Form, tombol simpan, dan hapus sudah aktif.
        </template>
        <template v-else>
          Backend belum menjawab. Isi <code class="font-mono">NUXT_PUBLIC_API_BASE</code> di
          <code class="font-mono">web/.env</code>. Daftar endpoint yang dibutuhkan ada di README.md bagian 6.
        </template>
      </p>
    </div>
  </div>
</template>