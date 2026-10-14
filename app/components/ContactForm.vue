<script setup lang="ts">
const { t } = useI18n()
const { locale } = useI18n()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: ''
})

const state = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const feedback = ref('')

const errors = computed(() => {
  const list: string[] = []
  if (!form.name.trim()) list.push(t('contact.name'))
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) list.push(t('contact.email'))
  if (!form.message.trim()) list.push(t('contact.message'))
  return list
})

async function submit() {
  feedback.value = ''
  if (errors.value.length > 0) {
    state.value = 'error'
    feedback.value = t('contact.validation')
    return
  }

  state.value = 'sending'
  try {
    const { post } = useContentSource()
    await post('/contact', {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      subject: form.subject,
      message: form.message,
      locale: locale.value
    })
    state.value = 'success'
    feedback.value = t('contact.success')
    form.name = ''
    form.email = ''
    form.phone = ''
    form.company = ''
    form.subject = ''
    form.message = ''
  } catch {
    state.value = 'error'
    feedback.value = t('contact.error')
  }
}
</script>

<template>
  <form class="card p-6 sm:p-8" novalidate @submit.prevent="submit">
    <h2 class="text-xl">
      {{ $t('contact.formTitle') }}
    </h2>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium">{{ $t('contact.name') }}</span>
        <input v-model="form.name" type="text" required class="field" :placeholder="$t('contact.namePlaceholder')">
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium">{{ $t('contact.email') }}</span>
        <input v-model="form.email" type="email" required class="field" :placeholder="$t('contact.emailPlaceholder')">
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium">{{ $t('contact.phone') }}</span>
        <input v-model="form.phone" type="tel" class="field" :placeholder="$t('contact.phonePlaceholder')">
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium">{{ $t('contact.company') }}</span>
        <input v-model="form.company" type="text" class="field" :placeholder="$t('contact.companyPlaceholder')">
      </label>
      <label class="block sm:col-span-2">
        <span class="mb-1.5 block text-sm font-medium">{{ $t('contact.subject') }}</span>
        <input v-model="form.subject" type="text" class="field" :placeholder="$t('contact.subjectPlaceholder')">
      </label>
      <label class="block sm:col-span-2">
        <span class="mb-1.5 block text-sm font-medium">{{ $t('contact.message') }}</span>
        <textarea v-model="form.message" rows="5" required class="field resize-y" :placeholder="$t('contact.messagePlaceholder')" />
      </label>
    </div>

    <div class="mt-6 flex flex-wrap items-center gap-3">
      <button type="submit" class="btn-primary" :disabled="state === 'sending'">
        <UiIcon name="check" :size="16" />
        {{ state === 'sending' ? $t('contact.sending') : $t('contact.submit') }}
      </button>
    </div>

    <p
      v-if="feedback"
      class="mt-4 rounded-lg px-4 py-3 text-sm"
      :class="state === 'success' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300'"
      role="status"
    >
      {{ feedback }}
    </p>
  </form>
</template>