<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const fields: FieldDef[] = [
  { name: 'title', label: 'Judul', kind: 'text', bilingual: true, required: true },
  { name: 'slug', label: 'Slug URL', kind: 'slug', required: true },
  { name: 'excerpt', label: 'Ringkasan', kind: 'textarea', bilingual: true, required: true, rows: 3, help: 'Tampil di kartu daftar artikel' },
  { name: 'body', label: 'Isi (HTML)', kind: 'html', bilingual: true, rows: 16 },
  { name: 'coverMedia', label: 'Gambar cover', kind: 'image' },
  { name: 'author', label: 'Penulis', kind: 'text', help: 'Nama penulis artikel' },
  { name: 'category', label: 'Kategori', kind: 'text', bilingual: true, help: 'Kategori artikel (mis. Berita, News)' },
  { name: 'tags', label: 'Tag', kind: 'tags', help: 'Pisahkan dengan koma, misalnya: "oli, diesel, pertamina"' },
  { name: 'publishedAt', label: 'Tanggal terbit', kind: 'date' },
  { name: 'status', label: 'Status', kind: 'toggle', help: 'Aktifkan untuk memublikasikan artikel' }
]
</script>

<template>
  <AdminResourceForm
    resource="articles"
    label="Artikel"
    singular="Artikel"
    base-path="/admin/articles"
    :fields="fields"
  />
</template>