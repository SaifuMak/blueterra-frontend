'use client'

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import forest from "../../public/images/itinerary/forest.png";
import worldMap from '../../public/images/itinerary/world-map.png'
import HotelsView from "@/components/ItineraryView/HotelsView";
import Gallery from "@/components/ItineraryView/Gallery";
import Footer from "@/components/Footer/page";
import PlannedActivities from "@/components/ItineraryView/PlannedActivities/PlannedActivities";
import TabCards from '@/components/ItineraryView/TabsCards';
import backgroundImage from '../../public/images/itinerary/nature-background.png'
import ScrollSmoother from 'gsap/ScrollSmoother';
import SmoothScroll from "@/components/SmoothScroll";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Page5() {
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const containerRef = useRef(null);
    const planningRef = useRef()
    const galleryRef = useRef()

    const hotelContainerRef = useRef()


    const hotelGalleryRef = useRef()

    useGSAP(() => {
        // let ctx = gsap.context(() => {
        // Fade out box 1

        const plansTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: box2Ref.current,
                start: "top 80%",
                end: "top 10%",
                scrub: true,
                // markers: true
            },
        })


        plansTimeline.from(
            (".planned-activities"),
            {
                opacity: 0,
                scale: 0.77,
            }
        );
        plansTimeline.to(
            ".tab-card", {
            y: -200,
            opacity: 0,
            delay :1.2,
        }
        )
        plansTimeline.to(
            ".animate-heading-y", {
            y: -200,
            opacity: 0,
            stagger: 0.1,
        }
        )

        gsap.fromTo(".tab-card", {
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

        gsap.fromTo(".animate-heading-y", {
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

        gsap.fromTo(
            hotelGalleryRef.current.querySelector(".hotels-container"),
            {
                y: "50%",
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: hotelGalleryRef.current,
                    start: "top 70%",
                    end: "top 10%",
                    scrub: true,
                    // markers: true,
                    // onEnter: () => console.log("Hotels container entered"),
                    // onLeave: () => console.log("Hotels container left"),
                    // onEnterBack: () => console.log("Hotels container entered back"),
                    // onLeaveBack: () => console.log("Hotels container left back"),
                },
            })



        const gallerySectionTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: galleryRef.current.querySelector(".gallery-container"),
                start: "top 70%",
                end: "top 30%",
                scrub: true,
                // markers: true
            },
        })


        gallerySectionTimeline.fromTo(
            // ".gallery-title",
            galleryRef.current.querySelector(".gallery-title"),
            {
                y: -100,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
            }, 0)

        gallerySectionTimeline.fromTo(
            // ".gallery-tile",
            galleryRef.current.querySelectorAll(".gallery-tile"),

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

            }, 0)


        // }, containerRef);

        // return () => ctx.revert();
    }, []);

    // useEffect(() => {
    //     const smoother = ScrollSmoother.create({
    //         wrapper: '#smooth-wrapper',
    //         content: '#smooth-content',
    //         smooth: 1, // amount of smoothing
    //         effects: true, // enable data-speed, data-lag, etc
    //     });

    //     return () => {
    //         smoother.kill();
    //     };
    // }, []);


    const [selectedTab, setselectedTab] = useState('Overview')

    const tabViews = [{ tab: "Overview" }, { tab: "Planned Activities" }, { tab: "Hotel Rooms" },]



    const handleTabSelection = (tab) => {
        setselectedTab(tab)
        if (tab === 'Planned Activities') {
            window.scrollTo({
                top: box2Ref.current.offsetTop,
                behavior: 'smooth', // enables smooth animation
            });

        }
        if (tab === 'Hotel Rooms') {
            window.scrollTo({
                top: hotelContainerRef.current.offsetTop,
                behavior: 'smooth', // enables smooth animation
            });

        }
    }



    return (
        // <div id="smooth-wrapper" >
        //     <div id="smooth-content" >
        <SmoothScroll>

            <div className="">
                <div ref={containerRef} className="relative w-full h-[200vh]">
                    {/* Fixed Background */}
                    <div className="fixed inset-0 -z-10">
                        <Image src={backgroundImage} alt="forest" fill className="object-cover" priority />
                    </div>

                    {/* Section 1 */}
                    <div className="h-screen  flex items-center justify-center">

                        <div ref={box1Ref} className=" w-full h-full flex-center ">
                            {/* <PlannedActivities /> */}
                            <TabCards selectedTab={selectedTab} tabViews={tabViews} handleTabSelection={handleTabSelection} />
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="h-screen  flex items-center justify-center">

                        <div ref={box2Ref} className=" w-full h-full flex-center ">
                            <PlannedActivities />
                        </div>
                    </div>
                </div>

                <div ref={hotelContainerRef} className="h-[200vh] bg-white w-full hotels-section  relative overflow-hidden">
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
                            <div ref={galleryRef} className="w-full h-full">
                                <Gallery />
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={planningRef} className="w-full h-[220px] lg:h-[280px] xl:h-[320px] 2xl:h-[380px] overflow-hidden relative">
                    <div className="   absolute w-full h-[280px] lg:h-[360px] xl:h-[510px] 2xl:h-[590px] overflow-hidden inset-0 planner-image-wrapper">
                        <Image
                            src='/images/itinerary/tree-in-river.png'
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
        </SmoothScroll>
        //     </div>
        // </div>

    );
}
