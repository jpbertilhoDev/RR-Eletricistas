import { useState, useEffect } from "react";

// Hook personalizado para gerenciar animações responsivas
export function useResponsiveAnimation() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Verificar preferência de movimento reduzido
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    // Atualizar quando a preferência mudar
    mediaQuery.addEventListener("change", handleReducedMotionChange);
    
    // Função para atualizar o estado com base no tamanho da tela
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    // Configurar o evento para quando a tela mudar de tamanho
    window.addEventListener("resize", updateScreenSize);
    
    // Verificar tamanho inicial
    updateScreenSize();
    
    // Limpar eventos ao desmontar
    return () => {
      window.removeEventListener("resize", updateScreenSize);
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  // Retornar configurações de animação baseadas no dispositivo
  return {
    isMobile,
    isTablet,
    isDesktop,
    isReducedMotion,
    
    // Helpers para animações responsivas
    getTransition: (delay = 0) => {
      // Transições mais curtas e suaves para mobile
      if (isMobile) {
        return {
          duration: isReducedMotion ? 0 : 0.3,
          delay: isReducedMotion ? 0 : delay * 0.5,
          ease: "easeOut"
        };
      }
      
      // Transições normais para desktop
      return {
        duration: isReducedMotion ? 0 : 0.5,
        delay: isReducedMotion ? 0 : delay,
        ease: "easeOut"
      };
    },
    
    // Desativar animações complexas em mobile ou quando preferência reduzida
    shouldAnimate: () => {
      return !isReducedMotion;
    },
    
    // Obter variantes responsivas para Framer Motion
    getVariants: (type: "fade" | "slide" | "scale" | "complex") => {
      // Sem animação para quem prefere movimento reduzido
      if (isReducedMotion) {
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 1 }
        };
      }
      
      // Animações mais leves para mobile
      if (isMobile) {
        switch (type) {
          case "fade":
            return {
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            };
          case "slide":
            return {
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            };
          case "scale":
            return {
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 }
            };
          case "complex":
            // Simplificar animações complexas em mobile
            return {
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            };
        }
      }
      
      // Animações completas para desktop
      switch (type) {
        case "fade":
          return {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          };
        case "slide":
          return {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          };
        case "scale":
          return {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
          };
        case "complex":
          return {
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                type: "spring", 
                stiffness: 300, 
                damping: 20
              }
            }
          };
      }
    }
  };
}