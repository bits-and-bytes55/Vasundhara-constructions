export type EstimatorPackageComponent = {
  name: string
  blocks: string[]
}

export type EstimatorPackage = {
  slug: string
  name: string
  rate: number
  tag: string
  summary: string
  accent: string
  surface: string
  components: EstimatorPackageComponent[]
}

export type EstimatorCity = {
  name: string
  code: string
  factor: number
  note: string
}

export const estimatorCities: EstimatorCity[] = [
  { name: 'Bengaluru', code: 'BNG_KA_IN', factor: 1, note: 'Reference-aligned benchmark city' },
  { name: 'Hyderabad', code: 'HYD_TG_IN', factor: 0.97, note: 'Slightly softer labour and finish cost mix' },
  { name: 'Chennai', code: 'CHE_TN_IN', factor: 0.96, note: 'Balanced material basket with stable rates' },
  { name: 'Pune', code: 'PUNE_MH_IND', factor: 1.03, note: 'Includes plinth and terrace caution in live market' },
  { name: 'Noida', code: 'NOI_UP_IN', factor: 1.06, note: 'Premium NCR market adjustment' },
]

export const estimatorPackages: EstimatorPackage[] = [
  {
    slug: 'basic',
    name: 'Basic Package',
    rate: 1900,
    tag: 'Budget-Friendly',
    summary: 'Standard material palette for practical turnkey construction.',
    accent: '#f97316',
    surface: '#fff7ed',
    components: [
      {
        name: 'Structure',
        blocks: [
          'Steel - Kamadhenu or Primegold',
          'Cement - Dalmia or Bharathi, 43 or 53 grade',
          'Aggregates - 20mm and 40mm',
          'Standard solid concrete blocks, 6 inch and 4 inch',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Ceramic wall dado up to Rs.40 per sqft',
          'Main sink faucet up to Rs.1,300',
          'ISI-marked accessory set',
          'Single bowl stainless sink up to Rs.3,000',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Ceramic wall dado up to 7 feet height',
          'Sanitaryware and CP fittings up to Rs.30,000 per 1,000 sqft',
          'Apollo or Astral CPVC pipes',
          'Waterproof flush or WPC bathroom doors',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'Aluminium windows with mesh shutters',
          'Flush main door with veneer and sal wood frame',
          'Membrane or flush internal doors with laminate finish',
        ],
      },
      {
        name: 'Flooring',
        blocks: [
          'Living and dining tiles up to Rs.50 per sqft',
          'Room and kitchen tiles up to Rs.50 per sqft',
          'Balcony anti-skid tiles up to Rs.40 per sqft',
          'Sadarahalli granite staircase up to Rs.70 per sqft',
        ],
      },
      {
        name: 'Electrical',
        blocks: [
          'Fire-proof wiring with Finolex, Anchor, or Havells',
          'Legrand Allzy, GM G9, Hi-Fi, or Great White switches',
        ],
      },
    ],
  },
  {
    slug: 'comfort',
    name: 'Classic Package',
    rate: 2030,
    tag: 'Balanced Upgrade',
    summary: 'A comfort-led mix of better openings, fittings, and finishes.',
    accent: '#ef4444',
    surface: '#fff1f2',
    components: [
      {
        name: 'Structure',
        blocks: [
          'Steel - Indus or Jindal Panther',
          'Cement - Dalmia or Bharathi, 43 or 53 grade',
          'Aggregates - 20mm and 40mm',
          'Standard solid concrete blocks, 6 inch and 4 inch',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Ceramic wall dado up to Rs.60 per sqft',
          'Main sink faucet up to Rs.2,000',
          'ISI-marked accessory set',
          'Single bowl stainless sink up to Rs.6,000',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Ceramic wall dado up to 7 feet height',
          'Sanitaryware and CP fittings up to Rs.50,000 per 1,000 sqft',
          'Apollo or Astral CPVC pipes',
          'Waterproof flush or WPC bathroom doors',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'UPVC windows with mesh shutters',
          'Teak main door with 5 x 3 inch frame',
          'Membrane or flush laminate internal doors',
        ],
      },
      {
        name: 'Flooring',
        blocks: [
          'Living and dining tiles or granite up to Rs.100 per sqft',
          'Room and kitchen tiles up to Rs.80 per sqft',
          'Balcony anti-skid tiles up to Rs.60 per sqft',
          'Sadarahalli granite staircase up to Rs.80 per sqft',
        ],
      },
      {
        name: 'Electrical',
        blocks: [
          'Finolex, Anchor, or Havells fire-proof wiring',
          'Roma, Lisha, Legrand Lyncus, or Havells Fabio switches',
          'UPS wiring provision included',
        ],
      },
    ],
  },
  {
    slug: 'premium',
    name: 'Premium Package',
    rate: 2350,
    tag: 'High-End Build',
    summary: 'Premium-grade structure and richer finish levels across the house.',
    accent: '#0f766e',
    surface: '#ecfeff',
    components: [
      {
        name: 'Structure',
        blocks: [
          'Steel - Indus or Jindal Panther',
          'Cement - Ultratech or Ramco Supercrete',
          'Aggregates - 20mm and 40mm',
          'Standard solid concrete blocks, 6 inch and 4 inch',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Ceramic wall dado up to Rs.80 per sqft',
          'Main sink faucet up to Rs.3,500',
          'Parryware, Hindware, or Jaquar fittings',
          'Granite finish or stainless sink up to Rs.8,000',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Ceramic wall dado up to 7 feet height',
          'Jaquar sanitaryware up to Rs.70,000 per 1,000 sqft',
          'Apollo or Astral CPVC pipes',
          'Waterproof flush or WPC bathroom doors',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'Premium UPVC windows with mesh shutters',
          'Teak main door with 5 x 3.5 inch frame',
          'Higher-spec laminate internal doors',
          'Pooja room teak door for larger packages',
        ],
      },
      {
        name: 'Flooring',
        blocks: [
          'Living and dining tiles or granite up to Rs.140 per sqft',
          'Room and kitchen tiles or granite up to Rs.120 per sqft',
          'Balcony anti-skid tiles up to Rs.80 per sqft',
          'Sadarahalli granite staircase up to Rs.110 per sqft',
        ],
      },
      {
        name: 'Electrical',
        blocks: [
          'Finolex, Anchor, or Havells fire-proof wiring',
          'Legrand Mylinc, Havells Coral, or Roma switches',
          'UPS wiring provision included',
        ],
      },
    ],
  },
  {
    slug: 'luxury',
    name: 'Royale Package',
    rate: 2585,
    tag: 'Luxury Finish',
    summary: 'Luxury-grade fittings, richer elevations, and premium feature depth.',
    accent: '#7c3aed',
    surface: '#f5f3ff',
    components: [
      {
        name: 'Structure',
        blocks: [
          'Steel - Indus or Jindal Panther',
          'Cement - Ultratech or Ramco Supercrete',
          'Aggregates - 20mm and 40mm',
          'Standard solid concrete blocks, 6 inch and 4 inch',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Ceramic wall dado up to Rs.90 per sqft',
          'Main sink faucet up to Rs.3,500',
          'Parryware, Hindware, or Jaquar fittings',
          'Granite finish or stainless sink up to Rs.8,000',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Ceramic wall dado up to 7 feet height',
          'Kohler sanitaryware up to Rs.80,000 per 1,000 sqft',
          'Apollo or Astral CPVC pipes',
          'Waterproof flush or WPC bathroom doors',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'High-spec UPVC windows with mesh shutters',
          'Teak main door with 5 x 3.5 inch frame',
          'Premium laminate internal doors up to Rs.15,000',
          'Burma teak pooja room door for larger packages',
        ],
      },
      {
        name: 'Flooring',
        blocks: [
          'Living and dining tiles or granite up to Rs.160 per sqft',
          'Room and kitchen tiles or granite up to Rs.140 per sqft',
          'Balcony anti-skid tiles up to Rs.90 per sqft',
          'Sadarahalli granite staircase up to Rs.140 per sqft',
        ],
      },
      {
        name: 'Electrical',
        blocks: [
          'Finolex, Anchor, or Havells fire-proof wiring',
          'Schneider Unica Pure, Legrand Myrius, or Jaquar switches',
          'UPS wiring provision included',
          'EV charging point at ground floor',
        ],
      },
    ],
  },
]

