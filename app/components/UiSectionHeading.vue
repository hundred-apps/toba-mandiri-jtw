<script setup lang="ts">
import type { Localized } from '~/types/content'

defineProps<{
  eyebrow?: Localized | string
  heading: Localized | string
  body?: Localized | string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <p v-if="eyebrow" class="eyebrow">
      {{ pick(eyebrow) }}
    </p>
    <h2 class="mt-3 text-3xl sm:text-4xl">
      {{ pick(heading) }}
    </h2>
    <p v-if="body" class="prose-lkr mt-4 text-base sm:text-lg">
      {{ pick(body) }}
    </p>
  </div>
</template>