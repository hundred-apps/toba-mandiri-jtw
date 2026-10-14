<script setup lang="ts">
/**
 * Menampilkan konten HTML dari CMS.
 * Sumber konten adalah backend sendiri (Express + CMS), bukan input publik,
 * jadi v-html dipakai di sini. Kalau suatu hari ada konten dari visitor,
 * bersihkan di backend sebelum disimpan.
 */
const props = defineProps<{ html?: string | null }>()
</script>

<template>
  <div v-if="props.html" class="prose-lkr" v-html="props.html" />
</template>