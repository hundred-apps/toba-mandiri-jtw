<script setup lang="ts">
import type { ServiceItem } from '~/types/content'

defineProps<{ service: ServiceItem }>()

const { locale } = useI18n()
</script>

<template>
  <NuxtLink
    :to="`/${locale}/services/${service.slug}`"
    class="card group flex flex-col p-6 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:hover:border-brand-500/50"
  >
    <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-white dark:bg-white/10 dark:text-brand-300">
      <UiIcon :name="service.icon || 'lab'" :size="24" />
    </span>
    <h3 class="mt-5 text-lg">
      {{ pick(service.title) }}
    </h3>
    <p class="prose-lkr mt-3 line-clamp-4 flex-1 text-sm">
      {{ pick(service.excerpt) }}
    </p>
    <span
      class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 group-hover:text-brand-500 dark:text-brand-300"
    >
      {{ $t('common.learnMore') }}
      <UiIcon name="arrow-right" :size="15" />
    </span>
  </NuxtLink>
</template>