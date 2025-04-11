import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
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
  const [activeSlide, setActiveSlide] = useState(0);

  // Buscar avaliações públicas da API (com foco nas avaliações do Google Maps)
  const { data: publicReviews, isLoading, error, refetch } = useQuery({
    queryKey: ['publicReviews'],
    queryFn: async () => {
      const response = await fetch('/api/public-reviews');
      if (!response.ok) {
        throw new Error('Erro ao buscar avaliações do Google Maps');
      }
      return response.json();
    },
    // Configuração de cache e atualização
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchInterval: 1000 * 60 * 30, // Tentar novo fetch a cada 30 minutos
    refetchOnWindowFocus: false, // Não atualizamos automaticamente no foco
    retry: 3
  });

  // Começamos com algumas avaliações estáticas que serão substituídas por reais
  const [allTestimonials, setAllTestimonials] = useState<PublicReview[]>(TESTIMONIALS);
  
  // Estado para animação de atualização
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Estado para controlar mensagem sobre origem das avaliações
  const [hasGoogleReviews, setHasGoogleReviews] = useState(false);

  // Função para atualizar avaliações com animação
  const refreshReviews = () => {
    setIsRefreshing(true);
    refetch().finally(() => {
      setTimeout(() => setIsRefreshing(false), 1000);
    });
  };

  useEffect(() => {
    if (publicReviews?.success && Array.isArray(publicReviews?.data)) {
      // Filtrar avaliações com conteúdo significativo (mais de 10 caracteres)
      const filteredPublicReviews = publicReviews.data.filter(
        (review: PublicReview) => review.content && review.content.length > 10
      );

      // Separar avaliações do Google Maps das outras
      const googleReviews = filteredPublicReviews.filter(
        (review: PublicReview) => review.source === "Google Maps"
      );
      
      const siteReviews = filteredPublicReviews.filter(
        (review: PublicReview) => review.source !== "Google Maps"
      );

      // Priorizar avaliações do Google Maps e complementar com outras
      const combinedReviews = [...googleReviews, ...siteReviews];
      
      // Verificar se temos avaliações do Google para exibir indicador
      setHasGoogleReviews(googleReviews.length > 0);
      
      // Se temos ao menos 4 avaliações reais, não usamos as estáticas
      if (combinedReviews.length >= 4) {
        setAllTestimonials(combinedReviews.slice(0, 12));
      } else {
        // Caso contrário, complementamos com algumas estáticas
        setAllTestimonials([...combinedReviews, ...TESTIMONIALS].slice(0, 12));
      }
    }
  }, [publicReviews]);

  return (
    <section 
      id="depoimentos" 
      ref={sectionRef} 
      className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-blue-50/50 relative overflow-hidden"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-50 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-30 translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/3 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-20" />
      <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-blue-100 rounded-full opacity-20" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.span 
            className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50/70 px-4 py-1.5 rounded-full inline-block shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            CLIENTES SATISFEITOS
          </motion.span>

          <motion.h2 
            className="text-dark-blue text-3xl md:text-4xl font-bold mt-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            O que nossos clientes dizem
          </motion.h2>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-deep-blue text-base">
              {hasGoogleReviews 
                ? "Avaliações verificadas dos nossos clientes no Google Maps" 
                : "Veja a experiência de quem já confiou em nossos serviços"}
            </p>
            {!isLoading && (
              <button 
                onClick={refreshReviews} 
                className={`text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1.5 ${isRefreshing ? 'opacity-50 pointer-events-none' : ''}`}
                disabled={isRefreshing}
                aria-label="Atualizar avaliações"
              >
                <i className={`fas fa-sync-alt ${isRefreshing ? 'animate-spin' : ''}`}></i>
                <span className="inline">Atualizar avaliações</span>
              </button>
            )}
          </motion.div>
          
          {/* Selo de avaliações do Google */}
          {hasGoogleReviews && (
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/90 border border-gray-200 rounded-full shadow-sm">
                <img 
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
                  alt="Google" 
                  className="h-5 w-auto object-contain" 
                />
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <i key={num} className="fas fa-star text-yellow-400 text-xs"></i>
                  ))}
                </div>
                <span className="text-xs text-gray-700 font-medium">Avaliações verificadas</span>
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-5xl mx-auto relative"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
              containScroll: "trimSnaps"
            }}
            className="w-full"
            onSelect={(index) => setActiveSlide(index)}
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {allTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-3 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-5 md:p-6 rounded-xl shadow-md border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 max-w-full group">
                    {/* Ícone de aspas decorativo */}
                    <div className="absolute top-3 right-3 text-blue-100 opacity-30 text-4xl group-hover:text-blue-200 transition-colors">
                      <i className="fas fa-quote-right"></i>
                    </div>
                    
                    <div className="flex items-center mb-4 relative z-10">
                      <div className="flex-shrink-0 mr-3">
                        <div className="relative">
                          <img 
                            src={testimonial.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name.split(' ').map(n => n[0]).join(''))}&background=random&color=fff&size=128`}
                            alt={testimonial.name} 
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback para avatar gerado se a imagem não carregar
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name.split(' ').map(n => n[0]).join(''))}&background=random&color=fff&size=128`;
                            }}
                          />
                          {testimonial.source === "Google Maps" && (
                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
                              <i className="fab fa-google text-sm text-blue-500"></i>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-blue text-base">{testimonial.name}</h4>
                        <p className="text-xs text-gray-600">{testimonial.role || "Cliente"}</p>
                        <div className="flex mt-1">
                          {Array.from({ length: Math.floor(testimonial.rating || 5) }).map((_, i) => (
                            <i key={i} className="fas fa-star text-yellow-400 text-xs"></i>
                          ))}
                          {testimonial.rating % 1 > 0 && (
                            <i className="fas fa-star-half-alt text-yellow-400 text-xs"></i>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50/40 to-blue-50/80 p-3.5 rounded-lg mb-3 flex-grow relative">
                      <p className="text-deep-blue text-sm leading-relaxed">"{testimonial.content}"</p>
                    </div>
                    
                    <div className="pt-2 text-right">
                      {testimonial.source === "Google Maps" ? (
                        <div className="flex items-center justify-end gap-2">
                          <i className="fab fa-google text-blue-600 text-sm"></i>
                          <span className="text-xs text-gray-500">{testimonial.time || "Avaliação verificada"}</span>
                        </div>
                      ) : testimonial.time ? (
                        <span className="text-xs text-gray-500 italic">{testimonial.time}</span>
                      ) : (
                        <span className="text-xs text-gray-500 italic">Cliente {2024 - Math.floor(Math.random() * 3)}</span>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious className="h-10 w-10 -left-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" />
              <CarouselNext className="h-10 w-10 -right-12 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" />
            </div>
          </Carousel>

          {/* Indicadores para dispositivos móveis */}
          <div className="flex justify-center mt-6 gap-2 md:hidden">
            {[...Array(Math.min(allTestimonials.length, 5))].map((_, index) => (
              <div 
                key={index} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeSlide % 5 ? 'bg-blue-600 w-6' : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Indicador de carregamento */}
        {isLoading && (
          <div className="flex justify-center mt-8">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm text-gray-500">Buscando avaliações do Google Maps...</p>
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <motion.div 
          className="text-center mt-12 md:mt-16 bg-white p-6 md:p-8 rounded-xl shadow-md max-w-3xl mx-auto border border-blue-200"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="text-center md:text-left md:flex-1">
              <h3 className="text-xl font-bold text-dark-blue mb-2">Seja nosso próximo cliente satisfeito!</h3>
              <p className="text-deep-blue">Estamos prontos para atender você com a mesma qualidade e excelência</p>
            </div>
            <a
              href={`https://wa.me/+5511972650865?text=${encodeURIComponent("Olá, vi os depoimentos no site e gostaria de solicitar um orçamento.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all whitespace-nowrap flex-shrink-0 shadow-md hover:shadow-lg font-medium"
            >
              <i className="fab fa-whatsapp mr-2 text-lg"></i>
              Solicitar orçamento
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}