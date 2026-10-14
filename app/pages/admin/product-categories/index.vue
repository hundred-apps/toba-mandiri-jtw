<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const columns: ColumnDef[] = [
  { key: 'name', label: 'Nama', kind: 'bilingual' },
  { key: 'slug', label: 'Slug' }
]
</script>

<template>
  <AdminResourceList
    resource="product-categories"
    label="Kategori Produk"
    singular="Kategori"
    help="Kategori dipakai untuk mengelompokkan produk di katalog."
    base-path="/admin/product-categories"
    :columns="columns"
    cascade-resource="products"
    cascade-param="categoryId"
  />
</template>