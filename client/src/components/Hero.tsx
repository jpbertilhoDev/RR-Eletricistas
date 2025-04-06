import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(heroRef);

  return (
    <section 
      id="inicio" 
      ref={heroRef}
      className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-primary to-blue-900"
    >
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Serviços Elétricos com Qualidade e Precisão
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Especialistas em instalações e manutenções elétricas residenciais e comerciais.
              <span className="block mt-2">Atendimento ágil com profissionais certificados.</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="default" 
                  size="xl"
                  className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto px-8 py-6 text-lg"
                >
                  <i className="fab fa-whatsapp text-xl mr-2"></i>
                  Falar com eletricista
                </Button>
              </a>
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto px-8 py-6 text-lg"
                onClick={() => {
                  const servicesSection = document.getElementById("servicos");
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <i className="fas fa-tools mr-2"></i>
                Nossos serviços
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Borda decorativa */}
            <div className="absolute -inset-1.5 bg-white/10 rounded-2xl blur-sm"></div>
            
            {/* Imagem principal */}
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80" 
              alt="Eletricista profissional trabalhando" 
              className="rounded-xl shadow-2xl w-full h-auto object-cover relative z-10"
            />
            
            {/* Certificações */}
            <motion.div 
              className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white py-3 px-6 rounded-full shadow-xl flex items-center space-x-4 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <span className="text-primary font-semibold">Empresa Certificada</span>
              <div className="flex items-center">
                <i className="fas fa-certificate text-yellow-500 mr-1"></i>
                <i className="fas fa-shield-alt text-primary mr-1"></i>
                <i className="fas fa-check-circle text-green-600"></i>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Indicadores de confiança */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="text-center">
              <div className="text-white/90 text-4xl font-bold mb-2">10+</div>
              <div className="text-white/70">Anos de experiência</div>
            </div>
            <div className="text-center">
              <div className="text-white/90 text-4xl font-bold mb-2">500+</div>
              <div className="text-white/70">Clientes satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-white/90 text-4xl font-bold mb-2">24h</div>
              <div className="text-white/70">Suporte emergencial</div>
            </div>
            <div className="text-center">
              <div className="text-white/90 text-4xl font-bold mb-2">100%</div>
              <div className="text-white/70">Garantia de serviço</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Onda decorativa na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L60,85.3C120,75,240,53,360,53.3C480,53,600,75,720,90.7C840,107,960,117,1080,112C1200,107,1320,85,1380,74.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