export const estimatorFaqs = [
  {
    question: 'What is a house construction cost calculator?',
    answer:
      'It is an online tool that estimates the cost of building your home based on location, built-up area, balcony and utility requirements, and parking count.',
  },
  {
    question: 'How are balcony and car parking costs handled?',
    answer:
      'This reference-style calculator assumes 40 sqft per balcony or utility unit and 130 sqft per car parking. Both are charged at 60 percent of the package rate.',
  },
  {
    question: 'Does the estimate include everything?',
    answer:
      'The estimate is an indicative budget. Final project cost can still shift because of soil condition, approvals, plinth, terrace scope, elevation complexity, and selected brands.',
  },
  {
    question: 'Which package should I choose?',
    answer:
      'Basic is value-focused, Classic balances quality and cost, Premium upgrades core finishes, and Royale targets luxury materials and richer detailing.',
  },
  {
    question: 'Can I use this for cities other than Bengaluru?',
    answer:
      'Yes. This page uses Bengaluru benchmark rates from the reference and applies city multipliers so you can preview cost movement across other served cities.',
  },
  {
    question: 'What should I do after getting the estimate?',
    answer:
      'Use the estimate as a planning baseline, shortlist your preferred package, and then move to a detailed consultation for soil, design, plinth, and execution scope.',
  },
]

