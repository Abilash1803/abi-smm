import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ 
  children, 
  onClick, 
  className = '',
  strength = 30,
  radius = 100
}) {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouse = (e) => {
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    setPosition({ 
      x: (distanceX / rect.width) * strength, 
      y: (distanceY / rect.height) * strength 
    })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      className={`relative ${className}`}
      style={{ 
        borderRadius: radius,
        transformOrigin: 'center center'
      }}
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 pointer-events-none"
        />
      )}
      
      {/* Shimmer effect */}
      {isHovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
        />
      )}
      
      {children}
    </motion.button>
  )
}
