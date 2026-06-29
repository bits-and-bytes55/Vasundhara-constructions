import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Testimonials from './Testimonials';

// ----- Typewriter word list -----
const typedWords = ['quality', 'trust', 'excellence', 'precision', 'care']

// ----- Static content (replaces backend) -----
const hero = {
  eyebrow: 'Vasundhara Construction',
  titleLineOne: 'Building your',
  titleLineTwo: 'dream home with',
  subtitle: 'Experience excellence in construction and interior design – delivered on time, with complete transparency.',
  primaryCtaLabel: 'Get a Free Estimate',
  secondaryCtaLabel: 'View Our Work',
  pills: ['Delhi NCR Industry Homes', '100% Money Guaranteed & Commitment', 'On‑time Delivery'],
  stats: [
    { value: '12+', label: 'Years Experience' },
    { value: '299+', label: 'Happy Clients' },
    { value: '4.5/5', label: 'Client Rating' },
  ],
}



const services = {
  eyebrow: 'Our Expertise',
  titleStart: 'What we',
  titleHighlight: 'build',
  cards: [
    {
      title: 'Construction',
      description: 'Quality civil construction delivered on time and within budget.',
      link: '/services/construction'
    },
    {
      title: 'Interiors',
      description: 'Stylish, functional, and personalized interior designing.',
      link: '/services/interior-design'
    },
    {
      title: 'Elevations',
      description: 'Transform the front facade to stand out with a premium look.',
      link: '/services/elevation-page'
    },
    {
      title: 'Terrace Garden',
      description: 'Refresh your rooftop with lush and serene outdoor spaces.',
      link: '/services/terrace-garden-page'
    },
    {
      name: 'Home Renovation',
      description: 'Enhance your home’s comfort, design, and functionality with smart renovation solutions.',
      link: '/services/home-renovation',
    },
  ],

};
const process = {
  eyebrow: 'How we work',
  titleStart: 'Our simple',
  titleHighlight: 'process',
  subtitle: 'From consultation to handover – we keep you informed at every step.',
  steps: [
    { title: 'Consultation', description: 'Discuss your requirements' },
    { title: 'Design & Planning', description: 'Craft detailed designs & plans' },
    { title: 'Cost Finalization', description: 'Get a transparent quote' },
    { title: 'Construction Phase', description: 'Begin construction of your home' },
    { title: 'Quality Checks', description: 'Conduct rigorous inspections' },
    { title: 'Final Handover', description: 'Deliver your dream home' },
  ],
}


const projects = {
  eyebrow: 'Featured Work',
  titleStart: 'Projects We are ',
  titleHighlight: 'Working On',
  subtitle: 'Quality, precision, and aesthetics.',
  items: [
    {
      title: 'Luxury Villa',
      location: '',
      area: '',
      tag: 'Luxury Villa',
      description: 'Modern architecture with premium finishes and spacious layouts.',
      images: ['/images/VasundharaP3.png', 'https://images.unsplash.com/photo-1764566917581-2cfd7ba4edd8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwc2ltcGxlTHV4dXJ5JTIwVmlsbGFzfGVufDB8fDB8fHww'],
    },
    {
      title: 'Institutional',
      location: '',
      area: '2200 sq.ft.',
      tag: 'Family Home',
      description: 'Functional design for educational or civic spaces with durability.',
      images: ['https://images.unsplash.com/photo-1681171575028-16aa7a6f063e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY2fHxpbmRpYW4lMjBpbnN0aXR1dGlvbiUyMHNtYWxsJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D', "https://plus.unsplash.com/premium_photo-1733288413391-a88bbe8be696?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fGluZGlhbiUyMGluc3RpdHV0aW9uJTIwc21hbGwlMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D"],
    },
    {
      title: 'Residential',
      location: '',
      area: '2200 sq.ft.',
      tag: 'residential ',
      description: 'Comfortable and efficient living spaces for everyday life.',
      images: ['/images/residential.jpg',],
    },
    {
      title: 'Interiors',
      location: '',
      area: '2200 sq.ft.',
      tag: 'Family Home',
      description: 'Thoughtful interior layouts and finishes for practical aesthetics.',
      images: ['/images/interiors.jpg'],
    },
    {
      title: 'Home Renovation',
      location: '',
      area: '2200 sq.ft.',
      tag: 'Family Home',
      description: 'Upgrading existing structures for modern needs and safety.',
      images: ['https://images.unsplash.com/flagged/photo-1573168710465-7f7da9a23a15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZSUyMHJlbm92YXRpb258ZW58MHx8MHx8fDA%3D'],
    },
    {
      title: 'Construction',
      location: '',
      area: '2200 sq.ft.',
      tag: 'Family Home',
      description: 'Reliable construction management and execution from ground up.',
      images: ['/images/vasundharaP.jpeg'],
    },

  ],
}

