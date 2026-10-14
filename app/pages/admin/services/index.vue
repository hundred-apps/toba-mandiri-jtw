<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const columns: ColumnDef[] = [
  { key: 'image', label: 'Gambar', kind: 'image', width: 'w-20' },
  { key: 'title', label: 'Judul', kind: 'bilingual' },
  { key: 'icon', label: 'Ikon', width: 'w-28' },
  { key: 'featured', label: 'Menonjol', kind: 'toggle', width: 'w-24' }
]
</script>

<template>
  <AdminResourceList
    resource="services"
    label="Layanan"
    singular="Layanan"
    help="Fitur layanan tambahan yang ditawarkan."
    base-path="/admin/services"
    default-sort="sortOrder"
    :columns="columns"
  />
</template>