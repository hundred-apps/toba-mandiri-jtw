<script setup lang="ts">
import type { SiteSettings } from '~/types/content'

const props = defineProps<{ settings: SiteSettings | null }>()

const visible = ref(false)

const href = computed(() => {
  if (!props.settings) return '#'
  return whatsappLink(props.settings.whatsapp, 'Halo, saya ingin konsultasi produk PT. Toba Mandiri Sukses.')
})

onMounted(() => {
  visible.value = true
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-3 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
  >
    <a
      v-if="settings && visible"
      :href="href"
      target="_blank"
      rel="noopener"
      class="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#1eb356] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#25D366]"
      :aria-label="`WhatsApp ${settings.whatsapp}`"
    >
      <UiIcon name="whatsapp" :size="28" :filled="true" />
    </a>
  </Transition>
</template>