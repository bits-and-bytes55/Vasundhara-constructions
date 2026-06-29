import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import {
  HardHat,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Building2,
  Droplet,
  Zap,
  CreditCard,
  FileText,
  Clock,
  Shield,
  Hammer,
  Wrench,
  LayoutDashboard,
  Sparkles,
  Droplets,
  
} from 'lucide-react';

const packageImages = {
  BasicLow: "/images/VasundharaP3.png",
  BasicHigh: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
  Standard: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&h=300&fit=crop",
  Premium: "/images/hero1.png"
};

const PackageDetailPage = () => {
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
      name: 'Basic – Low',
      price: 1550,
      color: 'blue',
      badge: 'Budget Friendly',
      image: packageImages.BasicLow,
      materials: {
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
      },
      features: ['Budget-friendly option', 'Somany vitrified tiles', 'Sunmica finish kitchen']
    },
    {
      name: 'Basic – High',
      price: 1750,
      color: 'sky',
      badge: 'Value Plus',
      image: packageImages.BasicHigh,
      materials: {
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
      },
      features: ['Kajaria tiles', 'MS railing', 'Gypsum cove ceiling']
    },
    {
      name: 'Standard',
      price: 2150,
      color: 'amber',
      badge: 'Most Popular',
      image: packageImages.Standard,
      materials: {
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
      },
      features: ['Wooden flooring in Drawing & Bedroom', 'Italian marble kitchen slab', 'UPVC windows']
    },
    {
      name: 'Premium',
      price: 2550,
      color: 'indigo',
      badge: 'Luxury Choice',
      image: packageImages.Premium,
      materials: {
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
      },
      features: ['Italian marble flooring', 'Duco polish doors', 'Grohe / Roca sanitary ware']
    }
  ];

  const extraItems = [
    { item: 'DPC at Plinth Level', rate: 'As per slab area', unit: 'sq. ft.' },
    { item: 'Waterproofing', rate: '₹40', unit: 'per sq. ft.' },
    { item: 'Architectural & Structural Drawing', rate: '₹60', unit: 'per sq. ft.' },
    { item: 'Set Back Area Development', rate: '₹600', unit: 'per sq. ft.' },
    { item: 'Underground Water Tank', rate: '₹35', unit: 'per Litre' },
    { item: 'Overhead Tank', rate: '₹25', unit: 'per Litre' },
    { item: 'Anti-Termite Treatment', rate: '₹10', unit: 'per sq. ft.' },
    { item: 'Brick Coba & Parapet Wall', rate: '₹600', unit: 'per sq. ft.' }
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

  const materialKeys = [
    { key: 'cement', label: 'Cement' },
    { key: 'tmt', label: 'TMT Bars' },
    { key: 'chowkhat', label: 'Door Chowkhat' },
    { key: 'doors', label: 'Doors' },
    { key: 'windows', label: 'Windows' },
    { key: 'railing', label: 'Railing' },
    { key: 'flooring', label: 'Flooring' },
    { key: 'wallFinish', label: 'Wall Finish' },
    { key: 'kitchen', label: 'Kitchen / Wardrobe / TV Unit' },
    { key: 'shoeCrockery', label: 'Shoe Cabinet & Crockery Unit' },
    { key: 'falseCeiling', label: 'False Ceiling' },
    { key: 'curtains', label: 'Curtains / Blinds' },
    { key: 'furniture', label: 'Furniture' },
    { key: 'sanitary', label: 'Sanitary Fixtures' },
    { key: 'electrical', label: 'Electrical Conduit' },
    { key: 'switches', label: 'Switch Board & Wiring' },
    { key: 'lights', label: 'Lights' },
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

      {/* Quick Info Bar */}
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

        {/* WHAT WE BUILD & OUR SERVICES */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Building2 className="w-6 h-6" /> What We Build
            </h2>
            <ul className="space-y-3">
              {['Residential Building', 'Commercial Building', 'Industrial Building', 'Institutional Building'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Wrench className="w-6 h-6" /> Our Services
            </h2>
            <ul className="space-y-3">
              {[
                'New Building Designing & Construction',
                'Building Renovation',
                'Interior Designing & Construction 2D, 3D',
                'Building Estimation & Costing'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* WHY CHOOSE US */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg mb-16"
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6" /> Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Competitive & Negotiable Pricing',
              'Branded Materials Only',
              'Dedicated Site Engineer',
              'Weekly Progress Updates',
              'Quality Checks at Every Stage',
              'Workmanship Warranty'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* WARRANTY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Warranty
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Structure Warranty', value: '10 Years' },
                { label: 'Waterproofing Warranty', value: '5 Years' },
                { label: 'Service Support', value: '1 Year After Handover' },
                { label: 'Sanitary & Electrical Fixtures', value: '2–5 Years (as per Brand)' },
              ].map((w, i) => (
                <div key={i} className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                  <p className="text-green-700 font-bold text-2xl">{w.value}</p>
                  <p className="text-gray-600 text-sm mt-1">{w.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* PACKAGES GRID */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-t-blue-600 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={pkg.image}
                  alt={`${pkg.name} Package`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className={`absolute top-3 right-3  text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                  {pkg.badge}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-blue-600">₹{pkg.price.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm">/sq. ft.</span>
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

        {/* MATERIAL SPECIFICATIONS TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-[160px]">Component</th>
                    {packages.map(pkg => (
                      <th key={pkg.name} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-[200px]">
                        {pkg.name}<br />
                        <span className="text-blue-600 font-bold">@ ₹{pkg.price.toLocaleString()}/sq.ft.</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* CIVIL (STRUCTURE) WORK - grouping header */}
                  <tr className="bg-gray-100">
                    <td colSpan={5} className="px-4 py-2 text-sm font-bold text-gray-800">CIVIL (STRUCTURE) WORK</td>
                  </tr>
                  {materialKeys.slice(0, 7).map(({ key, label }) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{label}</td>
                      {packages.map(pkg => (
                        <td key={pkg.name} className="px-4 py-3 text-sm text-gray-600">
                          {(pkg.materials as any)[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* INTERIOR WORK - grouping header */}
                  <tr className="bg-gray-100">
                    <td colSpan={5} className="px-4 py-2 text-sm font-bold text-gray-800">INTERIOR WORK</td>
                  </tr>
                  {materialKeys.slice(7, 13).map(({ key, label }) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{label}</td>
                      {packages.map(pkg => (
                        <td key={pkg.name} className="px-4 py-3 text-sm text-gray-600">
                          {(pkg.materials as any)[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* PLUMBING & ELECTRICAL WORK - grouping header */}
                  <tr className="bg-gray-100">
                    <td colSpan={5} className="px-4 py-2 text-sm font-bold text-gray-800">PLUMBING & ELECTRICAL WORK</td>
                  </tr>
                  {materialKeys.slice(13).map(({ key, label }) => (
                    <tr key={key} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{label}</td>
                      {packages.map(pkg => (
                        <td key={pkg.name} className="px-4 py-3 text-sm text-gray-600">
                          {(pkg.materials as any)[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* EXTRA ITEMS & PAYMENT MILESTONES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Extra Items */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
                      {item.rate} <span className="text-sm text-gray-500">{item.unit}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Parking / Pathways, Septic Tank, Soakpit, Water Tank etc. are not included in above rates.
                  Open area external development (parking/pathways) measured at open area rate. Nails & binding wire provided by contractor.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Stages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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

        {/* SCOPE OF WORK - with sub-headings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Scope of Work
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Structure Work */}
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Hammer className="w-5 h-5" /> Structure Work
              </h3>
              <ul className="space-y-2 text-gray-700">
                {[
                  'Excavation for foundations, columns, footings, septic tank, water tank including dressing and disposal',
                  'Anti-termite treatment with approved chemical emulsion to foundation, plinth filling, and under-floor area',
                  'Backfilling & compaction of available earth in plinth and foundation areas (outside soil extra)',
                  'PCC in foundations, flooring base, and other locations as per drawings',
                  'Reinforcement steel – cutting, bending, binding, placing and fixing as per structural drawings',
                  'Shuttering & centering using approved shuttering plywood',
                  'RCC M25 grade concrete in footings, columns, plinth beams, slabs, lintels, staircases, etc.',
                  '4.5" & 9" thick brick masonry in cement mortar as per drawings',
                  'DPC at plinth level as per specifications',
                  'Internal 12mm & external 15mm cement plaster including curing and finishing',
                  'Waterproofing treatment for toilets, bathrooms, kitchen, terrace and other areas',
                  'Floor tiles/stone flooring including skirting wherever specified',
                  'Door & window frame, shutter fixing with hardware',
                  'Two coat wall putty, primer, and paint for internal and external surfaces'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interior Work */}
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5" /> Interior Work
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Modular Kitchen:</strong> 18–20 mm polished kitchen counter slab (Granite/Italian as per package) with edge moulding, sink cut-out; BWP/BWR plywood/HDHMR board cabinets with laminate/acrylic finish, PVC edge banding, SS hardware, handles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Modular Furniture:</strong> Wardrobe, TV Unit, Crockery Unit, Bar Unit, Shoe Rack – BWP/BWR plywood/HDHMR board with laminate finish, shelves, drawers, shutters, hardware (as per package).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>False Ceiling:</strong> POP with GI framework, chicken mesh, mouldings; or gypsum cove / wooden / Gyproc / USG Boral / glass / metal ceiling with LED lighting as per package.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Wall Finish / Designing:</strong> Decorative finishes – wall murals, wallpaper, PVC mouldings, wall panelling, 3D texture paint as per package.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Furniture (Premium only):</strong> Bed, Sofa, Curtains as per approved selection.</span>
                </li>
              </ul>
            </div>

            {/* Electrical Work */}
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Electrical Work
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span>Complete concealed electrical work including conduits, FRLS copper wiring, modular accessories, DB, MCB, RCCB, earthing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span>All light/fan/power points as per approved drawings, testing and commissioning complete.</span>
                </li>
              </ul>
            </div>

            {/* Plumbing Work */}
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5" /> Plumbing Work
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span>P&F of sanitary fixtures – WC, wash basin, urinal, kitchen sink, CP fittings, health faucet, bottle trap, angle valves, floor drain, mirror, towel rail and all accessories.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span>Complete as per approved drawings and specifications.</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800"><strong>Final Finishing & Handover:</strong> Cleaning, finishing, rectification of defects, and handing over the completed building.</p>
            </div>
          </div>
        </motion.div>

        {/* TERMS & CONDITIONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg mb-16"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6" /> Terms & Conditions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Contractor arranges all building materials',
              'Client provides water & electricity free of cost',
              'Work executed as per architectural drawings',
              'GST @ 18% extra, paid by owner',
              '4 days advance notice for material/drawing requirements',
              'Delay in payment extends timeline with additional cost',
              'Soil brought from outside for plinth filling charged extra',
              'Nails and binding wire provided by contractor',
              'Parking / Pathways, Septic Tank, Soakpit, Water Tank not included in above rates'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-3 shadow-sm">
                <div className="w-4 h-4 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg shadow-inner">
            <p className="text-center text-gray-600 text-sm">
              <strong>Bank Details:</strong> State Bank of India | Vasundhara Construction | A/C: 44404823521 | IFSC: SBIN0005222
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
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
            © 2026 Vasundhara Construction & Interior – Engineer & Developer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PackageDetailPage;