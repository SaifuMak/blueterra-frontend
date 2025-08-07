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
import SmoothScroll from "@/components/SmoothScroll";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navbar from "@/components/Navbar/page";
import { playfair, rubik } from "@/app/fonts"
import ResponsiveClipPath from "@/components/generalComponents/ResponsiveClipPath";
import Button from "@/components/generalComponents/Button";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Page4() {
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);

    const box1ContainerRef = useRef(null);
    const box2ContainerRef = useRef(null);
    const containerRef = useRef(null);

    const planningRef = useRef()
    const galleryRef = useRef()

    const hotelContainerRef = useRef()
    const hotelGalleryRef = useRef()
    const bannerContainer = useRef()


    const galleryData = [
        { name: "Safari Adventure", image: "https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg" },
        { name: "Safari Adventure", image: "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg" },
        { name: "Island Escape", image: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg" },
        { name: "Cultural Celebration", image: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg" },
        { name: "Majestic Waterfalls", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg" },
    ];




    useGSAP(() => {
        const elements = gsap.utils.toArray(".vertically-animated-element");

        elements.forEach((box) => {
            gsap.fromTo(
                box,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                        // markers: true
                    },
                }
            );
        });
    }, { scope: galleryRef });


    useGSAP(() => {
        const elements = gsap.utils.toArray(".vertically-animated-element");

        elements.forEach((box) => {
            gsap.fromTo(
                box,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, { scope: planningRef });




    useGSAP(() => {
        gsap.fromTo(
            ".vertically-animate-element",
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.5,
                // stagger: 0.4, // now this will work
            }
        );
    }, { scope: bannerContainer });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])


    //  useGSAP(() => {
    //     const elements = gsap.utils.toArray(".vertically-animate-element");

    //     elements.forEach((box) => {
    //         gsap.fromTo(
    //             box,
    //             { opacity: 1, y: 0 },
    //             {
    //                 opacity: 0,
    //                 y: 60,
    //                 duration: 0.7,
    //                 ease: "power3.out",
    //                 scrollTrigger: {
    //                     trigger: bannerContainer.current,
    //                     start: "bottom 70%",
    //                     toggleActions: "play none play reverse",
    //                     markers: true
    //                 },
    //             }
    //         );
    //     });
    // }, { scope: bannerContainer });



    // useGSAP(() => {

    //     const plansTimeline = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: box2Ref.current,
    //             start: "top 80%",
    //             end: "top 20%",
    //             scrub: true,
    //             // markers: true,
    //         },
    //     })
    //     plansTimeline.to(
    //         ".animate-heading-y", {
    //         y: -200,
    //         opacity: 0,
    //         stagger: 0.1,
    //     }
    //     )


    //     plansTimeline.from(
    //         (".planned-activities"),
    //         {
    //             opacity: 0,
    //             scale: 0.77,
    //         }
    //     );
    //     plansTimeline.to(
    //         ".tab-card", {
    //         y: -100,
    //         opacity: 0,
    //         delay: 1.2,
    //     }
    //     )



    //     gsap.fromTo(".tab-card", {
    //         y: 200,
    //         opacity: 0,
    //     },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             stagger: 0.1,
    //             ease: "power2.inOut",
    //             duration: 1.2
    //         })

    //     gsap.fromTo(".animate-heading-y", {
    //         y: -200,
    //         opacity: 0,
    //     },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             stagger: 0.1,
    //             ease: "power2.inOut",
    //             duration: 1.2
    //         })

    //     gsap.fromTo(
    //         hotelGalleryRef.current.querySelector(".hotels-container"),
    //         {
    //             y: "50%",
    //             opacity: 0,
    //         },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             scrollTrigger: {
    //                 trigger: hotelGalleryRef.current,
    //                 start: "top 70%",
    //                 end: "top 10%",
    //                 scrub: true,
    //                 // markers: true,
    //                 // onEnter: () => console.log("Hotels container entered"),
    //                 // onLeave: () => console.log("Hotels container left"),
    //                 // onEnterBack: () => console.log("Hotels container entered back"),
    //                 // onLeaveBack: () => console.log("Hotels container left back"),
    //             },
    //         })



    //     const gallerySectionTimeline = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: galleryRef.current.querySelector(".gallery-container"),
    //             start: "top 70%",
    //             end: "top 30%",
    //             scrub: true,
    //             // markers: true
    //         },
    //     })


    //     gallerySectionTimeline.fromTo(
    //         // ".gallery-title",
    //         galleryRef.current.querySelector(".gallery-title"),
    //         {
    //             y: -100,
    //             opacity: 0,
    //         },
    //         {
    //             y: 0,
    //             opacity: 1,
    //         }, 0)

    //     gallerySectionTimeline.fromTo(
    //         // ".gallery-tile",
    //         galleryRef.current.querySelectorAll(".gallery-tile"),

    //         {
    //             y: "30%",
    //             opacity: 0,
    //         },
    //         {
    //             y: 0,
    //             opacity: 1,
    //             stagger: {
    //                 each: 0.3,
    //                 from: "center"
    //             },

    //         }, 0)

    // }, []);



    return (
        <>

            <SmoothScroll>
                <Navbar />

                <div className={`${rubik.className}`}>

                    <div className="relative  w-full min-h-[90vh] ">
                        {/* Fixed Background */}
                        <div className="fixed inset-0 -z-10">
                            <Image src='/images/itinerary/banner.png' alt="forest" fill className="" priority />
                        </div>
                        <div className=" w-full h-full absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent ">
                        </div>


                        <div ref={bannerContainer} className="   h-full flex  ">

                            <div className=" text-white z-30 mt-10  flex flex-col  justify-between  text-center w-full h-full   ">

                                <div className={`${playfair.className}`}>
                                    <p className=" text-[100px] opacity-0 vertically-animate-element font-medium">8 Days Kenya Safari</p>
                                    <p className=" text-white/30 opacity-0 vertically-animate-element font-medium h-fit -mt-28 text-[250px]">Kenya</p>
                                </div>

                                <div className=" space-y-5  text-center flex font-light flex-col items-center">
                                    <p className=" text-[25px] opacity-0 vertically-animate-element leading-9 w-5/12">An extensively crafted schedule that outlines every aspect of your journey, including day-by-day activities, carefully selected destinations, accommodations, transportation details, and unique experiences.</p>
                                    <p className=" w-4/12 text-xl opacity-0 vertically-animate-element leading-9">A comprehensive and meticulously curated document that presents a day-by-day breakdown of your travel journey, featuring thoughtfully.</p>
                                    <Button text='START PLANNING' buttonStyle={` opacity-0 vertically-animate-element font-normal transition-all duration-500 mb-10  mt-5 ease-in-out font-medium max-md:text-sm px-4 lg:px-6 xl:px-12 py-1.5 xl:py-2 `} />
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* 
                    <div className="grid grid-cols-1 pt-20 w-full sm:grid-cols-3 gap-6 py-8 bg-white text-center">
                        <div>
                            <h3 className="text-lg font-bold uppercase text-orange-600 tracking-widest">When</h3>
                            <p className="italic text-gray-600 mt-2">Jun–Oct / Dec–Jan</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold uppercase text-teal-600 tracking-widest">Price</h3>
                            <p className="mt-2 text-gray-600 italic">
                                From £8,000pp excl. flights
                                <span className="inline-block ml-1 align-middle cursor-pointer">
                                </span>
                            </p>
                            <p className="text-sm text-gray-400 mt-1 italic">(based on 2 ppl sharing)</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold uppercase text-blue-600 tracking-widest">How Long</h3>
                            <p className="italic text-gray-600 mt-2">8 nights ideal length</p>
                        </div>
                    </div> */}


                    <div className=" w-full bg-white relative   min-h-screen flex-center">
                        {/* <ResponsiveClipPath outerClass='absolute  w-7/12  right-0 bottom-0 h-full' ImagePath='/images/itinerary/planned-activity-clip-path.png' /> */}

                        <PlannedActivities />
                    </div>


                    <div className=" w-full   min-h-[100vh] pb-20 overflow-hidden bg-white flex justify-center  px-7">
                        <div className=" w-11/12 flex-center rounded-4xl relative h-full overflow-hidden bg-light-beige">
                            <ResponsiveClipPath outerClass='absolute  w-4/12  left-0 top-0 h-10/12' ImagePath='/images/itinerary/hotels-clip-path.png' />
                            <HotelsView />
                        </div>
                    </div>


                    <div ref={galleryRef} className="  bg-white  w-full h-full">

                        <div className="w-full h-full bg-white/30   flex-center relative">
                            {/* <Image
                            src='/images/itinerary/gallery-banner.png'
                            alt="forest"
                            fill
                            className=" object-cover  "
                            priority
                        /> */}
                            {/* <div className=" w-11/12  space-y-10 mb-24  py-16  h-full flex flex-col  items-center rounded-3xl vertically-animated-element bg-white/10 backdrop-blur-xl border border-white/40 "> */}
                            <div className=" w-11/12 overflow-hidden   space-y-10 mb-24   h-full flex flex-col  items-center rounded-3xl vertically-animated-element ">

                                <h6 className={`${playfair.className} gallery-title  vertically-animated-element text-center text-4xl xl:text-5xl  text-dark-4B font-medium`} >Gallery</h6>
                                <div className="  w-full px-3  mt-5 z-50  vertically-animated-element  flex rounded-xl overflow-hidden  gap-4   ">

                                    {galleryData?.map((item, index) => (
                                        // <div key={index} className={`relative group min-h-[70vh] delay-75 hover:flex-4 flex-1 transition-[flex] duration-700 ease-[cubic-bezier(0.25, 1, 0.5, 1)] gallery-tile overflow-hidden hover:cursor-pointer rounded-xl`}>
                                        <div key={index} className={`relative  group min-h-[80vh]  hover:flex-5 gallery-tile  overflow-hidden delay-200 hover:cursor-pointer w-full  flex-1 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transition-all  duration-700 rounded-xl`}>
                                            <Image
                                                src={item.image}
                                                alt='image'
                                                fill
                                                className='object-cover rounded-xl'
                                                priority

                                            />
                                            <p className=" text-nowrap opacity-0 font-medium absolute delay-200 bottom-10 group-hover:opacity-100 group-hover:translate-x-12 -left-5 translate-all duration-500   2xl:text-2xl text-white">{item.name}</p>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>


                    <div ref={planningRef}
                        className="w-full  min-h-[50vh]  bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center  overflow-hidden relative"
                        style={{
                            backgroundImage: "url('/images/our-story/yellow-banner.png')",
                        }}
                    >
                        {/* <ResponsiveClipPath outerClass='absolute  w-4/12  left-0 bottom-0 h-full' ImagePath='/images/itinerary/planning-left-clip-path.png' />
                        <ResponsiveClipPath outerClass='absolute  w-1/12  right-0 bottom-0 h-10/12' ImagePath='/images/itinerary/planning-right-clip-path.png' /> */}

                        <div className="lg:w-8/12 md:w-10/12  space-y-10   text-center h-auto flex-col text-dark-28  flex-center">
                            <h3 className={`xl:text-[50px] text-2xl  font-medium  antialiased  text-dark-4B text-center vertically-animated-element ${playfair.className}`}>Design Your Perfect Itinerary</h3>
                            <p className=" lg:text-2xl font-light  leading-9 text-xs vertically-animated-element lg:w-5/6 ">
                                Create a journey that reflects your interests, pace, and
                                travel style — from handpicked experiences to seamless logistics, every detail is yours to shape.
                            </p>
                            <Button text='START PLANNING' buttonStyle={`  transition-all duration-500 vertically-animated-element ease-in-out font-light  max-md:text-sm px-4 lg:px-6 xl:px-12 py-1.5 xl:py-2.5 `} isHoverWhiteApplied={false} />

                        </div>
                    </div>


                    <Footer />
                </div>
            </SmoothScroll>

        </>
        //     </div>
        // </div>

    );
}
