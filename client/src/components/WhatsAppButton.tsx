import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Mostrar tooltip automaticamente depois de um tempo
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated) {
        setShowTooltip(true);
        setHasAnimated(true);

        // Esconder tooltip após 4 segundos
        const hideTimer = setTimeout(() => {
          setShowTooltip(false);
        }, 4000);

        return () => clearTimeout(hideTimer);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasAnimated]);

  // Tooltip animation
  const tooltipAnimation = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            className="bg-white text-gray-800 rounded-lg p-3 mb-3 shadow-lg text-sm max-w-[200px]"
            variants={tooltipAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative">
              Precisa de ajuda? Fale conosco pelo WhatsApp!
              <div className="absolute w-4 h-4 bg-white rotate-45 -bottom-1.5 right-5"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white rounded-full p-3 shadow-sm hover:shadow-md hover:bg-green-600 transition-all flex items-center justify-center"
        initial={{ y: 0 }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setTimeout(() => setShowTooltip(false), 1000)}
      >
        <motion.i 
          className="fab fa-whatsapp text-2xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 1, repeatDelay: 8 }}
        />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;