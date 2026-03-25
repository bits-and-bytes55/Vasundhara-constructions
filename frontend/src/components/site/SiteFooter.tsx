import { Link } from 'react-router-dom'
import { footerInfoLinks, footerPolicyLinks } from '../../data/footerPages'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/company-profile', label: 'Company Profile' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/cost-estimator', label: 'Cost Calculator' },
  { to: '/packages/compare', label: 'Compare Packages' },
]

function SiteFooter() {
  return (
    <footer className="site-footer" id="blogs">
      <div className="site-chrome__inner site-footer__content">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link className="site-brand" to="/">
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
            <p>
              Premium design-build studio for modern homes, curated interiors, and high-clarity
              project delivery across every milestone.
            </p>
            <div className="site-footer__eyebrow">Design-led delivery. Zero chaos.</div>
          </div>

          <div className="site-footer__col">
            <h3>Explore</h3>
            <ul className="site-footer__list">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <h3>Pages</h3>
            <ul className="site-footer__list">
              {footerInfoLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <h3>Policies</h3>
            <ul className="site-footer__list">
              {footerPolicyLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <h3>Contact</h3>
            <ul className="site-footer__list">
              <li>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li>
                <a href="mailto:hello@wallboltatelier.com">hello@wallboltatelier.com</a>
              </li>
              <li>
                <span>Sector 62, Noida, Uttar Pradesh</span>
              </li>
              <li>
                <a href="https://wa.me/919876543210" rel="noreferrer" target="_blank">
                  WhatsApp Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__meta">
          <div className="site-footer__copy">
            (c) {new Date().getFullYear()} WallBolt Atelier. All rights reserved.
          </div>
          <div className="site-footer__trust">
            <span>Escrow protected</span>
            <span>500+ quality checks</span>
            <span>Architect-led delivery</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
