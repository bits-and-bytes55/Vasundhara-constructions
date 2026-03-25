import { Link } from 'react-router-dom'
import '../premium-pages.css'

const services = [
  {
    name: 'Construction',
    description: 'Quality civil construction delivered on time and within budget.',
    points: ['Transparent planning', 'Dedicated execution teams', 'Milestone-based quality checks'],
  },
  {
    name: 'Interiors',
    description: 'Stylish, functional, and personalized interior designing.',
    points: ['Space planning', 'Custom storage solutions', 'Material and lighting curation'],
  },
  {
    name: 'Elevations',
    description: 'Transform the front facade to stand out with a premium look.',
    points: ['Facade concepts', 'Material combinations', 'Premium exterior detailing'],
  },
  {
    name: 'Terrace Garden',
    description: 'Refresh your rooftop with lush and serene outdoor spaces.',
    points: ['Rooftop landscape planning', 'Outdoor seating zones', 'Low-maintenance green styling'],
  },
]

const process = [
  {
    step: '01',
    title: 'Strategy & Brief',
    description: 'We map goals, lifestyle needs, budget bands, and site realities before design moves forward.',
  },
  {
    step: '02',
    title: 'Design Resolution',
    description: 'Plans, mood, material direction, and service coordination are resolved before execution starts.',
  },
  {
    step: '03',
    title: 'Cost Lock & Schedule',
    description: 'Package fit, milestone costing, and phase sequencing are clarified with zero ambiguity.',
  },
  {
    step: '04',
    title: 'Site Delivery',
    description: 'Dedicated teams execute with reviews, quality checks, progress visibility, and disciplined closure.',
  },
]

const qualityPoints = [
  {
    title: 'Construction with commercial discipline',
    text: 'Procurement, labour flow, approvals, and quality gates stay aligned so timelines remain believable.',
  },
  {
    title: 'Design language that feels premium, not noisy',
    text: 'We keep proportion, materiality, and detailing intentional so the home feels elevated for years.',
  },
  {
    title: 'Client communication that reduces anxiety',
    text: 'Clear milestone reviews, escalation channels, and structured updates keep the project easy to track.',
  },
]

function ServicesPage() {
  return (
    <main className="premium-page premium-page--services">
      <section className="premium-hero">
        <div className="premium-shell premium-hero__grid">
          <div>
            <div className="premium-kicker">WallBolt Services</div>
            <h1 className="premium-title">
              The same core services you see on the home page, now in a more <em>premium detailed view.</em>
            </h1>
            <p className="premium-subtitle">
              Construction, Interiors, Elevations, and Terrace Garden are the four signature offerings
              that shape the WallBolt experience across design, build quality, and final lifestyle value.
            </p>
            <div className="premium-actions">
              <Link className="premium-button" to="/cost-estimator">
                Start Cost Estimate
              </Link>
              <Link className="premium-button premium-button--ghost" to="/projects">
                View Recent Projects
              </Link>
            </div>
            <div className="premium-stat-grid">
              <div className="premium-stat-card">
                <strong>4 services</strong>
                <span>Focused categories built to cover the biggest decisions in your home journey.</span>
              </div>
              <div className="premium-stat-card">
                <strong>500+</strong>
                <span>Quality checkpoints across structure, finish, exterior detailing, and handover.</span>
              </div>
              <div className="premium-stat-card">
                <strong>Single team</strong>
                <span>Planning, design, costing, and execution coordinated under one roof.</span>
              </div>
            </div>
          </div>

          <div
            className="premium-panel"
            style={{ backgroundImage: "linear-gradient(160deg, rgba(34, 27, 21, 0.16), rgba(34, 27, 21, 0.58)), url('/images/luxury-villa.jpg')" }}
          >
            <div className="premium-panel__content">
              <div className="premium-panel__chip">Construction + Lifestyle</div>
              <div className="premium-panel__card">
                <strong>Built around the same four services featured on the home page</strong>
                <p>
                  Each service is shaped to add practical value and visual impact, whether we are building
                  the full home, refining interiors, upgrading the facade, or activating the terrace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--contrast">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">Service Stack</div>
            <h2>The four WallBolt services that anchor the complete home experience.</h2>
            <p>
              Instead of spreading effort across too many categories, we keep the offer sharp around the
              same four services highlighted on the home page and deepen execution quality inside each one.
            </p>
          </div>

          <div className="premium-grid premium-grid--services">
            {services.map((service, index) => (
              <article className="premium-card" key={service.name}>
                <div className="premium-card__index">{index + 1}</div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">Delivery Flow</div>
            <h2>A process that keeps premium design practical to execute.</h2>
            <p>
              We front-load decisions where they matter most, which is why site execution stays cleaner,
              changes stay controlled, and final finishes feel more intentional.
            </p>
          </div>

          <div className="premium-process">
            {process.map((item) => (
              <article className="premium-process__item" key={item.step}>
                <div className="premium-process__step">Step {item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--contrast">
        <div className="premium-shell premium-split">
          <div
            className="premium-image-card"
            style={{ backgroundImage: "linear-gradient(180deg, rgba(31, 23, 17, 0.08), rgba(31, 23, 17, 0.52)), url('/images/why-choose-us.jpeg')" }}
          >
            <div className="premium-image-card__copy">
              <strong>Execution quality is designed, not hoped for.</strong>
              <p>
                Our systems are set up to protect design intent during procurement, sequencing, site
                coordination, and finishing decisions.
              </p>
            </div>
          </div>

          <div className="premium-stack">
            <div className="premium-heading">
              <div className="premium-kicker">Why It Feels Better</div>
              <h2>Less project noise. Better material choices. More confidence at every stage.</h2>
              <p>
                Premium delivery is not just about expensive finishes. It is about fewer surprises, a
                cleaner process, and details that stay consistent from drawing to reality.
              </p>
            </div>

            <div className="premium-checklist">
              {qualityPoints.map((item) => (
                <div className="premium-checklist__item" key={item.title}>
                  <span>+</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-shell">
          <div className="premium-cta-band">
            <div>
              <h3>Planning a new home or a serious upgrade?</h3>
              <p>
                Start with the cost calculator, compare package levels, and then we can shape the right
                service mix for your project.
              </p>
            </div>
            <div className="premium-actions">
              <Link className="premium-button" to="/cost-estimator">
                Get Estimate
              </Link>
              <Link className="premium-button premium-button--ghost" to="/packages/compare">
                Compare Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ServicesPage
