import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'

// Import images
import image1 from '../../../shared/assets/images/1.png'
import image2 from '../../../shared/assets/images/2.png'
import image3 from '../../../shared/assets/images/3.png'
import image4 from '../../../shared/assets/images/4.png'
import image5 from '../../../shared/assets/images/5.png'
import tiktokIcon from '../../../shared/assets/icons/tiktok.png'
import instaIcon from '../../../shared/assets/icons/insta.png'
import fbIcon from '../../../shared/assets/icons/fb.png'
import ytIcon from '../../../shared/assets/icons/yt.png'

/**
 * Hero Section Component
 * Main landing section with call-to-action and profile showcase
 * Clean, professional design without animations
 * 
 * BACKEND INTEGRATION POINTS:
 * - Profile images: Replace static images with dynamic user profiles from database
 * - Social icons: Load platform availability from backend configuration
 * - Trust metrics: Display real user count and testimonials from database
 * - CTA tracking: Track button clicks and conversion rates
 */
export default function HeroSection() {
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const getStartedButtonRef = useRef(null)

  // Confetti effect on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (getStartedButtonRef.current) {
        const rect = getStartedButtonRef.current.getBoundingClientRect()
        const x = (rect.left + rect.width / 2) / window.innerWidth
        const y = (rect.top + rect.height / 2) / window.innerHeight

        // Create multiple confetti bursts for premium effect
        const colors = ['#8B5CF6', '#A78BFA', '#E0E7FF', '#DDD6FE', '#C4B5FD', '#FFFFFF']
        
        // First burst - main explosion
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y },
          colors: colors,
          shapes: ['star', 'circle'],
          scalar: 1.2,
          gravity: 0.6,
          drift: 0.1
        })

        // Second burst - delayed for layered effect
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 100,
            origin: { x, y },
            colors: colors,
            shapes: ['square', 'circle'],
            scalar: 0.8,
            gravity: 0.4,
            drift: -0.1
          })
        }, 200)

        // Third burst - sparkles
        setTimeout(() => {
          confetti({
            particleCount: 30,
            spread: 120,
            origin: { x, y },
            colors: ['#FFFFFF', '#E0E7FF'],
            shapes: ['star'],
            scalar: 0.6,
            gravity: 0.3,
            drift: 0.05
          })
        }, 400)
      }
    }, 1000) // Delay to ensure button is rendered

    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  // BACKEND TODO: Replace with API call to fetch featured user profiles
  // GET /api/featured-profiles - Returns array of user profile images
  const profileImages = [
    image1,
    image2, 
    image3,
    image4,
    image5
  ]

  // BACKEND TODO: Load from platform configuration API
  // GET /api/platforms/config - Returns available platforms and their icons
  const socialIcons = {
    tiktok: tiktokIcon,
    instagram: instaIcon,
    facebook: fbIcon,
    youtube: ytIcon
  }

  // NAVIGATION HANDLERS - Connect to proper routes
  const handleGetStarted = () => {
    // BACKEND TODO: Track CTA click event
    // POST /api/analytics/track-event { event: 'hero_cta_click', timestamp: Date.now() }
    
    // Trigger confetti on button click
    if (getStartedButtonRef.current) {
      const rect = getStartedButtonRef.current.getBoundingClientRect()
      const x = (rect.left + rect.width / 2) / window.innerWidth
      const y = (rect.top + rect.height / 2) / window.innerHeight

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x, y },
        colors: ['#8B5CF6', '#A78BFA', '#E0E7FF', '#FFFFFF'],
        shapes: ['star', 'circle'],
        scalar: 1.0,
        gravity: 0.5
      })
    }
    
    navigate('/register') // Navigate to registration page
  }

  return (
    <div 
      className="relative min-h-screen overflow-hidden pt-12 sm:pt-20 pb-12 sm:pb-20" 
      onMouseMove={handleMouseMove}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[900px] overflow-hidden pointer-events-none z-0">
        <div className="absolute left-0 top-0 w-[300px] sm:w-[450px] h-full">
          <svg className="w-full h-full" viewBox="0 0 450 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0 C180 120, 140 280, 200 450 C260 620, 160 750, 120 900 L0 900 Z" fill="url(#leftGradient)" />
            <defs>
              <linearGradient id="leftGradient" x1="0%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                <stop offset="30%" stopColor="#A78BFA" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#E0E7FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-full h-[900px] overflow-hidden pointer-events-none z-0">
        <div className="absolute right-0 top-0 w-[300px] sm:w-[450px] h-full">
          <svg className="w-full h-full" viewBox="0 0 450 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M450 0 C270 120, 310 280, 250 450 C190 620, 290 750, 330 900 L450 900 Z" fill="url(#rightGradient)" />
            <defs>
              <linearGradient id="rightGradient" x1="100%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.5" />
                <stop offset="30%" stopColor="#DDD6FE" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#E0E7FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Hero Content */}
        <div className="text-center mb-10 sm:mb-16">
          {/* Trust Badge */}
          {/* BACKEND TODO: Replace with real metrics from database */}
          {/* GET /api/stats/trust-metrics - Returns { userCount, rating, countries } */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/40 rounded-full px-4 py-2 mb-6 sm:mb-8 shadow-xl">
            <div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div>
            <span className="text-xs sm:text-sm font-medium text-black">Trusted by 50K+ Creators Worldwide</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-black">
            Turn Your Social Profiles Into Powerful Platforms
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-gray-800 max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
            Grow your audience and increase engagement across TikTok, Instagram, Facebook, and YouTube with reliable social media growth services.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-20">
            {/* Primary CTA - Registration */}
            <button 
              ref={getStartedButtonRef}
              onClick={handleGetStarted}
              className="w-auto px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-[#8B5CF6]/40 transition-all hover:scale-105"
            >
              Get Started Now
            </button>
          </div>
        </div>

        {/* Profile Cards Showcase - Responsive for All Devices */}
        <div className="relative h-96 mb-20">
          {/* Floating Social Icons with Mouse Parallax */}
          <div 
            className="absolute top-8 left-8 z-40 rotate-[-25deg]" 
            style={{ 
              transform: `translate(${(mousePosition.x - 400) * 0.01}px, ${(mousePosition.y - 300) * 0.01}px) rotate(-25deg)` 
            }}
          >
            <img src={socialIcons.tiktok} alt="TikTok" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-lg" />
          </div>
          
          <div 
            className="absolute top-8 right-12 z-40 rotate-[30deg]" 
            style={{ 
              transform: `translate(${(mousePosition.x - 800) * -0.015}px, ${(mousePosition.y - 150) * 0.012}px) rotate(30deg)` 
            }}
          >
            <img src={socialIcons.instagram} alt="Instagram" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 drop-shadow-lg" />
          </div>
          
          <div 
            className="absolute bottom-4 left-2 z-40 rotate-[-15deg]" 
            style={{ 
              transform: `translate(${(mousePosition.x - 300) * 0.012}px, ${(mousePosition.y - 600) * -0.01}px) rotate(-15deg)` 
            }}
          >
            <img src={socialIcons.facebook} alt="Facebook" className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 drop-shadow-lg" />
          </div>
          
          <div 
            className="absolute bottom-8 right-2 z-40 rotate-[20deg]" 
            style={{ 
              transform: `translate(${(mousePosition.x - 900) * -0.01}px, ${(mousePosition.y - 650) * -0.015}px) rotate(20deg)` 
            }}
          >
            <img src={socialIcons.youtube} alt="YouTube" className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 drop-shadow-lg" />
          </div>

          {/* Profile Cards Layout - Responsive */}
          <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center h-full">
            {/* Left Card */}
            <div className="absolute left-4 sm:left-8 lg:left-4 top-1/2 -translate-y-1/2 rotate-[-15deg] z-[5]">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 p-2 sm:p-3 lg:p-4 w-48 h-64 sm:w-56 sm:h-72 lg:w-64 lg:h-80 overflow-hidden">
                <div className="w-full h-5/6 bg-white rounded-xl sm:rounded-2xl overflow-hidden">
                  <img src={profileImages[0]} alt="User Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            {/* Left-Center Card - Hidden on Mobile */}
            <div className="absolute left-24 sm:left-32 lg:left-36 top-1/2 -translate-y-1/2 rotate-[-8deg] z-10 hidden sm:block">
              <div className="bg-gradient-to-br from-pink-400 to-orange-500 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 p-2 sm:p-3 lg:p-4 w-52 h-68 sm:w-60 sm:h-76 lg:w-72 lg:h-88 overflow-hidden">
                <div className="w-full h-5/6 bg-white rounded-xl sm:rounded-2xl overflow-hidden">
                  <img src={profileImages[1]} alt="User Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            {/* Center Card (Featured) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-white/70 p-3 sm:p-4 lg:p-5 w-56 h-72 sm:w-68 sm:h-84 lg:w-80 lg:h-96 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl sm:rounded-3xl"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-full flex-1 bg-white rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-3 lg:mb-4">
                    <img src={profileImages[4]} alt="Featured User" className="w-full h-full object-cover" />
                  </div>
                  {/* Social Interaction Icons */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 sm:gap-3 lg:gap-4">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right-Center Card - Hidden on Mobile */}
            <div className="absolute right-24 sm:right-32 lg:right-36 top-1/2 -translate-y-1/2 rotate-[8deg] z-10 hidden sm:block">
              <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 p-2 sm:p-3 lg:p-4 w-52 h-68 sm:w-60 sm:h-76 lg:w-72 lg:h-88 overflow-hidden">
                <div className="w-full h-5/6 bg-white rounded-xl sm:rounded-2xl overflow-hidden">
                  <img src={profileImages[3]} alt="User Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            {/* Right Card */}
            <div className="absolute right-4 sm:right-8 lg:right-4 top-1/2 -translate-y-1/2 rotate-[15deg] z-[5]">
              <div className="bg-gradient-to-br from-yellow-400 to-red-500 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 p-2 sm:p-3 lg:p-4 w-48 h-64 sm:w-56 sm:h-72 lg:w-64 lg:h-80 overflow-hidden">
                <div className="w-full h-5/6 bg-white rounded-xl sm:rounded-2xl overflow-hidden">
                  <img src={profileImages[2]} alt="User Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}