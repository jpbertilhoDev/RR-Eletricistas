import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS, WHATSAPP_NUMBER } from "@/lib/constants";

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
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-primary text-2xl">⚡</span>
          <h1 className="text-lg font-bold">RR Manutenções Elétricas</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:flex"
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
