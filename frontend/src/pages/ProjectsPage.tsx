import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { fetchHomeContent } from '../api/content'
import { defaultHomeContent } from '../data/defaultHomeContent'
import type { HomeContent } from '../types/homeContent'
import Testimonials from './Testimonials'

// Unsplash image URLs – you can replace with your own
const heroBgImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
const projectImageFallback = "https://images.unsplash.com/photo-1617104678098-de229db51175?q=80&w=1214&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const faqImage = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'

// Typewriter word array
const typedWords = ['quality', 'trust', 'excellence', 'precision', 'care']

const metrics = [
  { value: '18+', label: 'years of excellence', note: 'Trust built on consistent delivery across residential projects.' },
  { value: '500+', label: 'quality checks', note: 'Rigorous inspections at every stage of construction.' },
  { value: '4.5/5', label: 'client satisfaction', note: 'Rated by over 299 happy clients.' },
  { value: '100%', label: 'Protected', note: 'Payments are safe and released progressively with milestone completion.' },
]

const framework = [
  {
    title: 'Transparent pricing',
    text: 'No hidden costs. Every rupee is accounted for in a detailed quotation before work begins.',
  },
  {
    title: 'On‑time delivery',
    text: 'We follow a strict project schedule with regular updates, so you always know the progress.',
  },
  {
    title: 'Quality assurance',
    text: 'Our in‑house team performs over 500 quality checks to ensure every detail meets our high standards.',
  },
]

// FAQ data
const faqs = [
  {
    q: "What is the average cost of construction per square foot?",
    a: "Our construction costs typically range between ₹1,500 to ₹2,500 per square foot, depending on the quality of materials, finishes, and project complexity. We provide a detailed, transparent quotation before starting any work."
  },
  {
    q: "How long does it take to build a home?",
    a: "A standard 2,000 sq.ft. home takes about 10-14 months from design to handover. We follow a strict schedule and keep you updated at every milestone."
  },
  {
    q: "Do you offer interior design services?",
    a: "Yes, we have an in-house interior design team that works alongside our construction team to create cohesive, functional, and beautiful spaces."
  },
  {
    q: "Is my payment safe?",
    a: "Absolutely. We use a Safe and Secure System where payments are released step-by-step with ongoing milestones, only after your approval."
  },
  {
    q: "Can I visit ongoing projects?",
    a: "Yes, we encourage clients to visit our ongoing projects to see our quality and workmanship firsthand. Contact us to schedule a site visit."
  }
]

// ===== COMPLETED PROJECTS FROM PDF =====
const completedProjects = [
  {
    id: 1,
    title: 'Residential Building at Sector-61 Noida',
    client: 'M/s Gupta Ji',
    location: 'Noida',
    category: 'Residential',
    description: 'Modern residential building with premium amenities and spacious layouts.',
    images: ['/images/VasundharaP3.png'],
    year: '2023'
  },
  {
    id: 2,
    title: 'Kapda Mandir Agra',
    client: 'M/s Mohit Bareja',
    location: 'Agra',
    category: 'Religious',
    description: 'Sacred temple construction with traditional architecture and intricate design.',
    images: ['/images/home3.png'],
    year: '2023'
  },
  {
    id: 3,
    title: 'Residential Building of Retired PWD Chief Engineer',
    client: 'M/s Ashok Ji',
    location: 'Noida',
    category: 'Residential',
    description: 'Luxury residence for retired PWD Chief Engineer with premium finishes.',
    images: ['/images/home.png'],
    year: '2024'
  },
  {
    id: 4,
    title: 'Residential Building Ashoka Housing',
    client: 'M/s Nitin Gupta Ji',
    location: 'Noida',
    category: 'Residential',
    description: 'Premium residential complex in Ashoka Housing with modern amenities.',
    images: ['/images/home4.png'],
    year: '2024'
  },
  {
    id: 5,
    title: 'Residential Building Lokesh Kumar Ji',
    client: 'M/s Lokesh Kumar Ji',
    location: 'New Delhi',
    category: 'Residential',
    description: 'Custom-built residence in New Delhi with personalized design.',
    images: ['/images/VasundharaP2.png'],
    year: '2023'
  },
  {
    id: 6,
    title: 'MM-Pharma House (Marriage Hall)',
    client: 'M/s Madusudan Sharma',
    location: 'Noida',
    category: 'Commercial',
    description: 'Versatile marriage hall for events and gatherings with grand architecture.',
    images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format'],
    year: '2024'
  }
]

