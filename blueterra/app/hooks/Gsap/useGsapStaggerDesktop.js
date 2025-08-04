// hooks/useGsapScrollFadeIn.ts
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);


export default function useGsapStaggerDesktop({ scopeRef, selector = '.card' }) {
  useGSAP(() => {
    gsap.fromTo(
      selector,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        stagger: 0.2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 60%',
          end: 'top 10%',
          toggleActions: 'play none none reverse',
          markers: false, // change to true for debugging
        },
      }
    );
  }, { scope: scopeRef });
}
