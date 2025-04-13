
import React from "react";
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

interface WhatsAppButtonProps {
  text?: string;
  className?: string;
  message?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "ghost";
}

const WhatsAppButton = ({
  text = "Fale conosco",
  className = "",
  message = "Olá, gostaria de solicitar um orçamento.",
  children,
  size = "md",
  variant = "primary"
}: WhatsAppButtonProps) => {
  // Definir classes com base no tamanho
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };
  
  // Definir classes com base na variante
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-green-500 active:bg-green-600 text-white",
    outline: "bg-white border-2 border-blue-600 text-blue-600 hover:bg-green-50 hover:border-green-500 hover:text-green-600",
    ghost: "bg-transparent hover:bg-green-50 text-blue-600 hover:text-green-600",
  };

  // For the fixed button in the corner (used in Layout.tsx)
  if (className.includes("fixed")) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    return (
      <motion.div
        className="fixed bottom-5 right-5 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-white text-green-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
          aria-label="Fale conosco"
          animate={{
            boxShadow: [
              "0px 4px 10px rgba(0, 0, 0, 0.1)",
              "0px 6px 14px rgba(0, 0, 0, 0.15)",
              "0px 4px 10px rgba(0, 0, 0, 0.1)"
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </motion.a>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <i className="fab fa-whatsapp mr-2 text-lg"></i>
      {children || text}
    </motion.a>
  );
};

export default WhatsAppButton;
