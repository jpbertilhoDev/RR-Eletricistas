import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WHYCHOOSEUS } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from "swiper";


export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

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
    <section id="diferenciais" ref={sectionRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full opacity-50 -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full opacity-50 translate-y-1/2 -translate-x-1/4 blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.span 
            className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            Por que nos escolher
          </motion.span>

          <motion.h2 
            className="text-dark-blue text-3xl font-bold mt-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nossos diferenciais
          </motion.h2>

          <motion.p 
            className="text-deep-blue max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Imagine ter a tranquilidade de contar com especialistas que realmente se importam com sua segurança.
            Descubra como podemos transformar sua experiência com serviços elétricos.
          </motion.p>
        </div>

        {isMobile ? (
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            {diferenciais.map((item) => (
              <SwiperSlide key={item.id}>
                <motion.div 
                  className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)" }}
                >
                  {/* Elemento decorativo */}
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-50 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

                  <div className="flex flex-col items-start relative z-10">
                    <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                      <i className={`fas fa-${item.icon} text-primary text-xl`}></i>
                    </div>

                    <h3 className="font-bold text-dark-blue text-xl mb-3">{item.title}</h3>
                    <p className="text-deep-blue mb-6">{item.description}</p>

                    <div className="mt-auto pt-4 border-t border-gray-100 w-full">
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
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {diferenciais.map((item) => (
              <motion.div 
                key={item.id}
                className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)" }}
              >
                {/* Elemento decorativo */}
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-50 rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>

                <div className="flex flex-col items-start relative z-10">
                  <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                    <i className={`fas fa-${item.icon} text-primary text-xl`}></i>
                  </div>

                  <h3 className="font-bold text-dark-blue text-xl mb-3">{item.title}</h3>
                  <p className="text-deep-blue mb-6">{item.description}</p>

                  <div className="mt-auto pt-4 border-t border-gray-100 w-full">
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

        {/* Pergunta ao cliente usando PNL */}
        <motion.div 
          className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 md:p-12 shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {/* Decoração de fundo */}
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/20"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-500/20"></div>
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.h3 
              className="text-white text-2xl md:text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Você já imaginou como seria viver sem preocupações com a segurança elétrica da sua casa ou empresa?
            </motion.h3>

            <motion.p 
              className="text-white/90 mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Assim como muitos dos nossos clientes satisfeitos, você também merece ter tranquilidade e confiança nas suas instalações elétricas. Quando você escolhe a RR Manutenções Elétricas, está dando o primeiro passo para transformar sua relação com a eletricidade.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href={`https://wa.me/+5511972650865?text=Olá! Gostaria de saber mais sobre os serviços da RR Manutenções Elétricas.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-lg shadow-md font-medium transition-colors w-full sm:w-auto text-center"
              >
                <i className="fab fa-whatsapp mr-2 text-green-600"></i>
                Quero mais segurança agora
              </a>

              <a
                href="#contato"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium transition-colors w-full sm:w-auto text-center"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                Solicitar ligação
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-white/80 text-sm"
            >
              Já atendemos mais de 500 clientes com 100% de satisfação comprovada
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}