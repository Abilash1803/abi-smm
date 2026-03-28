import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [clicks, setClicks] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.cursor-pointer')
      setIsHovering(!!isInteractive)
    }

    const handleClick = (e) => {
      // Create magic circle effect
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        rings: generateRings(e.clientX, e.clientY),
        particles: generateParticles(e.clientX, e.clientY),
        sparkles: generateSparkles(e.clientX, e.clientY)
      }
      setClicks(prev => [...prev.slice(-3), newClick])
      
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== newClick.id))
      }, 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('click', handleClick)
    }
  }, [isVisible])

  const generateRings = (x, y) => {
    return [
      { id: 1, size: 20, delay: 0 },
      { id: 2, size: 40, delay: 50 },
      { id: 3, size: 60, delay: 100 },
      { id: 4, size: 80, delay: 150 },
    ]
  }

  const generateParticles = (x, y) => {
    const particles = []
    const colors = ['#8B5CF6', '#A78BFA', '#FF6B35', '#FFA500', '#FFB3D9', '#FFFFFF', '#F472B6', '#34D399']
    
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.3
      const velocity = 80 + Math.random() * 120
      particles.push({
        id: i,
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.5 ? 'circle' : 'star'
      })
    }
    return particles
  }

  const generateSparkles = (x, y) => {
    const sparkles = []
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8
      sparkles.push({
        id: i,
        x: x + Math.cos(angle) * 30,
        y: y + Math.sin(angle) * 30,
        size: 8 + Math.random() * 8,
        delay: Math.random() * 100
      })
    }
    return sparkles
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        {/* Outer glow ring */}
        <div 
          className="absolute rounded-full animate-pulse"
          style={{
            width: isHovering ? 60 : 40,
            height: isHovered ? 60 : 40,
            left: isHovering ? -30 : -20,
            top: isHovering ? -30 : -20,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0) 70%)',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.4), 0 0 100px rgba(139, 92, 246, 0.2)'
          }}
        />
        
        {/* Magic circle */}
        <svg 
          width={isHovering ? 48 : 32} 
          height={isHovering ? 48 : 32}
          viewBox="0 0 64 64"
          className="absolute"
          style={{ left: isHovering ? -24 : -16, top: isHovering ? -24 : -16 }}
        >
          <defs>
            <linearGradient id="cursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#FFB3D9" />
            </linearGradient>
          </defs>
          <circle 
            cx="32" cy="32" r="28" 
            fill="none" 
            stroke="url(#cursorGrad)" 
            strokeWidth="2"
            opacity="0.8"
          />
          <circle 
            cx="32" cy="32" r="20" 
            fill="none" 
            stroke="white" 
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>

        {/* Inner bright core */}
        <div 
          className="absolute rounded-full"
          style={{
            width: 10,
            height: 10,
            left: -5,
            top: -5,
            background: 'radial-gradient(circle, #fff 0%, #8B5CF6 100%)',
            boxShadow: '0 0 15px #fff, 0 0 30px rgba(139, 92, 246, 0.8)'
          }}
        />

        {/* Floating sparkles */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-16px)`,
                boxShadow: '0 0 6px #fff, 0 0 12px rgba(139, 92, 246, 0.8)',
                opacity: 0.8
              }}
            />
          ))}
        </div>

        {/* Hover state indicator */}
        {isHovering && (
          <div 
            className="absolute rounded-full animate-ping"
            style={{
              width: 20,
              height: 20,
              left: -10,
              top: -10,
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.8)'
            }}
          />
        )}
      </div>

      {/* Click Effects */}
      {clicks.map(click => (
        <div key={click.id} className="fixed pointer-events-none z-[99998]">
          {/* Expanding rings */}
          {click.rings.map(ring => (
            <Ring key={ring.id} ring={ring} />
          ))}
          
          {/* Particles */}
          {click.particles.map(particle => (
            <Particle key={particle.id} particle={particle} />
          ))}
          
          {/* Sparkles */}
          {click.sparkles.map(sparkle => (
            <Sparkle key={sparkle.id} sparkle={sparkle} />
          ))}
          
          {/* Center burst */}
          <div 
            className="absolute"
            style={{
              left: click.x,
              top: click.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div 
              className="w-4 h-4 bg-white rounded-full animate-ping"
              style={{
                boxShadow: '0 0 20px #fff, 0 0 40px rgba(139, 92, 246, 0.8)'
              }}
            />
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin {
          animation: spin 8s linear infinite;
        }
        @keyframes ping {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
        .animate-ping {
          animation: ping 0.8s ease-out forwards;
        }
      `}</style>
    </>
  )
}

function Ring({ ring }) {
  const [scale, setScale] = useState(0)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    setTimeout(() => {
      let start = null
      const duration = 600
      
      const animate = (timestamp) => {
        if (!start) start = timestamp
        const progress = (timestamp - start) / duration
        
        if (progress < 1) {
          setScale(progress)
          setOpacity(1 - progress)
        }
      }
      
      requestAnimationFrame(animate)
    }, ring.delay)
  }, [ring.delay])

  return (
    <div
      style={{
        position: 'fixed',
        left: ring.size * scale,
        top: ring.size * scale,
        width: (ring.size * 2) * (1 - scale),
        height: (ring.size * 2) * (1 - scale),
        borderRadius: '50%',
        border: '2px solid rgba(139, 92, 246, ' + (opacity * 0.8) + ')',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }}
    />
  )
}

function Particle({ particle }) {
  const [pos, setPos] = useState({ x: particle.x, y: particle.y })
  const [opacity, setOpacity] = useState(1)
  const [size, setSize] = useState(particle.size)

  useEffect(() => {
    let startTime = null
    const duration = 700

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / duration

      if (progress < 1) {
        setPos({
          x: particle.x + particle.vx * progress,
          y: particle.y + particle.vy * progress + (progress * progress * 80)
        })
        setOpacity(1 - progress)
        setSize(particle.size * (1 - progress * 0.5))
      }
    }

    requestAnimationFrame(animate)
  }, [particle])

  if (particle.shape === 'star') {
    return (
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: size * 2,
          height: size * 2,
          opacity,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      >
        <svg viewBox="0 0 24 24" fill={particle.color} style={{ width: '100%', height: '100%' }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        background: particle.color,
        borderRadius: '50%',
        opacity,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        boxShadow: `0 0 ${size * 3}px ${particle.color}`
      }}
    />
  )
}

function Sparkle({ sparkle }) {
  const [pos, setPos] = useState({ x: sparkle.x, y: sparkle.y })
  const [opacity, setOpacity] = useState(0)
  const [size, setSize] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      let start = null
      const duration = 500
      
      const animate = (timestamp) => {
        if (!start) start = timestamp
        const progress = (timestamp - start) / duration
        
        if (progress < 1) {
          const easeOut = 1 - Math.pow(1 - progress, 3)
          setPos({
            x: sparkle.x + (Math.random() - 0.5) * 30 * easeOut,
            y: sparkle.y + (Math.random() - 0.5) * 30 * easeOut - 20 * easeOut
          })
          setOpacity(1 - easeOut)
          setSize(sparkle.size * (1 - easeOut * 0.5))
        }
      }
      
      requestAnimationFrame(animate)
    }, sparkle.delay)
  }, [sparkle])

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        opacity,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }}
    >
      <svg viewBox="0 0 24 24" fill="white" style={{ width: '100%', height: '100%' }}>
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    </div>
  )
}
