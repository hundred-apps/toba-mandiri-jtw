<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const fields: FieldDef[] = [
  { name: 'name', label: 'Nama', kind: 'text', required: true },
  { name: 'email', label: 'Email', kind: 'text', required: true },
  { name: 'phone', label: 'Nomor telepon', kind: 'text', required: true, help: 'Format: 08xxxxxxxxxx atau 628xxxxxxxxxx' },
  { name: 'password', label: 'Password', kind: 'password', help: 'Kosongkan saat mengubah user yang sudah ada.' },
  { name: 'role', label: 'Peran', kind: 'select', options: [
    { value: 'superuser', label: 'Super User' },
    { value: 'admin', label: 'Admin' }
  ] }
]
</script>

<template>
  <AdminResourceForm
    resource="admin-users"
    label="User Admin"
    singular="User Admin"
    base-path="/admin/admin-users"
    :fields="fields"
  />
</template>