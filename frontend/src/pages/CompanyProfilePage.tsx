import { Link } from 'react-router-dom'
import '../premium-pages.css'

const leadershipStats = [
  {
    value: '15+',
    label: 'Years of experience',
    detail: 'Deep execution knowledge across home construction, design, and handover planning.',
  },
  {
    value: '10,000+',
    label: 'Homes delivered',
    detail: 'A scaled operating model shaped around reliability, quality control, and customer trust.',
  },
  {
    value: '500+',
    label: 'Quality checks',
    detail: 'Structured inspections built into the process instead of being treated as afterthoughts.',
  },
  {
    value: '100%',
    label: 'Escrow mindset',
    detail: 'Clarity and payment confidence remain central to how projects are managed.',
  },
]

const companyPillars = [
  {
    title: 'Design-led decision making',
    text: 'We aim for homes that feel intentional from facade to finish, not just technically complete.',
  },
  {
    title: 'Clear costing and planning',
    text: 'Budgeting, package alignment, and execution milestones are treated as part of the design conversation.',
  },
  {
    title: 'Execution discipline',
    text: 'Good projects come from consistent site systems, not random brilliance at the last minute.',
  },
  {
    title: 'Client trust as a deliverable',
    text: 'Communication, review points, and accountability are built to reduce uncertainty throughout the project.',
  },
]

const values = [
  {
    title: 'Transparency first',
    text: 'From the first consultation to the final handover, clients should know what is happening and why.',
  },
  {
    title: 'Premium without excess',
    text: 'We prefer strong proportion, good materials, and finish depth over flashy decisions that age quickly.',
  },
  {
    title: 'Systems over chaos',
    text: 'Process clarity lets us protect timelines, quality, and customer confidence at the same time.',
  },
]

const journey = [
  {
    step: '01',
    title: 'Understand the plot and the family',
    description: 'Every project begins with context, goals, site realities, and the way the home will actually be lived in.',
  },
  {
    step: '02',
    title: 'Shape the design and budget together',
    description: 'We refine layout, facade intent, package direction, and cost logic before execution starts.',
  },
  {
    step: '03',
    title: 'Deliver with structured controls',
    description: 'Execution is guided by reviews, checkpoints, site coordination, and progress visibility.',
  },
  {
    step: '04',
    title: 'Finish with confidence',
    description: 'The goal is not just completion, but a home that feels well considered and professionally handed over.',
  },
]

function CompanyProfilePage() {
  return (
    <main className="premium-page premium-page--company">
      <section className="premium-hero">
        <div className="premium-shell premium-hero__grid">
          <div>
            <div className="premium-kicker">Company Profile</div>
            <h1 className="premium-title">
              A homebuilding company shaped around <em>trust, detail, and delivery discipline.</em>
            </h1>
            <p className="premium-subtitle">
              WallBolt Atelier is built for clients who want premium outcomes without the usual confusion,
              fragmented coordination, or unpredictable execution experience.
            </p>
            <div className="premium-actions">
              <Link className="premium-button" to="/cost-estimator">
                Start With Estimate
              </Link>
              <Link className="premium-button premium-button--ghost" to="/services">
                Explore Services
              </Link>
            </div>
            <div className="premium-stat-grid">
              <div className="premium-stat-card">
                <strong>Design + build</strong>
                <span>We treat architecture, costing, and execution as one connected system.</span>
              </div>
              <div className="premium-stat-card">
                <strong>Client confidence</strong>
                <span>Communication quality matters as much as material quality during delivery.</span>
              </div>
              <div className="premium-stat-card">
                <strong>Long-term value</strong>
                <span>Homes are shaped to stay visually strong and practically reliable over time.</span>
              </div>
            </div>
          </div>

          <div
            className="premium-panel"
            style={{ backgroundImage: "linear-gradient(160deg, rgba(34, 27, 21, 0.1), rgba(34, 27, 21, 0.45)), url('/images/heroimg.jpeg')" }}
          >
            <div className="premium-panel__content">
              <div className="premium-panel__chip">WallBolt Atelier</div>
              <div className="premium-panel__card">
                <strong>Built to make premium homebuilding feel more structured</strong>
                <p>
                  Our direction is simple: stronger design decisions, more reliable execution systems, and a
                  calmer client experience from start to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--contrast">
        <div className="premium-shell premium-split">
          <div
            className="premium-image-card"
            style={{ backgroundImage: "linear-gradient(180deg, rgba(31, 23, 17, 0.08), rgba(31, 23, 17, 0.42)), url('/images/ashushafi.png')" }}
          >
            <div className="premium-image-card__copy">
              <strong>Ashu Saifi</strong>
              <p>
                CEO and Founder, focused on building a company where design quality and execution integrity
                stay equally important.
              </p>
            </div>
          </div>

          <div className="premium-stack">
            <div className="premium-heading">
              <div className="premium-kicker">Leadership</div>
              <h2>The company vision starts with reducing friction for homeowners.</h2>
              <p>
                WallBolt was shaped around the idea that premium construction should feel more dependable,
                better explained, and more intentional from the first meeting onward.
              </p>
            </div>

            <div className="premium-checklist">
              {values.map((item) => (
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
          <div className="premium-heading">
            <div className="premium-kicker">At A Glance</div>
            <h2>Numbers that reflect scale, consistency, and operating intent.</h2>
            <p>
              These metrics matter because they show how the company is designed to support design quality,
              site rigor, and a higher-trust customer journey.
            </p>
          </div>

          <div className="project-metrics">
            {leadershipStats.map((item) => (
              <article className="premium-card" key={item.label}>
                <div className="premium-card__index">{item.value}</div>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--contrast">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">Core Pillars</div>
            <h2>What defines the WallBolt operating style.</h2>
            <p>
              The company is not trying to be everything. It is trying to be dependable in the areas that
              matter most to premium home clients.
            </p>
          </div>

          <div className="premium-grid premium-grid--services">
            {companyPillars.map((item, index) => (
              <article className="premium-card" key={item.title}>
                <div className="premium-card__index">{index + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">How We Work</div>
            <h2>A company process designed for fewer surprises and stronger outcomes.</h2>
            <p>
              The goal is not just speed. It is the combination of clarity, control, and a finished home
              that feels like it was handled by one thoughtful team.
            </p>
          </div>

          <div className="premium-process">
            {journey.map((item) => (
              <article className="premium-process__item" key={item.step}>
                <div className="premium-process__step">Step {item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-shell">
          <div className="premium-cta-band">
            <div>
              <h3>Want to know if WallBolt is the right fit for your home?</h3>
              <p>
                Start with the estimate tool or explore our service stack. From there we can help shape the
                most suitable design and execution direction for your project.
              </p>
            </div>
            <div className="premium-actions">
              <Link className="premium-button" to="/cost-estimator">
                Get Estimate
              </Link>
              <Link className="premium-button premium-button--ghost" to="/projects">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CompanyProfilePage
