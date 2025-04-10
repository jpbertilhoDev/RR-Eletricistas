
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
      stars.push(<i key={`star-${i}`} className="fas fa-star text-yellow-500"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt text-yellow-500"></i>);
    }

    return stars;
  };

  return (
    <section id="depoimentos" ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50 hidden md:block">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full">Avaliações</span>
          <h2 className="text-dark-blue text-3xl font-bold mt-3 mb-4">O que nossos clientes dizem</h2>
          <p className="text-deep-blue max-w-2xl mx-auto">
            A satisfação de nossos clientes é nossa prioridade. Confira o que eles estão dizendo sobre nossos serviços elétricos.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16">
          <motion.div 
            className="md:w-1/3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <i className="fab fa-google text-[#4285F4] text-xl"></i>
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <i key={n} className="fas fa-star"></i>
                  ))}
                </div>
                <span className="font-semibold">5.0</span>
              </div>
              <p className="text-deep-blue">
                Mais de 100 avaliações no Google com nota máxima
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-dark-blue">Por que nossas avaliações importam</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span className="text-deep-blue">Transparência com nossos clientes</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span className="text-deep-blue">Comprometimento com a qualidade</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span className="text-deep-blue">Feedback constante para melhorias</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span className="text-deep-blue">Serviços aprovados pela comunidade</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <div className="md:w-2/3">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <motion.div 
                  key={testimonial.id}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-user text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-bold text-dark-blue">{testimonial.name}</p>
                      <p className="text-sm text-deep-blue">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 text-sm mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-deep-blue mb-3 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-500">Cliente verificado</span>
                    <div className="flex items-center">
                      <i className="fas fa-thumbs-up text-blue-500 mr-1"></i>
                      <span className="text-sm">Recomenda</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <a href="#contato" className="flex items-center group text-blue-600 font-medium transition-all duration-300 hover:text-blue-800">
                Compartilhe sua experiência conosco
                <i className="fas fa-arrow-right ml-2 group-hover:ml-3 transition-all duration-300"></i>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
