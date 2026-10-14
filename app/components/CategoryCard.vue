<script setup lang="ts">
import type { ProductCategory } from '~/types/content'

const props = defineProps<{ category: ProductCategory; active?: boolean }>()

const { locale } = useI18n()
</script>

<template>
  <NuxtLink
    :to="`/${locale}/products?category=${category.slug}`"
    class="card flex flex-col p-6 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:hover:border-brand-500/50"
    :class="active ? 'ring-2 ring-brand-500 border-brand-400' : ''"
  >
    <div class="flex items-start justify-between gap-4">
      <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
        <UiIcon :name="category.icon" :size="24" />
      </span>
      <span v-if="category.productCount > 0" class="chip">
        {{ $t('products.itemsCount', { count: category.productCount }) }}
      </span>
    </div>
    <h3 class="mt-5 text-lg">
      {{ pick(category.name) }}
    </h3>
    <p class="prose-lkr mt-3 text-sm">
      {{ pick(category.description) }}
    </p>
    <ul v-if="pickList(category.applications).length" class="mt-4 space-y-2 text-sm text-ink-soft dark:text-slate-400">
      <li v-for="(item, index) in pickList(category.applications)" :key="index" class="flex gap-2">
        <UiIcon name="check" :size="16" class="mt-0.5 text-brand-600 dark:text-brand-400" />
        <span>{{ item }}</span>
      </li>
    </ul>
  </NuxtLink>
</template>