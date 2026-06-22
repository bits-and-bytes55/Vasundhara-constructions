import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

// Elevation Styles Data
const elevationStyles = [
  {
    id: 'modern',
    title: 'Modern Contemporary',
    icon: '',
    description: 'Clean lines, geometric forms, and minimalist aesthetics. Perfect for urban homes seeking a sophisticated, timeless look.',
    features: [
      'Clean geometric forms',
      'Large glass windows',
      'Minimalist cladding',
      'Flat or low-slope roofs',
      'Neutral color palette'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    priceRange: '₹150-250/sqft',
    popularity: 'Most Popular'
  },
  {
    id: 'luxury',
    title: 'Luxury Classic',
    icon: '',
    description: 'Elegant and opulent designs featuring classical elements, intricate details, and premium materials.',
    features: [
      'Ornate cornices & moldings',
      'Grand entrance pillars',
      'Decorative railings',
      'Premium stone cladding',
      'Statement lighting'
    ],
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd349?w=800&q=80',
    priceRange: '₹250-400/sqft',
    popularity: 'Premium Choice'
  },
  {
    id: 'scandinavian',
    title: 'Scandinavian',
    icon: '',
    description: 'Light, airy, and functional designs emphasizing natural materials and organic textures.',
    features: [
      'Natural wood elements',
      'Large windows for light',
      'Simple geometric shapes',
      'Light color schemes',
      'Functional balconies'
    ],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    priceRange: '₹180-280/sqft',
    popularity: 'Trending'
  },
  {
    id: 'mediterranean',
    title: 'Mediterranean',
    icon: '',
    description: 'Warm, inviting designs inspired by coastal architecture with terracotta and stucco finishes.',
    features: [
      'Terracotta roof tiles',
      'Stucco wall finishes',
      'Arched doorways',
      'Wrought iron details',
      'Courtyard elements'
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    priceRange: '₹200-320/sqft',
    popularity: 'Classic'
  },
  {
    id: 'industrial',
    title: 'Industrial Loft',
    icon: '',
    description: 'Raw, urban aesthetics with exposed elements and bold material contrasts.',
    features: [
      'Exposed concrete',
      'Metal accents',
      'Large industrial windows',
      'Open layouts',
      'Minimal ornamentation'
    ],
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    popularity: 'Urban'
  },
  {
    id: 'contemporary',
    title: 'Contemporary Indian',
    icon: '🇮🇳',
    description: 'Modern interpretation of traditional Indian architecture with regional elements.',
    features: [
      'Jali work screens',
      'Courtyard designs',
      'Local stone usage',
      'Sloping roofs',
      'Vastu compliance'
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    priceRange: '₹190-290/sqft',
    popularity: 'Heritage Inspired'
  }
]

// Elevation Elements
const elevationElements = [
  {
    category: 'Facade Materials',
    items: [
      { name: 'Natural Stone', icon: '', description: 'Granite, marble, sandstone' },
      { name: 'Wood Cladding', icon: '', description: 'Teak, cedar, composite' },
      { name: 'Glass Facades', icon: '', description: 'Tempered, laminated, insulated' },
      { name: 'Metal Panels', icon: '', description: 'Aluminum, steel, copper' }
    ]
  },
  {
    category: 'Architectural Features',
    items: [
      { name: 'Pillars & Columns', icon: '', description: 'Decorative, structural' },
      { name: 'Balconies', icon: '', description: 'Floating, cantilevered' },
      { name: 'Skylights', icon: '', description: 'Natural lighting solutions' },
      { name: 'Canopies', icon: '', description: 'Entrance, window covers' }
    ]
  },
  {
    category: 'Finishing Touches',
    items: [
      { name: 'Lighting Design', icon: '', description: 'Accent, facade, landscape' },
      { name: 'Railings', icon: '', description: 'Glass, metal, wood' },
      { name: 'Texture Finishes', icon: '', description: 'Plaster, paint, coating' },
      { name: 'Landscaping', icon: '', description: 'Green walls, planters' }
    ]
  }
]

// Project Gallery
const elevationProjects = [
  {
    name: 'Sunrise Villa',
    location: '',
    style: 'Modern Contemporary',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
  },
  {
    name: 'Royal Heritage',
    location: '',
    style: 'Luxury Classic',
    image: 'https://media.istockphoto.com/id/2263386446/photo/seychelles-the-church-of-anse-royale.webp?a=1&b=1&s=612x612&w=0&k=20&c=pTGBL20S4Sjy-W9IOsO7mfmhUzk50G5mJPN9dH6N_Ow='
  },
  {
    name: 'Nordic Heights',
    location: '',
    style: 'Nordiac',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80'
  },
  {
    name: 'Coastal Retreat',
    location: '',
    style: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'
  }
]

// Design Process
const designProcess = [
  {
    step: '01',
    title: 'Consultation',
    description: 'Understanding your vision, preferences, and budget for the elevation design.',
    icon: '',
    duration: '1-2 days'
  },
  {
    step: '02',
    title: 'Concept Development',
    description: 'Creating initial mood boards and elevation concepts for your review.',
    icon: '',
    duration: '1 week'
  },
  {
    step: '03',
    title: '3D Visualization',
    description: 'Photorealistic 3D renders showing every detail of your elevation.',
    icon: '',
    duration: '2 weeks'
  },
  {
    step: '04',
    title: 'Material Selection',
    description: 'Choosing premium materials with samples and quality assurance.',
    icon: '',
    duration: '3-5 days'
  },
  {
    step: '05',
    title: 'Execution',
    description: 'Skilled craftsmanship bringing your elevation design to life.',
    icon: '',
    duration: '4-8 weeks'
  },
  {
    step: '06',
    title: 'Final Reveal',
    description: 'Quality inspection, touch-ups, and final handover.',
    icon: '',
    duration: '3-5 days'
  }
]



function ElevationPage() {
  const [activeStyle, setActiveStyle] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  
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

  const currentStyle = elevationStyles[activeStyle]

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85"
            alt="Architectural Elevation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Architectural Elevation Design
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Create Your Home's
              <span className="text-blue-400"> First Impression</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Transform your home's exterior with stunning elevation designs that combine aesthetics, functionality, and lasting appeal. Expert facade design for residential and commercial properties.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition inline-flex items-center gap-2"
              >
                Get Free Consultation →
              </Link>
              <Link 
                to="/cost-estimator" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold transition"
              >
                Estimate Cost
              </Link>
            </div>
            
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
              {[
                { value: '50+', label: 'Elevation Designs' },
                { value: '1000+', label: 'Happy Clients' },
                { value: '4.9★', label: 'Rating' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Elevation Styles Section */}
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
              Elevation Styles
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Style
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated collection of architectural elevation designs
            </motion.p>
          </motion.div>

          {/* Style Selector */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {elevationStyles.map((style, idx) => (
              <motion.button
                key={style.id}
                onClick={() => setActiveStyle(idx)}
                className={`text-left p-6 rounded-2xl transition-all ${
                  activeStyle === idx 
                    ? 'bg-blue-600 text-white shadow-xl scale-105' 
                    : 'bg-white text-gray-900 hover:shadow-lg border border-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-4xl mb-3">{style.icon}</div>
                <h3 className="text-xl font-bold mb-2">{style.title}</h3>
                <p className={`text-sm ${activeStyle === idx ? 'text-blue-100' : 'text-gray-600'}`}>
                  {style.description.substring(0, 80)}...
                </p>
                {style.popularity && (
                  <div className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    activeStyle === idx ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {style.popularity}
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Active Style Details */}
          <motion.div
            key={activeStyle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="grid lg:grid-cols-2">
              <div className="h-96 lg:h-auto">
                <img 
                  src={currentStyle.image} 
                  alt={currentStyle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12">
                <div className="text-5xl mb-4">{currentStyle.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{currentStyle.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{currentStyle.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentStyle.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-blue-500">✓</span> {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t">
                  
                  <Link 
                    to="/contacts" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Elevation Elements Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Design Elements
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Crafting Your Facade
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every element contributes to your home's unique character
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {elevationElements.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                <div className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-3">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Stunning Elevations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              projects showcasing  elevation design expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {elevationProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <div className="text-white text-lg font-bold mb-1">{project.name}</div>
                  <div className="text-gray-300 text-sm mb-1">{project.location}</div>
                  <div className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full w-fit">
                    {project.style}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/projects" 
              className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold transition"
            >
              View More Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Design Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              From Concept to Reality
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our systematic approach ensures your elevation design exceeds expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designProcess.map((process, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition"
              >
                <div className="text-4xl font-bold text-blue-300 mb-3">{process.step}</div>
                <div className="text-3xl mb-3">{process.icon}</div>
                <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                <p className="text-blue-100 text-sm mb-3">{process.description}</p>
                <div className="text-xs text-blue-200">⏱️ {process.duration}</div>
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
                Elevation Design Experts
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We combine architectural expertise with creative vision to create stunning facades that stand out.
              </p>
              <div className="space-y-4">
                {[
                  '12+ years of elevation design experience',
                  'In-house architectural team',
                  'Photorealistic 3D visualizations',
                  'Premium material selection',
                  'Vastu compliance expertise',
                  'End-to-end execution support'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
                alt="Elevation Design"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-sm">Elevations Designed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Elevate Your Home's Style?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a free consultation with our elevation design experts and bring your vision to life
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/contacts" 
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

export default ElevationPage