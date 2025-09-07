'use client'; // if using app router

import { useRef } from 'react';
import gsap from 'gsap';

import IntroCard from './IntroCard';
import WhereItAllBegan from './WhereItAllBegan';
import MissionVisionValues from './MissionVisionValues';
import { useGSAP } from '@gsap/react';
// import { useIsMobile } from '@/app/hooks/useIsMobile';

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger);

export default function ThreeCardSection() {

    // const isMobile = useIsMobile();
    const isMobile = useMediaQuery({
        query: '(max-width: 844px)'
    })


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
                    y: isMobile ? 200 : 200
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
                    start: isMobile ? 'bottom -30%' : 'bottom -70%',
                    end: isMobile ? 'bottom -80%' : 'bottom -130%',
                    scrub: true,
                    // markers: true
                },
            });
        }


        sectionsRef.current.forEach((section, index) => {
            const card = cardsRef.current[index];

            if (!section || !card) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    // markers: true,
                    start: isMobile ? 'top 60%' : 'top 50%',
                    ...(index === 2) ? {
                        end: isMobile ? "bottom -55%" : "bottom -100%",
                    }
                        :
                        {
                            end: isMobile ? 'top -60%' : 'top -60%',

                        }

                    // ...(index === 2
                    //     ? {
                    //         pin: true,
                    //         pinSpacing: true,
                    //         start: isMobile ? 'top 10%' : 'top 17%',
                    //         // end: '+=1250'
                    //         end: "bottom -95%",

                    //     }
                    //     : {
                    //         start: isMobile ? 'top 60%' : 'top 50%',
                    //         end: isMobile ? 'top -50%' : 'top -60%',
                    //     })
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
                    duration: 3,
                    ease: 'power2.out'
                }
            )

            if (index === 2) {
                ScrollTrigger.create({
                    trigger: section,
                    pin: true,
                    pinSpacing: true,
                    start: isMobile ? "top 0%" : "top 10%",
                    end: "bottom -95%",
                    // markers: true,
                });
            }


            if (index === 2 && missionRef.current) {
                tl.to({}, {
                    duration: 10,
                    delay: 1.5,
                    onUpdate: function () {
                        const prog = this.progress();
                        const tabIndex = prog < 0.33 ? 0 : prog < 0.66 ? 1 : 2;
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
                    ease: 'power2.in',
                    delay: index === 2 ? 6 : 0
                }
            );
        });

    }, []);


    return (
        <div ref={threeCardsContainerRef} className="relative min-h-[200vh]  pointer-events-none   md:min-h-[270vh]">

            {/* Background image*/}
            <div
                ref={backgroundImageRef}
                className="fixed inset-0 h-[120vh] bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/images/our-story/banner-img.jpg')" }}
            />

            <div className=" fixed inset-0 h-[120vh] bg-[#0E518199]/60 z-0"></div>

            {/* 3 cards thats displayed over fixed background*/}
            <div className="relative z-20">
                {cardComponents.map((CardComponent, i) => (
                    <section
                        key={i}
                        ref={(el) => (sectionsRef.current[i] = el)}
                        className="md:min-h-[85vh]   min-h-[90vh]    flex  items-center justify-center"
                    >
                        <div
                            ref={(el) => (cardsRef.current[i] = el)}
                            className={`md:w-9/12 w-11/12 flex justify-center ${i !== 0 ? 'opacity-0' : 'opacity-100'}`}
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