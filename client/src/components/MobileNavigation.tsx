import { useState } from "react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const MobileNavigation = () => {
  const activeSection = useActiveSection();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // Adicionamos um item fictício para o botão "mais"
  const moreButton = { id: "more", icon: "fas fa-ellipsis-h", label: "Mais" };
  // Usamos 4 itens principais + botão "mais"
  const mainNavItems = [...NAVIGATION_ITEMS.slice(0, 4), moreButton];
  const moreNavItems = NAVIGATION_ITEMS.slice(4);

  const scrollToSection = (id: string) => {
    // Se o botão "mais" for clicado, abrimos/fechamos o menu
    if (id === "more") {
      setShowMoreMenu(!showMoreMenu);
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });

      // Fechamos o menu "mais" se estiver aberto
      setShowMoreMenu(false);

      // Evita cliques múltiplos durante a animação
      document.body.style.pointerEvents = "none";
      setTimeout(() => {
        document.body.style.pointerEvents = "auto";
      }, 800);
    }
  };

  // Variantes para animação do menu "mais"
  const menuVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white">
      {/* Menu "mais" */}
      <AnimatePresence>
        {showMoreMenu && (
          <motion.div 
            className="absolute bottom-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg rounded-t-xl overflow-hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-center items-center p-2 border-b border-gray-100">
              <button 
                onClick={() => setShowMoreMenu(false)}
                className="text-gray-500 text-sm flex items-center"
              >
                <i className="fas fa-times mr-1"></i>
                Fechar
              </button>
            </div>
            <div className="flex flex-wrap justify-around px-2 py-1">
              {moreNavItems.map((item) => {
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "flex flex-col items-center py-3 px-4 outline-none relative",
                      isActive ? "text-primary" : "text-gray-600"
                    )}
                  >
                    <i className={`${item.icon} text-lg mb-1`}></i>
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu principal */}
      <div className="flex justify-between items-center px-1 border-t border-gray-200 shadow-lg">
        {mainNavItems.map((item) => {
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex flex-col items-center py-3 px-1 outline-none relative w-1/5",
                isActive ? "text-primary" : "text-gray-600"
              )}
            >
              {/* Indicador de ativo */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-primary rounded-b-lg"></div>
              )}
              
              <i className={`${item.icon} text-lg sm:text-xl mb-1`}></i>
              <span className="text-xs font-medium truncate w-full text-center">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
