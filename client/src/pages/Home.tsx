import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contact";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Home = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

      @keyframes slideUp {
        0% { transform: translateY(30px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }

      .animate-in {
        animation: slideUp 0.6s ease forwards;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <Hero />
        <Services />
        <AboutUs />
        { !isMobile && ( <>
          <WhyChooseUs />
          <Testimonials />
        </>)}
        <Contact />
      </div>
    </Layout>
  );
};

export default Home;