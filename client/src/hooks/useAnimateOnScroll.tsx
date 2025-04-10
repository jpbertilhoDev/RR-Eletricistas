
import { useEffect, RefObject, useState } from "react";

export function useAnimateOnScroll<T extends HTMLElement>(
  ref: RefObject<T>,
  threshold = 0.1
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: "0px"
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isVisible;
}
