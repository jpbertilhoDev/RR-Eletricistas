
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isInView && !animationTriggered) {
      setAnimationTriggered(true);
    }
  }, [isInView, animationTriggered]);

  const diferenciais = [
    {
      id: "preventiva",
      title: "Manutenção Preventiva",
      description: "Evite falhas antes que aconteçam com nossas verificações programadas.",
      icon: "shield",
      cta: "Reduz custos em 60%",
    },
    {
      id: "atendimento",
      title: "Atendimento 24/7",
      description: "Emergências elétricas não esperam. Estamos disponíveis quando você precisar.",
      icon: "clock",
      cta: "Suporte imediato",
    },
    {
      id: "profissionais",
      title: "Profissionais Qualificados",
      description: "Técnicos com certificação NR-10 e experiência comprovada.",
      icon: "certificate",
      cta: "Segurança garantida",
    },
    {
      id: "tecnologia",
      title: "Tecnologia Avançada",
      description: "Utilizamos equipamentos modernos para diagnósticos precisos.",
      icon: "microchip",
      cta: "Alta precisão",
    },
    {
      id: "garantia",
      title: "Garantia de Serviço",
      description: "Todos os nossos serviços possuem garantia estendida.",
      icon: "award",
      cta: "Até 12 meses",
    },
    {
      id: "solucoes",
      title: "Soluções Personalizadas",
      description: "Projetos adaptados às suas necessidades específicas.",
      icon: "bolt",
      cta: "Eficiência energética",
    }
  ];

  return (
    <section 
      className="py-10 bg-gradient-to-b from-gray-50 to-white" 
      id="diferenciais" 
      ref={containerRef}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={animationTriggered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-blue-600 font-medium text-xs md:text-sm tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full inline-block shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={animationTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            NOSSOS DIFERENCIAIS
          </motion.span>

          <motion.h2 
            className="text-dark-blue text-2xl md:text-3xl font-bold mt-3 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={animationTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Por Que Escolher a <span className="text-blue-600">R.R</span>?
          </motion.h2>

          <motion.p 
            className="text-deep-blue/80 max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={animationTriggered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Qualidade, confiança e segurança são nossa garantia.
          </motion.p>
        </motion.div>

        {/* Desktop version */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {diferenciais.map((item, index) => (
              <motion.div 
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={animationTriggered ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex p-4">
                  <div className="mr-4 flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <i className={`fas fa-${item.icon} text-blue-500`}></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                    <div className="text-xs text-blue-600 font-medium">
                      <i className="fas fa-check-circle mr-1"></i>
                      {item.cta}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile version */}
        <div className="md:hidden">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {diferenciais.map((item, index) => (
                <CarouselItem key={item.id} className="basis-full sm:basis-1/2">
                  <div className="p-1">
                    <motion.div 
                      className="bg-white rounded-lg shadow-sm border border-gray-100 h-full p-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                          <i className={`fas fa-${item.icon} text-blue-500 text-xs`}></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                          <p className="text-gray-600 text-xs mb-1 line-clamp-2">{item.description}</p>
                          <div className="text-xs text-blue-600 font-medium flex items-center">
                            <i className="fas fa-check-circle mr-1 text-[10px]"></i>
                            <span className="text-[10px]">{item.cta}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-2">
              <div className="flex space-x-1">
                {diferenciais.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
