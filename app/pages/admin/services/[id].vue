<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const fields: FieldDef[] = [
  { name: 'title', label: 'Judul layanan', kind: 'text', bilingual: true, required: true },
  { name: 'slug', label: 'Slug URL', kind: 'slug', required: true },
  { name: 'icon', label: 'Ikon', kind: 'icon', help: 'Dipakai pada kartu layanan di beranda.' },
  { name: 'excerpt', label: 'Ringkasan', kind: 'textarea', bilingual: true, rows: 3, help: 'Tampil di kartu layanan.' },
  { name: 'body', label: 'Isi lengkap', kind: 'textarea', bilingual: true, rows: 10, help: 'Isi lengkap layanan.' },
  { name: 'image', label: 'Gambar layanan', kind: 'image' },
  { name: 'featured', label: 'Tampilkan menonjol', kind: 'toggle' }
]
</script>

<template>
  <AdminResourceForm
    resource="services"
    label="Layanan"
    singular="Layanan"
    base-path="/admin/services"
    :fields="fields"
  />
</template>