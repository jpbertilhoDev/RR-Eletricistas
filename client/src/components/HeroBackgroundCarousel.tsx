import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '@/assets/images/img1.jpeg';
import img2 from '@/assets/images/img2.jpeg';
import img3 from '@/assets/images/img3.jpeg';

const images = [img1, img2, img3];

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
    <div className="absolute inset-0 overflow-hidden">
      {/* Base layer - always visible */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${images[currentIndex]})`,
          filter: 'brightness(1.1) contrast(1.1)'
        }}
      />

      {/* Light overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/15" />

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
              filter: 'brightness(1.1) contrast(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/15" />
        </motion.div>
      )}
    </div>
  );
};

export default HeroBackgroundCarousel;