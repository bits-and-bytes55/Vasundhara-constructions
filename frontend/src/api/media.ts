const API_BASE = import.meta.env.VITE_API_URL || '/api'

type UploadResponse = {
  success: boolean
  data: {
    fileName: string
    url: string
  }
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
        return
      }

      reject(new Error('Failed to read the selected image.'))
    }

    reader.onerror = () => {
      reject(new Error('Failed to read the selected image.'))
    }

    reader.readAsDataURL(file)
  })
}

async function readErrorMessage(response: Response) {
  try {
    const payload = await response.json()
    return payload?.message || `Request failed with status ${response.status}`
  } catch {
    return `Request failed with status ${response.status}`
  }
}

export async function uploadProjectImage(token: string, file: File) {
  const dataUrl = await fileToDataUrl(file)

  const response = await fetch(`${API_BASE}/media/project-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fileName: file.name,
      dataUrl,
    }),
  })

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  const payload = (await response.json()) as UploadResponse
  return payload.data.url
}
