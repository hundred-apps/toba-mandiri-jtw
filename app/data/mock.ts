import type {
  CareerItem,
  CustomerItem,
  HomeContent,
  Milestone,
  PageContent,
  PostItem,
  ProductCategory,
  ProductItem,
  ServiceItem,
  SiteSettings,
  TestimonialItem
} from '~/types/content'

/**
 * Local fallback content.
 *
 * Frontend berjalan penuh tanpa backend. Saat Express API sudah siap, isi
 * NUXT_PUBLIC_API_BASE dan semua resource diambil dari API; file ini hanya
 * dipakai sebagai fallback ketika request gagal atau backend belum aktif.
 *
 * Sumber: Company Profile "Compro TMS-Chemical 2026.pdf". Konten katalog di
 * bawah masih berupa contoh awal — setelah CMS aktif, nilai diambil dari
 * database, bukan dari file ini.
 */

export const mockSettings: SiteSettings = {
  companyName: { id: 'PT. Toba Mandiri Sukses', en: 'PT. Toba Mandiri Sukses' },
  legalName: 'PT. Toba Mandiri Sukses',
  tagline: {
    id: 'Supplier Chemical Industri',
    en: 'Industrial Chemical Supplier'
  },
  description: {
    id: 'Supplier chemical industri sejak 2013. Kami memasok chemical proses untuk industri ban & karet, komponen karet otomotif, pengolahan air, smelter, dan pabrik semen, dengan produk berkualitas, stok siap kirim, dan dukungan K3.',
    en: 'Industrial chemical supplier since 2013. We supply process chemicals for the tire & rubber, automotive rubber component, water treatment, smelter, and cement plant industries, with quality products, ready stock, and K3 support.'
  },
  agencyNumber: '',
  foundedYear: '2013',
  address: {
    id: 'Jl. Jendral Sudirman KM 31, Kayuringin Jaya, Bekasi 17144, Jawa Barat, Indonesia',
    en: 'Jl. Jendral Sudirman KM 31, Kayuringin Jaya, Bekasi 17144, West Java, Indonesia'
  },
  phone: ['021 8480 520'],
  whatsapp: '6282145670176',
  email: 'pt.tobamandirisukes@gmail.com',
  officeHours: {
    id: 'Senin - Jumat, 08.00 - 17.00 WIB',
    en: 'Monday - Friday, 08.00 - 17.00 WIB'
  },
  logo: '/img/logo.svg',
  profile: '/img/profile-hero.svg',
  companyProfile: '',
  gallery: [],
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: ''
  }
}

export const mockMilestones: Milestone[] = [
  {
    id: 1,
    year: '2013',
    order: 1,
    title: { id: 'Berdirinya PT. Toba Mandiri Sukses', en: 'PT. Toba Mandiri Sukses Established' },
    description: {
      id: 'PT. Toba Mandiri Sukses didirikan di Bekasi sebagai penyedia chemical untuk kebutuhan industri.',
      en: 'PT. Toba Mandiri Sukses was established in Bekasi as a supplier of chemicals for industrial needs.'
    }
  },
  {
    id: 2,
    year: '2016',
    order: 2,
    title: { id: 'Ekspansi Industri Ban & Karet', en: 'Tire & Rubber Expansion' },
    description: {
      id: 'Memperluas pasokan chemical untuk industri ban & karet serta komponen karet otomotif.',
      en: 'Expanded chemical supply for the tire & rubber and automotive rubber component industries.'
    }
  },
  {
    id: 3,
    year: '2020',
    order: 3,
    title: { id: 'Lini Pengolahan Air & Smelter', en: 'Water Treatment & Smelter Lines' },
    description: {
      id: 'Menambah portofolio produk untuk pengolahan air dan industri smelter.',
      en: 'Added product lines for water treatment and the smelter industry.'
    }
  },
  {
    id: 4,
    year: '2024',
    order: 4,
    title: { id: 'Pabrik Semen & Distribusi Nasional', en: 'Cement Plants & National Distribution' },
    description: {
      id: 'Melayani pabrik semen dan memperluas jangkauan distribusi ke seluruh Indonesia.',
      en: 'Serving cement plants and expanding distribution coverage across Indonesia.'
    }
  }
]

