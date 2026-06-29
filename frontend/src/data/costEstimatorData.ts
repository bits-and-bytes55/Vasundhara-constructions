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

// ─── CITIES ───────────────────────────────────────────────
export const estimatorCities: EstimatorCity[] = [
  { name: 'Delhi NCR', code: 'NOI_UP_IN', factor: 1.0, note: 'Base location - Noida, Greater Noida, Ghaziabad' },
  { name: 'Noida', code: 'NOI_UP_IN', factor: 1.0, note: 'Primary service area' },
  { name: 'Greater Noida', code: 'GN_UP_IN', factor: 0.98, note: 'Slightly competitive rates' },
  { name: 'Ghaziabad', code: 'GZB_UP_IN', factor: 0.97, note: 'Adjacent NCR region' },
  { name: 'Faridabad', code: 'FAR_HR_IN', factor: 0.99, note: 'Delhi NCR region' },
  { name: 'Gurugram', code: 'GUR_HR_IN', factor: 1.08, note: 'Premium NCR market' },
]

// ─── PACKAGES (from quotation) ────────────────────────────
export const estimatorPackages: EstimatorPackage[] = [
  {
    slug: 'basic-low',
    name: 'Basic – Low',
    rate: 1550,
    tag: 'Budget Friendly',
    summary: 'Value-focused package with Shree cement, Shyam TMT, and essential finishes. Ideal for cost-conscious builds.',
    accent: '#3b82f6',
    surface: '#eff6ff',
    components: [
      {
        name: 'Structure & Civil',
        blocks: [
          'Cement – Shree / Bangur PPC',
          'TMT Bars – Shree / Shyam',
          'Door Chowkhat – Mango Wood / Pine Wood',
          'Doors – Mango Wood / Pine Wood with Paint',
          'Windows – Pine Wood Frame with Float Glass',
          'Railing – Normal Brickwork on Parapet',
          'Flooring – Vitrified Tiles (Somany) all floors, Kota Stone in Stairs/Concrete Plaster, CC Flooring',
          'PCC (1:4:8) for foundation',
          'RCC M20 Grade with rotary mixer & vibrator',
          '12mm shuttering plywood for slab casting',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Polished Granite Slab',
          'BWR Plywood with Sunmica Finish',
          'Single bowl stainless sink',
          'Prince plumbing fittings',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Sanitary – Lipka / Parryware',
          'Prince plumbing pipes & fittings',
          'Waterproofing of toilets/kitchen (Dr fixit)',
          'Ceramic wall dado',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'Chowkhat – Mango Wood / Pine Wood',
          'Doors – Mango Wood / Pine Wood with Paint',
          'Windows – Pine Wood Frame with Float Glass',
        ],
      },
      {
        name: 'Flooring',
        blocks: [
          'Vitrified Tiles – Somany (all floors)',
          'Kota Stone in Stairs/Concrete Plaster',
          'CC Flooring',
        ],
      },
      {
        name: 'Electrical',
        blocks: [
          'Electrical Fittings/Conduit – Prins',
          'Switch Board & Switches – Finolex',
          'Wiring – Finolex',
          'Standard wiring',
        ],
      },
      {
        name: 'Finishing',
        blocks: [
          'Normal POP on Ceiling (JK / SuperFine Brand)',
          'Birla Opus or Equivalent Paint Finish',
          'Internal plaster mix (1:4)',
          'External plaster mix (1:4)',
        ],
      },
    ],
  },
  {
    slug: 'basic-high',
    name: 'Basic – High',
    rate: 1750,
    tag: 'Value Plus',
    summary: 'Upgraded materials with ACC cement, Rathi TMT, gypsum cove ceiling, and better sanitaryware.',
    accent: '#0ea5e9',
    surface: '#f0f9ff',
    components: [
      {
        name: 'Structure & Civil',
        blocks: [
          'Cement – ACC / Ambuja',
          'TMT Bars – Rathi / Indostar',
          'Door Chowkhat – Marandi / Kapoor',
          'Doors – Plywood Doors with Laminate on Both Sides',
          'Windows – Teak or Sal Wood',
          'Railing – MS Railing',
          'Flooring – Vitrified Tiles (Kajaria) all floors, Granite in Stairs, Kota Stone in Parking',
          'PCC (1:4:8) for foundation',
          'RCC M20 Grade with vibrator',
          '12mm shuttering plywood',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Polished Granite Slab',
          'Action Tesa with Advance Laminate / Merino Sheet',
          'Ozone / Godrej accessories',
          'Supreme plumbing fittings',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Sanitary – Hindware / Parryware',
          'AKG / BEC plumbing pipes & fittings',
          'Dr fixit waterproofing',
          'Ceramic dado up to 7 feet',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'Chowkhat – Marandi / Kapoor',
          'Plywood Doors with Laminate on Both Sides',
          'Windows – Teak or Sal Wood',
        ],
      },
      {
        name: 'Flooring',
        blocks: [
          'Vitrified Tiles – Kajaria (all floors)',
          'Granite in Stairs',
          'Kota Stone in Parking',
        ],
      },
      {
        name: 'Electrical',
        blocks: [
          'Electrical Fittings – AKG / BEC',
          'Switches – Anchor by Penta / Anchor by Panasonic',
          'Wires – Anchor/Kaliga',
          'LED Downlight (Crompton / Wipro) – 4 nos per Bedroom & Drawing Room',
        ],
      },
      {
        name: 'Finishing',
        blocks: [
          'Gypsum Cove Ceiling (Sakarni POP / Birla White)',
          'Berger / Dulux / Nerolac Paint with Wallpaper / 3D Paint as required',
          'Enhanced plaster mix',
        ],
      },
    ],
  },
  {
    slug: 'standard',
    name: 'Standard',
    rate: 2150,
    tag: 'Most Popular',
    summary: 'Balanced upgrade with JK cement, wooden flooring in drawing & bedroom, Italian marble kitchen slab, and UPVC windows.',
    accent: '#f59e0b',
    surface: '#fffbeb',
    components: [
      {
        name: 'Structure & Civil',
        blocks: [
          'Cement – JK Cement / Super',
          'TMT Bars – Kamdhenu / Rathi',
          'Door Chowkhat – Teak or Sal Wood',
          'Doors – Century Plyboard with Laminate on Both Sides',
          'Windows – UPVC (Prominent)',
          'Railing – SS Railing / Glass Railing',
          'Flooring – Tile + Wooden Flooring in Drawing & Bedroom, Granite in Stairs, Kota Stone in Parking',
          'PCC (1:4:8) for foundation',
          'RCC M20 Grade with full vibration',
          'Premium shuttering work',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Polished Italian Marble Slab',
          'Century Ply HDHMR Board with Royale Touch Acrylic Sheet',
          'Blum / Hafele accessories',
          'Designer TV Unit with Storage',
          'Supreme plumbing fittings',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Sanitary – Hindware / Jaquar',
          'Supreme CPVC pipes & fittings',
          'Dr fixit waterproofing',
          'Ceramic dado up to 7 feet',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'Chowkhat – Teak or Sal Wood',
          'Century Plyboard with Laminate on Both Sides',
          'Windows – UPVC (Prominent)',
        ],
      },
      {
        name: 'Flooring',
        blocks: [
          'Tile + Wooden Flooring in Drawing & Bedroom',
          'Granite in Stairs',
          'Kota Stone in Parking',
        ],
      },
      {
        name: 'Electrical',
        blocks: [
          'Electrical Fittings – Supreme',
          'Switches – Polycab / Great White',
          'Wires – Polycab',
          'LED Downlights & Panel Lights (Havells / Orient / Philips) – 4–6 nos per room',
        ],
      },
      {
        name: 'Finishing',
        blocks: [
          'Gypsum Cove Ceiling with LED Lighting (Birla White / Sakarni Gypsum Plaster)',
          'Asian Apex Ultima Paint with PVC Moulding / Wooden Panelling / Cladding / Murals',
          'Superior plaster finish',
        ],
      },
    ],
  },
  {
    slug: 'premium',
    name: 'Premium',
    rate: 2550,
    tag: 'Luxury Choice',
    summary: 'Premium-grade construction with Italian marble flooring, Duco polish doors, Grohe sanitaryware, and designer interiors.',
    accent: '#8b5cf6',
    surface: '#f5f3ff',
    components: [
      {
        name: 'Structure & Civil',
        blocks: [
          'Cement – JK Cement / Super',
          'TMT Bars – SAIL / Jindal',
          'Door Chowkhat – Teak or Sal Wood',
          'Doors – Century Plyboard with Veneer / Duco Polish Finish',
          'Windows – UPVC (Veka)',
          'Railing – SS Railing / Glass Railing',
          'Flooring – Italian Flooring in Drawing & Dining, Tiles in Rooms & Bathroom, Granite in Stairs, Kota Stone in Parking',
          'PCC (1:4:8) for foundation',
          'RCC M20 Grade with full vibration',
          'Premium shuttering with smooth finish',
        ],
      },
      {
        name: 'Kitchen',
        blocks: [
          'Polished Italian Stone',
          'Century Ply HDHMR Board with Acrylic Sheet',
          'Blum / Hafele accessories',
          'Designer TV Unit with Storage',
          'Ashirwad plumbing fittings',
        ],
      },
      {
        name: 'Bathroom',
        blocks: [
          'Sanitary – Grohe / Roca / Jaquar',
          'Ashirwad pipes & fittings',
          'Premium waterproofing',
          'Designer ceramic dado',
        ],
      },
      {
        name: 'Doors & Windows',
        blocks: [
          'Chowkhat – Teak or Sal Wood',
          'Century Plyboard with Veneer / Duco Polish Finish',
          'Windows – UPVC (Veka)',
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
          'Electrical Fittings – Ashirwad',
          'Switches – Havells / Schneider',
          'Wires – Havells',
          'LED Downlights & Panel Lights (Havells / Orient / Philips) as required',
        ],
      },
      {
        name: 'Finishing',
        blocks: [
          'Wooden Ceiling / Gyproc / USG Boral / Glass / Metal Ceiling with LED Lighting',
          'Asian Royale Shine Paint with PVC Moulding / Wooden Panelling / Featured Wall as required',
          'Premium wall finishes',
          'Decorative moldings and cornices',
        ],
      },
    ],
  },
]

