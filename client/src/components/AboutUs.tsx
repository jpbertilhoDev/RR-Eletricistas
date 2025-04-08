
import { useRef } from "react";
import { motion } from "framer-motion";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const AboutUs = () => {
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
    <section id="quem-somos" ref={sectionRef} className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          className="text-center mb-8 md:mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-blue-600 font-medium text-sm tracking-wider"
            variants={itemVariants}
          >
            NOSSA HISTÓRIA
          </motion.span>
          <motion.h2 
            className="text-dark-blue text-3xl font-bold mt-2 mb-4"
            variants={itemVariants}
          >
            Quem Somos
          </motion.h2>
          <motion.p 
            className="text-deep-blue max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Conheça a equipe que faz da RR Manutenções Elétricas uma empresa de confiança e excelência no setor elétrico.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="w-full h-60 md:h-96 bg-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-100/50 blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-blue-100/60 blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                  alt="Equipe RR Manutenções Elétricas" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-blue-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-primary font-bold text-xl">10+</p>
                  <p className="text-dark-blue text-sm">Anos de experiência</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-dark-blue text-2xl font-semibold mb-4">Nossa Missão e Valores</h3>
            <p className="text-deep-blue mb-4">
              Fundada há mais de 10 anos, a RR Manutenções Elétricas nasceu do sonho de oferecer serviços elétricos de alta qualidade com total segurança e preços justos. 
            </p>
            <p className="text-deep-blue mb-6">
              Nossa missão é garantir soluções eficientes e seguras para todos os projetos elétricos, contribuindo para o bem-estar e segurança dos nossos clientes através de um trabalho técnico impecável.
            </p>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <i className="fas fa-bolt text-primary text-lg md:text-xl mb-2"></i>
                <h4 className="font-semibold text-dark-blue mb-1">Qualidade</h4>
                <p className="text-deep-blue text-xs md:text-sm">Excelência em cada serviço prestado.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <i className="fas fa-shield-alt text-primary text-xl mb-2"></i>
                <h4 className="font-medium text-dark-blue mb-1">Segurança</h4>
                <p className="text-deep-blue text-sm">Compromisso com normas técnicas.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <i className="fas fa-handshake text-primary text-xl mb-2"></i>
                <h4 className="font-medium text-dark-blue mb-1">Confiança</h4>
                <p className="text-deep-blue text-sm">Transparência em todas as etapas.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <i className="fas fa-clock text-primary text-xl mb-2"></i>
                <h4 className="font-medium text-dark-blue mb-1">Pontualidade</h4>
                <p className="text-deep-blue text-sm">Respeito ao tempo do cliente.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-blue-50 p-8 rounded-lg"
        >
          <h3 className="text-dark-blue text-xl font-semibold mb-4 text-center">Nossa Equipe</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {/* Team Member 1 */}
            <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-blue-50 shadow-sm text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-3 md:mb-4 overflow-hidden ring-2 ring-blue-100">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
                  alt="Ricardo Silva" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium text-dark-blue">Ricardo Silva</h4>
              <p className="text-primary text-sm mb-2">Fundador e Engenheiro Eletricista</p>
              <p className="text-deep-blue text-sm">
                Especialista em projetos elétricos de alta complexidade com mais de 15 anos de experiência.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white p-5 rounded-lg shadow-sm text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
                  alt="Rafael Oliveira" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium text-dark-blue">Rafael Oliveira</h4>
              <p className="text-primary text-sm mb-2">Técnico Especializado</p>
              <p className="text-deep-blue text-sm">
                Responsável por manutenções preventivas e corretivas com precisão e eficiência.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white p-5 rounded-lg shadow-sm text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" 
                  alt="Amanda Ferreira" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium text-dark-blue">Amanda Ferreira</h4>
              <p className="text-primary text-sm mb-2">Gestora de Projetos</p>
              <p className="text-deep-blue text-sm">
                Coordena nossa equipe garantindo que cada projeto seja executado com excelência e no prazo.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-dark-blue text-xl font-semibold mb-4">Certificações e Parcerias</h3>
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <div className="w-28 h-20 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=80&q=80" 
                alt="Certificação 1" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="w-28 h-20 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1607893378714-007fd47c8719?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=80&q=80" 
                alt="Certificação 2" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="w-28 h-20 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=80&q=80" 
                alt="Certificação 3" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="w-28 h-20 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=80&q=80" 
                alt="Certificação 4" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
