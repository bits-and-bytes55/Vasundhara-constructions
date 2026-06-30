import { Link } from 'react-router-dom'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/company-profile', label: 'Company Profile' },
  { to: '/blogs', label: 'Blogs' },
]

const pages = [
  { to: '/about-us', label: 'About Us' },
  { to: '/contacts', label: 'Contacts' },
  { to: '/cost-estimator', label: 'Cost Calculator' },
  { to: '/packages', label: 'Packages' },
]

function SiteFooter() {
  return (
    <footer className="bg-black text-gray-200">
      <div className="container mx-auto px-4 sm:px-2 lg:px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-2 border-b border-gray-800">
          <div className="sm:col-span-2">
            <Link className="inline-flex items-center gap-3 mb-4" to="/">
              <span className="h-10 w-auto">
                <img
                  src="/images/vasundharawebdownload.png"
                  alt="Vasundhara Construction"
                  className="h-20 w-auto bg-white rounded-lg"
                />
              </span>
            </Link>
            <p className="text-sm sm:text-sm mt-8 leading-relaxed text-gray-300">
              Premium construction and interior design studio for modern homes, curated
              spaces, and high‑clarity project delivery across every milestone.
            </p>
            <div className="mt-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Design-led delivery. Zero chaos.
            </div>

            <a
              href="https://wa.me/919818866849"
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-4 items-center gap-2 bg-green-600/20 border border-green-500/40 text-green-400 text-[12px] px-3.5 py-2 rounded-lg hover:bg-green-600/30 hover:border-green-500/60 hover:-translate-y-0.5 transition-all duration-250"
            >
              WhatsApp Consultation
            </a>

            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/vasundharaconstruction"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:border-white hover:text-white hover:scale-150 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 8.4h2.4V5.3h-2.3c-2.8 0-4 1.3-4 3.8v2H8v3h2v4.6h3.1v-4.6h2.5l.5-3h-3V9.3c0-.7.3-.9.9-.9z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/vasundhara_construction_1/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:border-white hover:text-white hover:scale-150 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4.3" y="4.3" width="15.4" height="15.4" rx="4.2" />
                  <circle cx="12" cy="12" r="3.6" />
                  <circle cx="17.4" cy="6.8" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@vasundhara_construction"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:border-white hover:text-white hover:scale-150 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2c-.3-1-1-1.8-2-2C19.8 3.8 12 3.8 12 3.8s-7.8 0-9.5.5c-1 .2-1.7.9-2 2C0 7.3 0 12 0 12s0 4.7.5 5.8c.3 1 1 1.8 2 2 1.7.5 9.5.5 9.5.5s7.8 0 9.5-.5c1-.2 1.7-.9 2-2 .5-1 .5-5.8.5-5.8s0-4.7-.5-5.8zM9.5 15.2v-6.4l6.4 3.2-6.4 3.2z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:border-white hover:text-white hover:scale-150 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.7 7.4c.1.3.1.7.1 1a9.1 9.1 0 0 1-14 7.7h.7a6.4 6.4 0 0 0 4-1.4 3.2 3.2 0 0 1-3-2.2h1.5a3.2 3.2 0 0 1-2.5-3.2c.4.2.8.3 1.2.3a3.2 3.2 0 0 1-1.4-2.7c0-.6.2-1.2.5-1.7A9.1 9.1 0 0 0 12.5 9a3.2 3.2 0 0 1 5.4-2.9 6.3 6.3 0 0 0 2-.8 3.2 3.2 0 0 1-1.4 1.8c.6-.1 1.2-.2 1.8-.5a6.8 6.8 0 0 1-1.6 1.6z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-300 hover:border-white hover:text-white hover:scale-150 transition"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="6" cy="7" r="1.6" />
                  <path d="M4.5 9.3h3V18h-3zM10 9.3h2.9v1.2c.4-.8 1.4-1.5 2.9-1.5 3 0 3.6 2 3.6 4.5V18h-3v-4c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.2v4h-3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Pages */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              Pages
            </h3>
            <ul className="space-y-2 text-sm">
              {pages.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-400 mb-4">
              Find-Us
            </h3>
            <div className="mt-4 rounded-lg overflow-hidden shadow-md">
              <iframe
                title="Office Location"
                src="https://maps.google.com/maps?q=VASUNDHARA%20CONSTRUCTION%20A-96%2C%20B%20Block%2C%20Sector%2065%2C%20Noida%2C%20Uttar%20Pradesh%20201301%2C%20India&t=m&z=10&output=embed&iwloc=near"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-md"
              ></iframe>
            </div>

            <ul className="space-y-1 mt-1 text-sm text-gray-300">
              <li>
                <a href="tel:+919876543210" className="hover:text-white transition">
                  +91 9818866849
                </a>
              </li>
              <li>
                <span>
                  <a
                    href="mailto:info@vasundhara.com"
                    className="hover:text-white transition inline"
                  >
                    vasundhara.construction30@gmail.com
                  </a>
                </span>
              </li>
              <li>
                <span className="text-gray-400">
                  Office No.1, 1st Floor G-9, Sector 63, Noida, 201309
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="flex flex-col sm:flex-row justify-around items-center gap-4 pt-8 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Vasundhara Construction & Interiors. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-gray-400">
            <span>Protected</span>
            <span>500+ Quality Checks</span>
            <span>Architect-Led Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter