import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO, SOCIAL_MEDIA, WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

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
  
  // Animação de partículas elétricas quando o formulário for enviado com sucesso
  const [showSuccessEffect, setShowSuccessEffect] = useState(false);

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
  
  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service_type: data.service,
          message: data.message,
          read: 0  // Mensagem não lida inicialmente
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
        variant: "default"
      });
      
      // Mostrar efeito de sucesso
      setShowSuccessEffect(true);
      
      // Ocultar o efeito após alguns segundos
      setTimeout(() => {
        setShowSuccessEffect(false);
      }, 3000);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
      });
    },
    onError: (error) => {
      console.error("Erro ao enviar mensagem:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.",
        variant: "destructive"
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos do formulário.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    contactMutation.mutate(formData);
  };

  // Variantes de animação
  const contactItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };
  
  const formFieldVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const electricParticle = {
    visible: {
      opacity: [0, 0.8, 0],
      scale: [0.2, 1, 0.2],
      y: [0, -100],
    }
  };

  return (
    <section id="contato" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Padrão de fundo sutil */}
      <div className="absolute inset-0 bg-grid-white opacity-50 pointer-events-none"></div>
      
      {/* Elementos decorativos */}
      <motion.div 
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-primary/5 blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-primary/5 blur-xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Efeito de sucesso - partículas */}
      {showSuccessEffect && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{
                left: `${40 + Math.random() * 20}%`,
                top: `${40 + Math.random() * 20}%`,
              }}
              variants={electricParticle}
              animate="visible"
              transition={{
                duration: 1 + Math.random(),
                ease: "easeOut",
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            ENTRE EM CONTATO
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Solicite um Orçamento</h2>
          <p className="text-gray-600 text-lg mt-3 max-w-2xl mx-auto">
            Entre em contato conosco para solicitar um orçamento gratuito ou tirar suas dúvidas.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 h-full relative">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl"></div>
              
              <div className="relative">
                <h3 className="text-xl font-bold mb-8 flex items-center text-gray-900">
                  <motion.i 
                    className="fas fa-headset text-primary mr-2"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  ></motion.i>
                  Informações de Contato
                </h3>
                
                <div className="space-y-8">
                  {[
                    { icon: "fas fa-phone", title: "Telefone", content: CONTACT_INFO.phone, animation: "rotate" },
                    { icon: "fas fa-envelope", title: "Email", content: CONTACT_INFO.email, animation: "scale" },
                    { icon: "fas fa-map-marker-alt", title: "Endereço", content: [CONTACT_INFO.address, CONTACT_INFO.addressDetails], animation: "pulse" },
                    { icon: "fas fa-clock", title: "Horário de Atendimento", content: CONTACT_INFO.hours, animation: "bounce" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start space-x-5"
                      custom={index}
                      variants={contactItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-primary"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                        animate={
                          item.animation === "rotate" 
                            ? { rotate: [0, 10, 0, -10, 0] } 
                            : item.animation === "scale" 
                              ? { scale: [1, 1.1, 1] } 
                              : item.animation === "pulse" 
                                ? { opacity: [0.7, 1, 0.7] } 
                                : { y: [0, -5, 0] }
                        }
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      >
                        <i className={`${item.icon} text-xl`}></i>
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                        {Array.isArray(item.content) ? (
                          item.content.map((line, i) => (
                            <p key={i} className="text-gray-600">{line}</p>
                          ))
                        ) : (
                          <p className="text-gray-600">{item.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h3 className="text-xl font-bold mb-5 flex items-center text-gray-900">
                    <motion.i 
                      className="fas fa-share-alt text-primary mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    ></motion.i>
                    Redes Sociais
                  </h3>
                  <div className="flex space-x-4">
                    {SOCIAL_MEDIA.map((social, index) => (
                      <motion.a 
                        key={index}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
                        whileHover={{ 
                          scale: 1.1, 
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.7 }}
                      >
                        <i className={`${social.icon} text-lg`}></i>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 relative">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-grid-white opacity-30 rounded-xl"></div>
              
              <div className="relative">
                <motion.h3 
                  className="text-xl font-bold mb-6 flex items-center text-gray-900"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.i 
                    className="fas fa-paper-plane text-primary mr-2"
                    animate={{ 
                      x: [0, 5, 0],
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  ></motion.i>
                  Envie sua mensagem
                </motion.h3>
                
                <div className="space-y-5">
                  {[
                    { id: "name", label: "Nome", type: "text", placeholder: "Seu nome completo", icon: "fas fa-user" },
                    { id: "email", label: "Email", type: "email", placeholder: "Seu email", icon: "fas fa-envelope" },
                    { id: "phone", label: "Telefone", type: "tel", placeholder: "Seu telefone", icon: "fas fa-phone" }
                  ].map((field, index) => (
                    <motion.div 
                      key={field.id}
                      custom={index}
                      variants={formFieldVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <label htmlFor={field.id} className="block text-gray-700 font-medium mb-2 flex items-center">
                        <i className={`${field.icon} text-primary mr-2 text-sm`}></i>
                        {field.label}
                      </label>
                      <div className="relative">
                        <AnimatePresence>
                          {activeField === field.id && (
                            <motion.div 
                              className="absolute -inset-0.5 bg-primary/20 rounded-lg blur-sm"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </AnimatePresence>
                        <input 
                          type={field.type} 
                          id={field.id} 
                          value={formData[field.id as keyof typeof formData]}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus(field.id)}
                          onBlur={handleBlur}
                          placeholder={field.placeholder} 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50 transition-all duration-300 relative bg-white" 
                        />
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.div 
                    custom={3}
                    variants={formFieldVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label htmlFor="service" className="block text-gray-700 font-medium mb-2 flex items-center">
                      <i className="fas fa-tools text-primary mr-2 text-sm"></i>
                      Serviço
                    </label>
                    <div className="relative">
                      <AnimatePresence>
                        {activeField === "service" && (
                          <motion.div 
                            className="absolute -inset-0.5 bg-primary/20 rounded-lg blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                      <select 
                        id="service" 
                        value={formData.service}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("service")}
                        onBlur={handleBlur}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50 transition-all duration-300 relative bg-white appearance-none"
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
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                        <i className="fas fa-chevron-down"></i>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    custom={4}
                    variants={formFieldVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2 flex items-center">
                      <i className="fas fa-comment-alt text-primary mr-2 text-sm"></i>
                      Mensagem
                    </label>
                    <div className="relative">
                      <AnimatePresence>
                        {activeField === "message" && (
                          <motion.div 
                            className="absolute -inset-0.5 bg-primary/20 rounded-lg blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                      <textarea 
                        id="message" 
                        rows={4} 
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("message")}
                        onBlur={handleBlur}
                        placeholder="Descreva o serviço que você precisa" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50 transition-all duration-300 resize-none relative bg-white"
                      ></textarea>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
                      disabled={isSubmitting || contactMutation.isPending}
                    >
                      {isSubmitting || contactMutation.isPending ? (
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
                  </motion.div>
                  
                  <motion.div
                    className="text-center mt-6 relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <p className="text-gray-500 text-sm my-3">
                      Ou entre em contato diretamente pelo WhatsApp
                    </p>
                    
                    <motion.a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.i 
                        className="fab fa-whatsapp text-xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.i>
                      <span>Contato via WhatsApp</span>
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
