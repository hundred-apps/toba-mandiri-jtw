<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'
import { useAdminAuth } from '~/composables/useAdminAuth'

definePageMeta({ layout: 'admin' })

const router = useRouter()
const { profile } = useAdminAuth()
const isSuperUser = computed(() => profile.value?.role === 'superuser')

onMounted(() => {
  if (!isSuperUser.value && profile.value) {
    router.replace(`/admin/admin-users/${profile.value.id}`)
  }
})

const columns: ColumnDef[] = [
  { key: 'name', label: 'Nama' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Telepon', width: 'w-40' },
  { key: 'role', label: 'Peran', kind: 'status', width: 'w-32' }
]
</script>

<template>
  <AdminResourceList
    resource="admin-users"
    label="User Admin"
    singular="User Admin"
    help="User yang bisa login ke panel ini."
    base-path="/admin/admin-users"
    :columns="columns"
    :read-only="!isSuperUser"
  />
</template>