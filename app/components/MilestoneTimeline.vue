<script setup lang="ts">
import type { HomeMilestone } from '~/composables/useMilestones'

defineProps<{ items: HomeMilestone[] }>()
</script>

<template>
  <ol class="relative space-y-8 border-l-2 border-brand-100 pl-8 dark:border-white/10">
    <li v-for="(item, index) in items" :key="index" class="relative">
      <span class="absolute -left-[2.35rem] grid h-8 w-8 place-items-center rounded-full bg-brand-700 font-display text-xs font-bold text-white">
        {{ item.year.slice(-2) }}
      </span>
      <p class="font-display text-2xl font-black text-brand-600 dark:text-brand-300">
        {{ item.year }}
      </p>
      <h3 class="mt-1 text-lg">
        {{ item.title }}
      </h3>
      <p class="prose-lkr mt-2 text-sm">
        {{ item.description }}
      </p>
    </li>
  </ol>
</template>
