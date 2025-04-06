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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7
      }
    }
  };

  return (
    <section id="porque-escolher" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-medium text-sm tracking-wider">VANTAGENS</span>
          <h2 className="text-dark-blue text-3xl font-bold mt-2 mb-4">Por que escolher a RR Manutenções Elétricas</h2>
          <p className="text-deep-blue max-w-2xl mx-auto">
            Segurança, qualidade e confiabilidade são os pilares do nosso trabalho. 
            Confie em profissionais certificados para suas necessidades elétricas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {WHYCHOOSEUS.slice(0, 3).map((item) => (
            <motion.div 
              key={item.id}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.id * 0.1 }}
            >
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-check text-blue-600"></i>
              </div>
              <h3 className="font-medium text-lg mb-2 text-dark-blue">{item.title}</h3>
              <p className="text-deep-blue text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Eletricista trabalhando com equipamento de segurança" 
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500 mr-2">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <span className="text-sm text-deep-blue">5.0 no Google</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-dark-blue">Compromisso com Excelência</h3>
            <p className="text-deep-blue mb-4">
              Nossa equipe é formada por profissionais certificados e treinados para oferecer 
              soluções elétricas seguras e eficientes para residências e empresas.
            </p>
            <div className="flex items-center gap-4 text-sm text-deep-blue">
              <div className="flex items-center">
                <i className="fas fa-certificate text-blue-500 mr-1"></i>
                <span>Certificados</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-shield-alt text-blue-500 mr-1"></i>
                <span>Seguros</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-tools text-blue-500 mr-1"></i>
                <span>Garantia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