// ─── FAQ (from quotation + common questions) ──────────────
export const estimatorFaqs = [
  {
    question: 'What is included in the construction package?',
    answer: 'Our packages include complete civil work – PCC, DPC, RCC M20 grade columns/beams/slabs, brick masonry, shuttering, reinforcement, plaster, flooring, plumbing, electrical, waterproofing, and interiors as per the package specifications.',
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
    answer: 'Basic-Low is value-focused with essential finishes, Basic-High adds better brands and gypsum ceiling, Standard offers wooden flooring, Italian marble kitchen slab, and UPVC windows, while Premium delivers Italian marble flooring, Duco polish doors, Grohe sanitaryware, and designer interiors.',
  },
  {
    question: 'What is the construction timeline?',
    answer: 'The complete project timeline for a 3-floor building structure is 8 months from the date of work order issuance, subject to timely payments and material approvals.',
  },
  {
    question: 'How are payments structured?',
    answer: 'Payments are milestone-based – 10% advance, 10% on earthwork, 10% on footing, 20% on columns & slabs, and remaining on plaster, flooring, doors, plumbing, electrical, and finishing works as per the stage-wise breakdown.',
  },
  {
    question: 'Do you provide drawings?',
    answer: 'Architectural & structural drawings are available at ₹60 per sq ft. The contractor must execute work as per drawings without deviation unless advised in writing.',
  },
  {
    question: 'What about water and electricity?',
    answer: 'The client will arrange water and electricity free of cost at the workplace wherever required.',
  },
  {
    question: 'What is the warranty on construction?',
    answer: 'Structure warranty – 10 years, Waterproofing – 5 years, Service support – 1 year after handover, Sanitary & electrical fixtures – 2–5 years as per brand warranty.',
  },
]

