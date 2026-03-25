import comparePageHtml from './bricknbolt-compare-page.html?raw'

export type BricknboltPackageColumn = {
  name: string
  price: string
}

export type BricknboltTypeOption = {
  name: string
  description: string
  selected: boolean
}

export type BricknboltCompareRow = {
  feature: string
  featureDescription?: string
  values: string[]
}

export type BricknboltCompareSection = {
  title: string
  subtitle?: string
  disclaimer?: string
  rows: BricknboltCompareRow[]
}

export type BricknboltCompareData = {
  heading: string
  city: string
  typeOptions: BricknboltTypeOption[]
  packages: BricknboltPackageColumn[]
  sections: BricknboltCompareSection[]
}

const normalizeText = (value: string | null | undefined): string =>
  (value ?? '')
    .replace(/â‚¹/g, '₹')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const extractFeature = (cell: Element): Pick<BricknboltCompareRow, 'feature' | 'featureDescription'> => {
  const featureDescription = normalizeText(cell.querySelector('.cp-comp-desc')?.textContent)
  const directFeature = normalizeText(cell.querySelector(':scope > div > div > div:not(.cp-comp-desc)')?.textContent)

  if (directFeature) {
    return {
      feature: directFeature,
      featureDescription: featureDescription || undefined,
    }
  }

  const copy = cell.cloneNode(true) as HTMLElement
  copy.querySelectorAll('img').forEach((node) => node.remove())
  copy.querySelectorAll('.cp-comp-desc').forEach((node) => node.remove())

  return {
    feature: normalizeText(copy.textContent),
    featureDescription: featureDescription || undefined,
  }
}

const extractValue = (cell: Element): string => {
  const statusIcon = cell.querySelector('img[alt]')
  if (statusIcon) {
    const state = normalizeText(statusIcon.getAttribute('alt'))
    if (state) {
      return state
    }
  }

  const copy = cell.cloneNode(true) as HTMLElement
  copy.querySelectorAll('img').forEach((node) => node.remove())
  return normalizeText(copy.textContent) || '-'
}

const parseCompareData = (): BricknboltCompareData => {
  const doc = new DOMParser().parseFromString(comparePageHtml, 'text/html')

  const heading = normalizeText(doc.querySelector('.comp-main > h2')?.textContent) || 'Compare Packages'

  const cityChip = doc.querySelector('.selected-city')?.cloneNode(true) as HTMLElement | null
  cityChip?.querySelectorAll('img').forEach((node) => node.remove())
  const city = normalizeText(cityChip?.textContent) || 'Bengaluru'

  const typeOptions = Array.from(doc.querySelectorAll('.cp-constructionType')).map((option) => ({
    name: normalizeText(option.querySelector('.cp-const-type')?.textContent),
    description: normalizeText(option.querySelector('.cp-const-type-desc')?.textContent),
    selected: option.querySelector('input')?.hasAttribute('checked') ?? false,
  }))

  const packages = Array.from(doc.querySelectorAll('.comp-pkg-names')).map((entry) => {
    const name = normalizeText(entry.querySelector('strong')?.textContent)
    const combinedText = normalizeText(entry.textContent)
    const price = normalizeText(combinedText.replace(name, ''))
    return {
      name,
      price,
    }
  })

  const sections = Array.from(doc.querySelectorAll('.cp-comp-main > div'))
    .filter((container) => container.querySelector('.cp-table-container'))
    .map((container) => {
      const sectionHeader = container.querySelector('.cp-comp-index')
      const titleNode = Array.from(sectionHeader?.childNodes ?? []).find(
        (node) => node.nodeType === 3 && normalizeText(node.textContent),
      )

      const title = normalizeText(titleNode?.textContent) || normalizeText(sectionHeader?.textContent)
      const subtitle = normalizeText(sectionHeader?.querySelector('.cp-comp-name')?.textContent)
      const disclaimer = normalizeText(container.querySelector('.cp-disclaimer')?.textContent)

      const rows: BricknboltCompareRow[] = []

      Array.from(container.querySelectorAll('.cp-table-container tr')).forEach((row) => {
        const cells = Array.from(row.querySelectorAll('td'))
        if (cells.length < 2) {
          return
        }

        const featureData = extractFeature(cells[0])
        const values = cells.slice(1).map(extractValue)

        rows.push({
          feature: featureData.feature || '-',
          featureDescription: featureData.featureDescription,
          values,
        })
      })

      return {
        title,
        subtitle: subtitle && subtitle !== title ? subtitle : undefined,
        disclaimer: disclaimer || undefined,
        rows,
      }
    })

  return {
    heading,
    city,
    typeOptions,
    packages,
    sections,
  }
}

export const bricknboltCompareData = parseCompareData()
