import type { AdminAuthPayload, AdminUser } from '../types/auth'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

type AuthResponse = {
  success: boolean
  message: string
  data: AdminAuthPayload
}

type MeResponse = {
  success: boolean
  data: {
    user: AdminUser
  }
}

type AuthCredentials = {
  email: string
  password: string
}

type RegisterCredentials = AuthCredentials & {
  name: string
}

async function readErrorMessage(response: Response) {
  try {
    const payload = await response.json()
    return payload?.message || `Request failed with status ${response.status}`
  } catch {
    return `Request failed with status ${response.status}`
  }
}

export async function loginAdmin(credentials: AuthCredentials): Promise<AdminAuthPayload> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  const payload = (await response.json()) as AuthResponse
  return payload.data
}

export async function registerAdmin(credentials: RegisterCredentials): Promise<AdminAuthPayload> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  const payload = (await response.json()) as AuthResponse
  return payload.data
}

export async function fetchAdminMe(token: string): Promise<AdminUser> {
  const response = await fetch(`${API_BASE}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  const payload = (await response.json()) as MeResponse
  return payload.data.user
}
