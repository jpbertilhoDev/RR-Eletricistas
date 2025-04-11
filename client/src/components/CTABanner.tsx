
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const CTABanner = () => {
  return (
    <section className="w-full bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-dark-blue">Quer resolver seu problema elétrico agora?</h3>
              <p className="mt-2 text-sm md:text-base text-deep-blue">
                Nossos especialistas estão prontos para atender você com qualidade e segurança
              </p>
            </div>
            
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg shadow-sm text-sm md:text-base font-medium whatsapp-btn w-full md:w-auto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="fab fa-whatsapp mr-2 text-lg"></i>
              Fale conosco
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
