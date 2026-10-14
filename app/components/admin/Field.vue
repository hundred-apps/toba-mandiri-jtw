<script setup lang="ts">
import type { FieldDef } from "~/admin/types";

const props = defineProps<{
  field: FieldDef;
  modelValue: unknown;
  disabled?: boolean;
}>();

const emit = defineEmits<{ "update:modelValue": [value: unknown] }>();

const options = ref<Array<{ value: string; label: string }>>([]);
const loadingOptions = ref(false);

const isBilingual = computed(() => Boolean(props.field.bilingual));

const current = computed<unknown>({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

/** Proxy untuk field bilingual: nilai ID dan EN terpisah. */
const bilingualValue = computed<{ id: string; en: string }>({
  get: () => {
    const value = props.modelValue as
      | Record<string, unknown>
      | null
      | undefined;
    if (!value) return { id: "", en: "" };
    return {
      id: String(value.id ?? ""),
      en: String(value.en ?? ""),
    };
  },
  set: (val) => {
    const base = (
      props.modelValue &&
      typeof props.modelValue === "object" &&
      !Array.isArray(props.modelValue)
        ? { ...(props.modelValue as Record<string, unknown>) }
        : {}
    ) as Record<string, unknown>;
    base.id = val.id;
    base.en = val.en;
    emit("update:modelValue", base);
  },
});

/**
 * Computed per sisi bahasa. `v-model` ke sub-properti computed (mis.
 * `bilingualValue.id`) tidak memanggil setter, jadi perlu ref tersendiri.
 */
const bilingualId = computed<string>({
  get: () => bilingualValue.value.id,
  set: (val) => {
    const next = props.field.kind === "slug" ? syncSlug(val) : val;
    bilingualValue.value = { ...bilingualValue.value, id: next };
  },
});

const bilingualEn = computed<string>({
  get: () => bilingualValue.value.en,
  set: (val) => {
    bilingualValue.value = { ...bilingualValue.value, en: val };
  },
});

/** Nilai untuk field non-bilingual. */
const singleValue = computed<string>({
  get: () => {
    if (Array.isArray(props.modelValue)) return "";
    if (typeof props.modelValue === "object" && props.modelValue !== null)
      return "";
    return String(props.modelValue ?? "");
  },
  set: (value) => {
    if (props.field.kind === "slug") {
      current.value = syncSlug(value);
    } else {
      current.value = value;
    }
  },
});

/** Proxy untuk field gambar: string URL atau File baru. */
const imageModel = computed<unknown>({
  get: () => {
    if (current.value instanceof File) return current.value;
    return typeof current.value === "string" ? current.value : "";
  },
  set: (value) => {
    current.value = value;
  },
});

/**
 * Proxy untuk field select. Opsi selalu string, sedangkan nilai dari API bisa
 * number (mis. categoryId). Samakan ke string agar cocok & tersimpan.
 */
const selectModel = computed<string>({
  get: () => {
    const value = current.value;
    if (value === null || value === undefined || value === "") return "";
    return String(value);
  },
  set: (value) => {
    current.value = value;
  },
});

/** Proxy untuk field gallery: komponennya menerima array item. */
const galleryModel = computed<unknown[]>({
  get: () => (Array.isArray(current.value) ? current.value : []),
  set: (value) => {
    current.value = value;
  },
});

/** Proxy untuk field ikon (Iconify): komponennya hanya menerima string. */
const iconModel = computed<string>({
  get: () => String(current.value ?? ""),
  set: (value) => {
    current.value = value;
  },
});

/** Proxy tunggal untuk input teks: menulis ke nilai tunggal. */
const textModel = computed<string>({
  get: () => (isBilingual.value ? "" : String(current.value ?? "")),
  set: (value) => {
    if (isBilingual.value) return;
    current.value = props.field.kind === "slug" ? syncSlug(value) : value;
  },
});

const list = computed<string[]>({
  get: () =>
    Array.isArray(props.modelValue) ? (props.modelValue as string[]) : [],
  set: (value) => emit("update:modelValue", value),
});

const localizedList = computed<string[]>({
  get: () => {
    const value = props.modelValue as
      | Record<string, string[]>
      | null
      | undefined;
    return [];
  },
  set: (value) => {
    // Not used for bilingual repeater - handled separately
  },
});

interface PairRow {
  label: { id: string; en: string };
  value: { id: string; en: string };
}

const emptyPair = (): PairRow => ({
  label: { id: "", en: "" },
  value: { id: "", en: "" },
});

const pairs = computed<PairRow[]>({
  get: () =>
    Array.isArray(props.modelValue) ? (props.modelValue as PairRow[]) : [],
  set: (value) => emit("update:modelValue", value),
});

const emptyPairRow = (): PairRow => ({
  label: { id: "", en: "" },
  value: { id: "", en: "" },
});

const placeholder = computed(() => {
  if (!props.field.placeholder) return { id: "", en: "" };
  if (typeof props.field.placeholder === "object") {
    return {
      id: props.field.placeholder.id ?? "",
      en: props.field.placeholder.en ?? "",
    };
  }
  return {
    id: String(props.field.placeholder),
    en: String(props.field.placeholder),
  };
});

watch(
  () => props.field.optionsFrom,
  async (source) => {
    options.value = props.field.options || [];
    if (!source) return;
    loadingOptions.value = true;
    const { list } = useAdminApi();
    const result = await list<Record<string, unknown>>(source.resource, {
      limit: 200,
    });
    options.value = result.data.map((row) => {
      const raw = row[source.labelKey];
      const label =
        raw && typeof raw === "object" && !Array.isArray(raw)
          ? String(
              (raw as Record<string, unknown>).id ??
                (raw as Record<string, unknown>).en ??
                ""
            )
          : String(raw ?? "");
      return { value: String(row[source.valueKey] ?? ""), label };
    });
    loadingOptions.value = false;
  },
  { immediate: true }
);

function addListItem() {
  list.value = [...list.value, ""];
}

function removeListItem(index: number) {
  list.value = list.value.filter((_, i) => i !== index);
}

function addLocalizedItem() {
  // Not used - bilingual repeater handled differently
}

function removeLocalizedItem(index: number) {
  // Not used
}

function addPair() {
  pairs.value = [...pairs.value, emptyPairRow()];
}

function removePair(index: number) {
  pairs.value = pairs.value.filter((_, i) => i !== index);
}

function setPairLabel(index: number, side: "id" | "en", value: string) {
  const next = pairs.value.map((row, i) =>
    i === index ? { ...row, label: { ...row.label, [side]: value } } : row
  );
  pairs.value = next;
}

function setPairValue(index: number, side: "id" | "en", value: string) {
  const next = pairs.value.map((row, i) =>
    i === index ? { ...row, value: { ...row.value, [side]: value } } : row
  );
  pairs.value = next;
}

/** Slug otomatis dari judul Bahasa Indonesia saat slug masih kosong. */
function syncSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function abs(url: string): string {
  if (!url) return "";
  if (/^https?:\/\//.test(url)) return url;
  const base = String(useRuntimeConfig().public.apiBase || "").replace(
    /\/api\/v1\/?$/,
    ""
  );
  return base ? `${base}${url.startsWith("/") ? "" : "/"}${url}` : url;
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between gap-3">
      <span class="text-sm font-semibold text-slate-800 dark:text-slate-100">
        {{ field.label }}
        <span v-if="field.required" class="text-red-500">*</span>
      </span>
      <div
        v-if="field.kind === 'select' && loadingOptions"
        class="text-xs text-slate-500"
      >
        Memuat opsi...
      </div>
    </div>

    <p v-if="field.help" class="text-xs text-slate-500 dark:text-slate-400">
      {{ field.help }}
    </p>

    <!-- Bilingual text input (side by side) -->
    <div
      v-if="isBilingual && (field.kind === 'text' || field.kind === 'slug')"
      class="grid grid-cols-2 gap-4"
    >
      <label class="flex flex-col gap-1.5">
        <span class="text-xs font-medium text-slate-600 dark:text-slate-400"
          >Indonesia</span
        >
        <input
          v-model="bilingualId"
          type="text"
          class="field"
          :placeholder="placeholder.id"
          :disabled="disabled"
        />
      </label>
      <label class="flex flex-col gap-1.5">
        <span class="text-xs font-medium text-slate-600 dark:text-slate-400"
          >English</span
        >
        <input
          v-model="bilingualEn"
          type="text"
          class="field"
          :placeholder="placeholder.en"
          :disabled="disabled"
        />
      </label>
    </div>

    <!-- Bilingual HTML (WYSIWYG) -->
    <!-- <div v-if="isBilingual && field.kind === 'html'" class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div class="flex flex-col gap-1.5">
        <span class="text-xs font-medium text-slate-600 dark:text-slate-400">Indonesia</span>
        <AdminHtmlEditor v-model="bilingualId" :placeholder="placeholder.id" :disabled="disabled" />
      </div>
      <div class="flex flex-col gap-1.5">
        <span class="text-xs font-medium text-slate-600 dark:text-slate-400">English</span>
        <AdminHtmlEditor v-model="bilingualEn" :placeholder="placeholder.en" :disabled="disabled" />
      </div>
    </div> -->

    <!-- Bilingual textarea (side by side) -->
    <div
      v-else-if="isBilingual && field.kind === 'textarea'"
      class="grid grid-cols-2 gap-4"
    >
      <label class="flex flex-col gap-1.5">
        <span class="text-xs font-medium text-slate-600 dark:text-slate-400"
          >Indonesia</span
        >
        <textarea
          v-model="bilingualId"
          :rows="field.rows || 4"
          class="field resize-y"
          :placeholder="placeholder.id"
          :disabled="disabled"
        />
      </label>
      <label class="flex flex-col gap-1.5">
        <span class="text-xs font-medium text-slate-600 dark:text-slate-400"
          >English</span
        >
        <textarea
          v-model="bilingualEn"
          :rows="field.rows || 10"
          class="field resize-y font-mono text-xs leading-relaxed"
          :placeholder="placeholder.en"
          :disabled="disabled"
        />
      </label>
    </div>

    <!-- Non-bilingual text input -->
    <input
      v-else-if="field.kind === 'text' || field.kind === 'slug'"
      v-model="textModel"
      type="text"
      class="field"
      :placeholder="placeholder.id"
      :disabled="disabled"
      @input="field.kind === 'slug' ? syncSlug(textModel) : undefined"
    />

    <!-- Non-bilingual textarea -->
    <textarea
      v-else-if="field.kind === 'textarea'"
      v-model="singleValue"
      :rows="field.rows || 4"
      class="field resize-y"
      :placeholder="placeholder.id"
      :disabled="disabled"
    />

    <!-- Non-bilingual html (WYSIWYG) -->
    <AdminHtmlEditor
      v-else-if="field.kind === 'html'"
      v-model="singleValue"
      :placeholder="placeholder.id"
      :disabled="disabled"
    />

    <input
      v-else-if="field.kind === 'number'"
      v-model.number="current"
      type="number"
      class="field"
      :min="field.min"
      :max="field.max"
      :step="field.step ?? 1"
      :disabled="disabled"
    />

    <input
      v-else-if="field.kind === 'date'"
      v-model="current"
      type="date"
      class="field"
      :disabled="disabled"
    />

    <input
      v-else-if="field.kind === 'password'"
      v-model="current"
      type="password"
      class="field"
      autocomplete="new-password"
      :disabled="disabled"
    />

    <input
      v-else-if="field.kind === 'tags'"
      :value="Array.isArray(current) ? (current as string[]).join(', ') : String(current ?? '')"
      type="text"
      class="field"
      placeholder="tag satu, tag dua"
      :disabled="disabled"
      @input="
        current = ($event.target as HTMLInputElement).value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      "
    />

    <label v-else-if="field.kind === 'toggle'" class="flex items-center gap-3">
      <input
        v-model="current"
        type="checkbox"
        class="h-5 w-5 rounded border-slate-300 text-brand-700"
        :disabled="disabled"
      />
      <span class="text-sm text-slate-600 dark:text-slate-300">{{
        current ? "Aktif" : "Nonaktif"
      }}</span>
    </label>

    <select
      v-else-if="field.kind === 'select'"
      v-model="selectModel"
      class="field"
      :disabled="disabled || loadingOptions"
    >
      <option value="">
        {{ loadingOptions ? "Memuat opsi..." : "-- pilih --" }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label || option.value }}
      </option>
    </select>

    <AdminIconPicker
      v-else-if="field.kind === 'icon'"
      v-model="iconModel"
      :disabled="disabled"
    />

    <AdminImageField
      v-else-if="field.kind === 'image'"
      v-model="imageModel"
      :label="field.label"
      :disabled="disabled"
    />

    <AdminGalleryField
      v-else-if="field.kind === 'gallery'"
      v-model="galleryModel"
      :label="field.label"
      :max="field.max"
      :disabled="disabled"
    />

    <div v-else-if="field.kind === 'repeater'" class="space-y-2">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="flex items-center gap-2"
      >
        <input
          :value="item"
          type="text"
          class="field"
          :placeholder="placeholder.id"
          :disabled="disabled"
          @input="
            list = list.map((row, i) =>
              i === index ? ($event.target as HTMLInputElement).value : row
            )
          "
        />
        <button
          type="button"
          class="btn-ghost !px-3 !py-2"
          :disabled="disabled"
          @click="removeListItem(index)"
        >
          <UiIcon name="close" :size="16" />
        </button>
      </div>
      <button
        type="button"
        class="btn-outline !py-2"
        :disabled="disabled"
        @click="addListItem"
      >
        Tambah
      </button>
    </div>

    <div v-else-if="field.kind === 'pair'" class="space-y-3">
      <div
        v-for="(row, index) in pairs"
        :key="index"
        class="rounded-xl border border-slate-200 p-3 dark:border-white/10"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500"
            >Baris {{ index + 1 }}</span
          >
          <button
            type="button"
            class="btn-ghost !px-2 !py-1 text-xs"
            :disabled="disabled"
            @click="removePair(index)"
          >
            Hapus
          </button>
        </div>
        <div class="mt-2 grid gap-2 sm:grid-cols-2">
          <input
            :value="row.label.id"
            type="text"
            class="field"
            placeholder="Label (ID)"
            :disabled="disabled"
            @input="
              setPairLabel(
                index,
                'id',
                ($event.target as HTMLInputElement).value
              )
            "
          />
          <input
            :value="row.label.en"
            type="text"
            class="field"
            placeholder="Label (EN)"
            :disabled="disabled"
            @input="
              setPairLabel(
                index,
                'en',
                ($event.target as HTMLInputElement).value
              )
            "
          />
          <input
            :value="row.value.id"
            type="text"
            class="field"
            placeholder="Nilai (ID)"
            :disabled="disabled"
            @input="
              setPairValue(
                index,
                'id',
                ($event.target as HTMLInputElement).value
              )
            "
          />
          <input
            :value="row.value.en"
            type="text"
            class="field"
            placeholder="Nilai (EN)"
            :disabled="disabled"
            @input="
              setPairValue(
                index,
                'en',
                ($event.target as HTMLInputElement).value
              )
            "
          />
        </div>
      </div>
      <button
        type="button"
        class="btn-outline !py-2"
        :disabled="disabled"
        @click="addPair"
      >
        Tambah baris
      </button>
    </div>
  </div>
</template>
