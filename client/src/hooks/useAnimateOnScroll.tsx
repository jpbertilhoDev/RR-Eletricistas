
import { useEffect, RefObject } from "react";
import { useInView } from "framer-motion";

export function useAnimateOnScroll<T extends HTMLElement>(
  ref: RefObject<T>,
  threshold = 0.1
) {
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold 
  });

  useEffect(() => {
    if (isInView && ref.current) {
      ref.current.classList.add('animate-in');
    }
  }, [isInView, ref, threshold]);

  return isInView;
}
