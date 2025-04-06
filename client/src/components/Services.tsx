import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SERVICES, WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
      borderColor: "rgba(59, 130, 246, 0.3)",
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
              className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
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
              </div>
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
