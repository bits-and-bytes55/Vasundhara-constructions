import { useState, useEffect } from "react";

const WA = (msg = "Hi! I'm interested in interior design services from Vasundhara.") =>
  `https://wa.me/919818866849?text=${encodeURIComponent(msg)}`;

const SERVICES = [
  {
    id: "living", label: "Living Rooms", icon: "", tagline: "Where stories unfold",
    desc: "We craft living rooms that balance openness with warmth — statement ceilings, curated lighting, bespoke joinery, and furniture layouts that invite conversation.",
    features: ["False ceiling with cove lighting", "Accent walls & wallpaper", "Custom TV unit & shelving", "Modular sofa arrangement", "Ambient & task lighting plan"],
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80",
  },
  {
    id: "bedroom", label: "Bedrooms", icon: "", tagline: "Sanctuary redefined",
    desc: "Your bedroom is your retreat. We design serene, layered spaces with thoughtful storage, luxurious textures, and lighting that transitions from energising to restful.",
    features: ["Wardrobe with loft & mirrors", "Upholstered headboard wall", "Soft-close drawer systems", "Bedside pendant lighting", "Walk-in closet planning"],
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80",
  },
  {
    id: "kitchen", label: "Kitchens", icon: "", tagline: "The heart of the home",
    desc: "From sleek parallel kitchens to island configurations — we engineer kitchens that are as ergonomic as they are beautiful, with premium finishes and smart storage.",
    features: ["Modular cabinetry (Hettich/Hafele)", "Quartz or granite countertops", "Under-cabinet LED lighting", "Integrated appliances provision", "Backsplash & tile design"],
    image: "/images/kitchen2.jpeg",
  },
  {
    id: "bathroom", label: "Bathrooms", icon: "", tagline: "Spa-level indulgence",
    desc: "We transform bathrooms into spa-like retreats with large-format tiles, precision waterproofing, designer fittings, and thoughtful vanity design.",
    features: ["Large-format tile layout", "Frameless glass partitions", "Vanity with LED mirror", "Rain shower + hand shower", "Anti-skid & waterproofing"],
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80",
  },
  {
    id: "dining", label: "Dining Spaces", icon: "", tagline: "Gather in style",
    desc: "A Vasundhara dining space creates the perfect backdrop for every meal — from elegant crockery units and pendant clusters to seamless open-plan transitions.",
    features: ["Crockery unit design", "Pendant lighting cluster", "Dining table & chairs", "Open-plan coordination", "Wall art & décor curation"],
    image: "/images/interiors.jpg",
  },
  {
    id: "study", label: "Study & Office", icon: "", tagline: "Focus meets finesse",
    desc: "Home offices and study rooms designed for deep focus — ergonomic layouts, built-in storage walls, task lighting zones, and acoustic considerations.",
    features: ["Built-in bookshelf wall", "Ergonomic desk integration", "Cable management", "Task & ambient lighting", "Acoustic panel options"],
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80",
  },
];

const PROCESS = [
  { step: "01", title: "Discovery Call", desc: "We understand your lifestyle, taste, and budget in a 30-minute free consultation.", icon: " " },
  { step: "02", title: "Concept Board", desc: "Moodboards, material palettes, and reference imagery curated just for your space.", icon: " " },
  { step: "03", title: "3D Visualisation", desc: "Photorealistic renders so you see every corner before a single nail is hammered.", icon: " " },
  { step: "04", title: "Material Selection", desc: "We visit showrooms together and finalise tiles, laminates, fittings, and fabrics.", icon: " " },
  { step: "05", title: "Execution", desc: "Our in-house team handles every trade — carpentry, electrical, plumbing, and painting.", icon: " " },
  { step: "06", title: "Styling & Handover", desc: "Final placement of décor, art, and soft furnishings. Your dream space, delivered.", icon: " " },
];

const STATS = [
  { value: "500+", label: "Rooms Designed", icon: "" },
  { value: "98%", label: "On-Time Delivery", icon: "⏱" },
  { value: "4.5★", label: "Client Rating", icon: "" },
  { value: "12+", label: "Years Experience", icon: "" },
];



