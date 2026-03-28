import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import image1 from '../../../shared/assets/images/1.png'
import image2 from '../../../shared/assets/images/2.png'
import image3 from '../../../shared/assets/images/3.png'
import image4 from '../../../shared/assets/images/4.png'
import image5 from '../../../shared/assets/images/5.png'

export default function Testimonials() {
  const scrollRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  const testimonials = [
    {
      name: 'Lucas Bennett',
      location: 'Canada',
      text: "I'm getting more recognition for my TikTok videos from the increased amount of traffic after using their services; they made the entire procedure easy and the results came quickly.",
      rating: 5,
      avatar: image1,
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      name: 'Amelia Clarke',
      location: 'Australia',
      text: "I was able to promote my Instagram page before beginning my campaign and I found it increased the activity on my page dramatically.",
      rating: 5,
      avatar: image2,
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      name: 'Hassan Ali',
      location: 'United Arab Emirates',
      text: "I was able to increase the number of views on my YouTube video and as a result, my channel is becoming more recognizable.",
      rating: 5,
      avatar: image3,
      gradient: 'from-red-400 to-orange-500'
    },
    {
      name: 'Sofia Martinez',
      location: 'Spain',
      text: "I used them for their Instagram likes, and it worked just as I thought it would; it was very easy to do as well.",
      rating: 5,
      avatar: image4,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      name: 'Daniel Kim',
      location: 'South Korea',
      text: "I utilized them for my Facebook page and as a result, my Facebook page is much more credible than it originally was.",
      rating: 5,
      avatar: image5,
      gradient: 'from-green-400 to-teal-500'
    },
    {
      name: 'Emma Wilson',
      location: 'United Kingdom',
      text: "Amazing results! My follower count tripled within a week. The best investment for my growing brand.",
      rating: 5,
      avatar: image1,
      gradient: 'from-amber-400 to-yellow-500'
    },
    {
      name: 'James Chen',
      location: 'Singapore',
      text: "Professional service with real results. Highly recommend for anyone serious about social media growth.",
      rating: 5,
      avatar: image2,
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Sarah Johnson',
      location: 'United States',
      text: "The best SMM panel I've used. Quick delivery and excellent customer support.",
      rating: 5,
      avatar: image3,
      gradient: 'from-violet-400 to-purple-500'
    }
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollSpeed = 0.8;

    const autoScroll = () => {
      if (scrollContainer && !isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 4) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div className="py-20 px-0 overflow-hidden relative">
      {/* Transparent Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent pointer-events-none"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>

      <div className="max-w-full mx-auto relative z-10">
        
        <motion.div 
          className="text-center mb-16 px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm border border-white/50 rounded-full px-4 py-2 mb-4"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Trusted by 50,000+ Users</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real feedback from satisfied customers who've grown their social media presence with our services.
          </p>
        </motion.div>

        {/* Infinite Scroll Container */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scrollbar-hide cursor-grab active:cursor-grabbing py-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={`${testimonial.name}-${index}`} 
                testimonial={testimonial} 
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-400/50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

function TestimonialCard({ testimonial, index }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, y: -10 }}
      className="flex-shrink-0 w-96 cursor-pointer group perspective-1000"
      style={{
        transform: `rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Card Container with Glassmorphism */}
      <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl border border-white/40 p-6 shadow-2xl overflow-hidden group-hover:border-white/60 transition-all duration-500">
        
        {/* Dynamic Reflection Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(
              ${135 + mousePosition.x * 30}deg,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 25%,
              transparent 50%,
              rgba(255, 255, 255, 0.05) 75%,
              transparent 100%
            )`
          }}
        />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transform: 'translateX(-100%)',
              animation: 'shimmer 2s infinite'
            }}
          />
        </div>

        {/* Gradient Glow Background */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${testimonial.gradient} opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-opacity duration-500`}></div>
        <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br ${testimonial.gradient} opacity-10 rounded-full blur-3xl`}></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Rating Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.svg
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="w-5 h-5 text-amber-400 drop-shadow-lg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>

          {/* Quote Icon */}
          <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.gradient} rounded-lg flex items-center justify-center mb-3 shadow-lg`}>
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>

          {/* Review Text */}
          <p className="text-gray-700 leading-relaxed mb-6 text-base font-medium italic">
            "{testimonial.text}"
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>

          {/* Author Info */}
          <div className="flex items-center gap-4">
            {/* Avatar with Glow */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name}
                className="relative w-14 h-14 rounded-full object-cover shadow-lg ring-2 ring-white/50 group-hover:ring-white/80 transition-all duration-300"
              />
            </div>
            
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors duration-300">
                {testimonial.name}
              </h4>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>

            {/* Verified Badge */}
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-purple-300/30 rounded-tl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-purple-300/30 rounded-br-3xl"></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  )
}
