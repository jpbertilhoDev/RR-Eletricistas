import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useAnimateOnScroll(heroRef);

  return (
    <section 
      id="inicio" 
      ref={heroRef}
      className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-r from-primary to-yellow-500"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Serviços Elétricos com Qualidade e Rapidez
            </h1>
            <p className="text-lg md:text-xl text-white opacity-90 mb-8">
              Especialistas em instalações e manutenções elétricas residenciais e comerciais.
              Atendimento rápido e profissional.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="whatsapp" 
                  size="xl"
                  className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all w-full sm:w-auto"
                >
                  <i className="fab fa-whatsapp text-xl mr-2"></i>
                  Falar com eletricista
                </Button>
              </a>
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-white text-gray-800 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all w-full sm:w-auto"
                onClick={() => {
                  const servicesSection = document.getElementById("servicos");
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <i className="fas fa-tools mr-2"></i>
                Nossos serviços
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 mt-10 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
              alt="Eletricista profissional trabalhando" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
