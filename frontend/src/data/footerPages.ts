export type FooterPageSlug =
  | 'terms-and-conditions'
  | 'privacy-policy'
  | 'disclaimer'
  | 'contacts'
  | 'about-us'
  | 'faqs'
  | 'cancellation-policy'
  | 'news-media'

export type FooterPageSection = {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export type FooterPageData = {
  slug: FooterPageSlug
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
  sections: FooterPageSection[]
}

export const footerPolicyLinks: Array<{ to: `/${FooterPageSlug}`; label: string }> = [
  { to: '/terms-and-conditions', label: 'Terms & Conditions' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/disclaimer', label: 'Disclaimer' },
  { to: '/cancellation-policy', label: 'Cancellation Policy' },
]

export const footerInfoLinks: Array<{ to: `/${FooterPageSlug}`; label: string }> = [
  { to: '/about-us', label: 'About Us' },
  { to: '/contacts', label: 'Contacts' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/news-media', label: 'News & Media' },
]

export const footerPages: FooterPageData[] = [
  {
    slug: 'terms-and-conditions',
    label: 'Terms & Conditions',
    kicker: 'Terms & Conditions',
    title: 'The terms that guide how WallBolt Atelier content, estimates, and services are used.',
    subtitle:
      'These terms are intended to keep expectations clear when visitors use the website, request estimates, or begin a conversation about services.',
    visualLabel: 'Use Guidelines',
    visualTitle: 'Clear terms make early-stage decisions easier to trust.',
    visualText:
      'Site content, package information, and estimate tools are meant to support planning, not replace a project-specific agreement.',
    visualImage: '/images/heroimg.jpeg',
    highlights: [
      { value: 'Website use', label: 'Information use', detail: 'Content is intended for personal planning and service awareness.' },
      { value: 'Estimates', label: 'Indicative only', detail: 'Cost figures are directional unless confirmed in a formal project scope.' },
      { value: 'Services', label: 'Project-specific', detail: 'Actual commitments begin only after consultation, scope, and agreement.' },
    ],
    sections: [
      {
        title: 'Use of website content',
        paragraphs: [
          'The website is intended to help visitors understand WallBolt Atelier services, packages, project direction, and general construction planning.',
          'You may use the content for personal reference, comparison, and decision support, but not for misleading republication or commercial misuse.',
        ],
      },
      {
        title: 'Estimator and package information',
        paragraphs: [
          'Construction estimates, package rates, and comparison data are meant to give a directional understanding of likely project cost.',
          'Final scope, engineering requirements, brand choices, site conditions, and design complexity can change the actual project value significantly.',
        ],
        bullets: [
          'Estimator outputs are not final quotations.',
          'Package inclusions may evolve with updated project scope.',
          'Site-specific inputs always override generic planning values.',
        ],
      },
      {
        title: 'Engagement and liability boundaries',
        paragraphs: [
          'A formal client relationship begins only when project scope, commercials, and terms are confirmed through an approved engagement process.',
          'WallBolt Atelier is not responsible for decisions taken solely on the basis of website content without project consultation or validation.',
        ],
      },
    ],
  },
  {
    slug: 'privacy-policy',
    label: 'Privacy Policy',
    kicker: 'Privacy Policy',
    title: 'How contact details, inquiry data, and project information are handled.',
    subtitle:
      'We collect only the information needed to respond to inquiries, support project discussions, and improve service communication.',
    visualLabel: 'Privacy',
    visualTitle: 'Useful communication should not come at the cost of careless data handling.',
    visualText:
      'Contact details and inquiry context are used to support client conversations, not to create unnecessary noise.',
    visualImage: '/images/why-choose-us.jpeg',
    highlights: [
      { value: 'Minimal', label: 'Data collection', detail: 'Only inquiry-relevant information is requested wherever possible.' },
      { value: 'Client-first', label: 'Usage intent', detail: 'Information is used to respond, plan, and coordinate service conversations.' },
      { value: 'No clutter', label: 'Communication style', detail: 'We aim for relevant follow-ups instead of excessive outreach.' },
    ],
    sections: [
      {
        title: 'What information may be collected',
        paragraphs: [
          'When you contact WallBolt Atelier, we may collect your name, phone number, email address, city, plot or project details, and communication preferences.',
          'Additional project-related context may be shared by you during estimation, package inquiry, or consultation conversations.',
        ],
      },
      {
        title: 'How the information is used',
        paragraphs: [
          'The information is used to respond to inquiries, schedule consultations, share relevant package or service context, and support project planning discussions.',
          'We may also use enquiry trends to improve website clarity, service explanations, and estimator relevance.',
        ],
        bullets: [
          'To answer questions and schedule callbacks.',
          'To share relevant service, package, or project guidance.',
          'To improve content clarity and customer journey decisions.',
        ],
      },
      {
        title: 'Consent and communication',
        paragraphs: [
          'By submitting your details through the website, you allow WallBolt Atelier to contact you regarding the inquiry you initiated.',
          'If you no longer wish to receive communication, you may request that follow-up contact be reduced or stopped.',
        ],
      },
    ],
  },
  {
    slug: 'disclaimer',
    label: 'Disclaimer',
    kicker: 'Disclaimer',
    title: 'Important boundaries around website content, illustrations, estimates, and advisory information.',
    subtitle:
      'This page explains where website guidance is useful and where project-specific verification is still necessary.',
    visualLabel: 'Important Note',
    visualTitle: 'Digital guidance is helpful, but built work still depends on real-world conditions.',
    visualText:
      'Images, rate ranges, and planning notes are shared to guide choices, not to replace engineering review or contractual scope.',
    visualImage: '/images/luxury-villa.jpg',
    highlights: [
      { value: 'Images', label: 'Illustrative intent', detail: 'Visual references may represent style direction rather than final site output.' },
      { value: 'Rates', label: 'Variable by scope', detail: 'Actual pricing depends on engineering, design, and material decisions.' },
      { value: 'Advice', label: 'General only', detail: 'Planning guidance should be validated through consultation before commitment.' },
    ],
    sections: [
      {
        title: 'Visuals and creative references',
        paragraphs: [
          'Project images, design previews, and interior references on the website are intended to communicate design language and quality aspiration.',
          'Final appearance may vary based on site conditions, material availability, structural constraints, and client-approved scope.',
        ],
      },
      {
        title: 'Estimates and planning guidance',
        paragraphs: [
          'Any rate, package, or planning suggestion shown on the website should be treated as preliminary guidance unless confirmed in a live project discussion.',
          'Engineering, soil conditions, MEP requirements, premium upgrades, and municipal constraints can materially change final deliverables.',
        ],
      },
      {
        title: 'Third-party and decision responsibility',
        paragraphs: [
          'Visitors remain responsible for validating any business, construction, or purchase decision before acting on website information.',
          'WallBolt Atelier is not liable for losses arising from reliance on generic digital content without project-specific review.',
        ],
      },
    ],
  },
  {
    slug: 'contacts',
    label: 'Contacts',
    kicker: 'Contacts',
    title: 'Ways to reach WallBolt Atelier for project inquiries, consultations, and business communication.',
    subtitle:
      'If you are planning a home, comparing package levels, or exploring a premium design-build partner, this is where the conversation starts.',
    visualLabel: 'Reach Out',
    visualTitle: 'The fastest way forward is a clear first conversation.',
    visualText:
      'Share your city, plot status, built-up target, or design goals and the team can guide the next step more effectively.',
    visualImage: '/images/heroimg.jpeg',
    highlights: [
      { value: '+91 98765 43210', label: 'Primary phone', detail: 'Best for quick consultation requests and follow-up coordination.' },
      { value: 'hello@wallboltatelier.com', label: 'Email', detail: 'Useful for structured project briefs, business queries, and documentation.' },
      { value: 'Noida', label: 'Base location', detail: 'Sector 62, Noida, Uttar Pradesh.' },
    ],
    sections: [
      {
        title: 'How to contact us',
        paragraphs: [
          'You can contact WallBolt Atelier through phone, email, website inquiry, or WhatsApp depending on what stage your requirement is in.',
          'For faster guidance, include your city, expected built-up area, plot status, and whether you are exploring construction, interiors, or both.',
        ],
        bullets: [
          'Phone: +91 98765 43210',
          'Email: hello@wallboltatelier.com',
          'WhatsApp: +91 98765 43210',
        ],
      },
      {
        title: 'What to share in your first inquiry',
        paragraphs: [
          'A short but clear inquiry helps the team guide you faster and more accurately.',
        ],
        bullets: [
          'Project city or locality',
          'Plot size or target built-up area',
          'Expected floors or project type',
          'Whether you need only construction or a larger design-build scope',
        ],
      },
      {
        title: 'Response expectations',
        paragraphs: [
          'Response timing may vary by workload and project complexity, but the goal is to acknowledge and guide serious inquiries quickly.',
          'Site visits, technical reviews, or detailed estimation discussions may require scheduled coordination after the first conversation.',
        ],
      },
    ],
  },
  {
    slug: 'about-us',
    label: 'About Us',
    kicker: 'About Us',
    title: 'A short introduction to what WallBolt Atelier is building beyond individual homes.',
    subtitle:
      'WallBolt Atelier exists to make premium homebuilding feel more thoughtful, more transparent, and more controlled from start to finish.',
    visualLabel: 'Brand Story',
    visualTitle: 'We are not trying to make construction louder. We are trying to make it better run.',
    visualText:
      'The company direction combines design sensitivity, process discipline, and a customer experience built around clearer expectations.',
    visualImage: '/images/ashushafi.png',
    highlights: [
      { value: 'Premium', label: 'Design language', detail: 'Intentional facades, interiors, and spatial choices with long-term value.' },
      { value: 'Integrated', label: 'Operating model', detail: 'Planning, costing, and delivery are connected instead of fragmented.' },
      { value: 'Human', label: 'Client experience', detail: 'Communication is designed to reduce stress, not add to it.' },
    ],
    sections: [
      {
        title: 'What we believe',
        paragraphs: [
          'A premium home should feel considered in both design and delivery. Beautiful drawings alone do not create a good project experience.',
          'WallBolt Atelier focuses on the intersection of planning clarity, execution quality, and a calmer customer journey.',
        ],
      },
      {
        title: 'How we approach projects',
        paragraphs: [
          'We prefer strong early decisions over rushed late-stage corrections. That means better scope clarity, cleaner package alignment, and more disciplined execution.',
          'This approach helps protect both design intent and customer confidence as the project moves forward.',
        ],
      },
      {
        title: 'Where the brand is headed',
        paragraphs: [
          'The long-term goal is to create a trusted design-build brand known for refined outcomes, execution systems, and a more dependable construction experience.',
        ],
      },
    ],
  },
  {
    slug: 'faqs',
    label: 'FAQs',
    kicker: 'FAQs',
    title: 'Quick answers to the questions homeowners ask most often before starting.',
    subtitle:
      'These responses are meant to remove early confusion around packages, consultations, timelines, and website tools.',
    visualLabel: 'Need Clarity?',
    visualTitle: 'Most project anxiety starts before the first site visit.',
    visualText:
      'The faster the right questions are answered, the easier it becomes to choose packages, services, and the right next step.',
    visualImage: '/images/why-choose-us.jpeg',
    highlights: [
      { value: 'Packages', label: 'Comparison support', detail: 'Understand the difference between service levels before committing.' },
      { value: 'Estimator', label: 'Planning tool', detail: 'Use it to understand a probable range, not a final site quotation.' },
      { value: 'Consultation', label: 'Next step', detail: 'A live discussion is still the best way to validate scope and fit.' },
    ],
    sections: [
      {
        title: 'Is the cost estimator a final quotation?',
        paragraphs: [
          'No. The estimator is designed to help you understand an indicative budget range based on area, package level, and other broad planning inputs.',
          'A final quotation depends on scope, engineering, site conditions, and the finishes you ultimately select.',
        ],
      },
      {
        title: 'How do I choose the right package?',
        paragraphs: [
          'Start by understanding your comfort level with finish quality, material budgets, and long-term priorities.',
          'The package comparison page helps with this, but a consultation is the best way to align packages with your actual goals.',
        ],
      },
      {
        title: 'Do you handle both construction and interiors?',
        paragraphs: [
          'Yes. WallBolt Atelier works across construction, interiors, elevations, and terrace garden solutions depending on project need.',
        ],
      },
      {
        title: 'What should I prepare before contacting the team?',
        paragraphs: [
          'It helps to know your city, plot status, target built-up area, floor plan expectations, and whether you want only construction or a broader design-build scope.',
        ],
      },
    ],
  },
  {
    slug: 'cancellation-policy',
    label: 'Cancellation Policy',
    kicker: 'Cancellation Policy',
    title: 'How consultation cancellations, schedule changes, and service disengagement are handled.',
    subtitle:
      'The intent of this policy is to keep scheduling and expectations transparent if a consultation or early-stage engagement needs to be changed.',
    visualLabel: 'Scheduling Clarity',
    visualTitle: 'Projects move more smoothly when changes are communicated early.',
    visualText:
      'Timely updates help the team manage calendars, technical resources, and follow-up discussions more effectively.',
    visualImage: '/images/dream-elevation.jpeg',
    highlights: [
      { value: 'Early notice', label: 'Preferred approach', detail: 'The earlier a cancellation is shared, the easier it is to reschedule smoothly.' },
      { value: 'Consultations', label: 'Flexible handling', detail: 'Discovery calls and consultations can usually be rescheduled with notice.' },
      { value: 'Engagements', label: 'Scope-based', detail: 'Any paid design or service stage depends on agreed commercial terms.' },
    ],
    sections: [
      {
        title: 'Consultation scheduling changes',
        paragraphs: [
          'If you need to cancel or reschedule a consultation, the best approach is to inform the team as early as possible so the slot can be reassigned or moved.',
          'Repeated short-notice changes may affect scheduling priority depending on workload and team availability.',
        ],
      },
      {
        title: 'Paid scope or professional services',
        paragraphs: [
          'If any paid design, documentation, or project-specific service engagement has begun, cancellation terms may depend on the scope already delivered and the commercial agreement in place.',
        ],
        bullets: [
          'Work already completed may remain billable.',
          'Custom deliverables may not be fully reversible.',
          'Refund or adjustment decisions depend on the agreed engagement stage.',
        ],
      },
      {
        title: 'Communication expectations',
        paragraphs: [
          'Clear cancellation communication helps prevent wasted scheduling effort and keeps re-engagement smoother if you return later.',
        ],
      },
    ],
  },
  {
    slug: 'news-media',
    label: 'News & Media',
    kicker: 'News & Media',
    title: 'A page for updates, announcements, collaboration requests, and media-facing communication.',
    subtitle:
      'This section helps position WallBolt Atelier for announcements, interview requests, brand updates, and future press activity.',
    visualLabel: 'Newsroom',
    visualTitle: 'Brand communication should carry the same clarity as project communication.',
    visualText:
      'Whether the request is editorial, partnership-focused, or update-related, this page keeps those conversations structured.',
    visualImage: '/images/luxury-villa.jpg',
    highlights: [
      { value: 'Media', label: 'Press inquiries', detail: 'Interview, quote, and feature requests can be routed through the contact channels.' },
      { value: 'Updates', label: 'Brand announcements', detail: 'Used for company milestones, delivery stories, and service communication.' },
      { value: 'Partnerships', label: 'Collaborative requests', detail: 'Available for relevant editorial or industry conversations.' },
    ],
    sections: [
      {
        title: 'Press and editorial requests',
        paragraphs: [
          'Media teams, writers, and editors can reach out for company commentary, construction and design insights, or feature discussions.',
          'Please include publication name, editorial angle, timing, and the kind of response needed for faster coordination.',
        ],
      },
      {
        title: 'Brand updates and announcements',
        paragraphs: [
          'This page can be used over time to communicate project milestones, service updates, company initiatives, and notable delivery stories.',
        ],
      },
      {
        title: 'Partnership and speaking opportunities',
        paragraphs: [
          'Relevant invitations for panels, workshops, collaboration content, or knowledge-sharing formats may also be directed through WallBolt Atelier contact channels.',
        ],
      },
    ],
  },
]

export const footerPageMap: Record<FooterPageSlug, FooterPageData> = footerPages.reduce(
  (acc, page) => {
    acc[page.slug] = page
    return acc
  },
  {} as Record<FooterPageSlug, FooterPageData>,
)
