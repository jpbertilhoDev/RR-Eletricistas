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
import { cn } from "@/lib/utils";
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
    // Carregar automaticamente
    enabled: true,
    // Configuração de cache e atualização
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnMount: true
  });

  // Combinar avaliações públicas com as avaliações estáticas
  const [allTestimonials, setAllTestimonials] = useState<PublicReview[]>(TESTIMONIALS);

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
      setAllTestimonials([...googleReviews, ...siteReviews, ...TESTIMONIALS]);
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

      <div className="container mx-auto px-2 sm:px-4 max-w-6xl relative z-10 overflow-hidden">
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

          <motion.p 
            className="text-deep-blue max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A satisfação dos nossos clientes é nossa maior conquista.
            Conheça algumas histórias de quem confiou em nossos serviços.
          </motion.p>
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
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {allTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col transition-all duration-300 hover:shadow-md hover:border-blue-100 max-w-full">
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 mr-2">
                        {testimonial.profilePhoto ? (
                          <img 
                            src={testimonial.profilePhoto}
                            alt={testimonial.name} 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-100"
                            loading="lazy"
                          />
                        ) : (
                          <img 
                            src={`https://ui-avatars.com/api/?name=${testimonial.name.split(' ').map(n => n[0]).join('')}&background=random&color=fff`}
                            alt={testimonial.name} 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-100"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-semibold text-dark-blue text-sm sm:text-base">{testimonial.name}</h4>
                          {testimonial.source === "Google Maps" && (
                            <span className="ml-2 px-1 py-0.5 text-[10px] bg-blue-50 text-blue-700 rounded-sm flex items-center">
                              <i className="fab fa-google text-xs mr-1"></i> Verificado
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{testimonial.role}</p>
                        <div className="flex mt-1">
                          {Array.from({ length: Math.floor(testimonial.rating || 5) }).map((_, i) => (
                            <i key={i} className="fas fa-star text-xs text-yellow-400"></i>
                          ))}
                          {testimonial.rating % 1 > 0 && (
                            <i className="fas fa-star-half-alt text-xs text-yellow-400"></i>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-deep-blue text-xs sm:text-sm flex-grow">{testimonial.content}</p>
                    <div className="mt-4 pt-3 sm:mt-6 sm:pt-4 border-t border-gray-100 text-right">
                      {testimonial.source === "Google Maps" ? (
                        <div className="flex items-center justify-end gap-2">
                          <i className="fab fa-google text-blue-600 text-sm"></i>
                          <span className="text-xs text-gray-500 italic">{testimonial.time || "Recentemente"}</span>
                        </div>
                      ) : testimonial.time ? (
                        <span className="text-xs text-gray-500 italic">{testimonial.time}</span>
                      ) : (
                        <span className="text-xs text-gray-500 italic">Projeto realizado em {2023 - testimonial.id}</span>
                      )}
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
            {[...Array(Math.min(allTestimonials.length, 5))].map((_, index) => (
              <div 
                key={index} 
                className={`w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'} transition-all duration-300`}
              />
            ))}
          </div>
        </motion.div>

        {/* Mostrar mensagem de avaliações verificadas do Google */}
        {publicReviews && !isLoading && !error && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
              <i className="fab fa-google text-blue-500"></i>
              <span className="text-sm text-gray-700">Avaliações verificadas do Google</span>
            </div>
          </motion.div>
        )}

        {/* Indicador de carregamento */}
        {isLoading && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        )}

        <motion.div 
          className="text-center mt-10 md:mt-12 bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-dark-blue mb-2">Quer resolver seu problema elétrico agora?</h3>
              <p className="text-deep-blue">Nossos especialistas estão prontos para atender você com qualidade e segurança</p>
            </div>
            <a
              href={`https://wa.me/+5511972650865?text=${encodeURIComponent("Olá, vi os depoimentos no site e gostaria de solicitar um orçamento.")}`}
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
}