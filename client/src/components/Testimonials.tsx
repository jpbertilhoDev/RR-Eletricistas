import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Carlos Mendes",
    role: "Proprietário de Casa",
    text: "Excelente serviço! A equipe da RR Manutenções resolveu um problema elétrico complexo na minha residência com rapidez e profissionalismo. Superou minhas expectativas.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Mariana Costa",
    role: "Gerente de Loja",
    text: "Contratamos a RR para fazer toda a instalação elétrica do nosso novo espaço comercial. O trabalho foi impecável, dentro do prazo e com um excelente custo-benefício.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Paulo Ribeiro",
    role: "Engenheiro Civil",
    text: "Como profissional da área, posso atestar a qualidade técnica do serviço prestado. Todos os padrões de segurança foram seguidos e o acabamento foi perfeito.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/62.jpg"
  },
  {
    id: 4,
    name: "Fernanda Oliveira",
    role: "Empresária",
    text: "Minha empresa passou por uma reforma completa na parte elétrica. A equipe da RR foi atenciosa, eficiente e manteve tudo limpo e organizado durante o serviço.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg"
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
      duration: 0.6
    }
  }
};

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="depoimentos" ref={sectionRef} className="py-24 bg-white md:block">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full">O que nossos clientes dizem</span>
          <h2 className="text-dark-blue text-3xl font-bold mt-3 mb-4">Depoimentos de quem confia no nosso trabalho</h2>
          <p className="text-deep-blue max-w-2xl mx-auto">
            A satisfação dos nossos clientes é o que nos move a cada dia.
            Confira alguns depoimentos de pessoas que confiaram em nossos serviços.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              variants={itemVariants}
            >
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-dark-blue">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-yellow-400 text-sm mr-1"></i>
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="relative">
                <i className="fas fa-quote-left text-blue-100 text-4xl absolute -top-2 -left-2 opacity-50"></i>
                <p className="text-deep-blue relative z-10 pl-4">{testimonial.text}</p>
              </blockquote>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-blue-600 font-medium">Avaliação média de 5.0 <i className="fas fa-star text-yellow-400 ml-1"></i></p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="h-5 mr-2" />
              <span className="text-gray-700 font-medium">Google Reviews</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center">
              <i className="fab fa-facebook text-blue-600 mr-2"></i>
              <span className="text-gray-700 font-medium">Facebook</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}