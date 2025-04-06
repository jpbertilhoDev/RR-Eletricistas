import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { useEffect } from "react";

const Home = () => {
  // Set up intersection observers for animation on scroll
  useEffect(() => {
    // Add custom CSS for animations
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
      
      .transition-scale {
        transition: transform 0.3s ease;
      }
      
      .hover\:scale-103:hover {
        transform: scale(1.03);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Layout>
      <Hero />
      <Services />
      <Projects />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </Layout>
  );
};

export default Home;
