import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

// Terrace Garden Styles
const terraceStyles = [
  {
    id: 'modern',
    title: 'Modern Minimalist',
    icon: '🌿',
    description: 'Clean lines, geometric layouts, and contemporary design elements for a sophisticated urban oasis.',
    features: [
      'Geometric planters',
      'Minimalist furniture',
      'Strategic lighting',
      'Low-maintenance plants',
      'Clean decking'
    ],
    image: 'https://media.istockphoto.com/id/1239956283/photo/unfurnished-cozy-bedroom-with-wooden-wall-and-window.webp?a=1&b=1&s=612x612&w=0&k=20&c=nDRoxpShx5ALR1Yckwe77_yFjTy3KWvF2SsnptFFdgo=',
    priceRange: '₹800-1500/sqft',
    popularity: 'Most Popular'
  },
  {
    id: 'tropical',
    title: 'Tropical Paradise',
    icon: '🌴',
    description: 'Lush greenery, exotic plants, and natural elements creating a resort-like atmosphere.',
    features: [
      'Palm trees & ferns',
      'Water features',
      'Natural stone paths',
      'Wooden pergolas',
      'Hammock corners'
    ],
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80',
    priceRange: '₹1000-1800/sqft',
    popularity: 'Luxury Choice'
  },
  {
    id: 'mediterranean',
    title: 'Mediterranean',
    icon: '🏺',
    description: 'Terracotta, vibrant colors, and relaxed European charm for a warm inviting space.',
    features: [
      'Terracotta tiles',
      'Clay pots',
      'Climbing vines',
      'Wrought iron furniture',
      'Fragrant herbs'
    ],
    image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&q=80',
    priceRange: '₹900-1600/sqft',
    popularity: 'Charming'
  },
  {
    id: 'japanese',
    title: 'Japanese Zen',
    icon: '🎋',
    description: 'Peaceful, minimalist design with natural elements for meditation and relaxation.',
    features: [
      'Bamboo features',
      'Rock gardens',
      'Water basins',
      'Bonsai trees',
      'Zen seating'
    ],
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80',
    priceRange: '₹1200-2000/sqft',
    popularity: 'Meditative'
  },
  {
    id: 'vegetable',
    title: 'Edible Garden',
    icon: '🥬',
    description: 'Grow your own organic vegetables, herbs, and fruits in a beautifully designed space.',
    features: [
      'Raised planters',
      'Vertical gardens',
      'Composting system',
      'Drip irrigation',
      'Fruit trees'
    ],
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80',
    priceRange: '₹700-1200/sqft',
    popularity: 'Sustainable'
  },
  {
    id: 'entertainment',
    title: 'Entertainment Deck',
    icon: '🎉',
    description: 'Perfect for parties and gatherings with ample seating, bar area, and outdoor kitchen.',
    features: [
      'Outdoor kitchen',
      'Bar counter',
      'Seating zones',
      'Fire pit',
      'Sound system'
    ],
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    priceRange: '₹1500-2500/sqft',
    popularity: 'Party Ready'
  }
]

// Garden Features
const gardenFeatures = [
  {
    category: 'Planting Systems',
    items: [
      { name: 'Container Gardening', icon: '🪴', description: 'Flexible and movable planters' },
      { name: 'Raised Beds', icon: '📦', description: 'Structured planting areas' },
      { name: 'Vertical Gardens', icon: '🧱', description: 'Wall-mounted green walls' },
      { name: 'Green Roof System', icon: '🏗️', description: 'Complete roof coverage' }
    ]
  },
  {
    category: 'Hardscape Elements',
    items: [
      { name: 'Decking', icon: '🪵', description: 'Wood, composite, or stone' },
      { name: 'Pergolas', icon: '🏛️', description: 'Shade structures and gazebos' },
      { name: 'Pathways', icon: '🛤️', description: 'Stone, tile, or gravel walks' },
      { name: 'Water Features', icon: '💧', description: 'Fountains, ponds, waterfalls' }
    ]
  },
  {
    category: 'Comfort & Amenities',
    items: [
      { name: 'Outdoor Lighting', icon: '💡', description: 'Ambient, task, and accent' },
      { name: 'Furniture', icon: '🪑', description: 'Weather-resistant seating' },
      { name: 'Shade Solutions', icon: '☂️', description: 'Umbrellas, awnings, sails' },
      { name: 'Irrigation', icon: '💦', description: 'Automated watering systems' }
    ]
  }
]

