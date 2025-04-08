import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileNavigation from "./MobileNavigation";
import WhatsAppButton from "./WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white md:bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="flex-grow pt-14 md:pt-20 overflow-x-hidden">
        {children}
      </main>
      <Footer />
      <MobileNavigation />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
