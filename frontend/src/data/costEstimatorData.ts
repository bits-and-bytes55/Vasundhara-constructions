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
  { name: 'Delhi NCR', code: 'NOI_UP_IN', factor: 1.0, note: 'Base location - Noida, Greater Noida, Ghaziabad' },
  { name: 'Noida', code: 'NOI_UP_IN', factor: 1.0, note: 'Primary service area' },
  { name: 'Greater Noida', code: 'GN_UP_IN', factor: 0.98, note: 'Slightly competitive rates' },
  { name: 'Ghaziabad', code: 'GZB_UP_IN', factor: 0.97, note: 'Adjacent NCR region' },
  { name: 'Faridabad', code: 'FAR_HR_IN', factor: 0.99, note: 'Delhi NCR region' },
  { name: 'Gurugram', code: 'GUR_HR_IN', factor: 1.08, note: 'Premium NCR market' },
]

export const estimatorPackages: EstimatorPackage[] = [
  {
    slug: 'basic',
    name: 'Basic Package',
    rate: 1950,
    tag: 'Budget-Friendly',
    summary: 'Standard material palette for practical turnkey construction. Includes Shree cement, Rathi TMT, and essential finishes.',
    accent: '#3b82f6',
    surface: '#eff6ff',
    components: [
      {
        name: 'Structure & Civil',
        blocks: [
          'Cement - Shree',
          'TMT Bars - Rathi',
          'Red Brick - Premium quality',
          'Dust - Premium quality',
          'Concrete - Premium quality M20 Grade (1:1.5:3)',
          'PCC (1:4:8) for foundation',
          'RCC M20 Grade with rotary mixer & vibrator',
          '12mm shuttering plywood for slab casting',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Kitchen interior in Laminate Finish',
          'Ceramic wall dado up to standard',
          'Single bowl stainless sink',
          'Prince plumbing fittings',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Sanitary fittings - Hind ware',
          'Prince plumbing pipes & fittings',
          'Waterproofing of toilets/kitchen (Dr fixit)',
          'Ceramic wall dado',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'Chowkhat - Marandi/Kapoor',
          'Plywood doors with Laminate on both sides',
          'Wooden windows',
        ],
      },
      {
        name: 'Flooring',
        blocks: [
          'Tile - Vitrified tiles',
          'Granite in Stairs',
          'Kota Stone in Parking',
        ],
      },
      {
        name: 'Electrical',
        blocks: [
          'Electrical Fittings/Conduit - Prince',
          'Switch Board & Switches - Anchor',
          'Electrical Wires - Anchor/Kaliga',
          'Fire-proof standard wiring',
        ],
      },
      {
        name: 'Finishing',
        blocks: [
          'POP - Gypsum',
          'Paint - Premium Emulsion',
          'Internal plaster mix (1:4)',
          'External plaster mix (1:4)',
        ],
      },
    ],
  },
  {
    slug: 'standard',
    name: 'Standard Package',
    rate: 2300,
    tag: 'Most Popular',
    summary: 'Balanced upgrade with better materials, wooden flooring in MBR, and premium finishes.',
    accent: '#0ea5e9',
    surface: '#f0f9ff',
    components: [
      {
        name: 'Structure & Civil',
        blocks: [
          'Cement - Shree / JK Super',
          'TMT Bars - Kamdhenu / Rathi',
          'Red Brick - 1st Number Brick',
          'Dust - 1st Number Quality',
          'Concrete - Premium quality',
          'RCC M20 Grade with vibrator',
          '12mm shuttering plywood',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Kitchen in Acrylic Finish',
          'Supreme plumbing fittings',
          'Ceramic dado upgrade',
          'Single bowl stainless sink',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Sanitary - Parryware',
          'Supreme CPVC pipes',
          'Dr fixit waterproofing',
          'Ceramic dado up to 7 feet',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'Chowkhat - Teak or Sal',
          'Century Plyboard with Laminate on both sides',
          'Wooden windows',
        ],
      },
      {
        name: 'Flooring',
        blocks: [
          'Tile with Wooden Flooring in MBR',
          'Granite in Stairs',
          'Kota Stone in Parking',
        ],
      },
      {
        name: 'Electrical',
        blocks: [
          'Electrical Fittings - Supreme',
          'Switches - Polycab/GreatWhite',
          'Wires - Polycab',
          'UPS wiring provision',
        ],
      },
      {
        name: 'Finishing',
        blocks: [
          'POP with Sakarni',
          'Premium Emulsion paint',
          'Enhanced plaster mix',
        ],
      },
    ],
  },
  {
    slug: 'premium',
    name: 'Premium Package',
    rate: 2750,
    tag: 'Luxury Choice',
    summary: 'Premium-grade structure with Italian flooring, designer interiors, and top-tier brands.',
    accent: '#f59e0b',
    surface: '#fffbeb',
    components: [
      {
        name: 'Structure & Civil',
        blocks: [
          'Cement - Ultratech / JK Super',
          'TMT Bars - SAIL',
          'Red Brick - 1st Number Brick',
          'Premium quality aggregates',
          'M20 Grade RCC with full vibration',
          'Premium shuttering work',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Kitchen in Acrylic Finish',
          'Mandir in Duco Finish',
          'Crockery unit in Glass Finish',
          'Ashirwad plumbing',
          'Premium sink & faucet',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Sanitary - Jaquar/Roca',
          'Ashirwad pipes & fittings',
          'Premium waterproofing',
          'Designer ceramic dado',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'Chowkhat - Teak or Sal',
          'Century Plyboard with Veneer & Polish',
          'UPVC/ Wooden windows',
        ],
      },
      {
        name: 'Flooring',
        blocks: [
          'Italian Flooring in Drawing & Dining',
          'Tiles in Rooms & Bathroom',
          'Granite in Stairs',
          'Kota Stone in Parking',
        ],
      },
      {
        name: 'Electrical',
        blocks: [
          'Fittings - Ashirwad',
          'Switches - Havells',
          'Wires - Havells',
          'Complete UPS wiring',
          'Premium switch plates',
        ],
      },
      {
        name: 'Finishing',
        blocks: [
          'POP with Sakarni',
          'Royal Shine paint',
          'Superior plaster finish',
          'Designer moldings',
        ],
      },
    ],
  },
  {
    slug: 'luxury',
    name: 'Luxury Package',
    rate: 3000,
    tag: 'Ultimate Luxury',
    summary: 'Luxury-grade fittings, premium brands, Italian bathroom tiles, and Sagwan woodwork.',
    accent: '#8b5cf6',
    surface: '#f5f3ff',
    components: [
      {
        name: 'Structure & Civil',
        blocks: [
          'Cement - Ultratech',
          'TMT Bars - Tata',
          'Red Brick - 1st Number Brick',
          'Premium quality materials',
          'Superior M20 Grade RCC',
          'Premium shuttering with smooth finish',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Kitchen in Acrylic Finish',
          'Mandir in Duco Finish',
          'Crockery unit in Glass Finish',
          'Wardrobe in Glass/Wooden Finish with High Gloss Laminate',
          'TV unit and Vanity in Laminate Finish',
          'Ashirwad premium plumbing',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Sanitary - Jaguar/Kohler',
          'Ashirwad/Astral pipes',
          'Italian Flooring with Tiles in Bathroom',
          'Premium shower panels',
          'Designer CP fittings',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'Chowkhat - Sagwan (Teak)',
          'Century Plyboard with Veneer & Polish',
          'Premium UPVC windows',
        ],
      },
      {
        name: 'Flooring',
        blocks: [
          'Italian Flooring',
          'Tiles in Bathroom',
          'Granite in Stairs',
          'Kota Stone in Parking',
        ],
      },
      {
        name: 'Electrical',
        blocks: [
          'Fittings - Ashirwad/Astral',
          'Switches - Havells premium series',
          'Wires - Havells',
          'Complete UPS wiring',
          'EV charging point provision',
          'Smart home ready wiring',
        ],
      },
      {
        name: 'Finishing',
        blocks: [
          'POP with Sakarni premium',
          'Royal Shine paint with extra coat',
          'Premium wall finishes',
          'Decorative moldings and cornices',
        ],
      },
    ],
  },
]

