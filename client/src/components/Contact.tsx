import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO, SOCIAL_MEDIA, WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { useToast } from "@/hooks/use-toast";
import { sendContactEmail, ContactFormData } from "@/lib/emailjs";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(sectionRef);
  const { toast } = useToast();
  const controls = useAnimation();
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (sectionRef.current) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleFocus = (id: string) => {
    setActiveField(id);
  };
  
  const handleBlur = () => {
    setActiveField(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        toast({
          title: "Mensagem enviada!",
          description: result.message,
          variant: "default"
        });
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: ""
        });
      } else {
        toast({
          title: "Erro ao enviar mensagem",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

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
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-14">
          <span className="text-blue-600 font-medium text-sm tracking-wider">CONTATO</span>
          <h2 className="text-dark-blue text-4xl font-bold mt-2 mb-4">Entre em contato</h2>
          <p className="text-deep-blue max-w-2xl mx-auto text-lg">
            Solicite um orçamento sem compromisso ou tire suas dúvidas com nossa equipe
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Contact information card */}
          <div className="lg:w-1/3">
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
              
              <motion.div 
                className="mt-8 pt-6 border-t border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
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
          
          {/* Contact form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-xl mb-6 text-dark-blue">Envie sua mensagem</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name field */}
                <motion.div 
                  custom={0}
                  variants={formFieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="md:col-span-1"
                >
                  <label htmlFor="name" className="block text-dark-blue font-medium mb-2 flex items-center">
                    <i className="fas fa-user text-primary mr-2"></i>
                    Nome
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={handleBlur}
                    placeholder="Seu nome completo" 
                    className={`w-full px-5 py-4 rounded-lg border ${
                      activeField === "name" ? "border-primary ring-2 ring-primary/20" : "border-gray-300"
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
                  />
                </motion.div>
                
                {/* Email field */}
                <motion.div 
                  custom={1}
                  variants={formFieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="md:col-span-1"
                >
                  <label htmlFor="email" className="block text-dark-blue font-medium mb-2 flex items-center">
                    <i className="fas fa-envelope text-primary mr-2"></i>
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={handleBlur}
                    placeholder="Seu email" 
                    className={`w-full px-5 py-4 rounded-lg border ${
                      activeField === "email" ? "border-primary ring-2 ring-primary/20" : "border-gray-300"
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
                  />
                </motion.div>
                
                {/* Phone field */}
                <motion.div 
                  custom={2}
                  variants={formFieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="md:col-span-1"
                >
                  <label htmlFor="phone" className="block text-dark-blue font-medium mb-2 flex items-center">
                    <i className="fas fa-phone text-primary mr-2"></i>
                    Telefone
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("phone")}
                    onBlur={handleBlur}
                    placeholder="Seu telefone" 
                    className={`w-full px-5 py-4 rounded-lg border ${
                      activeField === "phone" ? "border-primary ring-2 ring-primary/20" : "border-gray-300"
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
                  />
                </motion.div>
                
                {/* Service field */}
                <motion.div 
                  custom={3}
                  variants={formFieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="md:col-span-1"
                >
                  <label htmlFor="service" className="block text-dark-blue font-medium mb-2 flex items-center">
                    <i className="fas fa-tools text-primary mr-2"></i>
                    Serviço
                  </label>
                  <div className="relative">
                    <select 
                      id="service" 
                      value={formData.service}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("service")}
                      onBlur={handleBlur}
                      className={`w-full px-5 py-4 rounded-lg border ${
                        activeField === "service" ? "border-primary ring-2 ring-primary/20" : "border-gray-300"
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none`}
                    >
                      <option value="" disabled>Selecione o serviço desejado</option>
                      <option value="installation">Instalação Elétrica</option>
                      <option value="maintenance">Manutenção Preventiva</option>
                      <option value="repair">Reparos Emergenciais</option>
                      <option value="project">Projetos Elétricos</option>
                      <option value="panel">Quadros Elétricos</option>
                      <option value="lighting">Iluminação</option>
                      <option value="other">Outro</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                </motion.div>
                
                {/* Message field */}
                <motion.div 
                  custom={4}
                  variants={formFieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="md:col-span-2"
                >
                  <label htmlFor="message" className="block text-dark-blue font-medium mb-2 flex items-center">
                    <i className="fas fa-comment-alt text-primary mr-2"></i>
                    Mensagem
                  </label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={handleBlur}
                    placeholder="Descreva o serviço que você precisa" 
                    className={`w-full px-5 py-4 rounded-lg border ${
                      activeField === "message" ? "border-primary ring-2 ring-primary/20" : "border-gray-300"
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none`}
                  ></textarea>
                </motion.div>
                
                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="md:col-span-2"
                >
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <Button 
                      type="submit" 
                      className="w-full md:w-1/2 bg-primary hover:bg-blue-700 text-white py-4 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <motion.div 
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <i className="fas fa-paper-plane mr-2"></i>
                          Enviar Mensagem
                        </span>
                      )}
                    </Button>
                    
                    <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full md:w-1/2 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all"
                    >
                      <i className="fab fa-whatsapp text-lg"></i>
                      <span>Contato via WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Map or additional information section */}
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
      </div>
    </section>
  );
};

export default Contact;