const ceo = {
  eyebrow: 'Leadership',
  titleStart: 'Meet the',
  titleHighlight: 'founder',
  name: 'Anoj Gupta ',
  role: 'CEO & Founder',
  intro: 'With over 12+ years of experience in construction and interior design, I ensure every project is delivered with precision and trust.',
  message: 'At Vasundhara, we don’t just build structures — we craft lifestyles.',
  buttonLabel: 'Contact Us',
}

const trustStats = [
  { icon: '', value: '12+', label: 'Years of Experience', sub: 'Proven excellence in construction' },
  { icon: '', value: '500+', label: 'Quality Checks', sub: 'Per project, every milestone' },
  { icon: '', value: '100%', label: 'Protected', sub: 'Secure payment system' },
  { icon: '', value: '299+', label: 'Happy clients', sub: 'Across 10+ cities in India' },
  { icon: '', value: '4.5/5', label: 'Customer Rating', sub: 'Rated by homeowners' },
  { icon: '', value: '10+', label: 'Cities Served', sub: 'And expanding across India' },
]

const whyPoints = [
  { title: '12+ Years Experience', desc: 'Proven track record of excellence in construction.' },
  { title: '500+ Quality Checks', desc: 'Rigorous inspections at every stage of construction.' },
  { title: 'In-House Architects', desc: 'Dedicated in-house experts for superior designs.' },
  { title: 'No Third-Party Contractors', desc: 'We handle everything directly for quality control.' },
  { title: 'Protected Payments', desc: 'Payments held securely until milestones are met.' },
  { title: 'Live Project Tracking', desc: 'Monitor progress in real-time through our app.' },
  { title: 'On-Time Delivery', desc: 'Clear schedules and disciplined execution always.' },
]

