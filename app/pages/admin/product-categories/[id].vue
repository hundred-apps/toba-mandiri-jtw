<script setup lang="ts">
import type { ColumnDef, FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const fields: FieldDef[] = [
  { name: 'name', label: 'Nama kategori', kind: 'text', bilingual: true, required: true },
  { name: 'slug', label: 'Slug URL', kind: 'slug', required: true },
  { name: 'description', label: 'Deskripsi', kind: 'textarea', bilingual: true, required: true, rows: 4 },
  { name: 'icon', label: 'Ikon', kind: 'icon' }
]

const route = useRoute()
const router = useRouter()
const { list, remove, lastError } = useAdminApi()

const categoryId = computed(() => String(route.params.id || ''))
const isNew = computed(() => categoryId.value === 'new')

const productColumns: ColumnDef[] = [
  { key: 'image', label: 'Gambar', kind: 'image', width: 'w-16' },
  { key: 'name', label: 'Nama produk', kind: 'bilingual' },
  { key: 'sku', label: 'SKU', width: 'w-32' },
  { key: 'status', label: 'Status', kind: 'toggle', width: 'w-24' }
]

const rows = ref<Array<Record<string, unknown>>>([])
const loading = ref(false)
const keyword = ref('')
const pendingDelete = ref<Record<string, unknown> | null>(null)
const deleting = ref(false)

async function loadProducts() {
  loading.value = true
  const result = await list<Record<string, unknown>>('products', {
    categoryId: Number(categoryId.value),
    q: keyword.value || undefined,
    limit: 50
  })
  rows.value = result.data
  loading.value = false
}

async function requestDelete(row: Record<string, unknown>) {
  pendingDelete.value = row
}

async function confirmDelete() {
  if (!pendingDelete.value) return
  deleting.value = true
  const done = await remove('products', String(pendingDelete.value.id ?? ''))
  deleting.value = false
  pendingDelete.value = null
  if (done) await loadProducts()
}

onMounted(() => {
  if (!isNew.value) loadProducts()
})

watch(categoryId, () => {
  if (!isNew.value) loadProducts()
})
</script>

<template>
  <AdminResourceForm
    resource="product-categories"
    label="Kategori Produk"
    singular="Kategori"
    base-path="/admin/product-categories"
    :fields="fields"
    cascade-resource="products"
    cascade-param="categoryId"
  >
    <template #after="{ isNew: creating }">
      <section v-if="!creating" class="card space-y-4 p-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-lg">
              Produk dalam kategori ini
            </h2>
            <p class="text-xs text-slate-500">
              {{ rows.length }} produk
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <input
              v-model="keyword"
              type="search"
              class="field !w-56"
              placeholder="Cari produk..."
              @keyup.enter="loadProducts"
            >
            <NuxtLink :to="`/admin/products/new?categoryId=${categoryId}`" class="btn-primary !py-2">
              Tambah produk
            </NuxtLink>
          </div>
        </div>

        <AdminDataTable
          :columns="productColumns"
          :rows="rows"
          :loading="loading"
          :error="lastError"
          @edit="(id) => router.push(`/admin/products/${id}`)"
          @remove="requestDelete"
        />
      </section>
    </template>
  </AdminResourceForm>

  <Teleport to="body">
    <div v-if="pendingDelete" class="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-brand-950">
        <h2 class="text-lg">
          Hapus produk?
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Tindakan ini tidak bisa dibatalkan di backend.
        </p>
        <div class="mt-6 flex justify-end gap-2">
          <button type="button" class="btn-outline" :disabled="deleting" @click="pendingDelete = null">
            Batal
          </button>
          <button type="button" class="btn-accent" :disabled="deleting" @click="confirmDelete">
            {{ deleting ? 'Menghapus...' : 'Ya, hapus' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>