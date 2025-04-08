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

        // Delay actual index change to allow smooth transition
        setTimeout(() => {
          setCurrentIndex(nextIndex);
          setIsTransitioning(false);
        }, 2000);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, nextIndex, isTransitioning]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base layer - always visible */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-2000"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      />

      {/* Overlay for Blue tint */}
      <div className="absolute inset-0 bg-primary/40" />

      {/* Transition layer */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${images[nextIndex]})` }}
          />
          <div className="absolute inset-0 bg-primary/40" />
        </motion.div>
      )}
    </div>
  );
};

export default HeroBackgroundCarousel;