export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/fonts', '@nuxt/icon'],
  icon: {
    serverBundle: 'local',
    clientBundle: { scan: true }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#082c49' }
      ]
    }
  },
  routeRules: {
    '/admin/**': { ssr: false }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://lobuntalubricants.com'
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config'
  },
  i18n: {
    strategy: 'prefix',
    defaultLocale: 'id',
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lkr_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'id'
    },
    locales: [
      { code: 'id', language: 'id-ID', name: 'Bahasa Indonesia', file: 'id.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ]
  }
})