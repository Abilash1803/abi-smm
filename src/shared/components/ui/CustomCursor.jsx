import { useState, useEffect } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [clicks, setClicks] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      setIsHovering(!!isInteractive)
    }

    const handleClick = (e) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      }
      setClicks(prev => [...prev.slice(-2), newClick])
      
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== newClick.id))
      }, 800)
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

  if (!isVisible) return null

  return (
    <>
      {/* Main Cursor */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Outer glow */}
        <div 
          style={{
            position: 'absolute',
            width: isHovering ? 50 : 30,
            height: isHovering ? 50 : 30,
            left: isHovering ? -25 : -15,
            top: isHovering ? -25 : -15,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(139, 92, 246, 0) 70%)',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)'
          }}
        />
        
        {/* Inner ring */}
        <div 
          style={{
            position: 'absolute',
            width: isHovering ? 30 : 20,
            height: isHovering ? 30 : 20,
            left: isHovering ? -15 : -10,
            top: isHovering ? -15 : -10,
            borderRadius: '50%',
            border: '2px solid rgba(139, 92, 246, 0.8)',
            background: 'transparent'
          }}
        />

        {/* Center dot */}
        <div 
          style={{
            position: 'absolute',
            width: 6,
            height: 6,
            left: -3,
            top: -3,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 0 10px #fff, 0 0 20px rgba(139, 92, 246, 0.8)'
          }}
        />
      </div>

      {/* Click Effects */}
      {clicks.map(click => (
        <ClickEffect key={click.id} x={click.x} y={click.y} />
      ))}
    </>
  )
}

function ClickEffect({ x, y }) {
  const [rings, setRings] = useState([])

  useEffect(() => {
    const timer1 = setTimeout(() => setRings(prev => [...prev, 1]), 0)
    const timer2 = setTimeout(() => setRings(prev => [...prev, 2]), 100)
    const timer3 = setTimeout(() => setRings(prev => [...prev, 3]), 200)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <>
      {rings.map(ring => (
        <div
          key={ring}
          style={{
            position: 'fixed',
            left: x,
            top: y,
            width: ring * 30,
            height: ring * 30,
            borderRadius: '50%',
            border: '2px solid rgba(139, 92, 246, ' + (1 - ring / 4) + ')',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 99998,
            animation: 'expand 0.5s ease-out forwards',
            boxShadow: `0 0 ${10 / ring}px rgba(139, 92, 246, 0.5)`
          }}
        />
      ))}
      
      {/* Particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (Math.PI * 2 * i) / 8
        return (
          <div
            key={i}
            style={{
              position: 'fixed',
              left: x,
              top: y,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: ['#8B5CF6', '#FF6B35', '#FFB3D9', '#fff'][i % 4],
              transform: `translate(-50%, -50%)`,
              pointerEvents: 'none',
              zIndex: 99998,
              animation: `particle${i} 0.6s ease-out forwards`,
              boxShadow: '0 0 6px currentColor'
            }}
          >
            <style>{`
              @keyframes particle${i} {
                0% { 
                  transform: translate(-50%, -50%) translate(0, 0); 
                  opacity: 1;
                }
                100% { 
                  transform: translate(-50%, -50%) translate(${Math.cos(angle) * 60}px, ${Math.sin(angle) * 60}px); 
                  opacity: 0;
                }
              }
              @keyframes expand {
                0% { 
                  transform: translate(-50%, -50%) scale(0); 
                  opacity: 1;
                }
                100% { 
                  transform: translate(-50%, -50%) scale(1); 
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        )
      })}

      {/* Center flash */}
      <div
        style={{
          position: 'fixed',
          left: x,
          top: y,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fff 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          animation: 'flash 0.4s ease-out forwards'
        }}
      >
        <style>{`
          @keyframes flash {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
          }
        `}</style>
      </div>
    </>
  )
}
