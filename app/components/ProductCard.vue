<script setup lang="ts">
import type { ProductItem } from '~/types/content'

const props = defineProps<{ product: ProductItem; compact?: boolean }>()

const { data: categories } = await useCms<import('~/types/content').ProductCategory[]>('product-categories', 'all')
const { locale } = useI18n()

function categoryName(slug: string) {
  const found = categories.value.find((item) => item.slug === slug)
  return found ? pick(found.name) : ''
}

/** Batas karakter deskripsi yang tampil di kartu. */
const PREVIEW_LIMIT = 200

const description = computed(() => pick(props.product.description).trim())

const descriptionPreview = computed(() =>
  description.value.length > PREVIEW_LIMIT
    ? `${description.value.slice(0, PREVIEW_LIMIT).trimEnd()}…`
    : description.value
)

const hasMore = computed(() => description.value.length > PREVIEW_LIMIT)
</script>

<template>
  <NuxtLink :to="`/${locale}/products/${product.slug}`" class="card flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:hover:border-brand-500/50">
    <div class="aspect-[4/3] w-full bg-brand-50 dark:bg-white/5">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="pick(product.name)"
        class="h-full w-full object-cover"
        loading="lazy"
      >
      <div v-else class="grid h-full w-full place-items-center text-brand-300 dark:text-white/20">
        <UiIcon name="lab" :size="48" :stroke-width="1.2" />
      </div>
    </div>
    <div class="flex flex-1 flex-col" :class="compact ? 'p-3' : 'p-5'">
      <p class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        {{ categoryName(product.categorySlug) }}
      </p>
      <h3 :class="compact ? 'mt-1 text-sm' : 'mt-2 text-base'">
        {{ pick(product.name) }}
      </h3>
      <p v-if="product.sku" class="mt-1 font-mono text-xs text-ink-mute">
        {{ product.sku }}
      </p>
      <div v-if="!compact && description" class="mt-3 flex-1">
        <p class="prose-lkr text-sm">
          {{ descriptionPreview }}
        </p>
        <span
          v-if="hasMore"
          class="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400"
        >
          {{ $t('products.seeMore') }}
          <UiIcon name="arrow-right" :size="14" />
        </span>
      </div>
      <dl v-if="!compact && product.spec?.length" class="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-xs dark:border-white/10">
        <div v-for="spec in product.spec" :key="spec.label.en" class="flex justify-between gap-4">
          <dt class="text-ink-soft dark:text-slate-400">{{ pick(spec.label) }}</dt>
          <dd class="text-right font-medium">{{ pick(spec.value) }}</dd>
        </div>
      </dl>
    </div>
  </NuxtLink>
</template>