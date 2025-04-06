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
    <section id="servicos" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12 md:mb-16">
          <div className="text-center">
            <span className="text-blue-600 font-medium text-sm tracking-wider">SERVIÇOS</span>
            <h2 className="text-3xl font-bold mt-2 mb-3">Soluções Elétricas Completas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Atendemos residências e empresas com serviços elétricos profissionais, 
              seguindo todas as normas técnicas de segurança.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              className="bg-gray-50 border border-gray-100 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className={`${service.icon} text-blue-600`}></i>
                  </div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action simplificado */}
        <div className="mt-12 text-center bg-primary rounded-lg p-6 shadow-sm">
          <div className="max-w-xl mx-auto">
            <h3 className="text-white text-xl font-bold mb-3">
              Solicite um orçamento sem compromisso
            </h3>
            <p className="text-white/90 text-sm mb-4">
              Nossa equipe está pronta para atender sua necessidade com agilidade e segurança
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-gray-50"
              >
                <i className="fab fa-whatsapp mr-2 text-green-600"></i>
                Falar com um técnico
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
