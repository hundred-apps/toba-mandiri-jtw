<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const columns: ColumnDef[] = [
  { key: 'image', label: 'Gambar', kind: 'image', width: 'w-20' },
  { key: 'name', label: 'Nama produk', kind: 'bilingual' },
  { key: 'sku', label: 'SKU', width: 'w-32' },
  { key: 'packaging', label: 'Kemasan', width: 'w-32' },
  { key: 'weight', label: 'Berat/Volume', width: 'w-36' },
  { key: 'status', label: 'Status', kind: 'toggle', width: 'w-28' }
]
</script>

<template>
  <AdminResourceList
    resource="products"
    label="Produk"
    singular="Produk"
    help="Katalog produk yang tampil di halaman produk publik."
    base-path="/admin/products"
    default-sort="sortOrder"
    :columns="columns"
    :filter="{
      resource: 'product-categories',
      param: 'categoryId',
      labelKey: 'name',
      label: 'Kategori',
      placeholder: 'Semua kategori'
    }"
  />
</template>