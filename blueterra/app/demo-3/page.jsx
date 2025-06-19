'use client'

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import ScrollSmoother from 'gsap/ScrollSmoother';
import { useGSAP } from "@gsap/react";
import TabCards from '@/components/ItineraryView/TabsCards';
import PlannedActivities from "@/components/ItineraryView/PlannedActivities/PlannedActivities";
import HotelsView from "@/components/ItineraryView/HotelsView";
import Gallery from "@/components/ItineraryView/Gallery";
import forest from '../../public/images/itinerary/forest.png'
import worldMap from '../../public/images/itinerary/world-map.png'

import forestParallax from '../../public/images/itinerary/forest-parallax.png'
import Footer from "@/components/Footer/page";
import Navbar from "@/components/Navbar/page";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

gsap.registerPlugin(ScrollTrigger);

const sectionsData = [
    { id: 1, image: "https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?_gl=1*u4a494*_ga*MjA2NjUyODYxMC4xNzUwMTYyOTA4*_ga_8JE65Q40S6*czE3NTAyNDQyNzMkbzIkZzEkdDE3NTAyNDQ1MzckajE4JGwwJGgw", bg: "#ffefef", component: TabCards },
    { id: 2, image: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?_gl=1*6gckvs*_ga*MjA2NjUyODYxMC4xNzUwMTYyOTA4*_ga_8JE65Q40S6*czE3NTAyNDQyNzMkbzIkZzEkdDE3NTAyNDQyODckajQ2JGwwJGgw", bg: "#efffef", component: PlannedActivities },
    // { id: 3, image: forest, bg: "#efefff", component: HotelsView },
    // { id: 4, image: forest, bg: "#efefff", component: Gallery },
];

export default function demo2() {
    const sectionsRef = useRef([]);

    const planningRef = useRef()

    const hotelGalleryRef = useRef()



    useGSAP(() => {
        sectionsRef.current.forEach((section, index) => {
            const image = section.querySelector(".image-wrapper img");
            const card = section.querySelector(".info-card");

            const firstSection = sectionsRef.current[0]

            const tl = gsap.timeline({

                scrollTrigger: {
                    trigger: section,
                    start: index === 0 ? "top 0%" : "top 90%",
                    end: "top -200%",
                    scrub: true,
                },
            })


            gsap.fromTo(firstSection.querySelectorAll(".tab-card"), {
                y: 200,
                opacity: 0,
            },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    ease: "power2.inOut",
                    duration: 1.2
                })

            gsap.fromTo(firstSection.querySelectorAll(".animate-heading-y"), {
                y: -200,
                opacity: 0,
            },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    ease: "power2.inOut",
                    duration: 1.2
                })


            gsap.to(
                ".planner-image-wrapper",
                {
                    y: "-20%",
                    opacity: 1,
                    scrollTrigger: {
                        trigger: planningRef.current,
                        start: "top 70%",
                        end: "top -10%",
                        scrub: true,
                        // markers: true
                    },
                }
            );


            gsap.to(
                image,
                {
                    y: "-30%",
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: index === 0 ? "top 0%" : "top 90%",
                        end: "top -200%",
                        scrub: true,
                        // markers: true
                    },
                }
            );


            gsap.fromTo(".hotels-container",
                {
                    y: "-50%",
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: ".hotels-container",
                        start: "top 30%",
                        end: "top -20%",
                        scrub: true,
                        // markers: true
                    },
                })

            const gallerySectionTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".gallery-container",
                    start: "top 70%",
                    end: "top 50%",
                    scrub: true,
                    // markers: true
                },
            })


            gallerySectionTimeline.fromTo(".gallery-title",
                {
                    y: -100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                })

            gallerySectionTimeline.fromTo(".gallery-tile",
                {
                    y: "30%",
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: {
                        each: 0.3,
                        from: "center"
                    },

                })

            const childElementsTimeline = gsap.timeline({
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: section,
                    start: "top 60%",
                    end: "top 0%",
                    scrub: true,
                    // markers: true
                },
            })



            gsap.from(
                section.querySelector(".planned-activities"),
                {
                    opacity: 0,
                    scale: 0.77,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 60%",
                        end: "top 0%",
                        scrub: true,
                        // markers: true
                    },
                }
            );
        });

    }, []);


    useEffect(() => {
        const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1, // amount of smoothing
            effects: true, // enable data-speed, data-lag, etc
        });

        return () => {
            smoother.kill();
        };
    }, []);



    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">

                <div className=" bg-black">
                    <div>
                        {sectionsData.map((section, idx) => (

                            <section
                                key={section.id}
                                ref={(el) => (sectionsRef.current[idx] = el)}
                                className=" relative overflow-hidden w-full  h-[100vh]">
                                <div className="   absolute w-full h-[150vh] overflow-hidden inset-0 image-wrapper">
                                    <Image
                                        src={section.image}
                                        alt={`section-${section.id}`}
                                        fill
                                        className=" object-cover"
                                        priority
                                    />
                                </div>
                                <div className=" absolute flex-center w-full   inset-0 h-[100vh]">
                                    {/* <div className="w-[300px]  info-card h-[200px] bg-white"></div> */}
                                    <section.component />
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="h-[200vh] bg-white w-full hotels-section  relative overflow-hidden">
                        <div className="absolute w-full   h-full overflow-hidden inset-0 image-wrapper">
                            <Image
                                src={forest}
                                alt="forest"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className=" w-full flex justify-between  h-[300px]">
                                <Image
                                    src={worldMap}
                                    alt="world-map"
                                    width={500}
                                    height={200}
                                    className="object-cover opacity-25"
                                    priority
                                />
                                <Image
                                    src={worldMap}
                                    alt="world-map"
                                    width={500}
                                    height={200}
                                    className="object-cover opacity-25"
                                    priority
                                />
                            </div>

                            <div ref={hotelGalleryRef} className=" absolute  mb-28  space-y-20 flex flex-col items-center w-full  inset-0">
                                <HotelsView />
                                <Gallery />
                            </div>
                        </div>
                        {/* <div className=" absolute top-10 w-full h-[300px] z-20 ">
                            <Image
                                src={worldMap}
                                alt="world-map"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div> */}
                    </div>


                    <div ref={planningRef} className="w-full h-[220px] lg:h-[280px] xl:h-[320px] 2xl:h-[380px] overflow-hidden relative">
                        <div className="   absolute w-full h-[280px] lg:h-[360px] xl:h-[510px] 2xl:h-[590px] overflow-hidden inset-0 planner-image-wrapper">
                            <Image
                                src='/images/Itinerary/tree-in-river.png'
                                alt="tree-in-river"
                                fill
                                className=" object-cover "
                                priority
                            />
                        </div>

                        <div className="  absolute bg-white/10 w-full h-full flex-center max-sm:px-4 ">
                            <div className="lg:w-8/12 md:w-10/12  text-center h-auto flex-col  text-white  flex-center">
                                <h3 className="xl:text-5xl text-2xl  font-medium  antialiased text-center">Design Your Perfect Itinerary</h3>
                                <p className=" 2xl:text-2xl text-sm lg:text-base xl:text-xl mt-3 xl:mt-8 2xl:mt-12 w-5/6 ">
                                    Create a journey that reflects your interests, pace, and
                                    travel style — from handpicked experiences to seamless logistics, every detail is yours to shape.
                                </p>
                                <button className="px-10 py-2 rounded-full lg:mt-8 mt-3 bg-white/15">START PLANNING</button>
                            </div>
                        </div>
                    </div>

                    <Footer />

                </div>
            </div>
        </div>

    );
}
