import { useState, useRef, useLayoutEffect } from "react";

/**
 * Hook to measure the height of an element and update it dynamically
 */
export function useElementHeight() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.getBoundingClientRect().height);
      }
    };

    // measure when mounting
    updateHeight();

    // observer for internal size changes
    const observer = new ResizeObserver(updateHeight);
    if (ref.current) observer.observe(ref.current);

    // listen to window resize
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, height];
}