export const mockServices: ServiceItem[] = [
  {
    id: 1,
    slug: 'quality-assurance',
    icon: 'shield',
    order: 1,
    featured: true,
    image: '/img/service-quality.svg',
    title: { id: 'Jaminan Mutu', en: 'Quality Assurance' },
    excerpt: {
      id: 'Setiap produk yang kami pasok disesuaikan dengan spesifikasi teknis yang disepakati dan dipasok dari sumber terpercaya.',
      en: 'Every product we supply conforms to the agreed technical specification and is sourced from trusted manufacturers.'
    },
    body: {
      id: '<p>Kami memastikan setiap chemical yang keluar dari gudang sesuai spesifikasi teknis yang disepakati, lengkap dengan dokumen pendukung seperti Certificate of Analysis (CoA) dan lembar data keselamatan (MSDS).</p><p>Kesesuaian spesifikasi dan konsistensi kualitas menjadi dasar kepercayaan pelanggan industri kami.</p>',
      en: '<p>We ensure every chemical leaving our warehouse conforms to the agreed technical specification, complete with supporting documents such as a Certificate of Analysis (CoA) and safety data sheet (MSDS).</p><p>Specification conformity and consistent quality are the foundation of our industrial customers trust.</p>'
    },
    highlights: {
      id: [
        { id: 'Sesuai spesifikasi teknis', en: 'Conforms to technical specification' },
        { id: 'Dokumen CoA dan MSDS', en: 'CoA and MSDS documents' },
        { id: 'Sumber terpercaya', en: 'Trusted sourcing' }
      ],
      en: [
        { id: 'Conforms to technical specification', en: 'Conforms to technical specification' },
        { id: 'CoA and MSDS documents', en: 'CoA and MSDS documents' },
        { id: 'Trusted sourcing', en: 'Trusted sourcing' }
      ]
    }
  },
  {
    id: 2,
    slug: 'supply-assurance',
    icon: 'truck',
    order: 2,
    featured: true,
    image: '/img/service-supply.svg',
    title: { id: 'Jaminan Pasok', en: 'Supply Assurance' },
    excerpt: {
      id: 'Pasokan chemical yang andal dan konsisten untuk menjaga kelangsungan proses produksi Anda.',
      en: 'Reliable and consistent chemical supply to keep your production processes running.'
    },
    body: {
      id: '<p>Kami memahami pentingnya jaminan pasok yang andal bagi kelangsungan produksi. Kami menjaga stok siap kirim untuk item penting, memantau inventory, dan menyepakati jadwal pengiriman bersama pelanggan.</p><p>Untuk kebutuhan rutin, tersedia skema kontrak pasokan agar ketersediaan barang lebih terjamin.</p>',
      en: '<p>We understand how important a reliable supply guarantee is for production continuity. We maintain ready stock for critical items, monitor inventory, and agree delivery schedules with customers.</p><p>For recurring needs, supply contract schemes are available to secure availability.</p>'
    },
    highlights: {
      id: [
        { id: 'Stok siap kirim', en: 'Ready stock' },
        { id: 'Pasokan berkelanjutan', en: 'Continuous supply' },
        { id: 'Jadwal pengiriman disepakati', en: 'Agreed delivery schedule' }
      ],
      en: [
        { id: 'Ready stock', en: 'Ready stock' },
        { id: 'Continuous supply', en: 'Continuous supply' },
        { id: 'Agreed delivery schedule', en: 'Agreed delivery schedule' }
      ]
    }
  },
  {
    id: 3,
    slug: 'chemical-safety',
    icon: 'engineer',
    order: 3,
    featured: true,
    image: '/img/service-technical.svg',
    title: { id: 'Informasi Keselamatan Chemical', en: 'Chemical Safety Information' },
    excerpt: {
      id: 'Informasi penanganan dan penyimpanan chemical yang aman, lengkap dengan komunikasi bahaya dan MSDS.',
      en: 'Safe chemical handling and storage information, complete with hazard communication and MSDS.'
    },
    body: {
      id: '<p>Keselamatan kerja (K3) adalah bagian dari layanan kami. Kami menyediakan informasi penanganan dan penyimpanan yang aman, komunikasi bahaya melalui label, serta lembar data keselamatan (MSDS) untuk setiap produk.</p><p>Dengan informasi yang tepat, risiko penggunaan chemical di lokasi Anda dapat dikelola dengan lebih baik.</p>',
      en: '<p>Workplace safety (K3) is part of our service. We provide safe handling and storage information, hazard communication through labels, and a safety data sheet (MSDS) for every product.</p><p>With accurate information, the risks of chemical use at your site can be better managed.</p>'
    },
    highlights: {
      id: [
        { id: 'Panduan penanganan & penyimpanan', en: 'Handling & storage guidance' },
        { id: 'Lembar data keselamatan (MSDS)', en: 'Safety data sheet (MSDS)' },
        { id: 'Komunikasi bahaya & pelabelan', en: 'Hazard communication & labelling' }
      ],
      en: [
        { id: 'Handling & storage guidance', en: 'Handling & storage guidance' },
        { id: 'Safety data sheet (MSDS)', en: 'Safety data sheet (MSDS)' },
        { id: 'Hazard communication & labelling', en: 'Hazard communication & labelling' }
      ]
    }
  },
  {
    id: 4,
    slug: 'packaging-delivery',
    icon: 'delivery',
    order: 4,
    featured: true,
    image: '/img/service-shipping.svg',
    title: { id: 'Kemasan & Pengiriman', en: 'Packaging & Delivery' },
    excerpt: {
      id: 'Kemasan disesuaikan jenis produk dan pengiriman yang dikoordinasikan sesuai jadwal Anda.',
      en: 'Packaging matched to the product type and delivery coordinated to your schedule.'
    },
    body: {
      id: '<p>Kemasan disesuaikan dengan jenis produk: sack untuk serbuk dan granul, jumbo bag untuk material bulk, drum dan IBC untuk produk cair bervolume sedang, serta tanker truck untuk cairan volume besar.</p><p>Pengiriman dikoordinasikan bersama tim operasional Anda, dengan estimasi waktu kirim yang disesuaikan tujuan.</p>',
      en: '<p>Packaging is matched to the product type: sacks for powders and granules, jumbo bags for bulk materials, drums and IBC totes for medium-volume liquids, and tanker trucks for large-volume liquids.</p><p>Delivery is coordinated with your operations team, with estimated times adjusted to the destination.</p>'
    },
    highlights: {
      id: [
        { id: 'Sack, jumbo bag, drum, IBC, tanker', en: 'Sack, jumbo bag, drum, IBC, tanker' },
        { id: 'Kemasan sesuai jenis produk', en: 'Packaging matched to product type' },
        { id: 'Pengiriman dikoordinasikan', en: 'Coordinated delivery' }
      ],
      en: [
        { id: 'Sack, jumbo bag, drum, IBC, tanker', en: 'Sack, jumbo bag, drum, IBC, tanker' },
        { id: 'Packaging matched to product type', en: 'Packaging matched to product type' },
        { id: 'Coordinated delivery', en: 'Coordinated delivery' }
      ]
    }
  },
  {
    id: 5,
    slug: 'product-consultation',
    icon: 'target',
    order: 5,
    featured: true,
    image: '/img/service-recommendation.svg',
    title: { id: 'Konsultasi Produk', en: 'Product Consultation' },
    excerpt: {
      id: 'Tim kami membantu memilih produk dan spesifikasi chemical yang tepat sesuai kebutuhan proses Anda.',
      en: 'Our team helps you choose the right chemical products and specifications for your process needs.'
    },
    body: {
      id: '<p>Pemilihan chemical yang tepat menentukan kualitas hasil dan efisiensi proses. Tim kami membantu memetakan kebutuhan berdasarkan aplikasi, jenis proses, dan standar industri Anda.</p><p>Rekomendasi diberikan dalam bentuk jenis produk, spesifikasi, jumlah, dan harga yang sesuai ketentuan procurement perusahaan Anda.</p>',
      en: '<p>Selecting the right chemical determines output quality and process efficiency. Our team helps map your needs based on application, process type, and industry standards.</p><p>Recommendations are delivered as product types, specifications, quantities, and pricing that fit your procurement requirements.</p>'
    },
    highlights: {
      id: [
        { id: 'Analisis kebutuhan proses', en: 'Process needs analysis' },
        { id: 'Rekomendasi spesifikasi produk', en: 'Product specification recommendation' },
        { id: 'Sesuai standar industri', en: 'Aligned with industry standards' }
      ],
      en: [
        { id: 'Process needs analysis', en: 'Process needs analysis' },
        { id: 'Product specification recommendation', en: 'Product specification recommendation' },
        { id: 'Aligned with industry standards', en: 'Aligned with industry standards' }
      ]
    }
  },
  {
    id: 6,
    slug: 'k3-training',
    icon: 'academy',
    order: 6,
    featured: true,
    image: '/img/service-training.svg',
    title: { id: 'Pelatihan Kesadaran K3', en: 'K3 Awareness Training' },
    excerpt: {
      id: 'Peningkatan kesadaran keselamatan kerja untuk tim yang menangani chemical di lokasi Anda.',
      en: 'Workplace safety awareness building for teams handling chemicals at your site.'
    },
    body: {
      id: '<p>Kami membantu meningkatkan kesadaran K3 bagi tim yang menangani chemical. Materi mencakup pengenalan sifat bahan, penanganan dan penyimpanan yang benar, serta tanggap darurat dasar.</p><p>Materi dapat disesuaikan dengan jenis produk dan konteks operasional perusahaan Anda.</p>',
      en: '<p>We help build K3 awareness for teams handling chemicals. Topics cover material properties, correct handling and storage, and basic emergency response.</p><p>Material can be tailored to your product types and operational context.</p>'
    },
    highlights: {
      id: [
        { id: 'Pengenalan sifat bahan', en: 'Material property introduction' },
        { id: 'Penanganan & penyimpanan benar', en: 'Correct handling & storage' },
        { id: 'Materi disesuaikan kebutuhan', en: 'Material tailored to needs' }
      ],
      en: [
        { id: 'Material property introduction', en: 'Material property introduction' },
        { id: 'Correct handling & storage', en: 'Correct handling & storage' },
        { id: 'Material tailored to needs', en: 'Material tailored to needs' }
      ]
    }
  },
  {
    id: 7,
    slug: 'customer-support',
    icon: 'lab',
    order: 7,
    featured: true,
    image: '/img/service-oil-monitoring.svg',
    title: { id: 'Dukungan Pelanggan', en: 'Customer Support' },
    excerpt: {
      id: 'Respons cepat untuk pertanyaan teknis, ketersediaan stok, dan status pesanan Anda.',
      en: 'Fast response for technical questions, stock availability, and your order status.'
    },
    body: {
      id: '<p>Tim kami siap membantu pertanyaan seputar produk, ketersediaan stok, penawaran harga, dan status pesanan. Kami menjaga komunikasi yang responsif melalui telepon dan WhatsApp pada jam kerja.</p><p>Dukungan berkelanjutan merupakan bagian dari komitmen layanan kami kepada pelanggan industri.</p>',
      en: '<p>Our team is ready to help with product questions, stock availability, quotations, and order status. We maintain responsive communication by phone and WhatsApp during opening hours.</p><p>Ongoing support is part of our service commitment to industrial customers.</p>'
    },
    highlights: {
      id: [
        { id: 'Respons cepat', en: 'Fast response' },
        { id: 'Informasi stok & harga', en: 'Stock & pricing information' },
        { id: 'Dukungan berkelanjutan', en: 'Ongoing support' }
      ],
      en: [
        { id: 'Fast response', en: 'Fast response' },
        { id: 'Stock & pricing information', en: 'Stock & pricing information' },
        { id: 'Ongoing support', en: 'Ongoing support' }
      ]
    }
  }
]

