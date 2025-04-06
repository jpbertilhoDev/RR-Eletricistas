import { useRef } from "react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(sectionRef);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
        duration: 0.5
      }
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>);
    }

    return stars;
  };

  return (
    <section id="depoimentos" ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-600 font-semibold">DEPOIMENTOS</span>
          <h2 className="text-3xl font-bold mt-2">O Que Dizem Nossos Clientes</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Veja o que nossos clientes têm a dizer sobre nossos serviços e atendimento.
          </p>
          
          {/* Google Reviews Rating Badge */}
          <motion.div 
            className="flex items-center justify-center mt-6"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white shadow-lg rounded-lg px-6 py-4 flex items-center border border-gray-100 mx-auto">
              <div className="mr-4 bg-[#4285F4] bg-opacity-10 p-3 rounded-full">
                <i className="fab fa-google text-2xl text-[#4285F4]"></i>
              </div>
              <div className="text-left">
                <div className="flex items-center mb-1">
                  <div className="flex text-yellow-500 mr-2">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="font-bold text-lg">5.0</span>
                </div>
                <div className="text-gray-600 text-sm">
                  Empresa com classificação máxima no Google
                </div>
              </div>
              <div className="ml-4 pl-4 border-l border-gray-200">
                <div className="text-gray-900 font-bold">102+</div>
                <div className="text-gray-600 text-xs">Avaliações</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-md transform hover:scale-103 transition-all duration-300"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                <div className="text-blue-500 text-lg flex">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <blockquote className="text-gray-700 italic border-l-4 border-primary pl-4 mb-4">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-user text-gray-500"></i>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
