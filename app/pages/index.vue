<script setup lang="ts">
import type { HomeContent, PostItem, ServiceItem } from '~/types/content'

const { locale, t } = useI18n()
const milestones = useMilestones()

const { data: home } = await useCms<HomeContent>('home', 'home')
const { data: posts } = await useCms<PostItem[]>('posts', 'all')
const { data: services } = await useCms<ServiceItem[]>('services', 'all')

const latestPosts = computed(() => [...(posts.value || [])]
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  .slice(0, 6))

useSeoMeta({
  title: () => t('meta.homeTitle'),
  description: () => t('meta.homeDescription'),
  ogTitle: () => t('meta.homeTitle'),
  ogDescription: () => t('meta.homeDescription'),
  ogType: 'website'
})
</script>

<template>
  <div>
    <HomeHero :hero="home.hero" />

    <section class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.products')"
          :heading="$t('home.categoriesTitle')"
          :body="$t('home.categoriesBody')"
        />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            v-for="category in home.categories"
            :key="category.id"
            :category="category"
          />
        </div>
        <div class="mt-10 flex justify-center">
          <NuxtLink :to="`/${locale}/products`" class="btn-primary">
            {{ $t('common.viewAll') }}
            <UiIcon name="arrow-right" :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.primary')"
          :heading="$t('home.servicesTitle')"
          :body="$t('services.intro')"
        />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            v-for="service in services.slice(0, 6)"
            :key="service.id"
            :service="service"
          />
        </div>
        <div class="mt-10 flex justify-center">
          <NuxtLink :to="`/${locale}/services`" class="btn-outline">
            {{ $t('common.viewAll') }} {{ $t('nav.services').toLowerCase() }}
            <UiIcon name="arrow-right" :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <UiSectionHeading
          :heading="$t('home.aboutHeading')"
          :body="$t('home.aboutBody')"
        />
        <MilestoneTimeline :items="milestones" />
      </div>
    </section>

    <section v-if="home.customers.length" class="section section-alt">
      <div class="container-page">
        <UiSectionHeading :eyebrow="$t('nav.customers')" :heading="$t('customers.title')" :body="$t('customers.intro')" />
        <div class="mt-10">
          <CustomerGrid :items="home.customers" />
        </div>
        <div class="mt-10 flex justify-center">
          <NuxtLink :to="`/${locale}/customers`" class="btn-outline">
            {{ $t('customers.viewAll') }}
            <UiIcon name="arrow-right" :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section v-if="latestPosts.length" class="section">
      <div class="container-page">
        <UiSectionHeading :heading="$t('home.blogTitle')" align="center" />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="post in latestPosts" :key="post.id" class="card overflow-hidden">
            <NuxtLink :to="`/${locale}/blog/${post.slug}`" class="block">
              <div class="aspect-[16/9] bg-brand-50 dark:bg-white/5">
                <img v-if="post.cover" :src="post.cover" :alt="pick(post.title)" class="h-full w-full object-cover" loading="lazy">
              </div>
              <div class="p-5">
                <p class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {{ pick(post.category) }}
                </p>
                <h3 class="mt-2 text-base leading-snug">
                  {{ pick(post.title) }}
                </h3>
                <p class="prose-lkr mt-2 line-clamp-3 text-sm">
                  {{ pick(post.excerpt) }}
                </p>
              </div>
            </NuxtLink>
          </article>
        </div>
        <div class="mt-10 flex justify-center">
          <NuxtLink :to="`/${locale}/blog`" class="btn-outline">
            {{ $t('blog.viewAll') }}
            <UiIcon name="arrow-right" :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBanner
      :heading="$t('home.ctaHeading')"
      :body="$t('home.ctaBody')"
      :button-label="$t('home.ctaButton')"
      button-to="/contact"
      :secondary-label="$t('nav.products')"
      secondary-to="/products"
    />
  </div>
</template>
