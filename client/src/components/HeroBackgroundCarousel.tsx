import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import eletricidadeHorizontal from '@/assets/images/hero/eletrecidade-horizontal.jpeg';
import eletricidadeResidencial from '@/assets/images/hero/eletricidade-residencial.jpeg';
import eletricidadeIndustrial from '@/assets/images/hero/eletricidade-industrial.jpeg';

// Usando 3 imagens no carrossel
const images = [eletricidadeHorizontal, eletricidadeResidencial, eletricidadeIndustrial];

const HeroBackgroundCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        
        // Calcula o próximo índice circularmente
        const next = (currentIndex + 1) % images.length;
        setNextIndex(next);

        setTimeout(() => {
          setCurrentIndex(next);
          setIsTransitioning(false);
        }, 1000);
      }
    }, 5000); // Intervalo de 5 segundos entre as imagens

    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);

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

      {/* Transition layer - para fade entre imagens */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key={nextIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${images[nextIndex]})`,
              filter: 'brightness(1.2) contrast(1.1)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Light overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/10 w-full h-full" />
    </div>
  );
};

export default HeroBackgroundCarousel;