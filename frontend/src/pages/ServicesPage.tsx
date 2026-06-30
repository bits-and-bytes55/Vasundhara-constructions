import { Link } from 'react-router-dom'
import Testimonials from './Testimonials';

const services = [
  {
    name: 'Construction',
    link: '/services/construction',
    description: 'Quality civil construction delivered on time and within budget.',
    points: ['Transparent planning', 'Dedicated execution teams', 'Milestone-based quality checks'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
  },
  {
    name: 'Interiors',
    link: '/services/interiors',
    description: 'Stylish, functional, and personalized interior designing.',
    points: ['Space planning', 'Custom storage solutions', 'Material and lighting curation'],
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
  },
  {
    name: 'Elevations',
    link: '/services/elevations',
    description: 'Transform the front facade to stand out with a premium look.',
    points: ['Facade concepts', 'Material combinations', 'Premium exterior detailing'],
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
  },
  {
    name: 'Terrace Garden',
    link: '/services/terrace-garden',
    description: 'Refresh your rooftop with lush and serene outdoor spaces.',
    points: ['Rooftop landscape planning', 'Outdoor seating zones', 'Low-maintenance green styling'],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
  },
  {
    name: 'Home Renovation',
    link: '/services/home-renovation',
    description: 'Upgrade your home with modern renovation solutions that blend style, comfort, and smart design, including beautiful outdoor spaces.',
    points: [
      'Complete home renovation',
      'Rooftop landscaping',
      'Outdoor seating spaces',
      'Low-maintenance greenery',
      'Interior upgrades'
    ],
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80',
  },
];

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
    <main className="bg-white font-sans">
      {/* Hero Section - unchanged */}
      <section className="bg-white border-b border-gray-100 py-2 md:py-6 lg:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                Vasundhara Services
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                The same core services you see on the home page, now in a more <em className="text-blue-600 not-italic">premium detailed view.</em>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Construction, Interiors, Elevations, and Terrace Garden are the four signature offerings
                that shape the Vasundhara experience across design, build quality, and final lifestyle value.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link
                  to="/cost-estimator"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Start Cost Estimate
                </Link>
                <Link
                  to="/projects"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  View Recent Projects
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <strong className="block text-2xl font-black text-blue-600">4 services</strong>
                  <span className="text-sm text-gray-500">Focused categories built to cover the biggest decisions in your home journey.</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <strong className="block text-2xl font-black text-blue-600">500+</strong>
                  <span className="text-sm text-gray-500">Quality checkpoints across structure, finish, exterior detailing, and handover.</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <strong className="block text-2xl font-black text-blue-600">Single team</strong>
                  <span className="text-sm text-gray-500">Planning, design, costing, and execution coordinated under one roof.</span>
                </div>
              </div>
            </div>

            {/* Right image panel */}
            <div
              className="relative rounded-2xl overflow-hidden h-full bg-cover bg-center shadow-xl"
              style={{
                backgroundImage: "linear-gradient(160deg, rgba(34, 27, 21, 0.16), rgba(34, 27, 21, 0.58)), url('/images/home-renovation.jpg')",
              }}
            >
              <div className="absolute -bottom-0 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-5">
                <div className="inline-block bg-blue-100 text-blue-600 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
                  Construction + Lifestyle
                </div>
                <strong className="block text-gray-900 text-lg font-bold mb-2">
                  Built around the same four services featured on the home page
                </strong>
                <p className="text-gray-600 text-sm">
                  Each service is shaped to add practical value and visual impact, whether we are building
                  the full home, refining interiors, upgrading the facade, or activating the terrace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Stack - UPDATED with images and buttons */}
      <section className="bg-gray-50 py-6 md:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider mb-4">
              Service Stack
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              The four Vasundhara services that anchor the complete home experience.
            </h2>
            <p className="text-gray-600">
              Instead of spreading effort across too many categories, we keep the offer sharp around the
              same four services highlighted on the home page and deepen execution quality inside each one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.name}
                to={service.link}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 md:h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-black flex-shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                      {service.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 flex-1">{service.description}</p>
                  
                  <ul className="space-y-2 text-sm text-gray-500 mb-6">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More button */}
                  <span className="inline-flex items-center justify-center w-full bg-blue-50 text-blue-700 font-semibold py-2.5 px-4 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    Learn More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Flow - unchanged */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider mb-4">
              Delivery Flow
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              A process that keeps premium design practical to execute.
            </h2>
            <p className="text-gray-600">
              We front-load decisions where they matter most, which is why site execution stays cleaner,
              changes stay controlled, and final finishes feel more intentional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-black mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Feels Better - unchanged */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-cover bg-center shadow-xl"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(31, 23, 17, 0.08), rgba(31, 23, 17, 0.52)), url('/images/why-choose-us.jpeg')",
              }}
            >
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-5">
                <strong className="block text-gray-900 text-lg font-bold mb-2">
                  Execution quality is designed, not hoped for.
                </strong>
                <p className="text-gray-600 text-sm">
                  Our systems are set up to protect design intent during procurement, sequencing, site
                  coordination, and finishing decisions.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                  Why It Feels Better
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                  Less project noise. Better material choices. More confidence at every stage.
                </h2>
                <p className="text-gray-600">
                  Premium delivery is not just about expensive finishes. It is about fewer surprises, a
                  cleaner process, and details that stay consistent from drawing to reality.
                </p>
              </div>

              <div className="space-y-6">
                {qualityPoints.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl text-blue-600 font-bold leading-8">+</span>
                    <div>
                      <strong className="block text-gray-900 font-bold">{item.title}</strong>
                      <p className="text-gray-600 text-sm mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials/>
      
      {/* CTA - unchanged */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-black text-blue-900 mb-4">
              Planning a new home or a serious upgrade?
            </h3>
            <p className="text-blue-800 mb-8 max-w-2xl mx-auto">
              Start with the cost calculator, compare package levels, and then we can shape the right
              service mix for your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/cost-estimator"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition"
              >
                Get Estimate
              </Link>
              <Link
                to="/packages"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-xl transition"
              >
                Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ServicesPage