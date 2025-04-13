import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import eletricidadeHorizontal from '@/assets/images/hero/eletricidade-horizontal.jpeg';

// Agora usando apenas uma imagem
const images = [eletricidadeHorizontal];

const HeroBackgroundCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0); // Mantendo o mesmo índice já que temos apenas uma imagem
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Mantendo o useEffect para compatibilidade, mas ele não vai mais alternar entre imagens
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setNextIndex(0); // Sempre será 0 já que temos apenas uma imagem

        setTimeout(() => {
          setCurrentIndex(0);
          setIsTransitioning(false);
        }, 1000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, nextIndex, isTransitioning]);

  return (
    <div className="absolute inset-0 overflow-hidden w-full h-full">
      {/* Base layer - always visible */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${images[currentIndex]})`,
          filter: 'brightness(1.2) contrast(1.1)'
        }}
      />

      {/* Light overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10 w-full h-full" />

      {/* Transition layer - removido pois só temos uma imagem */}
    </div>
  );
};

export default HeroBackgroundCarousel;