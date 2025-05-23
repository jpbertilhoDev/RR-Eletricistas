import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileNavigation from "./MobileNavigation";
import WhatsAppButton from "./WhatsAppButton";
import WhatsAppPopupBanner from './WhatsAppPopupBanner';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
      <Header />
      <main className="flex-grow pt-12 md:pt-20 overflow-x-hidden">
        {isMobile ? (
          <div className="mobile-minimal-content">
            {children}
          </div>
        ) : (
          children
        )}
      </main>
      <WhatsAppButton className="fixed" message="Olá, preciso de ajuda com um problema elétrico!" />
      <WhatsAppPopupBanner />
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Layout;