import { useEffect, RefObject } from "react";
import { useInView } from "framer-motion";

export function useAnimateOnScroll(ref: RefObject<HTMLElement>) {
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      ref.current.classList.add('animate-in');
    }
  }, [isInView, ref]);

  return isInView;
}