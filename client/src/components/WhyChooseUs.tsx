import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

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
      color: "from-blue-500 to-blue-600",
      iconColor: "text-white",
      cta: "Reduz custos em 60%",
      ctaColor: "bg-blue-100 text-blue-700 hover:bg-green-100 hover:text-green-700",
      bgColor: "bg-white"
    },
    {
      id: "atendimento",
      title: "Atendimento 24/7",
      description: "Emergências elétricas não esperam. Estamos disponíveis quando você precisar.",
      icon: "clock",
      color: "from-green-500 to-green-600",
      iconColor: "text-white",
      cta: "Suporte imediato",
      ctaColor: "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800",
      bgColor: "bg-white"
    },
    {
      id: "profissionais",
      title: "Profissionais Qualificados",
      description: "Técnicos com certificação NR-10 e experiência comprovada.",
      icon: "certificate",
      color: "from-purple-500 to-purple-600",
      iconColor: "text-white",
      cta: "Segurança garantida",
      ctaColor: "bg-purple-100 text-purple-700 hover:bg-green-100 hover:text-green-700",
      bgColor: "bg-white"
    },
    {
      id: "tecnologia",
      title: "Tecnologia Avançada",
      description: "Utilizamos equipamentos modernos para diagnósticos precisos.",
      icon: "microchip",
      color: "from-red-500 to-red-600",
      iconColor: "text-white",
      cta: "Alta precisão",
      ctaColor: "bg-red-100 text-red-700 hover:bg-green-100 hover:text-green-700",
      bgColor: "bg-white"
    },
    {
      id: "garantia",
      title: "Garantia de Serviço",
      description: "Todos os nossos serviços possuem garantia estendida.",
      icon: "award",
      color: "from-amber-500 to-amber-600",
      iconColor: "text-white",
      cta: "Até 12 meses",
      ctaColor: "bg-amber-100 text-amber-700 hover:bg-green-100 hover:text-green-700",
      bgColor: "bg-white"
    },
    {
      id: "solucoes",
      title: "Soluções Personalizadas",
      description: "Projetos adaptados às suas necessidades específicas.",
      icon: "bolt",
      color: "from-blue-500 to-blue-600",
      iconColor: "text-white",
      cta: "Eficiência energética",
      ctaColor: "bg-blue-100 text-blue-700 hover:bg-green-100 hover:text-green-700",
      bgColor: "bg-blue-50/30"
    }
  ];

  return (
    <section 
      className="py-8 md:py-16 bg-gradient-to-b from-white to-gray-50" 
      id="diferenciais" 
      ref={containerRef}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div 
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={animationTriggered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1.5 rounded-full inline-block shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={animationTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            NOSSOS DIFERENCIAIS
          </motion.span>

          <motion.h2 
            className="text-dark-blue text-3xl md:text-4xl font-bold mt-4 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={animationTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Por Que Escolher a <span className="text-blue-600">R.R</span>?
          </motion.h2>

          <motion.p 
            className="text-deep-blue max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={animationTriggered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Qualidade, confiança e segurança são nossa garantia. Veja o que nos destaca no mercado:
          </motion.p>
        </motion.div>

        {/* Desktop version: Grid layout with 3 cards per row */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {diferenciais.map((item, index) => (
            <motion.div 
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={animationTriggered ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-md bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm mr-3`}>
                    <i className={`fas fa-${item.icon} ${item.iconColor} text-lg`}></i>
                  </div>
                  <h3 className="font-bold text-dark-blue text-lg">{item.title}</h3>
                </div>

                <p className="text-deep-blue/80 mb-4">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <span className={`inline-flex items-center py-1.5 px-3 rounded-md text-xs font-medium bg-gray-50 text-blue-700 border border-gray-100 transition-all duration-300 hover:bg-blue-50 hover:border-blue-100 cursor-pointer`}>
                    <i className={`fas fa-check-circle text-blue-500 mr-1.5 text-xs`}></i>
                    {item.cta}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile version: Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {diferenciais.map((item) => (
                <CarouselItem key={item.id} className="pl-4 pr-4 basis-full">
                  <motion.div 
                    className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm relative overflow-hidden h-full hover:border-blue-100"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center mb-3">
                        <div className={`w-10 h-10 rounded-md bg-gradient-to-br ${item.color} flex items-center justify-center shadow-sm mr-3`}>
                          <i className={`fas fa-${item.icon} ${item.iconColor} text-sm`}></i>
                        </div>
                        <h3 className="font-bold text-dark-blue text-lg">{item.title}</h3>
                      </div>

                      <p className="text-deep-blue/80 mb-4 text-sm">
                        {item.description}
                      </p>

                      <div className="mt-3">
                        <span className={`inline-flex items-center py-1 px-2.5 rounded-md text-xs font-medium bg-gray-50 text-blue-700 border border-gray-100 transition-all duration-300 hover:bg-blue-50 hover:border-blue-100 cursor-pointer`}>
                          <i className={`fas fa-check-circle text-blue-500 mr-1.5 text-xs`}></i>
                          {item.cta}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;