// ===== ONGOING PROJECTS FROM PDF =====
const ongoingProjects = [
  {
    id: 1,
    title: 'Residential Building, D-200 E-Land Sector-63',
    client: 'M/S E-land',
    location: 'Noida (UP)',
    category: 'Residential',
    description: 'Luxury residential building with modern amenities and premium finishes.',
    progress: 65,
    expectedCompletion: 'Dec 2025',
    // images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format']
  },
  {
    id: 2,
    title: 'Temple by Pratik Logic',
    client: 'M/s Pratik Logic',
    location: 'Noida (UP)',
    category: 'Religious',
    description: 'Traditional temple construction with intricate architectural details.',
    progress: 40,
    expectedCompletion: 'Mar 2026',
    // images: ['https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?w=600&auto=format']
  },
  {
    id: 3,
    title: 'Residential Building of Vishnu Ji',
    client: 'M/s Vishnu Ji',
    location: 'Vasundhara, Delhi',
    category: 'Residential',
    description: 'Modern residence with contemporary design and quality construction.',
    progress: 75,
    expectedCompletion: 'Aug 2025',
    // images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format']
  }
]

// ===== UPCOMING PROJECTS FROM PDF =====
const upcomingProjects = [
  {
    id: 1,
    title: 'Luxury Residential Township',
    location: 'Greater Noida',
    area: '25 Acres',
    estimatedStart: 'Q1 2026',
    features: ['Club House', 'Swimming Pool', 'Landscaped Gardens', 'Sports Complex', '24/7 Security'],
    description: 'A premium residential township with world-class amenities and green spaces.'
  },
  {
    id: 2,
    title: 'Commercial Tower',
    location: 'Sector 62, Noida',
    area: '5 Lakh sq. ft.',
    estimatedStart: 'Q2 2026',
    features: ['LEED Certified', 'Smart Building', 'Rooftop Restaurant', 'Multi-level Parking', 'High-speed Elevators'],
    description: 'State-of-the-art commercial tower for corporate offices and retail spaces.'
  },
  {
    id: 3,
    title: 'Affordable Housing Project',
    location: 'Greater Noida West',
    area: '15 Acres',
    estimatedStart: 'Q3 2026',
    features: ['Community Center', 'School', 'Healthcare Facility', 'Shopping Complex', 'Parks'],
    description: 'Quality affordable housing with all essential amenities for modern living.'
  }
]

// ===== INTERIOR PROJECTS FROM PDF =====
const interiorProjects = [
  { id: 1, title: 'Premium Interior Design',  description: 'High-end luxury interiors with premium materials and designer finishes.', image: '/images/interiorp.jpeg' },
  { id: 2, title: 'Modern Bedroom Interior', description: 'Elegant bedroom design with modern furniture and lighting.', image: '/images/sofaroom.jpeg' },
  { id: 3, title: 'Designer Kitchen Interior', description: 'Modular kitchen with smart storage and premium appliances.', image: '/images/kitchen2.jpeg' },
  ]

