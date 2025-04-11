import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO, SOCIAL_MEDIA, WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { useIsMobile } from "@/hooks/use-mobile";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(sectionRef);
  const isMobile = useIsMobile();

  // Mensagem pré-definida para o WhatsApp
  const whatsappMessage = "Olá, gostaria de solicitar um orçamento.";
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  // Informações de contato
  const contactInfoItems = [
    { icon: "fas fa-phone", title: "Telefone", content: CONTACT_INFO.phone },
    { icon: "fas fa-envelope", title: "Email", content: CONTACT_INFO.email },
    { icon: "fas fa-map-marker-alt", title: "Endereço", content: [CONTACT_INFO.address, CONTACT_INFO.addressDetails] },
    { icon: "fas fa-clock", title: "Horário", content: CONTACT_INFO.hours }
  ];

  return (
    <section id="contato" ref={sectionRef} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase">CONTATO</span>
          <h2 className="text-dark-blue text-3xl font-bold mt-2 mb-3">Fale Conosco Agora</h2>
          <p className="text-deep-blue max-w-2xl mx-auto text-base">
            Estamos prontos para atender sua solicitação com rapidez e eficiência
          </p>
        </div>

        {/* Layout responsivo para o novo formato */}
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
          {/* Informações de contato */}
          <div className="w-full md:w-1/2">
            <div className="bg-white p-8 rounded-xl border border-gray-200 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-xl mb-6 text-dark-blue">Informações de Contato</h3>

              <div className="space-y-6">
                {contactInfoItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mr-4 group-hover:bg-blue-100 transition-colors duration-300">
                      <i className={`${item.icon} text-primary text-lg`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-dark-blue text-base">{item.title}</h4>
                      {Array.isArray(item.content) ? (
                        item.content.map((line, i) => (
                          <p key={i} className="text-deep-blue">{line}</p>
                        ))
                      ) : (
                        <p className="text-deep-blue">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Aviso de emergência */}
              <motion.div 
                className="mt-8 pt-6 border-t border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h4 className="font-medium mb-3 text-dark-blue text-lg">Emergências</h4>
                <p className="text-deep-blue text-sm mb-4">
                  Para atendimentos urgentes, entre em contato diretamente pelo WhatsApp com a mensagem "EMERGÊNCIA" para prioridade no atendimento.
                </p>

                <h4 className="font-medium mb-4 text-dark-blue text-lg">Redes Sociais</h4>
                <div className="flex gap-3">
                  {SOCIAL_MEDIA.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-50 hover:bg-blue-100 text-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <i className={`${social.icon} text-base`}></i>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Novo card de contato via WhatsApp */}
          <div className="w-full md:w-1/2">
            <div className="bg-white p-8 rounded-xl border border-gray-200 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col h-full justify-between"
              >
                {/* Seção superior com texto */}
                <div className="mb-8">
                  <h3 className="font-bold text-2xl mb-6 text-dark-blue">Atendimento Rápido e Direto</h3>
                  <p className="text-deep-blue mb-6">
                    Prefere um contato mais ágil? Fale diretamente com nossos técnicos pelo WhatsApp e receba 
                    um orçamento personalizado para seu projeto elétrico.
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <p className="text-green-800 text-sm">
                      <span className="font-medium">Benefícios:</span> Atendimento prioritário, respostas rápidas e orçamentos personalizados diretamente no seu celular.
                    </p>
                  </div>
                </div>

                {/* Botão grande de WhatsApp */}
                <div>
                  <motion.a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-5 px-6 rounded-xl w-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ scale: 1 }}
                    animate={{ 
                      boxShadow: ["0px 4px 16px rgba(0, 0, 0, 0.1)", "0px 8px 24px rgba(0, 0, 0, 0.15)", "0px 4px 16px rgba(0, 0, 0, 0.1)"],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  >
                    <i className="fab fa-whatsapp text-2xl"></i>
                    <span>Falar no WhatsApp</span>
                  </motion.a>

                  <p className="text-center text-gray-500 mt-4 text-sm">
                    Atendimento de segunda a sexta, das 8h às 18h
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mapa (mantido para compatibilidade) */}
        {isMobile && (
          <motion.div 
            className="mt-16 bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-dark-blue">Atendemos toda a região metropolitana</h3>
              <p className="text-deep-blue mt-2">Serviços elétricos de qualidade para residências e comércios</p>
            </div>

            <div className="aspect-w-16 aspect-h-5 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0488531903!2d-46.92499149871108!3d-23.6824124889868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2zU8OjbyBQYXVsbywgU1A!5e0!3m2!1spt-BR!2sbr!4v1659923235202!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de atendimento"
              ></iframe>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;