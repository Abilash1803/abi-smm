import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Enhanced mouse tracking with smoother movement
      const x = (clientX / innerWidth) * 2 - 1
      const y = (clientY / innerHeight) * 2 - 1
      
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const trustIndicators = [
    { 
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
        </svg>
      ),
      text: 'SSL Encrypted',
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
        </svg>
      ),
      text: 'Instant Delivery',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ),
      text: 'No Password Required',
      color: 'from-purple-500 to-purple-600'
    }
  ]
  // Professional social media icons with better positioning
  const socialIcons = [
    {
      id: 'instagram',
      component: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
          <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      gradient: 'from-purple-500 via-pink-500 to-orange-400',
      position: { x: 18, y: 15 },
      moveIntensity: 1.0,
      size: 'w-10 h-10'
    },
    {
      id: 'youtube',
      component: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
          <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      gradient: 'from-red-500 to-red-600',
      position: { x: 82, y: 12 },
      moveIntensity: 0.8,
      size: 'w-10 h-10'
    },
    {
      id: 'tiktok',
      component: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
          <path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      gradient: 'from-gray-900 via-gray-800 to-pink-500',
      position: { x: 85, y: 75 },
      moveIntensity: 0.9,
      size: 'w-9 h-9'
    },
    {
      id: 'facebook',
      component: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
          <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      gradient: 'from-blue-600 to-blue-700',
      position: { x: 12, y: 78 },
      moveIntensity: 0.7,
      size: 'w-9 h-9'
    }
  ]

  return (
    <section className="py-8 lg:py-6 relative overflow-hidden min-h-[75vh] flex items-center justify-center w-full">
      {/* Seamless gradient background that blends with other sections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Unified gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-blue-50/60 to-indigo-50/80"></div>
        
        {/* Subtle animated elements */}
        <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-r from-blue-100/30 via-purple-100/30 to-pink-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-40 right-20 w-56 h-56 bg-gradient-to-r from-purple-100/30 via-pink-100/30 to-orange-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-100/30 via-blue-100/30 to-cyan-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
        
        {/* Minimal floating elements */}
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-300/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-300/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-indigo-300/40 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full px-6 sm:px-8 lg:px-12 xl:px-14 py-8 lg:py-12 gap-8 lg:gap-12">
          {/* Enhanced Left Content */}
          <div className="flex-1 max-w-3xl text-center lg:text-left space-y-4 order-2 lg:order-1 flex flex-col justify-center">
            {/* Professional trust badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex"
            >
              <div className="bg-white/80 backdrop-blur-xl px-3 py-1.5 rounded-full shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-300 inline-flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                    ✨ Trusted by 2.5M+ Creators
                  </span>
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 border-2 border-white"></div>
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white"></div>
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      +
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Enhanced main heading with balanced typography */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                <span className="block mb-2">Grow Your</span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Social Media
                </span>
                <span className="block bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                  Fast & Secure
                </span>
              </h1>
            </motion.div>
            
            {/* Enhanced subtitle with balanced sizing */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 leading-relaxed max-w-2xl font-medium">
                Get <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">real followers, likes, and views</span> from authentic accounts. 
                <span className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700 font-medium text-base sm:text-lg">Instant delivery with guaranteed results.</span>
                </span>
              </p>
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="/register" className="group">
                <Button size="md" className="group relative overflow-hidden bg-[#0ea5e9] hover:bg-[#0284c7] transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg px-6 py-2.5 text-base font-bold w-full sm:w-auto rounded-xl">
                  <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                    Get Started
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </span>
                </Button>
              </a>
              <a href="#services" className="group">
                <Button variant="secondary" size="md" className="group border-2 border-gray-300 hover:border-blue-500 bg-white/90 backdrop-blur-sm hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 px-6 py-2.5 text-base font-bold w-full sm:w-auto rounded-xl shadow-md hover:shadow-lg">
                  <span className="flex items-center justify-center gap-2 text-gray-700 group-hover:text-blue-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                    View Services
                  </span>
                </Button>
              </a>
            </motion.div>

            {/* Professional trust indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/50"
                >
                  <div className={`p-1.5 rounded-lg bg-gradient-to-r ${indicator.color} text-white shadow-sm`}>
                    {indicator.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700">{indicator.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Enhanced Right Illustration */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex-1 max-w-2xl order-1 lg:order-2 flex items-center justify-center"
          >
            <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px] flex items-center justify-center overflow-visible">
              {/* Enhanced Interactive Social Media Icons */}
              {socialIcons.map((icon, index) => (
                <div
                  key={icon.id}
                  className={`absolute ${icon.size} bg-gradient-to-br ${icon.gradient} rounded-2xl flex items-center justify-center shadow-xl transition-all duration-700 ease-out hover:scale-110 cursor-pointer group backdrop-blur-sm`}
                  style={{
                    left: `${icon.position.x}%`,
                    top: `${icon.position.y}%`,
                    transform: `translate(${mousePosition.x * icon.moveIntensity * 15}px, ${mousePosition.y * icon.moveIntensity * 15}px) rotate(${mousePosition.x * icon.moveIntensity * 3}deg)`,
                    zIndex: 10 + index,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {icon.component}
                  
                  {/* Enhanced glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${icon.gradient} rounded-2xl blur-xl opacity-25 -z-10 scale-150 group-hover:opacity-40 transition-opacity duration-300`}></div>
                </div>
              ))}

              {/* Professional Phone mockup */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                < div 
                  className="relative w-48 sm:w-52 lg:w-56 h-[360px] sm:h-[400px] lg:h-[440px] transition-all duration-700 ease-out"
                  style={{
                    transform: `translate(${mousePosition.x * 6}px, ${mousePosition.y * 6}px) rotateY(${mousePosition.x * 3}deg) rotateX(${-mousePosition.y * 3}deg)`
                  }}
                >
                  {/* Professional Phone body */}
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[2.5rem] sm:rounded-[3rem] lg:rounded-[3.5rem] shadow-2xl p-2.5 sm:p-3 lg:p-4 border-3 border-gray-700">
                    {/* Phone screen */}
                    <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden relative shadow-inner">
                      {/* Professional status bar */}
                      <div className="absolute top-0 left-0 right-0 h-10 sm:h-12 lg:h-14 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 flex items-center justify-between px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                          <span className="text-white text-sm font-semibold ml-2 ">Hello </span>
                        </div>
                        <div className="text-white text-sm font-bold">9:41</div>
                        <div className="flex items-center gap-2">
                          
                          <div className="w-7 h-4 border-2 border-white rounded-sm">
                            <div className="w-5 h-1.5 bg-white rounded-sm animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Professional app interface */}
                      <div className="absolute inset-0 top-10 sm:top-12 lg:top-14 p-3 sm:p-4 lg:p-6">
                        {/* Professional profile section */}
                        <div className="flex items-center gap-3 mb-5">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                              </svg>
                            </div>
                          </div>
                          <div>
                            <div className="w-20 h-3 bg-gray-300 rounded-full mb-1.5 animate-pulse"></div>
                            <div className="w-14 h-2.5 bg-gray-200 rounded-full animate-pulse"></div>
                          </div>
                        </div>

                        {/* Professional stats cards */}
                        <div className="grid grid-cols-2 gap-2.5 mb-5">
                          <div className="bg-white rounded-2xl p-3 shadow-lg border border-gray-100">
                            <div className="text-xl font-black text-blue-600 mb-0.5">2.5M</div>
                            <div className="text-xs font-semibold text-gray-500 mb-1">Followers</div>
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                              </svg>
                              <span className="text-xs text-emerald-500 font-bold">+15%</span>
                            </div>
                          </div>
                          <div className="bg-white rounded-2xl p-3 shadow-lg border border-gray-100">
                            <div className="text-xl font-black text-pink-600 mb-0.5">8.2M</div>
                            <div className="text-xs font-semibold text-gray-500 mb-1">Likes</div>
                            <div className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                              </svg>
                              <span className="text-xs text-emerald-500 font-bold">+28%</span>
                            </div>
                          </div>
                        </div>

                        {/* Professional growth indicators */}
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="w-20 h-2 bg-gray-200 rounded-full mb-1"></div>
                              <div className="w-14 h-1.5 bg-gray-100 rounded-full"></div>
                            </div>
                            <div className="text-emerald-500 text-sm font-black">+47%</div>
                          </div>
                          
                          <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-lg border border-gray-100">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="w-22 h-2 bg-gray-200 rounded-full mb-1"></div>
                              <div className="w-12 h-1.5 bg-gray-100 rounded-full"></div>
                            </div>
                            <div className="text-blue-500 text-sm font-black">+63%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Professional phone notch */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Professional floating engagement indicators */}
              <div 
                className="absolute top-16 right-12 bg-white/90 backdrop-blur-xl rounded-xl px-3 py-2 shadow-lg transition-all duration-700 ease-out border border-gray-200/50"
                style={{
                  transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * -12}px) rotate(${mousePosition.x * 2}deg)`
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">❤️</span>
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-800">+12.5K</div>
                    <div className="text-xs text-gray-500 font-medium">New Likes</div>
                  </div>
                </div>
              </div>
              
              <div 
                className="absolute bottom-32 left-12 bg-white/90 backdrop-blur-xl rounded-xl px-3 py-2 shadow-lg transition-all duration-700 ease-out border border-gray-200/50"
                style={{
                  transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * -8}px) rotate(${mousePosition.x * -2}deg)`
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white text-sm">👥</span>
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-800">+8.5K</div>
                    <div className="text-xs text-gray-500 font-medium">Followers</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero