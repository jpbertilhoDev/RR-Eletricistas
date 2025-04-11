import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const diferenciais = [
    {
      id: "preventiva",
      title: "Manutenção Preventiva",
      description: "Evite falhas antes que aconteçam com nossas verificações programadas.",
      icon: "shield",
      cta: "Reduz custos em 60%",
    },
    {
      id: "atendimento",
      title: "Atendimento 24/7",
      description: "Emergências elétricas não esperam. Estamos disponíveis quando você precisar.",
      icon: "clock",
      cta: "Suporte imediato",
    },
    {
      id: "profissionais",
      title: "Profissionais Qualificados",
      description: "Técnicos com certificação NR-10 e experiência comprovada.",
      icon: "certificate",
      cta: "Segurança garantida",
    },
    {
      id: "tecnologia",
      title: "Tecnologia Avançada",
      description: "Utilizamos equipamentos modernos para diagnósticos precisos.",
      icon: "microchip",
      cta: "Alta precisão",
    },
    {
      id: "garantia",
      title: "Garantia de Serviço",
      description: "Todos os nossos serviços possuem garantia estendida.",
      icon: "award",
      cta: "Até 12 meses",
    },
    {
      id: "solucoes",
      title: "Soluções Personalizadas",
      description: "Projetos adaptados às suas necessidades específicas.",
      icon: "bolt",
      cta: "Eficiência energética",
    }
  ];

  return (
    <section 
      className="py-16 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden" 
      id="diferenciais" 
      ref={containerRef}
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-30 translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <motion.span 
            className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full inline-block shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            NOSSOS DIFERENCIAIS
          </motion.span>

          <motion.h2 
            className="text-dark-blue text-3xl font-bold mt-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Por Que Escolher a <span className="text-blue-600">R.R</span>?
          </motion.h2>

          <motion.p 
            className="text-deep-blue/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Qualidade, confiança e segurança são nossa garantia. Veja o que nos destaca.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
              containScroll: "trimSnaps"
            }}
            className="w-full"
            onSelect={(api) => {
              if (api) setCurrentSlide(api.selectedScrollSnap());
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {diferenciais.map((item, index) => (
                <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30 text-center">
                    <div className="flex justify-center mb-5">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className={`fas fa-${item.icon} text-blue-600 text-xl`}></i>
                      </div>
                    </div>
                    <h3 className="font-bold text-dark-blue text-lg mb-3">{item.title}</h3>
                    <p className="text-deep-blue/70 text-sm mb-4 flex-grow">{item.description}</p>
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <span className="inline-flex items-center text-blue-600 font-medium text-sm">
                        <i className="fas fa-check-circle mr-2"></i>
                        {item.cta}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious className="h-9 w-9 -left-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text:blue-600 hover:border-blue-200" />
              <CarouselNext className="h-9 w-9 -right-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" />
            </div>
          </Carousel>

          {/* Indicadores para dispositivos móveis */}
          <div className="flex justify-center mt-6 gap-2 md:hidden">
            {diferenciais.map((_, index) => (
              <div 
                key={index} 
                className={`w-2.5 h-2.5 rounded-full ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'} transition-all duration-300`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-12 bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-dark-blue mb-2">Pronto para conhecer a diferença R.R?</h3>
              <p className="text-deep-blue">Entre em contato para um orçamento sem compromisso</p>
            </div>
            <a
              href={`https://wa.me/+5511972650865?text=${encodeURIComponent("Olá, gostaria de saber mais sobre os diferenciais da empresa.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap flex-shrink-0"
            >
              <i className="fab fa-whatsapp mr-2 text-lg"></i>
              Fale conosco
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;