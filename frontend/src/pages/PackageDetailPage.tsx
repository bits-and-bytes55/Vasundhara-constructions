import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { 
  Home, 
  HardHat, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Building2,
  Droplet,
  Zap,
  Paintbrush,
  DoorOpen,
  Bath,
  CreditCard,
  FileText,
  TrendingUp,
  Award,
  Clock,
  Shield
} from 'lucide-react';



// Alternative: If you want to use placeholder images or external URLs
const packageImages = {
  Basic: "/images/VasundharaP3.png",
  Standard: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
  Premium: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&h=300&fit=crop",
  Luxury: "/images/hero1.png"
};

const PackageDetailPage: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const packages = [
    {
      name: 'Basic',
      price: 1950,
      color: 'blue',
      badge: 'Value Plus',
      image: packageImages.Basic,
      materials: {
        cement: 'Shree',
        tmt: 'Rathi',
        brick: 'Premium quality',
        plumbing: 'Prince',
        sanitary: 'Hind ware',
        electrical: 'Anchor / Kaliga',
        switches: 'Anchor',
        pop: 'Gypsum',
        chowkhat: 'Marandi/Kapoor',
        doors: 'Plywood doors with Laminate both sides',
        windows: 'Wooden',
        flooring: 'Tile Vitrified + Granite Stairs + Kota Stone Parking',
        paint: 'Premium Emulsion',
        interiors: 'Kitchen, Wardrobe, TV unit, Vanity in Laminate Finish'
      },
      features: ['Cost-efficient', 'Reliable materials', 'Essential finishing']
    },
    {
      name: 'Standard',
      price: 2300,
      color: 'sky',
      badge: 'Most Popular',
      image: packageImages.Standard,
      materials: {
        cement: 'Shree / JK Super',
        tmt: 'Kamdhenu / Rathi',
        brick: '1st Number Brick',
        plumbing: 'Supreme',
        sanitary: 'Parryware',
        electrical: 'Polycab / GreatWhite',
        switches: 'Polycab / GreatWhite',
        pop: 'POP with Sakarni',
        chowkhat: 'Teak or Sal',
        doors: 'Century Plyboard with Laminate both sides',
        windows: 'Wooden',
        flooring: 'Tile + Wooden Flooring in MBR, Granite Stairs, Kota Stone',
        paint: 'Premium Emulsion',
        interiors: 'Kitchen in Acrylic Finish, Wardrobe and TV Unit, Vanity in Laminate Finish'
      },
      features: ['Enhanced materials', 'Wooden flooring in MBR', 'Premium plyboard']
    },
    {
      name: 'Premium',
      price: 2750,
      color: 'amber',
      badge: 'Luxury Choice',
      image: packageImages.Premium,
      materials: {
        cement: 'Ultratech / JK Super',
        tmt: 'SAIL',
        brick: '1st Number Brick',
        plumbing: 'Ashirwad',
        sanitary: 'Jaquar / Roca',
        electrical: 'Ashirwad',
        switches: 'Havells',
        pop: 'POP with Sakarni',
        chowkhat: 'Teak or Sal',
        doors: 'Century Plyboard with Veneer & Polish',
        windows: 'UPVC / Wooden',
        flooring: 'Italian Flooring in Drawing & Dining, Tiles in Rooms & Bathroom, Granite Stairs',
        paint: 'Royal Shine',
        interiors: 'Kitchen in Acrylic Finish, Mandir in Duco Finish, Crockery unit in Glass Finish, Wardrobe, TV unit and Vanity in Laminate Finish'
      },
      features: ['Italian marble flooring', 'Designer interiors', 'Premium sanitary ware']
    },
    {
      name: 'Luxury',
      price: 3000,
      color: 'indigo',
      badge: 'Ultimate',
      image: packageImages.Luxury,
      materials: {
        cement: 'Ultratech',
        tmt: 'Tata',
        brick: '1st Number Brick',
        plumbing: 'Ashirwad',
        sanitary: 'Jaguar / Kohler',
        electrical: 'Ashirwad / Astral',
        switches: 'Havells',
        pop: 'POP with Sakarni',
        chowkhat: 'Sagwan',
        doors: 'Century Plyboard with Veneer & Polish',
        windows: 'UPVC',
        flooring: 'Italian Flooring with Tiles in Bathroom, Granite Stairs, Kota Stone',
        paint: 'Royal Shine',
        interiors: 'Kitchen in Acrylic Finish, Mandir in Duco Finish, Crockery unit in Glass Finish, Wardrobe in Glass/Wooden Finish with High Gloss Laminate'
      },
      features: ['Premium brand materials', 'Designer bathroom fittings', 'Superior craftsmanship']
    }
  ];

  const extraItems = [
    { item: 'DPC at plinth Level', rate: 'As per slab area', unit: 'sq. ft.' },
    { item: 'Waterproofing', rate: '₹40', unit: 'per sq. ft.' },
    { item: 'Architectural & Structural Drawing', rate: '₹60', unit: 'per sq. ft.' },
    { item: 'Set Back Area Development', rate: '₹600', unit: 'per sq. ft.' },
    { item: 'Underground water tank', rate: '₹35', unit: 'per Litre' },
    { item: 'Overhead Tank', rate: '₹25', unit: 'per Litre' },
    { item: 'Anti-termite treatment', rate: '₹10', unit: 'per sq. ft.' },
    { item: 'Brick Coba & parapet wall', rate: '₹600', unit: 'per sq. ft.' }
  ];

  const paymentStages = [
    { stage: 'Advance on quotation submission', percentage: 10 },
    { stage: 'Completion of earth work excavation', percentage: 10 },
    { stage: 'Completion of footing work', percentage: 10 },
    { stage: 'Completion of column and slabs', percentage: 20 },
    { stage: 'Completion of bricks masonry', percentage: 5 },
    { stage: 'Completion of internal plaster', percentage: 5 },
    { stage: 'Completion of external plaster', percentage: 5 },
    { stage: 'Completion of flooring work', percentage: 10 },
    { stage: 'Railing, door, window fitting & brick coba', percentage: 5 },
    { stage: 'Completion of plumbing & sanitary', percentage: 5 },
    { stage: 'Completion of electrical work', percentage: 5 },
    { stage: 'Completion of finishing work (putty, paint)', percentage: 5 },
    { stage: 'False ceiling & interior fit-out', percentage: 5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <HardHat className="w-16 h-16 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">VASUNDHARA CONSTRUCTION</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-2">Engineer & Developer</p>
            <p className="text-lg text-blue-200 mb-6">GST IN: 09ANWPK9076H1Z2</p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>+91 9818866849</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>info@vasundharaconstruction.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>G-9, Sector 63, Noida</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Project Info Bar */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Timeline:</span>
              <span>8 months (3 floor building)</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Location:</span>
              <span>Noida, Uttar Pradesh</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">GST:</span>
              <span>18% extra</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Packages Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-t-blue-600 hover:shadow-2xl transition-all duration-300"
            >
              {/* Package Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img 
                  src={pkg.image} 
                  alt={`${pkg.name} Package`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {pkg.name === 'Standard' && (
                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    Most Popular
                  </div>
                )}
                {pkg.name === 'Premium' && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    <Award className="w-3 h-3 inline mr-1" />
                    Best Value
                  </div>
                )}
                {pkg.name === 'Luxury' && (
                  <div className="absolute top-3 right-3 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    <Award className="w-3 h-3 inline mr-1" />
                    Ultimate
                  </div>
                )}
                {/* Overlay gradient for better text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{pkg.name}</h3>
                    <p className="text-gray-500 text-sm">{pkg.badge}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-black text-blue-600">₹{pkg.price}</span>
                  <span className="text-gray-500">/sq. ft.</span>
                </div>

                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contacts">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Get Quote
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Material Specifications Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Material Specifications by Package
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Component</th>
                    {packages.map(pkg => (
                      <th key={pkg.name} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        {pkg.name} (@ ₹{pkg.price})
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.keys(packages[0].materials).map((key) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 capitalize">
                        {key}
                      </td>
                      {packages.map(pkg => (
                        <td key={pkg.name} className="px-4 py-3 text-sm text-gray-600">
                          {pkg.materials[key as keyof typeof pkg.materials]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Extra Items & Payment Stages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Extra Items */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-blue-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Droplet className="w-5 h-5" />
                Extra Item Works
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {extraItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-700">{item.item}</span>
                    <span className="font-semibold text-blue-600">
                      {item.rate} <span className="text-sm text-gray-500">/{item.unit}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Extended ramp, trenches, drain & outside area measured at open area rate.
                  Nails & binding wire provided by contractor.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Stages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-blue-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Milestones
              </h3>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {paymentStages.map((stage, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">{stage.stage}</span>
                    <span className="font-bold text-blue-600">{stage.percentage}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Payments based on measurements verified by Architect. Delay in payment extends timeline with extra cost.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scope & Terms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Scope of Work
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span>PCC (1:4:8), RCC M20 Grade (1:1.5:3) in raft foundation, columns, retaining wall & roof</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span>4.5" & 9" thick brick masonry with earthen bricks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span>Internal & external plaster mix (1:4)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span>12mm shuttering plywood for all slab casting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                  <span>Reinforcement cutting, bending & binding as per drawings</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Terms & Conditions
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mt-1.5"></div>
                  <span>Contractor arranges all building materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mt-1.5"></div>
                  <span>Client provides water & electricity free of cost</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mt-1.5"></div>
                  <span>Work executed as per architectural drawings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mt-1.5"></div>
                  <span>GST @ 18% extra, paid by owner</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mt-1.5"></div>
                  <span>4 days advance notice for material/drawing requirements</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg shadow-inner">
            <p className="text-center text-gray-600 text-sm">
              <strong>Bank Details:</strong> State Bank of India | Vasundhara Construction | A/C: 44404823521 | IFSC: SBIN0005222
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link to="/contacts">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all transform hover:scale-105">
              Request a Site Visit & Free Consultation
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Vasundhara Construction & Interior - Engineer & Developer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PackageDetailPage;