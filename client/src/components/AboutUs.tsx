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
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec enim in diam."
    },
    {
      name: "Rafael Oliveira",
      role: "Técnico Especializado",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      bio: "Nulla facilisi. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris."
    },
    {
      name: "Amanda Ferreira",
      role: "Gestora de Projetos",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      bio: "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper."
    }
  ];

  return (
    <section id="quem-somos" ref={sectionRef} className="py-20 relative overflow-hidden bg-white">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-50 rounded-full opacity-30 blur-3xl"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full">NOSSA HISTÓRIA</span>
          <h2 className="text-dark-blue text-4xl font-bold mt-3 mb-4">Quem Somos</h2>
          <p className="text-deep-blue max-w-3xl mx-auto text-lg">
            Conheça a equipe que transforma ambientes com soluções elétricas seguras e inovadoras
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="md:col-span-6 lg:col-span-7"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-blue-100 rounded-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/10 rounded-xl"></div>
              <div className="bg-white p-3 md:p-6 rounded-xl shadow-lg relative z-10">
                <img 
                  src="https://images.pexels.com/photos/442151/pexels-photo-442151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Equipe trabalhando em um projeto elétrico" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="md:col-span-6 lg:col-span-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-6">
              <div className="bg-blue-50 px-6 py-4 rounded-lg border-l-4 border-blue-600">
                <p className="text-deep-blue text-lg italic">
                  "Nossa paixão é transformar ambientes através de soluções elétricas que combinam segurança, eficiência e inovação."
                </p>
              </div>

              <p className="text-deep-blue text-lg">
                <strong className="text-blue-600">Com mais de 10 anos de experiência</strong>, a RR Manutenções Elétricas se destaca pela excelência em serviços elétricos residenciais e comerciais.
              </p>

              <p className="text-deep-blue">
                Fundada com o compromisso de oferecer soluções elétricas seguras e eficientes, nossa empresa cresceu construindo uma <strong>reputação baseada na qualidade, honestidade e atendimento personalizado</strong>.
              </p>

              <p className="text-deep-blue">
                Nossa equipe é formada por profissionais altamente qualificados e em constante atualização, garantindo a aplicação das melhores práticas e tecnologias do mercado em cada projeto que realizamos.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                    <i className="fas fa-star text-blue-600 text-lg"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-dark-blue mb-2">Nossa Missão</h3>
                  <p className="text-deep-blue text-sm">
                    Proporcionar soluções elétricas que unam segurança e inovação.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                    <i className="fas fa-eye text-blue-600 text-lg"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-dark-blue mb-2">Nossa Visão</h3>
                  <p className="text-deep-blue text-sm">
                    Ser referência em excelência técnica e atendimento ao cliente.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


        <motion.div 
          className="mt-24 hidden md:block"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-dark-blue text-center mb-8">
            <span className="relative inline-block">
              Conheça Nossa Equipe
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600 rounded-full"></span>
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:translate-y-[-10px] transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-square overflow-hidden bg-blue-100">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/80 to-transparent h-1/3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </div>

                <div className="p-8 relative">
                  <div className="absolute -top-8 right-8 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transform-gpu group-hover:rotate-12 transition-transform duration-300">
                    <i className={`fas ${index === 0 ? 'fa-bolt' : index === 1 ? 'fa-wrench' : 'fa-clipboard-list'} text-2xl`}></i>
                  </div>

                  <h4 className="text-xl font-bold text-dark-blue mb-1">{member.name}</h4>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-deep-blue text-sm">{member.bio}</p>

                  <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100">
                    <a href="#" className="w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full flex items-center justify-center transition-colors">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full flex items-center justify-center transition-colors">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full flex items-center justify-center transition-colors">
                      <i className="fas fa-envelope"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h4 className="text-xl md:text-2xl font-bold text-dark-blue mb-5">Pronto para transformar sua instalação elétrica?</h4>
            <p className="text-deep-blue max-w-2xl mx-auto mb-8">
              Nossa equipe está preparada para desenvolver soluções personalizadas que atendam perfeitamente às suas necessidades.
            </p>
            <a 
              href="#contato" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Solicite um orçamento
              <i className="fas fa-arrow-right"></i>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;