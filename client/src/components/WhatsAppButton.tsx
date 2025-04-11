import React from "react";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <a
        href="https://wa.me/+5511972460497?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300"
        aria-label="Falar no WhatsApp"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </a>
    </motion.div>
  );
};

export default WhatsAppButton;