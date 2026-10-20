<script setup lang="ts">
const { login } = useAdminApi()
const { saveToken } = useAdminAuth()
const router = useRouter()
const route = useRoute()

  useSeoMeta({ title: 'Masuk | CMS TMS' })

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const res = await login(email.value, password.value)
    if (res.token && res.user) {
      saveToken(res.token, res.user)
      const redirect = route.query.redirect?.toString() || '/admin'
      await router.push(redirect)
    } else {
      throw new Error('Respons tidak valid')
    }
  } catch (e: unknown) {
    const err = e as { data?: { error?: string; message?: string }; message?: string }
    error.value = err.data?.error || err.data?.message || err.message || 'Terjadi kesalahan saat login'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-brand-950 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-700 mx-auto mb-4">
          <span class="font-display text-2xl font-black text-white">LL</span>
        </div>
        <h1 class="text-2xl font-bold text-brand-900 dark:text-white">Login Admin</h1>
        <p class="mt-2 text-slate-600 dark:text-slate-300">Masuk untuk mengelola konten</p>
      </div>

      <div class="card p-6 space-y-4">
        <p v-if="error" class="rounded-lg bg-red-50 text-red-700 p-3 text-sm dark:bg-red-500/10 dark:text-red-300" role="alert">
          {{ error }}
        </p>

        <div>
          <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Nama pengguna</label>
          <input
            id="email"
            v-model="email"
            type="text"
            autocomplete="username"
            required
            class="field w-full"
            placeholder="developer"
            @keyup.enter="handleLogin"
            :disabled="loading"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            class="field w-full"
            placeholder="••••••••"
            @keyup.enter="handleLogin"
            :disabled="loading"
          />
        </div>

        <button
          type="button"
          class="btn-primary w-full !py-3"
          :disabled="loading"
          @click="handleLogin"
        >
          <span v-if="loading" class="flex items-center justify-center gap-2">
            <UiIcon name="spinner" :size="18" class="animate-spin" />
            Masuk...
          </span>
          <span v-else>Masuk</span>
        </button>
      </div>

      <p class="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
        Belum punya akun? Hubungi administrator.
      </p>
    </div>
  </div>
</template>