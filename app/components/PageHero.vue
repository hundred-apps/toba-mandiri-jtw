<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  intro?: string
  image?: string
}>()
</script>

<template>
  <section class="relative overflow-hidden border-b border-slate-200 bg-brand-50 dark:border-white/10 dark:bg-brand-900/40">
    <div class="absolute inset-0 bg-[radial-gradient(60%_100%_at_80%_0%,rgb(195_18_23/0.14),transparent)]" />
    <div class="container-page relative grid gap-8 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p v-if="eyebrow" class="eyebrow">
          {{ eyebrow }}
        </p>
        <h1 class="mt-3 text-4xl sm:text-5xl">
          {{ title }}
        </h1>
        <p v-if="intro" class="prose-lkr mt-5 max-w-2xl text-base sm:text-lg">
          {{ intro }}
        </p>
        <slot />
      </div>
      <div v-if="image" class="hidden lg:block">
        <img :src="image" :alt="title" class="w-full rounded-2xl" loading="lazy">
      </div>
    </div>
  </section>
</template>