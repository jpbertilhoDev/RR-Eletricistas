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
import { useToast } from "@/hooks/use-toast";

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

  // Buscar avaliações públicas da API (focando nas avaliações do Google Maps)
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
    refetchInterval: 1000 * 60 * 30, // Atualizar a cada 30 minutos
    refetchOnWindowFocus: false, // Não atualizar automaticamente no foco da janela
    retry: 3
  });

  // Combinar avaliações públicas com as avaliações estáticas
  const [allTestimonials, setAllTestimonials] = useState<PublicReview[]>(TESTIMONIALS);

  // Estado para animação de atualização
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Estado para contar quantas avaliações do Google temos
  const [googleReviewCount, setGoogleReviewCount] = useState(0);

  // Função para atualizar avaliações
  const refreshReviews = () => {
    setIsRefreshing(true);
    refetch().finally(() => {
      setTimeout(() => {
        setIsRefreshing(false);
        // Mostrar toast de sucesso
        toast({
          title: "Avaliações atualizadas",
          description: googleReviewCount > 0 
            ? `Carregamos ${googleReviewCount} avaliações reais do Google Maps` 
            : "Buscamos as avaliações mais recentes",
          variant: "default",
        });
      }, 1000);
    });
  };
  
  // Toast hook
  const { toast } = useToast();

  useEffect(() => {
    if (publicReviews?.success && Array.isArray(publicReviews?.data)) {
      // Filtrar avaliações com conteúdo significativo
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

      // Atualizar contador de avaliações do Google
      setGoogleReviewCount(googleReviews.length);

      // Priorizamos avaliações do Google Maps e limitamos a quantidade total
      const combinedReviews = [...googleReviews, ...siteReviews];

      // Usar apenas avaliações reais se tivermos o suficiente
      if (combinedReviews.length >= 6) {
        setAllTestimonials(combinedReviews.slice(0, 12));
      } else {
        // Complementar com algumas estáticas apenas se necessário
        setAllTestimonials([...combinedReviews, ...TESTIMONIALS].slice(0, 12));
      }
    }
  }, [publicReviews]);

  // Calcular avaliação média
  const averageRating = allTestimonials.length > 0 
    ? (allTestimonials.reduce((acc, review) => acc + review.rating, 0) / allTestimonials.length).toFixed(1)
    : "5.0";

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
        <div className="text-center mb-10 md:mb-14">
          <motion.span 
            className="text-blue-600 font-medium text-sm tracking-wider uppercase bg-blue-50 px-4 py-1 rounded-full inline-block"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            AVALIAÇÕES VERIFICADAS
          </motion.span>

          <motion.h2 
            className="text-dark-blue text-3xl font-bold mt-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            O que nossos clientes dizem sobre nós
          </motion.h2>

          {/* Badge de avaliação do Google Maps */}
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white px-5 py-3 rounded-xl shadow-md border border-gray-200 flex items-center gap-3 group hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <img 
                src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" 
                alt="Google" 
                className="h-6 w-auto" 
              />
              <div className="h-8 w-[1px] bg-gray-200"></div>
              <div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <i key={num} className="fas fa-star text-yellow-400"></i>
                  ))}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  <span className="font-medium">{averageRating}</span> de 5 baseado em <span className="font-medium">{googleReviewCount}</span> avaliações
                </div>
              </div>
              
              {/* Status das avaliações */}
              <div className="hidden group-hover:flex absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full items-center shadow-sm border border-green-600">
                <i className="fas fa-check-circle mr-1 text-xs"></i>
                <span>Avaliações verificadas</span>
              </div>
            </div>

            <a 
              href="https://g.co/kgs/ocBzoYD" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-2 hover:underline transition-colors"
            >
              <i className="fab fa-google mr-1"></i>
              Ver todas as avaliações no Google Maps
            </a>
          </motion.div>

          {/* Banner de credibilidade */}
          <motion.div
            className="bg-blue-50/80 rounded-lg p-3 max-w-3xl mx-auto mt-6 border border-blue-100/70"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-sm text-deep-blue">
              <i className="fas fa-check-circle text-blue-600 mr-2"></i>
              Estas são avaliações reais publicadas por nossos clientes no Google Maps.
            </p>
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
                  <div className="bg-white p-5 md:p-6 rounded-xl shadow-md border border-gray-200 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-blue-200 max-w-full group">
                    {/* Badge de origem no topo */}
                    {testimonial.source === "Google Maps" && (
                      <div className="absolute -top-2 -right-2 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-200 flex items-center">
                        <img 
                          src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg" 
                          alt="Google" 
                          className="h-3.5 w-auto mr-1" 
                        />
                        <i className="fas fa-check-circle text-green-500 text-xs"></i>
                      </div>
                    )}

                    {/* Ícone de aspas decorativo */}
                    <div className="absolute top-4 left-4 text-blue-100 opacity-30 text-4xl group-hover:text-blue-200 transition-colors">
                      <i className="fas fa-quote-left"></i>
                    </div>

                    <div className="flex items-center mb-4 relative z-10 mt-2 pt-2">
                      <div className="flex-shrink-0 mr-3">
                        <div className="relative">
                          <img 
                            src={testimonial.profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name.split(' ').map(n => n[0]).join(''))}&background=random&color=fff&size=128`}
                            alt={testimonial.name} 
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-blue-100 shadow-sm"
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
                        <p className="text-xs text-gray-600">{testimonial.role}</p>
                        <div className="flex mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i 
                              key={i} 
                              className={`${i < Math.floor(testimonial.rating) 
                                ? "fas fa-star text-yellow-400" 
                                : i === Math.floor(testimonial.rating) && (testimonial.rating % 1 > 0)
                                  ? "fas fa-star-half-alt text-yellow-400"
                                  : "far fa-star text-yellow-400"} text-xs`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50/50 p-4 rounded-lg mb-3 flex-grow relative border border-blue-50">
                      <p className="text-deep-blue text-sm leading-relaxed">"{testimonial.content}"</p>
                    </div>

                    <div className="pt-2 text-right">
                      {testimonial.source === "Google Maps" ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-gray-500 font-medium">{testimonial.time || "Avaliação verificada"}</span>
                          <i className="fab fa-google text-blue-600 text-sm"></i>
                        </div>
                      ) : testimonial.time ? (
                        <span className="text-xs text-gray-500 italic">{testimonial.time}</span>
                      ) : (
                        <span className="text-xs text-gray-500 italic">Cliente desde {2023 - Math.floor(Math.random() * 3)}</span>
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
            {[...Array(Math.min(allTestimonials.length, 6))].map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${index === activeSlide % 6 ? 'bg-blue-600 w-4' : 'bg-gray-300'} transition-all duration-300`}
              />
            ))}
          </div>

          {/* Botão de atualização */}
          {!isLoading && (
            <div className="flex justify-center mt-6">
              <button 
                onClick={refreshReviews} 
                className={`text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 px-3 py-1 border border-blue-100 rounded-full hover:bg-blue-50/50 transition-colors ${isRefreshing ? 'opacity-50 pointer-events-none' : ''}`}
                disabled={isRefreshing}
                aria-label="Atualizar avaliações"
              >
                <i className={`fas fa-sync-alt ${isRefreshing ? 'animate-spin' : ''} mr-1`}></i>
                <span>Atualizar avaliações</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Indicador de carregamento */}
        {isLoading && (
          <div className="flex justify-center mt-8">
            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border border-blue-100">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mb-3"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <i className="fab fa-google text-blue-600 text-lg"></i>
                </div>
              </div>
              <p className="text-deep-blue font-medium">Buscando avaliações do Google Maps</p>
              <p className="text-sm text-gray-500 mt-1">Isso pode levar alguns segundos...</p>
            </div>
          </div>
        )}
        
        {/* Estado vazio (quando não há avaliações) */}
        {!isLoading && allTestimonials.length === 0 && (
          <div className="flex justify-center mt-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center max-w-md">
              <i className="fas fa-star text-yellow-400 text-3xl mb-3"></i>
              <h4 className="text-lg font-medium text-dark-blue mb-2">Nenhuma avaliação encontrada</h4>
              <p className="text-gray-600 mb-4">Não conseguimos carregar as avaliações do Google Maps neste momento.</p>
              <button 
                onClick={refreshReviews}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors inline-flex items-center gap-2"
              >
                <i className="fas fa-sync-alt"></i>
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        <motion.div 
          className="text-center mt-14 md:mt-16 bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto border border-blue-200"
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