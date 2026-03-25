import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

type MenuIconName = 'package' | 'process' | 'app' | 'about' | 'contact' | 'calc' | 'guide' | 'heart' | 'news' | 'refer'

type MenuItem = {
  label: string
  description: string
  icon: MenuIconName
  to?: string
  href?: string
  badge?: string
}

const routeItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/company-profile', label: 'Company Profile' },
  { to: '/blogs', label: 'Blogs' },
]

const getStartedItems: MenuItem[] = [
  { href: '/#pricing', label: 'Our Packages', description: 'Explore packages tailored to every budget.', icon: 'package' },
  { href: '/#process', label: 'How it Works?', description: 'See how your home build comes together.', icon: 'process' },
  { to: '/our-app', label: 'Our App', description: 'Monitor progress, payments, and updates.', icon: 'app' },
  { to: '/about-us', label: 'About Us', description: 'Explore our story, the founders and team.', icon: 'about' },
  { to: '/contacts', label: 'Contact Us', description: 'Talk to our construction experts today.', icon: 'contact' },
]

const resourceItems: MenuItem[] = [
  { to: '/cost-estimator', label: 'Free Estimators', description: 'FREE, accurate estimates for your dream home.', icon: 'calc', badge: 'FREE' },
  { to: '/home-construction-guide', label: 'Home Construction Guide', description: 'Expert articles for stress-free home building.', icon: 'guide' },
  { to: '/testimonials', label: 'Testimonials', description: 'Hear from satisfied homeowners.', icon: 'heart' },
  { to: '/news-media', label: 'News & Media', description: 'Stay updated with industry news, and about us.', icon: 'news' },
  { to: '/refer-a-friend', label: 'Refer A Friend', description: 'Invite friends and earn rewards.', icon: 'refer' },
]

function MenuIcon({ icon }: { icon: MenuIconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {icon === 'package' && (
        <>
          <path d="M4 8.5 12 4l8 4.5-8 4.5L4 8.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M4 8.5V16l8 4 8-4V8.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M12 13v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
      {icon === 'process' && (
        <>
          <path d="M7 6h10M7 12h6M7 18h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="5" cy="6" r="1" fill="currentColor" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
          <circle cx="5" cy="18" r="1" fill="currentColor" />
        </>
      )}
      {icon === 'app' && (
        <>
          <rect x="7" y="3.5" width="10" height="17" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M10 7h4M10 11.5h4M10 16h2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
      {icon === 'about' && (
        <>
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
          <path d="M6.5 19c1.1-3 3-4.5 5.5-4.5S16.4 16 17.5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
      {icon === 'contact' && (
        <>
          <path d="M5 7.5h14v9H5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="m5.5 8 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
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
      {icon === 'heart' && (
        <path d="M12 19s-6-3.8-6-8.4A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 6 2.6C18 15.2 12 19 12 19Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      )}
      {icon === 'news' && (
        <>
          <rect x="5" y="5" width="14" height="14" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8.5 9h7M8.5 12.5h7M8.5 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
      {icon === 'refer' && (
        <>
          <circle cx="8" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="16.5" cy="10.5" r="1.8" stroke="currentColor" strokeWidth="1.7" />
          <path d="M4.8 18c.7-2.2 2.1-3.5 4.2-3.5s3.6 1.3 4.3 3.5M13.5 18c.4-1.6 1.5-2.5 3.2-2.5 1.4 0 2.4.8 2.9 2.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const location = useLocation()
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setMenuOpen(false)
    setMoreOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMoreOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreOpen(false)
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const renderMenuCard = (item: MenuItem) => {
    const content = (
      <>
        <div className="site-mega__icon">
          <MenuIcon icon={item.icon} />
        </div>
        <div className="site-mega__content">
          <div className="site-mega__title-row">
            <strong>{item.label}</strong>
            {item.badge && <span className="site-mega__badge">{item.badge}</span>}
          </div>
          <p>{item.description}</p>
        </div>
      </>
    )

    if (item.href) {
      return (
        <a className="site-mega__card" href={item.href} key={item.label}>
          {content}
        </a>
      )
    }

    return (
      <Link className="site-mega__card" key={item.label} to={item.to ?? '/'}>
        {content}
      </Link>
    )
  }

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-chrome__inner site-header__inner">
        <Link className="site-brand" to="/" aria-label="WallBolt Atelier home">
          <span className="site-brand__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 18.5 12 4l8 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 18.5v-4.2a4 4 0 0 1 8 0v4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span>
            Wall<em>Bolt</em> Atelier
          </span>
        </Link>

        <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Primary">
          {routeItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
              end={item.end}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}

          <button
            aria-expanded={moreOpen}
            aria-haspopup="true"
            className={`site-nav__link site-nav__button${moreOpen ? ' is-active site-nav__link--more-open' : ''}`}
            onClick={() => setMoreOpen((open) => !open)}
            type="button"
          >
            More
          </button>

          {moreOpen && (
            <div className="site-mega site-mega--mobile">
              <div className="site-mega__col">
                <span className="site-mega__label">Get Started</span>
                {getStartedItems.map(renderMenuCard)}
              </div>
              <div className="site-mega__col">
                <span className="site-mega__label">Resource & Community</span>
                {resourceItems.map(renderMenuCard)}
              </div>
              <div className="site-mega__footer">Building Dream Homes Since 2017</div>
            </div>
          )}

          <a className="site-mobile-cta" href="/#contact">
            Book Consultation
          </a>
        </nav>

        <div className="site-header__actions">
          <a className="site-header__cta" href="/#contact">Book Consultation</a>
        </div>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className={`site-menu-btn${menuOpen ? ' is-open' : ''}`}
          onClick={() => {
            setMenuOpen((open) => !open)
            if (menuOpen) {
              setMoreOpen(false)
            }
          }}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {moreOpen && (
        <div className="site-chrome__inner">
          <div className="site-mega site-mega--desktop">
            <div className="site-mega__col">
              <span className="site-mega__label">Get Started</span>
              {getStartedItems.map(renderMenuCard)}
            </div>
            <div className="site-mega__divider" />
            <div className="site-mega__col">
              <span className="site-mega__label">Resource & Community</span>
              {resourceItems.map(renderMenuCard)}
              <div className="site-mega__footer">Building Dream Homes Since 2017</div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default SiteNavbar
