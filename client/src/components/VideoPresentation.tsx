
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const VideoPresentation = () => {
  return (
    <section id="video-apresentacao" className="bg-gradient-to-b from-blue-50 to-white py-20 md:py-28 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full shadow-sm">
            CONHEÇA NOSSA EMPRESA
          </span>
          <h2 className="text-dark-blue text-3xl font-bold mt-4 mb-5">
            Veja como trabalhamos para sua segurança
          </h2>
          <p className="text-deep-blue/80 max-w-2xl mx-auto">
            Assista nosso vídeo institucional e descubra como nossa equipe de profissionais 
            certificados trabalha para garantir instalações elétricas seguras e eficientes.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl"
        >
          {/* Overlay de destaque */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur-md opacity-30"></div>
          
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
            <iframe 
              src="https://www.youtube.com/embed/BRLHJhQZlGo?si=tUPNQ-OvbsXvnX22" 
              title="Vídeo de Apresentação RR Manutenções Elétricas" 
              className="absolute top-0 left-0 w-full h-full" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </motion.div>
        
        {/* Call-to-action após o vídeo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
            <i className="fas fa-info-circle text-blue-500 mr-2"></i>
            <span className="text-deep-blue">Precisa de serviços elétricos profissionais?</span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-sm"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Solicitar orçamento
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Separador sutil */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    </section>
  );
};

export default VideoPresentation;
