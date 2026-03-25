import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { packageDocs, packageDocMap, type PackageSlug } from '../data/packageDocs'
import { getPackagePreviewPoints, splitPackageIntoSections } from '../data/packageUtils'

const slugSet = new Set<PackageSlug>(packageDocs.map((p) => p.slug))
const isPackageSlug = (v: string): v is PackageSlug => slugSet.has(v as PackageSlug)

const PKG_COLORS  = ['#e8501e', '#2563eb', '#16a34a', '#7c3aed', '#b45309']
const PKG_LIGHTS  = ['#fff5f2', '#eff6ff', '#f0fdf4', '#f5f3ff', '#fffbeb']
const PKG_BORDERS = ['rgba(232,80,30,.2)', 'rgba(37,99,235,.2)', 'rgba(22,163,74,.2)', 'rgba(124,58,237,.2)', 'rgba(180,83,9,.2)']

function buildTable(allSectioned: ReturnType<typeof splitPackageIntoSections>[]) {
  const sectionOrder: string[] = []
  const seen = new Set<string>()
  const map: Record<string, Record<string, Record<string, string>>> = {}

  allSectioned.forEach((sections, pi) => {
    const slug = packageDocs[pi].slug
    sections.forEach((sec) => {
      if (!seen.has(sec.title)) { seen.add(sec.title); sectionOrder.push(sec.title) }
      if (!map[sec.title]) map[sec.title] = {}
      sec.entries.forEach((e) => {
        const key = e.text.slice(0, 80).trim()
        if (!map[sec.title][key]) map[sec.title][key] = {}
        map[sec.title][key][slug] = e.text
      })
    })
  })
  return { sectionOrder, map }
}

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [activeSection, setActiveSection] = useState('__highlights__')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (!slug || !isPackageSlug(slug)) return <Navigate to="/" replace />

  const pkg          = packageDocMap[slug]
  const curIdx       = packageDocs.findIndex((p) => p.slug === pkg.slug)
  const color        = PKG_COLORS[curIdx % PKG_COLORS.length]
  const allSectioned = packageDocs.map((p) => splitPackageIntoSections(p))
  const { sectionOrder, map } = buildTable(allSectioned)
  const allHighlights = packageDocs.map((p) => getPackagePreviewPoints(p))
  const maxHL = Math.max(...allHighlights.map((h) => h.length))
  const faqs = [
    { q: "What's included in each package?", a: "Materials, labour, project management, dedicated site engineer, mobile app tracking, 10-year structural warranty + 1-year materials warranty." },
    { q: 'Can I customise a package?', a: 'Yes — each package has a wallet amount for tiles, fittings and finishes. Upgrades are available via your Technical Consultant.' },
    { q: 'Does the price include GST?', a: 'Yes. All prices are GST-inclusive. No hidden costs — everything is in the contract before the project starts.' },
    { q: 'What is a wallet amount?', a: 'A pre-set budget for items like tiles and fittings. If your chosen items exceed the wallet, you pay the difference.' },
    { q: 'Do you provide a warranty?', a: '10-year structural warranty + 1-year finishing warranty. Fittings carry manufacturer warranties.' },
  ]

  /* sections list for left nav */
  const navItems = [
    { id: '__highlights__', label: '✨ Highlights' },
    ...sectionOrder.map((s) => ({ id: s, label: s })),
    { id: '__faq__', label: '❓ FAQs' },
  ]

  /* active section rows */
  const getRows = () => {
    if (activeSection === '__highlights__') {
      return Array.from({ length: maxHL }).map((_, i) => ({
        label: `Highlight ${i + 1}`,
        values: packageDocs.map((_, pi) => allHighlights[pi][i] || ''),
      }))
    }
    if (activeSection === '__faq__') return []
    const secData = map[activeSection] || {}
    return Object.entries(secData).map(([, vals], i) => ({
      label: `Item ${i + 1}`,
      values: packageDocs.map((p) => vals[p.slug] || ''),
    }))
  }

  const rows = getRows()

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow-x: hidden; }
        body {
          font-family: 'Nunito Sans', 'Segoe UI', sans-serif;
          font-size: 15px;
          color: #2d2d2d;
          background: #f4f4f5;
        }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }

        /* ── APP SHELL ── */
        .app {
          display: flex;
          flex-direction: column;
          height: calc(100svh - var(--site-header-height));
          overflow: hidden;
          border-top: 1px solid #e5e5e5;
        }

        /* ── TOPBAR ── */
        .tb {
          height: 58px; flex-shrink: 0;
          background: #fff;
          border-bottom: 1px solid #e5e5e5;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.5rem;
          gap: 1rem;
          z-index: 100;
          box-shadow: 0 1px 8px rgba(0,0,0,.05);
        }
        .tb-logo { font-size: 1.2rem; font-weight: 900; letter-spacing: -.025em; color: #1c1c1e; flex-shrink: 0; }
        .tb-logo em { color: ${color}; font-style: normal; }
        .tb-links { display: flex; gap: .1rem; }
        .tb-links a { font-size: .82rem; font-weight: 700; color: #666; padding: .35rem .75rem; border-radius: 7px; transition: all .18s; }
        .tb-links a:hover { color: ${color}; background: ${PKG_LIGHTS[curIdx]}; }
        @media(max-width:860px) { .tb-links { display: none; } }
        .tb-cta {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .52rem 1.2rem; font-size: .82rem; font-weight: 800;
          border-radius: 8px; background: ${color}; color: #fff;
          flex-shrink: 0; transition: opacity .18s;
        }
        .tb-cta:hover { opacity: .88; }

        /* ── MAIN AREA (fills remaining height) ── */
        .main { flex: 1; display: flex; overflow: hidden; }

        /* ── LEFT PANEL ── */
        .lp {
          width: 240px; flex-shrink: 0;
          background: #fff;
          border-right: 1px solid #e5e5e5;
          display: flex; flex-direction: column;
          overflow: hidden;
        }

        /* package info at top of left panel */
        .lp-head {
          padding: 1.1rem 1.1rem .9rem;
          border-bottom: 1px solid #f0f0f0;
          background: ${PKG_LIGHTS[curIdx]};
          flex-shrink: 0;
        }
        .lp-pkg-badge {
          display: inline-flex; align-items: center; gap: .3rem;
          font-size: .62rem; font-weight: 800; letter-spacing: .14em;
          text-transform: uppercase; color: ${color};
          background: rgba(255,255,255,.8); border: 1px solid ${PKG_BORDERS[curIdx]};
          padding: .22rem .65rem; border-radius: 20px; margin-bottom: .6rem;
        }
        .lp-pkg-name { font-size: 1rem; font-weight: 900; color: #1c1c1e; line-height: 1.2; margin-bottom: .2rem; }
        .lp-pkg-price { font-size: .95rem; font-weight: 900; color: ${color}; }
        .lp-book-btn {
          display: block; margin-top: .75rem;
          background: ${color}; color: #fff;
          font-size: .78rem; font-weight: 800;
          padding: .55rem .9rem; border-radius: 8px;
          text-align: center; transition: opacity .18s;
        }
        .lp-book-btn:hover { opacity: .88; }

        /* package switcher */
        .lp-pkgs {
          padding: .7rem .9rem .5rem;
          border-bottom: 1px solid #f0f0f0;
          flex-shrink: 0;
        }
        .lp-pkgs-lbl { font-size: .62rem; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; color: #aaa; margin-bottom: .45rem; }
        .lp-pkg-item {
          display: flex; align-items: center; gap: .55rem;
          padding: .52rem .65rem; border-radius: 8px;
          font-size: .82rem; font-weight: 700; color: #666;
          transition: all .18s; margin-bottom: .15rem;
          border: 1.5px solid transparent;
        }
        .lp-pkg-item:hover { background: #f7f7f7; color: #1c1c1e; }
        .lp-pkg-item.cur {
          background: ${PKG_LIGHTS[curIdx]};
          border-color: ${PKG_BORDERS[curIdx]};
          color: ${color};
        }
        .lp-pkg-dot { width: .45rem; height: .45rem; border-radius: 50%; flex-shrink: 0; }
        .lp-pkg-price-sm { font-size: .7rem; font-weight: 600; color: #aaa; margin-left: auto; }
        .lp-pkg-item.cur .lp-pkg-price-sm { color: ${color}; }

        /* section navigation */}
        .lp-nav { flex: 1; overflow-y: auto; padding: .65rem .9rem; }
        .lp-nav::-webkit-scrollbar { width: 3px; }
        .lp-nav::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
        .lp-nav-lbl { font-size: .62rem; font-weight: 800; letter-spacing: .15em; text-transform: uppercase; color: #aaa; margin-bottom: .45rem; padding: 0 .15rem; }
        .lp-nav-item {
          display: flex; align-items: center; gap: .5rem;
          padding: .52rem .65rem; border-radius: 8px;
          font-size: .8rem; font-weight: 700; color: #666;
          transition: all .18s; margin-bottom: .1rem;
          cursor: pointer; border: 1.5px solid transparent;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .lp-nav-item:hover { background: #f7f7f7; color: #1c1c1e; }
        .lp-nav-item.active {
          background: ${PKG_LIGHTS[curIdx]};
          border-color: ${PKG_BORDERS[curIdx]};
          color: ${color};
        }
        .lp-nav-item-dot { width: .38rem; height: .38rem; border-radius: 50%; background: currentColor; flex-shrink: 0; opacity: .6; }

        /* ── RIGHT PANEL ── */
        .rp { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

        /* top bar inside right panel */
        .rp-head {
          height: 52px; flex-shrink: 0;
          background: #fff;
          border-bottom: 1px solid #e5e5e5;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.5rem;
          gap: 1rem;
        }
        .rp-section-title { font-size: 1rem; font-weight: 900; color: #1c1c1e; display: flex; align-items: center; gap: .5rem; }
        .rp-section-title::before {
          content: '';
          width: 3px; height: 1rem; border-radius: 2px;
          background: ${color}; display: block;
        }
        .rp-head-right { display: flex; align-items: center; gap: .6rem; }
        .rp-breadcrumb { display: flex; align-items: center; gap: .4rem; font-size: .75rem; color: #aaa; }
        .rp-breadcrumb a { color: #aaa; transition: color .18s; }
        .rp-breadcrumb a:hover { color: ${color}; }
        .rp-breadcrumb span { color: #ddd; }
        .rp-compare-btn {
          display: inline-flex; align-items: center; gap: .3rem;
          font-size: .75rem; font-weight: 800;
          padding: .38rem .85rem; border-radius: 7px;
          border: 1.5px solid #e5e5e5; color: #666;
          transition: all .18s;
        }
        .rp-compare-btn:hover { border-color: ${color}; color: ${color}; }

        /* ── TABLE AREA ── */
        .tbl-area { flex: 1; overflow: auto; }
        .tbl-area::-webkit-scrollbar { width: 5px; height: 5px; }
        .tbl-area::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }

        /* THE TABLE */
        .cmp-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
        .cmp-table th, .cmp-table td { border-bottom: 1px solid #f0f0f0; border-right: 1px solid #f0f0f0; }
        .cmp-table th:last-child, .cmp-table td:last-child { border-right: none; }

        /* sticky column header row */
        .cmp-thead { position: sticky; top: 0; z-index: 20; }
        .th-feature {
          width: 200px; min-width: 160px;
          background: #f7f7f7;
          padding: .85rem 1.1rem;
          font-size: .68rem; font-weight: 800; letter-spacing: .14em;
          text-transform: uppercase; color: #999;
          text-align: left;
          border-bottom: 2px solid #e5e5e5 !important;
        }
        .th-pkg {
          padding: .85rem .75rem;
          text-align: center;
          background: #fff;
          border-bottom: 2px solid #e5e5e5 !important;
          position: relative;
        }
        .th-pkg.cur-col { background: ${PKG_LIGHTS[curIdx]}; }
        .th-cur-tag {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          font-size: .58rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase;
          background: ${color}; color: #fff;
          padding: .18rem .6rem; border-radius: 0 0 6px 6px;
          white-space: nowrap;
        }
        .th-pkg-name { font-size: .9rem; font-weight: 900; color: #1c1c1e; margin-bottom: .18rem; }
        .th-pkg-price { font-size: .82rem; font-weight: 800; margin-bottom: .55rem; }
        .th-pkg-choose {
          display: inline-flex; align-items: center; justify-content: center;
          padding: .38rem .85rem; border-radius: 7px;
          font-size: .74rem; font-weight: 800;
          transition: all .18s;
        }

        /* data rows */
        .td-label {
          background: #fafafa;
          padding: .82rem 1.1rem;
          font-size: .82rem; font-weight: 600; color: #555;
          vertical-align: top;
          line-height: 1.45;
        }
        .td-val {
          padding: .75rem .9rem;
          text-align: center;
          vertical-align: middle;
          font-size: .83rem; color: #333;
          line-height: 1.45;
        }
        .td-val.cur-col { background: ${PKG_LIGHTS[curIdx]}; }
        tr:hover .td-label { background: #f0f0f0; }
        tr:hover .td-val { background: #fafafa; }
        tr:hover .td-val.cur-col { background: ${PKG_LIGHTS[curIdx]}; filter: brightness(.97); }

        .val-content { display: flex; align-items: flex-start; gap: .45rem; text-align: left; }
        .val-tick {
          width: 1.2rem; height: 1.2rem; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: .1rem;
        }
        .val-tick svg { width: .58rem; height: .58rem; }
        .val-text { font-size: .83rem; line-height: 1.48; }
        .val-dash { display: inline-block; width: 1.4rem; height: 2px; background: #ddd; border-radius: 2px; }

        /* bottom CTA row */
        .td-cta { padding: 1rem .9rem; text-align: center; background: #f9f9f9; border-top: 2px solid #e5e5e5 !important; }
        .td-cta.cur-col { background: ${PKG_LIGHTS[curIdx]}; }

        /* ── FAQ VIEW (when activeSection = __faq__) ── */
        .faq-area { flex: 1; overflow-y: auto; padding: 1.5rem; }
        .faq-area::-webkit-scrollbar { width: 4px; }
        .faq-area::-webkit-scrollbar-thumb { background: #ccc; }
        .faq-list { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: .65rem; }
        .faq-item { background: #fff; border: 1.5px solid #e5e5e5; border-radius: 12px; overflow: hidden; }
        .faq-q {
          width: 100%; padding: 1.1rem 1.4rem;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          font-size: .97rem; font-weight: 800; color: #1c1c1e; text-align: left;
          transition: background .18s;
        }
        .faq-q:hover { background: #f9f9f9; }
        .faq-icon {
          width: 1.5rem; height: 1.5rem; border-radius: 50%;
          border: 1.5px solid #ddd;
          display: flex; align-items: center; justify-content: center;
          font-size: .9rem; color: #aaa; flex-shrink: 0;
          transition: all .22s;
        }
        .faq-q.open .faq-icon { background: ${color}; border-color: ${color}; color: #fff; transform: rotate(45deg); }
        .faq-a { padding: .1rem 1.4rem 1.1rem; font-size: .91rem; color: #666; line-height: 1.72; }
      `}</style>

      <div className="app">

        {/* ── TOPBAR ── */}
        <header className="tb">
          <Link className="tb-logo" to="/"><em>Wall</em>Bolt Atelier</Link>
          <div className="tb-links">
            <Link to="/">Home</Link>
            <a href="#">Services</a>
            <a href="#">Projects</a>
            <a href="#">Company Profile</a>
            <a href="#">Blogs</a>
          </div>
          <a href="#" className="tb-cta">Book Consultation</a>
        </header>

        {/* ── MAIN ── */}
        <div className="main">

          {/* ── LEFT PANEL ── */}
          <aside className="lp">

            {/* Current package info */}
            <div className="lp-head">
              <div className="lp-pkg-badge">Package {curIdx + 1}/{packageDocs.length}</div>
              <div className="lp-pkg-name">{pkg.name} Package</div>
              <div className="lp-pkg-price">{pkg.startingPrice || 'Custom pricing'}</div>
              <a href="#" className="lp-book-btn">Book Free Consultation</a>
            </div>

            {/* Package switcher */}
            <div className="lp-pkgs">
              <p className="lp-pkgs-lbl">All Packages</p>
              {packageDocs.map((p, i) => (
                <Link
                  key={p.slug}
                  to={`/packages/${p.slug}`}
                  className={`lp-pkg-item${p.slug === slug ? ' cur' : ''}`}
                >
                  <span className="lp-pkg-dot" style={{ background: PKG_COLORS[i] }} />
                  {p.name}
                  <span className="lp-pkg-price-sm">{p.startingPrice || '—'}</span>
                </Link>
              ))}
            </div>

            {/* Section navigation */}
            <nav className="lp-nav">
              <p className="lp-nav-lbl">Sections</p>
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className={`lp-nav-item${activeSection === item.id ? ' active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                  title={item.label}
                >
                  <span className="lp-nav-item-dot" />
                  {item.label}
                </div>
              ))}
            </nav>

          </aside>

          {/* ── RIGHT PANEL ── */}
          <div className="rp">

            {/* Right panel header */}
            <div className="rp-head">
              <div className="rp-section-title">
                {activeSection === '__highlights__' ? 'Quick Highlights'
                  : activeSection === '__faq__' ? 'Frequently Asked Questions'
                  : activeSection}
              </div>
              <div className="rp-head-right">
                <div className="rp-breadcrumb">
                  <Link to="/">Home</Link>
                  <span>/</span>
                  <span style={{ color: '#888' }}>Packages</span>
                  <span>/</span>
                  <span style={{ color: color, fontWeight: 700 }}>{pkg.name}</span>
                </div>
                <Link to="/" className="rp-compare-btn">← Back to Home</Link>
              </div>
            </div>

            {/* ── TABLE ── */}
            {activeSection !== '__faq__' && (
              <div className="tbl-area">
                <table className="cmp-table">
                  <colgroup>
                    <col style={{ width: 200 }} />
                    {packageDocs.map((p) => <col key={p.slug} />)}
                  </colgroup>

                  {/* THEAD */}
                  <thead className="cmp-thead">
                    <tr>
                      <th className="th-feature">Feature</th>
                      {packageDocs.map((p, i) => {
                        const isCur = p.slug === slug
                        return (
                          <th key={p.slug} className={`th-pkg${isCur ? ' cur-col' : ''}`}>
                            {isCur && <div className="th-cur-tag">Selected</div>}
                            <div className="th-pkg-name" style={{ marginTop: isCur ? '1rem' : '.25rem' }}>{p.name}</div>
                            <div className="th-pkg-price" style={{ color: PKG_COLORS[i] }}>
                              {p.startingPrice || 'Custom'}
                            </div>
                            <Link
                              to={`/packages/${p.slug}`}
                              className="th-pkg-choose"
                              style={isCur
                                ? { background: PKG_COLORS[i], color: '#fff' }
                                : { border: `1.5px solid ${PKG_COLORS[i]}`, color: PKG_COLORS[i] }
                              }
                            >
                              {isCur ? '✓ Selected' : 'Choose'}
                            </Link>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>

                  {/* TBODY */}
                  <tbody>
                    {rows.map((row, ri) => (
                      <tr key={ri}>
                        <td className="td-label">{row.label}</td>
                        {row.values.map((val, vi) => {
                          const isCur = packageDocs[vi].slug === slug
                          return (
                            <td key={vi} className={`td-val${isCur ? ' cur-col' : ''}`}>
                              {val ? (
                                <div className="val-content">
                                  <span
                                    className="val-tick"
                                    style={{ background: PKG_COLORS[vi] }}
                                  >
                                    <svg viewBox="0 0 12 12" fill="none">
                                      <path d="m2 6 3 3 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </span>
                                  <span className="val-text">{val}</span>
                                </div>
                              ) : (
                                <span className="val-dash" title="Not included" />
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}

                    {/* CTA row at bottom */}
                    <tr>
                      <td className="td-cta" style={{ fontWeight: 800, fontSize: '.82rem', color: '#888', textAlign: 'left', paddingLeft: '1.1rem' }}>
                        Get Started
                      </td>
                      {packageDocs.map((p, i) => {
                        const isCur = p.slug === slug
                        return (
                          <td key={p.slug} className={`td-cta${isCur ? ' cur-col' : ''}`}>
                            <Link
                              to={`/packages/${p.slug}`}
                              style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                padding: '.5rem 1rem', borderRadius: '8px',
                                fontSize: '.78rem', fontWeight: 800,
                                background: isCur ? PKG_COLORS[i] : 'transparent',
                                color: isCur ? '#fff' : PKG_COLORS[i],
                                border: `1.5px solid ${PKG_COLORS[i]}`,
                                transition: 'all .18s',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {isCur ? '✓ Current' : 'Select'}
                            </Link>
                          </td>
                        )
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* ── FAQ ── */}
            {activeSection === '__faq__' && (
              <div className="faq-area">
                <div className="faq-list">
                  <div style={{
                    background: `linear-gradient(135deg, #1c1c1e 0%, #2c2c2e 100%)`,
                    borderRadius: 14, padding: '1.5rem 1.75rem', marginBottom: '.5rem',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', right: '-3rem', top: '-3rem', width: '12rem', height: '12rem', borderRadius: '50%', background: 'rgba(255,255,255,.04)', pointerEvents: 'none' }} />
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', marginBottom: '.4rem' }}>
                      Questions about the <span style={{ color }}>{pkg.name} Package</span>?
                    </h2>
                    <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)' }}>
                      Everything you need to know before getting started.
                    </p>
                    <a href="#" style={{
                      display: 'inline-flex', marginTop: '1.1rem',
                      padding: '.65rem 1.5rem', borderRadius: 9,
                      background: color, color: '#fff', fontSize: '.88rem', fontWeight: 800,
                      transition: 'opacity .18s',
                    }}>
                      Talk to an Expert
                    </a>
                  </div>

                  {faqs.map((faq, i) => (
                    <div key={i} className="faq-item">
                      <button
                        className={`faq-q${openFaq === i ? ' open' : ''}`}
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        type="button"
                      >
                        {faq.q}
                        <span
                          className="faq-icon"
                          style={openFaq === i ? { background: color, borderColor: color, color: '#fff' } : {}}
                        >+</span>
                      </button>
                      {openFaq === i && <div className="faq-a">{faq.a}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
