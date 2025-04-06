import { useRef } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(sectionRef);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="projetos" ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-yellow-600 font-semibold">NOSSOS PROJETOS</span>
          <h2 className="text-3xl font-bold mt-2">Trabalhos Realizados</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Conheça alguns dos nossos trabalhos realizados com excelência e profissionalismo.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PROJECTS.map((project) => (
            <motion.div 
              key={project.id}
              className="overflow-hidden rounded-xl shadow-md transform hover:scale-103 transition-all duration-300"
              variants={itemVariants}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.imageSrc} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