export const estimatorFaqs = [
  {
    question: 'What is included in the construction package?',
    answer: 'Our packages include complete civil work - PCC, DPC, RCC M20 grade columns/beams/slabs, brick masonry, shuttering, reinforcement, plaster, flooring, plumbing, electrical, waterproofing, and interiors as per the package specifications.',
  },
  {
    question: 'How are balcony and car parking areas calculated?',
    answer: 'Extended ramp, trenches, drain, and outside area of plot are measured at open area rate (₹600/sq ft). Setback area development (1.0mtr) is charged at half rate, and above 1.0mtr at covered area rate.',
  },
  {
    question: 'Does the estimate include GST?',
    answer: 'No, GST @ 18% is extra and will be paid by the owner as per government regulations.',
  },
  {
    question: 'Which package should I choose?',
    answer: 'Basic is value-focused with essential finishes, Standard adds wooden flooring and better brands, Premium offers Italian flooring and designer interiors, and Luxury delivers top-tier materials like Tata Steel, Kohler fittings, and Sagwan woodwork.',
  },
  {
    question: 'What is the construction timeline?',
    answer: 'The complete project timeline for a 3-floor building structure is 8 months from the date of work order issuance, subject to timely payments and material approvals.',
  },
  {
    question: 'How are payments structured?',
    answer: 'Payments are milestone-based - 10% advance, 10% on earthwork, 10% on footing, 20% on columns & slabs, and remaining on plaster, flooring, doors, plumbing, electrical, and finishing works as per the stage-wise breakdown.',
  },
  {
    question: 'Do you provide drawings?',
    answer: 'Architectural & structural drawings are available at ₹60 per sq ft. The contractor must execute work as per drawings without deviation unless advised in writing.',
  },
  {
    question: 'What about water and electricity?',
    answer: 'The client will arrange water and electricity free of cost at the workplace wherever required.',
  },
]

