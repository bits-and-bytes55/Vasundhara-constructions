import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  calculatePackageCost,
  estimatorCities,
  estimatorFaqs,
  estimatorPackages,
  formatInr,
  extraItemRates,
  companyDetails,
} from '../data/costEstimatorData'

/* ── types ─────────────────────────────────────────────── */
type FormState = {
  cityCode: string
  builtUpArea: string
  floors: string
  carParking: string
  balconyUnits: string
}

const DEFAULT: FormState = {
  cityCode: estimatorCities[0].code,
  builtUpArea: '',
  floors: '1',
  carParking: '1',
  balconyUnits: '1',
}

/* ── package colours (blue theme) ───────────────────── */
const PKG_COLOR = ['#3b82f6', '#0ea5e9', '#f59e0b', '#8b5cf6']
const PKG_LIGHT = ['#eff6ff', '#f0f9ff', '#fffbeb', '#f5f3ff']

/* ── construction stage % weights based on PDF payment stages ── */
const STAGES = [
  { name: 'Advance on quotation submission', pct: 0.10, icon: '📋' },
  { name: 'Earth work excavation', pct: 0.10, icon: '⛏️' },
  { name: 'Footing work', pct: 0.10, icon: '🏗️' },
  { name: 'Column and slabs', pct: 0.20, icon: '🏛️' },
  { name: 'Bricks masonry', pct: 0.05, icon: '🧱' },
  { name: 'Internal plaster', pct: 0.05, icon: '🪣' },
  { name: 'External plaster', pct: 0.05, icon: '🏠' },
  { name: 'Flooring work', pct: 0.10, icon: '⬜' },
  { name: 'Railing, doors, windows & brick coba', pct: 0.05, icon: '🚪' },
  { name: 'Plumbing & sanitary', pct: 0.05, icon: '💧' },
  { name: 'Electrical work', pct: 0.05, icon: '⚡' },
  { name: 'Finishing (putty, primer, paint)', pct: 0.05, icon: '🎨' },
  { name: 'False ceiling & interior fit-out', pct: 0.05, icon: '✨' },
]

/* ── floor % weights based on standard construction ── */
const FLOOR_LABELS: Record<number, string[]> = {
  1: ['Ground Floor'],
  2: ['Ground Floor', 'First Floor'],
  3: ['Ground Floor', 'First Floor', 'Second Floor'],
  4: ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor'],
}
const FLOOR_PCT: Record<number, number[]> = {
  1: [1],
  2: [0.55, 0.45],
  3: [0.40, 0.33, 0.27],
  4: [0.32, 0.27, 0.23, 0.18],
}

/* ── package compare feature rows – updated for 4 packages ── */
const COMPARE_FEATURES = [
  { label: 'Cement Brand', values: ['Shree / Bangur PPC', 'ACC / Ambuja', 'JK Cement / Super', 'JK Cement / Super'] },
  { label: 'TMT Bars', values: ['Shree / Shyam', 'Rathi / Indostar', 'Kamdhenu / Rathi', 'SAIL / Jindal'] },
  { label: 'Door Chowkhat', values: ['Mango Wood / Pine', 'Marandi / Kapoor', 'Teak or Sal Wood', 'Teak or Sal Wood'] },
  { label: 'Doors', values: ['Mango Wood / Pine with Paint', 'Plywood Laminate', 'Century Ply Laminate', 'Century Ply Veneer / Duco'] },
  { label: 'Windows', values: ['Pine Wood with Float Glass', 'Teak or Sal Wood', 'UPVC – Prominent', 'UPVC – Veka'] },
  { label: 'Railing', values: ['Normal Brickwork', 'MS Railing', 'SS / Glass Railing', 'SS / Glass Railing'] },
  { label: 'Flooring', values: ['Vitrified Somany + Kota + CC', 'Vitrified Kajaria + Granite + Kota', 'Tile + Wooden in Drawing & Bedroom', 'Italian Marble + Tiles + Granite'] },
  { label: 'Wall Finish', values: ['Birla Opus or Equivalent', 'Berger / Dulux / Nerolac + Wallpaper', 'Asian Apex Ultima + PVC / Wooden', 'Asian Royale Shine + Featured'] },
  { label: 'Kitchen', values: ['Granite + Sunmica Ply', 'Granite + Laminate + Godrej', 'Italian Marble + Acrylic + Blum', 'Italian Stone + Acrylic + Blum'] },
  { label: 'Sanitaryware', values: ['Lipka / Parryware', 'Hindware / Parryware', 'Hindware / Jaquar', 'Grohe / Roca / Jaquar'] },
  { label: 'Electrical Fittings', values: ['Prins', 'AKG / BEC', 'Supreme', 'Ashirwad'] },
  { label: 'Switches & Wiring', values: ['Finolex', 'Anchor by Penta / Panasonic', 'Polycab / Great White', 'Havells / Schneider'] },
  { label: 'Lights', values: ['Not Included', 'LED Downlights (4 per room)', 'LED Downlights & Panels (4–6 per room)', 'Premium LED as required'] },
  { label: 'False Ceiling', values: ['Normal POP (JK / SuperFine)', 'Gypsum Cove (Sakarni / Birla)', 'Gypsum Cove + LED', 'Wooden / Gyproc / Glass + LED'] },
  { label: 'Structure Warranty', values: ['10 Years', '10 Years', '10 Years', '10 Years'] },
  { label: 'Payment Milestones', values: ['✓ 13 Stages', '✓ 13 Stages', '✓ 13 Stages', '✓ 13 Stages'] },
]

