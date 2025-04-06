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
    <section id="depoimentos" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12">
          <div className="md:w-1/3">
            <div className="mb-6">
              <span className="text-blue-600 font-medium text-sm tracking-wider">AVALIAÇÕES</span>
              <h2 className="text-2xl md:text-3xl font-bold mt-2">O que nossos clientes dizem</h2>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <i className="fab fa-google text-[#4285F4]"></i>
                <div className="flex text-yellow-500">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <span className="font-semibold">5.0</span>
              </div>
              <p className="text-gray-600 text-sm">
                Mais de 100 avaliações no Google com nota máxima
              </p>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {TESTIMONIALS.slice(0, 4).map((testimonial) => (
                <motion.div 
                  key={testimonial.id}
                  className="bg-gray-50 p-5 rounded-lg border border-gray-100"
                  variants={itemVariants}
                >
                  <div className="flex text-yellow-500 text-sm mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                      <i className="fas fa-user text-gray-500 text-xs"></i>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
