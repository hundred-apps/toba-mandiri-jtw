<script setup lang="ts">
definePageMeta({
  layout: false
})

const { post } = useAdminApi()

const form = reactive({ identifier: '', method: 'email' })
const state = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const message = ref('')

async function submit() {
  message.value = ''
  state.value = 'sending'
  try {
    await post('/auth/forgot-password', {
      identifier: form.identifier.trim(),
      method: form.method
    })
    state.value = 'success'
    message.value = form.method === 'email'
      ? 'Link reset password telah dikirim ke email Anda.'
      : 'Kode reset password telah dikirim via WhatsApp.'
  } catch (err) {
    const e = err as { statusCode?: number; data?: { error?: string; message?: string }; message?: string }
    state.value = 'error'
    message.value = e.data?.error || e.data?.message || e.message || 'Gagal mengirim reset password.'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-brand-950">
    <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-brand-900/40">
      <div class="flex items-center gap-3">
        <span class="grid h-11 w-11 place-items-center rounded-lg bg-brand-700 font-display text-sm font-black text-white">
          LL
        </span>
        <div>
          <h1 class="text-lg">
            Lupa Password
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Masukkan email atau nomor telepon yang terdaftar
          </p>
        </div>
      </div>

      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <div class="flex gap-2">
          <label class="flex-1">
            <input type="radio" value="email" v-model="form.method" class="h-4 w-4 text-brand-700">
            <span class="ml-2 text-sm">Email</span>
          </label>
          <label class="flex-1">
            <input type="radio" value="whatsapp" v-model="form.method" class="h-4 w-4 text-brand-700">
            <span class="ml-2 text-sm">WhatsApp</span>
          </label>
        </div>

        <label class="block">
          <span class="mb-1.5 block text-sm font-medium">
            {{ form.method === 'email' ? 'Email' : 'Nomor Telepon' }}
          </span>
          <input
            v-model="form.identifier"
            type="text"
            required
            class="field"
            :placeholder="form.method === 'email' ? 'admin@lobuntalubricants.com' : '08xxxxxxxxxx'"
          >
        </label>

        <button type="submit" class="btn-primary w-full" :disabled="state === 'sending'">
          {{ state === 'sending' ? 'Mengirim...' : 'Kirim Link Reset' }}
        </button>

        <p
          v-if="message"
          class="rounded-lg px-4 py-3 text-sm"
          :class="state === 'success'
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
            : state === 'error'
              ? 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300'
              : ''"
          role="alert"
        >
          {{ message }}
        </p>
      </form>

      <div class="mt-6 text-center">
        <NuxtLink to="/admin/login" class="text-sm text-brand-700 hover:underline dark:text-brand-300">
          Kembali ke login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>