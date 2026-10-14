<script setup lang="ts">
import type { CustomerItem } from '~/types/content'

defineProps<{ items: CustomerItem[] }>()
</script>

<template>
  <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <li
      v-for="item in items"
      :key="item.id"
      class="card flex items-center gap-4 p-5"
    >
      <span class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-brand-50 text-xs font-bold text-brand-700 dark:bg-white/10 dark:text-brand-200">
        <img v-if="item.logo" :src="item.logo" :alt="item.name" class="h-full w-full object-contain p-2" loading="lazy">
        <span v-else>{{ item.name.slice(0, 2).toUpperCase() }}</span>
      </span>
      <span>
        <span class="block font-semibold text-brand-900 dark:text-white">{{ item.name }}</span>
        <span class="block text-xs text-ink-soft dark:text-slate-400">{{ pick(item.industry) }}</span>
      </span>
    </li>
  </ul>
</template>