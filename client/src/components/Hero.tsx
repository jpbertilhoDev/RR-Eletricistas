import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(heroRef);
  const [textIndex, setTextIndex] = useState(0);
  
  const heroTexts = [
    "Serviços Elétricos com Qualidade e Precisão",
    "Soluções Completas para sua Segurança Elétrica",
    "Eletricistas Profissionais à sua Disposição"
  ];

  useEffect(() => {
    // Animação para trocar os textos a cada 5 segundos
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section 
      id="inicio" 
      ref={heroRef}
      className="pt-28 pb-16 md:pt-36 md:pb-24 bg-primary overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-10 text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Serviços Elétricos com Qualidade e Segurança
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Especialistas em instalações e manutenções elétricas residenciais e comerciais com mais de 10 anos de experiência.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-6 py-3"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Solicitar orçamento
                </Button>
              </a>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto px-6 py-3"
                onClick={() => {
                  const servicesSection = document.getElementById("servicos");
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Ver serviços
              </Button>
            </div>
            
            <div className="flex items-center mt-8">
              <div className="flex text-yellow-400 mr-2">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <span className="text-white text-sm">5.0 no Google (102+ avaliações)</span>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=450&q=80" 
                alt="Eletricista profissional trabalhando" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
              
              <div className="absolute -bottom-4 right-4 bg-white py-2 px-4 rounded-lg shadow-md">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 text-green-800 font-semibold text-xs px-2 py-1 rounded">
                    24h
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    Atendimento Emergencial
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicadores simplificados */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
          {[
            { value: "10+", label: "Anos de experiência" },
            { value: "500+", label: "Clientes satisfeitos" },
            { value: "100%", label: "Garantia de serviço" },
            { value: "24/7", label: "Suporte técnico" }
          ].map((item, index) => (
            <div key={index} className="text-center bg-blue-800/50 py-3 px-2 rounded-lg">
              <div className="text-white text-2xl font-bold mb-1">
                {item.value}
              </div>
              <div className="text-white/80 text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Separador simples */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-white"></div>
    </section>
  );
};

export default Hero;
