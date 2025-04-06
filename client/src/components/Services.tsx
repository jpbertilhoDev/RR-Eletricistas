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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="servicos" ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-600 font-semibold">NOSSOS SERVIÇOS</span>
          <h2 className="text-3xl font-bold mt-2">Soluções Elétricas Completas</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Oferecemos uma ampla variedade de serviços elétricos para atender todas as necessidades residenciais e comerciais.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SERVICES.map((service) => (
            <motion.div 
              key={service.id}
              className="bg-gray-50 rounded-xl p-6 shadow-md transform hover:scale-103 transition-all duration-300"
              variants={itemVariants}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <i className={`${service.icon} text-blue-600 text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              variant="whatsapp" 
              size="lg"
              className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              <i className="fab fa-whatsapp text-xl mr-2"></i>
              Solicitar orçamento
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
