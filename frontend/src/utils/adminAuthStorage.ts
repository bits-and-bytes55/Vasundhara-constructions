import type { AdminUser } from '../types/auth'

const TOKEN_KEY = 'wallbolt_admin_token'
const USER_KEY = 'wallbolt_admin_user'

export function getAdminToken() {
  return window.localStorage.getItem(TOKEN_KEY)
}

export function getStoredAdminUser(): AdminUser | null {
  const rawUser = window.localStorage.getItem(USER_KEY)

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser) as AdminUser
  } catch {
    return null
  }
}

export function storeAdminSession(token: string, user: AdminUser) {
  window.localStorage.setItem(TOKEN_KEY, token)
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAdminSession() {
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(USER_KEY)
}
