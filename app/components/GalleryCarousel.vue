<script setup lang="ts">
/**
 * Galeri foto bergeser otomatis.
 *
 * Foto ditampilkan dalam kisi 4 foto per tampilan, lalu berpindah sendiri.
 * Dipakai di halaman profil untuk dokumentasi.
 */

const props = defineProps<{
  images: string[]
  /** Jumlah foto per tampilan. */
  perView?: number
  /** Durasi tiap tampilan dalam milidetik. */
  interval?: number
}>()

const current = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const perView = computed(() => Math.max(1, props.perView ?? 2))

/** Foto dikelompokkan per tampilan (mis. 4 foto). */
const pages = computed(() => {
  const result: string[][] = []
  for (let index = 0; index < props.images.length; index += perView.value) {
    result.push(props.images.slice(index, index + perView.value))
  }
  return result
})

const pageCount = computed(() => pages.value.length)
const hasMultiple = computed(() => pageCount.value > 1)

function goTo(index: number) {
  if (!pageCount.value) return
  current.value = (index + pageCount.value) % pageCount.value
}

function next() {
  goTo(current.value + 1)
}

function prev() {
  goTo(current.value - 1)
}

function start() {
  if (!hasMultiple.value || timer) return
  timer = setInterval(next, props.interval ?? 4500)
}

function stop() {
  if (timer) clearInterval(timer)
  timer = undefined
}

// Jumlah foto bisa berubah, jadi tampilan aktif harus tetap valid.
watch(pageCount, () => {
  goTo(0)
  stop()
  start()
})

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <div
    v-if="pageCount"
    class="group relative"
    @mouseenter="stop"
    @mouseleave="start"
  >
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-card dark:border-white/10 dark:bg-white/5">
      <div
        class="flex transition-transform duration-700 ease-out"
        :style="{ transform: `translateX(-${current * 100}%)` }"
      >
        <div
          v-for="(page, pageIndex) in pages"
          :key="pageIndex"
          class="grid w-full shrink-0 grid-cols-2 gap-4 p-4"
        >
          <div
            v-for="(src, index) in page"
            :key="index"
            class="grid aspect-16/9 place-items-center overflow-hidden rounded-xl bg-white p-2 dark:bg-white/5"
          >
            <img
              :src="src"
              :alt="`Foto ${pageIndex * perView + index + 1}`"
              class="max-h-full max-w-full object-contain"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </div>

    <template v-if="hasMultiple">
      <button
        type="button"
        class="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-700 opacity-0 shadow transition hover:bg-white group-hover:opacity-100 dark:bg-brand-900/90 dark:text-brand-300"
        aria-label="Sebelumnya"
        @click="prev"
      >
        <UiIcon name="arrow-right" :size="18" style="transform: rotate(180deg)" />
      </button>
      <button
        type="button"
        class="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-700 opacity-0 shadow transition hover:bg-white group-hover:opacity-100 dark:bg-brand-900/90 dark:text-brand-300"
        aria-label="Berikutnya"
        @click="next"
      >
        <UiIcon name="arrow-right" :size="18" />
      </button>

      <div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
        <button
          v-for="(page, index) in pages"
          :key="`dot-${index}`"
          type="button"
          class="h-2 rounded-full transition-all"
          :class="index === current ? 'w-6 bg-brand-600' : 'w-2 bg-white/70 hover:bg-white'"
          :aria-label="`Gambar ${index + 1}`"
          @click="goTo(index)"
        />
      </div>
    </template>
  </div>
</template>
