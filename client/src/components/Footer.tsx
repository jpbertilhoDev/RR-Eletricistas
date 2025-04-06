import { NAVIGATION_ITEMS, CONTACT_INFO, SOCIAL_MEDIA } from "@/lib/constants";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  useAnimateOnScroll(footerRef);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  // Animações para os elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Elementos decorativos para o footer
  const footerDecoration = [
    { top: "-30px", left: "5%", size: "120px", rotate: "20deg", delay: 0.2 },
    { top: "-20px", right: "10%", size: "80px", rotate: "-15deg", delay: 0.4 },
    { bottom: "20%", left: "15%", size: "60px", rotate: "30deg", delay: 0.6 },
    { bottom: "10%", right: "8%", size: "90px", rotate: "-25deg", delay: 0.3 },
  ];

  return (
    <footer ref={footerRef} className="relative bg-gray-900 text-white pt-16 pb-8 overflow-hidden">
      {/* Partículas decorativas */}
      {footerDecoration.map((item, index) => (
        <motion.div
          key={index}
          className="absolute opacity-5 bg-primary/20 rounded-full"
          style={{
            width: item.size,
            height: item.size,
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            rotate: item.rotate,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ 
            opacity: 0.05, 
            scale: 1,
            rotate: `calc(${item.rotate} + 360deg)`,
          }}
          transition={{ 
            duration: 20, 
            delay: item.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear" 
          }}
          viewport={{ once: false }}
        />
      ))}
      
      {/* Linhas de grid elétricas */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-full h-px bg-blue-500/10 top-1/4 animate-pulse-slow"></div>
        <div className="absolute w-full h-px bg-blue-500/10 top-2/4 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
        <div className="absolute w-full h-px bg-blue-500/10 top-3/4 animate-pulse-slow" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute h-full w-px bg-blue-500/10 left-1/4 animate-pulse-slow" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute h-full w-px bg-blue-500/10 left-2/4 animate-pulse-slow" style={{ animationDelay: "1.2s" }}></div>
        <div className="absolute h-full w-px bg-blue-500/10 left-3/4 animate-pulse-slow" style={{ animationDelay: "0.8s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4">
              <motion.span 
                className="text-primary text-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                ⚡
              </motion.span>
              <h2 className="text-2xl font-bold">RR Manutenções Elétricas</h2>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Soluções elétricas completas para residências e comércios com qualidade, segurança e profissionalismo.
            </p>
            <div className="flex space-x-5">
              {SOCIAL_MEDIA.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors text-xl"
                  whileHover={{ 
                    scale: 1.2, 
                    color: "#4299e1",
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <motion.i 
                className="fas fa-bolt text-primary mr-2"
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
              />
              Serviços
            </h3>
            <ul className="space-y-3 text-gray-400">
              {["Instalações Elétricas", "Manutenção Preventiva", "Reparos Emergenciais", 
                "Projetos Elétricos", "Quadros Elétricos", "Iluminação"].map((service, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5, color: "#4299e1" }}
                  transition={{ duration: 0.2 }}
                >
                  <button 
                    onClick={() => scrollToSection("servicos")} 
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <motion.span 
                      className="mr-2 text-xs opacity-70"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                    >
                      ›
                    </motion.span>
                    {service}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <motion.i 
                className="fas fa-link text-primary mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              Links Rápidos
            </h3>
            <ul className="space-y-3 text-gray-400">
              {NAVIGATION_ITEMS.map((item, index) => (
                <motion.li 
                  key={item.id}
                  whileHover={{ x: 5, color: "#4299e1" }}
                  transition={{ duration: 0.2 }}
                >
                  <button 
                    onClick={() => scrollToSection(item.id)} 
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <motion.span 
                      className="mr-2 text-xs opacity-70"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                    >
                      ›
                    </motion.span>
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <motion.i 
                className="fas fa-phone-alt text-primary mr-2"
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
              />
              Contato
            </h3>
            <ul className="space-y-4 text-gray-400">
              {[
                { icon: "fas fa-phone-alt", text: CONTACT_INFO.phone, animation: "rotate" },
                { icon: "fas fa-envelope", text: CONTACT_INFO.email, animation: "scale" },
                { icon: "fas fa-map-marker-alt", text: CONTACT_INFO.address, animation: "pulse" },
                { icon: "fas fa-clock", text: "Seg-Sex: 08h-18h", animation: "none" }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start space-x-3"
                  whileHover={{ x: 2 }}
                >
                  <motion.i 
                    className={`${item.icon} mt-1 text-primary/70`}
                    animate={
                      item.animation === "rotate" 
                        ? { rotate: [0, 15, 0, -15, 0] } 
                        : item.animation === "scale" 
                          ? { scale: [1, 1.2, 1] } 
                          : item.animation === "pulse" 
                            ? { opacity: [0.7, 1, 0.7] } 
                            : {}
                    }
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      delay: index * 0.2 
                    }}
                  />
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Linha com efeito elétrico */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-6">
            <motion.div 
              className="h-full w-20 bg-primary/60"
              animate={{ 
                x: ["-100%", "100%"],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} R.R Manutenções e Instalações Elétricas • Todos os direitos reservados</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
