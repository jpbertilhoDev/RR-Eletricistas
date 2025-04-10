import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SERVICES, WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { useIsMobile } from "@/hooks/use-mobile";

// Importar todas as imagens de serviços
import img1 from "@/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.35.06.jpeg";
import img2 from "@/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.35.40.jpeg";
import img3 from "@/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.35.41.jpeg";
import img4 from "@/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.36.19.jpeg";
import img5 from "@/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.37.29.jpeg";
import img6 from "@/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.37.30.jpeg";

// Mapa para associar os caminhos das imagens aos arquivos importados
const imageMap: Record<string, string> = {
  "/src/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.35.06.jpeg": img1,
  "/src/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.35.40.jpeg": img2,
  "/src/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.35.41.jpeg": img3,
  "/src/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.36.19.jpeg": img4,
  "/src/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.36.20.jpeg": img5,
  "./src/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.37.29.jpeg": img5,
  "./src/assets/images/servicos/WhatsApp Image 2025-04-10 at 13.37.30.jpeg": img6,
};

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const isMobile = useIsMobile();
  useAnimateOnScroll(sectionRef);
  
  // Animação baseada no scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [20, 0, 0, 20]);

  // Variantes para os cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: { 
      y: -8,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2), 0 8px 10px -6px rgba(59, 130, 246, 0.2)",
      borderColor: "rgba(59, 130, 246, 0.4)",
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };
  
  // Variante para ícones
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { 
      scale: 1.15,
      rotate: [0, 5, -5, 0],
      transition: { repeat: 0, duration: 0.5 }
    }
  };

  // Variante para o título
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };
  
  // Variante para o texto
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.4, delay: 0.3 }
    }
  };

  // Variantes para o overlay da imagem
  const imageOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Handler para interação com cards (funciona tanto para hover em desktop quanto para toque em mobile)
  const handleCardInteraction = (id: number, isEntering: boolean) => {
    if (isEntering) {
      setActiveCard(id);
    } else if (activeCard === id) {
      setActiveCard(null);
    }
  };

  return (
    <section id="servicos" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Elementos decorativos sutis */}
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-50 opacity-50 blur-3xl"
        style={{ opacity, y }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-50 opacity-50 blur-3xl"
        style={{ opacity }}
      />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div 
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center">
            <motion.span 
              className="text-blue-600 font-medium text-sm tracking-wider inline-block"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              SERVIÇOS
            </motion.span>
            <motion.h2 
              className="text-dark-blue text-3xl font-bold mt-2 mb-3"
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Soluções Elétricas Completas
            </motion.h2>
            <motion.p 
              className="text-deep-blue max-w-2xl mx-auto"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Atendemos residências e empresas com serviços elétricos profissionais, 
              seguindo todas as normas técnicas de segurança.
            </motion.p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm relative"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onHoverStart={() => !isMobile && handleCardInteraction(service.id, true)}
              onHoverEnd={() => !isMobile && handleCardInteraction(service.id, false)}
              onClick={() => isMobile && handleCardInteraction(service.id, activeCard !== service.id)}
              onTouchEnd={(e) => {
                e.preventDefault(); // Previne comportamentos indesejados em mobile
              }}
            >
              {/* Conteúdo do card */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <i className={`${service.icon} text-blue-600 text-lg`}></i>
                  </motion.div>
                  <h3 className="font-semibold text-lg text-dark-blue">{service.title}</h3>
                </div>
                <p className="text-deep-blue">
                  {service.description}
                </p>
                {isMobile && (
                  <div className="mt-3 text-blue-500 text-sm">
                    <i className="fas fa-hand-pointer mr-1"></i> Toque para ver foto
                  </div>
                )}
              </div>
              
              {/* Overlay com imagem que aparece no hover/toque */}
              <AnimatePresence>
                {activeCard === service.id && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/70 to-blue-900/70 flex flex-col justify-center items-center p-4"
                    variants={imageOverlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col items-center justify-center"
                    >
                      {/* Imagem do serviço */}
                      <div className="relative overflow-hidden rounded-lg w-[85%] h-52 mb-3 shadow-lg">
                        <img 
                          src={imageMap[service.imageSrc] || service.imageSrc.replace(/^\./, "")}
                          alt={service.title} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            // Fallback se a imagem não carregar
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = service.imageSrc.replace(/^\./, "");
                          }}
                        />
                      </div>
                      
                      {/* Nome do serviço */}
                      <h4 className="text-white font-bold text-lg mb-1">{service.title}</h4>
                      <div className="w-12 h-0.5 bg-blue-400 mb-2"></div>
                      
                      {/* Instrução para fechar (apenas em mobile) */}
                      {isMobile && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-white/80 text-sm mt-2"
                        >
                          Toque para fechar
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action com animação */}
        <motion.div 
          className="mt-16 text-center bg-primary rounded-lg p-8 shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Decoração de fundo */}
          <motion.div 
            className="absolute inset-0 bg-blue-600/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div 
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-500/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            />
          </motion.div>
          
          <div className="max-w-xl mx-auto relative z-10">
            <motion.h3 
              className="text-white text-2xl font-bold mb-3"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Solicite um orçamento sem compromisso
            </motion.h3>
            <motion.p 
              className="text-white/90 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Nossa equipe está pronta para atender sua necessidade com agilidade e segurança
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-50 shadow-md"
                >
                  <motion.i 
                    className="fab fa-whatsapp mr-2 text-green-600"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  ></motion.i>
                  Falar com um técnico
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
