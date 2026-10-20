<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'

/** Filter opsional: dropdown yang menyaring list berdasarkan resource lain. */
interface FilterDef {
  resource: string
  param: string
  labelKey: string
  label: string
  placeholder: string
}

const props = withDefaults(defineProps<{
  resource: string
  label: string
  singular: string
  basePath: string
  columns: ColumnDef[]
  help?: string
  readOnly?: boolean
  defaultSort?: string
  filter?: FilterDef
  /** Resource anak yang ikut terhapus saat baris ini dihapus. */
  cascadeResource?: string
  cascadeParam?: string
}>(), {})

const router = useRouter()
const route = useRoute()
const { list, remove, lastError } = useAdminApi()

const rows = ref<Array<Record<string, unknown>>>([])
const total = ref(0)
const loading = ref(true)
const keyword = ref('')
const page = ref(1)
const limit = 20
const pendingDelete = ref<Record<string, unknown> | null>(null)
const deleting = ref(false)
const cascadeIds = ref<string[]>([])
const loadingDeleteInfo = ref(false)
const filterOptions = ref<Array<Record<string, unknown>>>([])
const filterValue = ref(String((props.filter && route.query[props.filter.param]) || ''))

async function load() {
  loading.value = true
  const result = await list<Record<string, unknown>>(props.resource, {
    q: keyword.value || undefined,
    page: page.value,
    limit,
    sort: props.defaultSort,
    order: 'asc',
    ...(props.filter && filterValue.value ? { [props.filter.param]: filterValue.value } : {})
  })
  rows.value = result.data
  total.value = result.total
  loading.value = false
}

async function loadFilterOptions() {
  if (!props.filter) return
  const result = await list<Record<string, unknown>>(props.filter.resource, { limit: 200, sort: 'sortOrder', order: 'asc' })
  filterOptions.value = result.data
}

/** Label ringkas untuk nilai bilingual { id, en }. */
function shortLabel(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    return String(record.id ?? record.en ?? '')
  }
  return String(value)
}

const newLink = computed(() => {
  const query = props.filter && filterValue.value ? { [props.filter.param]: filterValue.value } : {}
  return { path: `${props.basePath}/new`, query }
})

const activeFilterLabel = computed(() => {
  if (!props.filter) return filterValue.value
  const found = filterOptions.value.find((row) => String(row.id) === filterValue.value)
  return shortLabel(found?.name) || filterValue.value
})

onMounted(async () => {
  await loadFilterOptions()
  await load()
})

watch(keyword, () => { page.value = 1; load() })
watch(filterValue, () => { page.value = 1; load() })
watch(page, () => { load(); window.scrollTo({ top: 0, behavior: 'smooth' }) })

/**
 * Buka modal hapus. Untuk entitas dengan anak (cascade), ambil dulu daftar
 * anak supaya pengguna tahu bahwa baris-baris itu ikut terhapus.
 */
async function requestDelete(row: Record<string, unknown>) {
  pendingDelete.value = row
  cascadeIds.value = []
  if (!props.cascadeResource || !props.cascadeParam) return
  loadingDeleteInfo.value = true
  const result = await list<Record<string, unknown>>(props.cascadeResource, {
    [props.cascadeParam]: String(row.id),
    limit: 200
  })
  cascadeIds.value = result.data.map((child) => String(child.id))
  loadingDeleteInfo.value = false
}

async function confirmDelete() {
  if (!pendingDelete.value) return
  deleting.value = true
  // Backend menolak hapus induk yang masih punya anak, jadi anak dihapus dulu.
  for (const childId of cascadeIds.value) {
    if (props.cascadeResource) await remove(props.cascadeResource, childId)
  }
  const done = await remove(props.resource, String(pendingDelete.value.id ?? ''))
  deleting.value = false
  pendingDelete.value = null
  cascadeIds.value = []
  if (done) await load()
}

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / limit)))

  useSeoMeta({ title: () => `${props.label} | CMS TMS` })
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl">
          {{ label }}
        </h1>
        <p v-if="help" class="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {{ help }}
        </p>
        <p class="mt-1 text-xs text-slate-500">
          {{ total }} data
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <select
          v-if="filter"
          v-model="filterValue"
          class="field !w-56"
        >
          <option value="">
            {{ filter.placeholder }}
          </option>
          <option v-for="option in filterOptions" :key="String(option.id)" :value="String(option.id)">
            {{ shortLabel(option[filter.labelKey]) || option.slug }}
          </option>
        </select>
        <input
          v-model="keyword"
          type="search"
          class="field !w-64"
          placeholder="Cari data..."
        >
        <button type="button" class="btn-outline !py-2" :disabled="loading" @click="load">
          <UiIcon name="check" :size="16" />
          Muat ulang
        </button>
        <NuxtLink v-if="!readOnly" :to="newLink" class="btn-primary !py-2">
          Tambah {{ singular.toLowerCase() }}
        </NuxtLink>
      </div>
    </div>

    <p v-if="filter && filterValue" class="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-white/5 dark:text-slate-300">
      Menampilkan {{ singular.toLowerCase() }} pada {{ filter.label }}
      <strong>{{ activeFilterLabel }}</strong>.
      <button type="button" class="ml-2 text-brand-700 underline dark:text-brand-300" @click="filterValue = ''">
        Tampilkan semua
      </button>
    </p>

    <AdminDataTable
      :columns="columns"
      :rows="rows"
      :loading="loading"
      :error="lastError"
      @edit="(id) => router.push(`${basePath}/${id}`)"
      @remove="requestDelete"
    />

    <div v-if="pageCount > 1" class="flex items-center justify-between text-sm">
      <button type="button" class="btn-outline !py-2" :disabled="page <= 1" @click="page -= 1">
        Sebelumnya
      </button>
      <span class="text-slate-500">
        Halaman {{ page }} dari {{ pageCount }}
      </span>
      <button type="button" class="btn-outline !py-2" :disabled="page >= pageCount" @click="page += 1">
        Berikutnya
      </button>
    </div>

    <Teleport to="body">
      <div v-if="pendingDelete" class="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-brand-950">
          <h2 class="text-lg">
            Hapus {{ singular.toLowerCase() }}?
          </h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Tindakan ini tidak bisa dibatalkan di backend. Lanjutkan hanya jika yakin.
          </p>
          <div v-if="cascadeResource" class="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
            <p v-if="loadingDeleteInfo">
              Memeriksa data terkait...
            </p>
            <p v-else-if="cascadeIds.length">
              Baris ini berisi <strong>{{ cascadeIds.length }} data terkait</strong>. Semuanya akan ikut terhapus.
            </p>
            <p v-else>
              Tidak ada data terkait. Baris akan langsung dihapus.
            </p>
          </div>
          <div class="mt-6 flex justify-end gap-2">
            <button type="button" class="btn-outline" :disabled="deleting" @click="pendingDelete = null">
              Batal
            </button>
            <button type="button" class="btn-accent" :disabled="deleting || loadingDeleteInfo" @click="confirmDelete">
              {{ deleting ? 'Menghapus...' : 'Ya, hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
