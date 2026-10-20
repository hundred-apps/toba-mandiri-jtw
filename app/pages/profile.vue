<script setup lang="ts">
import { pick } from '~/composables/useLocalized'
import type { CustomerItem, ServiceItem } from '~/types/content'

const { t } = useI18n()
const { lang, view } = useCompanyProfile()
const { data: settings } = await useCompany()
const { data: customers } = await useCms<CustomerItem[]>('customers', 'all')
const { data: apiServices } = useCms<ServiceItem[]>('services', 'all')
const contact = useCompanyContact()
const milestones = useMilestones()

/**
 * Layanan diambil dari API (CMS) supaya bisa dikelola admin.
 * Kalau API belum punya data layanan, pakai company profile sebagai cadangan.
 */
const services = computed(() => {
  const fromApi = apiServices.value || []
  if (!fromApi.length) return view.value.services

  return fromApi.map((service) => {
    const highlights = service.highlights?.[lang.value] ?? []
    return {
      icon: service.icon || 'lab',
      slug: service.slug,
      title: pick(service.title),
      excerpt: pick(service.excerpt),
      points: highlights.map((point) => pick(point))
    }
  })
})

const stats = computed(() => [
  { label: t('profile.statsFounded'), value: view.value.milestones[0]?.year || '2013' },
  { label: t('profile.statsSegments'), value: String(view.value.segments.length) },
  { label: t('profile.statsServices'), value: String(services.value.length) },
  { label: t('profile.statsPackaging'), value: String(view.value.packaging.length) }
])

const heroImage = computed(() => settings.value?.profile || '/img/profile-hero.svg')
const companyProfileUrl = computed(() => settings.value?.companyProfile || '')
const gallery = computed(() => settings.value?.gallery ?? [])