const whySlides = [
  { image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800', label: '500+ quality checks on every build' },
  { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', label: 'Modern facades with premium detailing' },
  { image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', label: 'Luxury residences delivered with discipline' },
  { image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800', label: 'Elevation planning that boosts curb appeal' },
]

const dreamSlides = [
  { label: 'Modern Living Room', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
  { label: 'Master Bedroom', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800' },
  { label: 'Kitchen Design', image: 'https://plus.unsplash.com/premium_photo-1661963667668-f53a412a5922?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGtpdGNoZW4lMjBkZXNpZ258ZW58MHx8MHx8fDA%3D' },
  { label: 'Elevation View', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800' },
]


// FAQ data
const faqs = [
  {
    q: "What is the average cost of construction per square foot?",
    a: "Our construction costs typically range between ₹1,500 to ₹2,800 per square foot, depending on the quality of materials, finishes, and project complexity. We provide a detailed, transparent quotation before starting any work."
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
    a: "Absolutely. We use a secure escrow system where payments are released step-by-step with ongoing milestones, only after your approval"
  },
  {
    q: "Can I visit ongoing projects?",
    a: "Yes, we encourage clients to visit our ongoing projects to see our quality and workmanship firsthand. Contact us to schedule a site visit."
  }
]

// ----- NEW: Packages data -----
const packagesData = {
  eyebrow: 'Pricing Plans',
  titleStart: 'Choose Your',
  titleHighlight: 'Package',
  subtitle: 'Transparent, fixed-price packages for your dream home – no hidden costs.',
  cards: [
    {
      name: 'Basic - Low',
      price: '₹1,550/sq.ft.',
      rate: '₹1,550 – ₹1,850/sq.ft.',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #1e3a8a)',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format',
      eyebrow: 'Value Plus',
      popular: false,
      breakdown: [
        ['Cement', 'Shree / Bangur PPC'],
        ['TMT Bars', 'Shree / Shyam'],
        ['Plumbing', 'Prins'],
        ['Sanitary', 'Lipka / Parryware'],
        ['Flooring', 'Vitrified tiles – Somany'],
        ['Paint', 'Birla Opus or Equivalent'],
      ],
      cta: 'Get Quote →',
      fullSpecs: {
        cement: 'Shree / Bangur PPC',
        tmt: 'Shree / Shyam',
        chowkhat: 'Mango Wood / Pine Wood',
        doors: 'Mango Wood / Pine Wood with Paint',
        windows: 'Pine Wood Frame with Float Glass',
        railing: 'Normal Brickwork on Parapet',
        flooring: 'Vitrified Tiles – Somany (all floors), Kota Stone in Stairs/Concrete Plaster, CC Flooring',
        wallFinish: 'Birla Opus or Equivalent Paint Finish',
        kitchen: 'Polished Granite Slab & BWR Plywood with Sunmica Finish',
        shoeCrockery: 'Not Included',
        falseCeiling: 'Normal POP on Ceiling (JK / SuperFine Brand)',
        curtains: 'Not Included',
        furniture: 'Not Included',
        sanitary: 'Lipka / Parryware',
        electrical: 'Prins',
        switches: 'Finolex',
        lights: 'Not Included'
      }
    },
    {
      name: 'Basic - High',
      price: '₹1,750/sq.ft.',
      rate: '₹1,750 – ₹2,300/sq.ft.',
      color: '#0ea5e9',
      gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
      img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&auto=format',
      eyebrow: 'Most Popular',
      popular: true,
      breakdown: [
        ['Cement', 'ACC / Ambuja'],
        ['TMT Bars', 'Rathi / Indostar'],
        ['Plumbing', 'AKG / BEC'],
        ['Sanitary', 'Hindware / Parryware'],
        ['Flooring', 'Vitrified tiles – Kajaria'],
        ['Paint', 'Berger / Dulux / Nerolac'],
      ],
      cta: 'Get Quote →',
      fullSpecs: {
        cement: 'ACC / Ambuja',
        tmt: 'Rathi / Indostar',
        chowkhat: 'Marandi / Kapoor',
        doors: 'Plywood Doors with Laminate on Both Sides',
        windows: 'Teak or Sal Wood',
        railing: 'MS Railing',
        flooring: 'Vitrified Tiles – Kajaria (all floors), Granite in Stairs, Kota Stone in Parking',
        wallFinish: 'Berger / Dulux / Nerolac Paint with Wallpaper / 3D Paint as required',
        kitchen: 'Polished Granite Slab & Action Tesa with Advance Laminate / Merino Sheet incl. Ozone / Godrej Accessories',
        shoeCrockery: 'BWR Plywood Open Shelves with Laminate Finish',
        falseCeiling: 'Gypsum Cove Ceiling (Sakarni POP / Birla White)',
        curtains: 'Not Included',
        furniture: 'Not Included',
        sanitary: 'Hindware / Parryware',
        electrical: 'AKG / BEC',
        switches: 'Anchor by Penta / Anchor by Panasonic',
        lights: 'LED Downlight (Crompton / Wipro) – 4 nos per Bedroom & Drawing Room'
      }
    },
    {
      name: 'Standard',
      price: '₹2,150/sq.ft.',
      rate: '₹2,150 – ₹2,500/sq.ft.',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&auto=format',
      eyebrow: 'Most Popular',
      popular: true,
      breakdown: [
        ['Cement', 'JK Cement / Super'],
        ['TMT Bars', 'Kamdhenu / Rathi'],
        ['Plumbing', 'Supreme'],
        ['Sanitary', 'Hindware / Jaquar'],
        ['Flooring', 'Tile + Wooden in Drawing & Bedroom'],
        ['Paint', 'Asian Apex Ultima'],
      ],
      cta: 'Get Quote →',
      fullSpecs: {
        cement: 'JK Cement / Super',
        tmt: 'Kamdhenu / Rathi',
        chowkhat: 'Teak or Sal Wood',
        doors: 'Century Plyboard with Laminate on Both Sides',
        windows: 'UPVC – Prominent',
        railing: 'SS Railing / Glass Railing',
        flooring: 'Tile + Wooden Flooring in Drawing & Bedroom, Granite in Stairs, Kota Stone in Parking',
        wallFinish: 'Asian Apex Ultima Paint with PVC Moulding / Wooden Panelling / Cladding / Murals',
        kitchen: 'Polished Italian Marble Slab & Century Ply HDHMR Board with Royale Touch Acrylic Sheet incl. Blum / Hafele Accessories (Designer TV Unit with Storage)',
        shoeCrockery: 'Designer Shoe Cabinet / Crockery Unit with BWR Plywood Shutters & Advance Laminate Finish',
        falseCeiling: 'Gypsum Cove Ceiling with LED Lighting (Birla White / Sakarni Gypsum Plaster)',
        curtains: 'Included as per client selection',
        furniture: 'Puja Unit, Bar Unit – HDHMR Board with Laminate Finish',
        sanitary: 'Hindware / Jaquar',
        electrical: 'Supreme',
        switches: 'Polycab / Great White',
        lights: 'LED Downlights & Panel Lights (Havells / Orient / Philips) – 4–6 nos per room'
      }
    },
    {
      name: 'Premium',
      price: '₹2,750/sq.ft.',
      rate: '₹2,750 – ₹3,000/sq.ft.',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #5b21b6)',
      img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format',
      eyebrow: 'Luxury Choice',
      popular: false,
      breakdown: [
        ['Cement', 'JK Cement / Super'],
        ['TMT Bars', 'SAIL / Jindal'],
        ['Plumbing', 'Ashirwad'],
        ['Sanitary', 'Grohe / Roca / Jaquar'],
        ['Flooring', 'Italian marble'],
        ['Paint', 'Asian Royale Shine'],
      ],
      cta: 'Get Quote →',
      fullSpecs: {
        cement: 'JK Cement / Super',
        tmt: 'SAIL / Jindal',
        chowkhat: 'Teak or Sal Wood',
        doors: 'Century Plyboard with Veneer / Duco Polish Finish',
        windows: 'UPVC – Veka',
        railing: 'SS Railing / Glass Railing',
        flooring: 'Italian Flooring in Drawing & Dining, Tiles in Rooms & Bathroom, Granite in Stairs, Kota Stone in Parking',
        wallFinish: 'Asian Royale Shine Paint with PVC Moulding / Wooden Panelling / Featured Wall as required',
        kitchen: 'Polished Italian Stone & Century Ply HDHMR Board with Acrylic Sheet incl. Blum / Hafele Accessories (Designer TV Unit with Storage)',
        shoeCrockery: 'Designer Shoe Cabinet / Crockery Unit with BWR Plywood Shutters & Laminate Finish',
        falseCeiling: 'Wooden Ceiling / Gyproc / USG Boral / Glass / Metal Ceiling with LED Lighting',
        curtains: 'Included as per client selection',
        furniture: 'Puja Unit, Bar Unit – HDHMR Board with Laminate & Glass Shutters',
        sanitary: 'Grohe / Roca / Jaquar',
        electrical: 'Ashirwad',
        switches: 'Havells / Schneider',
        lights: 'LED Downlights & Panel Lights (Havells / Orient / Philips) as required'
      }
    }
  ]
};


function HomePage() {
  // Typewriter state
  const [typedWord, setTypedWord] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Slider states
  const [dreamSlide, setDreamSlide] = useState(0)
  const [whySlide, setWhySlide] = useState(0)
  const [projectSlide, setProjectSlide] = useState(0)
  const projectSlideCount = projects.items.length

  // ----- Hero Slider using services.cards -----
  const heroSlides = services.cards.map((card) => {
    const title = card.title || (card as any).name; // handle 'name' for Home Renovation
    let imageUrl = '';
    switch (title) {
      case 'Construction':
        imageUrl = '/images/vasundharaP.jpeg';
        break;
      case 'Interiors':
        imageUrl = '/images/interiors.jpg';
        break;
      case 'Elevations':
        imageUrl = '/images/VasundharaP3.png';
        break;
      case 'Terrace Garden':
        imageUrl = '/images/terraceGarden.jpeg';
        break;
      case 'Home Renovation':
        imageUrl = '/images/home-renovation.jpg';
        break;
      default:
        imageUrl = 'https://images.unsplash.com/photo-1774685110718-c5b4fe026144?w=800&auto=format';
    }
    return {
      ...card,
      title: title,
      imageUrl,
      buttonText: `Explore ${title}`,
      link: card.link,
      description: card.description,
    };
  });

  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const currentHeroSlide = heroSlides[heroSlideIndex];

  
  const goToHeroSlide = (index: number) => setHeroSlideIndex(index);

  // Auto-slide for hero slider
  const [autoSlidePaused, setAutoSlidePaused] = useState(false);
  const autoSlideIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoSlideTimer = useCallback(() => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
      autoSlideIntervalRef.current = null;
    }
    if (!autoSlidePaused) {
      autoSlideIntervalRef.current = setInterval(() => {
        setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
      }, 4000);
    }
  }, [autoSlidePaused, heroSlides.length]);

  useEffect(() => {
    resetAutoSlideTimer();
    return () => {
      if (autoSlideIntervalRef.current) clearInterval(autoSlideIntervalRef.current);
    };
  }, [resetAutoSlideTimer]);

  
  const handleManualDot = (idx: number) => {
    goToHeroSlide(idx);
    resetAutoSlideTimer();
  };
  



  // Typewriter effect
  useEffect(() => {
    const current = typedWords[wordIndex]
    if (!current) return

    const atWordEnd = typedWord === current
    const atWordStart = typedWord === ''

    const delay = !isDeleting && atWordEnd ? 2000 : isDeleting ? 55 : 90

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        if (atWordEnd) {
          setIsDeleting(true)
          return
        }
        setTypedWord(current.slice(0, typedWord.length + 1))
        return
      }

      if (!atWordStart) {
        setTypedWord(current.slice(0, typedWord.length - 1))
        return
      }

      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % typedWords.length)
    }, delay)

    return () => clearTimeout(timeout)
  }, [typedWord, isDeleting, wordIndex])



  // Auto-sliders
  useEffect(() => {
    const slider = setInterval(() => setDreamSlide((p) => (p + 1) % dreamSlides.length), 5000)
    return () => clearInterval(slider)
  }, [])

  useEffect(() => {
    const slider = setInterval(() => setWhySlide((p) => (p + 1) % whySlides.length), 3600)
    return () => clearInterval(slider)
  }, [])

  useEffect(() => {
    const slider = setInterval(() => setProjectSlide((p) => (p + 1) % projectSlideCount), 3800)
    return () => clearInterval(slider)
  }, [projectSlideCount])

  

  const [transitioning, setTransitioning] = useState(true)

  

  // Pause state for auto-slide

 

  

  // Re-enable transition after silent jump
  useEffect(() => {
    if (!transitioning) {
      const t = setTimeout(() => setTransitioning(true), 30)
      return () => clearTimeout(t)
    }
  }, [transitioning])

  
  

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  return (
    <>
      {/* Global styles for reveal and typewriter caret (minimal) */}
      <style>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .reveal-on-scroll.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typewriter-caret {
          animation: blink 1s step-end infinite;
        }
          @keyframes fadeIn {
  from { opacity: 0; transform: scale(1.02); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}
      `}</style>

      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        {/* Navbar content would go here */}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden" id="home">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 reveal-on-scroll">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">{hero.eyebrow}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900">
                {hero.titleLineOne}<br />
                {hero.titleLineTwo}<br />
                <span className="inline-flex items-center gap-1">
                  <em className="text-blue-500 not-italic">{typedWord || '\u00A0'}</em>
                  <span className="w-0.5 h-8 bg-blue-500 typewriter-caret" />
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">{hero.subtitle}</p>
              <div className="flex flex-wrap gap-2">
                {hero.pills.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#3b82f6" />
                      <path d="m7.5 12.5 3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {p}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/cost-estimator" className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition">
                  {hero.primaryCtaLabel}
                </Link>
                <Link to="/projects" className="border-2 border-blue-400 text-blue-500 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition">
                  {hero.secondaryCtaLabel}
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {hero.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <strong className="text-3xl font-black text-blue-500 block">{stat.value}</strong>
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="relative reveal-on-scroll"
              style={{ transitionDelay: '0.2s' }}
              onMouseEnter={() => setAutoSlidePaused(true)}
              onMouseLeave={() => setAutoSlidePaused(false)}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl relative">
                <img
                  key={heroSlideIndex}
                  src={currentHeroSlide.imageUrl}
                  alt={currentHeroSlide.title}
                  className="w-full sm:h-[500px] h-[450px] object-cover animate-fadeIn"
                />



                {/* Dot Indicators */}
                <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-2 z-100">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleManualDot(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === heroSlideIndex ? 'bg-blue-600 w-6' : 'bg-gray-400 hover:bg-gray-500'
                        }`}
                    />
                  ))}
                </div>

                {/* Bottom Overlay */}
                <div className="absolute bottom-5 left-6 right-6  rounded-xl p-2 shadow-lg  z-20">
                  <div className="flex flex-col items-center w-auto justify-center gap-2">
                    <Link to={currentHeroSlide.link} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                      {currentHeroSlide.buttonText}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                    <p className="text-black bg-white p-2 rounded-xl text-sm md:text-base inline w-auto font-medium">{currentHeroSlide.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <div className="bg-blue-500 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center  gap-4 text-white text-sm font-bold">
          <div className="flex items-center gap-2"><span></span> 12+ Years Experience</div>
          <div className="flex items-center gap-2"><span></span> 500+ Quality Checks</div>
          <div className="flex items-center gap-2"><span></span> Protected</div>
          <div className="flex items-center gap-2"><span></span> On-Time Delivery</div>
          <div className="flex items-center gap-2"><span></span> 299+ Happy clients</div>
        </div>
      </div>

      {/* Why Feature Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-500">Why Vasundhara</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Peace of mind, trust &amp; <span className="text-blue-500">transparent construction</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            {[
              { title: 'Safe Money Transaction', desc: 'No advance. Contractor paid only once work is complete.' },
              { title: 'Absolute Transparency', desc: 'Clear detailed quotation and online project tracking.' },
              { title: 'Assured Quality Control', desc: '500+ quality checks performed by our expert team.' },
              { title: 'Zero Delays', desc: 'Zero tolerance for delays. On-time delivery guaranteed.' },
            ].map((it) => (
              <div key={it.title} className="border border-gray-200 rounded-2xl p-6 hover:border-blue-600 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">✓</div>
                <h3 className="font-bold text-gray-900 mb-2">{it.title}</h3>
                <p className="text-gray-600 text-sm">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Recognition */}
      <section className="py-20 bg-gray-50" id="trust">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-500">Trust & Recognition</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Why Thousands Choose <span className="text-blue-500">Vasundhara</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">Our track record speaks for itself — quality, transparency, and trust at every step.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            {trustStats.map((ts) => (
              <div key={ts.label} className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4 hover:border-blue-600 hover:shadow-md transition">
                <div className="text-4xl">{ts.icon}</div>
                <div>
                  <div className="text-3xl font-black text-blue-500">{ts.value}</div>
                  <div className="font-bold text-gray-900 mt-1">{ts.label}</div>
                  <div className="text-sm text-gray-500">{ts.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dream Home */}
      <section className="py-20 bg-white" id="dream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-on-scroll">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Construct Your <span className="text-blue-500">Dream Home</span></h2>
              <p className="text-gray-600 mt-2 mb-4">with <strong className="text-blue-500">Vasundhara Construction</strong></p>
              <div className="space-y-2 mb-6">
                {['299+ Happy clients', '10+ Cities Served', 'On-Time Delivery'].map(d => (
                  <div key={d} className="flex items-center gap-2 text-gray-800 font-semibold">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    {d}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Meta Verified', 'Award Winning', 'Trademark Registered', 'Trusted Builder'].map(b => (
                  <span key={b} className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-gray-200">{b}</span>
                ))}
              </div>
              <a
                href="tel:+919818866849"
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-blue-700 transition inline-block"
              >
                Book Free Consultation
              </a>
            </div>

            <div className="relative reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
                <div className="flex transition-transform duration-500 ease-out h-full" style={{ transform: `translateX(-${dreamSlide * 100}%)` }}>
                  {dreamSlides.map((sl, i) => (
                    <div key={i} className="min-w-full h-full relative">
                      <img src={sl.image} alt={sl.label} className="w-full h-full object-cover" />
                      <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full">{sl.label}</div>
                    </div>
                  ))}
                </div>
                <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition" onClick={() => setDreamSlide(p => (p - 1 + dreamSlides.length) % dreamSlides.length)}>‹</button>
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition" onClick={() => setDreamSlide(p => (p + 1) % dreamSlides.length)}>›</button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {dreamSlides.map((_, i) => (
                    <button key={i} className={`w-2 h-2 rounded-full transition ${i === dreamSlide ? 'bg-white w-4' : 'bg-white/50'}`} onClick={() => setDreamSlide(i)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50" id="services">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-500">{services.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
              {services.titleStart} <span className="text-blue-500">{services.titleHighlight}</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            {[
              { title: 'Construction', desc: 'Quality civil construction delivered on time and within budget.', tag: 'Civil', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=80', link: '/services/construction' },
              { title: 'Interiors', desc: 'Stylish, functional, and personalized interior designing.', tag: 'Design', img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&auto=format&fit=crop&q=80', link: '/services/interior-design' },
              { title: 'Elevations', desc: 'Transform the front facade to stand out with a premium look.', tag: 'Exterior', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=80', link: '/services/elevation-page' },
              { title: 'Terrace Garden', desc: 'Refresh your rooftop with lush and serene outdoor spaces.', tag: 'Outdoor', img: 'https://plus.unsplash.com/premium_photo-1714078254516-f7ff6ea91499?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHRlcnJhY2UlMjBnYXJkZW4lMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D', link: '/services/terrace-garden-page' },
              { title: 'Home Renovation', desc: 'Enhance your home’s comfort, design, and functionality with smart renovation solutions.', tag: 'Outdoor', img: '/images/home-renovation.jpg', link: '/services/home-renovation' },
            ].map((s) => (
              <Link to={s.link} key={s.title} className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block" style={{ aspectRatio: '3/4' }}>
                <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex flex-col justify-end p-5" style={{ background: 'linear-gradient(0deg, rgba(10,20,60,0.85) 0%, rgba(10,20,60,0.2) 60%, transparent 100%)' }}>
                  <span className="inline-block bg-blue-500/80 text-white text-[10px] font-black tracking-widest uppercase rounded-full px-3 py-1 mb-3 w-fit">{s.tag}</span>
                  <h3 className="text-xl font-black text-white mb-1 leading-tight">{s.title}</h3>
                  <p className="text-white/75 text-xs leading-relaxed mb-4">{s.desc}</p>
                  <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg transition-all duration-200 group-hover:bg-white group-hover:text-blue-500">→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Estimate Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white" id="estimate">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center reveal-on-scroll">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-blue-400">Cost Calculator</span>
              <h2 className="text-3xl md:text-4xl font-black mt-2">Estimate Your <span className="text-blue-500">Construction Cost</span> Instantly</h2>
              <p className="text-gray-300 mt-4 mb-6">Quickly calculate how much it will cost to build your home with Vasundhara's detailed, reliable estimation tool.</p>
              <Link to="/cost-estimator" className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-xl shadow-md hover:bg-gray-100 transition">Calculate Cost Instantly</Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
              <div className="absolute right-6 top-6 text-5xl text-blue-500/10 font-black animate-pulse">₹</div>
              <div className="bg-white/10 rounded-xl p-4 text-right text-3xl font-mono text-blue-500 mb-4">0</div>
              <div className="grid grid-cols-4 gap-2">
                {['M+', 'M-', '%', 'AC', '7', '8', '9', '+', '4', '5', '6', '−', '1', '2', '3', '='].map((k, i) => (
                  <div key={k + i} className={`bg-white/5 border border-white/10 rounded-lg py-2 text-center text-sm font-bold text-gray-300 hover:bg-blue-600/20 hover:border-blue-600 hover:text-white transition cursor-pointer ${['%', '+', '−', '=', 'AC'].includes(k) ? 'text-blue-500' : ''}`}>{k}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white" id="process">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-500">{process.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">{process.titleStart} <span className="text-blue-500">{process.titleHighlight}</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">{process.subtitle}</p>
          </div>
          <div className="flex justify-between items-start overflow-x-auto pb-4 mb-8 reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            {process.steps.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center min-w-[80px]">
                <div className="flex items-center w-full">
                  <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center text-blue-500 font-bold text-sm">{i + 1}</div>
                  {i < process.steps.length - 1 && <div className="flex-1 h-px bg-gradient-to-r from-blue-600 to-blue-200 ml-2" />}
                </div>
                <span className="text-xs font-semibold text-gray-500 mt-2 text-center">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
            {process.steps.map(step => (
              <div key={step.title} className="border border-gray-200 rounded-2xl p-5 hover:border-blue-600 hover:shadow-md transition">
                <div className="w-10 h-10 mb-3 text-blue-500">⚙️</div>
                <h3 className="font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-10 bg-gray-50" id="company">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-on-scroll">
              <span className="text-sm font-bold uppercase tracking-wider text-blue-500">{ceo.eyebrow}</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">{ceo.titleStart} <span className="text-blue-500">{ceo.titleHighlight}</span></h2>
              <p className="text-gray-900 font-bold mt-4">{ceo.name}</p>
              <p className="text-blue-500 text-sm font-semibold uppercase tracking-wide">{ceo.role}</p>
              <p className="text-gray-600 mt-2">{ceo.intro}</p>
              <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-700 mt-4">{ceo.message}</blockquote>
              <button className="mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-blue-700 transition">{ceo.buttonLabel}</button>
            </div>
            <div className="reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <img src="/images/Anoj.jpeg" alt={ceo.name} className="w-100 h-100 sm:w-150 sm:h-200 object-cover rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white" id="projects">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-500">{projects.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">{projects.titleStart} <span className="text-blue-500">{projects.titleHighlight}</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">{projects.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            {projects.items.map((project, idx) => {
              const activeImageIndex = (projectSlide + idx) % project.images.length
              return (
                <div key={project.title} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    {project.images.map((img, imgIdx) => (
                      <img key={imgIdx} src={img} alt={`${project.title} ${imgIdx + 1}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imgIdx === activeImageIndex ? 'opacity-100' : 'opacity-0'}`} />
                    ))}
                    {/* <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">{project.tag}</div> */}
                    <div className="absolute bottom-3 left-3 flex gap-1.5 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                      {project.images.map((_, dotIdx) => (
                        <span key={dotIdx} className={`w-1.5 h-1.5 rounded-full ${dotIdx === activeImageIndex ? 'bg-white w-3' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    {/* <p className="text-gray-600 text-sm">{project.area} | {project.location}</p> */}
                    <p className="text-gray-500 text-sm mt-2">{project.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-10 reveal-on-scroll">
            <Link to="/projects" className="inline-block border-2 border-blue-600 text-blue-500 font-bold py-2 px-6 rounded-full hover:bg-blue-600 hover:text-white transition">View Projects Section</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us (with slider) */}
      <section className="py-20 bg-gray-50" id="why-us">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-500">Our Advantage</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">
              Why <span className="text-blue-500">Choose Vasundhara</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Image */}
            <div className="relative lg:sticky lg:top-24 lg:self-start reveal-on-scroll">
              <div className="relative aspect-[5/5] rounded-2xl overflow-hidden shadow-xl">
                {whySlides.map((slide, index) => (
                  <img
                    key={slide.image}
                    src={slide.image}
                    alt={slide.label}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === whySlide ? 'opacity-100' : 'opacity-0'
                      }`}
                  />
                ))}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold uppercase text-blue-500">Auto Showcase</span>
                    <strong className="block text-gray-900 text-sm">{whySlides[whySlide].label}</strong>
                  </div>
                  <div className="flex gap-1.5">
                    {whySlides.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${idx === whySlide ? 'bg-blue-600 w-4' : 'bg-gray-400'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-4 reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
              {whyPoints.map(pt => (
                <div
                  key={pt.title}
                  className="flex gap-4 p-4 border border-gray-200 rounded-2xl hover:border-blue-600 hover:shadow-md transition"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-500 text-xl">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{pt.title}</h3>
                    <p className="text-gray-600 text-sm">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

       <section className="py-16 bg-blue-50" id="packages">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-500">{packagesData.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">{packagesData.titleStart} <span className="text-blue-500">{packagesData.titleHighlight}</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">{packagesData.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            {packagesData.cards.map((pkg) => (
              <div
                key={pkg.name}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}
              >
                {/* Image top */}
                <div className="relative h-44 overflow-hidden">
                  <img src={pkg.img} alt={pkg.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4" style={{ background: `linear-gradient(0deg, ${pkg.color}cc 0%, transparent 55%)` }}>
                    {pkg.popular && <span className="bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1 w-fit shadow">⭐ Popular</span>}
                    {!pkg.popular && <span />}
                    <div>
                      <p className="text-white/75 text-[10px] font-bold uppercase tracking-widest mb-1">{pkg.eyebrow}</p>
                      <h3 className="text-xl font-black text-white drop-shadow">{pkg.name}</h3>
                    </div>
                  </div>
                </div>
                {/* Body */}
                <div className="bg-white p-5">
                  <div className="text-2xl font-black mb-1" style={{ color: pkg.color }}>{pkg.price}</div>
                  <div className="text-xs text-gray-500 mb-4">Effective rate: {pkg.rate}</div>
                  <div className="border-t border-gray-100 pt-3 space-y-2 mb-5">
                    {pkg.breakdown.map(([label, val]) => (
                      <div key={label} className="flex justify-between text-xs text-gray-500">
                        <span>{label}</span><span className="font-bold text-gray-800">{val}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={`/packages/${pkg.name.toLowerCase().replace(/ /g, '-')}`} className="block text-center py-2 rounded-lg text-white font-bold text-sm transition hover:opacity-90" style={{ background: pkg.color }}>
                    {pkg.cta || 'Get Quote →'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal-on-scroll">
            <Link to="/packages" className="inline-flex items-center gap-2 text-blue-500 font-bold border-2 border-blue-200 px-6 py-2.5 rounded-full hover:bg-blue-500 hover:text-white hover:border-blue-500 transition text-sm">
              View Full Package Details →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials/>

      {/* FAQ Section */}
      <section className="py-20 bg-white" id="faq">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-500">Have Questions?</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Frequently Asked <span className="text-blue-500">Questions</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Everything you need to know about building your dream home with Vasundhara.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
            {/* Left side – image */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Construction blueprint and tools"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Right side – FAQ accordion */}
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="flex justify-between items-center w-full text-left focus:outline-none"
                  >
                    <span className="text-lg font-semibold text-gray-900">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-blue-500 transform transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : ''
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`mt-3 text-gray-600 overflow-hidden transition-all duration-300 ${openFaqIndex === idx ? 'max-h-96' : 'max-h-0'
                      }`}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage