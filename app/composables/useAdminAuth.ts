/**
 * Auth admin.
 *
 * Token JWT dari POST /api/admin-user-login disimpan di cookie supaya tetap ada
 * setelah refresh. Proteksi route /admin dijalankan oleh middleware global
 * app/middleware/admin-auth.global.ts.
 */

export interface AdminUser {
  id: number
  email: string
  name: string
  role: string
}

const TOKEN_KEY = 'lkr_admin_token'
const USER_KEY = 'lkr_admin_user'

export function useAdminAuth() {
  const token = useCookie<string | null>(TOKEN_KEY, {
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12
  })
  const user = useCookie<string | null>(USER_KEY, {
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12
  })

  const profile = computed<AdminUser | null>(() => {
    if (!user.value) return null
    try {
      return JSON.parse(user.value) as AdminUser
    } catch {
      return null
    }
  })

  const isAuthenticated = computed(() => Boolean(token.value))

  function saveToken(nextToken: string, nextUser: AdminUser) {
    token.value = nextToken
    user.value = JSON.stringify(nextUser)
  }

  function clear() {
    token.value = null
    user.value = null
  }

  function logout() {
    clear()
    return navigateTo('/admin/login')
  }

  return {
    token,
    profile,
    isAuthenticated,
    saveToken,
    clear,
    logout
  }
}