export const estimatorStageBreakdown = [
  { label: 'Advance on quotation submission', share: 0.10 },
  { label: 'Completion of earth work excavation', share: 0.10 },
  { label: 'Completion of footing work', share: 0.10 },
  { label: 'Completion of column and slabs', share: 0.20 },
  { label: 'Completion of bricks masonry', share: 0.05 },
  { label: 'Completion of internal plaster', share: 0.05 },
  { label: 'Completion of external plaster', share: 0.05 },
  { label: 'Completion of flooring work', share: 0.10 },
  { label: 'Railing, door, window fitting & brick coba', share: 0.05 },
  { label: 'Completion of plumbing & sanitary', share: 0.05 },
  { label: 'Completion of electrical work', share: 0.05 },
  { label: 'Completion of finishing work (putty, primer, paint)', share: 0.05 },
  { label: 'False ceiling & interior fit-out', share: 0.05 },
] as const

export const estimatorFloorPresets = [
  {
    label: 'G',
    rows: [{ name: 'Ground Floor', share: 1 }],
  },
  {
    label: 'G+1',
    rows: [
      { name: 'Ground Floor', share: 0.55 },
      { name: 'First Floor', share: 0.45 },
    ],
  },
  {
    label: 'G+2',
    rows: [
      { name: 'Ground Floor', share: 0.40 },
      { name: 'First Floor', share: 0.32 },
      { name: 'Second Floor', share: 0.28 },
    ],
  },
  {
    label: 'G+3',
    rows: [
      { name: 'Ground Floor', share: 0.33 },
      { name: 'First Floor', share: 0.25 },
      { name: 'Second Floor', share: 0.22 },
      { name: 'Third Floor', share: 0.20 },
    ],
  },
]

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
  // Balcony and parking charged at 60% of package rate as per open area rate concept
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

// Extra items rates from PDF
export const extraItemRates = [
  { item: 'DPC at plinth Level', rate: 'As per slab area', unit: 'sq. ft.' },
  { item: 'Waterproofing', rate: 40, unit: 'per sq. ft.' },
  { item: 'Architectural & Structural Drawing', rate: 60, unit: 'per sq. ft.' },
  { item: 'Set Back Area Development', rate: 600, unit: 'per sq. ft.' },
  { item: 'Underground water tank', rate: 35, unit: 'per Litre' },
  { item: 'Overhead Tank', rate: 25, unit: 'per Litre' },
  { item: 'Anti-termite treatment', rate: 10, unit: 'per sq. ft.' },
  { item: 'Brick Coba & parapet wall with plaster', rate: 600, unit: 'per sq. ft.' },
  { item: 'Steel binding', rate: 'Market rate', unit: 'per kg' },
  { item: 'Excavation of basement work', rate: 'Market rate', unit: 'per cu. ft.' },
]

// Company details from PDF
export const companyDetails = {
  name: 'VASUNDHARA CONSTRUCTION & INTERIOR',
  gst: '09ANWPK9076H1Z2',
  phone: '+91 9818866849',
  email: 'info@vasundharaconstruction.in',
  address: 'G-9, Sector 63, Noida, Uttar Pradesh',
  bank: {
    name: 'State Bank of India',
    accountName: 'VASUNDHARA CONSTRUCTION',
    accountNumber: '44404823521',
    ifsc: 'SBIN0005222',
  },
}