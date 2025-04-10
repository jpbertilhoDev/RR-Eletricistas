
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="porque-escolher" ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full">Nossos Diferenciais</span>
          <h2 className="text-dark-blue text-4xl font-bold mt-3 mb-4">Por que escolher a RR Manutenções?</h2>
          <p className="text-deep-blue max-w-2xl mx-auto text-lg">
            Conheça as vantagens que fazem da nossa empresa a escolha preferida quando o assunto é segurança e eficiência elétrica.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-certificate text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-dark-blue mb-3">Excelência Garantida</h3>
            <p className="text-deep-blue flex-grow">
              Com mais de 10 anos de experiência, oferecemos serviços com garantia real e compromisso com a qualidade que você pode confiar.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a href="#contato" className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors group">
                <span>Garanta sua segurança</span>
                <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-bolt text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-dark-blue mb-3">Equipe Especializada</h3>
            <p className="text-deep-blue flex-grow">
              Técnicos altamente qualificados, certificados e em constante atualização para oferecer as melhores soluções do mercado.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a href="#contato" className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors group">
                <span>Conheça nossos especialistas</span>
                <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-tools text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-dark-blue mb-3">Equipamentos Modernos</h3>
            <p className="text-deep-blue flex-grow">
              Utilizamos tecnologia de ponta e ferramentas de última geração para diagnósticos precisos e soluções eficientes.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a href="#contato" className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors group">
                <span>Conheça nossa tecnologia</span>
                <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-clock text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-dark-blue mb-3">Atendimento Ágil</h3>
            <p className="text-deep-blue flex-grow">
              Resposta rápida em situações de emergência e agendamentos que respeitam seu tempo e sua rotina.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a href="#contato" className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors group">
                <span>Agende seu atendimento</span>
                <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-shield-alt text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-dark-blue mb-3">Segurança Garantida</h3>
            <p className="text-deep-blue flex-grow">
              Serviços realizados seguindo rigorosas normas técnicas e de segurança, protegendo você e seu patrimônio.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a href="#contato" className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors group">
                <span>Proteja seu imóvel</span>
                <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-hand-holding-usd text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-dark-blue mb-3">Preço Transparente</h3>
            <p className="text-deep-blue flex-grow">
              Orçamentos claros, sem surpresas ou taxas ocultas. Excelente relação custo-benefício para cada projeto.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a href="#contato" className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors group">
                <span>Solicite um orçamento</span>
                <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 p-8 md:p-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl max-w-5xl mx-auto relative overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-repeat opacity-10" style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")" 
          }}></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6">Você já pensou em quanto está perdendo por não ter uma instalação elétrica adequada?</h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <i className="fas fa-exclamation-triangle mr-3 text-yellow-300"></i>
                  Os riscos de negligenciar
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-times-circle mt-1 mr-2 text-red-300"></i>
                    <span>Aumento no consumo de energia e contas mais caras</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-times-circle mt-1 mr-2 text-red-300"></i>
                    <span>Risco de incêndios e danos ao seu patrimônio</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-times-circle mt-1 mr-2 text-red-300"></i>
                    <span>Equipamentos que queimam frequentemente</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-times-circle mt-1 mr-2 text-red-300"></i>
                    <span>Depreciação do valor do seu imóvel</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <i className="fas fa-check-circle mr-3 text-green-300"></i>
                  Os benefícios da escolha certa
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle mt-1 mr-2 text-green-300"></i>
                    <span>Economia de até 30% na conta de energia</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle mt-1 mr-2 text-green-300"></i>
                    <span>Proteção total para sua família e patrimônio</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle mt-1 mr-2 text-green-300"></i>
                    <span>Maior vida útil para todos os seus aparelhos</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle mt-1 mr-2 text-green-300"></i>
                    <span>Valorização imediata do seu imóvel</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <p className="text-xl mb-8 font-medium">
              A decisão que você tomar hoje sobre sua instalação elétrica afetará os próximos <span className="underline decoration-yellow-300 decoration-2">10 anos</span> da sua vida. Quanto vale a segurança da sua família?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contato" 
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors duration-300 text-lg text-center flex items-center justify-center group"
              >
                <span>Solicitar Orçamento Gratuito</span>
                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
              </a>
              <a 
                href="tel:+551199999999" 
                className="px-8 py-4 bg-blue-700 border-2 border-white text-white font-bold rounded-lg hover:bg-blue-800 transition-colors duration-300 text-lg text-center flex items-center justify-center"
              >
                <i className="fas fa-phone-alt mr-3 animate-pulse"></i>
                <span>Atendimento Emergencial</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
