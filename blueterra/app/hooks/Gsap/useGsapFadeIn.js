import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

const useGsapFadeIn = (index = 0, options = {}) => {
  const elementRef = useRef(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { 
        opacity: 0, 
        y: options.initialPosition || 100 
      },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.8,
        ease: options.ease || "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: options.start || "top 70%",
          toggleActions: options.toggleActions || "play none none reverse",
        //   onEnter: () => {
        //     elementRef.current?.classList?.remove("hidden-text");
        //   },
          markers: options.markers || false,
        }
      }
    );
  }, { dependencies: [], scope: elementRef });

  return elementRef;
};

export default useGsapFadeIn;