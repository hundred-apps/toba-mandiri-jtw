<script setup lang="ts">
import type { ProductCategory, ProductItem } from '~/types/content'

const route = useRoute()
const { locale, t } = useI18n()

const slug = computed(() => String(route.params.slug || ''))
const { data: products } = await useCms<ProductItem[]>('products', 'published')
const { data: categories } = await useCms<ProductCategory[]>('product-categories', 'all')

const product = computed(() => products.value.find((item) => item.slug === slug.value) ?? null)
const category = computed(() => categories.value.find((item) => item.slug === product.value?.categorySlug) ?? null)
const related = useState<ProductItem[]>(`related:${slug.value}`, () => {
  const pool = products.value.filter(
    (item) => item.slug !== slug.value && item.categorySlug === product.value?.categorySlug
  )
  const copy = [...pool]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = copy[i] as ProductItem
    copy[i] = copy[j] as ProductItem
    copy[j] = tmp
  }
  return copy.slice(0, 5)
})

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
}

useSeoMeta({
  title: () => `${pick(product.value!.name)} | PT. Toba Mandiri Sukses`,
  description: () => pick(product.value!.description)
})

const { trackView } = useContentSource()
onMounted(() => {
  if (product.value) trackView('/product-view', product.value.id).catch(() => {})
})
</script>

<template>
  <div v-if="product">
    <section class="section">
      <div class="container-page">
        <div class="card overflow-hidden">
          <div class="grid md:grid-cols-[280px_1fr]">
            <div class="grid place-items-center bg-brand-50 p-4 dark:bg-white/5">
              <img
                v-if="product.image"
                :src="product.image"
                :alt="pick(product.name)"
                class="h-full w-full object-contain"
              >
              <div v-else class="grid h-full min-h-[200px] w-full place-items-center text-brand-300 dark:text-white/20">
                <UiIcon name="lab" :size="48" :stroke-width="1.2" />
              </div>
            </div>

            <div class="p-6">
              <h1 class="text-2xl">
                {{ pick(product.name) }}
              </h1>
              <div class="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span v-if="category" class="chip">{{ pick(category.name) }}</span>
                <span v-if="product.sku" class="font-mono text-ink-mute">{{ product.sku }}</span>
              </div>

              <p class="prose-lkr mt-4 text-sm">
                {{ pick(product.description) }}
              </p>

              <dl class="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                <div class="flex justify-between gap-4 border-b border-slate-100 pb-2 text-sm dark:border-white/10">
                  <dt class="text-ink-soft dark:text-slate-400">{{ $t('products.packaging') }}</dt>
                  <dd class="text-right font-medium">{{ pick(product.packaging) }}</dd>
                </div>
                <div class="flex justify-between gap-4 border-b border-slate-100 pb-2 text-sm dark:border-white/10">
                  <dt class="text-ink-soft dark:text-slate-400">{{ $t('products.weight') }}</dt>
                  <dd class="text-right font-medium">{{ pick(product.weight) }}</dd>
                </div>
              </dl>

              <div v-if="product.spec?.length" class="mt-5">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-ink-mute dark:border-white/10">
                      <th class="pb-2 pr-4">{{ $t('products.specTitle') }}</th>
                      <th class="pb-2 text-right">Nilai</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="spec in product.spec" :key="spec.label.en" class="border-b border-slate-100 dark:border-white/10">
                      <td class="py-2 pr-4 text-ink-soft dark:text-slate-400">{{ pick(spec.label) }}</td>
                      <td class="py-2 text-right font-medium">{{ pick(spec.value) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <a v-if="product.tdsFile" :href="product.tdsFile" download class="btn-outline">
                  <UiIcon name="download" :size="16" />
                  TDS
                </a>
                <a v-if="product.msdsFile" :href="product.msdsFile" download class="btn-outline">
                  <UiIcon name="download" :size="16" />
                  MSDS
                </a>
                <NuxtLink :to="`/${locale}/contact`" class="btn-primary">
                  <UiIcon name="whatsapp" :size="16" :filled="true" />
                  {{ $t('nav.contact') }}
                </NuxtLink>
                <NuxtLink :to="`/${locale}/products${category ? `?category=${category.slug}` : ''}`" class="btn-outline">
                  {{ $t('products.backToProducts') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="related.length" class="section section-alt">
      <div class="container-page">
        <UiSectionHeading :heading="$t('products.relatedTitle')" />
        <div class="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <ProductCard
            v-for="item in related"
            :key="item.id"
            :product="item"
            compact
          />
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
