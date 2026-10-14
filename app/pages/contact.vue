<script setup lang="ts">
import type { SiteSettings } from "~/types/content";

const { locale, t } = useI18n();
const { data: settings } = await useCompany();

const details = computed(() => {
  if (!settings.value) return [];
  const value: SiteSettings = settings.value;
  return [
    {
      icon: "map-pin",
      label: t("common.address") + " " + t("contact.officeTitle"),
      value: pick(value.address),
      href: undefined,
    },
    {
      icon: "phone",
      label: t("common.callUs"),
      value: value.phone.join(" / "),
      href: `tel:+62${value.phone[0]?.replace(/^0/, "")}`,
    },
    {
      icon: "mail",
      label: t("common.email"),
      value: value.email,
      href: `mailto:${value.email}`,
    },
    {
      icon: "clock",
      label: t("common.openHours"),
      value: pick(value.officeHours),
      href: undefined,
    },
  ];
});

useSeoMeta({
  title: () => `${t("contact.title")} | PT. Toba Mandiri Sukses`,
  description: () => t("contact.intro"),
});
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.contact')"
      :title="$t('contact.heading')"
      :intro="$t('contact.intro')"
    />

    <section class="section">
      <div class="container-page grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div class="space-y-6">
          <ul class="space-y-4">
            <li
              v-for="item in details"
              :key="item.label"
              class="card flex items-start gap-4 p-5"
            >
              <span
                class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon :name="item.icon" :size="20" />
              </span>
              <span>
                <span
                  class="block text-xs uppercase tracking-wider text-ink-mute"
                  >{{ item.label }}</span
                >
                <component
                  :is="item.href ? 'a' : 'span'"
                  :href="item.href"
                  class="mt-1 block font-medium text-brand-900 dark:text-white"
                  :class="
                    item.href
                      ? 'hover:text-brand-600 hover:underline dark:hover:text-brand-300'
                      : ''
                  "
                >
                  {{ item.value }}
                </component>
              </span>
            </li>
          </ul>

          <div
            v-if="settings"
            class="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10"
          >
            <iframe
              title="PT. Toba Mandiri Sukses"
              src="https://www.google.com/maps?q=Jl.%20Jendral%20Sudirman%20KM%2031%2C%20Kayuringin%20Jaya%2C%20Bekasi%2017144&output=embed"
              width="600"
              height="450"
              style="border: 0"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              class="h-72 w-full"
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <NuxtLink :to="`/${locale}/products`" class="btn-outline">
          {{ $t("nav.products") }}
          <UiIcon name="arrow-right" :size="16" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
