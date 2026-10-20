<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

const props = withDefaults(defineProps<{
  resource: string
  label: string
  singular: string
  basePath: string
  fields: FieldDef[]
  /** Resource anak yang ikut terhapus saat baris ini dihapus. */
  cascadeResource?: string
  cascadeParam?: string
  /** Field yang diisi otomatis dari query saat membuat baru (mis. categoryId). */
  prefillField?: string
  prefillQuery?: string
  /** Callback setelah simpan berhasil. Terima { result, model } untuk aksi lanjutan. */
  afterSave?: (result: Record<string, unknown>, model: Record<string, unknown>) => Promise<void>
}>(), {})

const route = useRoute()
const router = useRouter()
const { get, list, create, update, remove, lastError } = useAdminApi()

const rawId = computed(() => String(route.params.id || ''))
const isNew = computed(() => rawId.value === 'new')

const model = ref<Record<string, unknown>>({})
const loading = ref(!isNew.value)
const saving = ref(false)
const deleteOpen = ref(false)
const deleting = ref(false)
const notice = ref<{ type: 'ok' | 'error'; text: string } | null>(null)

/** Nilai awal dari definisi field supaya field baru tidak undefined. */
function emptyValue(field: FieldDef): unknown {
  switch (field.kind) {
    case 'toggle': return false
    case 'number': return 0
    case 'repeater': return []
    case 'pair': return []
    case 'tags': return []
    case 'image': return ''
    case 'password': return ''
    default:
      return field.bilingual ? { id: '', en: '' } : ''
  }
}

function defaults(): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const field of props.fields) result[field.name] = emptyValue(field)
  return result
}

onMounted(async () => {
  model.value = defaults()
  if (isNew.value && props.prefillField && props.prefillQuery && route.query[props.prefillQuery]) {
    model.value[props.prefillField] = route.query[props.prefillQuery]
  }
  if (!isNew.value) {
    const row = await get<Record<string, unknown>>(props.resource, rawId.value)
    if (row) model.value = { ...defaults(), ...row }
  }
  loading.value = false
})

async function save() {
  notice.value = null
  saving.value = true
  const payload = { ...model.value }
  delete payload.spec
  const result = isNew.value
    ? await create<Record<string, unknown>>(props.resource, payload)
    : await update<Record<string, unknown>>(props.resource, rawId.value, payload)
  saving.value = false

  if (result === null) {
    notice.value = { type: 'error', text: lastError.value || 'Gagal menyimpan data.' }
    return
  }

  if (props.afterSave) {
    await props.afterSave(result, model.value)
  }

  notice.value = { type: 'ok', text: isNew.value ? 'Data dibuat.' : 'Perubahan disimpan.' }
  await router.push(props.basePath)
}

/**
 * Hapus entitas. Khusus induk dengan anak (cascade), data anak dihapus dulu
 * karena backend menolak hapus induk selama masih berisi anak.
 */
async function confirmDestroy() {
  if (isNew.value) return
  deleting.value = true
  if (props.cascadeResource && props.cascadeParam) {
    const children = await list<Record<string, unknown>>(props.cascadeResource, {
      [props.cascadeParam]: Number(rawId.value),
      limit: 200
    })
    for (const child of children.data) {
      await remove(props.cascadeResource, String(child.id ?? ''))
    }
  }
  const done = await remove(props.resource, rawId.value)
  deleting.value = false
  deleteOpen.value = false
  if (done) {
    await router.push(props.basePath)
  } else {
    notice.value = { type: 'error', text: lastError.value || 'Gagal menghapus data.' }
  }
}

  useSeoMeta({ title: () => `${isNew.value ? 'Tambah' : 'Ubah'} ${props.singular} | CMS TMS` })
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <NuxtLink :to="basePath" class="text-sm text-brand-700 hover:underline dark:text-brand-300">
          &larr; {{ label }}
        </NuxtLink>
        <h1 class="mt-1 text-2xl">
          {{ isNew ? `Tambah ${singular.toLowerCase()}` : `Ubah ${singular.toLowerCase()}` }}
        </h1>
        <p v-if="!isNew" class="text-xs text-slate-500">
          ID {{ rawId }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button v-if="!isNew" type="button" class="btn-ghost !px-3 !py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10" :title="'Hapus'" aria-label="Hapus" @click="deleteOpen = true">
          <UiIcon name="trash" :size="16" />
        </button>
        <button type="button" class="btn-outline" :disabled="saving" @click="router.push(basePath)">
          Batal
        </button>
        <button type="button" class="btn-primary" :disabled="saving || loading" @click="save">
          {{ saving ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
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
      Memuat data...
    </div>

    <form v-else class="card space-y-6 p-6">
      <AdminField
        v-for="field in fields"
        :key="field.name"
        v-model="model[field.name]"
        :field="field"
      />
    </form>

    <slot name="after" :id="rawId" :is-new="isNew" />

    <Teleport to="body">
      <div v-if="deleteOpen" class="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-brand-950">
          <h2 class="text-lg">
            Hapus {{ singular.toLowerCase() }}?
          </h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Tindakan ini tidak bisa dibatalkan. Lanjutkan hanya jika yakin.
          </p>
          <div v-if="cascadeResource" class="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
            Data terkait ikut terhapus bersama baris ini.
          </div>
          <div class="mt-6 flex justify-end gap-2">
            <button type="button" class="btn-outline" :disabled="deleting" @click="deleteOpen = false">
              Batal
            </button>
            <button type="button" class="btn-accent" :disabled="deleting" @click="confirmDestroy">
              {{ deleting ? 'Menghapus...' : 'Ya, hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>