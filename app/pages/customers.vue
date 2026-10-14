<script setup lang="ts">
import type { CustomerItem, ProductCategory } from '~/types/content'

const { locale, t } = useI18n()

const { data: customers } = useCms<CustomerItem[]>('customers', 'all')
const { data: categories } = useCms<ProductCategory[]>('product-categories', 'all')

useSeoMeta({
  title: () => `${t('customers.title')} | PT. Toba Mandiri Sukses`,
  description: () => t('customers.intro')
})
</script>

<template>
  <div>
    <section class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.customers')"
          :heading="$t('customers.heading')"
          :body="$t('customers.intro')"
        />
        <div class="mt-8">
          <CustomerGrid v-if="customers.length" :items="customers" />
          <p v-else class="prose-lkr">{{ $t('common.comingSoon') }}</p>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <UiSectionHeading
          :heading="$t('home.categoriesTitle')"
          :body="$t('home.categoriesBody')"
        />
        <ul class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="category in categories" :key="category.id" class="card flex items-center gap-3 p-4 text-sm font-medium">
            <UiIcon :name="category.icon" :size="18" class="text-brand-600 dark:text-brand-400" />
            {{ pick(category.name) }}
          </li>
        </ul>
        <div class="mt-8">
          <NuxtLink :to="`/${locale}/products`" class="btn-primary">
            {{ $t('nav.products') }}
            <UiIcon name="arrow-right" :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
