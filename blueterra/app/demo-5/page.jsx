'use client'

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import forest from "@/public/images/itinerary/forest.png"; // adjust the path
import worldMap from '../../public/images/itinerary/world-map.png'
import HotelsView from "@/components/ItineraryView/HotelsView";
import Gallery from "@/components/ItineraryView/Gallery";
import Footer from "@/components/Footer/page";
import PlannedActivities from "@/components/ItineraryView/PlannedActivities/PlannedActivities";

gsap.registerPlugin(ScrollTrigger);

export default function Page5() {
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const containerRef = useRef(null);
    const planningRef = useRef()

    const firstSectionRef = useRef()
    const secondSectionRef = useRef()


    const hotelGalleryRef = useRef()

    // useEffect(() => {
    //     let ctx = gsap.context(() => {
    //         // Fade out box 1
    //         gsap.to(box1Ref.current, {
    //             opacity: 0,
    //             y: -100,
    //             scrollTrigger: {
    //                 trigger: containerRef.current,
    //                 start: "top top",
    //                 end: "center top",
    //                 scrub: true,
    //                 markers: true,
    //             },
    //         });

    //         // Fade in box 2
    //         gsap.fromTo(
    //             box2Ref.current,
    //             { opacity: 0, y: 100 },
    //             {
    //                 opacity: 1,
    //                 y: 0,
    //                 scrollTrigger: {
    //                     trigger: containerRef.current,
    //                     start: "center center",
    //                     end: "bottom top",
    //                     scrub: true,
    //                     markers: true,
    //                 },
    //             }
    //         );
    //     }, containerRef);

    //     return () => ctx.revert();
    // }, []);


    useEffect(() => {
        let ctx = gsap.context(() => {
            // Fade out box 1

            gsap.from(
                (".planned-activities"),
                {
                    opacity: 0,
                    scale: 0.77,
                    scrollTrigger: {
                        trigger: box2Ref.current,
                        start: "top 50%",
                        end: "top 0%",
                        scrub: true,
                        // markers: true
                    },
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);




    return (

        <div className="">
            <div ref={containerRef} className="relative w-full h-[200vh]">
                {/* Fixed Background */}
                <div className="fixed inset-0 -z-10">
                    <Image src={forest} alt="forest" fill className="object-cover" priority />
                </div>

                {/* Section 1 */}
                <div className="h-screen  flex items-center justify-center">

                    <div ref={box1Ref} className=" w-full h-full ">
                        {/* <PlannedActivities /> */}
                        <div className="w-96 h-96 bg-violet-400"></div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="h-screen border flex items-center justify-center">

                    <div ref={box2Ref} className=" w-full h-full flex-center ">
                        <PlannedActivities />
                    </div>
                </div>
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
    );
}
