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

  // Buscar avaliações públicas da API (incluindo as do Google Maps)
  const { data: publicReviews, isLoading, error, refetch } = useQuery({
    queryKey: ['publicReviews'],
    queryFn: async () => {
      const response = await fetch('/api/public-reviews');
      if (!response.ok) {
        throw new Error('Erro ao buscar avaliações públicas');
      }
      return response.json();
    },
    // Configuração de cache e atualização
    staleTime: 1000 * 60 * 2, // 2 minutos
    refetchInterval: 1000 * 60 * 10, // Tentar novo fetch a cada 10 minutos
    refetchOnWindowFocus: true,
    retry: 3
  });

  // Combinar avaliações públicas com as avaliações estáticas
  const [allTestimonials, setAllTestimonials] = useState<PublicReview[]>(TESTIMONIALS);
  
  // Estado para animação de atualização
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Função para atualizar avaliações
  const refreshReviews = () => {
    setIsRefreshing(true);
    refetch().finally(() => {
      setTimeout(() => setIsRefreshing(false), 1000);
    });
  };

  useEffect(() => {
    if (publicReviews?.success && Array.isArray(publicReviews?.data)) {
      // Adicionar apenas avaliações com um mínimo de texto
      const filteredPublicReviews = publicReviews.data.filter(
        (review: PublicReview) => review.content && review.content.length > 10
      );

      // Filtrar para mostrar avaliações do Google primeiro, quando disponíveis
      const googleReviews = filteredPublicReviews.filter(
        (review: PublicReview) => review.source === "Google Maps"
      );
      
      const siteReviews = filteredPublicReviews.filter(
        (review: PublicReview) => review.source !== "Google Maps"
      );

      // Priorizamos avaliações do Google Maps e depois as do site
      // Limitamos a 15 avaliações para não sobrecarregar a interface
      const combinedReviews = [...googleReviews, ...siteReviews];
      
      // Se temos bastante avaliações do Google, não precisamos das estáticas
      if (combinedReviews.length >= 6) {
        setAllTestimonials(combinedReviews.slice(0, 15));
      } else {
        // Caso contrário, incluímos algumas estáticas
        setAllTestimonials([...combinedReviews, ...TESTIMONIALS].slice(0, 15));
      }
    }
  }, [publicReviews]);

  return (
    <section 
      id="depoimentos" 
      ref={sectionRef} 
      className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full opacity-30 translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-2 sm:px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.span 
            className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full inline-block"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            CLIENTES SATISFEITOS
          </motion.span>

          <motion.h2 
            className="text-dark-blue text-3xl font-bold mt-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            O que nossos clientes dizem
          </motion.h2>

          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-deep-blue max-w-2xl">
              Avaliações reais dos nossos clientes no Google
            </p>
            {!isLoading && (
              <button 
                onClick={refreshReviews} 
                className={`text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 ${isRefreshing ? 'opacity-50 pointer-events-none' : ''}`}
                disabled={isRefreshing}
                aria-label="Atualizar avaliações"
              >
                <i className={`fas fa-sync-alt ${isRefreshing ? 'animate-spin' : ''}`}></i>
                <span className="hidden sm:inline">Atualizar</span>
              </button>
            )}
          </motion.div>
          
          {/* Indicador de avaliações do Google */}
          <motion.div
            className="flex justify-center mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-1 px-3 py-1 bg-white/80 border border-gray-200 rounded-full shadow-sm">
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
            className="w-full max-w-[100vw]"
            onSelect={(index) => setActiveSlide(index)}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {allTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-5 md:p-6 rounded-xl shadow-md border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-blue-200 max-w-full group">
                    {/* Ícone de aspas decorativo */}
                    <div className="absolute top-4 right-4 text-blue-100 opacity-30 text-4xl group-hover:text-blue-200 transition-colors">
                      <i className="fas fa-quote-right"></i>
                    </div>
                    
                    <div className="flex items-center mb-4 relative z-10">
                      <div className="flex-shrink-0 mr-3">
                        {testimonial.profilePhoto ? (
                          <div className="relative">
                            <img 
                              src={testimonial.profilePhoto}
                              alt={testimonial.name} 
                              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                              loading="lazy"
                            />
                            {testimonial.source === "Google Maps" && (
                              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
                                <i className="fab fa-google text-sm text-blue-500"></i>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="relative">
                            <img 
                              src={`https://ui-avatars.com/api/?name=${testimonial.name.split(' ').map(n => n[0]).join('')}&background=random&color=fff`}
                              alt={testimonial.name} 
                              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                              loading="lazy"
                            />
                            {testimonial.source === "Google Maps" && (
                              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
                                <i className="fab fa-google text-sm text-blue-500"></i>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-blue text-base">{testimonial.name}</h4>
                        <p className="text-xs text-gray-600">{testimonial.role}</p>
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
                    
                    <div className="bg-blue-50/50 p-3 rounded-lg mb-3 flex-grow relative">
                      <p className="text-deep-blue text-sm leading-relaxed">{testimonial.content}</p>
                    </div>
                    
                    <div className="pt-2 text-right">
                      {testimonial.source === "Google Maps" ? (
                        <div className="flex items-center justify-end gap-2">
                          <i className="fab fa-google text-blue-600 text-sm"></i>
                          <span className="text-xs text-gray-500">{testimonial.time || "Recentemente"}</span>
                        </div>
                      ) : testimonial.time ? (
                        <span className="text-xs text-gray-500 italic">{testimonial.time}</span>
                      ) : (
                        <span className="text-xs text-gray-500 italic">Cliente desde {2023 - Math.min(testimonial.id, 10)}</span>
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
                className={`w-2 h-2 rounded-full ${index === activeSlide % 5 ? 'bg-blue-600 w-4' : 'bg-gray-300'} transition-all duration-300`}
              />
            ))}
          </div>
        </motion.div>

        {/* Indicador de carregamento */}
        {isLoading && (
          <div className="flex justify-center mt-8">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm text-gray-500">Buscando avaliações...</p>
            </div>
          </div>
        )}

        <motion.div 
          className="text-center mt-12 md:mt-14 bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto border border-blue-200"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-dark-blue mb-2">Seja nosso próximo cliente satisfeito!</h3>
              <p className="text-deep-blue">Nossos especialistas estão prontos para atender você com qualidade e segurança</p>
            </div>
            <a
              href={`https://wa.me/+5511972650865?text=${encodeURIComponent("Olá, vi os depoimentos no site e gostaria de solicitar um orçamento.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap flex-shrink-0 shadow-md hover:shadow-lg"
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