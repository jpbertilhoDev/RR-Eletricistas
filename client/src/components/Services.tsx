import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SERVICES, WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(sectionRef);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="servicos" ref={sectionRef} className="py-24 bg-white relative">
      {/* Padrão de fundo sutil */}
      <div className="absolute inset-0 bg-dotted-white opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium mb-4">
            NOSSOS SERVIÇOS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
            Soluções Elétricas Profissionais
          </h2>
          <p className="text-gray-600 text-lg">
            Oferecemos uma ampla variedade de serviços elétricos com excelência técnica 
            para atender todas as necessidades residenciais e comerciais.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              className="relative bg-white rounded-xl p-8 shadow-lg border border-gray-100 group hover:border-primary/20 transition-all duration-300"
              variants={itemVariants}
              custom={index}
            >
              {/* Gradiente de fundo no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
              
              {/* Ícone com animação */}
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300 relative z-10">
                <i className={`${service.icon} text-primary text-2xl group-hover:scale-110 transition-transform duration-300`}></i>
              </div>
              
              {/* Conteúdo */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Linha decorativa */}
                <div className="w-12 h-1 bg-primary/30 rounded group-hover:w-16 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action com destaque */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-10 max-w-3xl mx-auto shadow-xl">
            <h3 className="text-white text-2xl font-bold mb-4">
              Precisa de um serviço elétrico?
            </h3>
            <p className="text-white/90 mb-6">
              Entre em contato agora para um orçamento sem compromisso
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 px-8"
              >
                <i className="fab fa-whatsapp text-xl mr-2 text-green-600"></i>
                Solicitar orçamento
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
