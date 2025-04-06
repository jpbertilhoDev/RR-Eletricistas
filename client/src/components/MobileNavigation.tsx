import { NAVIGATION_ITEMS } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const MobileNavigation = () => {
  const activeSection = useActiveSection();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 py-2 border-t border-gray-200">
      <div className="flex justify-around items-center">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "flex flex-col items-center p-2 outline-none",
              activeSection === item.id ? "text-primary" : "text-gray-600"
            )}
          >
            <i className={`${item.icon} text-xl`}></i>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
