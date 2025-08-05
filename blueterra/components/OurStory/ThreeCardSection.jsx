'use client'; // if using app router

import { useRef } from 'react';
import gsap from 'gsap';

import IntroCard from './IntroCard';
import WhereItAllBegan from './WhereItAllBegan';
import MissionVisionValues from './MissionVisionValues';
import { useGSAP } from '@gsap/react';
import { useIsMobile } from '@/app/hooks/useIsMobile';

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThreeCardSection() {

    const isMobile = useIsMobile();

    const threeCardsContainerRef = useRef()
    const backgroundImageRef = useRef(null);
    const sectionsRef = useRef([]);
    const cardsRef = useRef([]);

    const missionRef = useRef();

    const cardComponents = [IntroCard, WhereItAllBegan, MissionVisionValues];

    //  Animate IntroCard on initial load
    useGSAP(() => {
        if (cardsRef.current[0]) {
            gsap.fromTo(cardsRef.current[0],
                {
                    opacity: 0,
                    y: isMobile ? 100 : 200
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power2.out'
                }
            );
        }
    }, []);

    useGSAP(() => {

        if (backgroundImageRef.current && threeCardsContainerRef.current) {
            gsap.to(backgroundImageRef.current, {
                y: '-20vh', // adjust to control scroll speed
                ease: 'none',
                scrollTrigger: {
                    trigger: threeCardsContainerRef.current, // outer scrollable container
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
            gsap.to(threeCardsContainerRef.current, {
                opacity: 0, // adjust to control scroll speed
                ease: 'none',
                scrollTrigger: {
                    trigger: threeCardsContainerRef.current, // outer scrollable container
                    start: isMobile ? 'bottom 50%' : 'bottom 50%',
                    end: 'bottom 20%',
                    scrub: true,
                },
            });
        }
        //  const missionCard = cardsRef.current[2];

        // ScrollTrigger.create({
        //     trigger: missionCard,
        //     start: 'top 20%', // pin when section hits top of viewport
        //     end: '+=1000', // how long to keep it pinned (adjust as needed)
        //     pin: true,
        //     scrub: true,
        //     markers: true, // remove in production
        // });


        sectionsRef.current.forEach((section, index) => {
            const card = cardsRef.current[index];

            if (!section || !card) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: isMobile ? 'top 60%' : 'top 50%',
                    end: isMobile ? 'top -30%' : 'top -35%',
                    scrub: true,
                    // markers: true,
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
            )

            if (index === 2 && missionRef.current) {
                tl.to({}, {
                    duration: 20,
                    onUpdate: function () {
                        const prog = this.progress();
                        const tabIndex = prog < 0.20 ? 0 : prog < 0.50 ? 1 : 2;
                        missionRef.current.setTab(tabIndex); // This works because of forwardRef + useImperativeHandle
                    }
                });
            }


            tl.to(card,
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

    }, []);


    return (
        <div ref={threeCardsContainerRef} className="relative min-h-[200vh]  md:min-h-[270vh]">

            {/* Background image*/}
            <div
                ref={backgroundImageRef}
                className="fixed inset-0 h-[120vh] bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/images/our-story/nature-background.png')" }}
            />

            <div className=" fixed inset-0 h-[120vh] bg-[#0E518199]/60 z-0"></div>

            {/* 3 cards thats displayed over fixed background*/}
            <div className="relative z-20">
                {cardComponents.map((CardComponent, i) => (
                    <section
                        key={i}
                        ref={(el) => (sectionsRef.current[i] = el)}
                        className="md:min-h-[80vh] min-h-[60vh] flex  items-center justify-center"
                    >
                        <div
                            ref={(el) => (cardsRef.current[i] = el)}
                            className="md:w-9/12 w-11/12 flex justify-center  opacity-0"
                        >
                            {/* <CardComponent />
                             */}
                            <CardComponent ref={i === 2 ? missionRef : null} />
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}