import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { motion } from "framer-motion";
import TypeWriter from "./TypeWriter";
import HeroBackgroundCarousel from "./HeroBackgroundCarousel";
import ElectricButtonEffect from "./ElectricButtonEffect";

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
      className="min-h-[80vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden relative pt-20 md:pt-28"
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

            <ElectricButtonEffect
              className="w-full sm:w-auto"
              onClick={() => {
                const servicesSection = document.getElementById("servicos");
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 hover:bg-white/20 w-full sm:w-auto px-8 py-6 shadow-lg text-lg transition-all duration-300 relative z-10"
              >
                <i className="fas fa-bolt mr-3"></i>
                Ver serviços
              </Button>
            </ElectricButtonEffect>
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