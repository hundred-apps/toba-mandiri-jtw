<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { locale, t } = useI18n()

useHead({ title: `${props.error.statusCode} | PT. Toba Mandiri Sukses` })
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-brand-900 px-4 text-white">
    <div class="text-center">
      <p class="font-display text-7xl font-black text-brand-300">
        {{ error.statusCode }}
      </p>
      <h1 class="mt-4 text-2xl text-white sm:text-3xl">
        {{ error.statusCode === 404 ? t('common.comingSoon') : error.statusMessage }}
      </h1>
      <div class="mt-8 flex justify-center gap-3">
        <button type="button" class="btn bg-white text-brand-800 hover:bg-brand-50" @click="clearError({ redirect: `/${locale}` })">
          {{ $t('nav.home') }}
        </button>
        <button type="button" class="btn border border-white/40 text-white hover:bg-white/10" @click="clearError()">
          {{ $t('common.back') }}
        </button>
      </div>
    </div>
  </div>
</template>