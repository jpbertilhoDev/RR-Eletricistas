import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AboutUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  return (
    <section
      id="quem-somos"
      ref={sectionRef}
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Elementos decorativos minimalistas */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full opacity-20 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full opacity-10 -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.span 
            className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            NOSSA HISTÓRIA
          </motion.span>

          <motion.h2 
            className="text-dark-blue text-3xl md:text-4xl font-bold mt-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Quem Somos
          </motion.h2>

          <motion.p 
            className="text-deep-blue max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Conheça a equipe que transforma ambientes com soluções elétricas seguras e inovadoras
          </motion.p>
        </div>

        {isMobile ? (
          // Versão mobile existente - não modificar
          <div className="grid grid-cols-1 gap-8">
            <motion.div
              className="bg-blue-50 p-8 rounded-xl relative overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative z-10">
                <div className="flex flex-col items-center justify-center bg-blue-50/50 rounded-lg p-6 mb-6 shadow-md">
                  <img
                    src="/src/assets/images/logo-rr.svg"
                    alt="Logo RR Manutenções Elétricas"
                    className="w-auto h-28 mb-4 object-contain"
                  />
                  <p className="text-primary font-medium text-base">RR Manutenções Elétricas</p>
                </div>
                <blockquote className="text-deep-blue italic font-light text-lg mb-4 bg-white/90 p-4 rounded-lg shadow-sm">
                  "Nossa paixão é transformar ambientes através de soluções elétricas que combinam segurança, eficiência e inovação."
                </blockquote>
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full opacity-50 translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full opacity-50 -translate-x-1/4 translate-y-1/4" />
            </motion.div>

            <motion.div
              className="flex flex-col space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div>
                <h3 className="text-dark-blue text-xl font-bold mb-3 flex items-center">
                  <span className="mr-2 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center">
                    <i className="fas fa-history text-sm"></i>
                  </span>
                  Com mais de 10 anos de experiência
                </h3>
                <p className="text-deep-blue pl-10">
                  a RR Manutenções Elétricas se destaca pela excelência 
                  em serviços elétricos residenciais e comerciais.
                </p>
              </div>

              <div>
                <h3 className="text-dark-blue text-xl font-bold mb-3 flex items-center">
                  <span className="mr-2 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center">
                    <i className="fas fa-handshake text-sm"></i>
                  </span>
                  Fundada com o compromisso
                </h3>
                <p className="text-deep-blue pl-10">
                  de oferecer soluções elétricas de qualidade, nossa empresa 
                  cresceu baseada em valores sólidos de integridade e eficiência.
                </p>
              </div>

              <div>
                <h3 className="text-dark-blue text-xl font-bold mb-3 flex items-center">
                  <span className="mr-2 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center">
                    <i className="fas fa-users text-sm"></i>
                  </span>
                  Nossa equipe
                </h3>
                <p className="text-deep-blue pl-10">
                  é formada por profissionais altamente qualificados e certificados, 
                  sempre atualizados com as mais recentes tecnologias e normas de segurança.
                </p>
              </div>

              <div>
                <h3 className="text-dark-blue text-xl font-bold mb-3 flex items-center">
                  <span className="mr-2 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center">
                    <i className="fas fa-trophy text-sm"></i>
                  </span>
                  Nosso diferencial
                </h3>
                <p className="text-deep-blue pl-10">
                  está na atenção personalizada que oferecemos a cada cliente, 
                  entendendo suas necessidades específicas e entregando resultados que excedem expectativas.
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
          // Nova versão desktop mais minimalista
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Coluna da esquerda - Conteúdo principal */}
            <motion.div
              className="md:w-7/12"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-dark-blue text-xl font-bold mb-4 flex items-center">
                    <span className="mr-3 bg-primary/10 text-primary h-10 w-10 rounded-full flex items-center justify-center">
                      <i className="fas fa-history"></i>
                    </span>
                    <span>Com mais de 10 anos de experiência</span>
                  </h3>
                  <p className="text-deep-blue ml-[52px] text-base">
                    A RR Manutenções Elétricas se destaca pela excelência 
                    em serviços elétricos residenciais e comerciais, atendendo com qualidade 
                    e precisão todas as necessidades de nossos clientes.
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-dark-blue text-xl font-bold mb-4 flex items-center">
                    <span className="mr-3 bg-primary/10 text-primary h-10 w-10 rounded-full flex items-center justify-center">
                      <i className="fas fa-handshake"></i>
                    </span>
                    <span>Fundada com o compromisso</span>
                  </h3>
                  <p className="text-deep-blue ml-[52px] text-base">
                    De oferecer soluções elétricas de qualidade, nossa empresa 
                    cresceu baseada em valores sólidos de integridade, segurança e eficiência,
                    priorizando sempre a satisfação do cliente.
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-dark-blue text-xl font-bold mb-4 flex items-center">
                    <span className="mr-3 bg-primary/10 text-primary h-10 w-10 rounded-full flex items-center justify-center">
                      <i className="fas fa-trophy"></i>
                    </span>
                    <span>Nossa missão</span>
                  </h3>
                  <p className="text-deep-blue ml-[52px] text-base">
                    Transformamos ambientes através de soluções elétricas inovadoras, 
                    criando espaços mais seguros, eficientes e confortáveis para 
                    nossos clientes viverem e trabalharem.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Coluna da direita - Quote e imagem */}
            <motion.div 
              className="md:w-5/12"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-sm border border-blue-100 mb-8">
                  <blockquote className="text-deep-blue italic text-xl font-light leading-relaxed mb-6">
                    "Nossa paixão é transformar ambientes através de soluções elétricas que combinam segurança, eficiência e inovação."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-dark-blue">RR Manutenções Elétricas</p>
                      <p className="text-sm text-gray-600">Fundador e Diretor Técnico</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl shadow-sm border border-gray-100 bg-white relative">
                  <div className="p-8 flex flex-col items-center justify-center bg-blue-50/50">
                  <img
                    src="/src/assets/images/logo-rr.svg"
                    alt="Logo RR Manutenções Elétricas"
                    className="w-auto h-24 md:h-32 mb-6 object-contain"
                  />
                  <div className="text-center">
                    <p className="text-primary font-medium text-lg">RR Manutenções Elétricas</p>
                  </div>
                </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}