export const estimatorStageBreakdown = [
  { label: 'Mobilisation Design & Drawing', share: 0.08 },
  { label: 'Foundation Works', share: 0.18 },
  { label: 'GF Structural works', share: 0.1925 },
  { label: 'First Floor Structural works', share: 0.1075 },
  { label: 'External plastering, putty works, doors, electrical fixtures, plumbing fittings', share: 0.15 },
  { label: 'GF internal plastering, waterproofing, wall cladding, flooring', share: 0.09 },
  { label: 'FF internal plastering, waterproofing, wall cladding, flooring', share: 0.08 },
  { label: 'Painting, fabrication, doors, electrical, plumbing, miscellaneous works', share: 0.12 },
] as const

export const estimatorFloorPresets = [
  {
    label: 'G',
    rows: [{ name: 'Ground Floor', share: 1 }],
  },
  {
    label: 'G+1',
    rows: [
      { name: 'Ground Floor', share: 0.61 },
      { name: 'First Floor', share: 0.39 },
    ],
  },
  {
    label: 'G+2',
    rows: [
      { name: 'Ground Floor', share: 0.43 },
      { name: 'First Floor', share: 0.29 },
      { name: 'Second Floor', share: 0.28 },
    ],
  },
  {
    label: 'G+3',
    rows: [
      { name: 'Ground Floor', share: 0.33 },
      { name: 'First Floor', share: 0.23 },
      { name: 'Second Floor', share: 0.22 },
      { name: 'Third Floor', share: 0.22 },
    ],
  },
  {
    label: 'G+4',
    rows: [
      { name: 'Ground Floor', share: 0.28 },
      { name: 'First Floor', share: 0.19 },
      { name: 'Second Floor', share: 0.18 },
      { name: 'Third Floor', share: 0.18 },
      { name: 'Fourth Floor', share: 0.17 },
    ],
  },
  {
    label: 'G+5',
    rows: [
      { name: 'Ground Floor', share: 0.24 },
      { name: 'First Floor', share: 0.16 },
      { name: 'Second Floor', share: 0.15 },
      { name: 'Third Floor', share: 0.15 },
      { name: 'Fourth Floor', share: 0.15 },
      { name: 'Fifth Floor', share: 0.15 },
    ],
  },
] as const

export type CostBreakdownInput = {
  builtUpArea: number
  balconyUnits: number
  carParking: number
  cityFactor: number
}

export type CostBreakdown = {
  adjustedRate: number
  chargeableBuiltUpArea: number
  builtUpCost: number
  parkingCost: number
  balconyCost: number
  total: number
}

export function calculatePackageCost(rate: number, input: CostBreakdownInput): CostBreakdown {
  const adjustedRate = Math.round(rate * input.cityFactor)
  const chargeableBuiltUpArea = Math.max(input.builtUpArea - input.balconyUnits * 40 - input.carParking * 130, 0)
  const builtUpCost = chargeableBuiltUpArea * adjustedRate
  const parkingCost = input.carParking * 130 * adjustedRate * 0.6
  const balconyCost = input.balconyUnits * 40 * adjustedRate * 0.6
  const total = builtUpCost + parkingCost + balconyCost

  return {
    adjustedRate,
    chargeableBuiltUpArea,
    builtUpCost,
    parkingCost,
    balconyCost,
    total,
  }
}

export function formatInr(value: number): string {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}
