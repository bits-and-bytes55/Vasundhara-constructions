import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  calculatePackageCost,
  estimatorCities,
  estimatorFaqs,
  estimatorPackages,
  formatInr,
} from '../data/costEstimatorData'

/* ── types ─────────────────────────────────────────────── */
type FormState = {
  cityCode: string
  builtUpArea: string
  floors: string
  carParking: string
  balconyUnits: string
  propertyType: 'home' | 'luxury'
}

const DEFAULT: FormState = {
  cityCode: estimatorCities[0].code,
  builtUpArea: '',
  floors: '1',
  carParking: '1',
  balconyUnits: '1',
  propertyType: 'home',
}

/* ── package colours ───────────────────────────────────── */
const PKG_COLOR  = ['#e8501e', '#2563eb', '#16a34a', '#7c3aed']
const PKG_LIGHT  = ['#fff5f2', '#eff6ff', '#f0fdf4', '#f5f3ff']

/* ── construction stage % weights ─────────────────────── */
const STAGES = [
  { name: 'Foundation & Excavation', pct: 0.14, icon: '⛏️' },
  { name: 'Plinth & Beam',           pct: 0.08, icon: '🔲' },
  { name: 'Superstructure (Columns & Slabs)', pct: 0.22, icon: '🏗️' },
  { name: 'Brickwork & Masonry',     pct: 0.10, icon: '🧱' },
  { name: 'Plastering & Waterproofing', pct: 0.08, icon: '🪣' },
  { name: 'Flooring & Tiling',        pct: 0.10, icon: '⬜' },
  { name: 'Doors, Windows & Grills',  pct: 0.07, icon: '🚪' },
  { name: 'Electrical & Plumbing',    pct: 0.10, icon: '⚡' },
  { name: 'Painting & Finishing',     pct: 0.07, icon: '🎨' },
  { name: 'Miscellaneous & Overhead', pct: 0.04, icon: '📦' },
]

/* ── floor % weights ───────────────────────────────────── */
const FLOOR_LABELS: Record<number, string[]> = {
  1: ['Ground Floor'],
  2: ['Ground Floor', 'First Floor (G+1)'],
  3: ['Ground Floor', 'First Floor (G+1)', 'Second Floor (G+2)'],
  4: ['Ground Floor', 'First Floor (G+1)', 'Second Floor (G+2)', 'Third Floor (G+3)'],
}
const FLOOR_PCT: Record<number, number[]> = {
  1: [1],
  2: [0.55, 0.45],
  3: [0.40, 0.33, 0.27],
  4: [0.32, 0.27, 0.23, 0.18],
}

/* ── package compare feature rows ─────────────────────── */
const COMPARE_FEATURES = [
  { label: 'Steel & Cement Brand', values: ['Standard ISI', 'Superior (Jindal / Ultratech)', 'Superior (Jindal / Ultratech)', 'Premium Brand'] },
  { label: 'Floor Tiles Budget', values: ['Up to ₹50/sqft', 'Up to ₹100/sqft', 'Up to ₹140/sqft', 'Up to ₹160/sqft'] },
  { label: 'Door & Window Finish', values: ['Standard Flush', 'Teak Wood Frame', 'Designer Teak', 'Designer Teak + Hardware'] },
  { label: 'Paint Finish', values: ['Tractor Emulsion', 'Tractor Shyne', 'Apcolite Premium', 'Apex Ultima'] },
  { label: 'Kitchen Fittings', values: ['Essential', 'Stylish', 'Quality Brand', 'Luxury Brand'] },
  { label: 'Bathroom Fittings', values: ['Essential', 'Stylish', 'Quality Brand', 'Luxury Brand'] },
  { label: 'Electrical Wiring', values: ['Standard', 'Polycab / Havells', 'Polycab / Havells', 'Polycab + Modular'] },
  { label: 'Structure Warranty', values: ['10 Years', '10 Years', '10 Years', '10 Years'] },
  { label: 'Site Engineer', values: ['✓ Dedicated', '✓ Dedicated', '✓ Dedicated', '✓ Dedicated'] },
  { label: 'App Tracking', values: ['✓ Live', '✓ Live', '✓ Live', '✓ Live'] },
  { label: 'Quality Checks', values: ['500+', '500+', '500+', '500+'] },
  { label: 'Escrow Payment', values: ['✓ Protected', '✓ Protected', '✓ Protected', '✓ Protected'] },
]

