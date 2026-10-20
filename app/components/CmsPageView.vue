<script setup lang="ts">
import type { PageContent } from '~/types/content'

const props = defineProps<{ slug: string }>()

const { data: pages } = await useCms<any>('posts', 'pages-all')
const page = computed<PageContent | null>(() => (pages.value as any)?.[props.slug] ?? null)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: () => `${pick(page.value!.metaTitle) || pick(page.value!.title)} | PT. Toba Mandiri Sukses`,
  description: () => pick(page.value!.metaDescription) || pick(page.value!.intro)
})
</script>

<template>
  <div v-if="page">
    <section class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="pick(page.title)"
          :heading="pick(page.heading)"
          :body="pick(page.intro)"
        />
        <ProseBlock :html="pick(page.body)" class="mt-8 max-w-3xl" />
        <p v-if="page.updatedAt" class="mt-8 text-xs text-ink-mute">
          {{ $t('blog.publishedOn') }} {{ new Date(page.updatedAt).toLocaleDateString() }}
        </p>
      </div>
    </section>

    <CtaBanner
      :heading="$t('services.contactCta')"
      :body="$t('contact.intro')"
      :button-label="$t('nav.contact')"
      button-to="/contact"
    />
  </div>
</template>
