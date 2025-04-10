
import React from 'react';
import { motion } from 'framer-motion';

interface ElectricButtonEffectProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ElectricButtonEffect: React.FC<ElectricButtonEffectProps> = ({ 
  children, 
  onClick,
  className = ""
}) => {
  // Configurações para os raios elétricos
  const lightningEffects = Array.from({ length: 8 }).map((_, i) => ({
    id: `lightning-${i}`,
    delay: i * 0.4,
    duration: 1.0 + Math.random() * 0.8,
    rotation: (i * 45) % 360,
    length: 8 + Math.random() * 8
  }));

  return (
    <div className={`relative group ${className}`}>
      {/* Container do botão com efeito de brilho */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-md blur opacity-40 group-hover:opacity-90 transition duration-1000 group-hover:duration-200"></div>
      
      {/* Efeitos de raio ao redor do botão */}
      {lightningEffects.map((effect) => (
        <React.Fragment key={effect.id}>
          <motion.div
            className="absolute w-1.5 bg-blue-400 origin-center opacity-0 z-0"
            style={{
              height: `${effect.length + 3}px`,
              top: '50%',
              left: '50%',
              filter: 'blur(0.8px)',
              boxShadow: '0 0 10px 3px rgba(59, 130, 246, 0.8)',
              transform: `rotate(${effect.rotation}deg) translate(calc(-50% + ${26}px), -50%)`,
            }}
            animate={{
              opacity: [0, 0.9, 0],
              height: [`${effect.length}px`, `${effect.length * 1.8}px`, `${effect.length}px`],
            }}
            transition={{
              duration: effect.duration,
              delay: effect.delay,
              repeat: Infinity,
              repeatDelay: 4 + Math.random() * 2
            }}
          />
          
          <motion.div
            className="absolute w-1.5 bg-blue-300 origin-center opacity-0 z-0"
            style={{
              height: `${effect.length * 0.8}px`,
              top: '50%',
              left: '50%',
              filter: 'blur(0.8px)',
              boxShadow: '0 0 10px 3px rgba(96, 165, 250, 0.8)',
              transform: `rotate(${(effect.rotation + 30) % 360}deg) translate(calc(-50% + ${28}px), -50%)`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              height: [`${effect.length * 0.7}px`, `${effect.length * 1.2}px`, `${effect.length * 0.7}px`],
            }}
            transition={{
              duration: effect.duration * 0.8,
              delay: effect.delay + 0.2,
              repeat: Infinity,
              repeatDelay: 4 + Math.random() * 2
            }}
          />
        </React.Fragment>
      ))}
      
      {/* Container principal que mantém o conteúdo do botão */}
      <motion.div 
        className="relative z-10"
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
      
      {/* Partículas elétricas que aparecem ao passar o mouse */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-md z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-blue-300 opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 6px 2px rgba(59, 130, 246, 0.7)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{
              opacity: [0, 0.9, 0],
              scale: [0, 1.2, 0],
              x: [0, (Math.random() - 0.5) * 35],
              y: [0, (Math.random() - 0.5) * 35],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.8,
              repeat: Infinity,
              repeatDelay: Math.random() * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ElectricButtonEffect;
