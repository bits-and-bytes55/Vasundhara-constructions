import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

// Construction Services Data
const constructionServices = [
  {
    id: 'residential',
    title: 'Residential Construction',
    icon: '',
    description: 'Build your dream home with our end-to-end residential construction services. From independent houses to luxury villas and apartments.',
    features: [
      'Individual Homes & Villas',
      'Luxury Apartments',
      'Gated Communities',
      'Row Houses & Duplex',
      'Renovation & Extension'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
   
  },
  {
    id: 'commercial',
    title: 'Commercial Construction',
    icon: '',
    description: 'Professional commercial spaces designed for productivity and brand identity. Offices, retail spaces, and industrial buildings.',
    features: [
      'Corporate Offices',
      'Retail Showrooms',
      'Restaurants & Cafes',
      'Industrial Buildings',
      'Educational Institutions'
    ],
    image: 'https://plus.unsplash.com/premium_photo-1764459930805-45a840c283e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvbnN0cnVjdGlvbiUyMDIlMjBmbG9vciUyMGJ1aWxkaW5nfGVufDB8fDB8fHww',
    
  },
  {
    id: 'turnkey',
    title: 'Turnkey Solutions',
    icon: '',
    description: 'Complete project management from concept to completion. We handle everything - design, approvals, construction, and finishing.',
    features: [
      'Complete Project Management',
      'Design & Build Services',
      'Approvals & Permits',
      'Quality Assurance',
      'Post-Construction Support'
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    price: 'Custom Quote',
    duration: 'As per scope'
  },
  {
    id: 'renovation',
    title: 'Renovation & Extension',
    icon: '',
    description: 'Transform existing structures with our renovation expertise. Modern upgrades, structural modifications, and space extensions.',
    features: [
      'Complete Home Makeover',
      'Kitchen & Bath Remodel',
      'Structural Modifications',
      'Space Extension',
      'Facade Improvement'
    ],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    
  }
]

// Construction Process
const constructionProcess = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'Understanding your vision, site assessment, and preliminary budget discussion.',
    icon: '',
    details: 'Free site visit · Requirement analysis · Initial quote'
  },
  {
    step: '02',
    title: 'Design & Planning',
    description: 'Architectural design, structural planning, and obtaining necessary approvals.',
    icon: '',
    details: '3D designs · Structural drawings · Approval assistance'
  },
  {
    step: '03',
    title: 'Material Selection',
    description: 'Choose from premium materials with complete transparency on quality and pricing.',
    icon: '',
    details: 'Branded materials · Quality testing · Vendor coordination'
  },
  {
    step: '04',
    title: 'Execution',
    description: 'Systematic construction with regular quality checks and progress updates.',
    icon: '',
    details: 'Skilled workforce · Quality audits · Daily updates'
  },
  {
    step: '05',
    title: 'Quality Assurance',
    description: 'Rigorous testing and inspections at every stage of construction.',
    icon: '✓',
    details: '500+ checkpoints · Third-party audits · Compliance testing'
  },
  {
    step: '06',
    title: 'Handover & Support',
    description: 'Final walkthrough, documentation, and post-construction support.',
    icon: '',
    details: '1-year warranty · Maintenance guide · Support hotline'
  }
]

// Project Types
const projectTypes = [
  {
    name: 'Independent Houses',
    count: '850+',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80'
  },
  {
    name: 'Luxury Villas',
    count: '320+',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80'
  },
  {
    name: 'Commercial Spaces',
    count: '450+',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80'
  },
  {
    name: 'Renovation Projects',
    count: '600+',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80'
  }
]

// Why Choose Us
const whyChooseUs = [
  {
    title: '12+ Years Experience',
    description: 'Decades of construction expertise delivering quality homes.',
    icon: ''
  },
  {
    title: 'In-House Team',
    description: 'No outsourcing - our own engineers, architects, and workers.',
    icon: ''
  },
  {
    title: 'Quality Materials',
    description: 'Only premium brands like UltraTech, Jindal, and Asian Paints.',
    icon: ''
  },
  {
    title: 'Escrow Protection',
    description: 'Payments released only on milestone completion.',
    icon: ''
  },
  {
    title: 'Timely Delivery',
    description: 'Strict adherence to project schedules.',
    icon: ''
  },
  {
    title: 'Transparent Pricing',
    description: 'Detailed cost breakdown with no hidden charges.',
    icon: ''
  }
]





function ConstructionPage() {
  
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1800&q=85"
            alt="Construction"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Quality Construction Since 2005
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Building Your
              <span className="text-blue-400"> Dream Spaces</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Vasundhara Constructions delivers premium residential and commercial spaces with uncompromising quality, transparency, and timely execution.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/cost-estimator" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition inline-flex items-center gap-2"
              >
                Get Free Estimate →
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold transition"
              >
                Schedule Consultation
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              {[
                { value: '12+', label: 'Years Experience' },
                { value: '70+', label: 'Homes Built' },
                { value: '98%', label: 'Client Satisfaction' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Services
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Construction Solutions
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we deliver exceptional construction services tailored to your needs
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {constructionServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 3).map((feature, fIdx) => (
                      <span key={fIdx} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    
                    <Link 
                      to="/contacts" 
                      className="bg-gray-900 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Project Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Build
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diverse portfolio showcasing our construction expertise
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {projectTypes.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={type.image} 
                  alt={type.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  
                  <div className="text-white text-lg font-semibold">{type.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Process */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How We Build Excellence
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              A systematic approach ensuring quality at every step
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {constructionProcess.map((process, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition"
              >
                <div className="text-5xl font-bold text-blue-300 mb-4">{process.step}</div>
                <div className="text-3xl mb-3">{process.icon}</div>
                <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                <p className="text-blue-100 text-sm mb-3">{process.description}</p>
                <p className="text-xs text-blue-200">{process.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Why Choose Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The Vasundhara Advantage
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We combine decades of experience with modern construction techniques to deliver exceptional results.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whyChooseUs.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
                alt="Construction Quality"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Dream Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your construction needs and create something extraordinary together
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition inline-flex items-center gap-2"
            >
              Schedule Consultation →
            </Link>
            <Link 
              to="/cost-estimator" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold transition"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ConstructionPage