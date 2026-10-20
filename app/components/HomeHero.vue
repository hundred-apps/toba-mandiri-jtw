<script setup lang="ts">
import type { HeroBlock } from '~/types/content'

const props = defineProps<{ hero: HeroBlock }>()
const { locale } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden bg-brand-700 text-white">
    <div class="absolute inset-0 bg-[radial-gradient(70%_120%_at_15%_0%,rgb(195_18_23/0.75),transparent)]" />
    <div
      class="container-page relative grid gap-10 py-16 sm:py-24 lg:items-center"
      :class="hero.imagePosition === 'left' ? 'lg:grid-cols-[0.95fr_1.05fr]' : 'lg:grid-cols-[1.05fr_0.95fr]'"
    >
      <div :class="hero.imagePosition === 'left' ? 'lg:order-2' : ''">
        <p class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-100">
          <UiIcon name="shield" :size="14" />
          {{ pick(hero.eyebrow) }}
        </p>
        <h1 class="mt-6 text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          {{ pick(hero.heading) }}
        </h1>
        <p class="mt-6 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
          {{ pick(hero.subheading) }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink v-if="hero.ctaPrimary" :to="`/${locale}${hero.ctaPrimary.to}`" class="btn-accent">
            {{ pick(hero.ctaPrimary.label) }}
            <UiIcon name="arrow-right" :size="16" />
          </NuxtLink>
          <NuxtLink v-if="hero.ctaSecondary" :to="`/${locale}${hero.ctaSecondary.to}`" class="btn border border-white/40 text-white hover:bg-white/10">
            {{ pick(hero.ctaSecondary.label) }}
          </NuxtLink>
        </div>
      </div>

      <div class="relative" :class="hero.imagePosition === 'left' ? 'lg:order-1' : ''">
        <img :src="hero.image" :alt="pick(hero.heading)" class="w-full rounded-3xl border border-white/10 bg-white/5 p-4" fetchpriority="high">
      </div>
    </div>
  </section>
</template>