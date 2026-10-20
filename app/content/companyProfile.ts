/**
 * Konten Company Profile PT. Toba Mandiri Sukses.
 *
 * Sumber: "CompanyProfile/Compro TMS-Chemical 2026.pdf" (cover, about us,
 * services, segments, packaging solutions, office & warehouse).
 *
 * Isi disimpan di modul TS (bukan berkas i18n) dengan alasan:
 * - sebagian message berisi HTML; `unplugin-vue-i18n` menolak HTML di message
 *   i18n (strictMessage) sehingga dev/build gagal.
 * - timeline/segments berbentuk array of object; `tm()` mengembalikan message
 *   AST saat bundle dioptimasi sehingga isinya tidak bisa dipakai langsung.
 *
 * Semua field dua bahasa (id/en) disimpan di sini, dipilih lewat locale aktif.
 */

export type CompanyLocale = 'id' | 'en'

export interface LocalizedText {
  id: string
  en: string
}

export interface CompanyService {
  icon: string
  slug: string
  title: LocalizedText
  excerpt: LocalizedText
  points: LocalizedText[]
}

export interface CompanySegment {
  icon: string
  slug: string
  name: LocalizedText
  desc: LocalizedText
  products: string[]
}

export interface CompanyPackaging {
  icon: string
  title: LocalizedText
  desc: LocalizedText
}

export interface CompanyMilestone {
  year: string
  title: LocalizedText
  description: LocalizedText
}

export interface StaticPageContent {
  title: LocalizedText
  heading: LocalizedText
  intro: LocalizedText
  body: LocalizedText
}

export interface CompanyProfileContent {
  tagline: LocalizedText
  aboutTitle: LocalizedText
  aboutBody: LocalizedText
  servicesTitle: LocalizedText
  servicesBody: LocalizedText
  segmentsTitle: LocalizedText
  segmentsBody: LocalizedText
  packagingTitle: LocalizedText
  packagingBody: LocalizedText
  timelineTitle: LocalizedText
  timelineBody: LocalizedText
  contactTitle: LocalizedText
  services: CompanyService[]
  segments: CompanySegment[]
  packaging: CompanyPackaging[]
  milestones: CompanyMilestone[]
}

