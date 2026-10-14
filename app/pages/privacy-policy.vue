<script setup lang="ts">
import type { Localized } from '~/types/content'

const locale = useI18n().locale

const eyebrow: Localized = { id: 'Kebijakan Privasi', en: 'Privacy Policy' }
const heading: Localized = { id: 'Kebijakan Privasi', en: 'Privacy Policy' }
const intro: Localized = {
  id: 'Halaman ini menjelaskan bagaimana PT. Toba Mandiri Sukses mengumpulkan, menggunakan, dan melindungi data pribadi yang Anda berikan melalui situs dan kanal komunikasi kami.',
  en: 'This page explains how PT. Toba Mandiri Sukses collects, uses, and protects the personal data you provide through our website and communication channels.'
}

const rawSections: Localized[] = [
  {
    id: '<strong>Data yang kami kumpulkan.</strong> Kami mengumpulkan nama, nama perusahaan, nomor telepon, alamat surel, dan pesan yang Anda kirimkan melalui formulir kontak, telepon, atau WhatsApp.',
    en: '<strong>Data we collect.</strong> We collect your name, company name, phone number, email address, and messages you submit through the contact form, phone, or WhatsApp.'
  },
  {
    id: '<strong>Penggunaan data.</strong> Data tersebut digunakan hanya untuk menjawab pertanyaan, menyiapkan penawaran harga, memproses pemesanan produk, dan mengoordinasikan pengiriman serta dukungan teknis.',
    en: '<strong>Use of data.</strong> This data is used only to answer inquiries, prepare quotations, process product orders, and coordinate delivery and technical support.'
  },
  {
    id: '<strong>Berbagi data.</strong> Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Data hanya dibagikan kepada mitra logistik bila diperlukan untuk pengiriman pesanan Anda.',
    en: '<strong>Data sharing.</strong> We do not sell or rent your personal data to third parties. Data is shared with logistics partners only when required to deliver your order.'
  },
  {
    id: '<strong>Keamanan.</strong> Data disimpan pada server yang aksesnya terbatas dan hanya digunakan oleh personel yang berwenang untuk keperluan layanan.',
    en: '<strong>Security.</strong> Data is stored on servers with restricted access and used only by authorised personnel for service purposes.'
  },
  {
    id: '<strong>Penyimpanan data.</strong> Data disimpan selama diperlukan untuk memenuhi tujuan di atas dan kewajiban hukum yang berlaku, setelah itu dihapus atau dianonimkan.',
    en: '<strong>Data retention.</strong> Data is stored for as long as necessary to fulfil the purposes above and applicable legal obligations, after which it is deleted or anonymised.'
  },
  {
    id: '<strong>Hak Anda.</strong> Anda dapat meminta akses, koreksi, atau penghapusan data pribadi Anda dengan menghubungi kami melalui halaman Kontak, surel pt.tobamandirisukses@gmail.com, atau telepon 021 8480 520.',
    en: '<strong>Your rights.</strong> You may request access, correction, or deletion of your personal data by contacting us through the Contact page, email pt.tobamandirisukses@gmail.com, or phone 021 8480 520.'
  },
  {
    id: '<strong>Perubahan kebijakan.</strong> Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan akan berlaku sejak dipublikasikan di halaman ini.',
    en: '<strong>Policy changes.</strong> This policy may be updated from time to time. Changes take effect once published on this page.'
  }
]

const sections = computed(() => rawSections.map((item) => pick(item, locale.value)))

const updatedLabel = computed(() => pick({
  id: 'Terakhir diperbarui',
  en: 'Last updated'
}, locale.value))

useSeoMeta({
  title: () => pick({
    id: 'Kebijakan Privasi | PT. Toba Mandiri Sukses',
    en: 'Privacy Policy | PT. Toba Mandiri Sukses'
  }, locale.value),
  description: () => pick({
    id: 'Kebijakan privasi dan pengelolaan data pribadi di PT. Toba Mandiri Sukses.',
    en: 'Privacy policy and personal data handling at PT. Toba Mandiri Sukses.'
  }, locale.value)
})
</script>

<template>
  <div>
    <PageHero :eyebrow="pick(eyebrow)" :title="pick(heading)" :intro="pick(intro)" />

    <section class="section">
      <div class="container-page max-w-3xl">
        <div class="prose-lkr">
          <p v-for="(item, index) in sections" :key="index" v-html="item" />
        </div>
        <p class="mt-8 text-xs text-ink-mute">
          {{ updatedLabel }}: 2026
        </p>
      </div>
    </section>

    <CtaBanner
      :heading="$t('services.contactCta')"
      :body="$t('contact.intro')"
      :button-label="$t('nav.contact')"
      button-to="/contact"
    />
  </div>
</template>
