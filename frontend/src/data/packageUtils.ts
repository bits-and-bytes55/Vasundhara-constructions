import { packageDocs, type PackageDoc, type PackageSlug } from './packageDocs'

export type PackageLineItem = {
  sourceLineNumber: number
  text: string
}

export type PackageSection = {
  id: string
  title: string
  entries: PackageLineItem[]
}

const sectionTitleMatchers: Array<{ pattern: RegExp; title: string }> = [
  { pattern: /DESIGN\s*&\s*LAYOUT|ARCHITECTURAL\s+FLOOR\s+PLAN/i, title: 'Design & Layout' },
  { pattern: /STRUCTURE\s+BUILD\s+MATERIAL/i, title: 'Structure Build Material' },
  { pattern: /DOOR\s*&\s*WINDOWS|WINDOW\s*\/\s*DOORS/i, title: 'Doors & Windows' },
  { pattern: /^KITCHEN$/i, title: 'Kitchen' },
  { pattern: /^BATHROOM(\s|$)/i, title: 'Bathroom' },
  { pattern: /^FLOORING(\s|$)/i, title: 'Flooring' },
  { pattern: /^PAINTING(\s|$)/i, title: 'Painting' },
  { pattern: /^STAIRCASE(\s|$)/i, title: 'Staircase' },
  { pattern: /^FALSE\s+CEILING/i, title: 'False Ceiling' },
  { pattern: /NOT\s+INCLUDE/i, title: 'Not Included' },
  { pattern: /MILESTONE\s*[–-]\s*BASED\s*PAYMENT\s*SCHEDULE/i, title: 'Milestone Payment Schedule' },
  { pattern: /PROJECT\s+CONSTRUCTION\s+STAGE/i, title: 'Payment Milestones (%)' },
]

const strongSignalPattern = /(finishing|vastu|handover|quality|checks|layout|drawing|delivery|plumbing|electrical|door|kitchen|flooring|ceiling|painting)/i

export const normalizeDocLine = (line: string): string => {
  return line
    .replace(/\u00a0/g, ' ')
    .replace(/\s*=\s*/g, ' = ')
    .replace(/\s*\/\s*/g, ' / ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export const formatPackagePrice = (price: string): string => {
  const normalized = normalizeDocLine(price)
  const match = normalized.match(/INR\s*([0-9,]+)/i)

  if (!match) {
    return normalized
  }

  const amount = Number(match[1].replace(/,/g, ''))
  if (!Number.isFinite(amount)) {
    return normalized
  }

  return `₹${amount.toLocaleString('en-IN')} / sq.ft`
}

const detectSectionTitle = (line: string): string | null => {
  for (const rule of sectionTitleMatchers) {
    if (rule.pattern.test(line)) {
      return rule.title
    }
  }

  return null
}

export const splitPackageIntoSections = (pkg: PackageDoc): PackageSection[] => {
  const sections: PackageSection[] = []
  let current: PackageSection = {
    id: 'overview',
    title: 'Overview',
    entries: [],
  }

  pkg.details.forEach((rawLine, index) => {
    const line = normalizeDocLine(rawLine)
    const headerTitle = detectSectionTitle(line)

    if (headerTitle) {
      if (current.entries.length > 0) {
        sections.push(current)
      }

      current = {
        id: `${pkg.slug}-${sections.length + 1}`,
        title: headerTitle,
        entries: [],
      }

      return
    }

    current.entries.push({ sourceLineNumber: index + 1, text: line })
  })

  if (current.entries.length > 0) {
    sections.push(current)
  }

  return sections
}

export const getPackagePreviewPoints = (pkg: PackageDoc): string[] => {
  const lines = pkg.details.map(normalizeDocLine).filter((line) => strongSignalPattern.test(line))

  if (lines.length >= 4) {
    return lines.slice(0, 4)
  }

  return pkg.details.slice(1, 5).map(normalizeDocLine)
}

type CompareSpec = {
  label: string
  patterns: RegExp[]
}

const compareSpecs: CompareSpec[] = [
  { label: 'Starting Price', patterns: [] },
  { label: 'Design Scope', patterns: [/DESIGN\s*&\s*LAYOUT/i, /COMPLETE\s+ARCHITECTURAL/i, /2D\s+ARCHITECTURAL/i] },
  { label: 'Lantern Height', patterns: [/LANTERN\s+HEIGHT/i] },
  { label: 'Steel', patterns: [/STEEL\s*\(\s*TMT/i] },
  { label: 'Cement', patterns: [/^CEMENT/i] },
  { label: 'RCC Mix Grade', patterns: [/RCC\s+MIX\s+GRADE/i] },
  { label: 'Plumbing Fitting', patterns: [/PLUMBING\s+FITTING/i] },
  { label: 'Electrical Fitting', patterns: [/ELECTRICAL\s+FITTING/i] },
  { label: 'Door Height', patterns: [/DOOR\s+HEIGHT/i] },
  { label: 'Kitchen Cabinet', patterns: [/CABINET\s*\(\s*UPPER/i, /CABINET\s*\(\s*LOWER/i] },
  { label: 'Flooring', patterns: [/FLOORING/i] },
  { label: 'False Ceiling Material', patterns: [/FALSE\s+CEILING/i, /^MATERIAL.*GYPSUM/i] },
]

const pickCompareValue = (pkg: PackageDoc, spec: CompareSpec): string => {
  if (spec.label === 'Starting Price') {
    return formatPackagePrice(pkg.startingPrice || pkg.titleLine)
  }

  const matchedLine = pkg.details
    .map(normalizeDocLine)
    .find((line) => spec.patterns.some((pattern) => pattern.test(line)))

  if (!matchedLine) return 'Not specified in source doc'

  const eqIndex = matchedLine.indexOf('=')
  if (eqIndex >= 0 && eqIndex < matchedLine.length - 1) {
    return matchedLine.slice(eqIndex + 1).trim()
  }

  return matchedLine
}

export const packageCompareRows: Array<{
  label: string
  values: Array<{ slug: PackageSlug; value: string }>
}> = compareSpecs.map((spec) => ({
  label: spec.label,
  values: packageDocs.map((pkg) => ({ slug: pkg.slug, value: pickCompareValue(pkg, spec) })),
}))
