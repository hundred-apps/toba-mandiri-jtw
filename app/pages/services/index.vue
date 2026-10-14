<script setup lang="ts">
import type { ServiceItem } from '~/types/content'

const { locale, t } = useI18n()

const { data: services } = useCms<ServiceItem[]>('services', 'all')
const { data: settings } = await useCompany()

useSeoMeta({
  title: () => `${t('services.title')} | PT. Toba Mandiri Sukses`,
  description: () => t('services.intro')
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.services')"
      :title="$t('services.heading')"
      :intro="$t('services.intro')"
    />

    <section class="section">
      <div class="container-page space-y-6">
        <article
          v-for="service in services"
          :key="service.id"
          class="card grid gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr]"
        >
          <div class="flex flex-wrap items-center gap-3">
            <h2 class="text-xl">
              {{ pick(service.title) }}
            </h2>
            <NuxtLink
              :to="`/${locale}/services/${service.slug}`"
              class="ml-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-500 dark:text-brand-300"
            >
              {{ $t('common.learnMore') }}
              <UiIcon name="arrow-right" :size="15" />
            </NuxtLink>
          </div>
          <p class="prose-lkr mt-3 text-sm sm:text-base">
            {{ pick(service.excerpt) }}
          </p>
        </article>
      </div>
    </section>

    <CtaBanner
      :heading="t('services.contactCta')"
      :body="settings ? pick(settings.description) : ''"
      :button-label="t('nav.contact')"
      button-to="/contact"
    />
  </div>
</template>