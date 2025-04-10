
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Configuração do carousel com autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    dragFree: true,
    slidesToScroll: 1
  }, [AutoPlay({ delay: 3000, stopOnInteraction: false })]);
  
  // Configuração do carousel para desktop
  const [desktopEmblaRef, desktopEmblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    dragFree: true,
    slidesToScroll: 1
  }, [AutoPlay({ delay: 3500, stopOnInteraction: false })]);
  
  const [activeSlide, setActiveSlide] = useState(0);
  
  useEffect(() => {
    if (desktopEmblaApi) {
      desktopEmblaApi.on('select', () => {
        setActiveSlide(desktopEmblaApi.selectedScrollSnap());
      });
    }
    
    return () => {
      if (desktopEmblaApi) {
        desktopEmblaApi.off('select');
      }
    };
  }, [desktopEmblaApi]);

  // Animações
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Diferenciais com design premium e moderno
  const diferenciais = [
    {
      id: 1,
      icon: "certificate",
      title: "Profissionais Certificados",
      description: "Equipe técnica com certificações atualizadas em normas elétricas.",
      benefit: "Segurança garantida",
      color: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      icon: "bolt",
      title: "Atendimento Rápido",
      description: "Respondemos às suas emergências elétricas com máxima prioridade.",
      benefit: "Resolução em até 24h",
      color: "from-yellow-50 to-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      id: 3,
      icon: "shield-alt",
      title: "Garantia de Serviço",
      description: "Todos os serviços incluem garantia e suporte técnico contínuo.",
      benefit: "Garantia de 1 ano",
      color: "from-green-50 to-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      icon: "file-invoice-dollar",
      title: "Orçamento Transparente",
      description: "Sem surpresas ou custos ocultos no orçamento final do seu projeto.",
      benefit: "Previsibilidade total",
      color: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600"
    },
    {
      id: 5,
      icon: "hard-hat",
      title: "Segurança em Primeiro",
      description: "Seguimos rigorosos padrões de segurança para instalações elétricas.",
      benefit: "Proteção para sua família",
      color: "from-red-50 to-red-100",
      iconColor: "text-red-600"
    },
    {
      id: 6,
      icon: "tools",
      title: "Equipamentos Modernos",
      description: "Ferramentas de última geração para diagnósticos elétricos precisos.",
      benefit: "Tecnologia avançada",
      color: "from-cyan-50 to-cyan-100",
      iconColor: "text-cyan-600"
    }
  ];

  return (
    <section id="diferenciais" ref={sectionRef} className="py-8 md:py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Elementos decorativos sutis */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full opacity-20 -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full opacity-20 translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <motion.span 
            className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full inline-block shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            Por que nos escolher
          </motion.span>

          <motion.h2 
            className="text-dark-blue text-xl md:text-4xl font-bold mt-3 mb-3 md:mb-5 px-4 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="relative z-10">Nossos diferenciais</span>
            {/* Efeito de destaque sob o título */}
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-3 w-24 md:w-32 bg-blue-100 rounded-full opacity-70 z-0"></span>
          </motion.h2>

          <motion.p 
            className="text-deep-blue max-w-2xl mx-auto text-sm md:text-base px-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Conte com especialistas que se importam com sua segurança elétrica e oferecem soluções confiáveis.
          </motion.p>
        </div>

        {/* Display para desktop e tablet - Carousel moderno */}
        <div className="hidden md:block relative">
          <div className="overflow-hidden" ref={desktopEmblaRef}>
            <div className="flex">
              {diferenciais.map((item) => (
                <div key={item.id} className="flex-[0_0_33%] min-w-0 px-4">
                  <motion.div 
                    className="group h-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={itemVariants}
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-gray-100 hover:border-blue-200 relative transform hover:-translate-y-1">
                      {/* Decoração sutil no fundo do card */}
                      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      
                      {/* Conteúdo do card */}
                      <div className="p-6 flex flex-col h-full relative z-10">
                        {/* Ícone com animação sutil e cor personalizada */}
                        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <i className={`fas fa-${item.icon} ${item.iconColor} text-lg`}></i>
                        </div>
                        
                        {/* Título e descrição */}
                        <h3 className="font-bold text-dark-blue text-lg mb-3 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                        <p className="text-deep-blue/80 mb-4">{item.description}</p>
                        
                        {/* Rodapé do card com benefício destacado */}
                        <div className="mt-auto pt-3 border-t border-gray-100 w-full">
                          <div className="flex items-center justify-between">
                            <span className="text-blue-600 font-medium">
                              {item.benefit}
                            </span>
                            <motion.div 
                              className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center"
                              whileHover={{ scale: 1.2, backgroundColor: "#e6f0ff" }}
                            >
                              <i className="fas fa-arrow-right text-primary"></i>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicadores de slide melhorados para desktop */}
          <div className="flex justify-center mt-8 space-x-2">
            {diferenciais.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => desktopEmblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSlide === index ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>
          
          {/* Controles de navegação */}
          <button 
            onClick={() => desktopEmblaApi?.scrollPrev()} 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-10 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:bg-blue-50 transition-colors z-10"
            aria-label="Previous slide"
          >
            <i className="fas fa-chevron-left text-blue-600"></i>
          </button>
          <button 
            onClick={() => desktopEmblaApi?.scrollNext()} 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-10 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:bg-blue-50 transition-colors z-10"
            aria-label="Next slide"
          >
            <i className="fas fa-chevron-right text-blue-600"></i>
          </button>
        </div>

        {/* Versão mobile otimizada: Carousel automático com visual premium */}
        <div className="md:hidden">
          <div className="overflow-hidden mx-1 relative rounded-lg" ref={emblaRef}>
            <div className="flex">
              {diferenciais.map((item) => (
                <div className="flex-[0_0_90%] min-w-0 pl-1 pr-1" key={item.id}>
                  <motion.div 
                    className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm relative overflow-hidden h-full transform transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)" }}
                  >
                    {/* Elemento decorativo reduzido */}
                    <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-gradient-to-tr from-blue-100 to-transparent rounded-full opacity-30"></div>
                    
                    {/* Layout mais compacto para mobile */}
                    <div className="relative z-10">
                      <div className="flex items-center mb-1.5">
                        <div className={`w-6 h-6 bg-gradient-to-br ${item.color} rounded-md flex items-center justify-center flex-shrink-0 mr-2 shadow-sm`}>
                          <i className={`fas fa-${item.icon} ${item.iconColor} text-xs`}></i>
                        </div>
                        <h3 className="font-bold text-dark-blue text-xs">{item.title}</h3>
                      </div>
                      
                      <div className="pl-8 mt-1">
                        <p className="text-deep-blue/80 text-xs mb-1.5 line-clamp-2 leading-tight">{item.description}</p>
                        <div className="bg-blue-50 inline-block px-2 py-0.5 rounded-full">
                          <p className="text-blue-700 font-medium text-xs">{item.benefit}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicadores de slide animados - Menor para mobile */}
          <div className="flex justify-center mt-3 space-x-1">
            {diferenciais.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300 hover:bg-blue-500"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
              />
            ))}
          </div>
        </div>

        {/* Call to Action otimizado para mobile */}
        <motion.div 
          className="mt-6 md:mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 md:p-10 shadow-md relative overflow-hidden mx-1 md:mx-0"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {/* Decoração de fundo minimalista */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full border border-white/20"></div>
            <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full border border-white/20"></div>
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.h3 
              className="text-white text-base md:text-2xl font-bold mb-1 md:mb-4 px-1"
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Segurança elétrica sem preocupações
            </motion.h3>

            <motion.p 
              className="text-white/90 mb-3 md:mb-6 text-xs md:text-base px-1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Instalações elétricas seguras e profissionais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 px-1"
            >
              <a
                href={`https://wa.me/+5511972650865?text=Olá! Gostaria de saber mais sobre os serviços da RR Manutenções Elétricas.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary hover:bg-gray-50 font-medium transition-all w-full sm:w-auto text-center px-4 py-2 rounded-lg text-xs md:text-base shadow-sm hover:shadow-md"
              >
                <i className="fab fa-whatsapp mr-1.5 text-green-600"></i>
                Falar agora
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
