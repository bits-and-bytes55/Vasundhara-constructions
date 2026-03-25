import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchHomeContent } from '../api/content'
import { defaultHomeContent } from '../data/defaultHomeContent'
import type { HomeContent } from '../types/homeContent'
import '../premium-pages.css'

const newsroomSignals = [
  {
    title: 'Company announcements',
    text: 'Use this section for launches, service updates, regional expansion notes, and official studio communication.',
  },
  {
    title: 'Project milestones',
    text: 'Highlight handovers, major site completions, delivery achievements, and standout residential stories.',
  },
  {
    title: 'Editorial visibility',
    text: 'Keep press-ready updates, partnership notes, and industry-facing communication structured in one place.',
  },
]

function NewsMediaPage() {
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

  const newsSection = homeContent.newsMedia
  const newsItems = newsSection.items.length > 0 ? newsSection.items : defaultHomeContent.newsMedia.items
  const featuredStory = newsItems[0]

  return (
    <main className="premium-page premium-page--news-media">
      <section className="premium-hero">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">{newsSection.eyebrow}</div>
            <h1 className="premium-title">
              {newsSection.titleStart} <em>{newsSection.titleHighlight}</em> for updates that deserve a cleaner public story.
            </h1>
            <p className="premium-subtitle">{newsSection.subtitle}</p>
          </div>

          <article className="blog-feature news-feature">
            <div
              className="blog-feature__media"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(23, 18, 14, 0.06), rgba(23, 18, 14, 0.72)), url('${featuredStory?.image || '/images/luxury-villa.jpg'}')`,
              }}
            />
            <div className="blog-feature__content">
              <span className="blog-card__tag">{featuredStory?.category || 'Featured Story'}</span>
              <h2>{featuredStory?.title || 'Newsroom headline will appear here.'}</h2>
              <p>{featuredStory?.excerpt || 'Story summary will appear here once newsroom content is available.'}</p>
              <div className="blog-card__meta">
                {featuredStory?.publishedOn || 'Publish date'} | {featuredStory?.source || 'Source'}
              </div>
              <div className="premium-actions">
                <Link className="premium-button" to="/contacts">
                  Submit Media Query
                </Link>
                <Link className="premium-button premium-button--ghost" to="/blogs">
                  Explore Blogs
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="premium-section premium-section--contrast">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">Latest Stories</div>
            <h2>Fresh updates from the studio, project floor, and brand communication desk.</h2>
            <p>
              Every card below is managed through the admin newsroom workflow, so announcements and milestone
              stories can stay current without touching code.
            </p>
          </div>

          <div className="blog-grid news-grid">
            {newsItems.map((item) => (
              <article className="blog-card news-card" key={`${item.title}-${item.publishedOn}`}>
                <div
                  className="blog-card__media"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(23, 18, 14, 0.04), rgba(23, 18, 14, 0.6)), url('${item.image}')`,
                  }}
                />
                <div className="blog-card__content">
                  <span className="blog-card__tag">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <div className="blog-card__meta">
                    {item.publishedOn} | {item.source}
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
            <div className="premium-kicker">How To Use This Page</div>
            <h2>Keep the newsroom practical, credible, and easy to maintain.</h2>
            <p>
              This page works best when it stays focused on official updates, real project progress, and
              clear editorial communication instead of filler content.
            </p>
          </div>

          <div className="premium-grid premium-grid--services">
            {newsroomSignals.map((item, index) => (
              <article className="premium-card" key={item.title}>
                <div className="premium-card__index">{index + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section premium-section--contrast">
        <div className="premium-shell">
          <div className="premium-cta-band">
            <div>
              <h3>Need a quote, interview response, or brand clarification?</h3>
              <p>
                Use the contact route for partnership, editorial, or announcement-related questions and the
                team can route the request properly.
              </p>
            </div>
            <div className="premium-actions">
              <Link className="premium-button" to="/contacts">
                Contact Team
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

export default NewsMediaPage
