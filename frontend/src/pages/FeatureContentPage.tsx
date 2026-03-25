import { Link } from 'react-router-dom'
import type { FeaturePageSlug } from '../data/featurePages'
import { featurePageMap } from '../data/featurePages'
import '../premium-pages.css'

type FeatureContentPageProps = {
  slug: FeaturePageSlug
}

function FeatureContentPage({ slug }: FeatureContentPageProps) {
  const page = featurePageMap[slug]
  const themeClassMap: Record<FeaturePageSlug, string> = {
    'our-packages': 'premium-page--theme-copper',
    'how-it-works': 'premium-page--theme-sand',
    'our-app': 'premium-page--theme-slate',
    'home-construction-guide': 'premium-page--theme-forest',
    testimonials: 'premium-page--theme-plum',
    'refer-a-friend': 'premium-page--theme-rose',
  }
  const lowerLabel = page.label.replace(/\?$/, '').toLowerCase()

  return (
    <main className={`premium-page premium-page--feature ${themeClassMap[slug]}`}>
      <section className="premium-hero premium-hero--compact">
        <div className="premium-shell premium-hero__grid">
          <div>
            <div className="premium-kicker">{page.kicker}</div>
            <h1 className="premium-title">{page.title}</h1>
            <p className="premium-subtitle">{page.subtitle}</p>
            <div className="premium-actions">
              <Link className="premium-button" to={page.ctaPrimary.to}>
                {page.ctaPrimary.label}
              </Link>
              <Link className="premium-button premium-button--ghost" to={page.ctaSecondary.to}>
                {page.ctaSecondary.label}
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
            <h2>What to know about {lowerLabel} before you decide the next step.</h2>
            <p>
              These sections explain how {lowerLabel} fits into planning, decision-making, and the broader
              WallBolt journey, so the next action feels more obvious.
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
              <h3>Need help after reviewing {lowerLabel}?</h3>
              <p>
                If you want to go deeper than this overview, we can guide you toward the right next step
                based on your project stage, budget clarity, and service fit.
              </p>
            </div>
            <div className="premium-actions">
              <Link className="premium-button" to={page.ctaPrimary.to}>
                {page.ctaPrimary.label}
              </Link>
              <Link className="premium-button premium-button--ghost" to="/contacts">
                Contact Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FeatureContentPage