// Project Gallery
const terraceProjects = [
  {
    name: 'Sky Garden Villa',
    location: '',
    style: 'Modern Minimalist',
    area: '1200 sqft',
    image: 'https://media.istockphoto.com/id/1257575119/photo/luxury-community-centre-3d-illustration.webp?a=1&b=1&s=612x612&w=0&k=20&c=F803qXRDHYU-QW_r-P6g2s0IFF89NoYipeGIBBJCYyI='
  },
  {
    name: 'Tropical Oasis',
    location: '',
    style: 'Tropical Paradise',
    area: '800 sqft',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80'
  },
  {
    name: 'Zen Retreat',
    location: '',
    style: 'Retreat',
    area: '600 sqft',
    image: 'https://media.istockphoto.com/id/1325095289/photo/still-life-closeup-of-a-tranquil-spa-arrangement.webp?a=1&b=1&s=612x612&w=0&k=20&c=glrYdC2jWTY9oWb3znY6OGQuNMDrzAixbcJVC5MzggI='
  },
  {
    name: 'Harvest Haven',
    location: '',
    style: 'Edible Garden',
    area: '1000 sqft',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80'
  }
]

// Benefits of Terrace Garden
const benefits = [
  {
    title: 'Environmental Benefits',
    icon: '🌍',
    points: [
      'Reduces heat island effect',
      'Improves air quality',
      'Natural insulation',
      'Stormwater management',
      'Carbon footprint reduction'
    ]
  },
  {
    title: 'Health & Wellness',
    icon: '🧘',
    points: [
      'Stress reduction',
      'Fresh organic produce',
      'Outdoor exercise space',
      'Mental wellbeing',
      'Connection with nature'
    ]
  },
  {
    title: 'Property Value',
    icon: '💰',
    points: [
      'Increases property value',
      'Adds usable space',
      'Energy cost savings',
      'Aesthetic appeal',
      'Unique selling point'
    ]
  }
]

// Technical Considerations
const technicalConsiderations = [
  {
    title: 'Structural Assessment',
    description: 'Professional evaluation of load-bearing capacity',
    icon: '🏗️',
    details: ['Weight calculation', 'Waterproofing check', 'Drainage analysis']
  },
  {
    title: 'Waterproofing',
    description: 'Critical protection against water leakage',
    icon: '💧',
    details: ['Membrane application', 'Drainage layer', 'Root barrier']
  },
  {
    title: 'Drainage System',
    description: 'Proper water management solution',
    icon: '🌊',
    details: ['Gutter systems', 'Downspouts', 'Drainage pipes']
  },
  {
    title: 'Irrigation',
    description: 'Efficient watering systems',
    icon: '💦',
    details: ['Drip irrigation', 'Rain sensors', 'Timer controls']
  }
]

// Process Steps
const processSteps = [
  {
    step: '01',
    title: 'Site Assessment',
    description: 'Structural evaluation and space planning',
    icon: '📏',
    duration: '2-3 days'
  },
  {
    step: '02',
    title: 'Design Concept',
    description: 'Creating your dream garden layout',
    icon: '🎨',
    duration: '1 week'
  },
  {
    step: '03',
    title: 'Waterproofing',
    description: 'Ensuring complete leak protection',
    icon: '💧',
    duration: '1 week'
  },
  {
    step: '04',
    title: 'Installation',
    description: 'Professional construction and planting',
    icon: '🌱',
    duration: '2-4 weeks'
  },
  {
    step: '05',
    title: 'Irrigation Setup',
    description: 'Automated watering systems',
    icon: '💦',
    duration: '2-3 days'
  },
  {
    step: '06',
    title: 'Final Touches',
    description: 'Furniture, lighting, and styling',
    icon: '✨',
    duration: '3-5 days'
  }
]