// ─── PAYMENT STAGES (from quotation) ──────────────────────
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

// ─── FLOOR PRESETS (keep as is) ────────────────────────────
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

// ─── EXTRA ITEM RATES (from quotation) ─────────────────────
export const extraItemRates = [
  { item: 'DPC at Plinth Level', rate: 'As per slab area', unit: 'sq. ft.' },
  { item: 'Waterproofing', rate: 40, unit: 'per sq. ft.' },
  { item: 'Architectural & Structural Drawing', rate: 60, unit: 'per sq. ft.' },
  { item: 'Set Back Area Development', rate: 600, unit: 'per sq. ft.' },
  { item: 'Underground Water Tank', rate: 35, unit: 'per Litre' },
  { item: 'Overhead Tank', rate: 25, unit: 'per Litre' },
  { item: 'Anti-Termite Treatment', rate: 10, unit: 'per sq. ft.' },
  { item: 'Brick Coba & Parapet Wall', rate: 600, unit: 'per sq. ft.' },
  { item: 'Steel Binding', rate: 'Market rate', unit: 'per kg' },
  { item: 'Excavation of Basement Work', rate: 'Market rate', unit: 'per cu. ft.' },
]

// ─── COMPANY DETAILS (from quotation) ──────────────────────
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

// ─── COST CALCULATION HELPERS (unchanged) ──────────────────
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