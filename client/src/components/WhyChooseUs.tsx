import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const DIFFERENTIALS = [
  {
    id: 1,
    title: "Atendimento Rápido",
    description: "Chegamos ao local em até 60 minutos para emergências.",
    icon: "fas fa-bolt"
  },
  {
    id: 2,
    title: "Garantia de Serviço",
    description: "Todos os nossos serviços possuem garantia de 90 dias.",
    icon: "fas fa-shield-alt"
  },
  {
    id: 3,
    title: "Equipe Qualificada",
    description: "Técnicos com formação e certificações na área elétrica.",
    icon: "fas fa-user-tie"
  },
  {
    id: 4,
    title: "Orçamento Transparente",
    description: "Sem surpresas ou custos ocultos durante o serviço.",
    icon: "fas fa-hand-holding-usd"
  },
  {
    id: 5,
    title: "Materiais de Qualidade",
    description: "Utilizamos apenas materiais de marcas reconhecidas.",
    icon: "fas fa-award"
  },
  {
    id: 6,
    title: "Segurança em Primeiro Lugar",
    description: "Seguimos rigorosamente normas de segurança em todos os projetos.",
    icon: "fas fa-hard-hat"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
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
    <section id="porque-escolher" ref={sectionRef} className="py-24 bg-gray-50 md:block">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full">Nossos Diferenciais</span>
          <h2 className="text-dark-blue text-3xl font-bold mt-3 mb-4">Por que escolher a RR Manutenções?</h2>
          <p className="text-deep-blue max-w-2xl mx-auto">
            Conheça as vantagens que fazem da nossa empresa a escolha preferida quando o assunto é serviços elétricos.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {DIFFERENTIALS.map((item) => (
            <motion.div 
              key={item.id}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-blue-600 text-xl`}></i>
                </div>
                <h3 className="font-semibold text-xl text-dark-blue mb-3">{item.title}</h3>
                <p className="text-deep-blue">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <div className="p-8 bg-blue-600 text-white rounded-xl max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-dotted-white opacity-10"></div>
            <h3 className="text-2xl font-bold mb-4">Pronto para um serviço elétrico de qualidade?</h3>
            <p className="mb-6 text-blue-50">Nossa equipe está preparada para atender todas as suas necessidades elétricas com excelência.</p>
            <div className="flex justify-center space-x-4">
              <a href="#contato" className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-300">Solicitar Orçamento</a>
              <a href="tel:+551199999999" className="px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors duration-300">
                <i className="fas fa-phone-alt mr-2"></i>Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}