<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const fields: FieldDef[] = [
  { name: 'name', label: 'Nama produk', kind: 'text', bilingual: true, required: true },
  { name: 'slug', label: 'Slug URL', kind: 'slug', required: true },
  { name: 'sku', label: 'SKU', kind: 'text', required: true, help: 'Kode produk unik (mis. LUB-001)' },
  {
    name: 'categoryId',
    label: 'Kategori',
    kind: 'select',
    required: true,
    optionsFrom: { resource: 'product-categories', labelKey: 'name', valueKey: 'id' }
  },
  { name: 'packaging', label: 'Kemasan', kind: 'text', bilingual: true, required: true, placeholder: { id: 'Contoh: Drum 200L', en: 'e.g. Drum 200L' } },
  { name: 'weight', label: 'Berat/Volume (liter/kg)', kind: 'text', bilingual: true, required: true, placeholder: { id: 'Contoh: 200 liter', en: 'e.g. 200 liters' } },
  { name: 'description', label: 'Deskripsi', kind: 'textarea', bilingual: true, rows: 4, help: 'Deskripsi singkat produk' },
  { name: 'spec', label: 'Spesifikasi teknis', kind: 'pair', bilingual: true, help: 'Baris label dan nilai, misalnya Viskositas / ISO VG 68' },
  { name: 'image', label: 'Foto produk', kind: 'image' },
  { name: 'tdsFile', label: 'File TDS (Technical Data Sheet)', kind: 'image', help: 'Upload file PDF TDS' },
  { name: 'msdsFile', label: 'File MSDS (Material Safety Data Sheet)', kind: 'image', help: 'Upload file PDF MSDS' },
  { name: 'status', label: 'Status', kind: 'toggle', help: 'Aktifkan untuk menampilkan produk di katalog' }
]

async function saveSpecs(result: Record<string, unknown>, model: Record<string, unknown>) {
  const productId = Number(result.id)
  if (!productId) return
  const { list, remove, create } = useAdminApi()
  const existing = await list<Record<string, unknown>>('product-spec', { productId, limit: 200 })
  for (const row of existing.data) {
    await remove('product-spec', String(row.id ?? ''))
  }
  const specs = Array.isArray(model.spec) ? model.spec as Array<{ label: { id: string; en: string }; value: { id: string; en: string } }> : []
  for (const spec of specs) {
    if (!spec.label?.id && !spec.label?.en && !spec.value?.id && !spec.value?.en) continue
    await create('product-spec', {
      productId,
      labelId: spec.label?.id || '',
      labelEn: spec.label?.en || '',
      valueId: spec.value?.id || '',
      valueEn: spec.value?.en || ''
    })
  }
}
</script>

<template>
  <AdminResourceForm
    resource="products"
    label="Produk"
    singular="Produk"
    base-path="/admin/products"
    :fields="fields"
    prefill-field="categoryId"
    prefill-query="categoryId"
    :after-save="saveSpecs"
  />
</template>