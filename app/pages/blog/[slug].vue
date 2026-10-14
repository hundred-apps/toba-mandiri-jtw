<script setup lang="ts">
import type { PostItem } from '~/types/content'

const { locale } = useI18n()
const route = useRoute()
const { getPost } = useContentSource()

const slug = String(route.params.slug || '')
const { data: post } = await useAsyncData<PostItem | null>(`post:${slug}`, () => getPost(slug))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan' })
}

const { trackView } = useContentSource()
onMounted(() => {
  if (post.value) trackView('/post-view', post.value.id).catch(() => {})
})

useSeoMeta({
  title: () => `${pick(post.value?.title)} | PT. Toba Mandiri Sukses`,
  description: () => pick(post.value?.excerpt),
  ogTitle: () => pick(post.value?.title),
  ogDescription: () => pick(post.value?.excerpt),
  ogType: 'article',
  ogImage: () => post.value?.cover,
  articlePublishedTime: () => post.value?.publishedAt,
  articleAuthor: () => post.value?.author ? [post.value.author] : []
})

function formattedDate(dateStr: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(locale.value === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div v-if="post" class="min-h-screen">
    <article class="section">
      <div class="container-page max-w-3xl">
        <header class="mb-8">
          <div class="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <time :datetime="post.publishedAt">
              {{ formattedDate(post.publishedAt) }}
            </time>
            <span v-if="post.category?.id || post.category?.en" class="px-2 py-0.5 rounded bg-brand-50 text-brand-700 text-xs font-medium dark:bg-brand-900/30 dark:text-brand-300">
              {{ pick(post.category) }}
            </span>
            <span v-if="post.author" class="text-slate-500">
              Oleh {{ post.author }}
            </span>
          </div>

          <h1 class="font-display text-3xl md:text-4xl font-bold text-brand-900 dark:text-white leading-tight">
            {{ pick(post.title) }}
          </h1>

          <div v-if="post.cover" class="mt-6 aspect-[16/9] rounded-xl overflow-hidden">
            <img :src="post.cover" :alt="pick(post.title)" class="h-full w-full object-cover">
          </div>
        </header>

        <div v-if="post.tags?.length" class="mb-8 flex flex-wrap gap-2">
          <span v-for="tag in post.tags" :key="tag" class="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm dark:bg-brand-900/30 dark:text-brand-300">
            {{ tag }}
          </span>
        </div>

        <div class="prose prose-brand max-w-none dark:prose-invert">
          <div v-html="pick(post.body)" />
        </div>

        <footer class="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <UiIcon name="calendar" :size="16" />
              <time :datetime="post.publishedAt">{{ formattedDate(post.publishedAt) }}</time>
            </div>
            <div class="flex items-center gap-2">
              <NuxtLink :to="`/${locale}/blog`" class="btn-outline">
                <UiIcon name="arrow-left" :size="16" />
                Kembali ke Blog
              </NuxtLink>
            </div>
          </div>
        </footer>
      </div>
    </article>
  </div>
</template>