import { useState, useEffect } from "react";
import { NAVIGATION_ITEMS } from "@/lib/constants";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>(NAVIGATION_ITEMS[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better UX

      // Get all sections
      const sections = NAVIGATION_ITEMS.map(item => {
        const element = document.getElementById(item.id);
        return {
          id: item.id,
          offsetTop: element?.offsetTop || 0,
          offsetHeight: element?.offsetHeight || 0
        };
      });

      // Find the current active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, offsetTop, offsetHeight } = sections[i];
        if (scrollPosition >= offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return activeSection;
}
