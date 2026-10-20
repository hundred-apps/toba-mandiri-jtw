<script setup lang="ts">
const route = useRoute()
const { profile, isAuthenticated, logout } = useAdminAuth()
const { connected, lastError, baseUrl } = useAdminApi()
const { data: company } = useCompany()

const collapsed = ref(false)

const isSuperUser = computed(() => profile.value?.role === 'superuser')

const groups = computed(() => [
  {
    label: 'Umum',
    items: [
      { to: '/admin', label: 'Dashboard', icon: 'target' },
      { to: '/admin/settings', label: 'Pengaturan situs', icon: 'gear' }
    ]
  },
  {
    label: 'Konten',
    items: [
      { to: '/admin/home-hero', label: 'Hero Beranda', icon: 'target' },
      { to: '/admin/product-categories', label: 'Kategori Produk', icon: 'delivery' },
      { to: '/admin/products', label: 'Produk', icon: 'lab' },
      { to: '/admin/services', label: 'Layanan', icon: 'lab' },
      { to: '/admin/articles', label: 'Artikel', icon: 'document' },
      { to: '/admin/customers', label: 'Customer', icon: 'factory' }
    ]
  },
  ...(isSuperUser.value ? [{
    label: 'Sistem',
    items: [
      { to: '/admin/admin-users', label: 'User admin', icon: 'engineer' }
    ]
  }] : [])
])

function isActive(to: string): boolean {
  if (to === '/admin') return route.path === '/admin'
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-ink dark:bg-brand-950 dark:text-slate-200">
    <div class="flex">
      <aside
        class="sticky top-0 flex h-screen shrink-0 flex-col border-r border-slate-200 bg-white transition-all dark:border-white/10 dark:bg-brand-900/40"
        :class="collapsed ? 'w-16' : 'w-64'"
      >
        <div class="flex h-16 items-center gap-2 border-b border-slate-200 px-4 dark:border-white/10">
          <img
            v-if="company.logo"
            :src="company.logo"
            alt="Logo"
            class="h-9 w-9 shrink-0 rounded-lg object-contain"
          >
          <UiIcon v-else name="oil" :size="28" class="text-brand-700 dark:text-brand-300" />
          <span v-if="!collapsed" class="leading-tight">
            <span class="block font-display text-sm font-bold text-brand-900 dark:text-white">TMS CMS</span>
            <span class="block text-[10px] uppercase tracking-wider text-slate-500">Panel admin</span>
          </span>
        </div>

        <nav class="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          <div v-for="group in groups" :key="group.label">
            <p v-if="!collapsed" class="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {{ group.label }}
            </p>
            <ul class="space-y-0.5">
              <li v-for="item in group.items" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition"
                  :class="isActive(item.to)
                    ? 'bg-brand-700 font-semibold text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'"
                  :title="collapsed ? item.label : undefined"
                >
                  <UiIcon :name="item.icon" :size="18" />
                  <span v-if="!collapsed">{{ item.label }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>

        <div class="border-t border-slate-200 p-3 dark:border-white/10">
          <button
            type="button"
            class="mb-2 flex w-full items-center justify-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
            @click="collapsed = !collapsed"
          >
            <UiIcon name="arrow-right" :size="16" :style="collapsed ? '' : 'transform: rotate(180deg)'" />
            <span v-if="!collapsed">Tutup menu</span>
          </button>
          <NuxtLink
            to="/"
            class="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
          >
            <UiIcon name="arrow-right" :size="16" style="transform: rotate(180deg)" />
            <span v-if="!collapsed">Lihat website</span>
          </NuxtLink>
        </div>
      </aside>

      <div class="min-w-0 flex-1">
        <header class="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-5 backdrop-blur dark:border-white/10 dark:bg-brand-950/90">
          <div class="flex items-center gap-3">
            <span
              class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              :class="connected
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'"
            >
              <span class="h-2 w-2 rounded-full" :class="connected ? 'bg-emerald-500' : 'bg-amber-500'" />
              {{ connected ? 'Backend terhubung' : 'Backend belum terhubung' }}
            </span>
            <span v-if="!connected && lastError" class="hidden text-xs text-slate-500 sm:inline">
              {{ lastError }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-sm text-slate-600 dark:text-slate-300">
              {{ profile?.name || profile?.email }}
            </span>
            <button type="button" class="btn-outline !py-2" @click="logout">
              Keluar
            </button>
          </div>
        </header>

        <div
          v-if="!connected"
          class="border-b border-amber-200 bg-amber-50 px-5 py-3 text-xs text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200"
        >
          Panel berjalan tanpa data. Isi <code class="font-mono">{{ baseUrl || 'NUXT_PUBLIC_API_BASE' }}</code>
          di <code class="font-mono">web/.env</code> lalu jalankan ulang dev server.
          {{ lastError ? ` Error terakhir: ${lastError}` : '' }}
        </div>

        <main class="p-5">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>