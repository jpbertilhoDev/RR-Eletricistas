
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";

const containerVariants = {
  hidden: {},
  visible: {
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
      duration: 0.6
    }
  }
};

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  // Versão mobile só mostra 2 depoimentos
  const displayTestimonials = isMobile ? TESTIMONIALS.slice(0, 2) : TESTIMONIALS;

  return (
    <section id="depoimentos" ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <motion.span 
            className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            Clientes satisfeitos
          </motion.span>
          
          <motion.h2 
            className="text-dark-blue text-3xl font-bold mt-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            O que nossos clientes dizem
          </motion.h2>
          
          <motion.p 
            className="text-deep-blue max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A satisfação dos nossos clientes é nossa maior conquista.
            Conheça algumas histórias de quem confiou em nossos serviços.
          </motion.p>
        </div>

        {isMobile ? (
          // Versão Mobile - Cards em coluna única
          <div className="space-y-6">
            {displayTestimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * testimonial.id }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <img 
                      src={`https://randomuser.me/api/portraits/${testimonial.id % 2 === 0 ? 'women' : 'men'}/${20 + testimonial.id * 10}.jpg`}
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-blue">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star text-xs ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-deep-blue text-sm">{testimonial.content}</p>
              </motion.div>
            ))}
            
            <motion.div 
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#contato"
                className="inline-flex items-center text-primary font-medium"
              >
                Seja o próximo cliente satisfeito
                <i className="fas fa-arrow-right ml-2 text-sm"></i>
              </a>
            </motion.div>
          </div>
        ) : (
          // Versão Desktop - Grid com animações mais elaboradas
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {displayTestimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Elemento decorativo */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-50 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                
                <div className="flex items-center mb-6 relative z-10">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      src={`https://randomuser.me/api/portraits/${testimonial.id % 2 === 0 ? 'women' : 'men'}/${20 + testimonial.id * 10}.jpg`}
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 group-hover:border-blue-200 transition-colors"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-blue text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'} text-sm mr-1`}></i>
                      ))}
                      {testimonial.rating % 1 !== 0 && (
                        <i className="fas fa-star-half-alt text-yellow-400 text-sm mr-1"></i>
                      )}
                    </div>
                  </div>
                </div>
                <blockquote className="relative z-10">
                  <i className="fas fa-quote-left text-blue-100 text-4xl absolute -top-2 -left-2 opacity-50"></i>
                  <p className="text-deep-blue relative z-10 pl-4">{testimonial.content}</p>
                </blockquote>
                
                <div className="mt-6 pt-4 border-t border-gray-100 text-right">
                  <span className="text-sm text-gray-500 italic">Projeto realizado em {2023 - testimonial.id}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div 
          className="text-center mt-16 bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-dark-blue mb-2">Quer resolver seu problema elétrico agora?</h3>
              <p className="text-deep-blue">Nossos especialistas estão prontos para atender você com qualidade e segurança</p>
            </div>
            <a
              href={`https://wa.me/+5511972650865`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap flex-shrink-0"
            >
              <i className="fab fa-whatsapp mr-2 text-lg"></i>
              Fale conosco
            </a>
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-blue-600 font-medium">Avaliação média de 4.9 <i className="fas fa-star text-yellow-400 ml-1"></i></p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="h-5 mr-2" />
                <span className="text-gray-700 font-medium">Google Reviews</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center">
                <i className="fab fa-facebook text-blue-600 mr-2"></i>
                <span className="text-gray-700 font-medium">Facebook</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
