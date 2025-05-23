import { NAVIGATION_ITEMS, CONTACT_INFO, SOCIAL_MEDIA } from "@/lib/constants";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Usando uma animação mais suave para transição entre seções
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });

      // Prevenção de cliques múltiplos durante a animação
      document.body.style.pointerEvents = "none";
      setTimeout(() => {
        document.body.style.pointerEvents = "auto";
      }, 800);
    }
  };

  return (
    <footer className="bg-[#0a1930] text-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center h-10 w-auto">
                <img 
                  src="/src/assets/images/logo-rr.svg" 
                  alt="RR Manutenções Elétricas" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <h2 className="text-xl font-bold text-white">RR Manutenções Elétricas</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Soluções elétricas completas para residências e comércios com qualidade, segurança e profissionalismo.
            </p>
            <div className="flex space-x-5">
              {SOCIAL_MEDIA.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-primary transition-colors text-xl"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-bolt text-primary mr-2" />
              Serviços
            </h3>
            <ul className="space-y-3 text-blue-300">
              {/* Changed to a darker blue */}
              {["Instalações Elétricas", "Manutenção Preventiva", "Reparos Emergenciais", 
                "Projetos Elétricos", "Quadros Elétricos", "Iluminação"].map((service, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection("servicos")} 
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <span className="mr-2 text-xs opacity-70">›</span>
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-link text-primary mr-2" />
              Links Rápidos
            </h3>
            <ul className="space-y-3 text-blue-300">
              {/* Changed to a darker blue */}
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => scrollToSection(item.id)} 
                    className="text-gray-300 hover:text-primary transition-colors flex items-center"
                  >
                    <span className="mr-2 text-xs opacity-70">›</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <i className="fas fa-phone-alt text-primary mr-2" />
              Contato
            </h3>
            <ul className="space-y-4 text-blue-300">
              {/* Changed to a darker blue */}
              <li className="flex items-start space-x-3">
                <i className="fas fa-phone-alt mt-1 text-primary/70" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-envelope mt-1 text-primary/70" />
                <span>{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt mt-1 text-primary/70" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-start space-x-3">
                <i className="fas fa-clock mt-1 text-primary/70" />
                <span>Seg-Sex: 08h-18h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-gray-300 text-sm">
          {/* Changed to a darker blue */}
          <p>&copy; {new Date().getFullYear()} RR Manutenções Elétricas • Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;