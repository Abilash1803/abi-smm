import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [clicks, setClicks] = useState([])
  const cursorRef = useRef(null)
  const trailRef = useRef([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Add to trail
      const newTrailPoint = { x: e.clientX, y: e.clientY, id: Date.now() }
      trailRef.current = [...trailRef.current.slice(-20), newTrailPoint]
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.closest('a') || target.closest('button') ||
          target.classList.contains('cursor-pointer') || target.closest('.cursor-pointer')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleClick = (e) => {
      // Create particle burst effect
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        particles: generateParticles(e.clientX, e.clientY)
      }
      setClicks(prev => [...prev.slice(-5), newClick])
      
      // Remove click after animation
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== newClick.id))
      }, 600)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  const generateParticles = (x, y) => {
    const particles = []
    const colors = ['#8B5CF6', '#A78BFA', '#FF6B35', '#FFA500', '#FFB3D9', '#FFFFFF']
    const shapes = ['circle', 'star']
    
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.5
      const velocity = 50 + Math.random() * 80
      particles.push({
        id: i,
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360
      })
    }
    return particles
  }

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`
        }}
      >
        {/* Outer ring */}
        <div 
          className={`absolute rounded-full transition-all duration-150 ${isHovering ? 'w-12 h-12 -ml-6 -mt-6' : 'w-4 h-4 -ml-2 -mt-2'}`}
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0) 70%)',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.3)'
          }}
        />
        
        {/* Inner dot */}
        <div 
          className="absolute rounded-full"
          style={{
            width: 8,
            height: 8,
            background: '#fff',
            left: -4,
            top: -4,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(139, 92, 246, 0.5)'
          }}
        />
        
        {/* Sparkle effects */}
        <div className="absolute w-20 h-20 -ml-10 -mt-10 animate-spin-slow">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2" style={{ boxShadow: '0 0 10px #fff' }}></div>
          <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full -translate-x-1/2"></div>
          <div className="absolute left-0 top-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full -translate-y-1/2"></div>
          <div className="absolute right-0 top-1/2 w-1 h-1 bg-yellow-400 rounded-full -translate-y-1/2"></div>
        </div>
      </div>

      {/* Cursor Trail */}
      {trailRef.current.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: Math.max(2, (index / trailRef.current.length) * 8),
            height: Math.max(2, (index / trailRef.current.length) * 8),
            background: `rgba(139, 92, 246, ${(index / trailRef.current.length) * 0.5})`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}

      {/* Click Effects */}
      {clicks.map(click => (
        <div key={click.id} className="fixed pointer-events-none z-[9997]">
          {click.particles.map(particle => (
            <Particle key={particle.id} particle={particle} />
          ))}
        </div>
      ))}

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </>
  )
}

function Particle({ particle }) {
  const [pos, setPos] = useState({ x: particle.x, y: particle.y })
  const [opacity, setOpacity] = useState(1)
  const [size, setSize] = useState(particle.size)

  useEffect(() => {
    let startTime = null
    const duration = 500

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / duration

      if (progress < 1) {
        setPos({
          x: particle.x + particle.vx * progress,
          y: particle.y + particle.vy * progress + (progress * progress * 50) // gravity
        })
        setOpacity(1 - progress)
        setSize(particle.size * (1 - progress * 0.5))
        requestAnimationFrame(animate)
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
          width: size,
          height: size,
          opacity,
          transform: 'translate(-50%, -50%) rotate(' + particle.rotation + 'deg)',
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
        boxShadow: `0 0 ${size * 2}px ${particle.color}`
      }}
    />
  )
}
