
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
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

  // Diferenciais com design minimalista
  const diferenciais = [
    {
      id: 1,
      icon: "certificate",
      title: "Profissionais Certificados",
      description: "Equipe técnica com certificações atualizadas.",
      benefit: "Segurança garantida"
    },
    {
      id: 2,
      icon: "bolt",
      title: "Atendimento Rápido",
      description: "Respondemos às suas emergências com prioridade.",
      benefit: "Resolução em até 24h"
    },
    {
      id: 3,
      icon: "shield-alt",
      title: "Garantia de Serviço",
      description: "Todos os serviços incluem garantia e suporte contínuo.",
      benefit: "Garantia de 1 ano"
    },
    {
      id: 4,
      icon: "file-invoice-dollar",
      title: "Orçamento Transparente",
      description: "Sem surpresas ou custos ocultos no final.",
      benefit: "Previsibilidade total"
    },
    {
      id: 5,
      icon: "hard-hat",
      title: "Segurança em Primeiro",
      description: "Seguimos rigorosos padrões de segurança.",
      benefit: "Proteção para sua família"
    },
    {
      id: 6,
      icon: "tools",
      title: "Equipamentos Modernos",
      description: "Ferramentas de última geração para diagnósticos precisos.",
      benefit: "Tecnologia avançada"
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
            className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full inline-block"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            Por que nos escolher
          </motion.span>

          <motion.h2 
            className="text-dark-blue text-xl md:text-3xl font-bold mt-2 mb-2 md:mb-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nossos diferenciais
          </motion.h2>

          <motion.p 
            className="text-deep-blue max-w-2xl mx-auto text-xs md:text-base px-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Conte com especialistas que se importam com sua segurança elétrica.
          </motion.p>
        </div>

        {/* Display para desktop e tablet - Layout em Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diferenciais.map((item) => (
            <motion.div 
              key={item.id}
              className="group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full border border-gray-100 hover:border-blue-100 relative">
                {/* Decoração sutil no fundo do card */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                {/* Conteúdo do card */}
                <div className="p-6 flex flex-col h-full relative z-10">
                  {/* Ícone com animação sutil */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className={`fas fa-${item.icon} text-primary text-lg`}></i>
                  </div>
                  
                  {/* Título e descrição */}
                  <h3 className="font-bold text-dark-blue text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                  <p className="text-deep-blue/70 text-sm mb-4">{item.description}</p>
                  
                  {/* Rodapé do card com benefício destacado */}
                  <div className="mt-auto pt-3 border-t border-gray-100 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-medium text-sm">
                        {item.benefit}
                      </span>
                      <motion.div 
                        className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2, backgroundColor: "#e6f0ff" }}
                      >
                        <i className="fas fa-arrow-right text-primary text-xs"></i>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Versão mobile otimizada: Carousel compacto com layout melhorado */}
        <div className="md:hidden">
          <div className="overflow-hidden px-4" ref={emblaRef}>
            <div className="flex">
              {diferenciais.map((item) => (
                <div className="flex-[0_0_90%] min-w-0 mr-4" key={item.id}>
                  <motion.div 
                    className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden h-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Elemento decorativo sutil */}
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-50 rounded-full opacity-30"></div>
                    
                    {/* Layout vertical mais compacto para mobile */}
                    <div className="relative z-10">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                          <i className={`fas fa-${item.icon} text-primary text-xs`}></i>
                        </div>
                        <h3 className="font-semibold text-dark-blue text-sm">{item.title}</h3>
                      </div>
                      
                      <div className="pl-11">
                        <p className="text-deep-blue/70 text-xs mb-2 line-clamp-2">{item.description}</p>
                        <p className="text-blue-600 font-medium text-xs">{item.benefit}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicadores de slide melhorados */}
          <div className="flex justify-center mt-3 space-x-1.5">
            {diferenciais.map((_, index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300"
                whileHover={{ scale: 1.5, backgroundColor: "#3b82f6" }}
              />
            ))}
          </div>
        </div>

        {/* Call to Action otimizado para mobile */}
        <motion.div 
          className="mt-10 md:mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 md:p-10 shadow-md relative overflow-hidden"
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
              className="text-white text-lg md:text-2xl font-bold mb-2 md:mb-4 px-2"
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Segurança elétrica sem preocupações
            </motion.h3>

            <motion.p 
              className="text-white/90 mb-4 md:mb-6 text-xs md:text-base px-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Transforme sua experiência com instalações elétricas seguras e profissionais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 px-2"
            >
              <a
                href={`https://wa.me/+5511972650865?text=Olá! Gostaria de saber mais sobre os serviços da RR Manutenções Elétricas.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary hover:bg-gray-50 font-medium transition-all w-full sm:w-auto text-center px-5 py-2.5 rounded-lg text-sm md:text-base shadow-sm hover:shadow-md"
              >
                <i className="fab fa-whatsapp mr-2 text-green-600"></i>
                Falar agora
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
