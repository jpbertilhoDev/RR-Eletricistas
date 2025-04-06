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
      className="min-h-screen flex items-center justify-center overflow-hidden relative"
    >
      {/* Background Carousel */}
      <HeroBackgroundCarousel />
      
      <div className="container mx-auto px-4 relative z-10 py-20 md:py-0">
        <motion.div 
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight min-h-[6rem] md:min-h-[6.5rem] lg:min-h-[7rem] flex items-center justify-center"
            variants={fadeInUp}
          >
            <div className="w-full">
              <TypeWriter />
            </div>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl"
            variants={fadeInUp}
          >
            Especialistas em instalações e manutenções elétricas residenciais e comerciais com mais de 10 anos de experiência.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
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
                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-8 py-6 shadow-lg text-base"
              >
                <i className="fab fa-whatsapp mr-2"></i>
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
                className="bg-white text-primary border-white hover:bg-blue-50 w-full sm:w-auto px-8 py-6 shadow-lg text-base"
                onClick={() => {
                  const servicesSection = document.getElementById("servicos");
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <i className="fas fa-bolt mr-2"></i>
                Ver serviços
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center mt-4"
            variants={fadeInUp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <motion.i 
                  key={i}
                  className="fas fa-star"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + (i * 0.1), duration: 0.3 }}
                />
              ))}
            </div>
            <span className="text-white text-sm">5.0 no Google (102+ avaliações)</span>
          </motion.div>

          {/* Indicadores com animação */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 w-full max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {[
              { value: "10+", label: "Anos de experiência" },
              { value: "500+", label: "Clientes satisfeitos" },
              { value: "100%", label: "Garantia de serviço" },
              { value: "24/7", label: "Suporte técnico" }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="text-center bg-blue-800/60 py-3 px-2 rounded-lg shadow-md backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="text-white text-2xl font-bold mb-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.3 }}
                >
                  {item.value}
                </motion.div>
                <div className="text-white/80 text-sm">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Separador com animação */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-4 bg-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </section>
  );
};

export default Hero;