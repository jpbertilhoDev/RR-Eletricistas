import { NAVIGATION_ITEMS } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const MobileNavigation = () => {
  const activeSection = useActiveSection();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  // Controlar a visibilidade da barra em dispositivos móveis
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determinar a direção da rolagem
      if (currentScrollY > lastScrollY) {
        // Rolando para baixo
        setIsScrollingUp(false);
        
        // Ocultar a barra apenas se já tivermos rolado uma certa distância
        if (currentScrollY > 200) {
          setIsVisible(false);
        }
      } else {
        // Rolando para cima
        setIsScrollingUp(true);
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  // Variantes de animação
  const navbarVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      }
    },
    exit: { 
      y: 100, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };
  
  // Efeito de onda elétrica
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const startWaveAnimation = () => {
    // Inicia a animação no primeiro item
    setAnimatingIndex(0);
    
    // Progride a animação pelos itens
    const animationInterval = setInterval(() => {
      setAnimatingIndex(prev => {
        if (prev === null || prev >= NAVIGATION_ITEMS.length - 1) {
          clearInterval(animationInterval);
          return null;
        }
        return prev + 1;
      });
    }, 150);
    
    return () => clearInterval(animationInterval);
  };

  // Iniciar a animação quando a barra de navegação aparecer
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(startWaveAnimation, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-2 pt-2 pb-3"
          variants={navbarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Efeito de reflexo/brilho na parte superior */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent">
            <motion.div 
              className="h-full w-20 bg-primary/60"
              animate={{ 
                x: ["-100%", "100%"],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Decoração de círculos elétricos */}
          <div className="absolute -top-3 left-1/4 w-6 h-6 rounded-full bg-primary/5 blur-md"></div>
          <div className="absolute -top-4 right-1/3 w-8 h-8 rounded-full bg-primary/5 blur-md"></div>
          
          {/* Container principal */}
          <div className="relative bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200/70 rounded-2xl py-3 px-2">
            <div className="flex justify-around items-center relative z-10">
              {NAVIGATION_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "flex flex-col items-center px-3 py-1.5 outline-none relative"
                    )}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Background do item ativo */}
                    {isActive && (
                      <motion.div 
                        className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                        layoutId="mobileNavBackground"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    
                    {/* Efeito de onda de animação */}
                    <AnimatePresence>
                      {animatingIndex === index && (
                        <motion.div
                          className="absolute inset-0 bg-primary/20 rounded-xl -z-10"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 0.7 }}
                          exit={{ scale: 1.4, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      )}
                    </AnimatePresence>
                    
                    <motion.div
                      animate={isActive ? {
                        y: [0, -5, 0],
                        transition: { 
                          repeat: Infinity,
                          duration: 2,
                          repeatType: "loop"
                        }
                      } : {}}
                    >
                      <motion.i 
                        className={`${item.icon} text-xl ${isActive ? 'text-primary' : 'text-gray-500'}`}
                        animate={isActive ? { 
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, 0, -5, 0]
                        } : {}}
                        transition={{ 
                          repeat: isActive ? Infinity : 0,
                          duration: 2,
                          repeatType: "loop"
                        }}
                      />
                    </motion.div>
                    
                    <motion.span 
                      className={`text-xs mt-1 font-medium ${isActive ? 'text-primary' : 'text-gray-600'}`}
                      animate={isActive ? { opacity: [0.8, 1, 0.8] } : {}}
                      transition={{ 
                        repeat: isActive ? Infinity : 0,
                        duration: 2,
                        repeatType: "loop"
                      }}
                    >
                      {item.label}
                    </motion.span>
                    
                    {/* Indicador de ativo */}
                    {isActive && (
                      <motion.div 
                        className="absolute -bottom-1 w-1.5 h-1.5 bg-primary rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        layoutId="mobileNavIndicator"
                        transition={{ type: "spring", bounce: 0.5 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