const STYLES = [
  { name: "Contemporary", desc: "Clean lines, neutral tones, statement pieces", img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80" },
  { name: "Luxury Classic", desc: "Ornate details, rich textures, timeless elegance", img: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=80", popular: true },
  { name: "Scandinavian", desc: "Minimalist warmth, natural wood, cosy neutrals", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80" },
  { name: "Bohemian", desc: "Layered textiles, plants, eclectic art & colour", img: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=600&q=80" },
  { name: "Industrial", desc: "Raw concrete, exposed brick, metal accents", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80" },
  { name: "Mid-Century Modern", desc: "Organic forms, bold colours, retro flair", img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&q=80" },
];

const WHY = [
  { icon: "", title: "In-House Design Team", desc: "Full-time designers, not freelancers. Every project gets dedicated creative ownership." },
  { icon: "", title: "Photorealistic 3D Renders", desc: "See your space in stunning detail before a single rupee is spent on execution." },
  { icon: "", title: "Fixed-Price Contracts", desc: "No surprise bills. Your quote is your price — locked before work begins." },
  { icon: "", title: "45-Day Fast Track", desc: "Modular solutions for single rooms delivered in 45 days, guaranteed." },
  { icon: "", title: "Material Quality Assurance", desc: "Only Grade-A materials from verified brands — Hettich, Hafele, Asian Paints, Jaquar." },
  { icon: "", title: "Real-Time Progress App", desc: "Track your project daily with photos, milestones, and payment records." },
  { icon: "", title: "Post-Completion Support", desc: "1-year warranty on all carpentry and a dedicated helpline for punch-list items." },
  { icon: "", title: "Sustainable Options", desc: "Low-VOC paints, certified laminates, and energy-efficient lighting on every project." },
];

const WASvg = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.852L.057 23.585a.5.5 0 0 0 .6.6l5.733-1.465A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.12-1.407l-.367-.21-3.803.972.999-3.669-.23-.373A9.964 9.964 0 0 1 2 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vr-in"); }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".vr").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function InteriorPage() {
  const [activeService, setActiveService] = useState(0);
  
  useReveal();

  

  const svc = SERVICES[activeService];

  return (
    <div className="font-serif bg-[#fafaf8] text-[#1a1a2e] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        .vr { opacity: 0; transform: translateY(28px); transition: opacity 0.75s cubic-bezier(0.2,0.9,0.4,1), transform 0.75s cubic-bezier(0.2,0.9,0.4,1); }
        .vr.vr-in { opacity: 1; transform: translateY(0); }
        .vr-d1 { transition-delay: 0.1s !important; }
        .vr-d2 { transition-delay: 0.2s !important; }
        .hero-bg { transition: transform 8s ease; }
        .hero-bg.loaded { transform: scale(1) !important; }
      `}</style>

      {/* ══ HERO ══ */}
      <section className="relative max-h-[550px] sm:max-h-[600px] flex items-end overflow-hidden bg-[#0c1220]">
        <div
          className="hero-bg absolute inset-0 scale-[1.07] brightness-[0.45] saturate-110"
          style={{ background: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85') center/cover no-repeat" }}
        />
        {/* grain overlay */}
        <div className="absolute inset-0 opacity-50 pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }}
        />
        {/* scroll hint */}
        <div className="absolute bottom-28 right-[5vw] z-10 hidden md:flex flex-col items-center gap-2.5"
          style={{ writingMode: "vertical-rl", fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
          Scroll to explore
          <span className="block w-px h-12" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
        </div>

        {/* hero content */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[5vw] pt-32 pb-24 md:pb-28">
          {/* eyebrow */}
          <div className="font-dm inline-flex items-center gap-2.5 text-[11px] font-black tracking-[0.22em] uppercase text-[#b8975a] mb-5">
            <span className="block w-7 h-px bg-[#b8975a] opacity-60" />
            Vasundhara Interiors
            <span className="block w-7 h-px bg-[#b8975a] opacity-60" />
          </div>
          <h1 className="font-cormorant text-[clamp(48px,8vw,110px)] font-semibold leading-none text-white tracking-tight mb-7">
            Spaces that feel<br />
            like <em className="italic text-[#b8975a]">you.</em>
          </h1>
          <p className="font-dm text-[clamp(14px,2vw,17px)] text-white/65 max-w-[520px] leading-[1.7] mb-10">
            Award-winning interior design for homes, villas, and commercial spaces across Delhi NCR.
            We blend artistry with precision to deliver interiors that last a lifetime.
          </p>
          <div className="flex flex-wrap gap-3.5 items-center">
            <a href={WA("Hi! I'd like to explore interior design services for my home.")} target="_blank" rel="noopener noreferrer"
              className="font-dm inline-flex items-center gap-2 bg-[#b8975a] text-white text-[13px] font-black px-7 py-3.5 rounded tracking-[0.04em] border border-[#b8975a] hover:bg-transparent hover:text-[#b8975a] transition-all duration-250">
              <WASvg size={15} /> Book Free Consultation
            </a>
            <a href="#services"
              className="font-dm inline-flex items-center gap-2 bg-transparent text-white/80 text-[13px] font-bold px-7 py-3.5 rounded border border-white/30 hover:border-white/70 hover:text-white transition-all duration-250">
              Explore Services ↓
            </a>
          </div>
        </div>

        {/* stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-wrap bg-[rgba(10,15,30,0.75)] backdrop-blur-md border-t border-white/[0.08]">
          {STATS.map((s, i) => (
            <div key={s.label} className={`flex-1 min-w-[50%] sm:min-w-0 py-4 px-4 sm:px-6 text-center ${i < STATS.length - 1 ? "border-r border-white/[0.07]" : ""}`}>
              <div className="font-cormorant text-[clamp(22px,3vw,32px)] font-semibold text-[#b8975a] leading-none">{s.value}</div>
              <div className="font-dm text-[10px] font-bold tracking-[0.12em] uppercase text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ INTRO ══ */}
      <section className="mx-auto px-[2vw] py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[72px] items-center">
          <div className="vr">
            <div className="font-dm inline-flex items-center gap-2.5 text-[10.5px] font-black tracking-[0.22em] uppercase text-sky-600 mb-4">
              <span className="block w-5 h-[1.5px] bg-sky-600" /> Our Philosophy
            </div>
            <h2 className="font-cormorant text-[clamp(34px,5vw,60px)] font-semibold leading-[1.08] text-[#1a1a2e] tracking-tight">
              Design that <em className="italic text-sky-600">breathes</em> with you
            </h2>
            <p className="font-dm text-[clamp(14px,1.8vw,16px)] text-slate-500 leading-[1.75] max-w-[580px] mt-4">
              At Vasundhara, interior design isn't decoration — it's the architecture of how you live. Every room we design starts with you: how you move, rest, entertain, and dream.
            </p>
            <p className="font-dm text-[clamp(14px,1.8vw,16px)] text-slate-500 leading-[1.75] max-w-[580px] mt-4">
              From a single room refresh to a full villa transformation, our in-house design team manages every detail — materials, vendors, trades, and timelines — so you don't have to.
            </p>
            <div className="flex gap-8 mt-10 flex-wrap">
              {[["In-House Team", "No outsourcing"], ["Fixed Timeline", "Committed dates"], ["3D Preview", "Before execution"]].map(([t, d]) => (
                <div key={t}>
                  <div className="font-dm text-[11px] font-black tracking-[0.12em] uppercase text-sky-600 mb-1">{t}</div>
                  <div className="font-dm text-[12px] text-slate-500">{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="vr vr-d2">
            <img
              src="https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80"
              alt="Luxury interior"
              className="w-full aspect-[5/5] object-cover rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.14)]"
            />
          </div>
        </div>
      </section>

      <div className="h-px mx-0" style={{ background: "linear-gradient(to right, transparent, #e2e8f0 40%, #e2e8f0 60%, transparent)" }} />

      {/* ══ SERVICES ══ */}
      <section className="mx-auto px-[2vw] py-10 md:py-14" id="services">
        <div className="vr">
          <div className="font-dm inline-flex items-center gap-2.5 text-[10.5px] font-black tracking-[0.22em] uppercase text-sky-600 mb-4">
            <span className="block w-5 h-[1.5px] bg-sky-600" /> What We Design
          </div>
          <h2 className="font-cormorant text-[clamp(34px,5vw,60px)] font-semibold leading-[1.08] text-[#1a1a2e] tracking-tight">
            Every space, <em className="italic text-sky-600">perfected</em>
          </h2>
        </div>

        {/* Desktop tab layout */}
        <div className="vr vr-d1 hidden md:grid mt-14 border border-[#e8e4dc] rounded-2xl overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.06)] bg-white"
          style={{ gridTemplateColumns: "260px 1fr" }}>
          {/* tabs */}
          <div className="border-r border-[#f0ece4]">
            {SERVICES.map((s, i) => (
              <button key={s.id}
                onClick={() => setActiveService(i)}
                className={`w-full flex items-center gap-3 px-5 py-[18px] text-left border-b border-[#f0ece4] last:border-b-0 border-l-[3px] transition-all duration-200
                  ${activeService === i
                    ? "border-l-sky-600 bg-gradient-to-r from-sky-50 to-[#fafaf8]"
                    : "border-l-transparent hover:bg-[#fdfcf9]"
                  }`}>
                <span className="text-[22px] flex-shrink-0">{s.icon}</span>
                <div>
                  <div className={`font-dm text-[13.5px] font-bold ${activeService === i ? "text-sky-600" : "text-[#1a1a2e]"}`}>{s.label}</div>
                  <div className="font-dm text-[10.5px] text-slate-500 mt-0.5">{s.tagline}</div>
                </div>
              </button>
            ))}
          </div>
          {/* panel */}
          <div className="p-7 md:p-10 lg:p-11">
            <img src={svc.image} alt={svc.label} className="w-full aspect-video object-cover rounded-xl mb-7 shadow-[0_6px_24px_rgba(0,0,0,0.1)]" />
            <h3 className="font-cormorant text-[clamp(26px,3.5vw,40px)] font-semibold text-[#1a1a2e] mb-3">
              {svc.label} — <em className="italic text-sky-600">{svc.tagline}</em>
            </h3>
            <p className="font-dm text-[14.5px] text-slate-500 leading-[1.75] mb-6">{svc.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-7">
              {svc.features.map(f => (
                <div key={f} className="font-dm flex items-center gap-2 text-[13px] font-medium text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 flex-shrink-0" />{f}
                </div>
              ))}
            </div>
            <a href={WA(`Hi! I'm interested in ${svc.label} interior design. Please guide me.`)} target="_blank" rel="noopener noreferrer"
              className="font-dm inline-flex items-center gap-2 bg-[#25d366] text-white text-[13px] font-black px-[22px] py-[11px] rounded-lg no-underline shadow-[0_2px_10px_rgba(37,211,102,0.3)] hover:brightness-105 transition-all">
              <WASvg size={13} /> Ask about {svc.label}
            </a>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="vr vr-d1 md:hidden mt-8 space-y-4">
          {SERVICES.map((s, i) => {
            const open = activeService === i;
            return (
              <div key={s.id} className="bg-white border border-[#e8e4dc] rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveService(open ? -1 : i)}
                  className="w-full flex items-center gap-3 px-[18px] py-4 text-left">
                  <span className="text-[22px]">{s.icon}</span>
                  <div className="flex-1">
                    <div className={`font-dm text-sm font-black ${open ? "text-sky-600" : "text-[#1a1a2e]"}`}>{s.label}</div>
                    <div className="font-dm text-[11px] text-slate-500">{s.tagline}</div>
                  </div>
                  <span className={`text-sky-600 text-lg font-bold transition-transform duration-200 ${open ? "rotate-180" : ""}`}>⌄</span>
                </button>
                {open && (
                  <div className="px-[18px] pb-[18px]">
                    <img src={s.image} alt={s.label} className="w-full aspect-video object-cover rounded-lg mb-4" />
                    <p className="font-dm text-[13.5px] text-slate-500 leading-[1.7] mb-4">{s.desc}</p>
                    <div className="flex flex-col gap-1.5 mb-5">
                      {s.features.map(f => (
                        <div key={f} className="font-dm flex items-center gap-2 text-[13px] font-medium text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-600 flex-shrink-0" />{f}
                        </div>
                      ))}
                    </div>
                    <a href={WA(`Hi! I'm interested in ${s.label} interior design.`)} target="_blank" rel="noopener noreferrer"
                      className="font-dm inline-flex items-center gap-1.5 bg-[#25d366] text-white text-[13px] font-black px-[18px] py-2.5 rounded-lg no-underline">
                      WhatsApp Us →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <div className="bg-[#1a1a2e] mt-10 py-10 md:py-14 px-[2vw]">
        <div className="mx-auto">
          <div className="vr text-center">
            <div className="font-dm inline-flex items-center justify-center gap-2.5 text-[10.5px] font-black tracking-[0.22em] uppercase text-[#b8975a] mb-4">
              <span className="block w-5 h-[1.5px] bg-[#b8975a]" /> How We Work
            </div>
            <h2 className="font-cormorant text-[clamp(34px,5vw,60px)] font-semibold leading-[1.08] text-white tracking-tight">
              From <em className="italic text-[#b8975a]">blank canvas</em> to dream space
            </h2>
            <p className="font-dm text-[15px] text-white/50 mt-3.5 max-w-[520px] mx-auto leading-[1.65]">
              A seamless 6-step journey — fully managed by our team from first sketch to final styling.
            </p>
          </div>

          <div className="vr vr-d1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-14 border border-white/[0.07] rounded-xl overflow-hidden" style={{ gap: "1px", background: "rgba(255,255,255,0.07)" }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} className="relative bg-[#1a1a2e] p-8 md:p-9 hover:bg-[#0f1929] transition-colors duration-250">
                {i % 3 !== 2 && <div className="absolute top-9 right-0 w-px h-10 bg-white/[0.07]" />}
                <div className="font-cormorant text-[52px] font-semibold leading-none text-white/[0.06] mb-3">{p.step}</div>
                <span className="text-[28px] mb-3.5 block">{p.icon}</span>
                <h3 className="font-cormorant text-xl font-semibold text-white mb-2">{p.title}</h3>
                <p className="font-dm text-[13px] text-white/50 leading-[1.7]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ STYLES GALLERY ══ */}
      <section className="mx-auto px-[2vw] py-10 md:py-14">
        <div className="vr">
          <div className="font-dm inline-flex items-center gap-2.5 text-[10.5px] font-black tracking-[0.22em] uppercase text-sky-600 mb-4">
            <span className="block w-5 h-[1.5px] bg-sky-600" /> Design Styles
          </div>
          <h2 className="font-cormorant text-[clamp(34px,5vw,60px)] font-semibold leading-[1.08] text-[#1a1a2e] tracking-tight">
            Find your <em className="italic text-sky-600">aesthetic</em>
          </h2>
          <p className="font-dm text-[clamp(14px,1.8vw,16px)] text-slate-500 leading-[1.75] max-w-[580px] mt-4">
            We're fluent in every design language — from restrained Scandinavian to opulent Luxury Classic. Tell us what speaks to you.
          </p>
        </div>
        <div className="vr vr-d1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px] mt-14">
          {STYLES.map((s) => (
            <div key={s.name} className="relative rounded-xl overflow-hidden aspect-[4/5] cursor-pointer shadow-[0_6px_24px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300 group">
              <img src={s.img} alt={s.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,15,30,0.85) 0%, rgba(10,15,30,0.1) 55%, transparent 100%)" }} />
              {s.popular && (
                <div className="absolute top-3.5 right-3.5 font-dm text-[9px] font-black tracking-[0.14em] uppercase text-white bg-[#b8975a] px-2.5 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="font-cormorant text-[21px] font-semibold text-white leading-tight mb-1">{s.name}</div>
                <div className="font-dm text-[12px] text-white/65">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <div className="bg-gradient-to-br from-sky-50 via-[#e0f2fe] to-sky-50 border-y border-sky-200 py-6 md:py-10 px-[2vw]">
        <div className="mx-auto">
          <div className="vr text-center">
            <div className="font-dm inline-flex items-center justify-center gap-2.5 text-[10.5px] font-black tracking-[0.22em] uppercase text-sky-600 mb-4">
              <span className="block w-5 h-[1.5px] bg-sky-600" /> Why Vasundhara
            </div>
            <h2 className="font-cormorant text-[clamp(34px,5vw,60px)] font-semibold leading-[1.08] text-[#1a1a2e] tracking-tight">
              Design excellence, <em className="italic text-sky-600">backed by process</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {WHY.map(w => (
              <div key={w.title} className="vr bg-white rounded-2xl p-7 border border-sky-200 shadow-[0_2px_12px_rgba(14,165,233,0.07)] hover:shadow-[0_8px_28px_rgba(14,165,233,0.14)] hover:-translate-y-1 transition-all duration-250">
                <span className="text-[32px] mb-3 block">{w.icon}</span>
                <h3 className="font-cormorant text-[17px] font-semibold text-[#1a1a2e] mb-1.5">{w.title}</h3>
                <p className="font-dm text-[13px] text-slate-500 leading-[1.65]">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* ══ CTA BANNER ══ */}
      <div className="relative overflow-hidden py-10 md:py-14 px-[2vw]"
        style={{ background: "linear-gradient(135deg, #0c1220 0%, #0369a1 60%, #0ea5e9 100%)" }}>
        {/* blobs */}
        <div className="absolute w-[400px] h-[400px] -top-36 -left-24 rounded-full bg-white/[0.04] pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] -bottom-24 -right-20 rounded-full bg-white/[0.04] pointer-events-none" />

        <div className="vr mx-auto text-center relative z-10">
          <p className="font-dm text-[11px] font-black tracking-[0.2em] uppercase text-white/45 mb-4">— Start Your Journey —</p>
          <h2 className="font-cormorant text-[clamp(30px,5vw,58px)] font-semibold text-white leading-[1.1] mb-4">
            Your dream interior is one <em className="italic text-sky-300">conversation away</em>
          </h2>
          <p className="font-dm text-[15px] text-white/65 mb-9 leading-[1.65]">
            Book a free 30-minute consultation with our design team. No obligation — just inspiration, ideas, and honest advice for your space.
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center">
            <a href={WA("Hi! I'd like to book a free interior design consultation with Vasundhara.")} target="_blank" rel="noopener noreferrer"
              className="font-dm inline-flex items-center gap-2 bg-[#25d366] text-white text-[13.5px] font-black px-7 py-3.5 rounded-md no-underline shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:brightness-105 hover:-translate-y-0.5 transition-all duration-220">
              <WASvg size={16} /> Book Free Consultation on WhatsApp
            </a>
            <a href="/projects"
              className="font-dm inline-flex items-center gap-2 bg-transparent text-white/85 text-[13.5px] font-bold px-7 py-3.5 rounded-md border border-white/30 no-underline hover:border-white/70 hover:text-white transition-all duration-220">
              View Our Projects →
            </a>
          </div>
          <div className="flex flex-wrap gap-6 justify-center mt-9">
            {["Free 30-Min Call", "No Obligation", "In-Home Visit Available", "3D Design Preview"].map(p => (
              <div key={p} className="font-dm flex items-center gap-1.5 text-[12px] font-bold text-white/60">
                <span className="text-sky-300">✓</span> {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}