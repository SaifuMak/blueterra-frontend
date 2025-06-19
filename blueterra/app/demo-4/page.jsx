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

export default function demo4() {
    const sectionsRef = useRef([]);

    const planningRef = useRef()

    const hotelGalleryRef = useRef()

    const firstSectionRef = useRef()
    const secondSectionRef = useRef()

    

    useGSAP(() => {

        gsap.fromTo(firstSectionRef.current.querySelectorAll(".tab-card"), {
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

        gsap.fromTo(firstSectionRef.current.querySelectorAll(".animate-heading-y"), {
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
    })


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

                <div className=" h-screen w-full bg-black">
                    <div ref={firstSectionRef} className="w-full h-full">
                        <TabCards />
                    </div>
                </div>
                <div className=" h-screen w-full bg-black">
                    <div ref={secondSectionRef} className="w-full h-full">
                        <div className="w-[300px] h-[300px] bg-white"></div>
                    </div>
                </div>
            </div>
        </div>

    );
}
