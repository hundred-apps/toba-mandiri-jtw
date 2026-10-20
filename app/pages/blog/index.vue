<script setup lang="ts">
import type { PostItem } from '~/types/content'

const { locale, t } = useI18n()
const route = useRoute()

const { data: posts } = await useCms<PostItem[]>('posts', 'all')
const { data: settings } = await useCompany()

const page = ref(Number(route.query.page) || 1)
const limit = 9

const allPosts = computed(() => [...(posts.value || [])].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
))
const totalPages = computed(() => Math.max(1, Math.ceil(allPosts.value.length / limit)))
const paginatedPosts = computed(() => {
  const start = (page.value - 1) * limit
  return allPosts.value.slice(start, start + limit)
})

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(locale.value === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

useSeoMeta({
  title: () => t('meta.blogTitle'),
  description: () => t('meta.blogDescription')
})
</script>

<template>
  <div class="min-h-screen">
    <section class="section bg-brand-50 dark:bg-brand-900/30">
      <div class="container-page">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="font-display text-4xl md:text-5xl font-bold text-brand-900 dark:text-white">
            {{ $t('blog.heading') }}
          </h1>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {{ $t('blog.intro') }}
          </p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-page">
        <div v-if="paginatedPosts.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="post in paginatedPosts" :key="post.id" class="card overflow-hidden group">
            <NuxtLink :to="`/${locale}/blog/${post.slug}`" class="block">
              <div class="aspect-[16/9] bg-brand-50 dark:bg-white/5 overflow-hidden">
                <img
                  v-if="post.cover"
                  :src="post.cover"
                  :alt="pick(post.title)"
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                >
                <div v-else class="h-full w-full flex items-center justify-center text-brand-200 dark:text-brand-700">
                  <UiIcon name="document" :size="48" />
                </div>
              </div>
              <div class="p-5">
                <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <time :datetime="post.publishedAt">
                    {{ formatDate(post.publishedAt) }}
                  </time>
                  <span v-if="post.category?.id" class="text-brand-600 dark:text-brand-400">{{ pick(post.category) }}</span>
                </div>
                <h3 class="text-xl font-bold text-brand-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                  {{ pick(post.title) }}
                </h3>
                <p class="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                  {{ pick(post.excerpt) }}
                </p>
                <div class="mt-4 flex items-center gap-2 text-sm">
                  <span v-if="post.author" class="text-slate-500 dark:text-slate-400">
                    {{ post.author }}
                  </span>
                  <span class="text-brand-600 dark:text-brand-400 font-medium">
                    Baca selengkapnya
                    <UiIcon name="arrow-right" :size="14" />
                  </span>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>

        <div v-else class="text-center py-20">
          <UiIcon name="document" :size="48" class="mx-auto text-brand-200 dark:text-brand-700" />
          <h3 class="mt-4 text-xl font-semibold text-brand-900 dark:text-white">
            Belum ada artikel
          </h3>
          <p class="mt-2 text-slate-500 dark:text-slate-400">
            Artikel akan muncul di sini setelah dipublikasikan.
          </p>
        </div>

        <nav v-if="totalPages > 1" class="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
          <button
            :disabled="page <= 1"
            @click="page -= 1"
            class="btn-outline"
            :aria-label="$t('common.prev')"
          >
            <UiIcon name="chevron-left" :size="18" />
          </button>
          <span class="px-4 text-sm font-medium text-brand-900 dark:text-white">
            Halaman {{ page }} dari {{ totalPages }}
          </span>
          <button
            :disabled="page >= totalPages"
            @click="page += 1"
            class="btn-outline"
            :aria-label="$t('common.next')"
          >
            <UiIcon name="chevron-right" :size="18" />
          </button>
        </nav>
      </div>
    </section>
  </div>
</template>