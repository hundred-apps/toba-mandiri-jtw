export interface HomeMilestone {
  year: string
  title: string
  description: string
}

/**
 * Timeline perusahaan dari company profile (`~/content/companyProfile`),
 * sudah terlokalisasi.
 *
 * Data ini statis (bukan dari API) dan mengikuti locale aktif. Sengaja tidak
 * diambil lewat `tm()` i18n: array of object akan diubah menjadi message AST
 * saat bundle i18n dioptimasi sehingga nilainya tidak bisa dibaca langsung.
 */
export function useMilestones() {
  const { view } = useCompanyProfile()

  return computed<HomeMilestone[]>(() => view.value.milestones)
}