export const companyProfile: CompanyProfileContent = {
  tagline: {
    id: 'Mitra pemasok chemical industri Anda sejak 2013.',
    en: 'Your trusted industrial chemical partner since 2013.'
  },
  aboutTitle: {
    id: 'Tentang Kami',
    en: 'About Us'
  },
  aboutBody: {
    id: 'PT. Toba Mandiri Sukses adalah mitra tepercaya dalam pasokan chemical industri yang berdiri sejak 2013. Kami menghadirkan produk berkualitas dan solusi andal untuk mendukung keunggulan operasional di berbagai sektor industri.',
    en: 'Established in 2013, PT. Toba Mandiri Sukses is a trusted partner in the supply of industrial chemicals, delivering quality products and dependable solutions to support operational excellence across a wide range of industries.'
  },
  servicesTitle: {
    id: 'Layanan Kami',
    en: 'Our Services'
  },
  servicesBody: {
    id: 'Keselamatan chemical dan K3 menjadi bagian dari layanan kami, mulai dari konsultasi produk hingga dukungan pelanggan.',
    en: 'Chemical safety and K3 sit alongside our core services, from product consultation through to customer support.'
  },
  segmentsTitle: {
    id: 'Segmen Industri',
    en: 'Industry Segments'
  },
  segmentsBody: {
    id: 'Melayani beragam industri dengan chemical proses yang andal serta komitmen terhadap kelangsungan pasokan.',
    en: 'Serving diverse industries with reliable process chemicals and a commitment to supply continuity.'
  },
  packagingTitle: {
    id: 'Solusi Kemasan',
    en: 'Packaging Solutions'
  },
  packagingBody: {
    id: 'Format kemasan disesuaikan dengan jenis produk dan volume kebutuhan Anda.',
    en: 'Packaging formats matched to your product type and volume requirements.'
  },
  timelineTitle: {
    id: 'Perjalanan Kami',
    en: 'Our Journey'
  },
  timelineBody: {
    id: 'Titik-titik penting dalam perkembangan PT. Toba Mandiri Sukses.',
    en: 'Key milestones in the journey of PT. Toba Mandiri Sukses.'
  },
  contactTitle: {
    id: 'Kantor & Gudang',
    en: 'Office & Warehouse'
  },
  services: [
    {
      icon: 'target',
      slug: 'product-consultation',
      title: { id: 'Konsultasi Produk', en: 'Product Consultation' },
      excerpt: {
        id: 'Mendampingi pelanggan memilih produk chemical yang sesuai dengan kebutuhan proses dan aplikasi yang dimaksud.',
        en: 'Supporting customers in selecting suitable chemical products based on their process requirements and intended applications.'
      },
      points: [
        { id: 'Analisis kebutuhan proses', en: 'Process requirement analysis' },
        { id: 'Penentuan grade produk', en: 'Product grade selection' },
        { id: 'Rekomendasi format kemasan', en: 'Packaging format recommendation' }
      ]
    },
    {
      icon: 'delivery',
      slug: 'packaging-delivery',
      title: { id: 'Koordinasi Kemasan & Pengiriman', en: 'Packaging & Delivery Coordination' },
      excerpt: {
        id: 'Mengoordinasikan format kemasan dan jadwal pengiriman yang tepat untuk penanganan produk yang aman dan andal.',
        en: 'Coordinating suitable packaging formats and delivery arrangements for safe and reliable product handling.'
      },
      points: [
        { id: 'Sack untuk serbuk dan granul', en: 'Sacks for powders and granules' },
        { id: 'Jumbo bag untuk material bulk', en: 'Jumbo bags for bulk materials' },
        { id: 'Drum, IBC, dan tanker untuk cairan', en: 'Drums, IBC totes, and tankers for liquids' }
      ]
    },
    {
      icon: 'document',
      slug: 'chemical-safety-information',
      title: { id: 'Informasi Keselamatan Chemical', en: 'Chemical Safety Information' },
      excerpt: {
        id: 'Menyediakan informasi penting mengenai penanganan, penyimpanan, pengangkutan, dan praktik keselamatan kerja yang aman.',
        en: 'Providing essential information on safe chemical handling, storage, transportation, and workplace practices.'
      },
      points: [
        { id: 'Panduan penerimaan dan penyimpanan', en: 'Receiving and storage guidance' },
        { id: 'Prosedur pemuatan dan pengangkutan', en: 'Loading and transport procedure' },
        { id: 'Praktik aman di lantai produksi', en: 'Safe practice on the production floor' }
      ]
    },
    {
      icon: 'shield',
      slug: 'k3-awareness',
      title: { id: 'Kesadaran K3', en: 'K3 Awareness' },
      excerpt: {
        id: 'Meningkatkan kesadaran terhadap APD, komunikasi bahaya, pencegahan risiko, dan praktik kerja yang aman.',
        en: 'Promoting awareness of PPE, hazard communication, risk prevention, and safe work practices.'
      },
      points: [
        { id: 'Pemilihan APD yang tepat', en: 'Correct PPE selection' },
        { id: 'Komunikasi bahaya dan MSDS', en: 'Hazard communication and safety data sheets' },
        { id: 'Pelatihan yang berkala', en: 'Recurring training' }
      ]
    },
    {
      icon: 'engineer',
      slug: 'customer-support',
      title: { id: 'Dukungan Pelanggan', en: 'Customer Support' },
      excerpt: {
        id: 'Memberikan bantuan yang responsif dan panduan praktis sepanjang proses pasokan produk dan layanan.',
        en: 'Providing responsive assistance and practical guidance throughout the product supply and service process.'
      },
      points: [
        { id: 'Respons cepat atas pertanyaan', en: 'Quick answers to questions' },
        { id: 'Pendampingan sejak pemesanan', en: 'Support from order onwards' },
        { id: 'Kanal WhatsApp dan telepon', en: 'WhatsApp and phone channels' }
      ]
    }
  ],
  segments: [
    {
      icon: 'bearing',
      slug: 'tire-rubber-industry',
      name: { id: 'Industri Ban & Karet', en: 'Tire and Rubber Industry' },
      desc: {
        id: 'Menyediakan chemical penting untuk compounding dan pengolahan karet agar menghasilkan produk tahan lama sekaligus menjaga operasi dan pasokan yang stabil.',
        en: 'Providing essential chemicals for rubber compounding and processing to deliver durable products while maintaining stable operations and supply reliability.'
      },
      products: [
        'Paraffinic Oil',
        'Minarex Oil',
        'Carbon Black',
        'Silica',
        'Accelerator CBS',
        'Accelerator MBT',
        'Antioxidant TMQ',
        'Antioxidant 6PPD',
        'Stearic Acid'
      ]
    },
    {
      icon: 'piston',
      slug: 'automotive-rubber-part',
      name: { id: 'Komponen Karet Otomotif', en: 'Automotive Rubber Part' },
      desc: {
        id: 'Mendukung produksi komponen karet berkualitas tinggi dengan chemical proses yang memastikan performa, konsistensi, dan manufaktur yang efisien.',
        en: 'Supporting the production of high-quality rubber components with process chemicals that ensure performance, consistency, and efficient manufacturing.'
      },
      products: ['Carbon Black', 'Silica', 'Zinc Oxide', 'Stearic Acid']
    },
    {
      icon: 'gas',
      slug: 'water-treatment',
      name: { id: 'Pengolahan Air', en: 'Water Treatment' },
      desc: {
        id: 'Menyediakan chemical untuk proses pengolahan air dan air limbah guna menjaga kualitas air, efisiensi sistem, dan kepatuhan terhadap regulasi lingkungan.',
        en: 'Supplying chemicals for water and wastewater treatment processes to help maintain water quality, system efficiency, and environmental compliance.'
      },
      products: [
        'Activated Carbon',
        'PAC',
        'Flocculant',
        'Chlorine',
        'Soda Ash',
        'Defoamer',
        'Caustic Soda',
        'Sulphuric Acid',
        'Antiscalant',
        'Hydrochloric Acid'
      ]
    },
    {
      icon: 'factory',
      slug: 'smelter',
      name: { id: 'Smelter', en: 'Smelter' },
      desc: {
        id: 'Menyediakan chemical proses yang mendukung operasi metalurgi, meningkatkan kestabilan proses, serta berkontribusi pada efisiensi operasional.',
        en: 'Providing process chemicals that support metallurgical operations, improve process stability, and contribute to operational efficiency.'
      },
      products: ['Sulphuric Acid', 'Lime / Calcium Hydroxide', 'Soda Ash', 'Aluminium Sulfate', 'Degreaser']
    },
    {
      icon: 'heat',
      slug: 'cement-plants',
      name: { id: 'Pabrik Semen', en: 'Cement Plants' },
      desc: {
        id: 'Menyediakan chemical untuk proses produksi semen guna meningkatkan kualitas, mengoptimalkan operasi, serta memastikan pasokan yang konsisten.',
        en: 'Delivering chemicals for cement production processes to enhance quality, optimize operations, and ensure consistent supply continuity.'
      },
      products: ['Grinding Aid', 'Limestone', 'Defoamer', 'Accelerator', 'Cement Additive', 'Slag / GGBFS']
    }
  ],
  packaging: [
    {
      icon: 'delivery',
      title: { id: 'Sack', en: 'Sack' },
      desc: {
        id: 'Untuk serbuk dan granul, umumnya 25 kg per sack.',
        en: 'For powders and granules, typically 25 kg per sack.'
      }
    },
    {
      icon: 'factory',
      title: { id: 'Jumbo Bag', en: 'Jumbo Bag' },
      desc: {
        id: 'Untuk material bulk dengan kebutuhan dalam jumlah besar.',
        en: 'For bulk materials with large volume requirements.'
      }
    },
    {
      icon: 'oil',
      title: { id: 'Drum', en: 'Drum' },
      desc: {
        id: 'Untuk produk cair bervolume sedang atau padatan kecil.',
        en: 'For medium-volume liquids or small dry goods.'
      }
    },
    {
      icon: 'heat',
      title: { id: 'IBC', en: 'IBC' },
      desc: {
        id: 'Intermediate bulk container untuk cairan yang membutuhkan penanganan minimal.',
        en: 'Intermediate bulk container for liquids needing minimal handling.'
      }
    },
    {
      icon: 'truck',
      title: { id: 'Tanker Truck', en: 'Tanker Truck' },
      desc: {
        id: 'Untuk pengiriman cairan dalam volume besar.',
        en: 'For bulk liquid delivery in large volumes.'
      }
    }
  ],
  milestones: [
    {
      year: '2013',
      title: { id: 'PT. Toba Mandiri Sukses didirikan', en: 'PT. Toba Mandiri Sukses founded' },
      description: {
        id: 'Berdiri sebagai mitra pemasok chemical industri dengan kantor dan gudang di Bekasi, Jawa Barat.',
        en: 'Founded as an industrial chemical supplier with office and warehouse in Bekasi, West Java.'
      }
    },
    {
      year: '2026',
      title: { id: 'Lima segmen industri terlayani', en: 'Five industry segments served' },
      description: {
        id: 'Jangkauan layanan meluas ke industri ban dan karet, komponen karet otomotif, pengolahan air, smelter, dan pabrik semen.',
        en: 'Service coverage expanded to the tire and rubber, automotive rubber component, water treatment, smelter, and cement plant industries.'
      }
    }
  ]
}

