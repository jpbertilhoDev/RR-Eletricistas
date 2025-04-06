
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1471&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534330207526-8e81f10ec6fc?q=80&w=1470&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542184165-1d4809ca3f10?q=80&w=1470&auto=format&fit=crop"
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
      <div className="absolute inset-0 bg-primary/70" />
      
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
          <div className="absolute inset-0 bg-primary/70" />
        </motion.div>
      )}
      
      {/* Indicadores de slide */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex ? 'bg-white scale-100' : 'bg-white/50 scale-75'
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setNextIndex(index);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 2000);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBackgroundCarousel;
