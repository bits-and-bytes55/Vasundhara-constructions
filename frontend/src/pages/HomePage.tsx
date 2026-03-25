import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { fetchHomeContent } from '../api/content'
import { fetchHealth } from '../api/client'
import { defaultHomeContent } from '../data/defaultHomeContent'
import { packageDocs } from '../data/packageDocs'
import { getPackagePreviewPoints } from '../data/packageUtils'
import type { HomeContent } from '../types/homeContent'

type ServiceIcon = 'construction' | 'interiors' | 'elevations' | 'terrace'
type ProcessIcon = 'consultation' | 'design' | 'cost' | 'construction' | 'quality' | 'handover'
type WhyChooseIcon = 'experience' | 'checks' | 'architects' | 'contractors' | 'escrow' | 'tracking' | 'delivery'

const serviceCards = [
  { title: 'Construction', description: 'Quality civil construction delivered on time and within budget.', icon: 'construction' as ServiceIcon },
  { title: 'Interiors', description: 'Stylish, functional, and personalized interior designing.', icon: 'interiors' as ServiceIcon },
  { title: 'Elevations', description: 'Transform the front facade to stand out with a premium look.', icon: 'elevations' as ServiceIcon },
  { title: 'Terrace Garden', description: 'Refresh your rooftop with lush and serene outdoor spaces.', icon: 'terrace' as ServiceIcon },
]

const processSteps = [
  { title: 'Consultation', description: 'Discuss your requirements', icon: 'consultation' as ProcessIcon },
  { title: 'Design & Planning', description: 'Craft detailed designs & plans', icon: 'design' as ProcessIcon },
  { title: 'Cost Finalization', description: 'Get a transparent quote', icon: 'cost' as ProcessIcon },
  { title: 'Construction Phase', description: 'Begin construction of your home', icon: 'construction' as ProcessIcon },
  { title: 'Quality Checks', description: 'Conduct rigorous inspections', icon: 'quality' as ProcessIcon },
  { title: 'Final Handover', description: 'Deliver your dream home', icon: 'handover' as ProcessIcon },
]

const dreamSlides = [
  { label: 'Modern Living Room', bg: '#fde8e0', image: '/images/dream-living-room.jpeg' },
  { label: 'Master Bedroom', bg: '#fce4ec', image: '/images/dream-master-bed-room.jpeg' },
  { label: 'Kitchen Design', bg: '#e8f5e9', image: '/images/dream-kitchen.jpeg' },
  { label: 'Elevation View', bg: '#fff3e0', image: '/images/dream-elevation.jpeg' },
]

const testimonials = [
  { quote: 'WallBolt delivered our home on time with exceptional quality. The entire process was smooth and completely hassle-free!', author: 'Priya Sharma', location: 'Bengaluru', initials: 'PS', rating: 5 },
  { quote: 'Amazing experience! They turned our ideas into reality while staying transparent and professional throughout.', author: 'Rahul Verma', location: 'Hyderabad', initials: 'RV', rating: 5 },
  { quote: 'The quality checks at every stage gave us confidence. Truly a world-class construction experience.', author: 'Anjali Mehta', location: 'Chennai', initials: 'AM', rating: 5 },
  { quote: 'Escrow payment system is a game changer. We felt safe every step of the way. Highly recommend!', author: 'Suresh Iyer', location: 'Pune', initials: 'SI', rating: 5 },
  { quote: 'From design to handover, every milestone was met perfectly. Our dream home is now a beautiful reality!', author: 'Deepa Nair', location: 'Mumbai', initials: 'DN', rating: 5 },
]

const whyPoints = [
  { icon: 'experience' as WhyChooseIcon, title: '15+ Years Experience', desc: 'Proven track record of excellence in construction.' },
  { icon: 'checks' as WhyChooseIcon, title: '500+ Quality Checks', desc: 'Rigorous inspections at every stage of construction.' },
  { icon: 'architects' as WhyChooseIcon, title: 'In-House Architects', desc: 'Dedicated in-house experts for superior designs.' },
  { icon: 'contractors' as WhyChooseIcon, title: 'No Third-Party Contractors', desc: 'We handle everything directly for quality control.' },
  { icon: 'escrow' as WhyChooseIcon, title: 'Escrow Protected Payments', desc: 'Payments held securely until milestones are met.' },
  { icon: 'tracking' as WhyChooseIcon, title: 'Live Project Tracking', desc: 'Monitor progress in real-time through our app.' },
  { icon: 'delivery' as WhyChooseIcon, title: 'On-Time Delivery', desc: 'Clear schedules and disciplined execution always.' },
]

const whySlides = [
  { image: '/images/why-choose-us.jpeg', label: '500+ quality checks on every build' },
  { image: '/images/heroimg.jpeg', label: 'Modern facades with premium detailing' },
  { image: '/images/luxury-villa.jpg', label: 'Luxury residences delivered with discipline' },
  { image: '/images/dream-elevation.jpeg', label: 'Elevation planning that boosts curb appeal' },
]

const ceoData = {
  name: 'Ashu Saifi',
  role: 'CEO & Founder',
  intro: 'With over 15 years of experience, I ensure every project is delivered with precision and trust.',
  message: "At WallBolt Atelier, we don't just build structures — we craft lifestyles.",
}

const footerServices = ['Construction', 'Interiors', 'Elevations', 'Terrace Garden', 'Luxury Bathrooms', 'Custom Furniture']
const footerSocials = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'fb' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'tw' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'li' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'ig' },
]

const heroImageSrc = '/images/heroimg.jpeg'

const trustStats = [
  { icon: '🏆', value: '15+', label: 'Years of Experience', sub: 'Proven excellence in construction' },
  { icon: '✅', value: '500+', label: 'Quality Checks', sub: 'Per project, every milestone' },
  { icon: '🔒', value: '100%', label: 'Escrow Protected', sub: 'Secure payment system' },
  { icon: '🏡', value: '10,000+', label: 'Homes Delivered', sub: 'Across 10+ cities in India' },
  { icon: '⭐', value: '4.9/5', label: 'Customer Rating', sub: 'Rated by 2,500+ homeowners' },
  { icon: '🏙️', value: '10+', label: 'Cities Served', sub: 'And expanding across India' },
]

const wd = (d: number): CSSProperties => ({ '--delay': `${d}ms` } as CSSProperties)

/* ─── SVG icons ──────────────────────────────────────── */
const ServiceSvg = ({ k }: { k: ServiceIcon }) => (
  <svg viewBox="0 0 48 48" fill="none" width="100%" height="100%">
    {k === 'construction' && <><rect x="8" y="14" width="32" height="26" rx="3" stroke="#e8501e" strokeWidth="2.5" /><path d="M18 14v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" stroke="#e8501e" strokeWidth="2.5" /><path d="M15 23h18M15 30h18M15 37h10" stroke="#e8501e" strokeWidth="2.5" strokeLinecap="round" /></>}
    {k === 'interiors' && <><rect x="8" y="22" width="22" height="10" rx="3" stroke="#e8501e" strokeWidth="2.5" /><path d="M11 32v4M26 32v4M14 22v-4a5 5 0 0 1 10 0v4M36 10v28M33 10h6" stroke="#e8501e" strokeWidth="2.5" strokeLinecap="round" /></>}
    {k === 'elevations' && <><path d="M6 24 24 10l18 14v18H6z" stroke="#e8501e" strokeWidth="2.5" /><path d="M19 42v-11a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11" stroke="#e8501e" strokeWidth="2.5" /></>}
    {k === 'terrace' && <><circle cx="24" cy="16" r="6" stroke="#e8501e" strokeWidth="2.5" /><path d="M12 40s2-8 12-8 12 8 12 8M24 22v10" stroke="#e8501e" strokeWidth="2.5" strokeLinecap="round" /></>}
  </svg>
)

