<script setup lang="ts">
const { data: settings } = await useCompany()
const { locale } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value }
}))
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader :settings="settings" />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter :settings="settings" />
    <WhatsappFab :settings="settings" />
  </div>
</template>