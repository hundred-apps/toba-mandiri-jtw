<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const fields: FieldDef[] = [
  { name: 'name', label: 'Nama perusahaan', kind: 'text', required: true },
  { name: 'quote', label: 'Kutipan/keterangan', kind: 'textarea', bilingual: true, rows: 3, help: 'Teks singkat di bawah nama, mis. bidang usaha.' },
  { name: 'image', label: 'Logo (SVG atau PNG transparan)', kind: 'image' }
]
</script>

<template>
  <AdminResourceForm
    resource="customers"
    label="Customer"
    singular="Customer"
    base-path="/admin/customers"
    :fields="fields"
  />
</template>