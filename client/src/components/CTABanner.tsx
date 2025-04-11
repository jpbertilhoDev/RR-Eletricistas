import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const CTABanner = () => {
  return (
    <section className="relative bg-blue-600 py-12 overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 -mr-32 -mt-32"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 -ml-32 -mb-32"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-white text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Quer resolver seu problema elétrico agora?
          </motion.h2>
          <motion.p 
            className="text-blue-100 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Nossos especialistas estão prontos para atender você com qualidade e segurança
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="secondary" 
                size="lg"
                className="px-8 py-3 text-primary font-medium shadow-lg whatsapp-btn"
              >
                <i className="fab fa-whatsapp mr-2 text-xl"></i>
                Fale conosco
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;