/* ════════════════════════════════════════════════════════ */
export default function CostEstimatorPage() {
  const [form, setForm] = useState<FormState>(DEFAULT)
  const [calculated, setCalculated] = useState(false)
  const [activePkg, setActivePkg] = useState<string>('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const city = estimatorCities.find((c) => c.code === form.cityCode) ?? estimatorCities[0]
  const area = Math.max(Number(form.builtUpArea) || 0, 0)
  const floors = Math.max(Number(form.floors) || 1, 1)
  const parking = Number(form.carParking) || 0
  const balcony = Number(form.balconyUnits) || 0
  const totalArea = area * floors

  const pkgResults = estimatorPackages.map((pkg, i) => ({
    ...pkg,
    color: PKG_COLOR[i % PKG_COLOR.length],
    light: PKG_LIGHT[i % PKG_LIGHT.length],
    idx: i,
    breakdown: calculatePackageCost(pkg.rate, {
      builtUpArea: totalArea,
      carParking: parking,
      balconyUnits: balcony,
      cityFactor: city.factor,
    }),
  }))

  const active = pkgResults.find((p) => p.name === activePkg) ?? pkgResults[1] ?? pkgResults[0]

  const set = (f: keyof FormState, v: string) => setForm((s) => ({ ...s, [f]: v }))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!area) return
    if (!activePkg) setActivePkg(pkgResults[1]?.name ?? pkgResults[0]?.name ?? '')
    setCalculated(true)
  }

  useEffect(() => {
    if (calculated) {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    }
  }, [calculated])

  const floorLabels = FLOOR_LABELS[floors] ?? FLOOR_LABELS[1]
  const floorPcts = FLOOR_PCT[floors] ?? FLOOR_PCT[1]

  return (
    <div className="font-sans bg-gray-100 text-gray-800">

      {/* ── HERO + FORM ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-10">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600 mb-4">
                <span className="w-5 h-px bg-blue-600"></span>
                Vasundhara Construction
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-gray-900 mb-4">
                Estimate your <em className="text-blue-600 not-italic">home construction cost</em> instantly
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl mb-6">
                Get accurate estimates based on actual material specifications, brand choices, 
                and stage-wise payment milestones. Transparent pricing with no hidden charges.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['13 Payment Milestones', '18% GST Extra', '8 Months Timeline', 'Free Site Visit'].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-sm font-bold text-gray-700 shadow-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#3b82f6" />
                      <path d="m7.5 12.5 3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {estimatorPackages.map((pkg, i) => (
                  <div key={pkg.name} className="bg-white border rounded-xl px-4 py-2 shadow-sm" style={{ borderColor: PKG_COLOR[i % PKG_COLOR.length] + '44' }}>
                    <div className="font-bold text-gray-900 text-sm">{pkg.name}</div>
                    <div className="text-xs font-bold" style={{ color: PKG_COLOR[i % PKG_COLOR.length] }}>{formatInr(pkg.rate)}/sqft</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form card */}
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-lg sticky top-24 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-5 text-white">
                <h2 className="font-black text-lg mb-1">Construction Cost Calculator</h2>
                <p className="text-sm text-blue-100">Fill in project details for an instant estimate</p>
                <div className="mt-3 flex gap-2 text-xs">
                  <span className="bg-white/20 px-2 py-1 rounded">GST 18% extra</span>
                  <span className="bg-white/20 px-2 py-1 rounded">8 months timeline</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">📍 Location (NCR Region)</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={form.cityCode}
                    onChange={(e) => set('cityCode', e.target.value)}
                  >
                    {estimatorCities.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">{city.note}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">📐 Super Built-up Area (sqft per floor)</label>
                  <input
                    type="number"
                    min="400"
                    step="10"
                    placeholder="e.g. 1200"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.builtUpArea}
                    onChange={(e) => set('builtUpArea', e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Enter area per floor in square feet</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">🏗️ No. of Floors</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={form.floors}
                      onChange={(e) => set('floors', e.target.value)}
                    >
                      <option value={1}>Ground Floor Only</option>
                      <option value={2}>G+1 (2 Floors)</option>
                      <option value={3}>G+2 (3 Floors)</option>
                      <option value={4}>G+3 (4 Floors)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">🚗 Car Parking</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={form.carParking}
                      onChange={(e) => set('carParking', e.target.value)}
                    >
                      {[0, 1, 2, 3].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Slot' : 'Slots'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">🌿 Balcony & Utility Units</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.balconyUnits}
                    onChange={(e) => set('balconyUnits', e.target.value)}
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Unit' : 'Units'}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">40 sqft per unit @ 60% of package rate (open area rate)</p>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition mt-2">
                  Calculate Cost Instantly →
                </button>
                <p className="text-xs text-gray-400 text-center">Indicative estimate. Final cost depends on soil condition, approvals, plinth, terrace scope & elevation complexity.</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          RESULTS — shown after Calculate
      ══════════════════════════════════════════════════════ */}
      {calculated && area > 0 && (
        <div ref={resultsRef}>

          {/* 1. SUMMARY BAR */}
          <div className="bg-white border-b border-gray-200 py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-2xl p-6 flex flex-wrap justify-between items-center gap-4 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-gray-900">Your Construction Cost Estimate</h2>
                  <p className="text-sm text-gray-500">
                    {city.name} &nbsp;·&nbsp; {totalArea.toLocaleString('en-IN')} sqft total
                    &nbsp;·&nbsp; {floors === 1 ? 'Ground only' : floors === 2 ? 'G+1' : floors === 3 ? 'G+2' : 'G+3'}
                    &nbsp;·&nbsp; {parking} parking slot(s) &nbsp;·&nbsp; {balcony} balcony/utility unit(s)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">*GST @ 18% extra as applicable</p>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-600">
                    {formatInr(pkgResults[0].breakdown.total)} – {formatInr(pkgResults[pkgResults.length - 1].breakdown.total)}
                  </div>
                  <div className="text-xs text-gray-400">Budget range across all packages (excl. GST)</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. PACKAGE COST CARDS */}
          <div className="bg-gray-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Package-wise Estimate</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Choose your construction package</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-2">Tap a package to see detailed stage-wise and floor-wise cost breakdown below</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {pkgResults.map((pkg) => (
                  <button
                    key={pkg.name}
                    onClick={() => setActivePkg(pkg.name)}
                    className={`px-5 py-2 rounded-full text-sm font-bold border transition ${pkg.name === active.name ? 'text-white border-transparent' : 'text-gray-600 border-gray-300 hover:border-blue-500 hover:text-blue-600'}`}
                    style={pkg.name === active.name ? { background: pkg.color } : {}}
                  >
                    {pkg.name} · {formatInr(pkg.breakdown.adjustedRate)}/sqft
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pkgResults.map((pkg, i) => (
                  <div
                    key={pkg.name}
                    className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl ${pkg.name === active.name ? 'shadow-lg' : ''}`}
                    style={{
                      borderColor: pkg.name === active.name ? pkg.color : '#e5e7eb',
                      background: pkg.name === active.name ? pkg.light : '#fff',
                    }}
                    onClick={() => setActivePkg(pkg.name)}
                  >
                    {i === 1 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[0.6rem] font-black px-3 py-0.5 rounded-full">
                        Most Popular
                      </div>
                    )}
                    {i === 2 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[0.6rem] font-black px-3 py-0.5 rounded-full">
                        Most Popular
                      </div>
                    )}
                    <div className={i === 1 || i === 2 ? 'mt-3' : ''}>
                      <div className="text-xs font-black uppercase tracking-wider" style={{ color: pkg.color }}>{pkg.tag ?? pkg.name}</div>
                      <h3 className="text-xl font-black text-gray-900 mt-1">{pkg.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 mb-4">{pkg.summary}</p>
                      <div className="text-3xl font-black" style={{ color: pkg.color }}>{formatInr(pkg.breakdown.total)}</div>
                      <div className="text-sm text-gray-500 mb-3">Effective rate: {formatInr(pkg.breakdown.adjustedRate)}/sqft</div>
                      <div className="border-t border-gray-200 pt-3 space-y-1 text-sm">
                        <div className="flex justify-between"><span>Built-up area</span><span>{formatInr(pkg.breakdown.builtUpCost)}</span></div>
                        <div className="flex justify-between"><span>Car parking</span><span>{formatInr(pkg.breakdown.parkingCost)}</span></div>
                        <div className="flex justify-between"><span>Balcony & utility</span><span>{formatInr(pkg.breakdown.balconyCost)}</span></div>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. STAGE-WISE BREAKUP (based on PDF payment milestones) */}
          <div className="bg-white py-12 border-t border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Payment Milestones</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">13-Stage Payment Breakdown</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-2">
                  Based on the <strong>{active.name}</strong> at {formatInr(active.breakdown.total)} total. 
                  Running payments made upon measurement verification.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                  <h3 className="font-black text-gray-900">{active.name} — Stage-wise Payment Milestones</h3>
                  <p className="text-sm text-gray-500">Total: <strong className="text-blue-600">{formatInr(active.breakdown.total)}</strong> <span className="text-xs">+ 18% GST</span></p>
                </div>
                <div className="divide-y divide-gray-100">
                  {STAGES.map((stage) => {
                    const amt = Math.round(active.breakdown.total * stage.pct)
                    return (
                      <div key={stage.name} className="grid grid-cols-[3rem,1fr,8rem,5rem] gap-4 items-center px-6 py-4 hover:bg-gray-50">
                        <div className="text-xl text-center">{stage.icon}</div>
                        <div>
                          <div className="font-bold text-gray-800">{stage.name}</div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${stage.pct * 100}%`, background: active.color }} />
                          </div>
                        </div>
                        <div className="text-right font-bold" style={{ color: active.color }}>{formatInr(amt)}</div>
                        <div className="text-right text-sm text-gray-400">{(stage.pct * 100).toFixed(0)}%</div>
                      </div>
                    )
                  })}
                </div>
                <div className="bg-blue-50 px-6 py-3 text-sm text-blue-700 border-t border-blue-100">
                  <strong>Note:</strong> Payments due within 3 days of bill submission. Delay extends timeline with extra cost.
                </div>
              </div>
            </div>
          </div>

          {/* 4. FLOOR-WISE COST BREAKUP */}
          {floors > 1 && (
            <div className="bg-gray-100 py-12">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                  <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Floor-wise Breakdown</span>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Floor wise cost breakup for {floors === 2 ? 'G+1' : floors === 3 ? 'G+2' : 'G+3'}</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto mt-2">
                    Cost distribution across {floors} floors for the <strong>{active.name}</strong>.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                    <h3 className="font-black text-gray-900">{active.name} — Floor-wise Breakup</h3>
                    <p className="text-sm text-gray-500">{floors} Floors · {totalArea.toLocaleString('en-IN')} sqft total · {area.toLocaleString('en-IN')} sqft per floor</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                    {floorLabels.map((label, fi) => {
                      const pct = floorPcts[fi]
                      const amt = Math.round(active.breakdown.total * pct)
                      const fArea = area
                      return (
                        <div
                          key={label}
                          className="border rounded-xl p-5 transition hover:shadow-md"
                          style={{ borderColor: active.color + '44', background: active.light }}
                        >
                          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</div>
                          <div className="text-2xl font-black" style={{ color: active.color }}>{formatInr(amt)}</div>
                          <div className="text-sm text-gray-500 mt-1">{fArea.toLocaleString('en-IN')} sqft · {(pct * 100).toFixed(0)}% of total</div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, background: active.color }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. EXTRA ITEMS SECTION (from PDF) */}
          <div className="bg-white py-12 border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Additional Works</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Extra Item Rates</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-2">Optional items not included in standard packages</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-bold text-gray-700">Item</th>
                      <th className="text-right py-4 px-6 font-bold text-gray-700">Rate</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {extraItemRates.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-3 px-6 text-gray-700">{item.item}</td>
                        <td className="py-3 px-6 text-right font-semibold text-blue-600">
                          {typeof item.rate === 'number' ? formatInr(item.rate) : item.rate}
                        </td>
                        <td className="py-3 px-6 text-gray-500">{item.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-blue-50 px-6 py-3 text-sm text-blue-700">
                  <strong>Note:</strong> Extended ramp, trenches, drain & outside area measured at open area rate (₹600/sqft).
                  Nails & binding wire provided by contractor.
                </div>
              </div>
            </div>
          </div>

          {/* 6. COMPARE PACKAGES TABLE */}
          <div className="bg-gray-100 py-12 border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Compare Packages</span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Material & Specification Comparison</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-2">Feature-wise comparison across all packages based on actual brand specifications from Vasundhara Construction</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl overflow-x-auto shadow-sm">
                <table className="w-full min-w-[680px]">
                  <colgroup>
                    <col style={{ width: '200px' }} />
                    {pkgResults.map(() => <col key={Math.random()} style={{ width: 'auto' }} />)}
                  </colgroup>
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-5 text-xs font-bold uppercase tracking-wider text-gray-500">Specification</th>
                      {pkgResults.map((pkg) => (
                        <th key={pkg.name} className="text-center py-4 px-4" style={pkg.name === active.name ? { background: pkg.light } : {}}>
                          {pkg.name === active.name && (
                            <div className="inline-block bg-blue-600 text-white text-[0.6rem] font-black px-2 py-0.5 rounded-full mb-2">Selected</div>
                          )}
                          <div className="font-black text-gray-900 text-base">{pkg.name}</div>
                          <div className="text-sm font-bold" style={{ color: pkg.color }}>{formatInr(pkg.breakdown.total)}</div>
                          <div className="text-xs text-gray-500">{formatInr(pkg.rate)}/sqft</div>
                          <Link
                            to={`/packages/${pkg.slug ?? ''}`}
                            className="inline-block mt-2 px-3 py-1 rounded-md text-xs font-bold text-white transition hover:opacity-90"
                            style={{ background: pkg.color }}
                          >
                            {pkg.name === active.name ? '✓ Selected' : 'Choose'}
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_FEATURES.map((row, ri) => (
                      <tr key={ri} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-5 font-bold text-gray-700">{row.label}</td>
                        {pkgResults.map((pkg, pi) => {
                          const val = row.values[pi] ?? '—'
                          const isCheck = val.startsWith('✓')
                          return (
                            <td key={pkg.name} className="py-3 px-4 text-center" style={pkg.name === active.name ? { background: pkg.light } : {}}>
                              {isCheck ? (
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full" style={{ background: pkg.color }}>
                                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                    <path d="m2 6 3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </span>
                              ) : (
                                <span className="text-sm font-medium" style={{ color: pkg.name === active.name ? pkg.color : '#555' }}>
                                  {val}
                                </span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                    <tr className="bg-blue-50 border-t-2 border-gray-200">
                      <td className="py-4 px-5 font-bold text-gray-700 text-sm">Get Started</td>
                      {pkgResults.map((pkg) => (
                        <td key={pkg.name} className="py-4 px-4 text-center">
                          <Link
                            to={`/packages/${pkg.slug ?? ''}`}
                            className="inline-block px-4 py-1.5 rounded-md text-xs font-bold border transition"
                            style={{
                              background: pkg.name === active.name ? pkg.color : 'transparent',
                              color: pkg.name === active.name ? '#fff' : pkg.color,
                              borderColor: pkg.color,
                            }}
                          >
                            {pkg.name === active.name ? '✓ Current' : 'Select'}
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 7. COMPANY INFO & BANK DETAILS */}
          <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-4">{companyDetails.name}</h3>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-center gap-2"><span className="font-semibold">GST:</span> {companyDetails.gst}</p>
                      <p className="flex items-center gap-2"><span className="font-semibold">Phone:</span> {companyDetails.phone}</p>
                      <p className="flex items-center gap-2"><span className="font-semibold">Email:</span> {companyDetails.email}</p>
                      <p className="flex items-center gap-2"><span className="font-semibold">Address:</span> {companyDetails.address}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-4">Bank Details</h3>
                    <div className="space-y-2 text-gray-600">
                      <p><span className="font-semibold">Bank:</span> {companyDetails.bank.name}</p>
                      <p><span className="font-semibold">Account Name:</span> {companyDetails.bank.accountName}</p>
                      <p><span className="font-semibold">Account Number:</span> {companyDetails.bank.accountNumber}</p>
                      <p><span className="font-semibold">IFSC Code:</span> {companyDetails.bank.ifsc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. FAQ + BOTTOM CTA */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">FAQs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">Everything you need to know about construction with Vasundhara Construction</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {estimatorFaqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-gray-900 hover:bg-gray-50"
                >
                  {faq.question}
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-sm transition ${openFaq === i ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-400'}`}>
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white">Ready to build your dream home?</h3>
              <p className="text-blue-100 mt-1">Get a detailed site-specific quotation from our experts.</p>
              <p className="text-blue-200 text-sm mt-2">📞 {companyDetails.phone} | ✉️ {companyDetails.email}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`tel:${companyDetails.phone}`} className="bg-white text-blue-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-xl text-center transition">
                Call Now
              </a>
              <Link to="/contact" className="border border-white/30 hover:border-white/50 text-white font-bold py-3 px-8 rounded-xl text-center transition">
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}