function TerraceGardenPage() {
  const [activeStyle, setActiveStyle] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  useEffect(() => {
    const timer = setInterval(() => {
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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

  const currentStyle = terraceStyles[activeStyle]

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1633330948542-0b3bdeefcdb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVycmFjZSUyMEdhcmRlbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Terrace Garden"
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
            <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Terrace Garden Design
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your Terrace into
              <span className="text-green-400"> A Green Paradise</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Create your own urban oasis with professionally designed terrace gardens. Perfect for relaxation, entertainment, and growing your own organic produce.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contacts" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition inline-flex items-center gap-2"
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
            
            
          </motion.div>
        </div>
      </section>

      {/* Garden Styles Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Garden Styles
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Garden Style
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of terrace garden designs
            </motion.p>
          </motion.div>

          {/* Style Selector Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {terraceStyles.map((style, idx) => (
              <motion.button
                key={style.id}
                onClick={() => setActiveStyle(idx)}
                className={`text-left p-6 rounded-2xl transition-all ${
                  activeStyle === idx 
                    ? 'bg-green-600 text-white shadow-xl scale-105' 
                    : 'bg-white text-gray-900 hover:shadow-lg border border-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-4xl mb-3">{style.icon}</div>
                <h3 className="text-xl font-bold mb-2">{style.title}</h3>
                <p className={`text-sm ${activeStyle === idx ? 'text-green-100' : 'text-gray-600'}`}>
                  {style.description.substring(0, 80)}...
                </p>
                {style.popularity && (
                  <div className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    activeStyle === idx ? 'bg-white/20 text-white' : 'bg-green-100 text-green-600'
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
                        <span className="text-green-500">✓</span> {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t">
                  <div>
                    <div className="text-sm text-gray-500">Estimated Cost Range</div>
                    <div className="text-2xl font-bold text-green-600">{currentStyle.priceRange}</div>
                    <div className="text-xs text-gray-500">including plants and installation</div>
                  </div>
                  <Link 
                    to="/contacts" 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Benefits
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Create a Terrace Garden?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your unused space into a valuable asset
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <ul className="space-y-2">
                  {benefit.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-gray-600">
                      <span className="text-green-500">✓</span> {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Garden Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Design Elements
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Creating Your Perfect Garden
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every element carefully selected for beauty and functionality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {gardenFeatures.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg"
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

      {/* Technical Considerations */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Technical Excellence
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built to Last
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional engineering ensures safety and longevity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalConsiderations.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tech.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{tech.description}</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  {tech.details.map((detail, dIdx) => (
                    <li key={dIdx}>• {detail}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Beautiful Gardens We've Created
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real projects showcasing our terrace garden expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {terraceProjects.map((project, idx) => (
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
                  <div className="text-gray-300 text-xs mb-2">{project.area}</div>
                  <div className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full w-fit">
                    {project.style}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/projects" 
              className="inline-block border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-full font-semibold transition"
            >
              View More Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              From Vision to Reality
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              A systematic approach ensuring quality and satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition"
              >
                <div className="text-4xl font-bold text-green-300 mb-3">{step.step}</div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-green-100 text-sm mb-3">{step.description}</p>
                <div className="text-xs text-green-200">⏱️ {step.duration}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Green Paradise?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Let's transform your terrace into a beautiful, functional garden space
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/contacts" 
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition inline-flex items-center gap-2"
            >
              Schedule Consultation →
            </Link>
            <Link 
              to="/cost-estimator" 
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-full font-semibold transition"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TerraceGardenPage