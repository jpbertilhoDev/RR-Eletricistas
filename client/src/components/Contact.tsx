import { useRef } from "react";
import { motion } from "framer-motion";
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

  return (
    <section id="contato" ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase">CONTATO RÁPIDO</span>
          <h2 className="text-dark-blue text-3xl md:text-4xl font-bold mt-2 mb-4">Resolva seu problema elétrico agora</h2>
          <p className="text-deep-blue max-w-2xl mx-auto text-lg">
            Atendimento ágil e orçamento personalizado com nossos especialistas
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Lado esquerdo - Informações essenciais */}
              <div className="w-full md:w-1/2 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-dark-blue">Fale diretamente conosco</h3>
                <p className="text-lg text-deep-blue mb-6">
                  Prefere um contato mais ágil? Envie sua mensagem pelo WhatsApp e receba um orçamento personalizado em minutos.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
                  <h4 className="font-semibold text-dark-blue mb-2">Atendemos:</h4>
                  <ul className="text-deep-blue space-y-1">
                    <li className="flex items-center">
                      <i className="fas fa-check text-blue-500 mr-2"></i>
                      <span>Residências</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-blue-500 mr-2"></i>
                      <span>Comércios</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-blue-500 mr-2"></i>
                      <span>Pequenas indústrias</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <i className="fas fa-clock mr-1"></i>
                  <span>{CONTACT_INFO.hours}</span>
                </div>
              </div>

              {/* Lado direito - Botão de WhatsApp e informações de contato */}
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <motion.div
                  className="w-full max-w-sm flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                    <i className="fab fa-whatsapp text-4xl text-green-500"></i>
                  </div>

                  <motion.a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-5 px-8 rounded-xl w-full text-lg font-semibold shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
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

                  <p className="mt-6 text-center">
                    <span className="text-sm text-gray-500">Em caso de emergência, envie a mensagem</span>
                    <br />
                    <span className="font-semibold text-deep-blue">"EMERGÊNCIA"</span>
                    <span className="text-sm text-gray-500"> para prioridade no atendimento</span>
                  </p>
                </motion.div>

                {/* Informações de contato simplificadas */}
                <div className="mt-8 pt-6 border-t border-gray-100 w-full flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                      <i className="fas fa-phone text-primary"></i>
                    </div>
                    <div>
                      <p className="text-deep-blue font-medium">{CONTACT_INFO.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {SOCIAL_MEDIA.map((social, index) => (
                      <a 
                        key={index}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-50 hover:bg-blue-100 text-primary rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <i className={`${social.icon} text-sm`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulário para depoimentos */}
          <motion.div 
            className="text-center mt-12 pt-8 border-t border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-bold text-dark-blue mb-3">Compartilhe sua experiência</h3>
            <p className="text-deep-blue mb-6 max-w-2xl mx-auto">
              Seu depoimento é muito importante para nós. Compartilhe sua experiência com nossos serviços.
            </p>
            
            <form 
              className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const reviewData = {
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  rating: formData.get('rating') as string,
                  content: formData.get('content') as string
                };
                
                // Enviar para a API
                fetch('/api/public-reviews', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(reviewData)
                })
                .then(response => response.json())
                .then(data => {
                  if (data.success) {
                    alert('Obrigado pelo seu depoimento!');
                    e.currentTarget.reset();
                  } else {
                    alert('Erro ao enviar depoimento. Por favor, tente novamente.');
                  }
                })
                .catch(error => {
                  console.error('Error:', error);
                  alert('Erro ao enviar depoimento. Por favor, tente novamente.');
                });
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-left">Nome</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">Email (opcional)</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1 text-left">Avaliação</label>
                <select 
                  id="rating" 
                  name="rating" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="5">5 estrelas - Excelente</option>
                  <option value="4">4 estrelas - Muito bom</option>
                  <option value="3">3 estrelas - Bom</option>
                  <option value="2">2 estrelas - Regular</option>
                  <option value="1">1 estrela - Ruim</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1 text-left">Seu depoimento</label>
                <textarea 
                  id="content" 
                  name="content" 
                  rows={4} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Conte-nos sobre sua experiência com nossos serviços..."
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Enviar depoimento
              </button>
            </form>
          </motion.div>

          {/* Única informação abaixo do card principal */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Endereço: {CONTACT_INFO.address}, {CONTACT_INFO.addressDetails}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;