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

  const teamMembers = [
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
  ];

  return (
    <section id="quem-somos" ref={sectionRef} className="py-8 md:py-24 bg-gradient-to-b from-blue-50/50 to-white relative">
      {/* Elementos decorativos (apenas desktop) */}
      {!isMobile && (
        <>
          <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-blue-100/30 blur-xl hidden md:block"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-blue-200/20 blur-xl hidden md:block"></div>
        </>
      )}
      
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full">Nossa História</span>
          <h2 className="text-2xl md:text-4xl font-bold text-dark-blue mt-3">Quem Somos</h2>
        </motion.div>

        {/* Layout desktop - apresentação principal */}
        {!isMobile ? (
          <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
            <motion.div 
              className="md:w-1/2"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                  alt="RR Manutenções Elétricas"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-md border border-blue-100/50 p-8">
                <h3 className="text-2xl font-semibold text-dark-blue mb-4">Nossa Trajetória</h3>
                <p className="text-deep-blue text-base leading-relaxed mb-6">
                  Com mais de 10 anos de experiência, a RR Manutenções Elétricas se destaca pela excelência em serviços elétricos residenciais e comerciais. Nossa equipe altamente qualificada é composta por profissionais experientes e dedicados.
                </p>
                <p className="text-deep-blue text-base leading-relaxed">
                  Acreditamos que a segurança elétrica e a satisfação do cliente andam juntas, por isso, cada projeto é tratado com o máximo de atenção aos detalhes e às normas técnicas.
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            className="bg-white rounded-2xl shadow-sm border border-blue-100/50 p-6 mb-6"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative h-48 rounded-xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80" 
                alt="RR Manutenções Elétricas"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-deep-blue text-sm leading-relaxed mb-4">
              Com mais de 10 anos de experiência, a RR Manutenções Elétricas se destaca pela excelência em serviços elétricos residenciais e comerciais.
            </p>
          </motion.div>
        )}

        {/* Valores e Missão - Layout diferente para desktop */}
        {!isMobile ? (
          <div className="grid grid-cols-3 gap-6 mb-16">
            <motion.div
              className="bg-white p-8 rounded-xl shadow-md border border-blue-100/50 h-full flex flex-col items-center text-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                <i className="fas fa-star text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-dark-blue mb-3">Nossa Missão</h3>
              <p className="text-deep-blue">
                Garantir soluções elétricas seguras e eficientes, priorizando a satisfação e tranquilidade dos nossos clientes em cada atendimento.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-md border border-blue-100/50 h-full flex flex-col items-center text-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                <i className="fas fa-eye text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-dark-blue mb-3">Nossa Visão</h3>
              <p className="text-deep-blue">
                Ser referência regional em soluções elétricas, reconhecida pela excelência técnica e atendimento personalizado.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-md border border-blue-100/50 h-full flex flex-col items-center text-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-5">
                <i className="fas fa-shield-alt text-blue-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-dark-blue mb-3">Nossos Valores</h3>
              <p className="text-deep-blue">
                Comprometimento, qualidade, segurança e transparência em cada projeto realizado, valorizando a confiança de nossos clientes.
              </p>
            </motion.div>
          </div>
        ) : (
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
        )}

        {/* Seção da equipe - Versão desktop aprimorada */}
        {!isMobile && (
          <motion.div
            className="bg-white p-10 rounded-2xl shadow-md border border-blue-100/50"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-dark-blue mb-8 text-center">Nossa Equipe</h3>
            <div className="grid grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-5 ring-2 ring-blue-100 shadow-md group-hover:ring-blue-400 transition-all duration-300">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                  </div>
                  <h4 className="font-semibold text-lg text-dark-blue mb-1">{member.name}</h4>
                  <p className="text-blue-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutUs;