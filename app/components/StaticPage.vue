<script setup lang="ts">
const props = defineProps<{ page: 'faq' | 'privacyPolicy' | 'termsConditions' }>()

const { t } = useI18n()
const content = useStaticPage(props.page)

const eyebrowKey = computed(() => ({
  faq: 'nav.faq',
  privacyPolicy: 'nav.privacy',
  termsConditions: 'nav.terms'
}[props.page]))

useSeoMeta({
  title: () => content.value.title,
  description: () => content.value.intro
})
</script>

<template>
  <div>
    <section class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t(eyebrowKey)"
          :heading="content.heading"
          :body="content.intro"
        />
        <ProseBlock :html="content.body" class="mt-8 max-w-3xl" />
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
