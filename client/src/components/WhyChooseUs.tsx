
import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useAnimateOnScroll } from '@/hooks/useAnimateOnScroll';

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationTriggered = useAnimateOnScroll(containerRef, 0.1);

  // Configuração do carousel com autoplay para mobile
  const [emblaRef] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: true
  }, [
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ]);

  // Array de diferenciais
  const diferenciais = [
    {
      id: 1,
      title: 'Manutenção Preventiva',
      description: 'Evite falhas antes que aconteçam com nossas verificações programadas.',
      benefit: 'Reduz custos em 60%',
      icon: 'shield-alt',
      iconColor: 'text-white',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'Atendimento 24/7',
      description: 'Emergências elétricas não esperam. Estamos disponíveis quando você precisar.',
      benefit: 'Suporte imediato',
      icon: 'clock',
      iconColor: 'text-white',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      title: 'Profissionais Qualificados',
      description: 'Técnicos com certificação NR-10 e experiência comprovada.',
      benefit: 'Segurança garantida',
      icon: 'user-tie',
      iconColor: 'text-white',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      title: 'Tecnologia Avançada',
      description: 'Utilizamos equipamentos modernos para diagnósticos precisos.',
      benefit: 'Alta precisão',
      icon: 'microchip',
      iconColor: 'text-white',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 5,
      title: 'Garantia de Serviço',
      description: 'Todos os nossos serviços possuem garantia estendida.',
      benefit: 'Até 12 meses',
      icon: 'award',
      iconColor: 'text-white',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 6,
      title: 'Soluções Personalizadas',
      description: 'Projetos adaptados às suas necessidades específicas.',
      benefit: 'Eficiência energética',
      icon: 'bolt',
      iconColor: 'text-white',
      color: 'from-blue-700 to-indigo-600',
      bgColor: 'bg-blue-50'
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
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={animationTriggered ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-3xl font-bold text-dark-blue mb-2">Por Que Escolher a <span className="text-blue-600">R.R Manutenções</span>?</h2>
          <p className="text-deep-blue/70 max-w-3xl mx-auto text-[10px] md:text-base px-2">
            Conheça os diferenciais que nos destacam no mercado.
          </p>
        </motion.div>
        
        {/* Versão desktop: Grid de cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {diferenciais.map((item, index) => (
            <motion.div 
              key={item.id}
              className={`rounded-xl p-6 border border-gray-100 shadow-sm relative overflow-hidden hover:shadow-md transition-all duration-300 ${item.bgColor}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={animationTriggered ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-sm`}>
                    <i className={`fas fa-${item.icon} ${item.iconColor}`}></i>
                  </div>
                  <h3 className="font-bold text-dark-blue text-lg ml-3">{item.title}</h3>
                </div>
                
                <p className="text-deep-blue/80 text-sm mb-4 min-h-[2.5rem]">{item.description}</p>
                
                <div className="bg-white inline-block px-3 py-1 rounded-full shadow-sm">
                  <p className="text-blue-700 font-medium text-sm">{item.benefit}</p>
                </div>
              </div>
              
              {/* Decoração visual de fundo */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 bg-gradient-to-br from-blue-400 to-blue-600 blur-xl"></div>
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full opacity-10 bg-gradient-to-br from-blue-500 to-indigo-500 blur-lg"></div>
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
                      
                      <div className="mt-0.5 pl-3.5">
                        <p className="text-deep-blue/80 text-[8px] mb-0.5 line-clamp-2 leading-tight">{item.description}</p>
                        <div className="bg-blue-50 inline-block px-1 py-0.5 rounded-full">
                          <p className="text-blue-700 font-medium text-[7px]">{item.benefit}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Elemento decorativo sutil */}
                    <div className="absolute -bottom-3 -right-3 w-4 h-4 rounded-full opacity-10 bg-gradient-to-br from-blue-400 to-blue-600 blur-md"></div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicadores de navegação para o carousel */}
          <div className="flex justify-center mt-2">
            <div className="w-10 h-0.5 bg-blue-200 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-blue-600 rounded-full animate-slide"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