/* ════════════════════════════════════════════════════════ */
export default function CostEstimatorPage() {
  const [form, setForm]             = useState<FormState>(DEFAULT)
  const [calculated, setCalculated] = useState(false)
  const [activePkg, setActivePkg]   = useState<string>('')
  const [openFaq, setOpenFaq]       = useState<number | null>(null)
  const resultsRef                  = useRef<HTMLDivElement>(null)

  const city       = estimatorCities.find((c) => c.code === form.cityCode) ?? estimatorCities[0]
  const area       = Math.max(Number(form.builtUpArea) || 0, 0)
  const floors     = Math.max(Number(form.floors) || 1, 1)
  const parking    = Number(form.carParking)    || 0
  const balcony    = Number(form.balconyUnits)  || 0
  const totalArea  = area * floors

  const pkgResults = estimatorPackages.map((pkg, i) => ({
    ...pkg,
    color: PKG_COLOR[i % PKG_COLOR.length],
    light: PKG_LIGHT[i % PKG_LIGHT.length],
    idx  : i,
    breakdown: calculatePackageCost(pkg.rate, {
      builtUpArea : totalArea,
      carParking  : parking,
      balconyUnits: balcony,
      cityFactor  : city.factor,
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
  const floorPcts   = FLOOR_PCT[floors]    ?? FLOOR_PCT[1]

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 17px; scroll-behavior: smooth; }
        body { font-family: 'Nunito Sans','Segoe UI',sans-serif; background: #f2f2f2; color: #2d2d2d; line-height: 1.65; }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }

        /* ── TOPBAR ── */
        .nav { position: sticky; top: 0; z-index: 200; background: #fff; border-bottom: 1px solid #e5e5e5; box-shadow: 0 1px 10px rgba(0,0,0,.06); }
        .nav-in { max-width: 100%; padding: 0 clamp(1.5rem,4vw,3rem); display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 1rem; }
        .logo { font-size: 1.45rem; font-weight: 900; color: #1c1c1e; letter-spacing: -.025em; flex-shrink: 0; }
        .logo em { color: #e8501e; font-style: normal; }
        .nav-links { display: flex; gap: .15rem; }
        .nav-links a { font-size: .95rem; font-weight: 700; color: #555; padding: .42rem .9rem; border-radius: 8px; transition: all .18s; }
        .nav-links a:hover { color: #e8501e; background: #fff5f2; }
        @media(max-width:860px){ .nav-links { display: none; } }
        .nav-cta { display: inline-flex; align-items: center; padding: .65rem 1.5rem; font-size: .95rem; font-weight: 800; border-radius: 10px; background: #e8501e; color: #fff; transition: background .18s; flex-shrink: 0; }
        .nav-cta:hover { background: #c93e0d; }

        /* ── HERO ── */
        .hero { background: #fff; border-bottom: 1px solid #e5e5e5; padding: clamp(2.5rem,5vw,4rem) 0 0; }
        .hero-in { width: 100%; padding: 0 clamp(1.5rem,4vw,3rem); display: grid; grid-template-columns: 1fr 480px; gap: 4rem; align-items: start; }
        @media(max-width:1060px){ .hero-in { grid-template-columns: 1fr; gap: 2.5rem; } }

        /* copy */
        .hero-copy { padding-bottom: clamp(2rem,4vw,3.5rem); }
        .kicker { display: inline-flex; align-items: center; gap: .5rem; font-size: .82rem; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: #e8501e; margin-bottom: 1.3rem; }
        .kicker::before { content: ''; width: 1.1rem; height: 2px; background: #e8501e; }
        .hero-copy h1 { font-size: clamp(2rem,4.5vw,3.2rem); font-weight: 900; color: #1c1c1e; line-height: 1.1; letter-spacing: -.03em; margin-bottom: 1.1rem; }
        .hero-copy h1 em { color: #e8501e; font-style: normal; }
        .hero-copy > p { font-size: 1.08rem; color: #555; line-height: 1.72; margin-bottom: 1.75rem; max-width: 540px; }
        .trust-pills { display: flex; flex-wrap: wrap; gap: .65rem; margin-bottom: 2.2rem; }
        .trust-pill { display: flex; align-items: center; gap: .45rem; font-size: .9rem; font-weight: 700; color: #2d2d2d; background: #f5f5f5; border: 1.5px solid #e0e0e0; padding: .42rem 1.05rem; border-radius: 30px; }
        .trust-pill svg { width: 16px; height: 16px; flex-shrink: 0; }
        .rate-cards { display: flex; flex-wrap: wrap; gap: .8rem; }
        .rate-card { background: #fff; border: 1.5px solid #e5e5e5; border-radius: 12px; padding: .85rem 1.2rem; }
        .rate-card strong { display: block; font-size: .97rem; font-weight: 900; color: #1c1c1e; }
        .rate-card span { font-size: .84rem; font-weight: 700; }

        /* FORM CARD */
        .form-card { background: #fff; border: 1.5px solid #e5e5e5; border-radius: 20px; box-shadow: 0 6px 30px rgba(0,0,0,.09); overflow: hidden; position: sticky; top: 88px; }
        .form-head { background: linear-gradient(135deg,#1c1c1e 0%,#2c2c2e 100%); padding: 1.5rem 1.75rem; }
        .form-head h2 { font-size: 1.15rem; font-weight: 900; color: #fff; margin-bottom: .25rem; }
        .form-head p { font-size: .88rem; color: rgba(255,255,255,.5); }
        .type-toggle { display: flex; background: rgba(255,255,255,.08); border-radius: 9px; padding: .22rem; margin-top: 1rem; }
        .type-btn { flex: 1; padding: .52rem .7rem; border-radius: 7px; font-size: .88rem; font-weight: 800; color: rgba(255,255,255,.5); transition: all .18s; text-align: center; cursor: pointer; }
        .type-btn.act { background: #e8501e; color: #fff; }
        .form-body { padding: 1.5rem 1.75rem; display: flex; flex-direction: column; gap: 1.1rem; }
        .field label { display: block; font-size: .82rem; font-weight: 800; color: #444; margin-bottom: .38rem; letter-spacing: .03em; }
        .field input, .field select { width: 100%; padding: .78rem 1.1rem; border: 1.5px solid #e0e0e0; border-radius: 10px; font-size: 1rem; font-weight: 600; color: #1c1c1e; background: #fff; outline: none; transition: border-color .18s, box-shadow .18s; font-family: inherit; appearance: auto; }
        .field input:focus, .field select:focus { border-color: #e8501e; box-shadow: 0 0 0 3px rgba(232,80,30,.1); }
        .field small { display: block; font-size: .75rem; color: #aaa; margin-top: .3rem; line-height: 1.5; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .calc-btn { width: 100%; padding: 1rem; background: #e8501e; color: #fff; font-size: 1.08rem; font-weight: 900; border-radius: 11px; transition: background .18s; letter-spacing: .01em; }
        .calc-btn:hover { background: #c93e0d; }
        .form-note { font-size: .76rem; color: #bbb; line-height: 1.55; text-align: center; }

        /* ── SECTION WRAPPER — FULL WIDTH ── */
        .sec { width: 100%; padding: clamp(2rem,5vw,3.5rem) clamp(1.5rem,4vw,3rem); }
        .sec-head { margin-bottom: 2rem; }
        .sec-ey { font-size: .78rem; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: #e8501e; display: block; margin-bottom: .5rem; }
        .sec-head h2 { font-size: clamp(1.55rem,3vw,2.2rem); font-weight: 900; color: #1c1c1e; letter-spacing: -.02em; }
        .sec-head p { font-size: 1rem; color: #777; margin-top: .5rem; max-width: 640px; }

        /* ── RESULT SUMMARY BAR ── */
        .summary-bar { background: #fff; border: 1.5px solid #e5e5e5; border-radius: 18px; padding: 1.6rem 2.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2rem; box-shadow: 0 2px 16px rgba(0,0,0,.07); }
        .sb-left h2 { font-size: 1.2rem; font-weight: 900; color: #1c1c1e; margin-bottom: .25rem; }
        .sb-left p { font-size: .9rem; color: #888; }
        .sb-range strong { display: block; font-size: 1.7rem; font-weight: 900; color: #e8501e; line-height: 1; }
        .sb-range span { font-size: .82rem; color: #aaa; }

        /* ── PACKAGE COST CARDS ── */
        .pkg-tabs { display: flex; gap: .55rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .pkg-tab { padding: .6rem 1.35rem; border-radius: 30px; font-size: .95rem; font-weight: 800; border: 1.5px solid #e0e0e0; color: #666; transition: all .18s; cursor: pointer; }
        .pkg-tab.act { color: #fff; border-color: transparent; }
        .pkg-tab:not(.act):hover { border-color: #e8501e; color: #e8501e; }

        .pkg-cards { display: grid; grid-template-columns: repeat(auto-fill,minmax(240px,1fr)); gap: 1.4rem; margin-bottom: .5rem; }
        .pkg-card { background: #fff; border: 2px solid #e5e5e5; border-radius: 18px; padding: 1.65rem 1.55rem; cursor: pointer; transition: all .25s; position: relative; overflow: hidden; }
        .pkg-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; transform: scaleX(0); transition: transform .25s; transform-origin: left; }
        .pkg-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(0,0,0,.1); }
        .pkg-card.act { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(0,0,0,.1); }
        .pkg-card.act::before { transform: scaleX(1); }
        .pkg-tag { font-size: .72rem; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; margin-bottom: .5rem; }
        .pkg-card h3 { font-size: 1.1rem; font-weight: 900; color: #1c1c1e; margin-bottom: .25rem; }
        .pkg-card-desc { font-size: .87rem; color: #888; line-height: 1.55; margin-bottom: 1rem; }
        .pkg-total { font-size: 1.8rem; font-weight: 900; line-height: 1; margin-bottom: .25rem; }
        .pkg-rate-line { font-size: .84rem; color: #888; margin-bottom: .95rem; }
        .pkg-lines { font-size: .82rem; color: #555; display: flex; flex-direction: column; gap: .3rem; border-top: 1px solid #f0f0f0; padding-top: .85rem; }
        .pkg-line { display: flex; justify-content: space-between; }
        .pkg-choose { display: block; margin-top: 1.1rem; text-align: center; padding: .62rem; border-radius: 9px; font-size: .88rem; font-weight: 800; color: #fff; transition: opacity .18s; }
        .pkg-choose:hover { opacity: .85; }
        .pkg-popular { position: absolute; top: 0; right: 1.2rem; font-size: .62rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; color: #fff; padding: .22rem .7rem; border-radius: 0 0 8px 8px; }

        /* ── STAGE-WISE BREAKUP ── */
        .stage-sec { background: #fff; border-radius: 18px; border: 1.5px solid #e5e5e5; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,.06); }
        .stage-head { padding: 1.4rem 2rem; background: #f9f9f9; border-bottom: 1px solid #efefef; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .stage-head h3 { font-size: 1.08rem; font-weight: 900; color: #1c1c1e; }
        .stage-head p { font-size: .9rem; color: #888; }
        .stage-rows { display: flex; flex-direction: column; }
        .stage-row { display: grid; grid-template-columns: 2.2rem 1fr 9rem 6rem; align-items: center; gap: 1.25rem; padding: 1.1rem 2rem; border-bottom: 1px solid #f5f5f5; transition: background .15s; }
        .stage-row:last-child { border-bottom: none; }
        .stage-row:hover { background: #fafafa; }
        .stage-icon { font-size: 1.3rem; text-align: center; }
        .stage-name { font-size: .97rem; font-weight: 700; color: #1c1c1e; }
        .stage-bar-wrap { height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; margin-top: .35rem; }
        .stage-bar-fill { height: 100%; border-radius: 4px; }
        .stage-amt { font-size: .97rem; font-weight: 800; text-align: right; }
        .stage-pct { font-size: .82rem; color: #aaa; text-align: right; font-weight: 600; }
        @media(max-width:620px){ .stage-row { grid-template-columns: 1.8rem 1fr 6rem; } .stage-pct { display: none; } }

        /* ── FLOOR-WISE BREAKUP ── */
        .floor-sec { background: #fff; border-radius: 18px; border: 1.5px solid #e5e5e5; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,.06); }
        .floor-head { padding: 1.4rem 2rem; background: #f9f9f9; border-bottom: 1px solid #efefef; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .floor-head h3 { font-size: 1.08rem; font-weight: 900; color: #1c1c1e; }
        .floor-head p { font-size: .9rem; color: #888; }
        .floor-cards-wrap { padding: 1.75rem 2rem; display: grid; grid-template-columns: repeat(auto-fill,minmax(220px,1fr)); gap: 1.2rem; }
        .floor-card { border: 1.5px solid #e5e5e5; border-radius: 14px; padding: 1.4rem 1.6rem; position: relative; overflow: hidden; transition: all .2s; }
        .floor-card:hover { border-color: #e8501e; box-shadow: 0 4px 18px rgba(232,80,30,.1); }
        .floor-card-top { position: absolute; top: 0; left: 0; right: 0; height: 3px; }
        .floor-card-label { font-size: .76rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: #aaa; margin-bottom: .6rem; margin-top: .3rem; }
        .floor-card-val { font-size: 1.6rem; font-weight: 900; color: #1c1c1e; line-height: 1; margin-bottom: .3rem; }
        .floor-card-area { font-size: .86rem; color: #888; margin-bottom: .7rem; }
        .floor-card-bar { height: 7px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
        .floor-card-fill { height: 100%; border-radius: 4px; }

        /* ── COMPARE TABLE ── */
        .compare-card { background: #fff; border: 1.5px solid #e5e5e5; border-radius: 18px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,.06); }
        .cmp-scroll { overflow-x: auto; }
        .cmp-scroll::-webkit-scrollbar { height: 4px; }
        .cmp-scroll::-webkit-scrollbar-thumb { background: #e8501e; border-radius: 4px; }
        .cmp-table { width: 100%; border-collapse: collapse; min-width: 680px; }
        .cmp-table th, .cmp-table td { border-bottom: 1px solid #f2f2f2; border-right: 1px solid #f2f2f2; }
        .cmp-table th:last-child, .cmp-table td:last-child { border-right: none; }
        .cmp-thead { position: sticky; top: 0; z-index: 10; }
        .th-feat { background: #f7f7f7; padding: 1rem 1.35rem; font-size: .76rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: #999; text-align: left; border-bottom: 2px solid #e5e5e5 !important; width: 230px; }
        .th-pkg { padding: 1.1rem 1rem; text-align: center; background: #fff; border-bottom: 2px solid #e5e5e5 !important; position: relative; }
        .th-cur-badge { position: absolute; top: 0; left: 50%; transform: translateX(-50%); font-size: .62rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; color: #fff; padding: .2rem .7rem; border-radius: 0 0 8px 8px; white-space: nowrap; }
        .th-pkg-name { font-size: 1rem; font-weight: 900; color: #1c1c1e; margin-bottom: .22rem; }
        .th-pkg-price { font-size: .9rem; font-weight: 800; margin-bottom: .6rem; }
        .th-pkg-btn { display: inline-flex; align-items: center; justify-content: center; padding: .42rem 1rem; border-radius: 8px; font-size: .82rem; font-weight: 800; color: #fff; transition: opacity .18s; }
        .th-pkg-btn:hover { opacity: .85; }
        .td-feat { background: #fafafa; padding: .92rem 1.35rem; font-size: .92rem; font-weight: 700; color: #444; }
        .td-val { padding: .88rem 1rem; text-align: center; font-size: .9rem; color: #333; vertical-align: middle; }
        .td-check { display: inline-flex; align-items: center; justify-content: center; width: 1.4rem; height: 1.4rem; border-radius: 50%; }
        .td-check svg { width: .62rem; height: .62rem; }
        tr:hover .td-feat { background: #f0f0f0; }
        tr:hover .td-val { background: #fafafa; }
        .cmp-cta-row td { padding: 1.2rem 1rem; background: #f9f9f9; border-top: 2px solid #e5e5e5 !important; text-align: center; }

        /* ── FAQ ── */
        .faq-list { display: flex; flex-direction: column; gap: .75rem; }
        .faq-item { background: #fff; border: 1.5px solid #e5e5e5; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,.04); }
        .faq-q { width: 100%; padding: 1.2rem 1.6rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; font-size: 1.05rem; font-weight: 800; color: #1c1c1e; text-align: left; transition: background .18s; }
        .faq-q:hover { background: #fafafa; }
        .faq-icon { width: 1.6rem; height: 1.6rem; border-radius: 50%; border: 1.5px solid #ddd; display: flex; align-items: center; justify-content: center; font-size: .95rem; color: #aaa; flex-shrink: 0; transition: all .22s; }
        .faq-q.open .faq-icon { background: #e8501e; border-color: #e8501e; color: #fff; transform: rotate(45deg); }
        .faq-a { padding: .1rem 1.6rem 1.25rem; font-size: .98rem; color: #666; line-height: 1.75; }

        /* ── BOTTOM CTA ── */
        .bottom-cta { background: linear-gradient(135deg,#1c1c1e 0%,#2c2c2e 100%); border-radius: 20px; padding: 2.75rem 3rem; display: grid; grid-template-columns: 1fr auto; gap: 2rem; align-items: center; box-shadow: 0 4px 24px rgba(0,0,0,.18); position: relative; overflow: hidden; margin-top: 2.75rem; }
        @media(max-width:640px){ .bottom-cta { grid-template-columns: 1fr; gap: 1.5rem; padding: 2rem; } }
        .bottom-cta::before { content: ''; position: absolute; right: -4rem; top: -4rem; width: 20rem; height: 20rem; border-radius: 50%; background: rgba(255,255,255,.04); pointer-events: none; }
        .bottom-cta h3 { font-size: 1.65rem; font-weight: 900; color: #fff; margin-bottom: .45rem; letter-spacing: -.02em; }
        .bottom-cta p { font-size: 1rem; color: rgba(255,255,255,.5); }
        .cta-btns { display: flex; flex-direction: column; gap: .7rem; min-width: 190px; position: relative; }
        .cta-btn1 { display: block; background: #e8501e; color: #fff; font-size: 1rem; font-weight: 800; padding: .92rem 1.75rem; border-radius: 11px; text-align: center; transition: background .18s; }
        .cta-btn1:hover { background: #c93e0d; }
        .cta-btn2 { display: block; border: 1.5px solid rgba(255,255,255,.22); color: rgba(255,255,255,.75); font-size: .95rem; font-weight: 700; padding: .9rem 1.75rem; border-radius: 11px; text-align: center; transition: all .18s; }
        .cta-btn2:hover { border-color: rgba(255,255,255,.5); color: #fff; }

        /* ── FOOTER ── */
        .footer { background: #1c1c1e; padding: 2.25rem clamp(1.5rem,4vw,3rem); }
        .footer-in { width: 100%; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .footer-logo { font-size: 1.3rem; font-weight: 900; color: #fff; letter-spacing: -.025em; }
        .footer-logo em { color: #e8501e; font-style: normal; }
        .footer-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .footer-links a { font-size: .9rem; color: rgba(255,255,255,.4); transition: color .18s; }
        .footer-links a:hover { color: #e8501e; }
        .footer-copy { font-size: .76rem; color: rgba(255,255,255,.22); }

        /* divider */
        .divider { height: 1px; background: linear-gradient(90deg,transparent,rgba(232,80,30,.2),transparent); margin: .5rem 0; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-in">
          <Link className="logo" to="/"><em>Wall</em>Bolt Atelier</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <a href="#">Services</a>
            <a href="#">Projects</a>
            <a href="#">Company Profile</a>
            <a href="#">Blogs</a>
          </div>
          <a href="#contact" className="nav-cta">Book Consultation</a>
        </div>
      </nav>

      {/* ── HERO + FORM ── */}
      <section className="hero">
        <div className="hero-in">

          {/* LEFT */}
          <div className="hero-copy">
            <p className="kicker">Construction Cost Calculator</p>
            <h1>Estimate your <em>home construction cost</em> instantly</h1>
            <p>
              Select your city, built-up area, floors, parking, and balcony units — get an instant
              package-wise breakdown with stage-wise and floor-wise cost details. No hidden charges.
            </p>
            <div className="trust-pills">
              {['500+ Quality Checks', 'Escrow Protected', 'No Hidden Costs', 'On-Time Delivery'].map((t) => (
                <span key={t} className="trust-pill">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#e8501e"/>
                    <path d="m7.5 12.5 3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t}
                </span>
              ))}
            </div>
            <div className="rate-cards">
              {estimatorPackages.map((pkg, i) => (
                <div key={pkg.name} className="rate-card" style={{ borderColor: PKG_COLOR[i % PKG_COLOR.length] + '44' }}>
                  <strong>{pkg.name.replace(' Package', '')}</strong>
                  <span style={{ color: PKG_COLOR[i % PKG_COLOR.length] }}>{formatInr(pkg.rate)}/sqft</span>
                </div>
              ))}
            </div>
          </div>

          {/* FORM CARD */}
          <form className="form-card" onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
            <div className="form-head">
              <h2>Construction Cost Calculator</h2>
              <p>Fill in project details for an instant estimate</p>
              <div className="type-toggle">
                <div className={`type-btn${form.propertyType === 'home' ? ' act' : ''}`} onClick={() => set('propertyType', 'home')}>🏠 Homes</div>
                <div className={`type-btn${form.propertyType === 'luxury' ? ' act' : ''}`} onClick={() => set('propertyType', 'luxury')}>✨ Luxury</div>
              </div>
            </div>
            <div className="form-body">

              <div className="field">
                <label htmlFor="f-city">📍 City / Location</label>
                <select id="f-city" value={form.cityCode} onChange={(e) => set('cityCode', e.target.value)}>
                  {estimatorCities.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
                <small>{city.note}</small>
              </div>

              <div className="field">
                <label htmlFor="f-area">📐 Super Built-up Area (sqft)</label>
                <input id="f-area" type="number" min="400" step="10" placeholder="e.g. 1200" value={form.builtUpArea} onChange={(e) => set('builtUpArea', e.target.value)} required />
                <small>Enter area per floor in square feet</small>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="f-floors">🏗️ No. of Floors</label>
                  <select id="f-floors" value={form.floors} onChange={(e) => set('floors', e.target.value)}>
                    {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n === 1 ? 'G (Ground only)' : n === 2 ? 'G+1' : n === 3 ? 'G+2' : 'G+3'}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-parking">🚗 Car Parking</label>
                  <select id="f-parking" value={form.carParking} onChange={(e) => set('carParking', e.target.value)}>
                    {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'Slot' : 'Slots'}</option>)}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="f-balcony">🌿 Balcony & Utility Units</label>
                <select id="f-balcony" value={form.balconyUnits} onChange={(e) => set('balconyUnits', e.target.value)}>
                  {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'Unit' : 'Units'}</option>)}
                </select>
                <small>40 sqft per unit @ 60% of package rate</small>
              </div>

              <button className="calc-btn" type="submit">Calculate Cost Instantly →</button>
              <p className="form-note">Indicative estimate. Final cost depends on soil, plinth, elevation design &amp; brand selection.</p>
            </div>
          </form>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          RESULTS — shown after Calculate
      ══════════════════════════════════════════════════════ */}
      {calculated && area > 0 && (
        <div ref={resultsRef}>

          {/* ── 1. SUMMARY BAR ── */}
          <div className="sec" style={{ paddingBottom: '1rem', background: '#fff', borderBottom: '1px solid #ebebeb' }}>
            <div className="summary-bar">
              <div className="sb-left">
                <h2>Your Construction Cost Estimate</h2>
                <p>
                  {city.name} &nbsp;·&nbsp; {totalArea.toLocaleString('en-IN')} sqft total
                  &nbsp;·&nbsp; {floors === 1 ? 'Ground only' : floors === 2 ? 'G+1' : floors === 3 ? 'G+2' : 'G+3'}
                  &nbsp;·&nbsp; {parking} parking &nbsp;·&nbsp; {balcony} balcony/utility
                </p>
              </div>
              <div className="sb-range">
                <strong>{formatInr(pkgResults[0].breakdown.total)} – {formatInr(pkgResults[pkgResults.length - 1].breakdown.total)}</strong>
                <span>Budget range across all packages</span>
              </div>
            </div>
          </div>

          {/* ── 2. PACKAGE COST CARDS ── */}
          <div className="sec" style={{ paddingTop: '2.5rem', paddingBottom: '2rem', background: '#f2f2f2' }}>
            <div className="sec-head">
              <span className="sec-ey">Package-wise Estimate</span>
              <h2>Choose your construction package</h2>
              <p>Tap a package to see detailed stage-wise and floor-wise cost breakdown below</p>
            </div>

            <div className="pkg-tabs">
              {pkgResults.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`pkg-tab${pkg.name === active.name ? ' act' : ''}`}
                  style={pkg.name === active.name ? { background: pkg.color } : {}}
                  onClick={() => setActivePkg(pkg.name)}
                >
                  {pkg.name.replace(' Package', '')} · {formatInr(pkg.breakdown.adjustedRate)}/sqft
                </div>
              ))}
            </div>

            <div className="pkg-cards">
              {pkgResults.map((pkg, i) => (
                <div
                  key={pkg.name}
                  className={`pkg-card${pkg.name === active.name ? ' act' : ''}`}
                  style={{
                    '--accent': pkg.color,
                    borderColor: pkg.name === active.name ? pkg.color : undefined,
                    background: pkg.name === active.name ? pkg.light : '#fff',
                  } as React.CSSProperties}
                  onClick={() => setActivePkg(pkg.name)}
                >
                  {i === 1 && <div className="pkg-popular" style={{ background: pkg.color }}>Popular</div>}
                  <div style={{ marginTop: i === 1 ? '1rem' : 0 }}>
                    <div className="pkg-tag" style={{ color: pkg.color }}>{pkg.tag ?? pkg.name.replace(' Package', '')}</div>
                    <h3>{pkg.name}</h3>
                    <p className="pkg-card-desc">{pkg.summary}</p>
                    <div className="pkg-total" style={{ color: pkg.color }}>{formatInr(pkg.breakdown.total)}</div>
                    <div className="pkg-rate-line">Effective rate: {formatInr(pkg.breakdown.adjustedRate)}/sqft</div>
                    <div className="pkg-lines">
                      <div className="pkg-line"><span>Built-up area</span><span>{formatInr(pkg.breakdown.builtUpCost)}</span></div>
                      <div className="pkg-line"><span>Car parking</span><span>{formatInr(pkg.breakdown.parkingCost)}</span></div>
                      <div className="pkg-line"><span>Balcony &amp; utility</span><span>{formatInr(pkg.breakdown.balconyCost)}</span></div>
                    </div>
                    <Link to={`/packages/${pkg.slug ?? ''}`} className="pkg-choose" style={{ background: pkg.color }}>
                      View Full Package Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 3. COST-WISE BREAKUP OF CONSTRUCTION STAGES ── */}
          <div className="sec" style={{ paddingTop: '2.5rem', paddingBottom: '2rem', background: '#fff', borderTop: '1px solid #ebebeb', borderBottom: '1px solid #ebebeb' }}>
            <div className="sec-head">
              <span className="sec-ey">Stage-wise Breakdown</span>
              <h2>Cost wise breakup of your home construction stages</h2>
              <p>Based on the <strong>{active.name}</strong> at {formatInr(active.breakdown.total)} total. Percentages follow industry-standard construction stage weightage.</p>
            </div>

            <div className="stage-sec">
              <div className="stage-head">
                <h3>{active.name} — Stage-wise Breakup</h3>
                <p>Total: <strong style={{ color: active.color }}>{formatInr(active.breakdown.total)}</strong></p>
              </div>
              <div className="stage-rows">
                {STAGES.map((stage) => {
                  const amt = Math.round(active.breakdown.total * stage.pct)
                  return (
                    <div key={stage.name} className="stage-row">
                      <div className="stage-icon">{stage.icon}</div>
                      <div>
                        <div className="stage-name">{stage.name}</div>
                        <div className="stage-bar-wrap" style={{ marginTop: '.4rem' }}>
                          <div className="stage-bar-fill" style={{ width: `${stage.pct * 100}%`, background: active.color }} />
                        </div>
                      </div>
                      <div className="stage-amt" style={{ color: active.color }}>{formatInr(amt)}</div>
                      <div className="stage-pct">{(stage.pct * 100).toFixed(0)}%</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ── 4. FLOOR-WISE COST BREAKUP ── */}
          {floors > 1 && (
            <>
              <div className="sec" style={{ paddingTop: '2.5rem', paddingBottom: '2rem', background: '#f2f2f2' }}>
                <div className="sec-head">
                  <span className="sec-ey">Floor-wise Breakdown</span>
                  <h2>Floor wise cost breakup for {floors === 2 ? 'G+1' : floors === 3 ? 'G+2' : 'G+3'}</h2>
                  <p>Cost distribution across {floors} floors based on standard structural loading weightage for the <strong>{active.name}</strong>.</p>
                </div>

                <div className="floor-sec">
                  <div className="floor-head">
                    <h3>{active.name} — Floor-wise Breakup</h3>
                    <p>{floors} Floors · {totalArea.toLocaleString('en-IN')} sqft total · {area.toLocaleString('en-IN')} sqft per floor</p>
                  </div>
                  <div className="floor-cards-wrap">
                    {floorLabels.map((label, fi) => {
                      const pct   = floorPcts[fi]
                      const amt   = Math.round(active.breakdown.total * pct)
                      const fArea = area
                      return (
                        <div key={label} className="floor-card" style={{ borderColor: active.color + '44', background: active.light }}>
                          <div className="floor-card-top" style={{ background: active.color }} />
                          <div className="floor-card-label">{label}</div>
                          <div className="floor-card-val" style={{ color: active.color }}>{formatInr(amt)}</div>
                          <div className="floor-card-area">{fArea.toLocaleString('en-IN')} sqft · {(pct * 100).toFixed(0)}% of total</div>
                          <div className="floor-card-bar">
                            <div className="floor-card-fill" style={{ width: `${pct * 100}%`, background: active.color }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="divider" style={{ display: 'none' }} />
            </>
          )}

          {/* ── 5. COMPARE PACKAGES TABLE ── */}
          <div className="sec" style={{ paddingTop: '2.5rem', paddingBottom: '2rem', background: '#fff', borderTop: '1px solid #ebebeb', borderBottom: '1px solid #ebebeb' }}>
            <div className="sec-head">
              <span className="sec-ey">Compare Packages</span>
              <h2>Take a closer look at WallBolt construction offerings</h2>
              <p>Feature-wise comparison across all packages. Select your best fit based on material quality and budget.</p>
            </div>

            <div className="compare-card">
              <div className="cmp-scroll">
                <table className="cmp-table">
                  <colgroup>
                    <col style={{ width: 220 }} />
                    {pkgResults.map((p) => <col key={p.name} />)}
                  </colgroup>
                  <thead className="cmp-thead">
                    <tr>
                      <th className="th-feat">Feature</th>
                      {pkgResults.map((pkg) => (
                        <th key={pkg.name} className={`th-pkg${pkg.name === active.name ? ' cur' : ''}`} style={pkg.name === active.name ? { background: pkg.light } : {}}>
                          {pkg.name === active.name && <div className="th-cur-badge" style={{ background: pkg.color }}>Selected</div>}
                          <div className="th-pkg-name" style={{ marginTop: pkg.name === active.name ? '1.1rem' : '.2rem' }}>{pkg.name}</div>
                          <div className="th-pkg-price" style={{ color: pkg.color }}>{formatInr(pkg.breakdown.total)}</div>
                          <Link to={`/packages/${pkg.slug ?? ''}`} className="th-pkg-btn" style={{ background: pkg.color }}>
                            {pkg.name === active.name ? '✓ Selected' : 'Choose'}
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_FEATURES.map((row, ri) => (
                      <tr key={ri}>
                        <td className="td-feat">{row.label}</td>
                        {pkgResults.map((pkg, pi) => {
                          const val = row.values[pi] ?? '—'
                          const isCheck = val.startsWith('✓')
                          const isCur   = pkg.name === active.name
                          return (
                            <td key={pkg.name} className="td-val" style={isCur ? { background: pkg.light } : {}}>
                              {isCheck ? (
                                <span className="td-check" style={{ background: pkg.color }}>
                                  <svg viewBox="0 0 12 12" fill="none">
                                    <path d="m2 6 3 3 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </span>
                              ) : (
                                <span style={{ fontSize: '.83rem', fontWeight: isCur ? 700 : 400, color: isCur ? pkg.color : '#555' }}>{val}</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                    <tr className="cmp-cta-row">
                      <td style={{ fontWeight: 800, fontSize: '.82rem', color: '#888', textAlign: 'left', paddingLeft: '1.2rem' }}>Get Started</td>
                      {pkgResults.map((pkg) => (
                        <td key={pkg.name} style={pkg.name === active.name ? { background: pkg.light } : {}}>
                          <Link
                            to={`/packages/${pkg.slug ?? ''}`}
                            style={{
                              display: 'inline-block', padding: '.5rem 1.1rem', borderRadius: '8px',
                              fontSize: '.8rem', fontWeight: 800,
                              background: pkg.name === active.name ? pkg.color : 'transparent',
                              color: pkg.name === active.name ? '#fff' : pkg.color,
                              border: `1.5px solid ${pkg.color}`,
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

        </div>
      )}

      {/* ── 6. FAQ ── */}
      <div className="sec" style={{ background: '#f2f2f2', paddingTop: '2.5rem', paddingBottom: '3rem' }}>
        <div className="sec-head">
          <span className="sec-ey">FAQs</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know before estimating your construction cost</p>
        </div>
        <div className="faq-list">
          {estimatorFaqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className={`faq-q${openFaq === i ? ' open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)} type="button">
                {faq.question}
                <span className="faq-icon" style={openFaq === i ? { background: '#e8501e', borderColor: '#e8501e', color: '#fff' } : {}}>+</span>
              </button>
              {openFaq === i && <div className="faq-a">{faq.answer}</div>}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bottom-cta">
          <div>
            <h3>Ready to build your dream home?</h3>
            <p>Talk to our construction experts for a detailed site-specific quotation.</p>
          </div>
          <div className="cta-btns">
            <a href="#" className="cta-btn1">Book Free Consultation</a>
            <Link to="/packages/compare" className="cta-btn2">Compare All Packages</Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-in">
          <Link className="footer-logo" to="/"><em>Wall</em>Bolt Atelier</Link>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <a href="#">Services</a>
            <a href="#">Projects</a>
            <a href="#">Contact</a>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} WallBolt Atelier. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}
