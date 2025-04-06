import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const WhatsAppButton = () => {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        delay: 1 
      }}
    >
      <i className="fab fa-whatsapp text-2xl"></i>
    </motion.a>
  );
};

export default WhatsAppButton;