// ===== TEAM MEMBERS FROM PDF =====
const teamMembers = [
  { name: 'Anoj Kumar Gupta', designation: 'Managing Director', experience: '15 years', icon: '👨‍💼' },
  { name: 'Lokesh Kumar', designation: 'Co-director', experience: '10 years', icon: '👨‍🔧' },
  { name: 'Beena Bisht', designation: 'Admin', experience: '5 years', icon: '👩‍💼' },
  { name: 'Prajwal Mamgai', designation: 'Architect', experience: '5 years', icon: '👨‍🎨' },
  { name: 'Anita Harbola', designation: 'Project Engineer', experience: '6 years', icon: '👩‍🔧' },
  { name: 'Yash Tyagi', designation: 'Civil Engineer', experience: '5 years', icon: '👨‍🔧' }
]

// Featured Projects (combining completed projects for showcase)
const featuredProjects = completedProjects.map(project => ({
  title: project.title,
  location: project.location,
  area: '',
  tag: project.category,
  description: project.description,
  images: project.images,
  client: project.client,
  year: project.year
}))

const videoItems = [
  
  { title: "Interior Makeover", description: "Complete home interior transformation with modern finishes.", src: "/videos/vasundharaVideo4.mp4" },
  { title: "Interior Makeover", description: "Complete home interior transformation with modern finishes.", src: "/videos/vasundharaVideo5.mp4" },
  { title: "Interior Makeover", description: "Complete home interior transformation with modern finishes.", src: "/videos/vasundharaVideo6.mp4" },
  { title: "Interior Makeover", description: "Complete home interior transformation with modern finishes.", src: "/videos/vasundharaVideo7.mp4" },
  { title: "Interior Makeover", description: "Complete home interior transformation with modern finishes.", src: "/videos/vasundharaVideo8.mp4" },
  { title: "Interior Makeover", description: "Complete home interior transformation with modern finishes.", src: "/videos/vasundharaVideo1.mp4" },
  { title: "Interior Makeover", description: "Complete home interior transformation with modern finishes.", src: "/videos/vasundharaVideo2.mp4" },
  { title: "Interior Makeover", description: "Complete home interior transformation with modern finishes.", src: "/videos/vasundharaVideo3.mp4" },
]

