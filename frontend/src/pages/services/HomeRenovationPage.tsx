import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// WhatsApp helper
const WA = (msg: string = "Hi! I'm interested in home renovation services.") =>
  `https://wa.me/919818866849?text=${encodeURIComponent(msg)}`;

// Renovation Services Data
const RENOVATION_SERVICES = [
  {
    id: "full-home",
    label: "Full Home Renovation",
    icon: "",
    tagline: "Complete transformation",
    desc: "From outdated to outstanding. We completely transform your home with structural changes, modern finishes, and smart space planning. Perfect for older homes needing a fresh lease on life.",
    features: [
      "Complete demolition & reconstruction",
      "Layout reconfiguration",
      "Modern electrical & plumbing upgrades",
      "Premium finishes throughout",
      "Smart home integration"
    ],
    image: "/images/home-renovation.jpg",
    duration: "4-6 weeks",
    color: "#3b82f6"
  },
  {
    id: "kitchen-renovation",
    label: "Kitchen Renovation",
    icon: "",
    tagline: "Heart of the home reborn",
    desc: "Transform your kitchen into a modern culinary haven. We handle everything from modular cabinetry to premium appliances, creating a space that's both beautiful and functional.",
    features: [
      "Modular kitchen design",
      "Premium quartz/granite countertops",
      "Soft-close mechanisms",
      "Under-cabinet lighting",
      "Energy-efficient appliances"
    ],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
    duration: "2-3 weeks",
    color: "#3b82f6"
  },
  {
    id: "bathroom-renovation",
    label: "Bathroom Renovation",
    icon: "",
    tagline: "Spa-like retreat",
    desc: "Upgrade your bathroom to a luxurious spa experience. Modern fixtures, premium tiles, and smart storage solutions that maximize space and comfort.",
    features: [
      "Complete waterproofing",
      "Designer tiles & fixtures",
      "Frameless glass partitions",
      "Vanity with storage",
      "Rain shower systems"
    ],
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80",
    duration: "1-2 weeks",
    color: "#3b82f6"
  },
  {
    id: "living-room",
    label: "Living Room Makeover",
    icon: "",
    tagline: "Style & comfort combined",
    desc: "Breathe new life into your living space with modern design elements, statement pieces, and smart lighting that creates the perfect ambiance for every occasion.",
    features: [
      "Feature walls & paneling",
      "Modern false ceiling",
      "Designer lighting",
      "Custom furniture",
      "Smart storage solutions"
    ],
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80",
    duration: "2-3 weeks",
    color: "#3b82f6"
  },
  {
    id: "bedroom-renovation",
    label: "Bedroom Renovation",
    icon: "",
    tagline: "Your personal sanctuary",
    desc: "Create a peaceful retreat with customized wardrobes, cozy lighting, and luxurious finishes. Every element designed for comfort and relaxation.",
    features: [
      "Custom wardrobes",
      "Upholstered headboards",
      "Soft lighting design",
      "Flooring upgrades",
      "Walk-in closet options"
    ],
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80",
    duration: "2 weeks",
    color: "#3b82f6"
  },
  {
    id: "exterior-facade",
    label: "Exterior Facade",
    icon: "",
    tagline: "Curb appeal redefined",
    desc: "Transform your home's exterior with modern facade design, durable finishes, and architectural elements that make a lasting impression.",
    features: [
      "Modern cladding systems",
      "Architectural lighting",
      "Landscape integration",
      "Durable weatherproofing",
      "Custom entrance design"
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
    duration: "3-4 weeks",
    color: "#3b82f6"
  }
];

// Renovation Process
const RENOVATION_PROCESS = [
  { step: "01", title: "Initial Consultation", desc: "We understand your vision, assess the space, and discuss budget and timeline.", icon: "", duration: "1-2 days" },
  { step: "02", title: "Site Survey & Planning", desc: "Detailed measurements, structural assessment, and renovation planning.", icon: "", duration: "2-3 days" },
  { step: "03", title: "Design & Material Selection", desc: "3D visualizations, material samples, and final design approval.", icon: "", duration: "1-2 weeks" },
  { step: "04", title: "Demolition & Preparation", desc: "Safe removal of old elements and preparation for new construction.", icon: "", duration: "3-5 days" },
  { step: "05", title: "Execution & Installation", desc: "Skilled craftsmen bring your vision to life with precision.", icon: "", duration: "2-4 weeks" },
  { step: "06", title: "Finishing & Handover", desc: "Final touches, quality inspection, and project completion.", icon: "", duration: "3-5 days" }
];

// Stats
const STATS = [
  { value: "70+", label: "Homes Renovated", icon: "", detail: "Satisfied clients" },
  { value: "95%", label: "On-Time Delivery", icon: "⏱", detail: "Projects completed as scheduled" },
  { value: "4.9★", label: "Client Rating", icon: "", detail: "Based on reviews" },
  { value: "12+", label: "Years Experience", icon: "", detail: "In renovation expertise" }
];

// Testimonials
const TESTIMONIALS = [
  {
    quote: "Vasundhara transformed our 30-year-old home into a modern masterpiece. The team was professional, punctual, and the quality exceeded our expectations. Best decision we ever made!",
    author: "Meera & Rajesh Sharma",
    location: "South Delhi",
    initials: "MS",
    tag: "Full Home Renovation",
    rating: 5
  },
  {
    quote: "Our kitchen renovation was completed in just 18 days! The modular design is stunning, and we love cooking in our new space. Highly recommend their services.",
    author: "Priya Khanna",
    location: "Noida",
    initials: "PK",
    tag: "Kitchen Renovation",
    rating: 5
  },
  {
    quote: "The team was transparent about costs and delivered exactly what was promised. Our bathrooms look like luxury hotel spas. Worth every rupee!",
    author: "Vikram Singh",
    location: "Gurgaon",
    initials: "VS",
    tag: "Bathroom Renovation",
    rating: 5
  }
];

// Before & After Data
const BEFORE_AFTER = [
  {
    before: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    after: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    title: "Living Room Transformation",
    description: "Dark, cramped space → Bright, open concept"
  },
  {
    before: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
    after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    title: "Kitchen Modernization",
    description: "Outdated kitchen → Contemporary modular design"
  },
  {
    before: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    after: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    title: "Bathroom Upgrade",
    description: "Basic bathroom → Luxury spa experience"
  }
];

// Why Choose Us
const WHY_CHOOSE = [
  { icon: "", title: "In-House Experts", desc: "No middlemen - our own team of craftsmen and designers" },
  { icon: "", title: "Fixed-Price Contracts", desc: "No hidden costs. Your price is locked before work starts" },
  { icon: "", title: "Timely Completion", desc: "Strict adherence to project timelines with daily updates" },
  { icon: "", title: "Quality Guarantee", desc: "1-year warranty on all renovation work" },
  { icon: "", title: "Real-Time Tracking", desc: "Mobile app to track progress and payments" },
  { icon: "", title: "Post-Renovation Support", desc: "Dedicated support for any post-completion issues" }
];

// Scroll Reveal Hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    
    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function HomeRenovationPage() {
  const [activeService, setActiveService] = useState(0);
  const [activeTesti, setActiveTesti] = useState(0);
  const [selectedBeforeAfter, setSelectedBeforeAfter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    area: '',
    timeline: '',
    budget: '',
    message: ''
  });
  
  useScrollReveal();
  
  const svc = RENOVATION_SERVICES[activeService];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTesti(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! I'm interested in renovation services.
Name: ${formData.name}
Service: ${formData.service}
Area: ${formData.area}
Timeline: ${formData.timeline}
Budget: ${formData.budget}
Message: ${formData.message}`;
    window.open(WA(message), '_blank');
  };
  
  return (
    <main className="bg-white text-gray-800 overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }
        
        .animate-scale {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        
        .reveal-on-scroll.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .bg-gradient-primary {
          background: linear-gradient(135deg, #2563eb, #1e40af);
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1800&q=85"
            alt="Home renovation background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-blue-400 text-sm font-semibold">Expert Renovation Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your Home,
              <span className="gradient-text"> One Space at a Time</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Breathe new life into your home with our professional renovation services. 
              From complete makeovers to targeted upgrades, we deliver quality craftsmanship and stunning results.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={WA()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                Get Free Quote
              </a>
              <a 
                href="#services" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold transition-all inline-flex items-center gap-2"
              >
                Explore Services ↓
              </a>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                  <div className="text-xs text-gray-400 mt-1">{stat.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              Comprehensive <span className="gradient-text">Renovation Solutions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you need a full home transformation or targeted upgrades, 
              we have the expertise to bring your vision to life.
            </p>
          </div>
          
          {/* Service Tabs - Desktop */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12 reveal-on-scroll">
            {RENOVATION_SERVICES.map((service, idx) => (
              <button
                key={service.id}
                onClick={() => setActiveService(idx)}
                className={`text-left p-6 rounded-2xl transition-all hover-lift ${
                  activeService === idx 
                    ? 'bg-white shadow-xl ring-2 ring-blue-500' 
                    : 'bg-white shadow-md hover:shadow-lg'
                }`}
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.label}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.tagline}</p>
                <div className="flex justify-between items-center">
               
                  <span className="text-gray-500 text-sm">{service.duration}</span>
                </div>
              </button>
            ))}
          </div>
          
          {/* Service Details */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden reveal-on-scroll">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-80 lg:h-auto">
                <img 
                  src={svc.image} 
                  alt={svc.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="text-5xl mb-4">{svc.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{svc.label}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{svc.desc}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-semibold text-gray-900">{svc.duration}</div>
                  </div>
                  <div>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {svc.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                        <span className="text-blue-500">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a 
                  href={WA(`Hi! I'm interested in ${svc.label} renovation. Please share more details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Get Quote for {svc.label} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Before & After Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Transformations</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
               <span className="gradient-text">Renovations</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See the dramatic difference our renovation expertise can make
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {BEFORE_AFTER.map((item, idx) => (
              <div 
                key={idx}
                className="group cursor-pointer reveal-on-scroll"
                onClick={() => {
                  setSelectedBeforeAfter(idx);
                  setIsModalOpen(true);
                }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={item.before} 
                    alt={`${item.title} before`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      {/* <div className="text-white text-sm font-semibold">BEFORE</div> */}
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={item.after} 
                    alt={`${item.title} after`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      {/* <div className="text-white text-sm font-semibold">AFTER</div> */}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mt-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-blue-200 text-sm font-semibold uppercase tracking-wider">How We Work</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Simple <span className="text-blue-200">Renovation Process</span>
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              A streamlined approach that ensures quality, transparency, and timely delivery
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RENOVATION_PROCESS.map((step, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 reveal-on-scroll hover-lift">
                <div className="text-5xl font-bold text-blue-300 mb-4">{step.step}</div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-blue-100 text-sm mb-3">{step.desc}</p>
                <div className="text-xs text-blue-200">⏱️ {step.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              The <span className="gradient-text">Vasundhara Advantage</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What sets us apart in the renovation industry
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md reveal-on-scroll hover-lift">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      
      
      
      {/* CTA Banner */}
      <section className="py-16 bg-gradient-primar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Ready to Start Your Renovation Journey?
            </h2>
            <p className="text-blue-500 mb-8 max-w-2xl mx-auto">
              Let's discuss your vision and create a space you'll love for years to come
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href={WA()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 text-white  px-8 py-4 rounded-full font-semibold transition inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                WhatsApp Now
              </a>
              <Link 
                to="/contacts" 
                className="border-2 border-black text-black h hover:text-blue-600 px-8 py-4 rounded-full font-semibold transition"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modal for Before/After */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="grid md:grid-cols-2 gap-0">
              <div>
                <div className="bg-gray-900 text-white p-3 text-center">BEFORE</div>
                <img 
                  src={BEFORE_AFTER[selectedBeforeAfter].before} 
                  alt="Before"
                  className="w-full h-auto"
                />
              </div>
              <div>
                <div className="bg-blue-600 text-white p-3 text-center">AFTER</div>
                <img 
                  src={BEFORE_AFTER[selectedBeforeAfter].after} 
                  alt="After"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">{BEFORE_AFTER[selectedBeforeAfter].title}</h3>
              <p className="text-gray-600">{BEFORE_AFTER[selectedBeforeAfter].description}</p>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}