<script setup lang="ts">
import type { SiteSettings } from '~/types/content'

const props = defineProps<{ settings: SiteSettings | null }>()

const { locale, locales, setLocale } = useI18n()
const open = ref(false)
const route = useRoute()

const otherLocales = computed(() =>
  (locales.value as Array<{ code: string; name?: string }>).filter((item) => item.code !== locale.value)
)

watch(() => route.fullPath, () => { open.value = false })

async function switchLocale(code: string) {
  await setLocale(code as 'id' | 'en')
  open.value = false
}

const nav = computed(() => {
  const visibility = props.settings?.menuVisibility ? (typeof props.settings.menuVisibility === 'string' ? JSON.parse(props.settings.menuVisibility) : props.settings.menuVisibility) : {}
  const defaultNav = [
    { key: 'home', label: 'nav.home', to: '/' },
    { key: 'profile', label: 'nav.profile', to: '/profile' },
    { key: 'products', label: 'nav.products', to: '/products' },
    { key: 'services', label: 'nav.services', to: '/services' },
    { key: 'customers', label: 'nav.customers', to: '/customers' },
    { key: 'blog', label: 'nav.blog', to: '/blog' },
    { key: 'contact', label: 'nav.contact', to: '/contact' }
  ]
  return defaultNav.filter(item => visibility[item.key] !== false)
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-brand-950/90">
    <div v-if="settings" class="hidden border-b border-brand-900 bg-brand-900 text-brand-100 md:block">
      <div class="container-page flex h-9 items-center justify-between text-xs">
        <p class="flex items-center gap-2">
          <UiIcon name="shield" :size="14" />
          <span>{{ $t('footer.official') }} &middot; {{ $t('footer.tagline') }}</span>
        </p>
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1.5">
            <UiIcon name="clock" :size="14" />
            {{ pick(settings.officeHours) }}
          </span>
          <a :href="`tel:+62${settings.phone[0]?.replace(/^0/, '')}`" class="flex items-center gap-1.5 hover:text-white">
            <UiIcon name="phone" :size="14" />
            {{ settings.phone[0] }}
          </a>
        </div>
      </div>
    </div>

    <div class="container-page flex h-16 items-center justify-between gap-4">
      <NuxtLink :to="`/${locale}`" class="flex items-center gap-3">
        <img
          v-if="settings?.logo"
          :src="settings.logo"
          :alt="pick(settings.companyName)"
          class="h-11 w-auto max-w-[11rem] object-contain"
        >
        <span v-else class="grid h-10 w-10 place-items-center rounded-lg bg-brand-700 font-display text-sm font-black text-white">
          LL
        </span>
        <span class="font-display text-base font-bold text-brand-900 dark:text-white">
          {{ settings ? pick(settings.companyName) : 'PT. Toba Mandiri Sukses' }}
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="`/${locale}${item.to}`"
          class="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          active-class="text-brand-700 dark:text-white"
        >
          {{ $t(item.label) }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <div class="hidden items-center rounded-lg border border-slate-200 p-0.5 sm:flex dark:border-white/15">
          <button
            v-for="item in otherLocales"
            :key="item.code"
            type="button"
            class="rounded-md px-2.5 py-1 text-xs font-semibold uppercase transition"
            :class="item.code === locale ? 'bg-brand-700 text-white' : 'text-ink-soft hover:text-brand-700 dark:text-slate-300'"
            @click="switchLocale(item.code)"
          >
            {{ item.code }}
          </button>
        </div>

        <a
          v-if="settings"
          :href="whatsappLink(settings.whatsapp, $t('common.whatsapp'))"
          target="_blank"
          rel="noopener"
          class="hidden items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 md:flex"
        >
          <UiIcon name="whatsapp" :size="16" :filled="true" />
          {{ $t('nav.contact') }}
        </a>

        <button
          type="button"
          class="rounded-lg p-2 text-ink-soft transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
          :aria-label="open ? $t('nav.close') : $t('nav.open')"
          :aria-expanded="open"
          @click="open = !open"
        >
          <UiIcon :name="open ? 'close' : 'menu'" :size="22" />
        </button>
      </div>
    </div>

    <div v-if="open" class="border-t border-slate-200 bg-white px-4 pb-6 pt-2 lg:hidden dark:border-white/10 dark:bg-brand-950">
      <nav class="flex flex-col">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="`/${locale}${item.to}`"
          class="rounded-lg px-3 py-3 text-sm font-medium text-ink-soft hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-white/10"
        >
          {{ $t(item.label) }}
        </NuxtLink>
      </nav>
      <div class="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
        <div class="flex items-center rounded-lg border border-slate-200 p-0.5 dark:border-white/15">
          <button
            v-for="item in locales"
            :key="item.code"
            type="button"
            class="rounded-md px-3 py-1.5 text-xs font-semibold uppercase"
            :class="item.code === locale ? 'bg-brand-700 text-white' : 'text-ink-soft'"
            @click="switchLocale(item.code)"
          >
            {{ item.code }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>