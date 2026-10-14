<script setup lang="ts">
import type { Localized } from '~/types/content'

const locale = useI18n().locale

const eyebrow: Localized = { id: 'FAQ', en: 'FAQ' }
const heading: Localized = {
  id: 'Pertanyaan yang sering diajukan',
  en: 'Frequently asked questions'
}
const intro: Localized = {
  id: 'Pertanyaan yang paling sering kami terima seputar produk chemical, kemasan, pengiriman, dan dukungan teknis PT. Toba Mandiri Sukses.',
  en: 'The questions we most often receive about chemical products, packaging, delivery, and technical support from PT. Toba Mandiri Sukses.'
}

const rawFaqs: { q: Localized; a: Localized }[] = [
  {
    q: {
      id: 'Produk chemical apa saja yang Anda sediakan?',
      en: 'What chemical products do you provide?'
    },
    a: {
      id: 'Kami memasok chemical proses untuk industri ban dan karet, komponen karet otomotif, pengolahan air, smelter, dan pabrik semen. Contohnya carbon black, silica, zinc oxide, stearic acid, accelerator (CBS, MBT), antioxidant (TMQ, 6PPD), paraffinic oil, minarex oil, PAC, flocculant, soda ash, caustic soda, sulphuric acid, hingga grinding aid dan cement additive.',
      en: 'We supply process chemicals for the tire and rubber, automotive rubber component, water treatment, smelter, and cement plant industries. Examples include carbon black, silica, zinc oxide, stearic acid, accelerators (CBS, MBT), antioxidants (TMQ, 6PPD), paraffinic oil, minarex oil, PAC, flocculant, soda ash, caustic soda, sulphuric acid, as well as grinding aid and cement additive.'
    }
  },
  {
    q: {
      id: 'Segmen industri apa yang Anda layani?',
      en: 'Which industry segments do you serve?'
    },
    a: {
      id: 'Lima segmen: industri ban dan karet, komponen karet otomotif, pengolahan air, smelter, dan pabrik semen.',
      en: 'Five segments: the tire and rubber industry, automotive rubber components, water treatment, smelter, and cement plants.'
    }
  },
  {
    q: {
      id: 'Apakah ada minimal pembelian?',
      en: 'Is there a minimum order?'
    },
    a: {
      id: 'Untuk pembelian eceran tidak ada minimal pembelian. Untuk kontrak pasokan rutin dan pembelian volume besar, silakan hubungi tim kami untuk penawaran khusus sesuai kebutuhan.',
      en: 'There is no minimum order for retail purchases. For recurring supply contracts and bulk volumes, please contact our team for a quotation tailored to your needs.'
    }
  },
  {
    q: {
      id: 'Kemasan apa yang tersedia?',
      en: 'Which packaging formats are available?'
    },
    a: {
      id: 'Kami menyediakan kemasan yang disesuaikan dengan jenis produk: sack untuk serbuk dan granul, jumbo bag untuk material bulk, drum dan IBC untuk produk cair bervolume sedang, serta tanker truck untuk pengiriman cairan dalam volume besar.',
      en: 'Packaging is matched to the product type: sacks for powders and granules, jumbo bags for bulk materials, drums and IBC totes for medium-volume liquids, and tanker trucks for large-volume liquid delivery.'
    }
  },
  {
    q: {
      id: 'Metode pembayaran apa yang tersedia?',
      en: 'Which payment methods are available?'
    },
    a: {
      id: 'Kami menerima transfer bank dan pembayaran tunai. Untuk pelanggan korporat, tersedia opsi pembayaran sesuai kesepakatan kontrak.',
      en: 'We accept bank transfer and cash payment. For corporate customers, payment options can be arranged according to the contract agreement.'
    }
  },
  {
    q: {
      id: 'Apakah bisa dikirim ke luar kota?',
      en: 'Can you deliver outside the city?'
    },
    a: {
      id: 'Bisa. Kami mengoordinasikan jadwal pengiriman bersama tim operasional Anda dan mendistribusikan produk ke berbagai wilayah dengan estimasi waktu kirim yang disesuaikan tujuan.',
      en: 'Yes. We coordinate delivery schedules with your operations team and distribute products to various regions, with estimated delivery times adjusted to the destination.'
    }
  },
  {
    q: {
      id: 'Apakah tersedia dukungan teknis dan informasi K3?',
      en: 'Do you provide technical support and safety (K3) information?'
    },
    a: {
      id: 'Ya. Kami mendampingi konsultasi pemilihan produk, informasi keselamatan penanganan dan penyimpanan chemical, komunikasi bahaya melalui label dan lembar data keselamatan (MSDS), hingga peningkatan kesadaran K3 untuk tim Anda.',
      en: 'Yes. We support product selection consultation, chemical handling and storage safety information, hazard communication through labels and safety data sheets (MSDS), as well as K3 awareness for your team.'
    }
  },
  {
    q: {
      id: 'Bagaimana cara mendapatkan penawaran harga?',
      en: 'How do I get a price quotation?'
    },
    a: {
      id: 'Kirimkan kebutuhan Anda melalui halaman Kontak, telepon, atau WhatsApp. Sertakan jenis produk, jumlah, dan lokasi pengiriman agar kami dapat merespons lebih cepat.',
      en: 'Send us your requirements through the Contact page, phone, or WhatsApp. Include the product type, quantity, and delivery location so we can respond faster.'
    }
  }
]

const faqs = computed(() => rawFaqs.map((item) => ({
  q: pick(item.q, locale.value),
  a: pick(item.a, locale.value)
})))

useSeoMeta({
  title: () => 'FAQ | PT. Toba Mandiri Sukses',
  description: () => pick({
    id: 'Pertanyaan yang sering diajukan tentang produk chemical, kemasan, pengiriman, dan dukungan teknis PT. Toba Mandiri Sukses.',
    en: 'Frequently asked questions about chemical products, packaging, delivery, and technical support from PT. Toba Mandiri Sukses.'
  }, locale.value)
})
</script>

<template>
  <div>
    <PageHero :eyebrow="pick(eyebrow)" :title="pick(heading)" :intro="pick(intro)" />

    <section class="section">
      <div class="container-page max-w-3xl">
        <div class="prose-lkr">
          <details v-for="(item, index) in faqs" :key="index">
            <summary>{{ item.q }}</summary>
            <p>{{ item.a }}</p>
          </details>
        </div>
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
