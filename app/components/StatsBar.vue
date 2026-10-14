<script setup lang="ts">
import type { StatItem } from '~/types/content'

defineProps<{ items: StatItem[] }>()
</script>

<template>
  <section class="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-brand-950">
    <div class="container-page grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
      <div v-for="item in items" :key="item.id" class="text-center lg:text-left">
        <p class="font-display text-3xl font-black text-brand-600 dark:text-brand-300 sm:text-4xl">
          {{ item.value }}
        </p>
        <p class="mt-1 text-sm text-ink-soft dark:text-slate-400">
          {{ pick(item.label) }}
        </p>
      </div>
    </div>
  </section>
</template>