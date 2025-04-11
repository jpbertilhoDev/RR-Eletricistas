
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const VideoPresentation = () => {
  return (
    <section id="video-apresentacao" className="w-full py-24 relative">
      {/* Fundo com gradiente suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-0"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-48 h-48 bg-blue-50/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full shadow-sm inline-block mb-3">
            CONHEÇA NOSSA EMPRESA
          </span>
          <h2 className="text-dark-blue text-3xl md:text-4xl font-bold mt-4 mb-5">
            Veja como trabalhamos para sua segurança
          </h2>
          <p className="text-deep-blue/80 max-w-2xl mx-auto text-base md:text-lg">
            Assista nosso vídeo institucional e descubra como nossa equipe de profissionais 
            certificados trabalha para garantir instalações elétricas seguras e eficientes.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-5xl mx-auto mb-16"
        >
          {/* Efeito de brilho ao redor do vídeo */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur-md opacity-30"></div>
          
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            <iframe 
              src="https://www.youtube.com/embed/UUq4Sp871pM?si=lS14D5AE6pcXqGQY" 
              title="Vídeo de Apresentação RR Manutenções Elétricas" 
              className="absolute top-0 left-0 w-full h-full" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </motion.div>
        
        {/* Benefícios em cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
        >
          {[
            { 
              icon: "fas fa-shield-alt", 
              title: "Segurança Garantida", 
              description: "Todos os serviços seguem rigorosamente as normas de segurança." 
            },
            { 
              icon: "fas fa-certificate", 
              title: "Profissionais Certificados", 
              description: "Equipe técnica com certificações e treinamentos contínuos." 
            },
            { 
              icon: "fas fa-tools", 
              title: "Equipamentos Modernos", 
              description: "Utilizamos ferramentas e tecnologias de última geração." 
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <i className={`${item.icon} text-primary text-xl`}></i>
              </div>
              <h3 className="text-dark-blue font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-deep-blue/80">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call-to-action após o vídeo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center bg-white px-6 py-4 rounded-full shadow-md">
            <span className="text-deep-blue mb-3 sm:mb-0 sm:mr-4">Precisa de serviços elétricos profissionais?</span>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2 bg-primary text-white rounded-full transition-colors shadow-sm whatsapp-btn"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Solicitar orçamento
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Separador sutil */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    </section>
  );
};

export default VideoPresentation;
