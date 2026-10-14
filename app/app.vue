<script setup lang="ts">
const { data: company } = useCompany()

useHead(() => ({
  link: [
    { rel: 'icon', type: 'image/png', href: company.value?.logo || '/favicon.ico' }
  ]
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
