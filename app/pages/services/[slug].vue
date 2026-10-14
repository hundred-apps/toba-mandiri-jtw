<script setup lang="ts">
import type { ServiceItem } from "~/types/content";

const route = useRoute();
const { locale, t } = useI18n();

const slug = computed(() => String(route.params.slug || ""));
const { data: services } = await useCms<ServiceItem[]>("services", "all");
const { data: settings } = await useCompany();

const service = computed(
  () => services.value.find((item) => item.slug === slug.value) ?? null
);
const others = computed(() =>
  services.value.filter((item) => item.slug !== slug.value)
);

const waHref = computed(() => {
  const title = service.value ? pick(service.value.title) : "";
  return whatsappLink(
    String(settings.value?.whatsapp || ""),
    `Halo, saya ingin bertanya tentang layanan ${title}.`
  );
});

if (!service.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Service not found",
    fatal: true,
  });
}

useSeoMeta({
  title: () => `${pick(service.value!.title)} | Lobunta Lubricants`,
  description: () => pick(service.value!.excerpt),
});
</script>

<template>
  <div v-if="service">
    <PageHero
      :eyebrow="$t('nav.services')"
      :title="pick(service.title)"
      :intro="pick(service.excerpt)"
    />

    <section class="section">
      <div
        class="container-page grid gap-12 lg:grid-cols-[1.5fr_0.5fr] lg:items-start"
      >
        <div class="space-y-8">
          <figure
            class="overflow-hidden rounded-3xl border border-slate-200 shadow-card dark:border-white/10"
          >
            <img
              v-if="service.image"
              :src="service.image"
              :alt="pick(service.title)"
              class="aspect-[16/9] w-full object-cover"
            />
            <div
              v-else
              class="grid aspect-[16/9] w-full place-items-center bg-gradient-to-br from-brand-600 to-brand-800 text-white/90"
            >
              <UiIcon
                :name="service.icon || 'lab'"
                :size="64"
                :stroke-width="1.2"
              />
            </div>
          </figure>

          <ProseBlock :html="pick(service.body)" />
        </div>

        <aside class="space-y-6 lg:sticky lg:top-24">
          <div class="card p-6">
            <span
              class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
            >
              <UiIcon :name="service.icon || 'lab'" :size="24" />
            </span>
            <p class="mt-4 text-sm text-ink-soft dark:text-slate-300">
              {{ $t("services.contactCta") }}
            </p>
            <div class="mt-5 space-y-2">
              <NuxtLink :to="`/${locale}/contact`" class="btn-primary w-full">
                {{ $t("nav.contact") }}
              </NuxtLink>
              <a
                v-if="settings?.whatsapp"
                :href="waHref"
                target="_blank"
                rel="noopener"
                class="btn-outline w-full"
              >
                <UiIcon name="whatsapp" :size="16" :filled="true" />
                {{ $t("common.whatsapp") }}
              </a>
            </div>
          </div>

          <div v-if="settings?.phone?.length" class="card p-6">
            <p
              class="text-xs font-semibold uppercase tracking-wider text-ink-mute"
            >
              {{ $t("common.callUs") }}
            </p>
            <a
              :href="`tel:+62${String(settings.phone[0]).replace(/^0/, '')}`"
              class="mt-2 block font-medium text-brand-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-300"
            >
              {{ settings.phone.join(" / ") }}
            </a>
          </div>
        </aside>
      </div>
    </section>

    <section v-if="others.length" class="section section-alt">
      <div class="container-page">
        <UiSectionHeading :heading="$t('services.relatedTitle')" />
        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard v-for="item in others" :key="item.id" :service="item" />
        </div>
      </div>
    </section>
  </div>
</template>
