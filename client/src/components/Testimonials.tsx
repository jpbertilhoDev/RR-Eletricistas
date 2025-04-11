
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";

// Tipo para avaliações públicas
type PublicReview = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  time?: string;
  source: string;
  profilePhoto?: string;
};

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Buscar avaliações públicas da API (incluindo as do Google Maps)
  const { data: publicReviews, isLoading, error } = useQuery({
    queryKey: ['publicReviews'],
    queryFn: async () => {
      const response = await fetch('/api/public-reviews');
      if (!response.ok) {
        throw new Error('Erro ao buscar avaliações públicas');
      }
      return response.json();
    },
    enabled: true,
    staleTime: 60000, // 1 minuto
    refetchInterval: 60000, // Atualizar a cada minuto para tempo real
    refetchOnMount: true
  });

  // Estado para armazenar depoimentos filtrados
  const [filteredTestimonials, setFilteredTestimonials] = useState<PublicReview[]>([]);
  
  // Processar depoimentos quando os dados chegarem
  useEffect(() => {
    if (publicReviews?.success && Array.isArray(publicReviews?.data)) {
      // Filtrar avaliações com conteúdo substancial
      const reviewsWithContent = publicReviews.data.filter(
        (review: PublicReview) => review.content && review.content.length > 10
      );
      
      // Priorizar avaliações do Google Maps
      const googleReviews = reviewsWithContent.filter(
        (review: PublicReview) => review.source === "Google Maps"
      );
      
      // Configurar os depoimentos filtrados
      setFilteredTestimonials(googleReviews.length > 0 ? googleReviews : reviewsWithContent);
    }
  }, [publicReviews]);

  // Função para navegar para o depoimento anterior
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredTestimonials.length - 1 : prevIndex - 1
    );
  };

  // Função para navegar para o próximo depoimento
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === filteredTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Renderizar a mensagem de carregamento
  if (isLoading) {
    return (
      <section 
        id="depoimentos" 
        ref={sectionRef} 
        className="py-16 md:py-24 bg-black text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400"></div>
          <span className="ml-3 text-cyan-400">Carregando depoimentos...</span>
        </div>
      </section>
    );
  }

  // Renderizar mensagem de erro
  if (error || !filteredTestimonials.length) {
    return (
      <section 
        id="depoimentos" 
        ref={sectionRef} 
        className="py-16 md:py-24 bg-black text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Depoimentos</h2>
          <p className="text-gray-300">
            {error ? "Erro ao carregar depoimentos." : "Nenhum depoimento disponível no momento."}
          </p>
        </div>
      </section>
    );
  }

  // Depoimento atual
  const currentTestimonial = filteredTestimonials[currentIndex];

  return (
    <section 
      id="depoimentos" 
      ref={sectionRef} 
      className="py-16 md:py-24 min-h-[500px] bg-black text-white relative overflow-hidden"
    >
      {/* Elementos de fundo */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.span 
            className="text-cyan-400 font-medium text-sm tracking-wider uppercase bg-cyan-900/20 px-4 py-1 rounded-full inline-block"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            CLIENTES SATISFEITOS
          </motion.span>

          <motion.h2 
            className="text-white text-3xl font-bold mt-3 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            O que nossos clientes dizem
          </motion.h2>

          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A satisfação dos nossos clientes é nossa maior conquista
          </motion.p>
        </div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center flex-col md:flex-row gap-8 md:gap-16 relative">
            {/* Coluna da esquerda - Foto do cliente */}
            <div className="md:w-1/4 flex items-center justify-center">
              <div className="relative">
                <div className="absolute w-[120px] h-[120px] bg-cyan-500/30 rounded-full -top-2 -left-2"></div>
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg relative z-10">
                  {currentTestimonial.profilePhoto ? (
                    <img 
                      src={currentTestimonial.profilePhoto}
                      alt={currentTestimonial.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${currentTestimonial.name.split(' ').map(n => n[0]).join('')}&background=0D8A88&color=fff`;
                      }}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <img 
                      src={`https://ui-avatars.com/api/?name=${currentTestimonial.name.split(' ').map(n => n[0]).join('')}&background=0D8A88&color=fff`}
                      alt={currentTestimonial.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Coluna da direita - Conteúdo do depoimento */}
            <div className="md:w-3/4 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-1">{currentTestimonial.name}</h3>
              <p className="text-cyan-400 text-sm mb-2">{currentTestimonial.role}</p>
              
              <div className="flex mb-3">
                {Array.from({ length: Math.floor(currentTestimonial.rating || 5) }).map((_, i) => (
                  <i key={i} className="fas fa-star text-cyan-400 mr-1"></i>
                ))}
                {currentTestimonial.rating % 1 > 0 && (
                  <i className="fas fa-star-half-alt text-cyan-400 mr-1"></i>
                )}
              </div>
              
              <blockquote className="text-lg text-gray-200 italic mb-4 relative">
                <i className="fas fa-quote-left text-cyan-800 opacity-40 text-3xl absolute -left-6 -top-4"></i>
                "{currentTestimonial.content}"
              </blockquote>
              
              <div className="mt-auto flex justify-between items-center pt-4">
                <div className="flex items-center text-sm text-gray-400">
                  {currentTestimonial.source === "Google Maps" && (
                    <div className="flex items-center">
                      <i className="fab fa-google text-white mr-2"></i>
                      <span>{currentTestimonial.time || "Recentemente"}</span>
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-gray-400">
                  {currentIndex + 1}/{filteredTestimonials.length}
                </div>
              </div>
            </div>
          </div>

          {/* Controles de navegação */}
          <div className="flex justify-between items-center mt-10">
            <button 
              onClick={goToPrevious}
              className="h-10 w-10 rounded-full bg-cyan-900/30 text-cyan-400 flex items-center justify-center hover:bg-cyan-800/50 transition-all"
              aria-label="Depoimento anterior"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="flex gap-2">
              {filteredTestimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-cyan-400' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={goToNext}
              className="h-10 w-10 rounded-full bg-cyan-900/30 text-cyan-400 flex items-center justify-center hover:bg-cyan-800/50 transition-all"
              aria-label="Próximo depoimento"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </motion.div>

        {/* CTA abaixo dos depoimentos */}
        <motion.div 
          className="text-center mt-16 bg-cyan-900/20 p-8 rounded-xl max-w-3xl mx-auto border border-cyan-800/30"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Gostaria de resolver seu problema elétrico agora?</h3>
              <p className="text-gray-300">Nossos especialistas estão prontos para atender você</p>
            </div>
            <a
              href={`https://wa.me/+5511972650865?text=${encodeURIComponent("Olá, vi os depoimentos no site e gostaria de solicitar um orçamento.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors whitespace-nowrap flex-shrink-0"
            >
              <i className="fab fa-whatsapp mr-2 text-lg"></i>
              Fale conosco
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
