<script setup lang="ts">
import type { ServiceItem } from '~/types/content'

const { t } = useI18n()

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
      <div class="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :service="service"
        />
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