export const mockCategories: ProductCategory[] = [
  {
    id: 1,
    slug: 'tire-rubber-chemicals',
    icon: 'truck',
    order: 1,
    image: '/img/cat-heavy-duty.svg',
    productCount: 0,
    name: { id: 'Chemical Ban & Karet', en: 'Tire & Rubber Chemicals' },
    description: {
      id: 'Bahan kimia proses untuk industri ban dan karet, mulai dari filler hingga sistem vulkanisasi.',
      en: 'Process chemicals for the tire and rubber industry, from fillers to vulcanisation systems.'
    },
    applications: {
      id: [
        { id: 'Carbon black & silica', en: 'Carbon black & silica' },
        { id: 'Accelerator & antioxidant', en: 'Accelerator & antioxidant' },
        { id: 'Zinc oxide & stearic acid', en: 'Zinc oxide & stearic acid' }
      ],
      en: [
        { id: 'Carbon black & silica', en: 'Carbon black & silica' },
        { id: 'Accelerator & antioxidant', en: 'Accelerator & antioxidant' },
        { id: 'Zinc oxide & stearic acid', en: 'Zinc oxide & stearic acid' }
      ]
    }
  },
  {
    id: 2,
    slug: 'automotive-rubber-chemicals',
    icon: 'gear',
    order: 2,
    image: '/img/cat-transmission.svg',
    productCount: 0,
    name: { id: 'Chemical Komponen Karet Otomotif', en: 'Automotive Rubber Component Chemicals' },
    description: {
      id: 'Bahan kimia pendukung produksi komponen karet otomotif seperti seal, mounting, dan hose.',
      en: 'Supporting chemicals for producing automotive rubber components such as seals, mountings, and hoses.'
    },
    applications: {
      id: [
        { id: 'Seal, gasket, dan mounting', en: 'Seals, gaskets, and mountings' },
        { id: 'Hose dan belt', en: 'Hoses and belts' },
        { id: 'Sistem vulkanisasi', en: 'Vulcanisation systems' }
      ],
      en: [
        { id: 'Seals, gaskets, and mountings', en: 'Seals, gaskets, and mountings' },
        { id: 'Hoses and belts', en: 'Hoses and belts' },
        { id: 'Vulcanisation systems', en: 'Vulcanisation systems' }
      ]
    }
  },
  {
    id: 3,
    slug: 'water-treatment-chemicals',
    icon: 'oil',
    order: 3,
    image: '/img/cat-hydraulic.svg',
    productCount: 0,
    name: { id: 'Chemical Pengolahan Air', en: 'Water Treatment Chemicals' },
    description: {
      id: 'Koagulan, flokulan, dan bahan kimia pengolahan air untuk industri dan utilitas.',
      en: 'Coagulants, flocculants, and water treatment chemicals for industry and utilities.'
    },
    applications: {
      id: [
        { id: 'PAC & flocculant', en: 'PAC & flocculant' },
        { id: 'Caustic soda & soda ash', en: 'Caustic soda & soda ash' },
        { id: 'Sistem boiler & cooling water', en: 'Boiler & cooling water systems' }
      ],
      en: [
        { id: 'PAC & flocculant', en: 'PAC & flocculant' },
        { id: 'Caustic soda & soda ash', en: 'Caustic soda & soda ash' },
        { id: 'Boiler & cooling water systems', en: 'Boiler & cooling water systems' }
      ]
    }
  },
  {
    id: 4,
    slug: 'smelter-chemicals',
    icon: 'heat',
    order: 4,
    image: '/img/cat-heat.svg',
    productCount: 0,
    name: { id: 'Chemical Smelter', en: 'Smelter Chemicals' },
    description: {
      id: 'Bahan kimia proses untuk industri smelter dan pengolahan logam.',
      en: 'Process chemicals for the smelter and metal processing industry.'
    },
    applications: {
      id: [
        { id: 'Proses peleburan', en: 'Smelting processes' },
        { id: 'Pereaksi & penambah proses', en: 'Reagents & process additives' },
        { id: 'Pengolahan logam', en: 'Metal processing' }
      ],
      en: [
        { id: 'Smelting processes', en: 'Smelting processes' },
        { id: 'Reagents & process additives', en: 'Reagents & process additives' },
        { id: 'Metal processing', en: 'Metal processing' }
      ]
    }
  },
  {
    id: 5,
    slug: 'cement-additives',
    icon: 'factory',
    order: 5,
    image: '/img/cat-industrial.svg',
    productCount: 0,
    name: { id: 'Aditif Semen', en: 'Cement Additives' },
    description: {
      id: 'Grinding aid dan aditif proses untuk pabrik semen untuk efisiensi penggilingan dan kualitas produk.',
      en: 'Grinding aid and process additives for cement plants, for grinding efficiency and product quality.'
    },
    applications: {
      id: [
        { id: 'Grinding aid', en: 'Grinding aid' },
        { id: 'Cement additive', en: 'Cement additive' },
        { id: 'Efisiensi penggilingan', en: 'Grinding efficiency' }
      ],
      en: [
        { id: 'Grinding aid', en: 'Grinding aid' },
        { id: 'Cement additive', en: 'Cement additive' },
        { id: 'Grinding efficiency', en: 'Grinding efficiency' }
      ]
    }
  },
  {
    id: 6,
    slug: 'acids-industrial-solvents',
    icon: 'lab',
    order: 6,
    image: '/img/cat-cylinder.svg',
    productCount: 0,
    name: { id: 'Asam & Pelarut Industri', en: 'Industrial Acids & Solvents' },
    description: {
      id: 'Asam dan pelarut industri untuk berbagai aplikasi proses, dengan penanganan dan pengiriman yang aman.',
      en: 'Industrial acids and solvents for various process applications, with safe handling and delivery.'
    },
    applications: {
      id: [
        { id: 'Sulphuric acid & lainnya', en: 'Sulphuric acid & others' },
        { id: 'Pelarut industri', en: 'Industrial solvents' },
        { id: 'Aplikasi proses', en: 'Process applications' }
      ],
      en: [
        { id: 'Sulphuric acid & others', en: 'Sulphuric acid & others' },
        { id: 'Industrial solvents', en: 'Industrial solvents' },
        { id: 'Process applications', en: 'Process applications' }
      ]
    }
  },
  {
    id: 7,
    slug: 'process-oils-additives',
    icon: 'grease',
    order: 7,
    image: '/img/cat-grease.svg',
    productCount: 0,
    name: { id: 'Oli Proses & Aditif', en: 'Process Oils & Additives' },
    description: {
      id: 'Oli proses dan aditif seperti paraffinic oil dan minarex oil untuk kebutuhan formulasi industri karet.',
      en: 'Process oils and additives such as paraffinic oil and minarex oil for rubber industry formulation needs.'
    },
    applications: {
      id: [
        { id: 'Paraffinic oil', en: 'Paraffinic oil' },
        { id: 'Minarex oil', en: 'Minarex oil' },
        { id: 'Formulasi karet', en: 'Rubber formulation' }
      ],
      en: [
        { id: 'Paraffinic oil', en: 'Paraffinic oil' },
        { id: 'Minarex oil', en: 'Minarex oil' },
        { id: 'Rubber formulation', en: 'Rubber formulation' }
      ]
    }
  }
]

