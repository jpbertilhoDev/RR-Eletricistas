
import { useRef } from "react";
import { motion } from "framer-motion";
import { WHYCHOOSEUS } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const WhyChooseUs = () => {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="porque-escolher" ref={sectionRef} className="py-24 bg-gray-50 hidden md:block">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full">Diferenciais</span>
          <h2 className="text-dark-blue text-3xl font-bold mt-3 mb-4">Por que escolher a RR Manutenções Elétricas</h2>
          <p className="text-deep-blue max-w-2xl mx-auto">
            Segurança, qualidade e confiabilidade são os pilares do nosso trabalho. 
            Confie em profissionais certificados para suas necessidades elétricas.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {WHYCHOOSEUS.slice(0, 3).map((item) => (
            <motion.div 
              key={item.id}
              className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                <i className={`fas fa-${['shield-alt', 'bolt', 'tools'][item.id - 1]} text-blue-600 text-xl`}></i>
              </div>
              <h3 className="font-bold text-xl mb-3 text-dark-blue">{item.title}</h3>
              <p className="text-deep-blue mb-4">{item.description}</p>
              <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-xl shadow-md overflow-hidden">
          <motion.div 
            className="h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Eletricista trabalhando com equipamento de segurança" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            className="p-8 md:p-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500 mr-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <i key={n} className="fas fa-star"></i>
                ))}
              </div>
              <span className="text-sm font-medium text-deep-blue">5.0 no Google</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-dark-blue">Compromisso com Excelência</h3>
            
            <p className="text-deep-blue mb-6">
              Nossa equipe é formada por profissionais certificados e treinados para oferecer 
              soluções elétricas seguras e eficientes para residências e empresas.
            </p>
            
            <div className="space-y-4 mb-8">
              {WHYCHOOSEUS.slice(3, 5).map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <i className="fas fa-check text-green-500"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-dark-blue mb-1">{item.title}</h4>
                    <p className="text-sm text-deep-blue">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center">
                <i className="fas fa-certificate text-blue-600 mr-2"></i>
                <span className="text-deep-blue font-medium">Certificados</span>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center">
                <i className="fas fa-shield-alt text-blue-600 mr-2"></i>
                <span className="text-deep-blue font-medium">Seguros</span>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-full flex items-center">
                <i className="fas fa-tools text-blue-600 mr-2"></i>
                <span className="text-deep-blue font-medium">Garantia</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