/**
 * Halaman statis (FAQ, Syarat & Ketentuan, Kebijakan Privasi).
 * `body` sengaja disimpan sebagai HTML di modul ini, bukan di i18n, karena
 * `unplugin-vue-i18n` menolak HTML pada message i18n.
 */
export const staticPages: Record<'faq' | 'termsConditions' | 'privacyPolicy', StaticPageContent> = {
  faq: {
    title: { id: 'FAQ', en: 'FAQ' },
    heading: { id: 'Pertanyaan yang Sering Diajukan', en: 'Frequently Asked Questions' },
    intro: {
      id: 'Ringkasan perusahaan, produk, layanan, dan cara memesan di PT. Toba Mandiri Sukses.',
      en: 'A quick overview of the company, products, services, and how to order from PT. Toba Mandiri Sukses.'
    },
    body: {
      id: [
        '<h3>Apa itu PT. Toba Mandiri Sukses?</h3>',
        '<p>PT. Toba Mandiri Sukses adalah mitra pemasok chemical industri yang berdiri sejak 2013, dengan kantor dan gudang di Bekasi, Jawa Barat. Kami menghadirkan produk berkualitas dan solusi andal untuk mendukung keunggulan operasional di berbagai sektor industri.</p>',
        '<h3>Industri apa saja yang Anda layani?</h3>',
        '<p>Kami melayani lima segmen industri: industri ban dan karet, komponen karet otomotif, pengolahan air, smelter, dan pabrik semen.</p>',
        '<h3>Layanan apa saja yang tersedia?</h3>',
        '<p>Layanan kami meliputi konsultasi pemilihan produk, koordinasi kemasan dan pengiriman, informasi keselamatan chemical, kesadaran K3 (APD, komunikasi bahaya, pencegahan risiko), serta dukungan pelanggan yang responsif sepanjang proses pasok.</p>',
        '<h3>Format kemasan apa yang tersedia?</h3>',
        '<p>Kami menyediakan berbagai format kemasan: Sack, Jumbo Bag, Drum, IBC, dan Tanker Truck, yang dapat disesuaikan dengan jenis produk (serbuk/granul atau cair) dan volume kebutuhan Anda.</p>',
        '<h3>Di mana alamat dan kontak Anda?</h3>',
        '<p>Kantor dan gudang kami berada di Jl. Jendral Sudirman KM 31, Kayuringin Jaya, Bekasi 17144. Telepon: 021 8480 520. WhatsApp: 0821-4567-0176 / 0822-3180-6726. Email: pt.tobamandirisukses@gmail.com. Situs: www.tobamandirisukses.com.</p>',
        '<h3>Bagaimana cara memesan produk?</h3>',
        '<p>Hubungi tim kami melalui formulir kontak, telepon, WhatsApp, atau email. Sertakan nama produk, volume, dan kebutuhan Anda - tim kami akan membantu proses penawaran dan pengiriman pada jam kerja.</p>',
        '<h3>Apakah tersedia dokumen TDS/MSDS?</h3>',
        '<p>Ya. Dokumen Technical Data Sheet dan Material Safety Data Sheet tersedia untuk produk tertentu. Hubungi tim kami untuk memperoleh dokumen sesuai produk yang dibutuhkan.</p>'
      ].join(''),
      en: [
        '<h3>What is PT. Toba Mandiri Sukses?</h3>',
        '<p>PT. Toba Mandiri Sukses is an industrial chemical supply partner established in 2013, with an office and warehouse in Bekasi, West Java. We deliver quality products and dependable solutions to support operational excellence across a wide range of industries.</p>',
        '<h3>Which industries do you serve?</h3>',
        '<p>We serve five industry segments: tire and rubber, automotive rubber components, water treatment, smelter, and cement plants.</p>',
        '<h3>What services are available?</h3>',
        '<p>Our services include product consultation, packaging and delivery coordination, chemical safety information, K3 awareness (PPE, hazard communication, risk prevention), and responsive customer support throughout the supply process.</p>',
        '<h3>What packaging options are available?</h3>',
        '<p>We offer a range of packaging formats: Sack, Jumbo Bag, Drum, IBC, and Tanker Truck, suited to the product type (powder/granular or liquid) and your volume requirements.</p>',
        '<h3>Where are you located and how can I reach you?</h3>',
        '<p>Our office and warehouse are at Jl. Jendral Sudirman KM 31, Kayuringin Jaya, Bekasi 17144. Phone: 021 8480 520. WhatsApp: 0821-4567-0176 / 0822-3180-6726. Email: pt.tobamandirisukses@gmail.com. Website: www.tobamandirisukses.com.</p>',
        '<h3>How do I place an order?</h3>',
        '<p>Contact our team through the contact form, phone, WhatsApp, or email. Include the product name, volume, and your requirements - our team will assist with quotation and delivery during office hours.</p>',
        '<h3>Are TDS/MSDS documents available?</h3>',
        '<p>Yes. Technical Data Sheet and Material Safety Data Sheet documents are available for selected products. Contact our team to obtain the documents for the products you need.</p>'
      ].join('')
    }
  },
  termsConditions: {
    title: { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' },
    heading: { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' },
    intro: {
      id: 'Ketentuan penggunaan situs web PT. Toba Mandiri Sukses.',
      en: 'Terms of use for the PT. Toba Mandiri Sukses website.'
    },
    body: {
      id: [
        '<h3>1. Identitas Perusahaan</h3>',
        '<p>Situs web ini dikelola oleh PT. Toba Mandiri Sukses, perusahaan pemasok chemical industri yang berdiri sejak 2013 dan beralamat di Jl. Jendral Sudirman KM 31, Kayuringin Jaya, Bekasi 17144, Jawa Barat.</p>',
        '<h3>2. Informasi Produk</h3>',
        '<p>Informasi produk pada situs ini, termasuk deskripsi dan spesifikasi, bersifat gambaran umum. Spesifikasi teknis resmi mengacu pada dokumen TDS/MSDS dan penawaran tertulis yang kami terbitkan. Informasi dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>',
        '<h3>3. Pesanan dan Pengiriman</h3>',
        '<p>Pesanan dianggap sah setelah dikonfirmasi melalui penawaran tertulis. Ketersediaan stok, harga, jadwal pengiriman, dan termin pembayaran mengikuti kesepakatan pada penawaran tersebut. Kami strive menyediakan pasokan yang andal dan berkelanjutan sesuai kesepakatan.</p>',        '<h3>4. Penggunaan Situs</h3>',
        '<p>Seluruh isi situs ini (teks, gambar, logo) adalah milik PT. Toba Mandiri Sukses atau digunakan dengan izin. Pengguna dilarang menyalahgunakan isi situs untuk tujuan yang melanggar hukum.</p>',
        '<h3>5. Tautan Eksternal</h3>',
        '<p>Situs ini dapat memuat tautan ke pihak ketiga. PT. Toba Mandiri Sukses tidak bertanggung jawab atas isi maupun praktik privasi situs pihak ketiga tersebut.</p>',
        '<h3>6. Batasan Tanggung Jawab</h3>',
        '<p>Penggunaan informasi pada situs ini sepenuhnya menjadi tanggung jawab pengguna. Untuk keputusan mengenai penggunaan produk chemical, selalu konsultasikan kebutuhan proses Anda dengan tim kami.</p>',
        '<h3>7. Perubahan Ketentuan</h3>',
        '<p>Ketentuan ini dapat diperbarui sewaktu-waktu. Perubahan berlaku sejak dipublikasikan di halaman ini.</p>'
      ].join(''),
      en: [
        '<h3>1. Company Identity</h3>',
        '<p>This website is operated by PT. Toba Mandiri Sukses, an industrial chemical supply company established in 2013, located at Jl. Jendral Sudirman KM 31, Kayuringin Jaya, Bekasi 17144, West Java.</p>',
        '<h3>2. Product Information</h3>',
        '<p>Product information on this website, including descriptions and specifications, is provided as a general overview. Official technical specifications refer to the TDS/MSDS documents and written quotations we issue. Information may change at any time without prior notice.</p>',
        '<h3>3. Orders and Delivery</h3>',
        '<p>An order is considered valid once confirmed through a written quotation. Stock availability, pricing, delivery schedule, and payment terms follow the agreement in that quotation. We strive to provide reliable and continuous supply as agreed.</p>',
        '<h3>4. Use of the Website</h3>',
        '<p>Content on this website (text, images, logos) is the property of PT. Toba Mandiri Sukses or used with permission. Users are prohibited from misusing the content for unlawful purposes.</p>',
        '<h3>5. External Links</h3>',
        '<p>This website may contain links to third parties. PT. Toba Mandiri Sukses is not responsible for the content or privacy practices of third-party websites.</p>',
        '<h3>6. Limitation of Liability</h3>',
        '<p>Use of the information on this website is entirely at the user\'s own responsibility. For decisions on the use of chemical products, always consult your process requirements with our team.</p>',
        '<h3>7. Changes to Terms</h3>',
        '<p>These terms may be updated at any time. Updates take effect once published on this page.</p>'
      ].join('')
    }
  },
  privacyPolicy: {
    title: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
    heading: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
    intro: {
      id: 'Cara PT. Toba Mandiri Sukses menangani informasi yang Anda berikan melalui situs ini.',
      en: 'How PT. Toba Mandiri Sukses handles the information you provide through this website.'
    },
    body: {
      id: [
        '<h3>1. Informasi yang Kami Kumpulkan</h3>',
        '<p>Saat Anda menghubungi kami melalui formulir kontak atau WhatsApp, kami dapat menerima informasi seperti nama, alamat email, nomor telepon, nama perusahaan, serta detail kebutuhan produk Anda. Situs ini juga dapat menggunakan cookie untuk keperluan dasar seperti preferensi bahasa dan tema tampilan.</p>',
        '<h3>2. Tujuan Penggunaan</h3>',
        '<p>Informasi yang Anda berikan digunakan semata-mata untuk merespons permintaan Anda: konsultasi produk, penawaran, koordinasi pengiriman, serta dukungan teknis terkait produk chemical kami.</p>',
        '<h3>3. Pembagian Informasi</h3>',
        '<p>Kami tidak menjual atau membagikan informasi pribadi Anda kepada pihak ketiga, kecuali sesuai ketentuan hukum yang berlaku atau bila diperlukan untuk proses pengiriman yang telah Anda sepakati.</p>',
        '<h3>4. Keamanan</h3>',
        '<p>Kami menerapkan langkah-langkah yang wajar untuk menjaga kerahasiaan informasi yang Anda berikan kepada kami.</p>',
        '<h3>5. Hak Anda</h3>',
        '<p>Anda dapat meminta perbaikan atau penghapusan data pribadi Anda dengan menghubungi kami di pt.tobamandirisukses@gmail.com atau telepon 021 8480 520.</p>',
        '<h3>6. Perubahan Kebijakan</h3>',
        '<p>Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan berlaku sejak dipublikasikan di halaman ini.</p>'
      ].join(''),
      en: [
        '<h3>1. Information We Collect</h3>',
        '<p>When you contact us through the contact form or WhatsApp, we may receive information such as your name, email address, phone number, company name, and details of your product requirements. This website may also use cookies for basic purposes such as language and theme preferences.</p>',
        '<h3>2. Purpose of Use</h3>',
        '<p>The information you provide is used solely to respond to your requests: product consultation, quotations, delivery coordination, and technical support related to our chemical products.</p>',
        '<h3>3. Information Sharing</h3>',
        '<p>We do not sell or share your personal information with third parties, except where required by applicable law or necessary for the delivery process you have agreed to.</p>',
        '<h3>4. Security</h3>',
        '<p>We implement reasonable measures to safeguard the confidentiality of the information you provide to us.</p>',
        '<h3>5. Your Rights</h3>',
        '<p>You may request correction or deletion of your personal information by contacting us at pt.tobamandirisukses@gmail.com or phone 021 8480 520.</p>',
        '<h3>6. Changes to This Policy</h3>',
        '<p>This policy may be updated at any time. Updates take effect once published on this page.</p>'
      ].join('')
    }
  }
}

export const companyContact = {
  address: {
    id: 'Jl. Jendral Sudirman KM 31, Kayuringin Jaya, Bekasi 17144, Jawa Barat',
    en: 'Jl. Jendral Sudirman KM 31, Kayuringin Jaya, Bekasi 17144, West Java'
  },
  phone: ['021 8480 520'],
  whatsapp: ['0821-4567-0176', '0822-3180-6726'],
  email: 'pt.tobamandirisukses@gmail.com',
  website: 'www.tobamandirisukses.com'
}