function ProjectsPage() {
  const [homeContent, setHomeContent] = useState<HomeContent>(defaultHomeContent)
  const [typedWord, setTypedWord] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'completed' | 'ongoing' | 'upcoming' | 'interiors'>('completed')
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    let active = true
    fetchHomeContent()
      .then((content) => { if (active) setHomeContent(content) })
      .catch(() => { if (active) setHomeContent(defaultHomeContent) })
    return () => { active = false }
  }, [])

  // Typewriter effect
  useEffect(() => {
    const current = typedWords[wordIndex]
    if (!current) return
    const atWordEnd = typedWord === current
    const atWordStart = typedWord === ''
    const delay = !isDeleting && atWordEnd ? 1500 : isDeleting ? 50 : 90
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (atWordEnd) { setIsDeleting(true); return }
        setTypedWord(current.slice(0, typedWord.length + 1)); return
      }
      if (!atWordStart) { setTypedWord(current.slice(0, typedWord.length - 1)); return }
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % typedWords.length)
    }, delay)
    return () => clearTimeout(timeout)
  }, [typedWord, isDeleting, wordIndex])

  // Scroll reveal
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('revealed') }) },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )
    sectionsRef.current.forEach((section) => { if (section) observerRef.current?.observe(section) })
    return () => observerRef.current?.disconnect()
  }, [])

  const projectSection = homeContent.projects

  return (
    <main>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-blink { animation: blink 1s step-end infinite; }
        .reveal-section { opacity: 0; transform: translateY(40px); transition: opacity 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1); }
        .reveal-section.revealed { opacity: 1; transform: translateY(0); }
        .hero-fixed-bg { background-image: url(${heroBgImage}); background-attachment: fixed; background-size: cover; background-position: center; background-repeat: no-repeat; }
        @media (max-width: 768px) { .hero-fixed-bg { background-attachment: scroll; } }
        .tab-active { border-bottom: 2px solid #3b82f6; color: #3b82f6; }
      `}</style>

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${heroBgImage})`, filter: 'blur(5px)', transform: 'scale(1.1)' }}></div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative py-10 md:py-20 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <span className="text-sm font-semibold uppercase tracking-wider p-1 text-black bg-white rounded-xl inline-block">Our Portfolio</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                  Crafting spaces that reflect your dreams, with{' '}
                  <span className="text-blue-500 inline-block">{typedWord}<span className="animate-blink">|</span></span>
                </h1>
                <p className="text-lg text-white max-w-xl bg-black bg-opacity-50 rounded-xl p-3 backdrop-blur-sm">
                  Every project we deliver is a testament to our commitment to excellence, transparency, and on‑time execution.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/services" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition">Explore Services</Link>
                  <Link to="/cost-estimator" className="inline-block border-2 border-blue-400 text-white hover:bg-blue-600 font-bold py-3 px-6 rounded-lg transition">Estimate Your Build</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                  <div><div className="text-3xl font-black text-white">{completedProjects.length}+</div><p className="text-sm text-white mt-1">Completed projects across India</p></div>
                  <div><div className="text-3xl font-black text-white">100%</div><p className="text-sm text-white mt-1">Transparent costing</p></div>
                  <div><div className="text-3xl font-black text-white">On time</div><p className="text-sm text-white mt-1">Delivery guaranteed</p></div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <img src={projectImageFallback} alt="Featured project" className="w-full h-96 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="inline-block text-blue-500 text-xs font-bold px-3 py-1 rounded-full mb-3 bg-white bg-opacity-90">Vasundhara Construction</div>
                  <h3 className="text-white text-xl font-bold">Where vision meets precision – a home built with care.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Tabs */}
      <section ref={(el) => (sectionsRef.current[0] = el)} className="reveal-section py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Our Work</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Featured <span className="text-blue-600">Projects</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">Explore our portfolio of successful projects delivered with excellence</p>
          </div>

          {/* Project Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-gray-200">
            {['completed', 'ongoing', 'upcoming', 'interiors'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 text-sm font-semibold uppercase transition-all ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab === 'completed' && 'Completed Projects'}
                {tab === 'ongoing' && 'Ongoing Projects'}
                {tab === 'upcoming' && 'Upcoming Projects'}
                {tab === 'interiors' && 'Interior Projects'}
              </button>
            ))}
          </div>

          {/* Completed Projects Grid */}
          {activeTab === 'completed' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completedProjects.map((project) => (
                <div key={project.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-1"><strong>Client:</strong> {project.client}</p>
                    <p className="text-gray-600 text-sm mb-1"><strong>Location:</strong> {project.location}</p>
                    <p className="text-gray-600 text-sm mb-2"><strong>Year:</strong> {project.year}</p>
                    <p className="text-gray-500 text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ongoing Projects Grid */}
          {activeTab === 'ongoing' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongoingProjects.map((project) => (
                <div key={project.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* <div className="relative h-64 overflow-hidden">
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div> */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-1"><strong>Client:</strong> {project.client}</p>
                    <p className="text-gray-600 text-sm mb-2"><strong>Location:</strong> {project.location}</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1"><span>Progress</span><span className="font-semibold text-blue-600">{project.progress}%</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 rounded-full h-2" style={{ width: `${project.progress}%` }}></div></div>
                    </div>
                    <p className="text-sm text-gray-500"><strong>Expected Completion:</strong> {project.expectedCompletion}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upcoming Projects Grid */}
          {activeTab === 'upcoming' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingProjects.map((project) => (
                <div key={project.id} className="group bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                    <h3 className="font-bold text-white text-xl">{project.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-2"><strong>📍 Location:</strong> {project.location}</p>
                    <p className="text-gray-600 mb-3"><strong>🏗️ Area:</strong> {project.area}</p>
                    <p className="text-blue-600 font-semibold mb-3"><strong>📅 Est. Start:</strong> {project.estimatedStart}</p>
                    <p className="text-gray-500 text-sm mb-3">{project.description}</p>
                    <div className="border-t pt-3">
                      <p className="font-semibold text-gray-700 mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.features.slice(0, 4).map((feature, i) => (
                          <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✓ {feature}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Interior Projects Grid */}
          {activeTab === 'interiors' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {interiorProjects.map((project) => (
                <div key={project.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1617104678098-de229db51175?w=600&auto=format' }} />
                  </div>
                  <div className="p-6">
                    <div className="inline-block text-xs font-semibold px-2 py-1 rounded-full mb-2 bg-blue-100 text-blue-600">{project.category}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-500 text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={(el) => (sectionsRef.current[2] = el)} className="reveal-section py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Our Experts</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Meet Our <span className="text-blue-600">Team</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">Dedicated professionals with decades of collective experience</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="text-center p-4 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-3">{member.icon}</div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium">{member.designation}</p>
                <p className="text-gray-500 text-xs mt-1">{member.experience} exp.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section ref={(el) => (sectionsRef.current[1] = el)} className="reveal-section py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Watch</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Our <span className="text-blue-600">Videos</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">See our projects come to life – from foundation to final finish.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {videoItems.map((video, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative bg-black">
                  <video className="aspect-video autoPlay object-cover w-full" controls preload="metadata" controlsList="nodownload" disablePictureInPicture>
                    <source src={video.src} type="video/mp4" />
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section ref={(el) => (sectionsRef.current[3] = el)} className="reveal-section py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Trust & Credibility</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">The numbers behind our promise.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">Our track record speaks for itself — built on integrity, quality, and trust.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition">
                <div className="text-4xl font-black text-blue-600 mb-2">{metric.value}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 capitalize">{metric.label}</h3>
                <p className="text-gray-600 text-sm">{metric.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project DNA Section */}
      <section ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Our Promise</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 mb-4">What makes a Vasundhara project stand out.</h2>
              <p className="text-gray-700 mb-8">We believe in building relationships as strong as our structures. That means clarity, accountability, and a relentless focus on quality.</p>
              <div className="space-y-6">
                {framework.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-200 text-blue-600 flex items-center justify-center text-xl font-bold">✓</div>
                    <div><h3 className="text-lg font-bold text-gray-900">{item.title}</h3><p className="text-gray-600 mt-1">{item.text}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-center">
              <blockquote className="text-gray-800 italic text-lg leading-relaxed mb-6">
                “Vasundhara didn't just build our home; they built our trust. Every step was transparent, and the quality is exceptional.”
              </blockquote>
              <cite className="text-gray-500 font-semibold not-italic">— Mr. Anoj Gupta, Noida</cite>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* FAQ Section */}
      <section ref={(el) => (sectionsRef.current[5] = el)} className="reveal-section py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">Have Questions?</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Frequently Asked <span className="text-blue-600">Questions</span></h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="rounded-2xl overflow-hidden shadow-xl"><img src={faqImage} alt="Construction blueprint" className="w-full h-auto object-cover" /></div>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-5">
                  <button onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)} className="flex justify-between items-center w-full text-left focus:outline-none">
                    <span className="text-lg font-semibold text-gray-900">{faq.q}</span>
                    <svg className={`w-5 h-5 text-blue-600 transform transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`mt-3 text-gray-600 overflow-hidden transition-all duration-300 ${openFaqIndex === idx ? 'max-h-96' : 'max-h-0'}`}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-black mb-4">Ready to build your dream home?</h3>
            <p className="text-blue-100 text-lg mb-8">Let's discuss your vision. We'll guide you through the process with complete transparency and unmatched quality.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/cost-estimator" className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition">Get a Free Estimate</Link>
              <Link to="/contacts" className="inline-block border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition">Talk to an Expert</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProjectsPage