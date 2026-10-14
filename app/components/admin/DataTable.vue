<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'

defineProps<{
  columns: ColumnDef[]
  rows: Array<Record<string, unknown>>
  loading?: boolean
  error?: string
}>()

const emit = defineEmits<{
  edit: [id: string]
  remove: [row: Record<string, unknown>]
}>()

function rowId(row: Record<string, unknown>): string {
  return String(row.id ?? '')
}

function plain(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (Array.isArray(value)) return `${value.length}`
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>
    const primary = record.id ?? record.en ?? ''
    const secondary = record.en ?? record.id ?? ''
    if (typeof primary === 'string' && typeof secondary === 'string' && primary !== secondary) {
      return `${primary} · ${secondary}`
    }
    return String(primary)
  }
  return String(value)
}

function booleanText(value: unknown): string {
  return value ? 'Ya' : 'Tidak'
}

function dateText(value: unknown): string {
  if (!value) return '-'
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(date)
}

function statusClass(value: unknown): string {
  const text = String(value ?? '')
  if (['published', 'active', 'new', 'superadmin'].includes(text)) {
    return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
  }
  if (['draft', 'archived', 'editor'].includes(text)) {
    return 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
  }
  return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
}

function previewUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url
  const base = String(useRuntimeConfig().public.apiBase || '').replace(/\/+$/, '').replace(/\/api$/, '')
  return base ? `${base}${url.startsWith('/') ? '' : '/'}${url}` : url
}
</script>

<template>
  <div class="card overflow-hidden">
    <div v-if="error" class="border-b border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
      {{ error }}
    </div>

    <div v-if="loading" class="px-5 py-10 text-center text-sm text-slate-500">
      Memuat data...
    </div>

    <div v-else-if="!rows.length" class="px-5 py-10 text-center text-sm text-slate-500">
      Belum ada data.
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full min-w-[640px] text-left text-sm">
        <thead class="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/5">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 font-semibold"
              :class="column.width"
            >
              {{ column.label }}
            </th>
            <th class="w-28 px-4 py-3 text-right font-semibold">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="rowId(row)"
            class="border-b border-slate-100 transition last:border-0 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 align-middle"
              :class="column.width"
            >
              <img
                v-if="column.kind === 'image' && row[column.key]"
                :src="previewUrl(String(row[column.key]))"
                :alt="String(row[column.key])"
                class="h-12 w-16 rounded border border-slate-200 bg-white object-contain dark:border-white/10"
              >
              <span
                v-else-if="column.kind === 'status'"
                class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                :class="statusClass(row[column.key])"
              >
                {{ String(row[column.key] ?? '-') }}
              </span>
              <span
                v-else-if="column.kind === 'toggle'"
                class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                :class="row[column.key] ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 dark:bg-white/10'"
              >
                {{ booleanText(row[column.key]) }}
              </span>
              <span v-else-if="column.kind === 'date'" class="text-slate-600 dark:text-slate-300">
                {{ dateText(row[column.key]) }}
              </span>
              <span v-else-if="column.kind === 'number'" class="text-slate-600 dark:text-slate-300">
                {{ row[column.key] ?? '-' }}
              </span>
              <span v-else class="block max-w-md truncate text-slate-700 dark:text-slate-200" :title="plain(row[column.key])">
                {{ plain(row[column.key]) }}
              </span>
            </td>
            <td class="px-4 py-3 text-right">
              <div class="flex justify-end gap-1">
                <button
                  type="button"
                  class="btn-ghost !px-2.5 !py-1.5"
                  :title="'Ubah'"
                  aria-label="Ubah"
                  @click="emit('edit', rowId(row))"
                >
                  <UiIcon name="pencil" :size="16" />
                </button>
                <button
                  type="button"
                  class="btn-ghost !px-2.5 !py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                  :title="'Hapus'"
                  aria-label="Hapus"
                  @click="emit('remove', row)"
                >
                  <UiIcon name="trash" :size="16" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>