import type { FooterPageSlug } from '../data/footerPages'
import '../premium-pages.css'

type FooterContentPageProps = {
  slug: FooterPageSlug
}

function FooterContentPage({ slug }: FooterContentPageProps) {
  const themeClassMap: Record<FooterPageSlug, string> = {
    'terms-and-conditions': 'premium-page--theme-slate',
    'privacy-policy': 'premium-page--theme-forest',
    disclaimer: 'premium-page--theme-rose',
    contacts: 'premium-page--theme-copper',
    'about-us': 'premium-page--theme-sand',
    faqs: 'premium-page--theme-plum',
    'cancellation-policy': 'premium-page--theme-rose',
    'news-media': 'premium-page--theme-slate',
  }

  const footerServices = ['Construction', 'Interiors', 'Elevations', 'Terrace Garden', 'Luxury Bathrooms', 'Custom Furniture']
  const footerSocials = [
    { label: 'Facebook', href: 'https://facebook.com', icon: 'fb' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'tw' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'li' },
    { label: 'Instagram', href: 'https://instagram.com', icon: 'ig' },
  ]

  return (
    <main className={`premium-page premium-page--info ${themeClassMap[slug]}`}>
      Footer
      <footer className="bg-gray-900 text-gray-400" id="blogs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[{ label: 'Home', href: '#home' }, { label: 'Services', href: '#services' }, { label: 'Projects', href: '#projects' }, { label: 'Company Profile', href: '#company' }, { label: 'Blogs', href: '#blogs' }, { label: 'Contact Us', href: '#contact' }].map(l => (
                  <li key={l.label}><a href={l.href} className="hover:text-white transition">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500 mb-4">Our Services</h3>
              <ul className="space-y-2">
                {footerServices.map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500 mb-4">Contact Us</h3>
              {[{ ic: '📞', tx: '+91 9818866849' }, { ic: '✉️', tx: 'vasundhara.construction30@gmail.com' }, { ic: '📍', tx: '123 Dream Avenue, Noida, India' }].map(c => (
                <div key={c.tx} className="flex items-center gap-2 mb-2"><span>{c.ic}</span>{c.tx}</div>
              ))}
              <a href="https://wa.me/919818866849" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 bg-green-600/20 border border-green-600/40 rounded-full px-3 py-1.5 text-green-400 text-sm hover:bg-green-600/30 transition">💬 Chat on WhatsApp</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
            <div className="flex gap-4">
              {footerSocials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-500 hover:border-orange-600 hover:text-orange-600 transition">
                  {s.icon === 'fb' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.4h2.4V5.3h-2.3c-2.8 0-4 1.3-4 3.8v2H8v3h2v4.6h3.1v-4.6h2.5l.5-3h-3V9.3c0-.7.3-.9.9-.9z" /></svg>}
                  {s.icon === 'tw' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.7 7.4c.1.3.1.7.1 1a9.1 9.1 0 0 1-14 7.7h.7a6.4 6.4 0 0 0 4-1.4 3.2 3.2 0 0 1-3-2.2h1.5a3.2 3.2 0 0 1-2.5-3.2c.4.2.8.3 1.2.3a3.2 3.2 0 0 1-1.4-2.7c0-.6.2-1.2.5-1.7A9.1 9.1 0 0 0 12.5 9a3.2 3.2 0 0 1 5.4-2.9 6.3 6.3 0 0 0 2-.8 3.2 3.2 0 0 1-1.4 1.8c.6-.1 1.2-.2 1.8-.5a6.8 6.8 0 0 1-1.6 1.6z" /></svg>}
                  {s.icon === 'li' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="7" r="1.6" /><path d="M4.5 9.3h3V18h-3zM10 9.3h2.9v1.2c.4-.8 1.4-1.5 2.9-1.5 3 0 3.6 2 3.6 4.5V18h-3v-4c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.2v4h-3z" /></svg>}
                  {s.icon === 'ig' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4.3" y="4.3" width="15.4" height="15.4" rx="4.2" stroke="currentColor" strokeWidth="1.9" /><circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.9" /><circle cx="17.4" cy="6.8" r="1" fill="currentColor" /></svg>}
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Vasundhara Construction. All Rights Reserved.</p>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>🔒 Protected</span>
              <span>✅ Quality Assured</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default FooterContentPage
