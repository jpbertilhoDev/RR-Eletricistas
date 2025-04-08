import { useRef } from "react";
import { motion } from "framer-motion";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { useIsMobile } from "@/hooks/use-mobile";

const AboutUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  useAnimateOnScroll(sectionRef);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="quem-somos" ref={sectionRef} className="py-8 md:py-16 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase">Nossa História</span>
          <h2 className="text-2xl md:text-3xl font-bold text-dark-blue mt-2">Quem Somos</h2>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl shadow-sm border border-blue-100/50 p-6 mb-6"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" 
              alt="RR Manutenções Elétricas"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-deep-blue text-sm md:text-base leading-relaxed mb-4">
            Com mais de 10 anos de experiência, a RR Manutenções Elétricas se destaca pela excelência em serviços elétricos residenciais e comerciais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            className="bg-white p-5 rounded-xl shadow-sm border border-blue-100/50"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-star text-blue-600 text-lg"></i>
            </div>
            <h3 className="text-lg font-semibold text-dark-blue mb-2">Nossa Missão</h3>
            <p className="text-deep-blue text-sm">
              Garantir soluções elétricas seguras e eficientes, priorizando a satisfação e tranquilidade dos nossos clientes.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-5 rounded-xl shadow-sm border border-blue-100/50"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-shield-alt text-blue-600 text-lg"></i>
            </div>
            <h3 className="text-lg font-semibold text-dark-blue mb-2">Nossos Valores</h3>
            <p className="text-deep-blue text-sm">
              Comprometimento, qualidade e transparência em cada projeto realizado.
            </p>
          </motion.div>
        </div>

        {!isMobile && (
          <motion.div
            className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-blue-100/50"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-dark-blue mb-4 text-center">Nossa Equipe</h3>
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  name: "Ricardo Silva",
                  role: "Fundador",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
                },
                {
                  name: "Rafael Oliveira",
                  role: "Técnico Especializado",
                  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
                },
                {
                  name: "Amanda Ferreira",
                  role: "Gestora de Projetos",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 ring-2 ring-blue-100">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-medium text-dark-blue">{member.name}</h4>
                  <p className="text-blue-600 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutUs;