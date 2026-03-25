import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { footerPageMap } from '../data/footerPages'
import '../premium-pages.css'

function ContactPage() {
  const page = footerPageMap.contacts
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.currentTarget.reset()
    setSubmitted(true)
  }

  return (
    <main className="premium-page premium-page--info premium-page--theme-copper premium-page--contacts">
      <section className="premium-hero premium-hero--compact">
        <div className="premium-shell premium-hero__grid">
          <div>
            <div className="premium-kicker">{page.kicker}</div>
            <h1 className="premium-title">{page.title}</h1>
            <p className="premium-subtitle">{page.subtitle}</p>
            <div className="premium-actions">
              <a className="premium-button" href="tel:+919876543210">
                Call Now
              </a>
              <a className="premium-button premium-button--ghost" href="mailto:hello@wallboltatelier.com">
                Email Team
              </a>
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
            <div className="premium-kicker">Enquiry Desk</div>
            <h2>Share your requirement and find our studio on the map.</h2>
            <p>
              Use the enquiry form for project details, preferred callback timing, and service interest.
              Alongside it, the map gives you the studio area for meetings and site coordination.
            </p>
          </div>

          <div className="contact-grid">
            <article className="contact-form-card">
              <div className="contact-card-head">
                <strong>Project Enquiry Form</strong>
                <span>We usually respond within 24 working hours.</span>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <label className="contact-field">
                  <span>Full Name</span>
                  <input className="contact-input" name="name" placeholder="Your full name" required type="text" />
                </label>

                <label className="contact-field">
                  <span>Phone Number</span>
                  <input className="contact-input" name="phone" placeholder="+91 98765 43210" required type="tel" />
                </label>

                <label className="contact-field">
                  <span>Email Address</span>
                  <input className="contact-input" name="email" placeholder="you@example.com" required type="email" />
                </label>

                <label className="contact-field">
                  <span>City</span>
                  <input className="contact-input" name="city" placeholder="Noida / Delhi NCR" required type="text" />
                </label>

                <label className="contact-field">
                  <span>Service Needed</span>
                  <select className="contact-input" defaultValue="" name="service" required>
                    <option disabled value="">
                      Select a service
                    </option>
                    <option value="construction">Construction</option>
                    <option value="interiors">Interiors</option>
                    <option value="elevations">Elevations</option>
                    <option value="terrace-garden">Terrace Garden</option>
                    <option value="design-build">Complete Design + Build</option>
                  </select>
                </label>

                <label className="contact-field">
                  <span>Project Scale</span>
                  <input className="contact-input" name="area" placeholder="Plot size or built-up area" type="text" />
                </label>

                <label className="contact-field contact-field--full">
                  <span>Project Brief</span>
                  <textarea
                    className="contact-input contact-input--textarea"
                    name="message"
                    placeholder="Tell us about your plot, floors, package preference, timeline, or any specific design goals."
                    required
                    rows={6}
                  />
                </label>

                <div className="contact-form__footer">
                  <button className="premium-button" type="submit">
                    Submit Enquiry
                  </button>
                  <p className="contact-note">For urgent queries, call or WhatsApp the team directly.</p>
                </div>

                {submitted && (
                  <p className="contact-form-status" role="status">
                    Thanks. Your enquiry has been noted and the team will get back to you shortly.
                  </p>
                )}
              </form>
            </article>

            <div className="contact-stack">
              <article className="contact-map-card">
                <div className="contact-card-head">
                  <strong>Studio Location</strong>
                  <span>Sector 62, Noida, Uttar Pradesh</span>
                </div>
                <div className="contact-map-frame">
                  <iframe
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Sector%2062%20Noida&z=14&output=embed"
                    title="WallBolt Atelier location map"
                  />
                </div>
              </article>

              <div className="contact-detail-grid">
                <article className="contact-detail-card">
                  <strong>Call or WhatsApp</strong>
                  <p>+91 98765 43210</p>
                  <span>Best for quick consultations and same-day coordination.</span>
                </article>
                <article className="contact-detail-card">
                  <strong>Email</strong>
                  <p>hello@wallboltatelier.com</p>
                  <span>Share site briefs, drawings, and structured requirements.</span>
                </article>
                <article className="contact-detail-card">
                  <strong>Visit Window</strong>
                  <p>Mon to Sat, 10 AM to 7 PM</p>
                  <span>Meetings work best when scheduled in advance.</span>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">{page.label}</div>
            <h2>What to share before the first consultation.</h2>
            <p>
              These notes help the team understand where your requirement stands and how to guide the next
              step more accurately.
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
              <h3>Need cost clarity before filling the enquiry form?</h3>
              <p>
                Start with the estimator or compare package levels first, then come back with a more
                specific requirement for a sharper consultation.
              </p>
            </div>
            <div className="premium-actions">
              <Link className="premium-button" to="/cost-estimator">
                Open Estimator
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

export default ContactPage