export const mockProducts: ProductItem[] = []

export const mockCustomers: CustomerItem[] = [
  { id: 1, name: 'Berkah Bersaudara', logo: '', industry: { id: 'Industri Karet', en: 'Rubber Industry' }, order: 1 },
  { id: 2, name: 'Fanbel Jaya Bersama', logo: '', industry: { id: 'Komponen Otomotif', en: 'Automotive Parts' }, order: 2 },
  { id: 3, name: 'Berkat Manunggal Energi', logo: '', industry: { id: 'Pengolahan Air', en: 'Water Treatment' }, order: 3 }
]

export const mockTestimonials: TestimonialItem[] = []

export const mockPosts: PostItem[] = []

export const mockCareers: CareerItem[] = [
  {
    id: 1,
    slug: 'sales-representative',
    isOpen: true,
    postedAt: '2026-01-15',
    location: { id: 'Bekasi, Jawa Barat', en: 'Bekasi, West Java' },
    employmentType: { id: 'Full Time', en: 'Full Time' },
    department: { id: 'Penjualan', en: 'Sales' },
    title: { id: 'Sales Representative', en: 'Sales Representative' },
    description: {
      id: '<p>Menangani penjualan chemical industri ke pelanggan manufaktur dan distributor di wilayah Jabodetabek. Posisi ini report langsung ke Head of Sales.</p>',
      en: '<p>Handle industrial chemical sales to manufacturing customers and distributors across the Greater Jakarta Area, reporting directly to the Head of Sales.</p>'
    },
    requirements: {
      id: [
        { id: 'Minimal 3 tahun pengalaman penjualan industri', en: 'Minimum 3 years of industrial sales experience' },
        { id: 'Memahami produk chemical dan aplikasinya', en: 'Understanding chemical products and their applications' },
        { id: 'Memiliki SIM A dan siap dinas lapangan', en: 'Valid Indonesian driving licence and willing to travel' }
      ],
      en: [
        { id: 'Minimum 3 years of industrial sales experience', en: 'Minimum 3 years of industrial sales experience' },
        { id: 'Understanding chemical products and their applications', en: 'Understanding chemical products and their applications' },
        { id: 'Valid Indonesian driving licence and willing to travel', en: 'Valid Indonesian driving licence and willing to travel' }
      ]
    }
  },
  {
    id: 2,
    slug: 'technical-support-engineer',
    isOpen: true,
    postedAt: '2026-01-15',
    location: { id: 'Bekasi, Jawa Barat', en: 'Bekasi, West Java' },
    employmentType: { id: 'Full Time', en: 'Full Time' },
    department: { id: 'Teknikal', en: 'Technical' },
    title: { id: 'Technical Support Engineer', en: 'Technical Support Engineer' },
    description: {
      id: '<p>Memberikan dukungan teknis pemilihan produk chemical dan informasi keselamatan (K3) kepada pelanggan, termasuk kunjungan on-site dan pendampingan penggunaan produk.</p>',
      en: '<p>Provide technical support on chemical product selection and safety (K3) information to customers, including on-site visits and product usage assistance.</p>'
    },
    requirements: {
      id: [
        { id: 'Sarjana Teknik Kimia atau setara', en: 'Bachelor degree in Chemical Engineering or equivalent' },
        { id: 'Pengalaman teknis chemical minimal 3 tahun', en: 'At least 3 years of chemical technical experience' },
        { id: 'Kemampuan komunikasi teknis yang baik', en: 'Strong technical communication skills' }
      ],
      en: [
        { id: 'Bachelor degree in Chemical Engineering or equivalent', en: 'Bachelor degree in Chemical Engineering or equivalent' },
        { id: 'At least 3 years of chemical technical experience', en: 'At least 3 years of chemical technical experience' },
        { id: 'Strong technical communication skills', en: 'Strong technical communication skills' }
      ]
    }
  },
  {
    id: 3,
    slug: 'warehouse-supervisor',
    isOpen: true,
    postedAt: '2026-01-15',
    location: { id: 'Bekasi, Jawa Barat', en: 'Bekasi, West Java' },
    employmentType: { id: 'Full Time', en: 'Full Time' },
    department: { id: 'Logistik', en: 'Logistics' },
    title: { id: 'Warehouse Supervisor', en: 'Warehouse Supervisor' },
    description: {
      id: '<p>Mengelola operasional gudang chemical: penerimaan, penyimpanan sesuai standar keselamatan, stok opname, dan akurasi pengiriman.</p>',
      en: '<p>Manage chemical warehouse operations: receiving, safety-compliant storage, stock opname, and delivery accuracy.</p>'
    },
    requirements: {
      id: [
        { id: 'Minimal 3 tahun pengalaman gudang', en: 'Minimum 3 years of warehouse experience' },
        { id: 'Memahami penyimpanan bahan kimia yang aman', en: 'Understanding safe chemical storage' },
        { id: 'Disiplin dan teliti', en: 'Disciplined and detail-oriented' }
      ],
      en: [
        { id: 'Minimum 3 years of warehouse experience', en: 'Minimum 3 years of warehouse experience' },
        { id: 'Understanding safe chemical storage', en: 'Understanding safe chemical storage' },
        { id: 'Disciplined and detail-oriented', en: 'Disciplined and detail-oriented' }
      ]
    }
  }
]

