<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const columns: ColumnDef[] = [
  { key: 'image', label: 'Gambar', kind: 'image', width: 'w-20' },
  { key: 'name', label: 'Nama', kind: 'text' }
]
</script>

<template>
  <AdminResourceList
    resource="customers"
    label="Customer"
    singular="Customer"
    help="Logo perusahaan yang menampilkan di beranda."
    base-path="/admin/customers"
    :columns="columns"
  />
</template>