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
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-blue-600 font-semibold">POR QUE NOS ESCOLHER</span>
            <h2 className="text-3xl font-bold mt-2 mb-6">Compromisso com a Qualidade e Segurança</h2>
            
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {WHYCHOOSEUS.map((item) => (
                <motion.div 
                  key={item.id}
                  className="flex items-start space-x-4"
                  variants={itemVariants}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-check text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 lg:pl-12"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Eletricista trabalhando com equipamento de segurança" 
              className="rounded-xl shadow-xl w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
