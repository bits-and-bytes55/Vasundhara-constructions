import type { HomeContent } from '../types/homeContent'
import { defaultHomeContent } from '../data/defaultHomeContent'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

type HomeContentResponse = {
  success: boolean
  data: HomeContent
}

type UpdateHomeContentOptions = {
  token: string
  content: HomeContent
}

function normalizeStringArray(value: unknown, fallback: string[]) {
  return Array.isArray(value) && value.length > 0
    ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : fallback
}

function normalizeHomeContent(content: Partial<HomeContent> | null | undefined): HomeContent {
  const safeContent = (content && typeof content === 'object' ? content : {}) as Partial<HomeContent>
  const safeHero = (safeContent.hero ?? {}) as Partial<HomeContent['hero']>
  const safeServices = (safeContent.services ?? {}) as Partial<HomeContent['services']>
  const safeProcess = (safeContent.process ?? {}) as Partial<HomeContent['process']>
  const safeCeo = (safeContent.ceo ?? {}) as Partial<HomeContent['ceo']>
  const safeCta = (safeContent.cta ?? {}) as Partial<HomeContent['cta']>
  const safeProjects = (safeContent.projects ?? {}) as Partial<HomeContent['projects']>
  const safeNewsMedia = (safeContent.newsMedia ?? {}) as Partial<HomeContent['newsMedia']>

  const normalizedProjectItems =
    Array.isArray(safeProjects.items) && safeProjects.items.length > 0
      ? safeProjects.items
          .map((item) => {
            const safeItem = (item ?? {}) as Partial<HomeContent['projects']['items'][number]>

            return {
              title: typeof safeItem.title === 'string' ? safeItem.title : '',
              location: typeof safeItem.location === 'string' ? safeItem.location : '',
              area: typeof safeItem.area === 'string' ? safeItem.area : '',
              tag: typeof safeItem.tag === 'string' ? safeItem.tag : '',
              description: typeof safeItem.description === 'string' ? safeItem.description : '',
              images: normalizeStringArray(safeItem.images, ['/images/luxury-villa.jpg']),
            }
          })
          .filter((item) => item.title && item.location && item.area && item.tag && item.description)
      : defaultHomeContent.projects.items

  const normalizedNewsItems =
    Array.isArray(safeNewsMedia.items) && safeNewsMedia.items.length > 0
      ? safeNewsMedia.items
          .map((item) => {
            const safeItem = (item ?? {}) as Partial<HomeContent['newsMedia']['items'][number]>

            return {
              title: typeof safeItem.title === 'string' ? safeItem.title : '',
              category: typeof safeItem.category === 'string' ? safeItem.category : '',
              publishedOn: typeof safeItem.publishedOn === 'string' ? safeItem.publishedOn : '',
              source: typeof safeItem.source === 'string' ? safeItem.source : '',
              excerpt: typeof safeItem.excerpt === 'string' ? safeItem.excerpt : '',
              image:
                typeof safeItem.image === 'string' && safeItem.image.trim().length > 0
                  ? safeItem.image
                  : '/images/luxury-villa.jpg',
            }
          })
          .filter((item) => item.title && item.category && item.publishedOn && item.source && item.excerpt)
      : defaultHomeContent.newsMedia.items

  return {
    hero: {
      ...defaultHomeContent.hero,
      ...safeHero,
      typedWords: normalizeStringArray(safeHero.typedWords, defaultHomeContent.hero.typedWords),
      pills: normalizeStringArray(safeHero.pills, defaultHomeContent.hero.pills),
      stats: Array.isArray(safeHero.stats) && safeHero.stats.length > 0 ? safeHero.stats : defaultHomeContent.hero.stats,
    },
    services: {
      ...defaultHomeContent.services,
      ...safeServices,
      cards: Array.isArray(safeServices.cards) && safeServices.cards.length > 0 ? safeServices.cards : defaultHomeContent.services.cards,
    },
    process: {
      ...defaultHomeContent.process,
      ...safeProcess,
      steps: Array.isArray(safeProcess.steps) && safeProcess.steps.length > 0 ? safeProcess.steps : defaultHomeContent.process.steps,
    },
    ceo: {
      ...defaultHomeContent.ceo,
      ...safeCeo,
    },
    cta: {
      ...defaultHomeContent.cta,
      ...safeCta,
      perks: normalizeStringArray(safeCta.perks, defaultHomeContent.cta.perks),
    },
    projects: {
      ...defaultHomeContent.projects,
      ...safeProjects,
      items: normalizedProjectItems,
    },
    newsMedia: {
      ...defaultHomeContent.newsMedia,
      ...safeNewsMedia,
      items: normalizedNewsItems,
    },
  }
}

export async function fetchHomeContent(): Promise<HomeContent> {
  const response = await fetch(`${API_BASE}/content/home`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = (await response.json()) as HomeContentResponse
  return normalizeHomeContent(payload.data)
}

export async function updateHomeContent({ token, content }: UpdateHomeContentOptions): Promise<HomeContent> {
  const response = await fetch(`${API_BASE}/content/home`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  })

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`

    try {
      const payload = await response.json()
      if (payload?.message) {
        errorMessage = payload.message
      }
    } catch {
      // Ignore JSON parsing failure and surface the status-based message.
    }

    throw new Error(errorMessage)
  }

  const payload = (await response.json()) as HomeContentResponse
  return normalizeHomeContent(payload.data)
}
