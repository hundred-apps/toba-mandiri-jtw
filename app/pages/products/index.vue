<script setup lang="ts">
import type { ProductCategory, ProductItem } from '~/types/content'

const { locale, t } = useI18n()
const route = useRoute()

const { data: categories } = await useCms<ProductCategory[]>('product-categories', 'all')
const { data: products } = await useCms<ProductItem[]>('products', 'published')
const { data: settings } = await useCompany()

const keyword = ref('')
const activeCategory = ref(typeof route.query.category === 'string' ? route.query.category : 'all')
const productsSection = ref<HTMLElement | null>(null)

watch(() => route.query.category, (slug) => {
  activeCategory.value = typeof slug === 'string' ? slug : 'all'
  if (activeCategory.value !== 'all') {
    productsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})

const filteredProducts = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  return products.value.filter((product) => {
    const matchCategory = activeCategory.value === 'all' || product.categorySlug === activeCategory.value
    if (!matchCategory) return false
    if (!query) return true
    const haystack = [product.name.id, product.name.en].join(' ').toLowerCase()
    return haystack.includes(query)
  })
})

useSeoMeta({
  title: () => `${t('products.title')} | PT. Toba Mandiri Sukses`,
  description: () => t('products.intro')
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.products')"
      :title="$t('products.heading')"
      :intro="$t('products.intro')"
    />

    <section class="section">
      <div class="container-page">
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            v-for="category in categories"
            :key="category.id"
            :category="category"
            :active="category.slug === activeCategory"
          />
        </div>
      </div>
    </section>

    <section ref="productsSection" v-if="products.length" class="section section-alt">
      <div class="container-page">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <UiSectionHeading :heading="$t('products.title')" />
          <div class="flex flex-wrap items-center gap-3">
            <input
              v-model="keyword"
              type="search"
              class="field sm:w-64"
              :placeholder="$t('products.searchPlaceholder')"
            >
            <select v-model="activeCategory" class="field sm:w-56">
              <option value="all">
                {{ $t('products.allCategories') }}
              </option>
              <option v-for="category in categories" :key="category.slug" :value="category.slug">
                {{ pick(category.name) }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="filteredProducts.length" class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
        <p v-else class="prose-lkr mt-8">
          {{ $t('products.empty') }}
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container-page">
        <div class="card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <h2 class="text-xl">
              {{ $t('products.catalogNote') }}
            </h2>
            <p v-if="settings" class="prose-lkr mt-2 text-sm">
              {{ settings.email }} &middot; {{ settings.phone[0] }}
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a href="/docs/company-profile.pdf" download class="btn-outline">
              <UiIcon name="download" :size="16" />
              {{ $t('common.downloadProfile') }}
            </a>
            <a
              v-if="settings"
              :href="whatsappLink(settings.whatsapp, 'Halo, saya ingin meminta katalog produk dan penawaran harga.')"
              target="_blank"
              rel="noopener"
              class="btn-primary"
            >
              <UiIcon name="whatsapp" :size="16" :filled="true" />
              {{ $t('nav.contact') }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <CtaBanner
      :heading="t('services.contactCta')"
      :body="t('contact.intro')"
      :button-label="t('nav.contact')"
      button-to="/contact"
    />
  </div>
</template>