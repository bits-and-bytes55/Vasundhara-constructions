import React, { useState, type FormEvent, type ChangeEvent, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';


const API_URL = import.meta.env.VITE_API_URL;

// Types
interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  projectScale: string;
  message: string;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// Page content data
const contactPageData = {
  hero: {
    kicker: 'VASUNDHARA CONSTRUCTIONS',
    title: 'Building Excellence Since 2005',
    subtitle: 'Your trusted partner for quality construction, timely delivery, and transparent execution.',
    visualLabel: 'Featured Project',
    visualTitle: 'Sukoon Heights',
    visualText: 'Luxury residential complex completed in record 18 months',
    visualImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    highlights: [
      { value: '70+', label: 'Projects', detail: 'Successfully Delivered' },
      { value: '12+', label: 'Years', detail: 'Industry Experience' },
      { value: '20+', label: 'Professionals', detail: 'Dedicated Team' },
    ],
  },
  guidelines: {
    label: 'Preparation Guide',
    sections: [
      {
        title: ' Site & Documentation',
        paragraphs: ['Essential documents to expedite your consultation:'],
        bullets: [
          'Property documents & sanctioned building plan',
          'Soil test report (if available)',
          'Site photographs & boundary measurements',
          'Any existing approvals or NOCs',
        ],
      },
      {
        title: ' Project Specifications',
        paragraphs: ['Define your construction requirements clearly:'],
        bullets: [
          'Total built-up area & number of floors',
          'Structural preference (framed / load-bearing)',
          'Expected timeline & budget range',
          'Material specifications (if any preferences)',
        ],
      },
      {
        title: ' Design & Finishes',
        paragraphs: ['Share your vision for the final outcome:'],
        bullets: [
          'Architectural style references',
          'Flooring, cladding & finishing preferences',
          'MEP requirements (plumbing, electrical, HVAC)',
          'Sustainability goals or certifications',
        ],
      },
    ],
  },
};

// ScrollReveal component for triggering animations on scroll
const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    service: '',
    projectScale: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);

      // Reset form on success
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        city: '',
        service: '',
        projectScale: '',
        message: '',
      });

      setSubmitted(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
      // Optionally show an error message to the user
      // setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="font-['Inter',system-ui] bg-white text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f8f6f2] to-[#f0ebe4] py-20 border-b border-[#e8e0d6] relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-[#2e7cc4]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-[#1e2a2e]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap gap-12 items-center justify-between">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              className="flex-1 min-w-[300px]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-[#2e7cc4]/10 text-[#2e7cc4] text-xs tracking-wider uppercase font-semibold px-3 py-1.5 rounded-full mb-6"
              >
                {contactPageData.hero.kicker}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-[#1e2a2e] mb-5 leading-tight"
              >
                {contactPageData.hero.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-[#5a6b6e] mb-8 max-w-xl"
              >
                {contactPageData.hero.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <motion.a
                  href="tel:+919818866849"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#2e7cc4] text-white px-7 py-3 rounded-full font-semibold transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  Call Now
                </motion.a>
                <motion.a
                  href="mailto:vasundhara.construction30@gmail.com"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#c0b7ae] hover:border-[#2e7cc4] hover:text-[#2e7cc4] text-[#2c3e2f] px-7 py-3 rounded-full font-semibold transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  Email Team
                </motion.a>
              </motion.div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-6"
              >
                {contactPageData.hero.highlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-[#e8e0d6] text-center"
                  >
                    <motion.strong
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
                      className="text-2xl md:text-3xl font-bold text-[#2e7cc4] block"
                    >
                      {item.value}
                    </motion.strong>
                    <span className="text-sm font-semibold text-[#2c3e2f] block mt-1">
                      {item.label}
                    </span>
                    <span className="text-xs text-[#8b9a9a] block mt-0.5">
                      {item.detail}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              transition={{ duration: 0.8 }}
              className="flex-1 min-w-[300px] h-[420px] rounded-2xl overflow-hidden shadow-xl bg-cover bg-center flex items-end p-7 relative group"
              style={{
                backgroundImage: `url('${contactPageData.hero.visualImage}')`,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-[#1e2a2e]/90 backdrop-blur-md rounded-2xl p-5 w-full"
              >
                <div className="text-xs text-[#2e7cc4] uppercase tracking-wider mb-2">
                  {contactPageData.hero.visualLabel}
                </div>
                <div>
                  <strong className="text-white text-lg block mb-1.5">
                    {contactPageData.hero.visualTitle}
                  </strong>
                  <p className="text-white/90 text-sm">
                    {contactPageData.hero.visualText}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Enquiry Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block bg-[#2e7cc4]/10 text-[#2e7cc4] text-xs tracking-wider uppercase font-semibold px-3 py-1.5 rounded-full mb-4"
              >
                Get in Touch
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-[#1e2a2e] mb-4"
              >
                Share Your Construction Requirements
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[#6a7f7f] max-w-2xl mx-auto"
              >
                Fill out the form below and our team will get back to you within 24 hours.
                For urgent inquiries, call our project helpline directly.
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap gap-12">
            {/* Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex-[1.3] bg-white rounded-2xl border border-[#e8e0d6] p-6 md:p-9 shadow-md"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-8 pb-5 border-b-2 border-[#f0e8e0]"
              >
                <strong className="text-2xl font-semibold text-[#2c3e2f] block">
                  Project Enquiry Form
                </strong>
                <span className="text-sm text-[#8b9a9a] mt-1.5 block">
                  We respond within 24 working hours
                </span>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-5">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-[#2f4946] mb-2">
                        Full Name *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="w-full px-4 py-3 border border-[#e0d6ce] rounded-xl focus:outline-none focus:border-[#2e7cc4] focus:ring-2 focus:ring-[#2e7cc4]/10 transition-all"
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-[#2f4946] mb-2">
                        Phone Number *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full px-4 py-3 border border-[#e0d6ce] rounded-xl focus:outline-none focus:border-[#2e7cc4] focus:ring-2 focus:ring-[#2e7cc4]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-5">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-[#2f4946] mb-2">
                        Email Address *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-3 border border-[#e0d6ce] rounded-xl focus:outline-none focus:border-[#2e7cc4] focus:ring-2 focus:ring-[#2e7cc4]/10 transition-all"
                      />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-[#2f4946] mb-2">
                        City / Location *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Noida, Delhi NCR, etc."
                        required
                        className="w-full px-4 py-3 border border-[#e0d6ce] rounded-xl focus:outline-none focus:border-[#2e7cc4] focus:ring-2 focus:ring-[#2e7cc4]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-5">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-[#2f4946] mb-2">
                        Service Needed *
                      </label>
                      <motion.select
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-[#e0d6ce] rounded-xl focus:outline-none focus:border-[#2e7cc4] focus:ring-2 focus:ring-[#2e7cc4]/10 transition-all bg-white"
                      >
                        <option value="" disabled>Select a service</option>
                        <option value="residential">Residential Construction</option>
                        <option value="commercial">Commercial Construction</option>
                        <option value="renovation">Renovation & Extension</option>
                        <option value="interior">Interior Design</option>
                        <option value="turnkey">Turnkey Projects</option>
                        <option value="consulting">Construction Consulting</option>
                      </motion.select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-[#2f4946] mb-2">
                        Project Scale (sq. ft.)
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        type="text"
                        name="projectScale"
                        value={formData.projectScale}
                        onChange={handleInputChange}
                        placeholder="Built-up area or plot size"
                        className="w-full px-4 py-3 border border-[#e0d6ce] rounded-xl focus:outline-none focus:border-[#2e7cc4] focus:ring-2 focus:ring-[#2e7cc4]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2f4946] mb-2">
                      Project Brief *
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project - floors, timeline, budget, specific requirements..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-[#e0d6ce] rounded-xl focus:outline-none focus:border-[#2e7cc4] focus:ring-2 focus:ring-[#2e7cc4]/10 transition-all resize-y"
                    />
                  </div>

                  <div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#2e7cc4] text-white px-7 py-3 rounded-full font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        'Submit Enquiry →'
                      )}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-green-50 text-green-700 px-5 py-3 rounded-xl text-sm font-medium"
                        role="status"
                      >
                        ✓ Thank you! Your enquiry has been received. Our team will contact you shortly.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>

            {/* Location & Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-[0.9] flex flex-col gap-8"
            >
              {/* Map Card */}
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 20px 25px -12px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-[#e8e0d6] overflow-hidden"
              >
                <div className="p-5 pb-3 border-b border-[#f0e8e0]">
                  <strong className="text-xl font-semibold text-[#2c3e2f] block">
                    Corporate Office
                  </strong>
                  <span className="text-sm text-[#8b9a9a] block mt-1">
                    Office No.1, 1st Floor G-9, Sector 63, Noida, 201309
                  </span>
                </div>
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="h-[260px] w-full"
                >
                  <iframe
                    title="Vasundhara Constructions Office Location"
                    src="https://maps.google.com/maps?q=VASUNDHARA%20CONSTRUCTION%20A-96%2C%20B%20Block%2C%20Sector%2065%2C%20Noida%2C%20Uttar%20Pradesh%20201301%2C%20India&t=m&z=10&output=embed&iwloc=near"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  />
                </motion.div>
              </motion.div>

              {/* Contact Details Grid */}
              <div className="flex flex-wrap gap-4">
                {[
                  { title: "Call or WhatsApp", value: "+91 9818866849", note: "Mon-Sat, 10 AM to 7 PM" },
                  { title: "Email Us", value: "vasundhara.construction30@gmail.com", note: "Share drawings & requirements" },
                  { title: "Visit Us", value: "Mon to Sat, 10 AM - 7 PM", note: "Prior appointment recommended" }
                ].map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex-1 bg-white rounded-2xl border border-[#e8e0d6] p-5 text-center hover:shadow-md transition-all"
                  >
                    <strong className="text-sm font-bold text-[#1e2a2e] block mb-2">
                      {detail.title}
                    </strong>
                    <p className="text-[#2e7cc4] font-semibold mb-2 text-sm break-words">
                      {detail.value}
                    </p>
                    <span className="text-xs text-[#8b9a9a]">{detail.note}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-20 bg-[#faf8f5] relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-[#2e7cc4]/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-block bg-[#2e7cc4]/10 text-[#2e7cc4] text-xs tracking-wider uppercase font-semibold px-3 py-1.5 rounded-full mb-4">
                {contactPageData.guidelines.label}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a2e] mb-4">
                What to Prepare Before Consultation
              </h2>
              <p className="text-[#6a7f7f] max-w-2xl mx-auto">
                Help us understand your project better by having these details ready for the first meeting.
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-8"
          >
            {contactPageData.guidelines.sections.map((section, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="flex-1 bg-white rounded-2xl p-8 border border-[#e8e0d6] hover:shadow-xl transition-all"
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-xl font-semibold text-[#2c3e2f] mb-5"
                >
                  {section.title}
                </motion.h3>
                {section.paragraphs.map((para, paraIdx) => (
                  <motion.p
                    key={paraIdx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="text-[#5a6e6e] mb-4 leading-relaxed"
                  >
                    {para}
                  </motion.p>
                ))}
                {section.bullets && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="space-y-2 pl-5"
                  >
                    {section.bullets.map((bullet, bulletIdx) => (
                      <motion.li
                        key={bulletIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 + 0.4 + bulletIdx * 0.05 }}
                        viewport={{ once: true }}
                        className="text-[#5a6b6e] text-sm leading-relaxed list-disc"
                      >
                        {bullet}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-[#1e2a2e] to-[#2c3e3f] rounded-3xl p-10 md:p-14 flex flex-wrap items-center justify-between gap-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Need Cost Clarity Before Filling the Form?
              </h3>
              <p className="text-[#cddad5] max-w-xl leading-relaxed">
                Use our construction cost estimator or compare our project packages to get a clearer
                picture of your investment.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/cost-estimator"
                  className="bg-white text-[#1e2a2e] hover:bg-gray-100 px-7 py-3 rounded-full font-semibold transition-all inline-flex items-center gap-2"
                >
                  Open Estimator
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/packages"
                  className="border border-white/30 text-white hover:border-[#2e7cc4] hover:bg-[#2e7cc4]/10 px-7 py-3 rounded-full font-semibold transition-all inline-flex items-center gap-2"
                >
                  View Packages
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;