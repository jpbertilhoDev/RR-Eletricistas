import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { motion } from "framer-motion";
import TypeWriter from "./TypeWriter";
import HeroBackgroundCarousel from "./HeroBackgroundCarousel";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(heroRef);

  // Variantes de animação
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const buttonHoverEffect = {
    scale: 1.03,
    transition: { duration: 0.2 }
  };

  return (
    <section 
      id="inicio" 
      ref={heroRef}
      className="min-h-[80vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden relative"
    >
      {/* Background Carousel */}
      <HeroBackgroundCarousel />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/95 z-0" />
      
      <div className="w-full container mx-auto px-4 relative z-10 py-20 md:py-0 md:flex md:flex-col md:items-center md:justify-center">
        <motion.div 
          className="flex flex-col items-center justify-center text-center md:max-w-5xl lg:max-w-6xl w-full mx-auto"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight"
            variants={fadeInUp}
          >
            <div className="w-full">
              <TypeWriter />
            </div>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-10 md:mb-12 w-full md:max-w-3xl mx-auto font-light"
            variants={fadeInUp}
          >
            Especialistas em instalações e manutenções elétricas residenciais e comerciais com mais de 10 anos de experiência.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-xl mx-auto mb-12 md:mb-16"
            variants={fadeInUp}
          >
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
              whileHover={buttonHoverEffect}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="default" 
                size="lg"
                className="bg-white text-primary hover:bg-blue-50 font-semibold w-full sm:w-auto px-8 py-6 shadow-lg text-lg transition-all duration-300"
              >
                <i className="fab fa-whatsapp mr-3"></i>
                Solicitar orçamento
              </Button>
            </motion.a>

            <motion.div
              whileHover={buttonHoverEffect}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 hover:bg-white/20 w-full sm:w-auto px-8 py-6 shadow-lg text-lg transition-all duration-300"
                onClick={() => {
                  const servicesSection = document.getElementById("servicos");
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <i className="fas fa-bolt mr-3"></i>
                Ver serviços
              </Button>
            </motion.div>
          </motion.div>

          {/* Mensagem de compromisso */}
          <div className="w-full md:max-w-4xl mx-auto text-center py-4 md:py-8 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white/90 text-lg md:text-xl"
            >
              Compromisso com qualidade e excelência em serviços elétricos
            </motion.div>
          </div>
        </motion.div>
        
        {/* Vídeo de Apresentação - visível apenas no desktop */}
        <div className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24 relative z-10 hidden md:block">
          <div className="container mx-auto px-4 max-w-6xl">
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
              className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg"
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
                  href={`https://wa.me/+5511972650865`}
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
        </div>
      </div>

      {/* Separador com animação */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </section>
  );
};

export default Hero;