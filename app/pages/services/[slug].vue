<script setup lang="ts">
import type { ServiceItem } from '~/types/content'

const route = useRoute()
const { locale, t } = useI18n()

const slug = computed(() => String(route.params.slug || ''))
const { data: services } = await useCms<ServiceItem[]>('services', 'all')

const service = computed(() => services.value.find((item) => item.slug === slug.value) ?? null)
const others = computed(() => services.value.filter((item) => item.slug !== slug.value))

if (!service.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true })
}

useSeoMeta({
  title: () => `${pick(service.value!.title)} | PT. Toba Mandiri Sukses`,
  description: () => pick(service.value!.excerpt)
})
</script>

<template>
  <div v-if="service">
    <PageHero
      :eyebrow="$t('nav.services')"
      :title="pick(service.title)"
      :intro="pick(service.excerpt)"
    />

    <section class="section">
      <div class="container-page grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
        <ProseBlock :html="pick(service.body)" />

        <aside class="space-y-6">
          <div class="card p-6">
            <p class="text-sm text-ink-soft dark:text-slate-300">
              {{ $t('services.contactCta') }}
            </p>
            <NuxtLink :to="`/${locale}/contact`" class="btn-primary mt-4 w-full">
              {{ $t('nav.contact') }}
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="others.length" class="section section-alt">
      <div class="container-page">
        <UiSectionHeading :heading="$t('services.relatedTitle')" />
        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            v-for="item in others"
            :key="item.id"
            :service="item"
          />
        </div>
      </div>
    </section>
  </div>
</template>