import { NAVIGATION_ITEMS } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const MobileNavigation = () => {
  const activeSection = useActiveSection();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });

      // Evita cliques múltiplos durante a animação
      document.body.style.pointerEvents = "none";
      setTimeout(() => {
        document.body.style.pointerEvents = "auto";
      }, 800);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur">
      <div className="grid grid-cols-4 px-1 py-1.5">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex flex-col items-center py-2 outline-none relative",
                isActive ? "text-primary" : "text-blue-900"
              )}
            >
              {/* Indicador de ativo */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-b-lg"></div>
              )}
              
              <i className={`${item.icon} text-base mb-1`}></i>
              <span className="text-[10px] leading-tight font-medium truncate w-full text-center">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
