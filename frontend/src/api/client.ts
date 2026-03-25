export type HealthResponse = {
  success: boolean
  message: string
  timestamp: string
  database: string
}

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE}/health`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}
