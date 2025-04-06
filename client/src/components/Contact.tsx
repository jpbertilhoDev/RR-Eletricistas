import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO, SOCIAL_MEDIA, WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(sectionRef);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

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
    
    // Show success message (in a real app we would send this data to a server)
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
      variant: "default"
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    });
  };

  return (
    <section id="contato" ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-yellow-600 font-semibold">ENTRE EM CONTATO</span>
          <h2 className="text-3xl font-bold mt-2">Solicite um Orçamento</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Entre em contato conosco para solicitar um orçamento gratuito ou tirar suas dúvidas.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-50 p-8 rounded-xl shadow-md h-full">
              <h3 className="text-xl font-semibold mb-4">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-yellow-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Telefone</h4>
                    <p className="text-gray-700">{CONTACT_INFO.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-yellow-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-700">{CONTACT_INFO.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-yellow-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Endereço</h4>
                    <p className="text-gray-700">{CONTACT_INFO.address}</p>
                    <p className="text-gray-700">{CONTACT_INFO.addressDetails}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-yellow-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Horário de Atendimento</h4>
                    {CONTACT_INFO.hours.map((hour, index) => (
                      <p key={index} className="text-gray-700">{hour}</p>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
                <div className="flex space-x-4">
                  {SOCIAL_MEDIA.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary hover:bg-yellow-600 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-6">Envie sua mensagem</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nome</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-yellow-200 focus:ring-opacity-50 transition-colors" 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Seu email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-yellow-200 focus:ring-opacity-50 transition-colors" 
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telefone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Seu telefone" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-yellow-200 focus:ring-opacity-50 transition-colors" 
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-gray-700 font-medium mb-2">Serviço</label>
                  <select 
                    id="service" 
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-yellow-200 focus:ring-opacity-50 transition-colors"
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
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensagem</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Descreva o serviço que você precisa" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-yellow-200 focus:ring-opacity-50 transition-colors resize-none"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Enviar Mensagem
                </Button>
                
                <p className="text-center text-gray-500 text-sm mt-4">
                  Ou entre em contato diretamente pelo WhatsApp
                </p>
                
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                  <span>WhatsApp</span>
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
