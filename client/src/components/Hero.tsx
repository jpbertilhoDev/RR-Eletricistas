import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(heroRef);
  const controls = useAnimation();
  const [textIndex, setTextIndex] = useState(0);
  
  const heroTexts = [
    "Serviços Elétricos com Qualidade e Precisão",
    "Soluções Completas para sua Segurança Elétrica",
    "Eletricistas Profissionais à sua Disposição"
  ];

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    
    // Animação para trocar os textos a cada 5 segundos
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [controls, heroTexts.length]);
  
  // Elementos decorativos animados
  const decorationItems = [
    { size: 60, top: "15%", left: "8%", delay: 0, duration: 15 },
    { size: 120, top: "60%", left: "5%", delay: 0.5, duration: 20 },
    { size: 40, top: "20%", right: "10%", delay: 0.2, duration: 12 },
    { size: 90, top: "65%", right: "8%", delay: 0.7, duration: 18 },
  ];

  return (
    <section 
      id="inicio" 
      ref={heroRef}
      className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-primary to-blue-900 overflow-hidden"
    >
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px] pointer-events-none"></div>
      
      {/* Elementos decorativos flutuantes */}
      {decorationItems.map((item, index) => (
        <motion.div
          key={index}
          className="circle-decoration animate-float absolute hidden md:block"
          style={{
            width: item.size,
            height: item.size,
            top: item.top,
            left: item.left,
            right: item.right,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: item.delay }}
        />
      ))}
      
      {/* Efeito de partículas elétricas */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-10 bg-blue-300 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.5 + Math.random(),
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <div className="h-24 md:h-32 overflow-hidden relative">
              {heroTexts.map((text, idx) => (
                <motion.h1 
                  key={idx}
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight absolute w-full"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ 
                    y: idx === textIndex ? 0 : 50, 
                    opacity: idx === textIndex ? 1 : 0 
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeOut" 
                  }}
                >
                  {text}
                </motion.h1>
              ))}
            </div>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.span className="animate-typing inline-block border-r-2 border-primary">
                Especialistas em instalações e manutenções elétricas residenciais e comerciais.
              </motion.span>
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
                  className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto px-8 py-6 text-lg animate-pulse-slow"
                >
                  <i className="fab fa-whatsapp text-xl mr-2"></i>
                  Falar com eletricista
                </Button>
              </a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
          </motion.div>
          
          <motion.div 
            className="relative w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Efeito de brilho */}
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-2xl blur-xl"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            
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
              className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white py-3 px-6 rounded-full shadow-xl flex items-center space-x-4 z-20 animate-bounce-slow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <span className="text-primary font-semibold">Empresa Certificada</span>
              <div className="flex items-center">
                <motion.i 
                  className="fas fa-certificate text-yellow-500 mr-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                ></motion.i>
                <motion.i 
                  className="fas fa-shield-alt text-primary mr-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.i>
                <motion.i 
                  className="fas fa-check-circle text-green-600"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.i>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Indicadores de confiança */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { value: "10+", label: "Anos de experiência", delay: 0 },
              { value: "500+", label: "Clientes satisfeitos", delay: 0.1 },
              { value: "24h", label: "Suporte emergencial", delay: 0.2 },
              { value: "100%", label: "Garantia de serviço", delay: 0.3 }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + item.delay }}
              >
                <motion.div 
                  className="text-white/90 text-4xl font-bold mb-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + item.delay }}
                >
                  {item.value}
                </motion.div>
                <div className="text-white/70">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Onda decorativa na parte inferior */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <motion.path 
            fill="#ffffff" 
            fillOpacity="1"
            d="M0,96L60,85.3C120,75,240,53,360,53.3C480,53,600,75,720,90.7C840,107,960,117,1080,112C1200,107,1320,85,1380,74.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
