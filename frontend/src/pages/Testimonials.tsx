import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatarImage?: string;
  createdAt?: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [autoPlayActive, setAutoPlayActive] = useState<boolean>(true);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  // Fetch testimonials (unchanged)
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const apiUrl = 'http://localhost:5000/api/testimonials';
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      let testimonialsArray: Testimonial[] = [];
      if (Array.isArray(data)) testimonialsArray = data;
      else if (data.data && Array.isArray(data.data)) testimonialsArray = data.data;
      else if (data.testimonials && Array.isArray(data.testimonials)) testimonialsArray = data.testimonials;
      else if (data.success && data.data && Array.isArray(data.data)) testimonialsArray = data.data;
      else {
        testimonialsArray = [{
          _id: '1',
          name: 'John Doe',
          role: 'CEO, Tech Company',
          quote: 'This is an amazing service! The team is professional and delivers high-quality work.',
          rating: 5,
          avatarImage: ''
        }];
      }
      setTestimonials(testimonialsArray);
      if (testimonialsArray.length === 0) setError('No testimonials found');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(`Unable to load testimonials: ${errorMessage}`);
      setTestimonials([{
        _id: '1',
        name: 'Sample User',
        role: 'Happy Client',
        quote: 'Sample testimonial. Please check API response.',
        rating: 5,
        avatarImage: ''
      }]);
    } finally {
      setLoading(false);
    }
  };

  // --- Auto-slide logic (same as before) ---
  const stopAutoPlay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };
  const startAutoPlay = () => {
    if (!autoPlayActive || testimonials.length <= 1) return;
    if (autoPlayIntervalRef.current) stopAutoPlay();
    autoPlayIntervalRef.current = setInterval(() => {
      if (autoPlayActive) {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 4000);
  };
  const scheduleRestartAfterInteraction = () => {
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
    restartTimeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current) setAutoPlayActive(true);
      restartTimeoutRef.current = null;
    }, 3000);
  };
  useEffect(() => {
    if (autoPlayActive && testimonials.length > 1) startAutoPlay();
    else stopAutoPlay();
    return () => stopAutoPlay();
  }, [autoPlayActive, testimonials.length]);
  useEffect(() => {
    return () => { if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current); };
  }, []);

  // Navigation helpers (with auto-slide interruption)
  const goToIndex = (newIndex: number) => {
    setAutoPlayActive(false);
    stopAutoPlay();
    scheduleRestartAfterInteraction();
    setCurrentIndex((newIndex + testimonials.length) % testimonials.length);
  };
  const nextTestimonial = () => goToIndex(currentIndex + 1);
  const prevTestimonial = () => goToIndex(currentIndex - 1);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setAutoPlayActive(false);
    stopAutoPlay();
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
  };
  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setAutoPlayActive(true);
  };

  // Helper: get previous, current, next testimonials (circular)
  const getCircularTriplet = () => {
    if (testimonials.length === 0) return { prev: null, current: null, next: null };
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const nextIndex = (currentIndex + 1) % testimonials.length;
    return {
      prev: testimonials[prevIndex],
      current: testimonials[currentIndex],
      next: testimonials[nextIndex],
    };
  };

  const RatingStars: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex gap-1 justify-center">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-5 h-5 ${i < rating ? 'fill-blue-400 text-blue-400' : 'fill-gray-200 text-gray-200'}`} />
      ))}
    </div>
  );

  // Card component (reused for prev/current/next with different styles)
  const TestimonialCard: React.FC<{ testimonial: Testimonial; isCenter?: boolean; onClick?: () => void }> = 
    ({ testimonial, isCenter = false, onClick }) => {
      if (!testimonial) return <div className="w-full h-full" />;
      return (
        <div
          onClick={onClick}
          className={`
            transition-all duration-500 ease-out cursor-pointer
            ${isCenter 
              ? 'scale-100 opacity-100 z-20 shadow-2xl bg-white' 
              : 'scale-90 opacity-60 hover:opacity-90 hover:scale-95 bg-white/90 backdrop-blur-sm shadow-lg'
            }
            rounded-2xl p-6 md:p-8 flex flex-col items-center text-center
          `}
          style={{
            minWidth: '280px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <div className="relative mb-4">
            {testimonial.avatarImage ? (
              <img src={testimonial.avatarImage} alt={testimonial.name} className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-lg" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center border-4 border-white shadow-lg">
                <User size={32} className="text-white" />
              </div>
            )}
          </div>
          <RatingStars rating={testimonial.rating} />
          <div className="my-4 px-2">
            <Quote className="w-6 h-6 text-blue-400 mx-auto mb-2 opacity-50" />
            <p className="text-gray-700 text-base line-clamp-3">{testimonial.quote}</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
            <p className="text-blue-600 text-sm">{testimonial.role}</p>
          </div>
        </div>
      );
    };

  // Loading / Error / Empty states (unchanged)
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
    </div>
  );
  if (error && testimonials.length === 0) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchTestimonials} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Try Again</button>
      </div>
    </div>
  );
  if (testimonials.length === 0) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Quote size={48} className="text-blue-300 mx-auto mb-4" />
        <p>No testimonials yet.</p>
      </div>
    </div>
  );

  const { prev, current, next } = getCircularTriplet();

  // Main circular layout: previous (left), current (center), next (right)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Client Testimonials</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
          <p className="text-blue-700 text-lg mt-4">What our clients say about us</p>
        </div>

        <div
          className="relative flex flex-col items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Carousel row - 3 items */}
          <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-4 md:gap-8 w-full">
            {/* Previous testimonial (left) */}
            <div className="hidden md:block flex-1 max-w-[320px]">
              <TestimonialCard testimonial={prev} isCenter={false} onClick={prevTestimonial} />
            </div>
            {/* Current testimonial (center) */}
            <div className="w-full md:w-auto md:flex-1 flex justify-center z-10">
              <TestimonialCard testimonial={current} isCenter={true} />
            </div>
            {/* Next testimonial (right) */}
            <div className="hidden md:block flex-1 max-w-[320px]">
              <TestimonialCard testimonial={next} isCenter={false} onClick={nextTestimonial} />
            </div>
          </div>

          {/* Navigation buttons (arrows) */}
          {testimonials.length > 1 && (
            <>
              <button onClick={prevTestimonial} className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow-lg hover:bg-blue-50 transition">
                <ChevronLeft className="w-6 h-6 text-blue-600" />
              </button>
              <button onClick={nextTestimonial} className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow-lg hover:bg-blue-50 transition">
                <ChevronRight className="w-6 h-6 text-blue-600" />
              </button>
            </>
          )}

          {/* Dots */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-blue-300 hover:bg-blue-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="text-center mt-6 text-blue-600 text-sm">
          {currentIndex + 1} of {testimonials.length}
        </div>
      </div>
      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;