
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const WhatsAppPopupBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostrar o banner após 5 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-20 right-5 z-50 max-w-xs bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <i className="fab fa-whatsapp text-white text-xl"></i>
                </div>
              </div>
              <div className="ml-3 w-full pr-4">
                <h3 className="text-sm font-medium text-gray-900">Quer resolver seu problema elétrico agora?</h3>
                <p className="mt-1 text-xs text-gray-500">Nossos especialistas estão prontos para atender você com qualidade e segurança</p>
                
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, gostaria de resolver um problema elétrico.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center justify-center w-full py-2 px-3 bg-green-500 text-white text-sm font-medium rounded shadow-sm hover:bg-green-600 focus:outline-none transition-colors duration-150"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Fale conosco
                </a>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Fechar"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppPopupBanner;
