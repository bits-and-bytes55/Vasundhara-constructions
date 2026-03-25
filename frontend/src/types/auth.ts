export type AdminUser = {
  id: string
  name: string
  email: string
  createdAt: string
}

export type AdminAuthPayload = {
  user: AdminUser
  token: string
}
