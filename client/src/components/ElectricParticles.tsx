
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ElectricParticles: React.FC = () => {
  // Create 3 lightning bolts at different positions
  const lightningBolts = Array.from({ length: 5 }).map((_, i) => ({
    id: `bolt-${i}`,
    left: 15 + (i * 20),
    top: 5 + (i * 15),
    width: Math.random() * 1.5 + 0.5,
    height: 20 + Math.random() * 80,
    delay: i * 2.5,
    duration: 3 + Math.random() * 2
  }));

  // Create energy orbs
  const energyOrbs = Array.from({ length: 12 }).map((_, i) => ({
    id: `orb-${i}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 10 + 4,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 6
  }));
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Lightning bolts */}
      {lightningBolts.map((bolt) => (
        <React.Fragment key={bolt.id}>
          <motion.div
            className="absolute energy-bolt"
            style={{
              left: `${bolt.left}%`,
              top: `${bolt.top}%`,
              width: `${bolt.width}px`,
              height: `${bolt.height}px`,
              background: `linear-gradient(to bottom, rgba(229, 231, 255, 0), rgba(100, 162, 255, 0.8), rgba(229, 231, 255, 0))`,
              borderRadius: '40%',
              filter: 'blur(1px)',
              boxShadow: '0 0 8px 2px rgba(100, 162, 255, 0.5)',
              transformOrigin: 'center top'
            }}
            animate={{
              opacity: [0, 0.9, 0],
              scaleY: [0, 1, 0],
              scaleX: [1, 1.5, 1]
            }}
            transition={{
              duration: bolt.duration,
              delay: bolt.delay,
              repeat: Infinity,
              repeatDelay: 8 + Math.random() * 10
            }}
          />
          
          {/* Bolt branches */}
          <motion.div
            className="absolute energy-bolt-branch"
            style={{
              left: `${bolt.left - 0.5}%`,
              top: `${bolt.top + 20}%`,
              width: `${bolt.width}px`,
              height: `${bolt.height * 0.4}px`,
              background: `linear-gradient(70deg, rgba(229, 231, 255, 0), rgba(100, 162, 255, 0.7), rgba(229, 231, 255, 0))`,
              borderRadius: '40%',
              filter: 'blur(1px)',
              boxShadow: '0 0 5px 1px rgba(100, 162, 255, 0.3)',
              transformOrigin: 'left center'
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scaleX: [0, 1, 0]
            }}
            transition={{
              duration: bolt.duration * 0.8,
              delay: bolt.delay + 0.1,
              repeat: Infinity,
              repeatDelay: 8 + Math.random() * 10
            }}
          />
        </React.Fragment>
      ))}

      {/* Energy orbs */}
      {energyOrbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute energy-orb rounded-full"
          style={{
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: 'radial-gradient(circle, rgba(173, 216, 255, 0.7) 0%, rgba(100, 162, 255, 0.2) 70%, rgba(100, 162, 255, 0) 100%)',
            filter: 'blur(1px)'
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [0.8, 1.2, 0.8],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0]
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Electrical current lines (horizontal) */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`current-${i}`}
          className="absolute electrical-current"
          style={{
            left: `${Math.random() * 70 + 10}%`,
            top: `${20 + i * 20}%`,
            height: '1px',
            width: '40px',
            background: 'linear-gradient(to right, rgba(229, 231, 255, 0), rgba(100, 162, 255, 0.9), rgba(229, 231, 255, 0))',
            boxShadow: '0 0 4px 1px rgba(100, 162, 255, 0.6)'
          }}
          animate={{
            opacity: [0, 1, 0],
            width: ['0px', '60px', '0px'],
            x: ['-30px', '30px', '90px']
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: i * 1.5,
            repeat: Infinity,
            repeatDelay: 3 + Math.random() * 5
          }}
        />
      ))}
      
      {/* Pulsing energy core */}
      <motion.div
        className="absolute energy-core rounded-full"
        style={{
          left: '50%',
          top: '50%',
          translateX: '-50%',
          translateY: '-50%',
          width: '60px',
          height: '60px',
          opacity: 0.1,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(100, 162, 255, 0.6) 30%, rgba(100, 162, 255, 0.2) 70%, rgba(100, 162, 255, 0) 100%)',
          filter: 'blur(2px)'
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [0.8, 1.2, 0.8],
          boxShadow: [
            '0 0 10px 5px rgba(100, 162, 255, 0.3)',
            '0 0 20px 10px rgba(100, 162, 255, 0.5)',
            '0 0 10px 5px rgba(100, 162, 255, 0.3)'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ElectricParticles;
