import { useState, useEffect, useRef } from "react";
import { NAVIGATION_ITEMS } from "@/lib/constants";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>(NAVIGATION_ITEMS[0].id);
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Limita a frequência de atualizações para tornar a transição mais suave
      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdateRef.current;
      
      // Se uma atualização foi realizada há menos de 100ms, espera um pouco
      if (timeSinceLastUpdate < 100) {
        if (scrollTimeoutRef.current) {
          window.clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = window.setTimeout(() => {
          updateActiveSection();
          scrollTimeoutRef.current = null;
        }, 100 - timeSinceLastUpdate);
        
        return;
      }
      
      updateActiveSection();
    };
    
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 200; // Offset para melhor UX

      // Obtém todas as seções
      const sections = NAVIGATION_ITEMS.map(item => {
        const element = document.getElementById(item.id);
        return {
          id: item.id,
          offsetTop: element?.offsetTop || 0,
          offsetHeight: element?.offsetHeight || 0
        };
      });

      // Encontra a seção ativa atual
      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, offsetTop } = sections[i];
        if (scrollPosition >= offsetTop) {
          setActiveSection(id);
          lastUpdateRef.current = Date.now();
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Chama uma vez na montagem

    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return activeSection;
}
