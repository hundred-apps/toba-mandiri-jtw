<script setup lang="ts">
import type { ServiceItem } from '~/types/content'

defineProps<{ service: ServiceItem }>()

const { locale } = useI18n()
</script>

<template>
  <NuxtLink
    :to="`/${locale}/services/${service.slug}`"
    class="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:hover:border-brand-500/50"
  >
    <div class="aspect-[16/10] w-full overflow-hidden bg-brand-50 dark:bg-white/5">
      <img
        v-if="service.image"
        :src="service.image"
        :alt="pick(service.title)"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      >
      <div
        v-else
        class="grid h-full w-full place-items-center bg-gradient-to-br from-brand-600 to-brand-800 text-white/90"
      >
        <UiIcon :name="service.icon || 'lab'" :size="46" :stroke-width="1.3" />
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <h3 class="text-lg">
        {{ pick(service.title) }}
      </h3>
      <p class="prose-lkr mt-2 line-clamp-3 flex-1 text-sm">
        {{ pick(service.excerpt) }}
      </p>
      <span
        class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 group-hover:text-brand-500 dark:text-brand-300"
      >
        {{ $t('common.learnMore') }}
        <UiIcon name="arrow-right" :size="15" />
      </span>
    </div>
  </NuxtLink>
</template>
