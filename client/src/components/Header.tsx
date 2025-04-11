import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS, WHATSAPP_NUMBER } from "@/lib/constants";
import logoSvg from "@/assets/images/logo-rr.svg"; // Import the SVG logo


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Ajustando para uma animação mais suave
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
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-xl shadow-sm py-2" : "bg-transparent py-3"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <div className="flex-shrink-0 flex items-center justify-center relative">
          <img 
            src={logoSvg} 
            alt="RR Manutenções Elétricas" 
            className="h-8 md:h-16 w-auto object-contain -mt-1 md:mt-0"
          />
        </div>

        <nav className="hidden md:flex justify-center flex-1 px-4">
          <div className="flex space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:block flex-shrink-0"
        >
          <Button variant="whatsapp" size="default" className="flex items-center space-x-2">
            <i className="fab fa-whatsapp"></i>
            <span>Fale conosco</span>
          </Button>
        </a>
      </div>
    </header>
  );
};

export default Header;