
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

const ElectricParticles: React.FC = () => {
  const particles = useRef<Particle[]>([]);
  
  // Generate random particles
  useEffect(() => {
    const particleCount = 15; // Keep the count low for subtlety
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // Random position across 100% of container
        y: Math.random() * 100,
        size: Math.random() * 3 + 1, // Small size (1-4px)
        duration: Math.random() * 8 + 4, // Duration between 4-12s
        delay: Math.random() * 5, // Random start delay
      });
    }
    
    particles.current = newParticles;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-200 opacity-40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Add a few "lightning" lines */}
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={`line-${index}`}
          className="absolute bg-blue-100 opacity-20"
          style={{
            left: `${20 + index * 20}%`,
            top: `${10 + index * 25}%`,
            width: '1px',
            height: '40px',
            transformOrigin: 'center',
          }}
          animate={{
            opacity: [0, 0.6, 0],
            rotate: [0, Math.random() * 20 - 10, 0],
            height: [0, 40, 0],
          }}
          transition={{
            duration: 3 + index,
            delay: index * 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ElectricParticles;
