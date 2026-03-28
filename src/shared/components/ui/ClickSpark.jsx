import { useState, useEffect, useRef } from 'react';

const ClickSpark = ({ 
  children, 
  sparkColor = '#8B5CF6', 
  sparkSize = 10, 
  sparkRadius = 15, 
  sparkCount = 8, 
  duration = 400 
}) => {
  const [sparks, setSparks] = useState([]);
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);

  const createSpark = (x, y) => {
    const newSparks = [];
    const colors = ['#8B5CF6', '#A78BFA', '#E0E7FF', '#DDD6FE', '#C4B5FD'];
    
    // Create main sparks
    for (let i = 0; i < sparkCount; i++) {
      const angle = (360 / sparkCount) * i + Math.random() * 30 - 15; // Add randomness
      const radian = (angle * Math.PI) / 180;
      const velocity = sparkRadius + Math.random() * 10;
      const size = sparkSize + Math.random() * 6;
      
      newSparks.push({
        id: Math.random(),
        x: x,
        y: y,
        vx: Math.cos(radian) * velocity,
        vy: Math.sin(radian) * velocity,
        life: 1,
        decay: 1 / (duration / 16),
        size: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: 'spark',
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    // Create smaller secondary particles
    for (let i = 0; i < sparkCount * 2; i++) {
      const angle = Math.random() * 360;
      const radian = (angle * Math.PI) / 180;
      const velocity = (sparkRadius * 0.6) + Math.random() * 8;
      
      newSparks.push({
        id: Math.random(),
        x: x,
        y: y,
        vx: Math.cos(radian) * velocity,
        vy: Math.sin(radian) * velocity,
        life: 1,
        decay: 1 / ((duration * 0.8) / 16),
        size: 3 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: 'particle',
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
      });
    }

    // Create ripple effect
    const newRipple = {
      id: Math.random(),
      x: x,
      y: y,
      radius: 0,
      maxRadius: 60,
      life: 1,
      decay: 1 / (600 / 16), // Longer duration for ripple
    };

    setSparks(prev => [...prev, ...newSparks]);
    setRipples(prev => [...prev, newRipple]);
  };

  const handleClick = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createSpark(x, y);
    }
  };

  useEffect(() => {
    const animationFrame = () => {
      setSparks(prev => 
        prev
          .map(spark => ({
            ...spark,
            x: spark.x + spark.vx,
            y: spark.y + spark.vy,
            life: spark.life - spark.decay,
            vx: spark.vx * 0.96, // More friction for smoother deceleration
            vy: spark.vy * 0.96 + (spark.type === 'spark' ? 0.2 : 0.1), // Slight gravity
            rotation: spark.rotation + spark.rotationSpeed,
          }))
          .filter(spark => spark.life > 0)
      );

      setRipples(prev =>
        prev
          .map(ripple => ({
            ...ripple,
            radius: ripple.radius + (ripple.maxRadius - ripple.radius) * 0.1,
            life: ripple.life - ripple.decay,
          }))
          .filter(ripple => ripple.life > 0)
      );
    };

    const interval = setInterval(animationFrame, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      onClick={handleClick}
      className="relative"
      style={{ width: '100%', height: '100%' }}
    >
      {children}
      
      {/* Ripple effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute rounded-full border-2"
            style={{
              left: ripple.x - ripple.radius,
              top: ripple.y - ripple.radius,
              width: ripple.radius * 2,
              height: ripple.radius * 2,
              borderColor: `rgba(139, 92, 246, ${ripple.life * 0.3})`,
              background: `radial-gradient(circle, rgba(139, 92, 246, ${ripple.life * 0.1}) 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>
      
      {/* Spark particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparks.map(spark => (
          <div
            key={spark.id}
            className="absolute"
            style={{
              left: spark.x - spark.size / 2,
              top: spark.y - spark.size / 2,
              width: spark.size,
              height: spark.size,
              transform: `scale(${spark.life}) rotate(${spark.rotation}deg)`,
              opacity: spark.life,
            }}
          >
            {spark.type === 'spark' ? (
              // Diamond/star shape for main sparks
              <div
                className="w-full h-full relative"
                style={{
                  background: `linear-gradient(45deg, ${spark.color}, #ffffff)`,
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                  filter: `drop-shadow(0 0 ${spark.size}px ${spark.color}) brightness(1.2)`,
                }}
              />
            ) : (
              // Circle for secondary particles
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle, ${spark.color}, transparent)`,
                  boxShadow: `0 0 ${spark.size * 2}px ${spark.color}, inset 0 0 ${spark.size}px rgba(255,255,255,0.3)`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClickSpark;