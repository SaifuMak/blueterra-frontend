'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import backgroundImage from '../../public/images/itinerary/nature-background.png'
import Image from "next/image";
import ScrollSmoother from 'gsap/ScrollSmoother';
import TabCards from '@/components/ItineraryView/TabsCards';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);


export default function FullPageScroll() {

    const containerRef = useRef(null);

    useEffect(() => {

        const sections = gsap.utils.toArray(".section")

        sections.forEach((section, index) => {

            const next = sections[index + 1]
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: '+=100%',
                pin: true,
                pinSpacing: false,
                // markers: true,
                scrub: true,
            })

            const entryTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    // end: index === 0 ? "center center" :  "+=100%",
                    end: "top 20%",
                    // toggleActions: "play none none reverse",
                    scrub: true,
                    markers: true,
                }
            })


            entryTimeline.fromTo(section.querySelectorAll(".animate-scale-y"), {
                scale: 0.4,
                y: 20,
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
            })
            gsap.to(section.querySelectorAll(".image-wrapper img"), {
                y: -200,
                pinSpacing: false,

                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    // end: index === 0 ? "center center" :  "+=100%",
                    end: "bottom top",
                    // toggleActions: "play none none reverse",
                    scrub: true,
                    markers: true,
                }
            })

            // const ExitTimeline = gsap.timeline({
            //     scrollTrigger: {
            //         trigger: next, // use the next section as the trigger!
            //         start: "top 70%", // when next section enters bottom of viewport
            //         end: "top 20%", // until it reaches center
            //         scrub: true,
            //         markers: true,

            //     },
            // })

            // if (next) {
            //     ExitTimeline.to(
            //         section.querySelectorAll("#tab-card"),
            //         {
            //             // opacity: 0,
            //             scale : 0,
            //             y: -800,
            //             ease: "power2.in",

            //         }
            //     );
            // }
        })
        return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    }, [])


    useEffect(() => {
        const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.1, // amount of smoothing
            effects: true, // enable data-speed, data-lag, etc
        });

        return () => {
            smoother.kill();
        };
    }, []);


    const scrollToPage3 = () => {
        gsap.to(window, {
            scrollTo: "#page3",
            duration: 2,
            ease: "power2.inOut",
        });
    };


    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <div ref={containerRef} className="w-full">
                    <button onClick={scrollToPage3} className="fixed top-4 right-4 z-50 p-2 bg-black text-white rounded">
                        Go to Page 3
                    </button>

                    <div id="page1" className="section w-full h-screen flex-center bg-slate-100 z-0">
                        <div className=" img-container relative w-full h-full">
                            <Image
                                src={backgroundImage}
                                alt='girl'
                                fill
                                className='object-cover'
                            />
                            <TabCards />
                        </div>

                    </div>
                    <div id="page2" className="section w-full h-screen flex-center bg-red-100 z-10">
                        <div className=" img-container relative w-full h-full overflow-hidden ">
                            <div className=" image-wrapper w-full h-full border ">
                                <Image
                                    src="https://images.pexels.com/photos/238622/pexels-photo-238622.jpeg?_gl=1*5l42z2*_ga*MjA2NjUyODYxMC4xNzUwMTYyOTA4*_ga_8JE65Q40S6*czE3NTAxNjI5MDckbzEkZzEkdDE3NTAxNjQ5MDgkajU5JGwwJGgw"
                                    alt='girl'
                                    fill
                                    className=' object-cover'
                                />
                            </div>
                            <TabCards />

                        </div>

                    </div>
                    <div id="page3" className="section w-full h-screen flex-center bg-indigo-100 z-20">

                        <div className=" img-container relative w-full h-full overflow-hidden ">
                            <div className=" image-wrapper w-full h-full border ">
                                <Image
                                    src='https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?_gl=1*4wvo4i*_ga*MTUzODA0MDAyOC4xNzQ0OTA1Mzk5*_ga_8JE65Q40S6*czE3NTAxNzc0NTgkbzE2JGcxJHQxNzUwMTc3NDY1JGo1MyRsMCRoMA..'
                                    alt='girl'
                                    fill
                                    className='object-cover'
                                />
                            </div>
                            <TabCards />

                        </div>

                    </div>
                </div>
            </div>
        </div>


    );
}



