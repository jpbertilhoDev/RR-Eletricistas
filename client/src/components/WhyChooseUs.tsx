
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useEmblaCarousel } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from "@/lib/utils";

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [animationTriggered, setAnimationTriggered] = useState(false);

  // Inicialização do carousel para mobile
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ]);

  // Estado para controlar a animação
  useEffect(() => {
    if (isInView && !animationTriggered) {
      setAnimationTriggered(true);
    }
  }, [isInView, animationTriggered]);

  // Array com os diferenciais da empresa
  const diferenciais = [
    {
      id: 1,
      title: "Manutenção Preventiva",
      description: "Evite falhas antes que aconteçam com nossas verificações programadas.",
      icon: "tools",
      color: "from-blue-500 to-blue-600",
      iconColor: "text-white",
      cta: "Reduza custos em 60%",
      ctaColor: "bg-blue-50 text-blue-600",
      bgColor: "bg-blue-50/30"
    },
    {
      id: 2,
      title: "Atendimento 24/7",
      description: "Emergências elétricas não esperam. Estamos disponíveis quando você precisar.",
      icon: "clock",
      color: "from-green-500 to-green-600",
      iconColor: "text-white",
      cta: "Suporte imediato",
      ctaColor: "bg-green-50 text-green-600",
      bgColor: "bg-green-50/30"
    },
    {
      id: 3,
      title: "Profissionais Qualificados",
      description: "Técnicos com certificação NR-10 e experiência comprovada.",
      icon: "user-check",
      color: "from-purple-500 to-purple-600",
      iconColor: "text-white",
      cta: "Segurança garantida",
      ctaColor: "bg-purple-50 text-purple-600",
      bgColor: "bg-purple-50/30"
    },
    {
      id: 4,
      title: "Tecnologia Avançada",
      description: "Utilizamos equipamentos modernos para diagnósticos precisos.",
      icon: "cpu",
      color: "from-red-500 to-red-600",
      iconColor: "text-white",
      cta: "Alta precisão",
      ctaColor: "bg-red-50 text-red-600", 
      bgColor: "bg-red-50/30"
    },
    {
      id: 5,
      title: "Garantia de Serviço",
      description: "Todos os nossos serviços possuem garantia estendida.",
      icon: "shield",
      color: "from-amber-500 to-amber-600",
      iconColor: "text-white",
      cta: "Até 12 meses",
      ctaColor: "bg-amber-50 text-amber-600",
      bgColor: "bg-amber-50/30"
    },
    {
      id: 6,
      title: "Soluções Personalizadas",
      description: "Projetos adaptados às suas necessidades específicas.",
      icon: "settings",
      color: "from-blue-500 to-blue-600",
      iconColor: "text-white",
      cta: "Eficiência energética",
      ctaColor: "bg-blue-50 text-blue-600",
      bgColor: "bg-blue-50/30"
    }
  ];

  return (
    <section 
      className="py-8 md:py-16 bg-gradient-to-b from-white to-gray-50" 
      id="diferenciais" 
      ref={containerRef}
    >
      <div className="container mx-auto px-1 lg:px-8 max-w-7xl">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={animationTriggered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-3xl font-bold text-dark-blue mb-4">Por Que Escolher a <span className="text-blue-600">R.R Manutenções</span>?</h2>
          <p className="text-deep-blue/70 max-w-3xl mx-auto text-[10px] md:text-base px-2">
            Conheça os diferenciais que nos destacam no mercado.
          </p>
        </motion.div>
        
        {/* Versão desktop: Grid de cards com altura fixa e layout consistente */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mt-8">
          {diferenciais.map((item, index) => (
            <motion.div 
              key={item.id}
              className={cn(
                "rounded-xl p-6 border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all duration-300",
                item.bgColor,
                "flex flex-col h-[220px]" // Altura fixa para todos os cards
              )}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={animationTriggered ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm`}>
                    <i className={`fas fa-${item.icon} ${item.iconColor} text-sm`}></i>
                  </div>
                  <h3 className="font-bold text-dark-blue text-lg">{item.title}</h3>
                </div>
                
                <p className="text-deep-blue/80 mb-4 flex-grow">
                  {item.description}
                </p>
                
                <div className="mt-auto"> {/* Coloca os botões sempre alinhados na parte inferior */}
                  <span className={`inline-block py-1 px-3 rounded-full text-xs font-medium ${item.ctaColor}`}>
                    {item.cta}
                  </span>
                </div>
              </div>
              
              {/* Elemento decorativo sutil */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-white/30 to-transparent rounded-full opacity-30"></div>
            </motion.div>
          ))}
        </div>

        {/* Versão mobile otimizada: Carousel automático com visual premium */}
        <div className="md:hidden">
          <div className="overflow-hidden mx-auto relative max-w-[85%] px-0" ref={emblaRef}>
            <div className="flex">
              {diferenciais.map((item) => (
                <div className="flex-[0_0_100%] min-w-0 max-w-[100%] px-0.5" key={item.id}>
                  <motion.div 
                    className="bg-white border border-gray-100 rounded-md p-1 shadow-sm relative overflow-hidden h-full transform transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    
                    {/* Layout mais compacto para mobile */}
                    <div className="relative z-10">
                      <div className="flex items-start gap-0.5 mb-0.5">
                        <div className={`w-3 h-3 mt-0.5 bg-gradient-to-br ${item.color} rounded-md flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          <i className={`fas fa-${item.icon} ${item.iconColor} text-[6px]`}></i>
                        </div>
                        <h3 className="font-bold text-dark-blue text-[10px] leading-tight ml-0.5">{item.title}</h3>
                      </div>
                      
                      <p className="text-deep-blue/80 text-[8px] line-clamp-2 ml-3.5">
                        {item.description}
                      </p>
                      
                      <div className="mt-0.5 ml-3.5">
                        <span className={`inline-block py-0.5 px-1 rounded-full text-[6px] font-medium ${item.ctaColor}`}>
                          {item.cta}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Certifique-se de importar o useState
import { useState } from "react";
