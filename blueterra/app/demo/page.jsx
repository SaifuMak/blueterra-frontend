'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
    const containerRef = useRef();
    const horizontalRef = useRef();

    useEffect(() => {
        const totalPanels = 3;

        gsap.to(horizontalRef.current, {
            xPercent: -500,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                // end: `+=${totalPanels * 1000}`, 
                end: 1000,

                scrub: true,
                pin: true,
                markers: true,
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);



    return (
        <div className="w-full  h-full">
            <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-slate-200" />
                <div ref={horizontalRef} className="flex w-[300vw] h-full">
                    {['One', 'Two', 'Three'].map((text, index) => (
                        <div
                            key={index}
                            className="w-screen h-full flex items-center justify-center text-white text-4xl bg-opacity-50 bg-gray-800"
                        >
                            {text}
                        </div>
                    ))}
                </div>
            </section>
            <div className="w-full h-screen bg-blue-100" />
        </div>
    );
};

export default HorizontalScroll;
