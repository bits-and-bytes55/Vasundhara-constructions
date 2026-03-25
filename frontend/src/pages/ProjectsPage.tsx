import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchHomeContent } from '../api/content'
import { defaultHomeContent } from '../data/defaultHomeContent'
import type { HomeContent } from '../types/homeContent'
import '../premium-pages.css'

const metrics = [
  { value: '10,000+', label: 'homes delivered', note: 'Across plotted home, villa, and interior categories.' },
  { value: '10+', label: 'cities served', note: 'Expanding delivery footprint with the same operating model.' },
  { value: '4.9/5', label: 'client rating', note: 'Built on experience, communication, and final finish quality.' },
  { value: '100%', label: 'tracked milestones', note: 'Projects are managed with visible stage progression.' },
]

const framework = [
  {
    title: 'Context-first design',
    text: 'Every project starts with site logic, natural light, privacy, and movement before surface styling.',
  },
  {
    title: 'Material restraint',
    text: 'Premium spaces feel richer when the palette is edited and details are repeated with discipline.',
  },
  {
    title: 'Execution readiness',
    text: 'We prefer decisions that look strong in render and stay believable when built on site.',
  },
]

function ProjectsPage() {
  const [homeContent, setHomeContent] = useState<HomeContent>(defaultHomeContent)

  useEffect(() => {
    let active = true

    fetchHomeContent()
      .then((content) => {
        if (active) {
          setHomeContent(content)
        }
      })
      .catch(() => {
        if (active) {
          setHomeContent(defaultHomeContent)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const projectSection = homeContent.projects
  const featuredProjects = projectSection.items.length > 0 ? projectSection.items : defaultHomeContent.projects.items
  const projectCountMetric = `${featuredProjects.length}+`

  return (
    <main className="premium-page premium-page--projects">
      <section className="premium-hero">
        <div className="premium-shell premium-hero__grid">
          <div>
            <div className="premium-kicker">Selected Projects</div>
            <h1 className="premium-title">
              Spaces designed to feel premium, <em>not overdone.</em>
            </h1>
            <p className="premium-subtitle">
              These projects reflect our preferred balance: strong architecture, quieter material choices,
              and delivery that keeps the final build close to the original intent.
            </p>
            <div className="premium-actions">
              <Link className="premium-button" to="/services">
                Explore Services
              </Link>
              <Link className="premium-button premium-button--ghost" to="/cost-estimator">
                Estimate Your Build
              </Link>
            </div>
            <div className="premium-stat-grid">
              <div className="premium-stat-card">
                <strong>{projectCountMetric}</strong>
                <span>Live portfolio stories curated from the current CMS project collection.</span>
              </div>
              <div className="premium-stat-card">
                <strong>Interior depth</strong>
                <span>Material-led spaces that stay rich without feeling heavy or trend-dependent.</span>
              </div>
              <div className="premium-stat-card">
                <strong>Execution clarity</strong>
                <span>Projects that are designed to be buildable, maintainable, and easy to hand over well.</span>
              </div>
            </div>
          </div>

          <div
            className="premium-panel"
            style={{ backgroundImage: `linear-gradient(160deg, rgba(34, 27, 21, 0.16), rgba(34, 27, 21, 0.58)), url('${featuredProjects[0]?.images[0] || '/images/heroimg.jpeg'}')` }}
          >
            <div className="premium-panel__content">
              <div className="premium-panel__chip">Recently Delivered</div>
              <div className="premium-panel__card">
                <strong>Architecture, interiors, and detail design that read as one story</strong>
                <p>
                  Our strongest projects are the ones where the facade, layout, lighting, and finish palette
                  all support the same mood.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--contrast">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">{projectSection.eyebrow}</div>
            <h2>
              {projectSection.titleStart} <em>{projectSection.titleHighlight}</em> from our premium delivery pipeline.
            </h2>
            <p>{projectSection.subtitle}</p>
          </div>

          <div className="project-grid">
            {featuredProjects.map((project) => (
              <article
                className="project-card"
                key={`${project.title}-${project.location}`}
                style={{ backgroundImage: `linear-gradient(180deg, rgba(23, 18, 14, 0.06), rgba(23, 18, 14, 0.72)), url('${project.images[0]}')` }}
              >
                <div className="project-card__copy">
                  <div className="project-card__tag">{project.tag}</div>
                  <div className="project-card__meta">
                    <h3>{project.title}</h3>
                    <p>{project.area} | {project.location}</p>
                    <p>{project.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">Scale & Trust</div>
            <h2>The delivery system behind these outcomes.</h2>
            <p>
              Strong visuals matter, but project confidence comes from the system underneath. These numbers
              reflect the consistency we want across every route and region.
            </p>
          </div>

          <div className="project-metrics">
            {metrics.map((metric) => (
              <article className="premium-card" key={metric.label}>
                <div className="premium-card__index">{metric.value}</div>
                <h3>{metric.label}</h3>
                <p>{metric.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--contrast">
        <div className="premium-shell project-story-grid">
          <div className="premium-stack">
            <div className="premium-heading">
              <div className="premium-kicker">Project DNA</div>
              <h2>What makes a WallBolt project feel premium in the final walkthrough.</h2>
              <p>
                We focus on fewer, stronger choices. That means better facade discipline, more believable
                interiors, and transitions that feel composed instead of crowded.
              </p>
            </div>

            <div className="premium-checklist">
              {framework.map((item) => (
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

          <div className="project-quote">
            <blockquote>
              "The difference was not just the design. It was how confidently every detail moved from idea to
              site. Nothing felt random by the time we walked through the finished home."
            </blockquote>
            <cite>Client feedback from a recently delivered villa project</cite>
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-shell">
          <div className="premium-cta-band">
            <div>
              <h3>Want your home to feel like it belongs in this portfolio?</h3>
              <p>
                Start with service planning and a realistic cost range, then we can help shape the right
                package and design direction for your plot or property.
              </p>
            </div>
            <div className="premium-actions">
              <Link className="premium-button" to="/cost-estimator">
                Estimate Project Cost
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

export default ProjectsPage
