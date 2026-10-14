<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { HomeContent, ServiceItem } from "~/types/content";

const { t } = useI18n();

const { data: settings } = await useCompany();
const { data: home } = await useCms<HomeContent>("home", "home");
const { data: services } = await useCms<ServiceItem[]>("services", "all");

const stats = computed(() => {
  const s = settings.value;
  if (!s) return [];
  return [
    { label: t("profile.founded"), value: s.foundedYear || "—" },
    { label: t("profile.agency"), value: s.agencyNumber || "—" },
    {
      label: t("profile.categories"),
      value: String(home.value?.categories?.length ?? 0),
    },
    {
      label: t("profile.customers"),
      value: String(home.value?.customers?.length ?? 0),
    },
  ];
});

const values = computed(() => [
  { icon: "shield", label: t("profile.value1") },
  { icon: "delivery", label: t("profile.value2") },
  { icon: "target", label: t("profile.value3") },
  { icon: "truck", label: t("profile.value4") },
  { icon: "gear", label: t("profile.value5") },
  { icon: "engineer", label: t("profile.value6") },
]);

const whatsappLink = computed(() => {
  const number = (settings.value?.whatsapp || "").replace(/[^0-9]/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(
    "Halo, saya ingin menerima company profile dalam format PDF."
  )}`;
});

const heroImage = computed(
  () => settings.value?.profile || "/img/profile-hero.svg"
);
const companyProfileUrl = computed(() => settings.value?.companyProfile || "");
const gallery = computed(() => settings.value?.gallery ?? []);

console.log("gallery", gallery.value);

useSeoMeta({
  title: () =>
    `${t("nav.profile")} | ${pick(
      settings.value?.companyName ?? {
        id: "PT. Toba Mandiri Sukses",
        en: "PT. Toba Mandiri Sukses",
      }
    )}`,
  description: () =>
    pick(settings.value?.description ?? { id: "", en: "" }) ||
    t("meta.homeDescription"),
});
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.profile')"
      :title="settings ? pick(settings.companyName) : 'PT. Toba Mandiri Sukses'"
      :intro="settings ? pick(settings.tagline) : ''"
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
            <p
              class="font-display text-2xl font-black text-brand-600 dark:text-brand-300 sm:text-3xl"
            >
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
      <div
        class="container-page grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start"
      >
        <div>
          <UiSectionHeading
            :eyebrow="$t('nav.profile')"
            :heading="$t('profile.aboutTitle')"
          />
          <div class="prose-lkr mt-6 space-y-4 text-base sm:text-lg">
            <p>{{ settings ? pick(settings.description) : "" }}</p>
          </div>

          <dl v-if="settings" class="not-prose mt-8 grid gap-4 sm:grid-cols-3">
            <div class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ $t("profile.legalName") }}
              </dt>
              <dd class="mt-1 font-medium">{{ settings.legalName }}</dd>
            </div>
            <div class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ $t("profile.agency") }}
              </dt>
              <dd class="mt-1 font-medium">{{ settings.agencyNumber }}</dd>
            </div>
            <div class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ $t("profile.founded") }}
              </dt>
              <dd class="mt-1 font-medium">{{ settings.foundedYear }}</dd>
            </div>
          </dl>
        </div>

        <aside v-if="services.length" class="card p-6">
          <h2 class="text-lg">
            {{ $t("profile.businessLines") }}
          </h2>
          <ul class="mt-5 space-y-4">
            <li
              v-for="service in services.slice(0, 6)"
              :key="service.id"
              class="flex items-start gap-3"
            >
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon :name="service.icon || 'gear'" :size="20" />
              </span>
              <div>
                <p class="text-sm font-semibold text-brand-900 dark:text-white">
                  {{ pick(service.title) }}
                </p>
                <p class="prose-lkr mt-0.5 text-xs">
                  {{ pick(service.excerpt) }}
                </p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <section v-if="home.milestones.length" class="section section-alt">
      <div
        class="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"
      >
        <UiSectionHeading
          :eyebrow="$t('nav.profile')"
          :heading="pick(home.aboutIntro.heading)"
          :body="pick(home.aboutIntro.body)"
        />
        <MilestoneTimeline :items="home.milestones" />
      </div>
    </section>

    <section class="section">
      <div class="container-page">
        <UiSectionHeading
          align="center"
          :heading="$t('profile.valuesTitle')"
          :body="$t('profile.valuesBody')"
        />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="item in values"
            :key="item.label"
            class="card p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span
              class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
            >
              <UiIcon :name="item.icon" :size="22" />
            </span>
            <h3 class="mt-5 text-base">
              {{ item.label }}
            </h3>
          </div>
        </div>
      </div>
    </section>

    <section v-if="gallery.length" class="section section-alt">
      <div class="container-page">
        <UiSectionHeading
          align="center"
          :heading="$t('profile.galleryTitle')"
          :body="$t('profile.galleryBody')"
        />
        <div class="mx-auto mt-10 max-w-4xl">
          <GalleryCarousel :images="gallery" />
        </div>
      </div>
    </section>

    <section v-if="settings" class="section section-alt">
      <div
        class="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start"
      >
        <div>
          <UiSectionHeading :heading="$t('profile.contactTitle')" />
          <div class="mt-8 grid gap-5 sm:grid-cols-2">
            <div class="card flex gap-4 p-5">
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon name="map-pin" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.address") }}
                </p>
                <p class="mt-1 text-sm">{{ pick(settings.address) }}</p>
              </div>
            </div>

            <div class="card flex gap-4 p-5">
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon name="phone" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.callUs") }}
                </p>
                <p class="mt-1 space-y-1">
                  <a
                    v-for="phone in settings.phone"
                    :key="phone"
                    :href="`tel:+62${phone.replace(/^0/, '')}`"
                    class="block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
                  >
                    {{ phone }}
                  </a>
                </p>
              </div>
            </div>

            <div class="card flex gap-4 p-5">
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon name="mail" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.email") }}
                </p>
                <a
                  :href="`mailto:${settings.email}`"
                  class="mt-1 block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
                >
                  {{ settings.email }}
                </a>
              </div>
            </div>

            <div class="card flex gap-4 p-5">
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon name="clock" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.openHours") }}
                </p>
                <p class="mt-1 text-sm">{{ pick(settings.officeHours) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card flex flex-col justify-between p-6">
          <div>
            <span
              class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
            >
              <UiIcon name="document" :size="22" />
            </span>
            <h3 class="mt-5 text-lg">{{ $t("common.downloadProfile") }}</h3>
            <p class="prose-lkr mt-2 text-sm">
              {{ $t("profile.downloadBody") }}
            </p>
          </div>
          <a
            v-if="companyProfileUrl"
            :href="companyProfileUrl"
            target="_blank"
            rel="noopener"
            class="btn-primary mt-6 w-full"
          >
            <UiIcon name="document" :size="18" />
            {{ $t("common.downloadProfile") }}
          </a>
          <a
            v-else
            :href="whatsappLink"
            target="_blank"
            rel="noopener"
            class="btn-primary mt-6 w-full"
          >
            <UiIcon name="whatsapp" filled :size="18" />
            {{ $t("career.requestProfile") }}
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