const WhySvg = ({ k }: { k: WhyChooseIcon }) => (
  <svg viewBox="0 0 28 28" fill="none" width="100%" height="100%">
    {k === 'experience' && <><circle cx="14" cy="14" r="11" stroke="#e8501e" strokeWidth="1.8" /><path d="M14 8v6.5l3.5 2" stroke="#e8501e" strokeWidth="1.8" strokeLinecap="round" /></>}
    {k === 'checks' && <><circle cx="12" cy="12" r="7" stroke="#e8501e" strokeWidth="1.8" /><path d="m17.5 17.5 4 4" stroke="#e8501e" strokeWidth="1.8" strokeLinecap="round" /></>}
    {k === 'architects' && <><path d="M4 13 14 5l10 8" stroke="#e8501e" strokeWidth="1.8" strokeLinecap="round" /><path d="M7 12v11h14V12" stroke="#e8501e" strokeWidth="1.8" /></>}
    {k === 'contractors' && <><circle cx="14" cy="14" r="10" stroke="#e8501e" strokeWidth="1.8" /><path d="m9 9 10 10M19 9 9 19" stroke="#e8501e" strokeWidth="1.8" strokeLinecap="round" /></>}
    {k === 'escrow' && <><path d="M14 3 24 7v7c0 6-3.5 10.5-10 12.5C7.5 24.5 4 20 4 14V7z" stroke="#e8501e" strokeWidth="1.8" /><path d="m10 14 3 3 5-5" stroke="#e8501e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>}
    {k === 'tracking' && <><rect x="7" y="3" width="14" height="22" rx="3" stroke="#e8501e" strokeWidth="1.8" /><path d="M11 9h6M11 14h6M11 19h4" stroke="#e8501e" strokeWidth="1.8" strokeLinecap="round" /></>}
    {k === 'delivery' && <><circle cx="14" cy="14" r="10" stroke="#e8501e" strokeWidth="1.8" /><path d="M14 7v7.5l4 2" stroke="#e8501e" strokeWidth="1.8" strokeLinecap="round" /></>}
  </svg>
)

const ProcSvg = ({ k }: { k: ProcessIcon }) => (
  <svg viewBox="0 0 36 36" fill="none" width="100%" height="100%">
    {k === 'consultation' && <><rect x="5" y="4" width="20" height="26" rx="3" stroke="#e8501e" strokeWidth="2" /><path d="M9 11h12M9 17h12M9 23h7" stroke="#e8501e" strokeWidth="2" strokeLinecap="round" /><path d="M23 24l6 6-2 2-6-6-.5-2z" fill="#e8501e" /></>}
    {k === 'design' && <><rect x="5" y="7" width="26" height="22" rx="3" stroke="#e8501e" strokeWidth="2" /><path d="m14 20 7-7 3 3-7 7-3.5.5z" stroke="#e8501e" strokeWidth="1.8" strokeLinejoin="round" /></>}
    {k === 'cost' && <><rect x="4" y="4" width="16" height="24" rx="2" stroke="#e8501e" strokeWidth="2" /><circle cx="27" cy="25" r="6" stroke="#e8501e" strokeWidth="2" /><path d="M27 21v8M24 25h6" stroke="#e8501e" strokeWidth="2" strokeLinecap="round" /></>}
    {k === 'construction' && <><path d="M4 31h28M9 31V20M18 31V12M27 31V20" stroke="#e8501e" strokeWidth="2" strokeLinecap="round" /></>}
    {k === 'quality' && <><circle cx="15" cy="15" r="9" stroke="#e8501e" strokeWidth="2" /><path d="m22 22 7 7" stroke="#e8501e" strokeWidth="2" strokeLinecap="round" /><path d="m11 15 3 3 5-5" stroke="#e8501e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>}
    {k === 'handover' && <><path d="M4 18 18 7l14 11" stroke="#e8501e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 17v14h18V17" stroke="#e8501e" strokeWidth="2" /><path d="M14 26h8M18 22v8" stroke="#e8501e" strokeWidth="2" strokeLinecap="round" /></>}
  </svg>
)

/* ═══════════════════════════════════════════════════════════ */
function HomePage() {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const [homeContent, setHomeContent] = useState<HomeContent>(defaultHomeContent)
  const [dreamSlide, setDreamSlide] = useState(0)
  const [whySlide, setWhySlide] = useState(0)
  const [projectSlide, setProjectSlide] = useState(0)
  const [testiPage, setTestiPage] = useState(0)
  const [typedHeroWord, setTypedHeroWord] = useState('')
  const [heroWordIndex, setHeroWordIndex] = useState(0)
  const [isDeletingHeroWord, setIsDeletingHeroWord] = useState(false)
  const [ceoImg, setCeoImg] = useState('/images/ashushafi.png')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const testiPerPage = 3
  const testiPages = Math.ceil(testimonials.length / testiPerPage)
  const projectItems = homeContent.projects.items.length > 0 ? homeContent.projects.items : defaultHomeContent.projects.items
  const projectSlideCount = Math.max(1, ...projectItems.map((project) => project.images.length || 1))

  useEffect(() => {
    let alive = true
    fetchHealth()
      .then(() => { if (alive) setBackendStatus('online') })
      .catch(() => { if (alive) setBackendStatus('offline') })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    let alive = true

    fetchHomeContent()
      .then((content) => {
        if (alive) {
          setHomeContent(content)
        }
      })
      .catch(() => {
        if (alive) {
          setHomeContent(defaultHomeContent)
        }
      })

    return () => { alive = false }
  }, [])

  useEffect(() => {
    const slider = setInterval(() => setDreamSlide(p => (p + 1) % dreamSlides.length), 3400)
    return () => clearInterval(slider)
  }, [])

  useEffect(() => {
    const slider = setInterval(() => setWhySlide(p => (p + 1) % whySlides.length), 3600)
    return () => clearInterval(slider)
  }, [])

  useEffect(() => {
    const slider = setInterval(() => setProjectSlide(p => (p + 1) % projectSlideCount), 3800)
    return () => clearInterval(slider)
  }, [projectSlideCount])

  useEffect(() => {
    timerRef.current = setInterval(() => setTestiPage(p => (p + 1) % testiPages), 4500)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [testiPages])

  useEffect(() => {
    const heroTypedWordsList = homeContent.hero.typedWords.length > 0 ? homeContent.hero.typedWords : defaultHomeContent.hero.typedWords
    const currentWord = heroTypedWordsList[heroWordIndex]

    if (!currentWord) {
      return
    }

    const atWordEnd = typedHeroWord === currentWord
    const atWordStart = typedHeroWord === ''
    const delay = !isDeletingHeroWord && atWordEnd ? 1350 : isDeletingHeroWord ? 55 : 95

    const timeout = window.setTimeout(() => {
      if (!isDeletingHeroWord) {
        if (atWordEnd) {
          setIsDeletingHeroWord(true)
          return
        }

        setTypedHeroWord(currentWord.slice(0, typedHeroWord.length + 1))
        return
      }

      if (!atWordStart) {
        setTypedHeroWord(currentWord.slice(0, typedHeroWord.length - 1))
        return
      }

      setIsDeletingHeroWord(false)
      setHeroWordIndex(prev => (prev + 1) % heroTypedWordsList.length)
    }, delay)

    return () => clearTimeout(timeout)
  }, [heroWordIndex, homeContent.hero.typedWords, isDeletingHeroWord, typedHeroWord])

  useEffect(() => {
    setTypedHeroWord('')
    setHeroWordIndex(0)
    setIsDeletingHeroWord(false)
  }, [homeContent.hero.typedWords])

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('v') }),
      { threshold: 0.07 }
    )
    document.querySelectorAll('.r').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const visibleTestis = testimonials.slice(testiPage * testiPerPage, testiPage * testiPerPage + testiPerPage)
  const heroContent = homeContent.hero
  const servicesContent = homeContent.services
  const processContent = homeContent.process
  const ceoContent = homeContent.ceo
  const ctaContent = homeContent.cta
  const projectContent = homeContent.projects
  const heroPills = heroContent.pills.length > 0 ? heroContent.pills : defaultHomeContent.hero.pills
  const heroStats = heroContent.stats.length > 0 ? heroContent.stats : defaultHomeContent.hero.stats
  const serviceCardsData = (servicesContent.cards.length > 0 ? servicesContent.cards : defaultHomeContent.services.cards).map((card, index) => ({
    ...card,
    icon: serviceCards[index]?.icon ?? ('construction' as ServiceIcon),
  }))
  const processStepsData = (processContent.steps.length > 0 ? processContent.steps : defaultHomeContent.process.steps).map((step, index) => ({
    ...step,
    icon: processSteps[index]?.icon ?? ('consultation' as ProcessIcon),
  }))
  const ctaPerks = ctaContent.perks.length > 0 ? ctaContent.perks : defaultHomeContent.cta.perks
  const featuredProjects = projectContent.items.length > 0 ? projectContent.items : defaultHomeContent.projects.items

  return (
    <>
      <style>{`
        /* ── tokens ── */
        :root {
          --or: #e8501e;
          --or2: #c93e0d;
          --orL: #fff5f2;
          --orM: #fde8e0;
          --dk: #1c1c1e;
          --tx: #2d2d2d;
          --mt: #5a5a5a;
          --mt2: #888;
          --bd: #e5e5e5;
          --bg: #ffffff;
          --bg2: #f7f7f7;
          --bg3: #efefef;
          --r: 10px;
          --rl: 18px;
          --sh: 0 2px 18px rgba(0,0,0,.07);
          --shm: 0 6px 32px rgba(0,0,0,.11);
          --ease: cubic-bezier(.16,1,.3,1);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { background: var(--bg); color: var(--tx); font-family: 'Nunito Sans', 'Segoe UI', 'Helvetica Neue', sans-serif; overflow-x: hidden; line-height: 1.6; }
        a { color: inherit; text-decoration: none; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }
        img { display: block; max-width: 100%; }
        ul { list-style: none; }

        /* ── reveal ── */
        .r { opacity: 0; transform: translateY(24px); transition: opacity .55s var(--ease), transform .55s var(--ease); transition-delay: var(--delay, 0ms); }
        .r.v { opacity: 1; transform: none; }

        /* ── layout ── */
        .w { max-width: 1260px; margin: 0 auto; padding: 0 clamp(1.25rem, 4vw, 2.5rem); }
        .sec { padding: clamp(4rem, 8vw, 7rem) 0; }

        /* ── section heading ── */
        .sh { margin-bottom: clamp(2.5rem, 4vw, 3.5rem); }
        .sh.c { text-align: center; }
        .ey { font-size: .85rem; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: var(--or); display: inline-block; margin-bottom: .65rem; }
        .sh h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: var(--dk); line-height: 1.15; letter-spacing: -.025em; }
        .sh h2 em { color: var(--or); font-style: normal; }
        .sh p { font-size: 1.05rem; color: var(--mt); line-height: 1.7; margin-top: .75rem; max-width: 560px; }
        .sh.c p { margin-inline: auto; }

        /* ── buttons ── */
        .btn { display: inline-flex; align-items: center; gap: .5rem; padding: .95rem 2.2rem; font-size: 1rem; font-weight: 800; border-radius: var(--r); transition: all .22s ease; letter-spacing: .01em; }
        .btn-p { background: var(--or); color: #fff; box-shadow: 0 4px 16px rgba(232,80,30,.28); }
        .btn-p:hover { background: var(--or2); box-shadow: 0 6px 24px rgba(232,80,30,.42); transform: translateY(-1px); }
        .btn-o { border: 2px solid var(--or); color: var(--or); background: transparent; }
        .btn-o:hover { background: var(--or); color: #fff; }
        .btn-w { background: #fff; color: var(--or); font-weight: 800; box-shadow: var(--sh); }
        .btn-w:hover { background: var(--orL); }

        /* ══ NAVBAR ══ */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 900; background: #fff; border-bottom: 1px solid var(--bd); box-shadow: 0 1px 10px rgba(0,0,0,.05); }
        .nav-in { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 1.5rem; }
        .logo { font-size: 1.45rem; font-weight: 900; color: var(--dk); letter-spacing: -.025em; flex-shrink: 0; }
        .logo em { color: var(--or); font-style: normal; }
        .nav-links { display: flex; align-items: center; gap: .2rem; }
        .nav-links a { font-size: .95rem; font-weight: 700; color: var(--mt); padding: .45rem .85rem; border-radius: 8px; transition: color .2s, background .2s; position: relative; }
        .nav-links a:hover { color: var(--or); background: var(--orL); }
        .nav-links a.more { display: flex; align-items: center; gap: .25rem; }
        .nav-links a.more::after { content: '▾'; font-size: .7rem; }
        @media (max-width: 1024px) { .nav-links { display: none; } }

        /* ══ HERO ══ */
        .hero { min-height: calc(100svh - var(--site-header-height)); display: flex; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; width: 100%; min-height: calc(100svh - 72px); }
        @media (max-width: 860px) { .hero-grid { grid-template-columns: 1fr; } }
        .hero-left { display: flex; flex-direction: column; justify-content: center; padding: clamp(2.5rem,5vw,5rem) clamp(1.5rem,4vw,3rem) clamp(2.5rem,5vw,5rem) clamp(1.5rem,5vw,3.5rem); }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: .5rem; font-size: .85rem; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; color: var(--or); margin-bottom: 1.25rem; }
        .hero-eyebrow::before { content: ''; width: 1.2rem; height: 2px; background: var(--or); }
        .hero h1 { font-size: clamp(2.4rem, 5.5vw, 4rem); font-weight: 900; line-height: 1.1; color: var(--dk); margin-bottom: 1.25rem; letter-spacing: -.03em; }
        .hero h1 em { color: var(--or); font-style: normal; }
        .hero-type-lock { display: inline-flex; align-items: center; gap: .12em; min-height: 1.2em; }
        .hero-typed-word { color: var(--or); font-style: normal; }
        .hero-type-caret { width: .09em; height: .9em; border-radius: 999px; background: currentColor; animation: hero-caret 1s step-end infinite; }
        .hero-sub { font-size: 1.1rem; color: var(--mt); line-height: 1.7; margin-bottom: 2rem; max-width: 480px; }
        .hero-pills { display: flex; flex-wrap: wrap; gap: .6rem; margin-bottom: 2rem; }
        .hero-pill { display: flex; align-items: center; gap: .4rem; font-size: .9rem; font-weight: 700; color: var(--dk); background: var(--bg2); border: 1.5px solid var(--bd); padding: .42rem 1rem; border-radius: 30px; }
        .hero-pill svg { width: 17px; height: 17px; }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
        .hero-stats { display: flex; gap: 2rem; flex-wrap: wrap; padding-top: 2rem; border-top: 1px solid var(--bd); }
        .hero-stat strong { display: block; font-size: 2rem; font-weight: 900; color: var(--or); line-height: 1; }
        .hero-stat span { font-size: .85rem; color: var(--mt); margin-top: .2rem; display: block; font-weight: 600; }
        .api-pill { font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: .35rem .85rem; border-radius: 20px; display: inline-block; margin-top: 1rem; border: 1.5px solid var(--bd); color: var(--mt2); background: var(--bg2); }
        .api-pill.on { color: #2e7d32; border-color: #a5d6a7; background: #f1f8f1; }
        .api-pill.off { color: #c62828; border-color: #ef9a9a; background: #fef2f2; }
        .hero-right { position: relative; overflow: hidden; display: flex; align-items: flex-end; justify-content: flex-start; min-height: 100%; isolation: isolate; background: #e8ddd5; }
        .hero-right::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.06) 0%, rgba(0,0,0,.28) 100%); z-index: 0; }
        .hero-media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .hero-badge { position: absolute; bottom: 2rem; left: 2rem; z-index: 1; background: rgba(255,255,255,.94); border-radius: var(--rl); padding: 1.1rem 1.5rem; box-shadow: var(--shm); display: flex; align-items: center; gap: .8rem; backdrop-filter: blur(8px); }
        .hero-badge-icon { width: 2.6rem; height: 2.6rem; background: var(--orL); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .hero-badge strong { display: block; font-size: 1rem; font-weight: 800; color: var(--dk); }
        .hero-badge span { font-size: .8rem; color: var(--mt); }
        @media (max-width: 860px) {
          .hero-right { min-height: 420px; }
          .hero-badge { bottom: 1.25rem; left: 1.25rem; right: 1.25rem; }
        }

        /* ══ STRIP ══ */
        .strip { background: var(--or); padding: 1.2rem 0; }
        .strip-in { display: flex; align-items: center; justify-content: space-around; gap: 1rem; flex-wrap: wrap; }
        .strip-item { display: flex; align-items: center; gap: .55rem; color: #fff; font-size: .92rem; font-weight: 700; }

        /* ══ TRUST & RECOGNITION ══ */
        .trust-sec { background: var(--bg2); }
        .trust-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        @media (max-width: 900px) { .trust-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .trust-grid { grid-template-columns: 1fr; } }
        .trust-card {
          background: #fff;
          border: 1.5px solid var(--bd);
          border-radius: var(--rl);
          padding: 2.25rem 2rem;
          display: flex;
          align-items: flex-start;
          gap: 1.4rem;
          box-shadow: var(--sh);
          transition: all .3s ease;
        }
        .trust-card:hover { border-color: var(--or); box-shadow: 0 8px 32px rgba(232,80,30,.1); transform: translateY(-3px); }
        .trust-icon { font-size: 2.4rem; flex-shrink: 0; width: 3.5rem; text-align: center; }
        .trust-text {}
        .trust-value { font-size: 2.2rem; font-weight: 900; color: var(--or); line-height: 1; letter-spacing: -.02em; }
        .trust-label { font-size: 1.05rem; font-weight: 800; color: var(--dk); margin-top: .3rem; }
        .trust-sub { font-size: .88rem; color: var(--mt); margin-top: .25rem; line-height: 1.5; }

        /* ══ WHY FEATURE CARDS ══ */
        .why-cards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        @media (max-width: 900px) { .why-cards-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .why-cards-grid { grid-template-columns: 1fr; } }
        .why-feat-card { background: #fff; border: 1.5px solid var(--bd); border-radius: var(--rl); padding: 2rem 1.75rem; transition: all .3s; }
        .why-feat-card:hover { border-color: var(--or); box-shadow: 0 8px 28px rgba(232,80,30,.1); transform: translateY(-4px); }
        .why-feat-icon { width: 3.2rem; height: 3.2rem; background: var(--orL); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1.1rem; }
        .why-feat-icon svg { width: 1.5rem; height: 1.5rem; }
        .why-feat-card h3 { font-size: 1.05rem; font-weight: 800; color: var(--dk); margin-bottom: .45rem; }
        .why-feat-card p { font-size: .92rem; color: var(--mt); line-height: 1.6; }

        /* ══ DREAM ══ */
        .dream { background: #fff; }
        .dream-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4.5rem; align-items: center; }
        @media (max-width: 860px) { .dream-grid { grid-template-columns: 1fr; gap: 3rem; } }
        .dream-copy h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: var(--dk); line-height: 1.15; margin-bottom: .5rem; letter-spacing: -.025em; }
        .dream-copy h2 em { color: var(--or); font-style: normal; }
        .dream-with { font-size: 1rem; font-weight: 600; color: var(--mt); margin-bottom: 2rem; }
        .dream-with strong { color: var(--or); }
        .dream-pills { display: flex; flex-direction: column; gap: .85rem; margin-bottom: 2rem; }
        .dream-pill { display: flex; align-items: center; gap: .8rem; font-size: 1rem; font-weight: 700; color: var(--dk); }
        .dream-pill::before { content: ''; width: .55rem; height: .55rem; border-radius: 50%; background: var(--or); flex-shrink: 0; }
        .dream-badges { display: flex; flex-wrap: wrap; gap: .55rem; margin-bottom: 2rem; }
        .dream-badge { font-size: .82rem; font-weight: 700; color: var(--mt); padding: .42rem 1rem; border: 1.5px solid var(--bd); border-radius: 30px; background: #fff; }
        .dream-badge.a { color: var(--or); border-color: rgba(232,80,30,.3); background: var(--orL); }
        /* dream slider */
        .d-slider { position: relative; border-radius: var(--rl); overflow: hidden; box-shadow: var(--shm); }
        .d-track { display: flex; transition: transform .45s var(--ease); }
        .d-slide { min-width: 100%; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; position: relative; }
        .d-slide-label { position: absolute; bottom: 1rem; left: 1rem; background: rgba(0,0,0,.55); color: #fff; font-size: .82rem; font-weight: 700; padding: .38rem .9rem; border-radius: 30px; }
        .sl-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 2.5rem; height: 2.5rem; border-radius: 50%; background: #fff; box-shadow: var(--sh); display: flex; align-items: center; justify-content: center; color: var(--or); font-size: 1.2rem; font-weight: 900; z-index: 4; cursor: pointer; transition: all .2s; }
        .sl-btn:hover { background: var(--or); color: #fff; }
        .sl-l { left: .75rem; }
        .sl-r { right: .75rem; }
        .sl-dots { position: absolute; bottom: .75rem; left: 50%; transform: translateX(-50%); display: flex; gap: .45rem; }
        .sl-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.5); border: none; cursor: pointer; transition: all .2s; }
        .sl-dot.a { background: #fff; transform: scale(1.3); }

        /* ══ SERVICES ══ */
        .svc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        @media (max-width: 900px) { .svc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .svc-grid { grid-template-columns: 1fr; } }
        .svc-card { background: #fff; border: 1.5px solid var(--bd); border-radius: var(--rl); padding: 2.25rem 2rem; display: flex; flex-direction: column; gap: 1rem; transition: all .3s; position: relative; overflow: hidden; }
        .svc-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--or); transform: scaleX(0); transition: transform .35s ease; transform-origin: left; }
        .svc-card:hover { box-shadow: var(--shm); transform: translateY(-4px); }
        .svc-card:hover::after { transform: scaleX(1); }
        .svc-icon { width: 3.5rem; height: 3.5rem; }
        .svc-icon svg { width: 100%; height: 100%; }
        .svc-card h3 { font-size: 1.15rem; font-weight: 800; color: var(--dk); }
        .svc-card p { font-size: .92rem; color: var(--mt); line-height: 1.65; }
        .svc-link { font-size: .88rem; font-weight: 800; color: var(--or); margin-top: auto; opacity: 0; transition: opacity .25s; }
        .svc-card:hover .svc-link { opacity: 1; }

        /* ══ ESTIMATE ══ */
        .est { background: linear-gradient(135deg, var(--dk) 0%, #2c2c2e 100%); }
        .est-grid { display: grid; grid-template-columns: 1fr 420px; gap: 4.5rem; align-items: center; }
        @media (max-width: 860px) { .est-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
        .est h2 { font-size: clamp(1.9rem, 3.5vw, 2.6rem); font-weight: 900; color: #fff; line-height: 1.2; margin-bottom: 1.1rem; letter-spacing: -.025em; }
        .est h2 em { color: var(--or); font-style: normal; }
        .est-desc { color: rgba(255,255,255,.6); font-size: 1rem; line-height: 1.75; margin-bottom: 2rem; }
        .calc { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: var(--rl); padding: 1.5rem; position: relative; }
        .calc-scr { background: rgba(255,255,255,.08); border: 1px solid rgba(232,80,30,.3); border-radius: var(--r); padding: 1rem 1.5rem; text-align: right; font-size: 2rem; font-weight: 900; color: var(--or); margin-bottom: 1rem; font-family: monospace; }
        .calc-keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: .5rem; }
        .calc-key { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; padding: .75rem; text-align: center; font-size: .9rem; color: rgba(255,255,255,.65); font-weight: 700; cursor: pointer; transition: all .2s; }
        .calc-key:hover { background: rgba(232,80,30,.2); border-color: var(--or); color: #fff; }
        .calc-key.op { color: var(--or); font-weight: 900; }
        .rupee { position: absolute; right: 1.5rem; top: 1rem; font-size: 3.5rem; color: rgba(232,80,30,.08); pointer-events: none; font-weight: 900; animation: flt 5s ease-in-out infinite; }
        @keyframes flt { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

        /* ══ PROCESS ══ */
        .proc-track { display: flex; align-items: flex-start; overflow-x: auto; padding-bottom: .5rem; margin-bottom: 3rem; }
        .proc-track::-webkit-scrollbar { height: 3px; }
        .proc-track::-webkit-scrollbar-thumb { background: var(--or); }
        .proc-step { display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 90px; }
        .proc-row { display: flex; align-items: center; width: 100%; }
        .proc-bub { width: 2.8rem; height: 2.8rem; border-radius: 50%; background: var(--orL); border: 2px solid var(--or); display: flex; align-items: center; justify-content: center; color: var(--or); font-size: .9rem; font-weight: 900; flex-shrink: 0; transition: all .3s; }
        .proc-step:hover .proc-bub { background: var(--or); color: #fff; }
        .proc-line { flex: 1; height: 2px; background: linear-gradient(90deg, var(--or), rgba(232,80,30,.15)); margin-top: 1.35rem; min-width: 1.5rem; }
        .proc-title { font-size: .78rem; font-weight: 700; color: var(--mt); margin-top: .5rem; text-align: center; padding: 0 .2rem; }
        .proc-cards { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.4rem; }
        @media (max-width: 1080px) { .proc-cards { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px) { .proc-cards { grid-template-columns: repeat(2, 1fr); } }
        .proc-card { background: #fff; border: 1.5px solid var(--bd); border-radius: var(--rl); padding: 1.6rem 1.4rem; transition: all .3s; }
        .proc-card:hover { border-color: var(--or); box-shadow: 0 6px 20px rgba(232,80,30,.1); }
        .proc-card-icon { width: 2.6rem; height: 2.6rem; margin-bottom: .9rem; }
        .proc-card-icon svg { width: 100%; height: 100%; }
        .proc-card h3 { font-size: .95rem; font-weight: 800; color: var(--dk); margin-bottom: .35rem; }
        .proc-card p { font-size: .85rem; color: var(--mt); line-height: 1.55; }

        /* ══ PRICING ══ */
        .pkg-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem; }
        .pkg-card { background: #fff; border: 2px solid var(--bd); border-radius: var(--rl); padding: 1.9rem 1.6rem; height: 100%; display: flex; flex-direction: column; gap: .8rem; transition: all .3s; position: relative; }
        .pkg-card:hover { border-color: var(--or); box-shadow: 0 8px 32px rgba(232,80,30,.12); transform: translateY(-3px); }
        .pkg-card.pop { border-color: var(--or); }
        .pop-badge { position: absolute; top: -1px; right: 1.2rem; background: var(--or); color: #fff; font-size: .7rem; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; padding: .3rem .75rem; border-radius: 0 0 8px 8px; }
        .pkg-card h3 { font-size: 1.1rem; font-weight: 900; color: var(--dk); }
        .pkg-price { font-size: 1.35rem; font-weight: 900; color: var(--or); }
        .pkg-lbl { font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--mt2); }
        .pkg-card ul { display: flex; flex-direction: column; gap: .5rem; flex: 1; margin-top: .3rem; }
        .pkg-card li { font-size: .88rem; color: var(--mt); display: flex; align-items: flex-start; gap: .5rem; line-height: 1.5; }
        .pkg-card li::before { content: '✓'; color: var(--or); font-weight: 900; font-size: .85rem; flex-shrink: 0; }
        .pkg-cta { font-size: .8rem; font-weight: 800; color: var(--or); margin-top: auto; }
        .pkg-act { text-align: center; }

        /* ══ CEO ══ */
        .ceo-grid { display: grid; grid-template-columns: 1fr 400px; gap: 5rem; align-items: center; }
        @media (max-width: 860px) { .ceo-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
        .ceo-name { font-size: 1.15rem; font-weight: 900; color: var(--dk); }
        .ceo-role { font-size: .82rem; font-weight: 800; color: var(--or); text-transform: uppercase; letter-spacing: .12em; margin-bottom: 1.25rem; }
        .ceo-intro { font-size: 1rem; color: var(--mt); line-height: 1.75; margin-bottom: 1rem; }
        .ceo-quote { border-left: 3px solid var(--or); padding-left: 1.1rem; font-size: 1.05rem; font-style: italic; color: var(--dk); line-height: 1.65; margin-bottom: 2rem; }
        .ceo-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; border-radius: var(--rl); box-shadow: var(--shm); }
        .ceo-ph { width: 100%; aspect-ratio: 3/4; background: var(--bg3); border-radius: var(--rl); border: 1px solid var(--bd); display: flex; align-items: center; justify-content: center; font-size: 4.5rem; color: rgba(232,80,30,.15); }

        /* ══ PROJECTS ══ */
        #projects .sh p { display: none; }
        #projects .sh .proj-subtitle-live { display: block; }
        .proj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(275px, 1fr)); gap: 1.75rem; }
        .proj-card { background: #fff; border-radius: var(--rl); overflow: hidden; border: 1.5px solid var(--bd); box-shadow: var(--sh); transition: all .35s; }
        .proj-card:hover { transform: translateY(-5px); box-shadow: var(--shm); border-color: rgba(232,80,30,.25); }
        .proj-media { position: relative; aspect-ratio: 16/10; overflow: hidden; background: var(--bg3); }
        .proj-frame { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(1.03); transition: opacity .7s ease, transform .9s ease; }
        .proj-frame.a { opacity: 1; transform: scale(1); }
        .proj-card:hover .proj-frame.a { transform: scale(1.07); }
        .proj-ph { position: absolute; inset: 0; background: linear-gradient(135deg, #f5e8e0, #fdeee8); display: flex; align-items: center; justify-content: center; font-size: 3rem; color: rgba(232,80,30,.2); }
        .proj-tag { position: absolute; top: .9rem; left: .9rem; background: var(--or); color: #fff; font-size: .72rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; padding: .3rem .8rem; border-radius: 30px; }
        .proj-dots { position: absolute; left: .9rem; bottom: .9rem; z-index: 2; display: inline-flex; gap: .38rem; padding: .38rem .45rem; border-radius: 999px; background: rgba(15,15,19,.26); backdrop-filter: blur(8px); }
        .proj-dot { width: .42rem; height: .42rem; border-radius: 999px; background: rgba(255,255,255,.4); transition: all .28s ease; }
        .proj-dot.a { width: 1.05rem; background: #fff; }
        .proj-body { padding: 1.35rem 1.5rem 1.6rem; }
        .proj-body h3 { font-size: 1.05rem; font-weight: 800; color: var(--dk); margin-bottom: .35rem; }
        .proj-meta { font-size: .85rem; color: var(--mt); }

        /* ══ WHY CHOOSE LIST ══ */
        .why-layout { display: grid; grid-template-columns: 380px 1fr; gap: 4.5rem; align-items: start; }
        @media (max-width: 860px) { .why-layout { grid-template-columns: 1fr; gap: 2.5rem; } }
        .why-sticky { position: sticky; top: 5rem; }
        .why-media { position: relative; width: 100%; aspect-ratio: 4/5; overflow: hidden; border-radius: var(--rl); box-shadow: var(--shm); background: var(--bg3); }
        .why-media::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.04) 0%, rgba(0,0,0,.28) 100%); z-index: 1; pointer-events: none; }
        .why-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(1.03); transition: opacity .7s ease, transform .95s ease; }
        .why-img.a { opacity: 1; transform: scale(1); }
        .why-slide-meta { position: absolute; left: 1rem; right: 1rem; bottom: 1rem; z-index: 2; display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; padding: .95rem 1rem; border-radius: 16px; background: rgba(255,255,255,.92); box-shadow: 0 12px 24px rgba(0,0,0,.12); backdrop-filter: blur(10px); }
        .why-slide-copy strong { display: block; font-size: .98rem; font-weight: 900; color: var(--dk); }
        .why-slide-copy span { display: block; font-size: .76rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--or); margin-bottom: .25rem; }
        .why-slide-dots { display: inline-flex; gap: .35rem; flex-shrink: 0; }
        .why-slide-dot { width: .45rem; height: .45rem; border-radius: 999px; background: rgba(232,80,30,.25); transition: all .28s ease; }
        .why-slide-dot.a { width: 1.15rem; background: var(--or); }
        .why-ph { width: 100%; aspect-ratio: 4/5; background: var(--bg3); border-radius: var(--rl); border: 1px solid var(--bd); display: flex; align-items: center; justify-content: center; font-size: 4.5rem; color: rgba(232,80,30,.15); }
        .why-list { display: flex; flex-direction: column; gap: .8rem; }
        .why-item { display: flex; gap: 1.1rem; align-items: flex-start; padding: 1.2rem 1.4rem; border: 1.5px solid var(--bd); border-radius: var(--rl); background: #fff; transition: all .3s; }
        .why-item:hover { border-color: var(--or); box-shadow: 0 4px 16px rgba(232,80,30,.08); transform: translateX(4px); }
        .why-icon { width: 2.8rem; height: 2.8rem; background: var(--orL); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .why-icon svg { width: 1.3rem; height: 1.3rem; }
        .why-item h3 { font-size: .98rem; font-weight: 800; color: var(--dk); margin-bottom: .25rem; }
        .why-item p { font-size: .88rem; color: var(--mt); line-height: 1.55; }
        @media (max-width: 640px) { .why-slide-meta { flex-direction: column; align-items: flex-start; } }

        /* ══ CTA ══ */
        .cta { background: linear-gradient(135deg, var(--or) 0%, var(--or2) 100%); position: relative; overflow: hidden; }
        .cta::before { content: ''; position: absolute; right: -4rem; top: -4rem; width: 24rem; height: 24rem; border-radius: 50%; background: rgba(255,255,255,.06); pointer-events: none; }
        .cta-in { text-align: center; position: relative; }
        .cta-in h2 { font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 900; color: #fff; margin-bottom: .75rem; letter-spacing: -.025em; }
        .cta-sub { color: rgba(255,255,255,.8); font-size: 1rem; margin-bottom: 2.5rem; }
        .cta-perks { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin-top: 2rem; }
        .cta-perk { display: flex; align-items: center; gap: .5rem; font-size: .9rem; font-weight: 700; color: rgba(255,255,255,.9); }
        .cta-perk svg { width: 18px; height: 18px; }

        /* ══ TESTIMONIALS ══ */
        .testi-trust { text-align: center; font-size: .92rem; color: var(--mt); margin-bottom: 2.5rem; }
        .testi-trust .stars { color: var(--or); }
        .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.75rem; min-height: 260px; }
        @media (max-width: 860px) { .testi-grid { grid-template-columns: 1fr; } }
        .testi-card { background: #fff; border: 1.5px solid var(--bd); border-radius: var(--rl); padding: 2.1rem 1.9rem; display: flex; flex-direction: column; gap: 1rem; box-shadow: var(--sh); animation: fin .4s ease; }
        @keyframes fin { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes hero-caret { 50% { opacity: 0; } }
        .testi-head { display: flex; align-items: center; gap: .9rem; }
        .testi-av { width: 3rem; height: 3rem; border-radius: 50%; background: linear-gradient(135deg, var(--or), var(--or2)); display: flex; align-items: center; justify-content: center; font-size: .95rem; font-weight: 800; color: #fff; flex-shrink: 0; }
        .testi-name { font-size: .98rem; font-weight: 800; color: var(--dk); }
        .testi-loc { font-size: .78rem; color: var(--mt); }
        .testi-stars { color: var(--or); font-size: .92rem; letter-spacing: .05em; }
        .testi-q { font-size: .92rem; color: var(--mt); line-height: 1.72; font-style: italic; flex: 1; }
        .testi-q::before { content: '"'; font-size: 1.8rem; color: rgba(232,80,30,.22); line-height: 1; display: block; margin-bottom: -.35rem; font-style: normal; }
        .testi-ctrl { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 2.5rem; }
        .testi-btn { width: 2.6rem; height: 2.6rem; border-radius: 50%; border: 2px solid var(--bd); background: #fff; display: flex; align-items: center; justify-content: center; color: var(--or); font-size: 1.1rem; font-weight: 900; cursor: pointer; transition: all .2s; }
        .testi-btn:hover { background: var(--or); color: #fff; border-color: var(--or); }
        .testi-dots { display: flex; gap: .5rem; }
        .testi-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--bd); cursor: pointer; border: none; transition: all .2s; }
        .testi-dot.a { background: var(--or); transform: scale(1.3); }

        /* ══ FOOTER ══ */
        .ftr { background: #1c1c1e; color: rgba(255,255,255,.55); }
        .ftr-top { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; padding: clamp(3rem, 6vw, 5rem) 0; border-bottom: 1px solid rgba(255,255,255,.08); }
        @media (max-width: 768px) { .ftr-top { grid-template-columns: 1fr; gap: 2rem; } }
        .ftr-col h3 { font-size: .78rem; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; color: var(--or); margin-bottom: 1.4rem; }
        .ftr-col ul { display: flex; flex-direction: column; gap: .6rem; }
        .ftr-col li, .ftr-col a { font-size: .9rem; color: rgba(255,255,255,.4); transition: color .2s; }
        .ftr-col a:hover { color: var(--or); }
        .ftr-contact { display: flex; align-items: flex-start; gap: .65rem; font-size: .9rem; color: rgba(255,255,255,.4); margin-bottom: .7rem; }
        .ftr-wa { display: inline-flex; align-items: center; gap: .5rem; font-size: .82rem; font-weight: 700; color: #5cb85c; border: 1.5px solid rgba(92,184,92,.3); padding: .48rem 1rem; border-radius: 20px; margin-top: .6rem; transition: all .2s; }
        .ftr-wa:hover { background: rgba(92,184,92,.1); }
        .ftr-bot { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 1.6rem 0; flex-wrap: wrap; }
        .ftr-soc { display: flex; gap: .6rem; margin-bottom: .5rem; }
        .ftr-soc a { width: 2.3rem; height: 2.3rem; border-radius: 50%; border: 1px solid rgba(255,255,255,.12); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,.35); transition: all .2s; }
        .ftr-soc a svg { width: .95rem; height: .95rem; }
        .ftr-soc a:hover { border-color: var(--or); color: var(--or); }
        .ftr-copy { font-size: .75rem; color: rgba(255,255,255,.22); letter-spacing: .05em; }
        .ftr-trust { display: flex; gap: 1.2rem; flex-wrap: wrap; }
        .ftr-trust span { font-size: .72rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.28); }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav className="nav">
        <div className="w nav-in">
          <a className="logo" href="#home">Wall<em>Bolt</em> Atelier</a>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#company">Company Profile</a>
            <a href="#blogs">Blogs</a>
            <a href="#contact" className="more">More</a>
          </div>
          <button className="btn btn-p" style={{ padding: '.65rem 1.5rem', fontSize: '.9rem' }} type="button">
            Book Consultation
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero" id="home">
        <div className="hero-grid">
          <div className="hero-left r" style={wd(100)}>
            <p className="hero-eyebrow">{heroContent.eyebrow}</p>
            <h1>
              {heroContent.titleLineOne}<br />
              {heroContent.titleLineTwo}<br />
              <span className="hero-type-lock">
                <em className="hero-typed-word">{typedHeroWord || '\u00A0'}</em>
                <span className="hero-type-caret" aria-hidden="true" />
              </span>
            </h1>
            <p className="hero-sub">{heroContent.subtitle}</p>
            <div className="hero-pills">
              {heroPills.map(p => (
                <span key={p} className="hero-pill">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#e8501e" />
                    <path d="m7.5 12.5 3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </span>
              ))}
            </div>
            <div className="hero-actions">
              <Link className="btn btn-p" to="/cost-estimator">{heroContent.primaryCtaLabel}</Link>
              <Link className="btn btn-o" to="/projects">{heroContent.secondaryCtaLabel}</Link>
            </div>
            <div className="hero-stats">
              {heroStats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <span className={`api-pill${backendStatus === 'online' ? ' on' : backendStatus === 'offline' ? ' off' : ''}`}>
              {backendStatus === 'checking' ? '● Checking…' : backendStatus === 'online' ? '● System Online' : '● Unavailable'}
            </span>
          </div>

          <div className="hero-right r" style={wd(280)}>
            <img className="hero-media" src={heroImageSrc} alt="Modern luxury home exterior" />
            <div className="hero-badge">
              <div className="hero-badge-icon">🏠</div>
              <div>
                <strong>Dream Home Ready</strong>
                <span>Delivered on time, every time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ORANGE STRIP ══ */}
      <div className="strip">
        <div className="w strip-in">
          {[['🏆', '15+ Years Experience'], ['✅', '500+ Quality Checks'], ['🔒', 'Escrow Protected'], ['⚡', 'On-Time Delivery'], ['🏗️', '10,000+ Homes']].map(([ic, lb]) => (
            <div key={lb} className="strip-item"><span>{ic}</span>{lb}</div>
          ))}
        </div>
      </div>

      {/* ══ WHY FEATURE CARDS ══ */}
      <section className="sec" style={{ background: '#fff' }}>
        <div className="w">
          <div className="sh c r" style={wd(80)}>
            <span className="ey">Why WallBolt</span>
            <h2>Peace of mind, trust &amp; <em>transparent construction</em></h2>
          </div>
          <div className="why-cards-grid r" style={wd(160)}>
            {[
              { icon: 'escrow' as WhyChooseIcon, title: 'Safe Money Transaction', desc: 'No advance. Contractor paid only once work is complete.' },
              { icon: 'checks' as WhyChooseIcon, title: 'Absolute Transparency', desc: 'Clear detailed quotation and online project tracking.' },
              { icon: 'experience' as WhyChooseIcon, title: 'Assured Quality Control', desc: '500+ quality checks performed by our expert team.' },
              { icon: 'delivery' as WhyChooseIcon, title: 'Zero Delays', desc: 'Zero tolerance for delays. On-time delivery guaranteed.' },
            ].map(it => (
              <div key={it.title} className="why-feat-card">
                <div className="why-feat-icon"><WhySvg k={it.icon} /></div>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRUST & RECOGNITION — horizontal card layout ══ */}
      <section className="trust-sec sec" id="trust">
        <div className="w">
          <div className="sh c r" style={wd(80)}>
            <span className="ey">Trust &amp; Recognition</span>
            <h2>Why Thousands Choose <em>WallBolt</em></h2>
            <p>Our track record speaks for itself — quality, transparency, and trust at every step.</p>
          </div>
          <div className="trust-grid r" style={wd(160)}>
            {trustStats.map(ts => (
              <div key={ts.label} className="trust-card">
                <div className="trust-icon">{ts.icon}</div>
                <div className="trust-text">
                  <div className="trust-value">{ts.value}</div>
                  <div className="trust-label">{ts.label}</div>
                  <div className="trust-sub">{ts.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DREAM HOME ══ */}
      <section className="dream sec" id="dream">
        <div className="w">
          <div className="dream-grid">
            <div className="r" style={wd(100)}>
              <h2 className="dream-copy">
                Construct Your <em>Dream Home</em>
              </h2>
              <p className="dream-with" style={{ marginTop: '.5rem' }}>with <strong>WallBolt Atelier</strong></p>
              <div className="dream-pills">
                {['10,142+ Homes Built', '10+ Cities Served', 'On-Time Delivery'].map(d => (
                  <div key={d} className="dream-pill">{d}</div>
                ))}
              </div>
              <div className="dream-badges">
                {['Meta Verified', 'Award Winning', 'Trademark Registered'].map(b => (
                  <span key={b} className="dream-badge">{b}</span>
                ))}
                <span className="dream-badge a">🔒 Trusted Builder</span>
              </div>
              <button className="btn btn-p" type="button">Book Free Consultation</button>
            </div>

            <div className="r" style={wd(240)}>
              <div className="d-slider">
                <div className="d-track" style={{ transform: `translateX(-${dreamSlide * 100}%)` }}>
                  {dreamSlides.map((sl, i) => (
                    <div key={i} className="d-slide" style={{ background: sl.bg }}>
                  <img src={sl.image} alt={sl.label} onError={e => { e.currentTarget.style.display = 'none' }} />
                
                      <div className="d-slide-label">{sl.label}</div>
                    </div>
                  ))}
                </div>
                <button className="sl-btn sl-l" type="button" onClick={() => setDreamSlide(p => (p - 1 + dreamSlides.length) % dreamSlides.length)} aria-label="Prev">‹</button>
                <button className="sl-btn sl-r" type="button" onClick={() => setDreamSlide(p => (p + 1) % dreamSlides.length)} aria-label="Next">›</button>
                <div className="sl-dots">
                  {dreamSlides.map((_, i) => (
                    <button key={i} className={`sl-dot${i === dreamSlide ? ' a' : ''}`} type="button" onClick={() => setDreamSlide(i)} aria-label={`Slide ${i + 1}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="sec" style={{ background: 'var(--bg2)' }} id="services">
        <div className="w">
          <div className="sh c r" style={wd(80)}>
            <span className="ey">{servicesContent.eyebrow}</span>
            <h2>{servicesContent.titleStart} <em>{servicesContent.titleHighlight}</em></h2>
          </div>
          <div className="svc-grid r" style={wd(160)}>
            {serviceCardsData.map(s => (
              <div key={s.title} className="svc-card">
                <div className="svc-icon"><ServiceSvg k={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span className="svc-link">Learn More →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ESTIMATE ══ */}
      <section className="est sec" id="estimate">
        <div className="w">
          <div className="est-grid r" style={wd(100)}>
            <div>
              <span className="ey" style={{ color: 'rgba(255,255,255,.45)' }}>Cost Calculator</span>
              <h2>Estimate Your <em>Construction Cost</em> Instantly</h2>
              <p className="est-desc">Quickly calculate how much it will cost to build your home with WallBolt's detailed, reliable estimation tool.</p>
              <Link className="btn btn-w" to="/cost-estimator">Calculate Cost Instantly</Link>
            </div>
            <div className="calc">
              <div className="rupee">₹</div>
              <div className="calc-scr">0</div>
              <div className="calc-keys">
                {['M+', 'M-', '%', 'AC', '7', '8', '9', '+', '4', '5', '6', '−', '1', '2', '3', '='].map((k, i) => (
                  <div key={k + i} className={`calc-key${['%', '+', '−', '=', 'AC'].includes(k) ? ' op' : ''}`}>{k}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="sec" style={{ background: '#fff' }} id="process">
        <div className="w">
          <div className="sh c r" style={wd(80)}>
            <span className="ey">{processContent.eyebrow}</span>
            <h2>{processContent.titleStart} <em>{processContent.titleHighlight}</em></h2>
            <p>{processContent.subtitle}</p>
          </div>
          <div className="proc-track r" style={wd(140)}>
            {processStepsData.map((step, i) => (
              <div key={step.title} className="proc-step">
                <div className="proc-row">
                  <div className="proc-bub">{i + 1}</div>
                  {i < processStepsData.length - 1 && <div className="proc-line" />}
                </div>
                <span className="proc-title">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="proc-cards r" style={wd(220)}>
            {processStepsData.map(step => (
              <div key={step.title} className="proc-card">
                <div className="proc-card-icon"><ProcSvg k={step.icon} /></div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section className="sec" style={{ background: 'var(--bg2)' }} id="pricing">
        <div className="w">
          <div className="sh c r" style={wd(80)}>
            <span className="ey">Investment</span>
            <h2>Premium <em>Packages</em></h2>
          </div>
          <div className="pkg-cards r" style={wd(160)}>
            {packageDocs.map((pkg, i) => (
              <Link key={pkg.slug} to={`/packages/${pkg.slug}`} style={{ display: 'block' }}>
                <div className={`pkg-card${i === 1 ? ' pop' : ''}`}>
                  {i === 1 && <div className="pop-badge">Popular</div>}
                  <h3>{pkg.name}</h3>
                  <p className="pkg-lbl">Starting Price</p>
                  <p className="pkg-price">{pkg.startingPrice || 'As per estimate'}</p>
                  <ul>{getPackagePreviewPoints(pkg).map(pt => <li key={pt}>{pt}</li>)}</ul>
                  <p className="pkg-cta">View full details →</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="pkg-act r" style={wd(280)}>
            <Link to="/packages/compare" className="btn btn-o">Compare All 5 Packages</Link>
          </div>
        </div>
      </section>

      {/* ══ CEO ══ */}
      <section className="sec" style={{ background: '#fff' }} id="company">
        <div className="w">
          <div className="ceo-grid">
            <div className="r" style={wd(100)}>
              <span className="ey">{ceoContent.eyebrow}</span>
              <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: 'var(--dk)', marginBottom: '1.25rem', letterSpacing: '-.025em', lineHeight: 1.15 }}>
                {ceoContent.titleStart} <em style={{ color: 'var(--or)', fontStyle: 'normal' }}>{ceoContent.titleHighlight}</em>
              </h2>
              <p className="ceo-name">{ceoContent.name || ceoData.name}</p>
              <p className="ceo-role">{ceoContent.role || ceoData.role}</p>
              <p className="ceo-intro">{ceoContent.intro || ceoData.intro}</p>
              <p className="ceo-quote">{ceoContent.message || ceoData.message}</p>
              <button className="btn btn-p" type="button">{ceoContent.buttonLabel}</button>
            </div>
            <div className="r" style={wd(280)}>
              {ceoImg
                ? <img src={ceoImg} alt={ceoContent.name || ceoData.name} className="ceo-img" onError={() => setCeoImg('')} />
                : <div className="ceo-ph">◈</div>
              }
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROJECTS ══ */}
      <section className="sec" style={{ background: 'var(--bg2)' }} id="projects">
        <div className="w">
          <div className="sh c r" style={wd(80)}>
            <span className="ey">{projectContent.eyebrow}</span>
            <h2>{projectContent.titleStart} <em>{projectContent.titleHighlight}</em></h2>
            <p className="proj-subtitle-live">{projectContent.subtitle}</p>
            <p>Built with precision, quality, and trust — your dream home crafted to perfection.</p>
          </div>
          <div className="proj-grid r" style={wd(160)}>
            {featuredProjects.map((p, projectIndex) => {
              const activeImageIndex = (projectSlide + projectIndex) % p.images.length

              return (
                <div key={p.title} className="proj-card">
                  <div className="proj-media">
                    <div className="proj-ph">🏠</div>
                    {p.images.map((image, imageIndex) => (
                      <img
                        key={`${p.title}-${image}`}
                        src={image}
                        alt={`${p.title} showcase ${imageIndex + 1}`}
                        className={`proj-frame${imageIndex === activeImageIndex ? ' a' : ''}`}
                      />
                    ))}
                    <div className="proj-tag">{p.tag}</div>
                    <div className="proj-dots" aria-hidden="true">
                      {p.images.map((_, imageIndex) => (
                        <span key={`${p.title}-dot-${imageIndex}`} className={`proj-dot${imageIndex === activeImageIndex ? ' a' : ''}`} />
                      ))}
                    </div>
                  </div>
                  <div className="proj-body">
                    <h3>{p.title}</h3>
                    <p className="proj-meta">📍 {p.location} · {p.area}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="r" style={{ ...wd(260), textAlign: 'center', marginTop: '2.5rem' }}>
            <Link className="btn btn-o" to="/projects">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section className="sec" style={{ background: '#fff' }} id="why-us">
        <div className="w">
          <div className="sh c r" style={wd(80)}>
            <span className="ey">Our Advantage</span>
            <h2>Why <em>Choose WallBolt</em></h2>
          </div>
          <div className="why-layout">
            <div className="why-sticky r" style={wd(120)}>
              <div className="why-media">
                {whySlides.map((slide, index) => (
                  <img
                    key={slide.image}
                    src={slide.image}
                    alt={slide.label}
                    className={`why-img${index === whySlide ? ' a' : ''}`}
                  />
                ))}
                <div className="why-slide-meta">
                  <div className="why-slide-copy">
                    <span>Auto Showcase</span>
                    <strong>{whySlides[whySlide].label}</strong>
                  </div>
                  <div className="why-slide-dots" aria-hidden="true">
                    {whySlides.map((_, index) => (
                      <span key={`why-dot-${index}`} className={`why-slide-dot${index === whySlide ? ' a' : ''}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="why-list r" style={wd(200)}>
              {whyPoints.map(pt => (
                <div key={pt.title} className="why-item">
                  <div className="why-icon"><WhySvg k={pt.icon} /></div>
                  <div>
                    <h3>{pt.title}</h3>
                    <p>{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta sec" id="contact">
        <div className="w">
          <div className="cta-in r" style={wd(100)}>
            <h2>{ctaContent.title}</h2>
            <p className="cta-sub">{ctaContent.subtitle}</p>
            <button className="btn btn-w" type="button" style={{ padding: '1rem 3rem', fontSize: '1rem' }}>
              {ctaContent.buttonLabel}
            </button>
            <div className="cta-perks">
              {ctaPerks.map(h => (
                <div key={h} className="cta-perk">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" />
                    <path d="m8 12 3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="sec" style={{ background: 'var(--bg2)' }} id="testimonials">
        <div className="w">
          <div className="sh c r" style={wd(80)}>
            <span className="ey">Social Proof</span>
            <h2>Client <em>Testimonials</em></h2>
          </div>
          <p className="testi-trust r" style={wd(130)}>
            <span className="stars">★★★★★</span> &nbsp; Trusted by <strong>2,500+ Homeowners</strong>
          </p>
          <div className="r" style={wd(180)}>
            <div className="testi-grid">
              {visibleTestis.map(t => (
                <div key={t.author} className="testi-card">
                  <div className="testi-head">
                    <div className="testi-av">{t.initials}</div>
                    <div>
                      <p className="testi-name">{t.author}</p>
                      <p className="testi-loc">{t.location}</p>
                    </div>
                  </div>
                  <div className="testi-stars">{'★'.repeat(t.rating)}</div>
                  <p className="testi-q">{t.quote}</p>
                </div>
              ))}
            </div>
            <div className="testi-ctrl">
              <button className="testi-btn" type="button" onClick={() => setTestiPage(p => (p - 1 + testiPages) % testiPages)}>‹</button>
              <div className="testi-dots">
                {Array.from({ length: testiPages }).map((_, i) => (
                  <button key={i} className={`testi-dot${i === testiPage ? ' a' : ''}`} type="button" onClick={() => setTestiPage(i)} aria-label={`Page ${i + 1}`} />
                ))}
              </div>
              <button className="testi-btn" type="button" onClick={() => setTestiPage(p => (p + 1) % testiPages)}>›</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="ftr" id="blogs">
        <div className="w">
          <div className="ftr-top">
            <div className="ftr-col">
              <h3>Quick Links</h3>
              <ul>
                {[{ label: 'Home', href: '#home' }, { label: 'Services', href: '#services' }, { label: 'Projects', href: '#projects' }, { label: 'Company Profile', href: '#company' }, { label: 'Blogs', href: '#blogs' }, { label: 'Contact Us', href: '#contact' }].map(l => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div className="ftr-col">
              <h3>Our Services</h3>
              <ul>{footerServices.map(s => <li key={s}>{s}</li>)}</ul>
            </div>
            <div className="ftr-col">
              <h3>Contact Us</h3>
              {[{ ic: '📞', tx: '+91 98765 43210' }, { ic: '✉️', tx: 'info@testemail.com' }, { ic: '📍', tx: '123 Dream Avenue, Noida, India' }].map(c => (
                <div key={c.tx} className="ftr-contact"><span>{c.ic}</span>{c.tx}</div>
              ))}
              <a className="ftr-wa" href="https://wa.me/919876543210" target="_blank" rel="noreferrer">💬 Chat on WhatsApp</a>
            </div>
          </div>
          <div className="ftr-bot">
            <div>
              <div className="ftr-soc">
                {footerSocials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                    {s.icon === 'fb' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.4h2.4V5.3h-2.3c-2.8 0-4 1.3-4 3.8v2H8v3h2v4.6h3.1v-4.6h2.5l.5-3h-3V9.3c0-.7.3-.9.9-.9z" /></svg>}
                    {s.icon === 'tw' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.7 7.4c.1.3.1.7.1 1a9.1 9.1 0 0 1-14 7.7h.7a6.4 6.4 0 0 0 4-1.4 3.2 3.2 0 0 1-3-2.2h1.5a3.2 3.2 0 0 1-2.5-3.2c.4.2.8.3 1.2.3a3.2 3.2 0 0 1-1.4-2.7c0-.6.2-1.2.5-1.7A9.1 9.1 0 0 0 12.5 9a3.2 3.2 0 0 1 5.4-2.9 6.3 6.3 0 0 0 2-.8 3.2 3.2 0 0 1-1.4 1.8c.6-.1 1.2-.2 1.8-.5a6.8 6.8 0 0 1-1.6 1.6z" /></svg>}
                    {s.icon === 'li' && <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="7" r="1.6" /><path d="M4.5 9.3h3V18h-3zM10 9.3h2.9v1.2c.4-.8 1.4-1.5 2.9-1.5 3 0 3.6 2 3.6 4.5V18h-3v-4c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.2v4h-3z" /></svg>}
                    {s.icon === 'ig' && <svg viewBox="0 0 24 24" fill="none"><rect x="4.3" y="4.3" width="15.4" height="15.4" rx="4.2" stroke="currentColor" strokeWidth="1.9" /><circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.9" /><circle cx="17.4" cy="6.8" r="1" fill="currentColor" /></svg>}
                  </a>
                ))}
              </div>
              <p className="ftr-copy">© {new Date().getFullYear()} WallBolt Atelier. All Rights Reserved.</p>
            </div>
            <div className="ftr-trust">
              <span>🔒 Escrow Protected</span>
              <span>✅ Quality Assured</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomePage
