import { Link } from 'react-router-dom'
import { useEffect, useRef} from 'react'
import Testimonials from './Testimonials'

// Company Statistics
const leadershipStats = [
  {
    value: '12+',
    label: 'Years of excellence',
    detail: 'Trust built on consistent delivery across residential and commercial projects.',
    icon: ''
  },
  {
    value: '70+',
    label: 'Homes completed',
    detail: 'Successfully delivered projects across Delhi NCR with 100% client satisfaction.',
    icon: ''
  },
  {
    value: '500+',
    label: 'Quality checkpoints',
    detail: 'Rigorous inspections at every stage ensure superior construction quality.',
    icon: '✓'
  },
  {
    value: '100%',
    label: 'Protection',
    detail: 'Payments are safe and released progressively with milestone completion.',
    icon: ''
  },
]

// Company Values
const companyValues = [
  {
    title: 'Quality First',
    text: 'We never compromise on material quality or workmanship. Every project uses premium-grade materials from trusted brands.',
    icon: ''
  },
  {
    title: 'Transparent Pricing',
    text: 'No hidden costs. Every rupee is accounted for in a detailed quotation before work begins.',
    icon: ''
  },
  {
    title: 'Timely Delivery',
    text: 'We follow strict project schedules with regular updates, ensuring completion as promised.',
    icon: ''
  },
  {
    title: 'Client Partnership',
    text: 'We treat every project as a partnership, keeping you informed and involved at every stage.',
    icon: ''
  },
]


// Company Journey
const companyJourney = [
  {
    year: '2005',
    title: 'Expansion Phase',
    description: 'Expanded into commercial construction and established a reputation for timely delivery.',
    icon: '🏗️' // Construction / Building
  },
  {
    year: '2012',
    title: 'Innovation Hub',
    description: 'Introduced modern construction techniques and digital project tracking systems.',
    icon: '💡' // Innovation / Light bulb
  },
  {
    year: '2018',
    title: 'Premium Services',
    description: 'Launched luxury home division and interior design services for complete solutions.',
    icon: '✨' // Premium / Sparkle
  },
  {
    year: '2024',
    title: 'Future Forward',
    description: 'Embracing sustainable construction and smart home technologies for modern living.',
    icon: '🌱' // Future / Sustainability
  },
];

// Leadership Team
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




function CompanyProfilePage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .reveal-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        
        .reveal-section.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 30px -15px rgba(0, 0, 0, 0.1);
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1800&q=80"
            alt="Construction background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
              <div className="inline-block bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-semibold">Building Trust Since 2005</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Vasundhara Constructions
                <span className="block text-blue-300">Where Quality Meets Commitment</span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                With over 12 years of experience, we've transformed thousands of dreams into reality.
                Our commitment to quality, transparency, and timely delivery makes us one of Delhi NCR's
                most trusted construction partners.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/cost-estimator"
                  className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition inline-flex items-center gap-2"
                >
                  Get Free Estimate →
                </Link>
                <Link
                  to="/projects"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-full font-semibold transition"
                >
                  View Our Work
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-fadeInUp" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s forwards', opacity: 0 }}>
              {leadershipStats.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover-lift">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-blue-300">{stat.value}</div>
                  <div className="text-sm font-semibold mt-1">{stat.label}</div>
                  <div className="text-xs text-blue-200 mt-2">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section
        ref={(el) => { sectionsRef.current[0] = el; }}

        className="reveal-section py-10 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Our Foundation</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Built on <span className="gradient-text">Strong Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from first consultation to final handover
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover-lift border border-gray-100">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}


      {/* ceo and founder */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image Card */}
            <div
              className="relative  rounded-2xl overflow-hidden aspect-[5/5] bg-cover bg-center shadow-xl"
              style={{
                backgroundImage: "linear-gradient(180deg, rgba(31, 23, 17, 0.08), rgba(31, 23, 17, 0.42)), url('/images/Anoj.jpeg')",
              }}
            >
              <div className="absolute bottom-6 left-6 right-6">
                <strong className="text-white text-lg font-bold block">Anoj Gupta</strong>
                <p className="text-white text-sm opacity-90 mt-1">
                  CEO and Founder, focused on building a company where design quality and execution integrity
                  stay equally important.
                </p>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-8">
              <div>
                <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                  Leadership
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  The company vision starts with reducing friction for homeowners.
                </h2>
                <p className="text-gray-600 text-lg">
                  Vasundhara was shaped around the idea that premium construction should feel more dependable,
                  better explained, and more intentional from the first meeting onward.
                </p>
              </div>

              <div className="space-y-6">
                {values.map((item) => (
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
      {/* Company Journey Timeline */}
      <section
        ref={(el) => { sectionsRef.current[3] = el; }}        className="reveal-section py-20 bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Excellence Through <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to industry leadership
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-300 hidden md:block"></div>

            {companyJourney.map((item, idx) => (
              <div key={idx} className={`relative mb-12 ${idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'} md:w-1/2`}>
                <div className={`flex items-start gap-4 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl z-10 relative">
                    {item.icon}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg flex-1 hover-lift">
                    <div className="text-blue-600 font-bold text-lg mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <Testimonials />
      {/* Numbers Section */}
      <section
        ref={(el) => {sectionsRef.current[5] = el}}
        className="reveal-section gradient-bg text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vasundhara by the Numbers</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              The metrics that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {leadershipStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-blue-300 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-blue-200">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Dream Home?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a space that exceeds your expectations
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition inline-flex items-center gap-2"
              >
                Schedule Consultation →
              </Link>
              <Link
                to="/cost-estimator"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-semibold transition"
              >
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CompanyProfilePage