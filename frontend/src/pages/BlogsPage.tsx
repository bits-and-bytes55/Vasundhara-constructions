import { Link } from 'react-router-dom'
import '../premium-pages.css'

const featuredPost = {
  category: 'Construction Planning',
  title: 'How to plan your home budget before design decisions start costing you later',
  excerpt:
    'A better home project begins when design, package selection, and execution reality are aligned early instead of after the drawings look expensive.',
  readTime: '6 min read',
  image: '/images/heroimg.jpeg',
}

const posts = [
  {
    category: 'Interiors',
    title: 'Interior upgrades that actually improve daily living instead of just looking premium',
    excerpt: 'Where to spend, where to stay restrained, and how to keep the home feeling elevated without visual clutter.',
    readTime: '5 min read',
    image: '/images/dream-living-room.jpeg',
  },
  {
    category: 'Bedrooms',
    title: 'Master bedroom ideas that feel hotel-inspired but still practical for real homes',
    excerpt: 'Layout, lighting, and material choices that create comfort without turning the room into a showroom.',
    readTime: '4 min read',
    image: '/images/dream-master-bed-room.jpeg',
  },
  {
    category: 'Kitchen',
    title: 'Kitchen planning mistakes homeowners usually discover too late',
    excerpt: 'Clearances, workflow, storage depth, and finish decisions that affect everyday ease more than expected.',
    readTime: '7 min read',
    image: '/images/dream-kitchen.jpeg',
  },
  {
    category: 'Elevation',
    title: 'What makes a modern home elevation look expensive without becoming noisy',
    excerpt: 'A guide to proportion, material combinations, and facade detailing that stays sharp over time.',
    readTime: '5 min read',
    image: '/images/dream-elevation.jpeg',
  },
  {
    category: 'Projects',
    title: 'Why premium projects need stronger execution systems, not just stronger concepts',
    excerpt: 'Good renders are easy to love. Good site management is what protects that vision when construction begins.',
    readTime: '6 min read',
    image: '/images/luxury-villa.jpg',
  },
  {
    category: 'Terrace Garden',
    title: 'How to turn an empty terrace into a space you actually use every week',
    excerpt: 'Simple zoning, planting, seating, and shade strategies that make a rooftop feel like part of the home.',
    readTime: '4 min read',
    image: '/images/why-choose-us.jpeg',
  },
]

const blogTopics = [
  {
    title: 'Cost and package clarity',
    text: 'Articles that help homeowners understand budget structure before they commit to the wrong design or finish path.',
  },
  {
    title: 'Premium design decisions',
    text: 'Practical insights on facades, interiors, lighting, and material editing for homes that feel more resolved.',
  },
  {
    title: 'Execution intelligence',
    text: 'Site, quality, scheduling, and handover lessons that help clients see what strong delivery really looks like.',
  },
]

function BlogsPage() {
  return (
    <main className="premium-page premium-page--blogs">
      <section className="premium-hero">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">Blogs</div>
            <h1 className="premium-title">
              Ideas, planning notes, and practical guidance for building <em>better homes.</em>
            </h1>
            <p className="premium-subtitle">
              These articles are meant to reduce confusion around design, construction, interiors, and
              project decision-making before your site work begins.
            </p>
          </div>

          <article className="blog-feature">
            <div
              className="blog-feature__media"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(23, 18, 14, 0.06), rgba(23, 18, 14, 0.68)), url('${featuredPost.image}')` }}
            />
            <div className="blog-feature__content">
              <span className="blog-card__tag">{featuredPost.category}</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="blog-card__meta">{featuredPost.readTime}</div>
              <div className="premium-actions">
                <Link className="premium-button" to="/cost-estimator">
                  Use Cost Calculator
                </Link>
                <Link className="premium-button premium-button--ghost" to="/services">
                  Explore Services
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="premium-section premium-section--contrast">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">Latest Reads</div>
            <h2>Short reads for homeowners who want sharper decisions, not generic inspiration.</h2>
            <p>
              We focus on the topics that actually influence project quality: planning, package fit,
              material restraint, execution clarity, and day-to-day usability.
            </p>
          </div>

          <div className="blog-grid">
            {posts.map((post) => (
              <article className="blog-card" key={post.title}>
                <div
                  className="blog-card__media"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(23, 18, 14, 0.04), rgba(23, 18, 14, 0.56)), url('${post.image}')` }}
                />
                <div className="blog-card__content">
                  <span className="blog-card__tag">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card__meta">{post.readTime}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-shell">
          <div className="premium-heading">
            <div className="premium-kicker">Editorial Direction</div>
            <h2>What this blog is meant to help you do better.</h2>
            <p>
              The aim is not to flood you with content. It is to make the most important project decisions
              easier to understand before time and budget start getting consumed.
            </p>
          </div>

          <div className="premium-grid premium-grid--services">
            {blogTopics.map((topic, index) => (
              <article className="premium-card" key={topic.title}>
                <div className="premium-card__index">{index + 1}</div>
                <h3>{topic.title}</h3>
                <p>{topic.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-shell">
          <div className="premium-cta-band">
            <div>
              <h3>Ready to move from reading to planning?</h3>
              <p>
                Use the estimator to understand your likely budget range, then compare packages and services
                with more confidence.
              </p>
            </div>
            <div className="premium-actions">
              <Link className="premium-button" to="/cost-estimator">
                Calculate Cost
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

export default BlogsPage