export const mockPages: Record<string, PageContent> = {
  profile: {
    slug: 'profile',
    updatedAt: '2026-06-01',
    heroImage: '/img/profile-hero.svg',
    title: { id: 'Profil', en: 'Profile' },
    heading: { id: 'Tentang PT. Toba Mandiri Sukses', en: 'About PT. Toba Mandiri Sukses' },
    metaTitle: {
      id: 'Profil PT. Toba Mandiri Sukses — Supplier Chemical Industri',
      en: 'PT. Toba Mandiri Sukses Profile — Industrial Chemical Supplier'
    },
    metaDescription: {
      id: 'Sejarah, segmen industri, dan komitmen PT. Toba Mandiri Sukses sebagai supplier chemical industri sejak 2013.',
      en: 'History, industry segments, and commitments of PT. Toba Mandiri Sukses as an industrial chemical supplier since 2013.'
    },
    intro: {
      id: 'PT. Toba Mandiri Sukses didirikan pada 2013 di Bekasi sebagai supplier chemical untuk kebutuhan industri di Indonesia.',
      en: 'PT. Toba Mandiri Sukses was established in 2013 in Bekasi as a supplier of chemicals for industrial needs in Indonesia.'
    },
    body: {
      id: [
        '<p>PT. Toba Mandiri Sukses adalah supplier chemical industri yang melayani berbagai sektor manufaktur di Indonesia. Kami memasok bahan kimia proses sesuai kebutuhan dan spesifikasi pelanggan.</p>',
        '<p>Segmen industri yang kami layani meliputi:</p>',
        '<ul><li>Industri ban & karet</li><li>Komponen karet otomotif</li><li>Pengolahan air</li><li>Smelter</li><li>Pabrik semen</li></ul>',
        '<p>Komitmen kami:</p>',
        '<ul><li>Produk sesuai spesifikasi teknis</li><li>Stok siap kirim</li><li>Harga kompetitif</li><li>Pengiriman tepat waktu</li><li>Distribusi ke seluruh Indonesia</li><li>Dukungan teknis dan K3</li></ul>',
        '<p>Kami berkomitmen menjadi mitra yang andal bagi pelanggan industri melalui pasokan chemical yang konsisten, informasi keselamatan yang lengkap, serta layanan yang responsif.</p>'
      ].join('\n'),
      en: [
        '<p>PT. Toba Mandiri Sukses is an industrial chemical supplier serving various manufacturing sectors in Indonesia. We supply process chemicals according to our customers needs and specifications.</p>',
        '<p>The industry segments we serve include:</p>',
        '<ul><li>Tire & rubber industry</li><li>Automotive rubber components</li><li>Water treatment</li><li>Smelter</li><li>Cement plants</li></ul>',
        '<p>Our commitments:</p>',
        '<ul><li>Products to technical specification</li><li>Ready stock</li><li>Competitive pricing</li><li>On-time delivery</li><li>Nationwide distribution</li><li>Technical and K3 support</li></ul>',
        '<p>We are committed to being a reliable partner for industrial customers through consistent chemical supply, complete safety information, and responsive service.</p>'
      ].join('\n')
    }
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    updatedAt: '2026-06-01',
    heroImage: '',
    title: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
    heading: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
    metaTitle: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
    metaDescription: {
      id: 'Kebijakan privasi dan pengelolaan data pribadi di PT. Toba Mandiri Sukses.',
      en: 'Privacy policy and personal data handling at PT. Toba Mandiri Sukses.'
    },
    intro: {
      id: 'Halaman ini menjelaskan bagaimana PT. Toba Mandiri Sukses mengumpulkan, menggunakan, dan melindungi data pribadi Anda.',
      en: 'This page explains how PT. Toba Mandiri Sukses collects, uses, and protects your personal data.'
    },
    body: {
      id: [
        '<p><strong>Data yang kami kumpulkan.</strong> Kami mengumpulkan nama, nama perusahaan, nomor telepon, alamat surel, dan pesan yang Anda kirimkan melalui formulir kontak, telepon, atau WhatsApp.</p>',
        '<p><strong>Penggunaan data.</strong> Data tersebut digunakan hanya untuk menjawab pertanyaan, menyiapkan penawaran harga, memproses pemesanan produk, dan mengoordinasikan pengiriman serta dukungan teknis.</p>',
        '<p><strong>Berbagi data.</strong> Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga. Data hanya dibagikan kepada mitra logistik bila diperlukan untuk pengiriman pesanan Anda.</p>',
        '<p><strong>Keamanan.</strong> Data disimpan pada server yang aksesnya terbatas dan hanya digunakan oleh personel yang berwenang untuk keperluan layanan.</p>',
        '<p><strong>Hak Anda.</strong> Anda dapat meminta akses, koreksi, atau penghapusan data pribadi Anda dengan menghubungi kami melalui halaman Kontak, surel pt.tobamandirisukses@gmail.com, atau telepon 021 8480 520.</p>'
      ].join('\n'),
      en: [
        '<p><strong>Data we collect.</strong> We collect your name, company name, phone number, email address, and messages you submit through the contact form, phone, or WhatsApp.</p>',
        '<p><strong>Use of data.</strong> This data is used only to answer inquiries, prepare quotations, process product orders, and coordinate delivery and technical support.</p>',
        '<p><strong>Data sharing.</strong> We do not sell or rent your personal data to third parties. Data is shared with logistics partners only when required to deliver your order.</p>',
        '<p><strong>Security.</strong> Data is stored on servers with restricted access and used only by authorised personnel for service purposes.</p>',
        '<p><strong>Your rights.</strong> You may request access, correction, or deletion of your personal data by contacting us through the Contact page, email pt.tobamandirisukses@gmail.com, or phone 021 8480 520.</p>'
      ].join('\n')
    }
  },
  faq: {
    slug: 'faq',
    updatedAt: '2026-06-01',
    heroImage: '',
    title: { id: 'FAQ', en: 'FAQ' },
    heading: { id: 'Pertanyaan yang sering diajukan', en: 'Frequently asked questions' },
    metaTitle: {
      id: 'FAQ — PT. Toba Mandiri Sukses',
      en: 'FAQ — PT. Toba Mandiri Sukses'
    },
    metaDescription: {
      id: 'Pertanyaan yang sering diajukan tentang produk chemical, kemasan, pengiriman, dan dukungan teknis PT. Toba Mandiri Sukses.',
      en: 'Frequently asked questions about chemical products, packaging, delivery, and technical support from PT. Toba Mandiri Sukses.'
    },
    intro: {
      id: 'Beberapa pertanyaan yang paling sering kami terima dari pelanggan industri.',
      en: 'Some of the questions we most often receive from industrial customers.'
    },
    body: {
      id: [
        '<details><summary>Produk chemical apa saja yang Anda sediakan?</summary><p>Kami memasok chemical proses untuk industri ban & karet, komponen karet otomotif, pengolahan air, smelter, dan pabrik semen, misalnya carbon black, silica, accelerator, antioxidant, PAC, flocculant, caustic soda, sulphuric acid, hingga grinding aid.</p></details>',
        '<details><summary>Apakah ada minimal pembelian?</summary><p>Tidak ada minimal pembelian untuk pembelian eceran. Untuk kontrak pasokan rutin dan pembelian volume besar, silakan hubungi tim kami untuk penawaran khusus.</p></details>',
        '<details><summary>Kemasan apa yang tersedia?</summary><p>Tersedia sack, jumbo bag, drum, IBC, dan tanker truck, disesuaikan dengan jenis dan volume produk.</p></details>',
        '<details><summary>Metode pembayaran apa yang tersedia?</summary><p>Kami menerima transfer bank dan pembayaran tunai. Untuk pelanggan korporat, tersedia opsi pembayaran sesuai kesepakatan kontrak.</p></details>',
        '<details><summary>Apakah bisa dikirim ke luar kota?</summary><p>Bisa. Kami mendistribusikan produk ke seluruh Indonesia melalui mitra logistik, dengan estimasi waktu kirim yang disesuaikan tujuan.</p></details>',
        '<details><summary>Apakah tersedia dukungan teknis dan informasi K3?</summary><p>Ya. Kami menyediakan konsultasi pemilihan produk, informasi penanganan dan penyimpanan yang aman, lembar data keselamatan (MSDS), serta pelatihan kesadaran K3.</p></details>',
        '<details><summary>Bagaimana cara mendapatkan penawaran harga?</summary><p>Kirimkan kebutuhan Anda melalui halaman Kontak atau WhatsApp. Sertakan jenis produk, jumlah, dan lokasi pengiriman untuk respons yang lebih cepat.</p></details>'
      ].join('\n'),
      en: [
        '<details><summary>What chemical products do you provide?</summary><p>We supply process chemicals for the tire & rubber, automotive rubber component, water treatment, smelter, and cement plant industries, for example carbon black, silica, accelerators, antioxidants, PAC, flocculant, caustic soda, sulphuric acid, and grinding aid.</p></details>',
        '<details><summary>Is there a minimum order?</summary><p>There is no minimum order for retail purchases. For recurring supply contracts and bulk volumes, please contact our team for a special quotation.</p></details>',
        '<details><summary>Which packaging formats are available?</summary><p>Sacks, jumbo bags, drums, IBC totes, and tanker trucks are available, matched to the product type and volume.</p></details>',
        '<details><summary>Which payment methods are available?</summary><p>We accept bank transfer and cash payment. For corporate customers, payment options can be arranged according to the contract agreement.</p></details>',
        '<details><summary>Can you deliver outside the city?</summary><p>Yes. We distribute products throughout Indonesia through logistics partners, with estimated delivery times adjusted to the destination.</p></details>',
        '<details><summary>Do you provide technical support and K3 information?</summary><p>Yes. We provide product selection consultation, safe handling and storage information, safety data sheets (MSDS), and K3 awareness training.</p></details>',
        '<details><summary>How do I get a price quotation?</summary><p>Send us your requirements through the Contact page or WhatsApp. Include the product type, quantity, and delivery location for a faster response.</p></details>'
      ].join('\n')
    }
  },
  'terms-conditions': {
    slug: 'terms-conditions',
    updatedAt: '2026-06-01',
    heroImage: '',
    title: { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' },
    heading: { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' },
    metaTitle: { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' },
    metaDescription: {
      id: 'Syarat dan ketentuan penggunaan layanan serta transaksi di PT. Toba Mandiri Sukses.',
      en: 'Terms and conditions for using the services and transactions at PT. Toba Mandiri Sukses.'
    },
    intro: {
      id: 'Dengan menggunakan layanan dan melakukan transaksi dengan PT. Toba Mandiri Sukses, Anda menyetujui syarat dan ketentuan berikut.',
      en: 'By using our services and conducting transactions with PT. Toba Mandiri Sukses, you agree to the following terms and conditions.'
    },
    body: {
      id: [
        '<p><strong>1. Ruang lingkup.</strong> Syarat dan ketentuan ini mengatur penggunaan situs serta transaksi pembelian produk chemical dan layanan dari PT. Toba Mandiri Sukses.</p>',
        '<p><strong>2. Pesanan.</strong> Pesanan dianggap sah setelah dikonfirmasi oleh tim kami, baik melalui surel, telepon, maupun WhatsApp.</p>',
        '<p><strong>3. Harga.</strong> Harga yang tercantum dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Harga final mengikuti penawaran resmi yang kami kirimkan.</p>',
        '<p><strong>4. Pembayaran.</strong> Pembayaran dilakukan sesuai metode dan jangka waktu yang disepakati pada saat konfirmasi pesanan.</p>',
        '<p><strong>5. Kemasan dan pengiriman.</strong> Kemasan dan jadwal pengiriman dikoordinasikan bersama pelanggan. Waktu pengiriman bersifat estimasi dan dapat dipengaruhi ketersediaan stok serta layanan logistik pihak ketiga.</p>',
        '<p><strong>6. Mutu dan keselamatan.</strong> Produk dipasok sesuai spesifikasi yang disepakati. Informasi penanganan, penyimpanan, dan keselamatan kerja (K3) disediakan untuk memastikan penggunaan chemical yang aman. Pelanggan wajib mengikuti prosedur penanganan yang berlaku di lokasinya.</p>',
        '<p><strong>7. Klaim produk.</strong> Klaim atas produk yang rusak atau tidak sesuai harus disampaikan segera setelah barang diterima, disertai bukti yang memadai.</p>',
        '<p><strong>8. Pembatasan tanggung jawab.</strong> Kami tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan produk yang tidak sesuai anjuran teknis atau informasi keselamatan kami.</p>',
        '<p><strong>9. Hukum yang berlaku.</strong> Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai hukum yang berlaku di Republik Indonesia.</p>'
      ].join('\n'),
      en: [
        '<p><strong>1. Scope.</strong> These terms and conditions govern the use of our site and the purchase of chemical products and services from PT. Toba Mandiri Sukses.</p>',
        '<p><strong>2. Orders.</strong> An order is valid once confirmed by our team, whether by email, phone, or WhatsApp.</p>',
        '<p><strong>3. Pricing.</strong> Listed prices may change at any time without prior notice. The final price follows the official quotation we send.</p>',
        '<p><strong>4. Payment.</strong> Payment is made according to the method and period agreed upon at order confirmation.</p>',
        '<p><strong>5. Packaging and delivery.</strong> Packaging and delivery schedules are coordinated with the customer. Delivery times are estimates and may be affected by stock availability and third-party logistics services.</p>',
        '<p><strong>6. Quality and safety.</strong> Products are supplied according to the agreed specification. Handling, storage, and workplace safety (K3) information is provided to ensure safe chemical use. The customer must follow the handling procedures applicable at its site.</p>',
        '<p><strong>7. Product claims.</strong> Claims for damaged or non-conforming products must be submitted promptly after receipt, with adequate evidence.</p>',
        '<p><strong>8. Limitation of liability.</strong> We are not liable for indirect losses arising from the use of products contrary to our technical recommendations or safety information.</p>',
        '<p><strong>9. Governing law.</strong> These terms and conditions are governed by and construed in accordance with the laws applicable in the Republic of Indonesia.</p>'
      ].join('\n')
    }
  }
}

export const mockHome: HomeContent = {
  hero: {
    eyebrow: {
      id: 'Supplier Chemical Industri',
      en: 'Industrial Chemical Supplier'
    },
    heading: {
      id: 'Chemical Proses untuk Industri Andalan Anda',
      en: 'Process Chemicals for Your Core Industry'
    },
    subheading: {
      id: 'PT. Toba Mandiri Sukses memasok chemical industri sejak 2013 untuk sektor ban & karet, komponen karet otomotif, pengolahan air, smelter, dan pabrik semen. Produk sesuai spesifikasi, stok siap kirim, dan dukungan K3.',
      en: 'PT. Toba Mandiri Sukses has supplied industrial chemicals since 2013 for the tire & rubber, automotive rubber component, water treatment, smelter, and cement plant sectors. Products to specification, ready stock, and K3 support.'
    },
    image: '/img/hero-lubricants.svg',
    ctaPrimary: { label: { id: 'Lihat Produk', en: 'View Products' }, to: '/products' },
    ctaSecondary: { label: { id: 'Konsultasi Gratis', en: 'Free Consultation' }, to: '/contact' }
  },
  aboutIntro: {
    heading: { id: 'Perjalanan kami', en: 'Our journey' },
    body: {
      id: 'Sejak 2013 kami menyediakan chemical proses bagi industri di Indonesia, dengan fokus pada kesesuaian spesifikasi, ketersediaan stok, dan dukungan keselamatan kerja.',
      en: 'Since 2013 we have supplied process chemicals to industries in Indonesia, focusing on specification conformity, stock availability, and workplace safety support.'
    }
  },
  milestones: mockMilestones,
  categories: mockCategories,
  customers: mockCustomers,
  testimonials: mockTestimonials,
  cta: {
    heading: {
      id: 'Butuh chemical untuk proses produksi Anda?',
      en: 'Need chemicals for your production process?'
    },
    body: {
      id: 'Kirimkan jenis produk, spesifikasi, dan volume kebutuhan Anda. Tim kami akan membantu memilih produk yang tepat dan menyiapkan penawaran harga.',
      en: 'Send us the product type, specification, and volume you need. Our team will help select the right product and prepare a quotation.'
    },
    button: { label: { id: 'Hubungi Kami', en: 'Contact Us' }, to: '/contact' }
  }
}
