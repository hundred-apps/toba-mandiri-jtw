<script setup lang="ts">
import type { TestimonialItem } from '~/types/content'

defineProps<{ items: TestimonialItem[] }>()
</script>

<template>
  <div v-if="items.length" class="grid gap-5 lg:grid-cols-3">
    <figure
      v-for="item in items"
      :key="item.id"
      class="card flex flex-col p-6"
    >
      <div class="flex gap-0.5 text-amber-500" :aria-label="`${item.rating} / 5`">
        <span v-for="star in 5" :key="star" :class="star <= (item.rating || 5) ? 'opacity-100' : 'opacity-25'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3 6.6 7 .9-5.1 4.9 1.3 7-6.2-3.4L5.8 21.4l1.3-7L2 9.5l7-.9L12 2z" />
          </svg>
        </span>
      </div>
      <blockquote class="prose-lkr mt-4 flex-1 text-sm">
        {{ pick(item.quote) }}
      </blockquote>
      <figcaption class="mt-5 border-t border-slate-100 pt-4 text-sm dark:border-white/10">
        <span class="block font-semibold text-brand-900 dark:text-white">{{ item.author }}</span>
        <span class="block text-xs text-ink-soft dark:text-slate-400">
          {{ pick(item.role) }}<template v-if="item.company"> &middot; {{ item.company }}</template>
        </span>
      </figcaption>
    </figure>
  </div>
</template>