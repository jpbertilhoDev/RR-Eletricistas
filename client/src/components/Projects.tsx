import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { useIsMobile } from "@/hooks/use-mobile";

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(sectionRef);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const isMobile = useIsMobile();

  // Variants de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  const imageVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.4 }
    }
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="projetos" ref={sectionRef} className="py-6 md:py-16 bg-gray-50 relative overflow-hidden">
      <motion.div 
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-100/10 blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-blue-100/30 blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-blue-600 font-medium text-sm tracking-wider">NOSSOS PROJETOS</span>
          <h2 className="text-dark-blue text-3xl font-bold mt-2 mb-3">Trabalhos Realizados</h2>
          <p className="text-deep-blue max-w-2xl mx-auto">
            Conheça alguns dos nossos trabalhos realizados com excelência e profissionalismo.
            Nossa equipe executa projetos para residências, comércios e pequenas indústrias.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PROJECTS.map((project) => (
            <motion.div 
              key={project.id}
              className="overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-60 overflow-hidden">
                <motion.img 
                  src={project.imageSrc} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  variants={imageVariants}
                  initial="initial"
                  animate={hoveredProject === project.id ? "hover" : "initial"}
                />
                
                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end"
                      variants={overlayVariants}
                      initial="hidden"
                      animate="hover"
                      exit="hidden"
                    >
                      <div className="p-4 text-white">
                        <motion.h4 
                          className="font-bold text-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                        >
                          {project.title}
                        </motion.h4>
                        <motion.div 
                          className="h-1 w-12 bg-blue-400 my-2"
                          initial={{ width: 0 }}
                          animate={{ width: 48 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold text-lg text-dark-blue">{project.title}</h3>
                <p className="text-deep-blue mt-2">{project.description}</p>
                
                {/* Indicadores de serviço */}
                <div className="flex mt-4">
                  <motion.div
                    className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium mr-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <i className="fas fa-check-circle mr-1"></i>
                    Realizado
                  </motion.div>
                  <motion.div
                    className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-md font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <i className="fas fa-shield-alt mr-1"></i>
                    Garantia
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Texto adicional abaixo dos projetos */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p className="text-deep-blue">
            Estes são apenas alguns exemplos de nossos trabalhos recentes. 
            Entre em contato para mais informações ou para solicitar um orçamento personalizado.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
