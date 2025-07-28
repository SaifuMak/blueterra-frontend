// app/page.tsx or pages/index.tsx
'use client'; // if using app router

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from "@/components/SmoothScroll";

import { playfair, rubik, mrsSaint, jost } from "@/app/fonts"

import IntroCard from '@/components/OurStory/IntroCard';
import MissionVisionValues from '@/components/OurStory/MissionVisionValues';
import WhereItAllBegan from '@/components/OurStory/WhereItAllBegan';


gsap.registerPlugin(ScrollTrigger);

export default function Home() {

    const sectionsRef = useRef([]);
    const cardsRef = useRef([]);

    const cardComponents = [IntroCard, WhereItAllBegan, MissionVisionValues];


    useEffect(() => {
        sectionsRef.current.forEach((section, index) => {
            const card = cardsRef.current[index];
            if (!section || !card) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 50%',
                    end: 'top -40%',
                    scrub: true,
                    markers: true,
                }
            });


            tl.fromTo(card,
                {
                    opacity: 0,
                    y: 300,
                    backdropFilter: 'blur(0px)',
                    WebkitBackdropFilter: 'blur(0px)',
                },
                {
                    opacity: 1,
                    y: 0,
                    backdropFilter: index !== 0 && 'blur(16px)',
                    WebkitBackdropFilter: index !== 0 && 'blur(16px)',
                    duration: 2,
                    ease: 'power2.out'
                }
            ).to(card,
                {
                    opacity: 0,
                    y: -200,
                    backdropFilter: 'blur(0px)',
                    WebkitBackdropFilter: 'blur(0px)',
                    duration: 1,
                    ease: 'power2.in'
                }
            );
        });

        // Cleanup
        return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }, []);


    return (

        <SmoothScroll>

            <div className="relative min-h-screen">

                {/* Overlay */}
                <div className="fixed inset-0 bg-[#0E518199]/90 z-10" />

                <div
                    className="fixed  inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('/images/our-story/nature-background.png')" }}
                />

                <div className="relative z-20 ">
                    {cardComponents.map((CardComponent, i) => (
                        <section
                            key={i}
                            ref={(el) => (sectionsRef.current[i] = el)}
                            className="min-h-[90vh] flex items-center justify-center "
                        >
                            <div
                                ref={(el) => (cardsRef.current[i] = el)}
                                className="w-9/12 flex justify-center"

                            >
                                <CardComponent />
                            </div>
                        </section>
                    ))}
                </div>
            </div>


        </SmoothScroll>

    );
}
