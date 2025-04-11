import React from "react";
import { motion } from "framer-motion";

const CTABanner = () => {
  return (
    <section className="py-12 bg-primary relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full opacity-30 translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-10 text-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-dark-blue mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Precisa de um serviço elétrico de qualidade?
          </motion.h2>

          <motion.p 
            className="text-deep-blue/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Entre em contato agora mesmo via WhatsApp e receba um atendimento personalizado.
            Estamos prontos para resolver seu problema elétrico com rapidez e segurança.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, gostaria de solicitar um orçamento.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <i className="fab fa-whatsapp mr-2 text-xl"></i>
              Falar no WhatsApp
            </a>

            <div className="mt-6 text-sm text-deep-blue/70 flex flex-col md:flex-row justify-center gap-3 md:gap-6">
              <span className="flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                São Paulo e região
              </span>
              <span className="flex items-center justify-center">
                <i className="fas fa-clock text-primary mr-2"></i>
                Atendimento: Seg-Sáb, 8h às 18h
              </span>
              <span className="flex items-center justify-center">
                <i className="fas fa-bolt text-primary mr-2"></i>
                Emergências 24h
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;