const whatsappLink = computed(() => {
  const number = (contact.value.whatsapp[0] || '').replace(/[^0-9]/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(
    'Halo, saya ingin menerima company profile dalam format PDF.'
  )}`
})

useSeoMeta({
  title: () => `${t('nav.profile')} | ${pick(settings.value?.companyName) || 'PT. Toba Mandiri Sukses'}`,
  description: () => view.value.aboutBody
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="t('nav.profile')"
      :title="settings ? pick(settings.companyName) : 'PT. Toba Mandiri Sukses'"
      :intro="view.tagline"
      :image="heroImage"
    />

    <section v-if="stats.length" class="relative z-10 -mt-8">
      <div class="container-page">
        <div
          class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-card dark:border-white/10 dark:bg-white/10 lg:grid-cols-4"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-white p-6 text-center dark:bg-brand-900/60"
          >
            <p class="font-display text-2xl font-black text-brand-600 dark:text-brand-300 sm:text-3xl">
              {{ stat.value }}
            </p>
            <p class="mt-1 text-xs uppercase tracking-wider text-ink-mute">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <UiSectionHeading
            :eyebrow="t('nav.profile')"
            :heading="view.aboutTitle"
          />
          <p class="prose-lkr mt-6 text-base sm:text-lg">
            {{ view.aboutBody }}
          </p>

          <dl v-if="settings" class="not-prose mt-8 grid gap-4 sm:grid-cols-2">
            <div class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ t('profile.legalName') }}
              </dt>
              <dd class="mt-1 font-medium">{{ settings.legalName || 'PT. Toba Mandiri Sukses' }}</dd>
            </div>
            <div class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ t('profile.founded') }}
              </dt>
              <dd class="mt-1 font-medium">{{ stats[0]?.value }}</dd>
            </div>
          </dl>
        </div>

        <aside class="card p-6">
          <h2 class="text-lg">
            {{ t('profile.contactTitle') }}
          </h2>
          <ul class="mt-5 space-y-4">
            <li class="flex items-start gap-3">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
                <UiIcon name="map-pin" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ t('common.address') }}
                </p>
                <p class="mt-1 text-sm">{{ contact.address }}</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
                <UiIcon name="phone" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ t('common.callUs') }}
                </p>
                <p class="mt-1 space-y-1">
                  <a
                    v-for="phone in contact.phone"
                    :key="phone"
                    :href="`tel:+62${phone.replace(/^0/, '')}`"
                    class="block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
                  >
                    {{ phone }}
                  </a>
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
                <UiIcon name="whatsapp" filled :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ t('common.whatsapp') }}
                </p>
                <p class="mt-1 space-y-1">
                  <a
                    v-for="number in contact.whatsapp"
                    :key="number"
                    :href="`https://wa.me/${number.replace(/^0/, '62')}`"
                    target="_blank"
                    rel="noopener"
                    class="block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
                  >
                    {{ number }}
                  </a>
                </p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
                <UiIcon name="mail" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ t('common.email') }}
                </p>
                <a
                  :href="`mailto:${contact.email}`"
                  class="mt-1 block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
                >
                  {{ contact.email }}
                </a>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <section v-if="services.length" class="section section-alt">
      <div class="container-page">
        <UiSectionHeading
          align="center"
          :heading="view.servicesTitle"
          :body="view.servicesBody"
        />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="service in services"
            :key="service.slug || service.title"
            class="card p-6"
          >
            <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
              <UiIcon :name="service.icon" :size="22" />
            </span>
            <h3 class="mt-5 text-base">
              {{ service.title }}
            </h3>
            <p class="prose-lkr mt-2 text-sm">
              {{ service.excerpt }}
            </p>
            <ul v-if="service.points.length" class="mt-4 space-y-2">
              <li
                v-for="point in service.points"
                :key="point"
                class="flex items-start gap-2 text-sm"
              >
                <UiIcon name="check" :size="16" class="mt-0.5 text-brand-600 dark:text-brand-300" />
                <span class="prose-lkr">{{ point }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section v-if="view.segments.length" class="section">
      <div class="container-page">
        <UiSectionHeading
          align="center"
          :heading="view.segmentsTitle"
          :body="view.segmentsBody"
        />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="segment in view.segments"
            :key="segment.slug"
            class="card flex flex-col p-6"
          >
            <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
              <UiIcon :name="segment.icon" :size="22" />
            </span>
            <h3 class="mt-5 text-base">
              {{ segment.name }}
            </h3>
            <p class="prose-lkr mt-2 text-sm">
              {{ segment.desc }}
            </p>
            <div v-if="segment.products.length" class="mt-4">
              <p class="text-xs uppercase tracking-wider text-ink-mute">
                {{ t('profile.productsLabel') }}
              </p>
              <ul class="mt-2 flex flex-wrap gap-1.5">
                <li
                  v-for="product in segment.products"
                  :key="product"
                  class="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-700 dark:bg-white/10 dark:text-brand-300"
                >
                  {{ product }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="view.packaging.length" class="section section-alt">
      <div class="container-page">
        <UiSectionHeading
          align="center"
          :heading="view.packagingTitle"
          :body="view.packagingBody"
        />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div
            v-for="item in view.packaging"
            :key="item.title"
            class="card p-6 text-center"
          >
            <span class="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
              <UiIcon :name="item.icon" :size="22" />
            </span>
            <h3 class="mt-4 text-base">
              {{ item.title }}
            </h3>
            <p class="prose-lkr mt-2 text-sm">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="customers.length" class="section">
      <div class="container-page">
        <UiSectionHeading
          align="center"
          :heading="t('customers.title')"
          :body="t('customers.intro')"
        />
        <div class="mt-10">
          <CustomerGrid :items="customers" />
        </div>
      </div>
    </section>

    <section v-if="milestones.length" class="section section-alt">
      <div class="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <UiSectionHeading
          :eyebrow="t('nav.profile')"
          :heading="view.timelineTitle"
          :body="view.timelineBody"
        />
        <MilestoneTimeline :items="milestones" />
      </div>
    </section>

    <section v-if="gallery.length" class="section section-alt">
      <div class="container-page">
        <UiSectionHeading
          align="center"
          :heading="t('profile.galleryTitle')"
          :body="t('profile.galleryBody')"
        />
        <div class="mt-10">
          <GalleryCarousel :images="gallery" />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-page">
        <div class="card flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-start gap-4">
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
              <UiIcon name="document" :size="22" />
            </span>
            <div>
              <h2 class="text-lg">{{ t('common.downloadProfile') }}</h2>
              <p class="prose-lkr mt-1 text-sm">
                {{ t('profile.downloadBody') }}
              </p>
            </div>
          </div>
          <a
            v-if="companyProfileUrl"
            :href="companyProfileUrl"
            target="_blank"
            rel="noopener"
            class="btn-primary shrink-0"
          >
            <UiIcon name="document" :size="18" />
            {{ t('common.downloadProfile') }}
          </a>
          <a
            v-else
            :href="whatsappLink"
            target="_blank"
            rel="noopener"
            class="btn-primary shrink-0"
          >
            <UiIcon name="whatsapp" filled :size="18" />
            {{ t('common.requestProfile') }}
          </a>
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
