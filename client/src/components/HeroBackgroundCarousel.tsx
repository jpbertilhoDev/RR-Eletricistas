
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Imagens específicas para eletricistas
const images = [
  '/src/assets/images/hero/electrician1.jpg',
  '/src/assets/images/hero/electrician2.jpg',
  '/src/assets/images/hero/electrician3.jpg',
];

const HeroBackgroundCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setNextIndex((currentIndex + 1) % images.length);

        setTimeout(() => {
          setCurrentIndex(nextIndex);
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
          filter: 'brightness(0.7) contrast(1.2)'
        }}
      />

      {/* Light overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/30 to-primary/40 w-full h-full" />

      {/* Transition layer */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${images[nextIndex]})`,
              filter: 'brightness(0.7) contrast(1.2)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/30 to-primary/40" />
        </motion.div>
      )}
    </div>
  );
};

export default HeroBackgroundCarousel;
