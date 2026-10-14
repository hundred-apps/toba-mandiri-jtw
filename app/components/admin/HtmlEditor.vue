<script setup lang="ts">
/**
 * Editor WYSIWYG ringan berbasis contenteditable (tanpa dependensi eksternal).
 * Nilai disimpan sebagai HTML string, cocok untuk field `body` pada artikel.
 */
const props = defineProps<{
  modelValue?: unknown
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editor = ref<HTMLDivElement | null>(null)
/** Penanda update berasal dari dalam editor supaya tidak menimpa kursor. */
let internal = false

function currentHtml(): string {
  if (props.modelValue === null || props.modelValue === undefined) return ''
  return String(props.modelValue)
}

function writeToEditor() {
  if (!editor.value) return
  if (editor.value.innerHTML !== currentHtml()) editor.value.innerHTML = currentHtml()
}

function onInput() {
  if (!editor.value) return
  internal = true
  emit('update:modelValue', editor.value.innerHTML)
}

function exec(command: string, value?: string) {
  if (props.disabled) return
  editor.value?.focus()
  document.execCommand(command, false, value)
  onInput()
}

function formatBlock(tag: string) {
  exec('formatBlock', tag)
}

function createLink() {
  const url = window.prompt('URL tautan', 'https://')
  if (url) exec('createLink', url)
}

function editHtml() {
  const next = window.prompt('Sunting HTML', currentHtml())
  if (next !== null) {
    emit('update:modelValue', next)
    nextTick(writeToEditor)
  }
}

onMounted(writeToEditor)

watch(() => props.modelValue, () => {
  if (internal) {
    internal = false
    return
  }
  writeToEditor()
})
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-slate-300 bg-white dark:border-white/15 dark:bg-brand-950/40">
    <div class="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-1.5 dark:border-white/10 dark:bg-white/5">
      <button type="button" class="wysiwyg-btn font-bold" title="Tebal" :disabled="disabled" @click="exec('bold')">B</button>
      <button type="button" class="wysiwyg-btn italic" title="Miring" :disabled="disabled" @click="exec('italic')">I</button>
      <button type="button" class="wysiwyg-btn underline" title="Garis bawah" :disabled="disabled" @click="exec('underline')">U</button>
      <span class="mx-1 h-5 w-px bg-slate-300 dark:bg-white/15" />
      <button type="button" class="wysiwyg-btn" title="Judul 2" :disabled="disabled" @click="formatBlock('H2')">H2</button>
      <button type="button" class="wysiwyg-btn" title="Judul 3" :disabled="disabled" @click="formatBlock('H3')">H3</button>
      <button type="button" class="wysiwyg-btn" title="Paragraf" :disabled="disabled" @click="formatBlock('P')">Paragraf</button>
      <span class="mx-1 h-5 w-px bg-slate-300 dark:bg-white/15" />
      <button type="button" class="wysiwyg-btn" title="Daftar berbutir" :disabled="disabled" @click="exec('insertUnorderedList')">Bullet</button>
      <button type="button" class="wysiwyg-btn" title="Daftar bernomor" :disabled="disabled" @click="exec('insertOrderedList')">1. Teks</button>
      <button type="button" class="wysiwyg-btn" title="Kutipan" :disabled="disabled" @click="formatBlock('BLOCKQUOTE')">Kutipan</button>
      <span class="mx-1 h-5 w-px bg-slate-300 dark:bg-white/15" />
      <button type="button" class="wysiwyg-btn" title="Tautan" :disabled="disabled" @click="createLink">Tautan</button>
      <button type="button" class="wysiwyg-btn" title="Hapus format" :disabled="disabled" @click="exec('removeFormat')">Bersihkan</button>
      <button type="button" class="wysiwyg-btn ml-auto" title="Sunting HTML mentah" :disabled="disabled" @click="editHtml">HTML</button>
    </div>

    <div
      ref="editor"
      class="prose prose-brand max-w-none min-h-[14rem] overflow-y-auto px-3 py-2 text-sm focus:outline-none dark:prose-invert"
      :contenteditable="!disabled"
      :data-placeholder="placeholder"
      @input="onInput"
      @blur="onInput"
    />
  </div>
</template>

<style scoped>
.wysiwyg-btn {
  min-width: 2rem;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  color: rgb(71 85 105);
  transition: background-color 0.15s;
}
.wysiwyg-btn:hover:not(:disabled) {
  background-color: rgb(226 232 240);
}
.wysiwyg-btn:disabled {
  opacity: 0.5;
}
:global(.dark) .wysiwyg-btn {
  color: rgb(203 213 225);
}
:global(.dark) .wysiwyg-btn:hover:not(:disabled) {
  background-color: rgb(255 255 255 / 0.1);
}
[contenteditable='true']:empty::before {
  content: attr(data-placeholder);
  color: rgb(148 163 184);
}
</style>
