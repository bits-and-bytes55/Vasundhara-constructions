import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

type MenuIconName = 'package' | 'app' | 'calc' | 'guide';

type MenuItem = {
  label: string;
  description: string;
  icon: MenuIconName;
  to?: string;
  href?: string;
  badge?: string;
};

const getStartedItems: MenuItem[] = [
  { href: '/packages', label: 'Our Packages', description: 'Explore packages tailored to every budget.', icon: 'package' },
];

const resourceItems: MenuItem[] = [
  { to: '/cost-estimator', label: 'Estimator', description: 'FREE, accurate estimates for your dream home.', icon: 'calc',  },
];

const servicesItems = [
  { label: 'Construction', to: '/services/construction', description: 'End-to-end civil construction with quality materials.' },
  { label: 'Interiors', to: '/services/interior-design', description: 'Stylish, functional interior design for every space.' },
  { label: 'Elevations', to: '/services/elevation-page', description: 'Transform your home facade with premium design.' },
  { label: 'Terrace Garden', to: '/services/terrace-garden-page', description: 'Create serene outdoor spaces on your rooftop.' },
  { label: 'Home Renovation', to: '/services/home-renovation', description: 'Renovate your home with modern renovation solutions that blend style.' },
];

// Icon components (unchanged, but used with Tailwind sizing)
function MenuIcon({ icon }: { icon: MenuIconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      {icon === 'package' && (
        <>
          <path d="M4 8.5 12 4l8 4.5-8 4.5L4 8.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M4 8.5V16l8 4 8-4V8.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M12 13v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
      {icon === 'app' && (
        <>
          <rect x="7" y="3.5" width="10" height="17" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M10 7h4M10 11.5h4M10 16h2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
      {icon === 'calc' && (
        <>
          <rect x="6.5" y="3.5" width="11" height="17" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M9 7.2h6M9 11h1.2M12 11h1.2M15 11h.1M9 14.5h1.2M12 14.5h1.2M15 14.5h.1M9 18h1.2M12 18h1.2M15 18h.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
      {icon === 'guide' && (
        <>
          <path d="M7 5.5h7a3 3 0 0 1 3 3v10H10a3 3 0 0 0-3 3V5.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M10 8.5h4M10 12h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      className={`transition-transform duration-200 ease-in-out flex-shrink-0 ${open ? 'rotate-180' : 'rotate-0'}`}
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MegaCard({ item, onClick }: { item: MenuItem; onClick?: () => void }) {
  const inner = (
    <div className="flex items-start gap-2.5 p-2.5 rounded-lg cursor-pointer transition-colors hover:bg-sky-50">
      <div className="w-8.5 h-8.5 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
        <MenuIcon icon={item.icon} />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <strong className="text-[13px] text-sm lg:text-md xl:text-xl font-extrabold text-sky-900">{item.label}</strong>
          {item.badge && (
            <span className="text-[9px] text-sm lg:text-md xl:text-xl font-black tracking-[0.1em] uppercase text-white bg-sky-500 px-1.5 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-[11.5px] text-sm lg:text-sm xl:text-md text-slate-500 mt-0.5 leading-tight font-medium">{item.description}</p>
      </div>
    </div>
  );

  if (item.href) {
    return (
      <a href={item.href} className="block no-underline text-inherit" onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={item.to ?? '/'} className="block no-underline text-inherit" onClick={onClick}>
      {inner}
    </Link>
  );
}

// Mobile accordion
function MobileAccordion({ label, children, defaultOpen = false }: { label: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 px-4 bg-transparent border-none cursor-pointer font-inherit"
      >
        <span className="text-[11px] font-black tracking-[0.14em] uppercase text-slate-400">{label}</span>
        <span className="text-sky-600">
          <Chevron open={open} />
        </span>
      </button>
      {open && <div className="px-2 pb-2.5">{children}</div>}
    </div>
  );
}

// Hover delay hook (unchanged)
function useHoverDelay(delay = 140) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const onEnter = () => {
    clear();
    setOpen(true);
  };
  const onLeave = () => {
    clear();
    timer.current = setTimeout(() => setOpen(false), delay);
  };
  useEffect(() => () => clear(), []);
  return { open, onEnter, onLeave, setOpen };
}

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);
  const svc = useHoverDelay();
  const more = useHoverDelay();

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    svc.setOpen(false);
    more.setOpen(false);
  }, [location.pathname]);

  // Close on outside click / Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        svc.setOpen(false);
        more.setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        svc.setOpen(false);
        more.setOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    svc.setOpen(false);
    more.setOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm font-dm-sans"
      >
        <div className="max-w-[1280px] mx-auto px-4 h-[90px] flex items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" onClick={closeAll} className="flex-shrink-0 flex items-center no-underline">
            <img
              src="/images/vasundharawebdownload.png"
              alt="Vasundhara Construction"
              className="h-[84px] w-auto block"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = 'none';
                const fb = document.createElement('div');
                fb.style.cssText = 'font-family:Playfair Display,serif;font-size:18px;font-weight:900;color:#0369a1;';
                fb.textContent = 'Vasundhara';
                el.parentElement!.appendChild(fb);
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {/* Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative text-sm lg:text-md xl:text-xl font-bold text-black px-2.5 py-1.5 rounded-lg transition-colors hover:text-sky-600 hover:bg-sky-50 whitespace-nowrap ${
                  isActive ? 'text-sky-600 font-extrabold after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-[18px] after:h-[2.5px] after:rounded-full after:bg-sky-600 after:content-[""]' : ''
                }`
              }
            >
              Home
            </NavLink>

            {/* Services (hover dropdown) */}
            <div className="relative" onMouseEnter={svc.onEnter} onMouseLeave={svc.onLeave}>
              <div className="flex items-center rounded-lg overflow-hidden hover:bg-sky-50">
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `text-sm  lg:text-md xl:text-xl font-bold text-black py-1.5 pl-2.5 pr-1 whitespace-nowrap transition-colors hover:text-sky-600 ${
                      isActive ? 'text-sky-600 font-extrabold' : ''
                    }`
                  }
                  onClick={closeAll}
                >
                  Services
                </NavLink>
                <button
                  className="flex items-center justify-center p-1.5 text-slate-400 hover:text-sky-600 transition-colors"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    svc.setOpen((o) => !o);
                  }}
                  aria-label="Toggle services menu"
                >
                  <Chevron open={svc.open} />
                </button>
              </div>

              {svc.open && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden"
                  onMouseEnter={svc.onEnter}
                  onMouseLeave={svc.onLeave}
                >
                  <div className="p-2.5">
                    {servicesItems.map((s) => (
                      <Link
                        key={s.label}
                        to={s.to}
                        className="block px-3 py-2.5 rounded-xl hover:bg-sky-50 transition-colors no-underline"
                        onClick={closeAll}
                      >
                        <div className="text-[13px] text-sm  lg:text-md xl:text-xl font-extrabold text-sky-900 mb-0.5">{s.label}</div>
                        <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 leading-tight m-0">{s.description}</p>
                      </Link>
                    ))}
                    <Link
                      to="/services"
                      className="block  mt-1.5 mx-2 mb-0.5 px-3 py-2 rounded-lg bg-sky-50 text-[13px] text-sm  lg:text-md xl:text-xl font-extrabold text-sky-600 hover:bg-sky-100 transition-colors text-center"
                      onClick={closeAll}
                    >
                      View All Services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Projects */}
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `relative text-sm lg:text-md xl:text-xl font-bold text-black px-2.5 py-1.5 rounded-lg transition-colors hover:text-sky-600 hover:bg-sky-50 whitespace-nowrap ${
                  isActive ? 'text-sky-600 font-extrabold after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-[18px] after:h-[2.5px] after:rounded-full after:bg-sky-600 after:content-[""]' : ''
                }`
              }
            >
              Projects
            </NavLink>

            {/* Company Profile */}
            <NavLink
              to="/company-profile"
              className={({ isActive }) =>
                `relative text-sm lg:text-md xl:text-xl font-bold text-black px-2.5 py-1.5 rounded-lg transition-colors hover:text-sky-600 hover:bg-sky-50 whitespace-nowrap ${
                  isActive ? 'text-sky-600 font-extrabold after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-[18px] after:h-[2.5px] after:rounded-full after:bg-sky-600 after:content-[""]' : ''
                }`
              }
            >
              Company Profile
            </NavLink>

            {/* Blogs */}
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `relative text-sm lg:text-md xl:text-xl font-bold text-black px-2.5 py-1.5 rounded-lg transition-colors hover:text-sky-600 hover:bg-sky-50 whitespace-nowrap ${
                  isActive ? 'text-sky-600 font-extrabold after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-[18px] after:h-[2.5px] after:rounded-full after:bg-sky-600 after:content-[""]' : ''
                }`
              }
            >
              Blogs
            </NavLink>

            {/* More mega menu */}
            <div className="relative" onMouseEnter={more.onEnter} onMouseLeave={more.onLeave}>
              <button
                className={`flex items-center gap-1 text-sm lg:text-md xl:text-xl font-bold text-black px-2.5 py-1.5 rounded-lg transition-colors hover:text-sky-600 hover:bg-sky-50 whitespace-nowrap ${
                  more.open ? 'text-sky-600 bg-sky-50' : ''
                }`}
                type="button"
                onClick={() => more.setOpen((o) => !o)}
              >
                More <Chevron open={more.open} />
              </button>

              {more.open && (
                <div
                  className="absolute left- -translate-x-1/2 mt-2 flex min-w-[480px] bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden"
                  onMouseEnter={more.onEnter}
                  onMouseLeave={more.onLeave}
                >
                  <div className="flex-2 p-3.5">
                    
                    {getStartedItems.map((item) => (
                      <MegaCard key={item.label} item={item} onClick={closeAll} />
                    ))}
                  </div>
                  <div className="flex-2 p-3.5 border-l border-slate-100">
                    
                    {resourceItems.map((item) => (
                      <MegaCard key={item.label} item={item} onClick={closeAll} />
                    ))}
                    
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Link
              to="/contacts"
              className="inline-flex items-center gap-1.5 bg-gradient-to-br from-sky-500 to-sky-600 text-white text-sm lg:text-md xl:text-xl font-extrabold py-2.5 px-[18px] rounded-xl shadow-md hover:shadow-lg hover:-translate-y-px transition-all whitespace-nowrap"
              onClick={closeAll}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="block lg:hidden bg-transparent border-none p-1.5 cursor-pointer flex-shrink-0"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <div className={`flex flex-col gap-1.5 w-5 transition-all duration-300 ${menuOpen ? 'open' : ''}`}>
              <span
                className={`block h-0.5 rounded-full bg-slate-700 transition-all duration-300 ${
                  menuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 rounded-full bg-slate-700 transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 rounded-full bg-slate-700 transition-all duration-300 ${
                  menuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm animate-in fade-in" onClick={closeAll} />
          <div className="relative z-10 w-80 max-w-[88vw] bg-white shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-slate-100 bg-gradient-to-br from-sky-700 to-sky-600 flex-shrink-0">
              <Link to="/" onClick={closeAll} className="no-underline">
                <img
                  src="/images/vasundhara.png"
                  alt="Vasundhara"
                  className="h-[46px] w-auto bg-white rounded-lg px-1.5 py-0.5"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = 'none';
                    const fb = document.createElement('div');
                    fb.style.cssText = 'font-family:Playfair Display,serif;font-size:17px;font-weight:900;color:#fff;';
                    fb.textContent = 'Vasundhara';
                    el.parentElement!.appendChild(fb);
                  }}
                />
              </Link>
              <button
                className="w-7.5 h-7.5 rounded-lg bg-white/20 border border-white/30 text-white text-lg flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
                onClick={closeAll}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Main Routes */}
            <div className="px-2 py-3 border-b border-slate-100 flex-shrink-0">
              {[
                { to: '/', label: 'Home', end: true },
                { to: '/projects', label: 'Projects' },
                { to: '/company-profile', label: 'Company Profile' },
                { to: '/blogs', label: 'Blogs' },
              ].map((r) => (
                <NavLink
                  key={r.to}
                  to={r.to}
                  end={r.end ?? false}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 transition-all mb-0.5 ${
                      isActive ? 'bg-sky-100 text-sky-600 font-extrabold' : 'hover:bg-sky-50 hover:text-sky-600'
                    }`
                  }
                  onClick={closeAll}
                >
                  {r.label}
                </NavLink>
              ))}
            </div>

            {/* Accordion Sections */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              {/* Services Accordion */}
              <MobileAccordion label="Services">
                {servicesItems.map((s) => (
                  <Link
                    key={s.label}
                    to={s.to}
                    className="block px-3 py-2.5 rounded-xl transition-colors hover:bg-sky-50 no-underline"
                    onClick={closeAll}
                  >
                    <div className="font-extrabold text-[13px] text-sky-900 mb-0.5">{s.label}</div>
                    <p className="text-[11px] text-slate-500 m-0 leading-tight">{s.description}</p>
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="block mt-1.5 mx-2 mb-0 px-3 py-2 rounded-lg bg-sky-50 text-xs font-extrabold text-sky-600 text-center hover:bg-sky-100 transition-colors"
                  onClick={closeAll}
                >
                  View All Services →
                </Link>
              </MobileAccordion>

              <MobileAccordion label="Packages" defaultOpen>
                {getStartedItems.map((item) => (
                  <MegaCard key={item.label} item={item} onClick={closeAll} />
                ))}
              </MobileAccordion>

              <MobileAccordion label="Estimator">
                {resourceItems.map((item) => (
                  <MegaCard key={item.label} item={item} onClick={closeAll} />
                ))}
              </MobileAccordion>
            </div>

            {/* Drawer Footer */}
            <div className="p-3.5 border-t border-slate-100 bg-slate-50 flex flex-col gap-2 flex-shrink-0">
              <Link
                to="/contacts"
                className="flex items-center justify-center bg-gradient-to-br from-sky-500 to-sky-600 text-white font-extrabold text-[13px] py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all no-underline"
                onClick={closeAll}
              >
                Get Free Consultation
              </Link>
              <p className="text-center text-[10px] text-slate-400 font-semibold m-0">
                🏗️ Building Dream Homes Since 2005
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}