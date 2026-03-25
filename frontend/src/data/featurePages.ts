export type FeaturePageSlug =
  | 'our-packages'
  | 'how-it-works'
  | 'our-app'
  | 'home-construction-guide'
  | 'testimonials'
  | 'refer-a-friend'

export type FeaturePageData = {
  slug: FeaturePageSlug
  label: string
  kicker: string
  title: string
  subtitle: string
  visualLabel: string
  visualTitle: string
  visualText: string
  visualImage: string
  highlights: Array<{
    value: string
    label: string
    detail: string
  }>
  sections: Array<{
    title: string
    paragraphs: string[]
    bullets?: string[]
  }>
  ctaPrimary: {
    label: string
    to: string
  }
  ctaSecondary: {
    label: string
    to: string
  }
}

export const featurePages: FeaturePageData[] = [
  {
    slug: 'our-packages',
    label: 'Our Packages',
    kicker: 'Our Packages',
    title: 'Explore WallBolt package levels before you move into detailed design choices.',
    subtitle:
      'This page helps you understand how package thinking can reduce confusion around quality levels, finish expectations, and cost direction.',
    visualLabel: 'Package Planning',
    visualTitle: 'A better package choice makes every later decision easier.',
    visualText:
      'When quality expectation and budget direction are aligned early, the entire project becomes easier to plan and execute.',
    visualImage: '/images/luxury-villa.jpg',
    highlights: [
      { value: '5 levels', label: 'Package comparison', detail: 'Understand the range from essential to premium configurations.' },
      { value: 'Clearer fit', label: 'Budget alignment', detail: 'Choose a direction before material and finish decisions get messy.' },
      { value: 'Less rework', label: 'Planning logic', detail: 'Package clarity helps protect both design and cost intent.' },
    ],
    sections: [
      {
        title: 'Why packages matter',
        paragraphs: [
          'Packages create a practical framework for comparing quality, materials, finish budget, and long-term comfort level.',
          'They help avoid a common problem where clients start with a lower budget mindset but keep selecting premium finishes later.',
        ],
      },
      {
        title: 'What to compare carefully',
        paragraphs: [
          'Do not compare only the headline rate. Compare the material allowances, finish quality, and what level of lifestyle each package is actually designed for.',
        ],
        bullets: [
          'Structure and material brand expectations',
          'Flooring, doors, windows, and finish budget levels',
          'Electrical, plumbing, and fitting quality bands',
        ],
      },
      {
        title: 'How to use this page',
        paragraphs: [
          'Use this page as a starting point, then move to the comparison or consultation step for project-specific guidance.',
        ],
      },
    ],
    ctaPrimary: { label: 'Compare Packages', to: '/packages/compare' },
    ctaSecondary: { label: 'Use Cost Estimator', to: '/cost-estimator' },
  },
  {
    slug: 'how-it-works',
    label: 'How it Works?',
    kicker: 'How It Works',
    title: 'A simple look at how a WallBolt project moves from inquiry to handover.',
    subtitle:
      'The process is built to keep decisions clearer, delivery more disciplined, and the client experience less chaotic.',
    visualLabel: 'Process',
    visualTitle: 'Strong outcomes usually come from strong sequencing.',
    visualText:
      'The more clearly scope, design, package, and execution are aligned, the smoother the project tends to move.',
    visualImage: '/images/heroimg.jpeg',
    highlights: [
      { value: 'Consult', label: 'Discovery first', detail: 'We start by understanding site, family, and project direction.' },
      { value: 'Align', label: 'Design and cost', detail: 'Scope and package fit are shaped before execution begins.' },
      { value: 'Deliver', label: 'Execution system', detail: 'Progress is managed through reviews, checks, and milestone flow.' },
    ],
    sections: [
      {
        title: 'Step 1: Consultation and clarity',
        paragraphs: [
          'The first stage is about understanding what you want to build, where the project stands, and what level of support you need.',
        ],
      },
      {
        title: 'Step 2: Design, package, and budget direction',
        paragraphs: [
          'Once the broad direction is understood, scope, finish expectations, and package suitability become easier to align.',
        ],
      },
      {
        title: 'Step 3: Execution and quality control',
        paragraphs: [
          'Execution works best when there are clear reviews, sequencing discipline, and visible milestone progress rather than reactive site management.',
        ],
      },
    ],
    ctaPrimary: { label: 'Explore Services', to: '/services' },
    ctaSecondary: { label: 'Contact Team', to: '/contacts' },
  },
  {
    slug: 'our-app',
    label: 'Our App',
    kicker: 'Our App',
    title: 'Track progress, payment stages, and updates with a more visible project experience.',
    subtitle:
      'The app direction is centered around keeping homeowners informed without forcing them to chase updates manually.',
    visualLabel: 'Client Experience',
    visualTitle: 'Visibility reduces uncertainty during construction.',
    visualText:
      'Project confidence improves when updates, milestone movement, and communication are easier to follow.',
    visualImage: '/images/why-choose-us.jpeg',
    highlights: [
      { value: 'Live updates', label: 'Project visibility', detail: 'Follow milestone progress more clearly.' },
      { value: 'Structured', label: 'Payment flow', detail: 'See how project stages and payment points connect.' },
      { value: 'Simpler', label: 'Communication', detail: 'Reduce the need for scattered follow-ups during delivery.' },
    ],
    sections: [
      {
        title: 'What the app experience is meant to solve',
        paragraphs: [
          'One of the biggest frustrations in homebuilding is not knowing what is happening at the right time. The app idea exists to reduce that gap.',
        ],
      },
      {
        title: 'What homeowners want to see',
        paragraphs: [
          'Most users care about milestone progress, update frequency, and whether payments are aligned with real project movement.',
        ],
        bullets: [
          'Stage-wise project progress',
          'Payment milestone visibility',
          'Update and communication flow',
        ],
      },
      {
        title: 'Why it matters',
        paragraphs: [
          'A more visible process builds trust and reduces unnecessary anxiety through the delivery period.',
        ],
      },
    ],
    ctaPrimary: { label: 'Contact Team', to: '/contacts' },
    ctaSecondary: { label: 'Read FAQs', to: '/faqs' },
  },
  {
    slug: 'home-construction-guide',
    label: 'Home Construction Guide',
    kicker: 'Home Construction Guide',
    title: 'Practical guidance for homeowners who want fewer mistakes before site work begins.',
    subtitle:
      'Use this guide as a starting point for understanding budget, package fit, planning logic, and what good execution should feel like.',
    visualLabel: 'Guide',
    visualTitle: 'The best guide is the one that helps you avoid expensive confusion.',
    visualText:
      'A little clarity before the project starts can save a surprising amount of time, money, and stress later.',
    visualImage: '/images/dream-elevation.jpeg',
    highlights: [
      { value: 'Budget', label: 'Early control', detail: 'Better planning starts with realistic cost expectations.' },
      { value: 'Design', label: 'Sharper choices', detail: 'Know what to prioritise before every finish starts competing.' },
      { value: 'Execution', label: 'Less chaos', detail: 'Understand what strong site process should look like.' },
    ],
    sections: [
      {
        title: 'Start with the right questions',
        paragraphs: [
          'Before getting carried away by design inspiration, it helps to understand built-up area, floors, finish goals, and total budget comfort.',
        ],
      },
      {
        title: 'Use tools before assumptions',
        paragraphs: [
          'Estimator tools, package comparison, and guided consultation are often more valuable than making early guesses about total cost.',
        ],
      },
      {
        title: 'Read before you commit',
        paragraphs: [
          'Blogs, FAQs, and planning notes are useful because they help you recognise good process, not just attractive visuals.',
        ],
      },
    ],
    ctaPrimary: { label: 'Open Blogs', to: '/blogs' },
    ctaSecondary: { label: 'Use Free Estimator', to: '/cost-estimator' },
  },
  {
    slug: 'testimonials',
    label: 'Testimonials',
    kicker: 'Testimonials',
    title: 'See the kind of trust signals that matter when choosing a homebuilding partner.',
    subtitle:
      'Testimonials are valuable not just because they are positive, but because they reveal what clients actually cared about during the journey.',
    visualLabel: 'Social Proof',
    visualTitle: 'The strongest feedback usually talks about experience, not just the final photo.',
    visualText:
      'Homeowners tend to remember clarity, discipline, honesty, and the feeling of being supported through a complex process.',
    visualImage: '/images/dream-living-room.jpeg',
    highlights: [
      { value: '4.9/5', label: 'Customer rating', detail: 'Reflecting confidence in quality, support, and process transparency.' },
      { value: '2,500+', label: 'Happy families', detail: 'A broad base of homeowners trusting the journey.' },
      { value: 'Real themes', label: 'Useful insight', detail: 'The feedback highlights what actually matters in live projects.' },
    ],
    sections: [
      {
        title: 'What clients usually praise',
        paragraphs: [
          'The most valuable testimonials often mention transparency, quality checks, milestone confidence, and a lower-stress construction experience.',
        ],
      },
      {
        title: 'How to read testimonials well',
        paragraphs: [
          'Look for patterns in what people repeat. Repeated comments about communication, delivery discipline, and trust matter more than generic praise.',
        ],
      },
      {
        title: 'Why this matters before you choose',
        paragraphs: [
          'A home project is a long relationship, not a one-time purchase. Feedback can help you assess what working with a team may actually feel like.',
        ],
      },
    ],
    ctaPrimary: { label: 'Explore Projects', to: '/projects' },
    ctaSecondary: { label: 'Contact Team', to: '/contacts' },
  },
  {
    slug: 'refer-a-friend',
    label: 'Refer A Friend',
    kicker: 'Refer A Friend',
    title: 'Share WallBolt Atelier with someone planning a home or premium renovation journey.',
    subtitle:
      'Referrals work best when they are grounded in trust, clarity, and a genuinely useful experience for the next homeowner.',
    visualLabel: 'Community',
    visualTitle: 'A good referral is usually a sign of a good experience.',
    visualText:
      'People recommend services when the process felt dependable, not just when the visuals looked strong at the end.',
    visualImage: '/images/dream-master-bed-room.jpeg',
    highlights: [
      { value: 'Trust-led', label: 'Referral logic', detail: 'Recommendations matter most when they come from genuine confidence.' },
      { value: 'Friends & family', label: 'Ideal fit', detail: 'Helpful for people beginning a plotted home or design-build journey.' },
      { value: 'Warm start', label: 'Better discovery', detail: 'Referrals often begin with more context and clearer expectations.' },
    ],
    sections: [
      {
        title: 'Who this is useful for',
        paragraphs: [
          'Refer WallBolt Atelier to friends, family, or colleagues who are planning construction, interiors, elevation upgrades, or broader design-build support.',
        ],
      },
      {
        title: 'What to share with them',
        paragraphs: [
          'A referral is most helpful when you share why the brand may fit their stage, not just a link.',
        ],
        bullets: [
          'Estimator for early budget direction',
          'Services page for capability overview',
          'Projects page for design quality reference',
        ],
      },
      {
        title: 'How they can begin',
        paragraphs: [
          'The easiest start is to send them to the estimator or contact page with a short explanation of their likely fit.',
        ],
      },
    ],
    ctaPrimary: { label: 'Share Contact Page', to: '/contacts' },
    ctaSecondary: { label: 'Use Estimator', to: '/cost-estimator' },
  },
]

export const featurePageMap: Record<FeaturePageSlug, FeaturePageData> = featurePages.reduce(
  (acc, page) => {
    acc[page.slug] = page
    return acc
  },
  {} as Record<FeaturePageSlug, FeaturePageData>,
)
