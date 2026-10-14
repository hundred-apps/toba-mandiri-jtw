<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const columns: ColumnDef[] = [
  { key: 'coverMedia', label: 'Cover', kind: 'image', width: 'w-20' },
  { key: 'title', label: 'Judul', kind: 'bilingual' },
  { key: 'category', label: 'Kategori', kind: 'bilingual', width: 'w-36' },
  { key: 'publishedAt', label: 'Terbit', kind: 'date', width: 'w-40' },
  { key: 'status', label: 'Status', kind: 'toggle', width: 'w-28' }
]
</script>

<template>
  <AdminResourceList
    resource="articles"
    label="Artikel"
    singular="Artikel"
    help="Berita dan artikel yang tampil di halaman blog publik."
    base-path="/admin/articles"
    default-sort="publishedAt"
    :columns="columns"
  />
</template>