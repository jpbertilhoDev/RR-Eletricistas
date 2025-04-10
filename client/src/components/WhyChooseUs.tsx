import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WHYCHOOSEUS } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";
// Importação correta do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Importações de estilos
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  // Animações
  const containerVariants = {
    hidden: {},
    visible: {
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
        duration: 0.6
      }
    }
  };

  // Diferenciais em formato de cards com design modernizado
  const diferenciais = [
    {
      id: 1,
      title: "Tailwind CSS",
      description: "Transformando a maneira como desenvolvemos estilos",
      image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?q=80&w=600&h=400&auto=format&fit=crop",
      link: "#tailwind"
    },
    {
      id: 2,
      title: "Astro Framework",
      description: "A solução all-in-one para web moderna",
      image: "https://images.unsplash.com/photo-1635830625698-3b9bd74671ca?q=80&w=600&h=400&auto=format&fit=crop",
      link: "#astro"
    },
    {
      id: 3,
      title: "React Components",
      description: "Desenvolvimento moderno com componentes reutilizáveis",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&h=400&auto=format&fit=crop",
      link: "#react"
    },
    {
      id: 4,
      title: "Next.js",
      description: "Framework completo para aplicações React",
      image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=600&h=400&auto=format&fit=crop",
      link: "#nextjs"
    }
  ];

  return (
    <section id="diferenciais" ref={sectionRef} className="py-16 bg-white relative overflow-hidden">
      {/* Background minimalista */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gray-50 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gray-50 opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="text-center mb-12">
          <motion.p 
            className="text-sm font-medium tracking-wider text-gray-500 uppercase mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            Por que nos escolher
          </motion.p>

          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nossos diferenciais
          </motion.h2>

          <motion.div 
            className="h-1 w-16 bg-blue-600 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </div>

        {isMobile ? (
          <div className="mt-8">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={1.1}
              centeredSlides={false}
              pagination={{ clickable: true }}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="w-full overflow-visible"
            >
              {diferenciais.map((card) => (
                <SwiperSlide key={card.id} className="pb-10">
                  <motion.div 
                    className="bg-white rounded-lg overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300"
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                      <p className="text-gray-600 mb-4">{card.description}</p>
                      <a 
                        href={card.link} 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Saiba mais
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {diferenciais.map((card) => (
              <motion.div 
                key={card.id}
                className="bg-white rounded-lg overflow-hidden h-full shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <a 
                    href={card.link} 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Saiba mais
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA minimalista */}
        <motion.div 
          className="mt-16 py-12 px-8 bg-gray-50 rounded-lg text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Pronto para modernizar seu projeto?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra como nossa abordagem pode transformar sua experiência de desenvolvimento.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Entre em contato
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}