<script setup lang="ts">
defineProps<{
  heading: string
  body?: string
  buttonLabel: string
  buttonTo: string
  secondaryLabel?: string
  secondaryTo?: string
}>()

const { locale } = useI18n()
</script>

<template>
  <section class="section section-alt">
    <div class="container-page">
      <div class="flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-700 p-8 text-white sm:p-10 lg:flex-row lg:items-center">
        <div class="max-w-2xl">
          <h2 class="text-2xl text-white sm:text-3xl">
            {{ heading }}
          </h2>
          <p v-if="body" class="mt-3 text-sm leading-relaxed text-brand-100 sm:text-base">
            {{ body }}
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <NuxtLink :to="`/${locale}${buttonTo}`" class="btn-accent">
            {{ buttonLabel }}
          </NuxtLink>
          <NuxtLink
            v-if="secondaryLabel && secondaryTo"
            :to="`/${locale}${secondaryTo}`"
            class="btn border border-white/40 text-white hover:bg-white/10"
          >
            {{ secondaryLabel }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>