<script setup lang="ts">
import type { Localized } from '~/types/content'

const locale = useI18n().locale

const eyebrow: Localized = { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' }
const heading: Localized = { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' }
const intro: Localized = {
  id: 'Dengan menggunakan layanan dan melakukan transaksi dengan PT. Toba Mandiri Sukses, Anda menyetujui syarat dan ketentuan berikut.',
  en: 'By using our services and conducting transactions with PT. Toba Mandiri Sukses, you agree to the following terms and conditions.'
}

const rawSections: Localized[] = [
  {
    id: '<strong>1. Ruang lingkup.</strong> Syarat dan ketentuan ini mengatur penggunaan situs serta transaksi pembelian produk chemical dan layanan dari PT. Toba Mandiri Sukses.',
    en: '<strong>1. Scope.</strong> These terms and conditions govern the use of our site and the purchase of chemical products and services from PT. Toba Mandiri Sukses.'
  },
  {
    id: '<strong>2. Pesanan.</strong> Pesanan dianggap sah setelah dikonfirmasi oleh tim kami, baik melalui surel, telepon, maupun WhatsApp. Syarat teknis dan jumlah mengikuti kesepakatan pada saat konfirmasi.',
    en: '<strong>2. Orders.</strong> An order is valid once confirmed by our team, whether by email, phone, or WhatsApp. Technical requirements and quantities follow the agreement made at confirmation.'
  },
  {
    id: '<strong>3. Harga.</strong> Harga yang tercantum dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Harga final mengikuti penawaran resmi yang kami kirimkan.',
    en: '<strong>3. Pricing.</strong> Listed prices may change at any time without prior notice. The final price follows the official quotation we send.'
  },
  {
    id: '<strong>4. Pembayaran.</strong> Pembayaran dilakukan sesuai metode dan jangka waktu yang disepakati pada saat konfirmasi pesanan.',
    en: '<strong>4. Payment.</strong> Payment is made according to the method and period agreed upon at order confirmation.'
  },
  {
    id: '<strong>5. Kemasan dan pengiriman.</strong> Kemasan dan jadwal pengiriman dikoordinasikan bersama pelanggan. Waktu pengiriman bersifat estimasi dan dapat dipengaruhi ketersediaan stok serta layanan logistik pihak ketiga.',
    en: '<strong>5. Packaging and delivery.</strong> Packaging and delivery schedules are coordinated with the customer. Delivery times are estimates and may be affected by stock availability and third-party logistics services.'
  },
  {
    id: '<strong>6. Mutu dan keselamatan.</strong> Produk dipasok sesuai spesifikasi yang disepakati. Informasi penanganan, penyimpanan, dan keselamatan kerja (K3) disediakan untuk memastikan penggunaan chemical yang aman. Pelanggan wajib mengikuti prosedur penanganan yang berlaku di lokasinya.',
    en: '<strong>6. Quality and safety.</strong> Products are supplied according to the agreed specification. Handling, storage, and workplace safety (K3) information is provided to ensure safe chemical use. The customer must follow the handling procedures applicable at its site.'
  },
  {
    id: '<strong>7. Klaim produk.</strong> Klaim atas produk yang rusak atau tidak sesuai harus disampaikan segera setelah barang diterima, disertai bukti yang memadai.',
    en: '<strong>7. Product claims.</strong> Claims for damaged or non-conforming products must be submitted promptly after receipt, with adequate evidence.'
  },
  {
    id: '<strong>8. Pembatasan tanggung jawab.</strong> Kami tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan produk yang tidak sesuai anjuran teknis atau informasi keselamatan kami.',
    en: '<strong>8. Limitation of liability.</strong> We are not liable for indirect losses arising from the use of products contrary to our technical recommendations or safety information.'
  },
  {
    id: '<strong>9. Hukum yang berlaku.</strong> Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai hukum yang berlaku di Republik Indonesia.',
    en: '<strong>9. Governing law.</strong> These terms and conditions are governed by and construed in accordance with the laws applicable in the Republic of Indonesia.'
  }
]

const sections = computed(() => rawSections.map((item) => pick(item, locale.value)))

const updatedLabel = computed(() => pick({
  id: 'Terakhir diperbarui',
  en: 'Last updated'
}, locale.value))

useSeoMeta({
  title: () => pick({
    id: 'Syarat & Ketentuan | PT. Toba Mandiri Sukses',
    en: 'Terms & Conditions | PT. Toba Mandiri Sukses'
  }, locale.value),
  description: () => pick({
    id: 'Syarat dan ketentuan penggunaan layanan serta transaksi di PT. Toba Mandiri Sukses.',
    en: 'Terms and conditions for using the services and transactions at PT. Toba Mandiri Sukses.'
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
