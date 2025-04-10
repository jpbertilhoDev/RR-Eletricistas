
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const MOBILE_NAV_ITEMS = [
  { id: "inicio", label: "Início", icon: "fas fa-home" },
  { id: "apresentacao", label: "Apresentação", icon: "fas fa-play" },
  { id: "depoimentos", label: "Clientes", icon: "fas fa-users" },
  { id: "quem-somos", label: "Sobre", icon: "fas fa-building" },
  { id: "contato", label: "Contato", icon: "fas fa-envelope" },
];

const MobileNavigation = () => {
  const activeSection = useActiveSection();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
      document.body.style.pointerEvents = "none";
      setTimeout(() => {
        document.body.style.pointerEvents = "auto";
      }, 800);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 border-t border-gray-100 backdrop-blur-sm">
      <div className="grid grid-cols-6 px-2 py-3">
        {MOBILE_NAV_ITEMS.map((item) => {
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
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-primary rounded-b-lg"/>
              )}
              <i className={`${item.icon} text-sm mb-1`}></i>
              <span className="text-[10px] font-medium truncate w-full text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
