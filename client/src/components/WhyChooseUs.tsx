
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { WHYCHOOSEUS } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();
  const [selectedCard, setSelectedCard] = useState(0);
  
  // Configuração do carousel para mobile
  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    dragFree: true
  }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);

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

  // Diferenciais baseados na imagem
  const diferenciais = [
    {
      id: 1,
      icon: "certificate",
      title: "Profissionais Certificados",
      description: "Nossa equipe é composta por eletricistas com formação técnica e certificações atualizadas.",
      benefit: "Segurança garantida"
    },
    {
      id: 2,
      icon: "bolt",
      title: "Atendimento Rápido",
      description: "Respondemos rapidamente às suas necessidades, com pronto atendimento para emergências.",
      benefit: "Resolução em até 24h"
    },
    {
      id: 3,
      icon: "shield-alt",
      title: "Garantia de Serviço",
      description: "Todos os nossos serviços incluem garantia e suporte contínuo após a conclusão.",
      benefit: "Garantia de 1 ano"
    },
    {
      id: 4,
      icon: "file-invoice-dollar",
      title: "Orçamento Transparente",
      description: "Oferecemos orçamentos detalhados e transparentes, sem surpresas ou custos ocultos.",
      benefit: "Sem surpresas no final"
    },
    {
      id: 5,
      icon: "hard-hat",
      title: "Segurança em Primeiro",
      description: "Trabalhamos seguindo os mais rigorosos padrões de segurança em todas as instalações.",
      benefit: "Proteção para sua família"
    },
    {
      id: 6,
      icon: "tools",
      title: "Equipamentos Modernos",
      description: "Utilizamos ferramentas e equipamentos de última geração para diagnósticos precisos e soluções eficientes.",
      benefit: "Tecnologia avançada"
    }
  ];

  return (
    <section id="diferenciais" ref={sectionRef} className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Elementos decorativos mais sutis */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full opacity-30 -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full opacity-30 translate-y-1/2 -translate-x-1/4 blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <motion.span 
            className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            Por que nos escolher
          </motion.span>

          <motion.h2 
            className="text-dark-blue text-2xl md:text-3xl font-bold mt-3 mb-2 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nossos diferenciais
          </motion.h2>

          <motion.p 
            className="text-deep-blue max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Conte com especialistas que se importam com sua segurança elétrica.
          </motion.p>
        </div>

        {/* Versão desktop: Grid */}
        {!isMobile && (
          <motion.div 
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {diferenciais.map((item) => (
              <motion.div 
                key={item.id}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)" }}
              >
                <div className="flex flex-col items-start relative z-10">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <i className={`fas fa-${item.icon} text-primary text-lg`}></i>
                  </div>

                  <h3 className="font-bold text-dark-blue text-lg mb-2">{item.title}</h3>
                  <p className="text-deep-blue text-sm mb-4">{item.description}</p>

                  <div className="mt-auto pt-3 border-t border-gray-100 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-medium text-sm">
                        {item.benefit}
                      </span>
                      <motion.div 
                        className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <i className="fas fa-arrow-right text-primary text-xs"></i>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Versão mobile: Carousel minimalista */}
        {isMobile && (
          <div className="mb-8">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex touch-pan-y">
                {diferenciais.map((item, index) => (
                  <div className="flex-[0_0_90%] min-w-0 pl-4 first:pl-0" key={item.id}>
                    <motion.div 
                      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden h-full"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className={`fas fa-${item.icon} text-primary text-sm`}></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-dark-blue text-lg">{item.title}</h3>
                          <p className="text-deep-blue text-sm mt-1 line-clamp-2">{item.description}</p>
                          <p className="text-blue-600 font-medium text-xs mt-2">{item.benefit}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Indicadores de slide */}
            <div className="flex justify-center mt-4 space-x-1.5">
              {diferenciais.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${index === selectedCard ? 'bg-blue-600' : 'bg-gray-300'}`}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: index === selectedCard ? 1 : 0.5 }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pergunta ao cliente usando PNL - Versão simplificada para mobile */}
        <motion.div 
          className="mt-10 md:mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-12 shadow-md relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {/* Decoração de fundo mais sutil */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-blue-500/10"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-blue-500/10"></div>
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.h3 
              className="text-white text-xl md:text-3xl font-bold mb-3 md:mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isMobile ? "Segurança elétrica sem preocupações" : "Você já imaginou como seria viver sem preocupações com a segurança elétrica da sua casa ou empresa?"}
            </motion.h3>

            <motion.p 
              className={`text-white/90 mb-4 md:mb-8 ${isMobile ? 'text-sm' : 'text-lg'}`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {isMobile 
                ? "Transforme sua experiência com instalações elétricas seguras e profissionais." 
                : "Assim como muitos dos nossos clientes satisfeitos, você também merece ter tranquilidade e confiança nas suas instalações elétricas. Quando você escolhe a RR Manutenções Elétricas, está dando o primeiro passo para transformar sua relação com a eletricidade."
              }
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
            >
              <a
                href={`https://wa.me/+5511972650865?text=Olá! Gostaria de saber mais sobre os serviços da RR Manutenções Elétricas.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white text-primary hover:bg-gray-50 font-medium transition-colors w-full sm:w-auto text-center ${isMobile ? 'px-4 py-3 rounded-lg text-sm' : 'px-8 py-4 rounded-lg shadow-md'}`}
              >
                <i className="fab fa-whatsapp mr-2 text-green-600"></i>
                {isMobile ? "Falar agora" : "Quero mais segurança agora"}
              </a>

              {!isMobile && (
                <a
                  href="#contato"
                  className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium transition-colors w-full sm:w-auto text-center"
                >
                  <i className="fas fa-phone-alt mr-2"></i>
                  Solicitar ligação
                </a>
              )}
            </motion.div>

            {!isMobile && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 text-white/80 text-sm"
              >
                Já atendemos mais de 500 clientes com 100% de satisfação comprovada
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
