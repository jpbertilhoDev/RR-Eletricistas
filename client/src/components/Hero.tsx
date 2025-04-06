import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { motion } from "framer-motion";
import TypeWriter from "./TypeWriter";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(heroRef);

  const heroTexts = [
    "Serviços Elétricos com Qualidade e Precisão",
    "Soluções Completas para sua Segurança Elétrica",
    "Eletricistas Profissionais à sua Disposição",
    "Manutenção Preventiva e Corretiva",
    "Instalações Elétricas Residenciais e Comerciais",
    "Atendimento 24 horas para Emergências",
    "10+ Anos de Experiência no Mercado",
    "Projetos Elétricos Personalizados",
    "Automação Residencial Inteligente"
  ];

  // Variantes de animação
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const buttonHoverEffect = {
    scale: 1.03,
    transition: { duration: 0.2 }
  };

  return (
    <section 
      id="inicio" 
      ref={heroRef}
      className="pt-28 pb-16 md:pt-36 md:pb-24 bg-primary overflow-hidden"
    >
      {/* Elementos decorativos animados */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-400/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-400/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0 md:pr-10 text-left"
            variants={fadeInUp}
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight min-h-[6rem] md:min-h-[6.5rem] lg:min-h-[7rem] flex items-center"
              variants={fadeInUp}
            >
              <div className="w-full">
                <TypeWriter />
              </div>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-8"
              variants={fadeInUp}
            >
              Especialistas em instalações e manutenções elétricas residenciais e comerciais com mais de 10 anos de experiência.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4"
              variants={fadeInUp}
            >
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
                whileHover={buttonHoverEffect}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto px-6 py-3 shadow-lg"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Solicitar orçamento
                </Button>
              </motion.a>

              <motion.div
                whileHover={buttonHoverEffect}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-primary border-white hover:bg-blue-50 w-full sm:w-auto px-6 py-3 shadow-lg"
                  onClick={() => {
                    const servicesSection = document.getElementById("servicos");
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <i className="fas fa-bolt mr-2"></i>
                  Ver serviços
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex items-center mt-8"
              variants={fadeInUp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <motion.i 
                    key={i}
                    className="fas fa-star"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + (i * 0.1), duration: 0.3 }}
                  />
                ))}
              </div>
              <span className="text-white text-sm">5.0 no Google (102+ avaliações)</span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="md:w-1/2"
            variants={fadeInUp}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <motion.img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=450&q=80" 
                alt="Eletricista profissional trabalhando" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              />

              <motion.div 
                className="absolute -bottom-4 right-4 bg-white py-2 px-4 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="bg-green-100 text-green-800 font-semibold text-xs px-2 py-1 rounded"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  >
                    24h
                  </motion.div>
                  <div className="text-sm font-medium text-gray-900">
                    Atendimento Emergencial
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Indicadores com animação */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {[
            { value: "10+", label: "Anos de experiência" },
            { value: "500+", label: "Clientes satisfeitos" },
            { value: "100%", label: "Garantia de serviço" },
            { value: "24/7", label: "Suporte técnico" }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="text-center bg-blue-800/50 py-3 px-2 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                className="text-white text-2xl font-bold mb-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (index * 0.1), duration: 0.3 }}
              >
                {item.value}
              </motion.div>
              <div className="text-white/80 text-sm">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Separador com animação */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-4 bg-white"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </section>
  );
};

export default Hero;