import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

const useGsapOpacity = (index = 0, options = {}) => {
  const elementRef = useRef(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { 
        opacity: 0, 
        // y: options.initialPosition || 10 
        scale : 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale : 1,
        duration: options.duration || 0.9,
        ease: options.ease || "sine.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: options.start || "top 85%",
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

export default useGsapOpacity;