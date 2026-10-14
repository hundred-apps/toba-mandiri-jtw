/**
 * Proteksi route /admin.
 *
 * Middleware global supaya guard tetap berjalan walau layout admin dipakai
 * dengan SSR dimatikan (`routeRules['/admin/**'].ssr = false`). Halaman publik
 * tidak terpengaruh karena hanya path /admin yang diperiksa.
 */
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/forgot-password']

export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/admin')) return

  const { isAuthenticated } = useAdminAuth()
  const isPublic = PUBLIC_ADMIN_PATHS.includes(to.path)

  if (isPublic) {
    if (isAuthenticated.value && to.path === '/admin/login') {
      return navigateTo('/admin')
    }
    return
  }

  if (!isAuthenticated.value) {
    return navigateTo({ path: '/admin/login', query: { redirect: to.fullPath } })
  }
})
