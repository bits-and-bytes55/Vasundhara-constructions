import { Link } from 'react-router-dom'
import type { FooterPageSlug } from '../data/footerPages'
import { footerPageMap } from '../data/footerPages'
import '../premium-pages.css'

type FooterContentPageProps = {
  slug: FooterPageSlug
}

function FooterContentPage({ slug }: FooterContentPageProps) {
  const page = footerPageMap[slug]
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
  const lowerLabel = page.label.toLowerCase()

  return (
    <main className={`premium-page premium-page--info ${themeClassMap[slug]}`}>
      <section className="premium-hero premium-hero--compact">
        <div className="premium-shell premium-hero__grid">
          <div>
            <div className="premium-kicker">{page.kicker}</div>
            <h1 className="premium-title">{page.title}</h1>
            <p className="premium-subtitle">{page.subtitle}</p>
            <div className="premium-actions">
              <Link className="premium-button" to="/contacts">
                Contact Team
              </Link>
              <Link className="premium-button premium-button--ghost" to="/cost-estimator">
                Open Estimator
              </Link>
            </div>
            <div className="premium-stat-grid">
              {page.highlights.map((item) => (
                <div className="premium-stat-card" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="premium-panel"
            style={{ backgroundImage: `linear-gradient(160deg, rgba(34, 27, 21, 0.12), rgba(34, 27, 21, 0.52)), url('${page.visualImage}')` }}
          >
            <div className="premium-panel__content">
              <div className="premium-panel__chip">{page.visualLabel}</div>
              <div className="premium-panel__card">
                <strong>{page.visualTitle}</strong>
                <p>{page.visualText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--contrast">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">{page.label}</div>
            <h2>{page.label} explained in a practical, easy-to-scan format.</h2>
            <p>
              Use the sections below to review the main points related to {lowerLabel} before contacting the
              team or moving into a live project discussion.
            </p>
          </div>

          <div className="info-grid">
            {page.sections.map((section) => (
              <article className="info-card" key={section.title}>
                <h3>{section.title}</h3>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.title}-${index}`}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-shell">
          <div className="premium-cta-band">
            <div>
              <h3>Need clarification on {lowerLabel}?</h3>
              <p>
                If your question depends on a live project, site condition, or service scope, the team can
                explain how this page applies to your exact case.
              </p>
            </div>
            <div className="premium-actions">
              <Link className="premium-button" to="/contacts">
                Get In Touch
              </Link>
              <Link className="premium-button premium-button--ghost" to="/services">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FooterContentPage
