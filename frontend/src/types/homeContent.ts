export type HomeContentStat = {
  value: string
  label: string
}

export type HomeContentCard = {
  title: string
  description: string
}

export type HomeContentProject = {
  title: string
  location: string
  area: string
  tag: string
  description: string
  images: string[]
}

export type HomeContentNewsItem = {
  title: string
  category: string
  publishedOn: string
  source: string
  excerpt: string
  image: string
}

export type HomeContentSectionTitle = {
  eyebrow: string
  titleStart: string
  titleHighlight: string
}

export type HomeContent = {
  hero: {
    eyebrow: string
    titleLineOne: string
    titleLineTwo: string
    typedWords: string[]
    subtitle: string
    primaryCtaLabel: string
    secondaryCtaLabel: string
    pills: string[]
    stats: HomeContentStat[]
  }
  services: HomeContentSectionTitle & {
    cards: HomeContentCard[]
  }
  process: HomeContentSectionTitle & {
    subtitle: string
    steps: HomeContentCard[]
  }
  ceo: {
    eyebrow: string
    titleStart: string
    titleHighlight: string
    name: string
    role: string
    intro: string
    message: string
    buttonLabel: string
  }
  cta: {
    title: string
    subtitle: string
    buttonLabel: string
    perks: string[]
  }
  projects: HomeContentSectionTitle & {
    subtitle: string
    items: HomeContentProject[]
  }
  newsMedia: HomeContentSectionTitle & {
    subtitle: string
    items: HomeContentNewsItem[]
  }
}
