import { useEffect, RefObject } from "react";

export function useAnimateOnScroll<T extends HTMLElement>(
  ref: RefObject<T>,
  options = { threshold: 0.1, rootMargin: "0px" }
) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      options
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
}
