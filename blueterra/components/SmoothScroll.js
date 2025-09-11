
import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children, enabled = true }) {
  const lenisRef = useRef(null);

  useEffect(() => {

    const lenis = new Lenis({
      smooth: true,
      syncTouch: true, // important so touch/wheel propagate correctly
      gestureTarget: document.querySelectorAll('[data-lenis-scrollable]')

    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
