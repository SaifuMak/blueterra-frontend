'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import ScrollSmoother from 'gsap/ScrollSmoother';
import { useGSAP } from "@gsap/react";
import TabCards from '@/components/ItineraryView/TabsCards';
import PlannedActivities from "@/components/ItineraryView/PlannedActivities/PlannedActivities";
import HotelsView from "@/components/ItineraryView/HotelsView";
import Gallery from "@/components/ItineraryView/Gallery";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

gsap.registerPlugin(ScrollTrigger);

const sectionsData = [
    { id: 1, image: "https://images.pexels.com/photos/2577274/pexels-photo-2577274.jpeg?_gl=1*u4a494*_ga*MjA2NjUyODYxMC4xNzUwMTYyOTA4*_ga_8JE65Q40S6*czE3NTAyNDQyNzMkbzIkZzEkdDE3NTAyNDQ1MzckajE4JGwwJGgw", bg: "#ffefef", component: TabCards },
    { id: 2, image: "https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?_gl=1*6gckvs*_ga*MjA2NjUyODYxMC4xNzUwMTYyOTA4*_ga_8JE65Q40S6*czE3NTAyNDQyNzMkbzIkZzEkdDE3NTAyNDQyODckajQ2JGwwJGgw", bg: "#efffef", component: PlannedActivities },
    { id: 3, image: "https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?_gl=1*11ks4xi*_ga*MjA2NjUyODYxMC4xNzUwMTYyOTA4*_ga_8JE65Q40S6*czE3NTAyNDc4ODkkbzMkZzEkdDE3NTAyNDc5ODQkajU5JGwwJGgw", bg: "#efefff", component: HotelsView },
    { id: 4, image: "https://images.pexels.com/photos/705075/pexels-photo-705075.jpeg?_gl=1*1q6k38r*_ga*MjA2NjUyODYxMC4xNzUwMTYyOTA4*_ga_8JE65Q40S6*czE3NTAyNDc4ODkkbzMkZzEkdDE3NTAyNDk2MjAkajM0JGwwJGgw", bg: "#efefff", component: Gallery },

];

export default function demo2() {
    const sectionsRef = useRef([]);

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
                    // markers: true

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

            gsap.from(section.querySelector(".hotels-container"), {
                y: 300,
                scrollTrigger: {
                    trigger: section,
                    start: "top 60%",
                    end: "top 0%",
                    scrub: true,
                    // markers: true
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

            // childElementsTimeline.from(
            //     section.querySelectorAll(".animate-heading-y"),
            //     {
            //         y: -400,
            //         stagger: 0.2,
            //         opacity: 0,
            //         scale: 0.9,
            //     }
            // );
            // childElementsTimeline.from(
            //     section.querySelectorAll(".info-card"),
            //     {
            //         opacity: 0,
            //         scale: 0.9,
            //     },
            //     "+=1"
            // );

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
                <div>
                    {sectionsData.map((section, idx) => (

                        <section
                            key={section.id}
                            ref={(el) => (sectionsRef.current[idx] = el)}
                            className=" relative overflow-hidden w-full h-[100vh]">
                            <div className="   absolute w-full h-[150vh] overflow-hidden inset-0 image-wrapper">
                                <Image
                                    src={section.image}
                                    alt={`section-${section.id}`}
                                    fill
                                    className=" object-cover"
                                    priority
                                />
                            </div>
                            <div className=" absolute flex-center w-full  inset-0 h-[100vh]">
                                {/* <div className="w-[300px]  info-card h-[200px] bg-white"></div> */}
                                <section.component />
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>

    );
}
