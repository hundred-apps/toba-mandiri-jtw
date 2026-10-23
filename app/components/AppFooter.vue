<script setup lang="ts">
import type { ServiceItem, SiteSettings } from '~/types/content'

const props = defineProps<{ settings: SiteSettings | null }>()

const { data: services } = await useCms<ServiceItem[]>('services', 'all')
const { locale } = useI18n()

const year = new Date().getFullYear()
const topServices = computed(() => services.value.slice(0, 6))

const explore = computed(() => [
  { label: 'nav.home', to: '/' },
  { label: 'nav.profile', to: '/profile' },
  { label: 'nav.products', to: '/products' },
  { label: 'nav.customers', to: '/customers' },
  { label: 'nav.blog', to: '/blog' },
  { label: 'nav.faq', to: '/faq' },
  { label: 'nav.terms', to: '/terms-conditions' },
  { label: 'nav.privacy', to: '/privacy-policy' }
])

const socials = computed(() => {
  const social = props.settings?.social
  if (!social) return []
  return [
    { key: 'facebook', href: social.facebook },
    { key: 'linkedin', href: social.linkedin },
    { key: 'instagram', href: social.instagram },
    { key: 'youtube', href: social.youtube }
  ].filter((item) => Boolean(item.href))
})
</script>

<template>
  <footer class="mt-auto bg-brand-800 text-white dark:bg-brand-900">
    <div class="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <NuxtLink :to="`/${locale}`" class="flex items-center gap-3">
          <img
            v-if="settings?.logo"
            :src="settings.logo"
            :alt="pick(settings.companyName)"
            class="h-11 w-auto max-w-[10rem] rounded-lg bg-white object-contain p-1"
          >
          <span v-else class="grid h-10 w-10 place-items-center rounded-lg bg-white font-display text-sm font-black text-brand-700">
            LL
          </span>
          <span class="font-display text-base font-bold text-white">
            {{ settings ? pick(settings.companyName) : 'PT. Toba Mandiri Sukses' }}
          </span>
        </NuxtLink>
        <p v-if="settings" class="mt-4 text-sm leading-relaxed text-brand-100">
          {{ pick(settings.tagline) }}
        </p>
        <p v-if="settings" class="mt-3 text-xs text-brand-200">
          {{ settings.legalName }} &middot; {{ $t('footer.official') }}
        </p>
      </div>

      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">
          {{ $t('footer.explore') }}
        </h3>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li v-for="item in explore" :key="item.to">
            <NuxtLink :to="`/${locale}${item.to}`" class="text-brand-100 transition hover:text-white">
              {{ $t(item.label) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">
          {{ $t('footer.services') }}
        </h3>
        <ul class="mt-4 space-y-2.5 text-sm">
          <li v-for="service in topServices" :key="service.slug">
            <NuxtLink
              :to="`/${locale}/services/${service.slug}`"
              class="text-brand-100 transition hover:text-white"
            >
              {{ pick(service.title) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div v-if="settings">
        <h3 class="text-sm font-semibold uppercase tracking-wider text-white">
          {{ $t('footer.contact') }}
        </h3>
        <ul class="mt-4 space-y-3 text-sm text-brand-100">
          <li class="flex gap-2.5">
            <UiIcon name="map-pin" :size="18" class="mt-0.5" />
            <span>{{ pick(settings.address) }}</span>
          </li>
          <li v-for="phone in settings.phone" :key="phone" class="flex gap-2.5">
            <UiIcon name="phone" :size="18" class="mt-0.5" />
            <a :href="`tel:+62${phone.replace(/^0/, '')}`" class="hover:text-white">{{ phone }}</a>
          </li>
          <li class="flex gap-2.5">
            <UiIcon name="mail" :size="18" class="mt-0.5" />
            <a :href="`mailto:${settings.email}`" class="hover:text-white">{{ settings.email }}</a>
          </li>
          <li class="flex gap-2.5">
            <UiIcon name="clock" :size="18" class="mt-0.5" />
            <span>{{ pick(settings.officeHours) }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/15">
      <div class="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-brand-200 sm:flex-row">
        <p>&copy; {{ year }} {{ settings?.legalName || 'PT. Toba Mandiri Sukses' }}. {{ $t('footer.rights') }}</p>
        <div class="flex items-center gap-4">
          <NuxtLink :to="`/${locale}/privacy-policy`" class="hover:text-white">
            {{ $t('footer.privacy') }}
          </NuxtLink>
          <a
            v-for="social in socials"
            :key="social.key"
            :href="social.href"
            target="_blank"
            rel="noopener"
            class="hover:text-white"
          >
            {{ social.key }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>