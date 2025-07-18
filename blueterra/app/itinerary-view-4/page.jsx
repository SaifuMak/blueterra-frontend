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


    const galleryData = [
        { name: "Safari Adventure", image: "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg" },
        { name: "Cultural Celebration", image: "/images/gallery/girl-dancing.png" },
        { name: "Island Escape", image: "/images/gallery/island.png" },
        { name: "Burj Khalifa", image: "/images/gallery/burj-kalifa.png" },
        { name: "Majestic Waterfalls", image: "/images/gallery/waterfall-mountain.png" },
        { name: "Tropical Forest Retreat", image: "/images/gallery/forest-in-beach.png" },
    ];




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

        <SmoothScroll>
            <Navbar />

            <div className={`${rubik.className}`}>

                <div ref={containerRef} className="relative  w-full min-h-[90vh] ">
                    {/* Fixed Background */}
                    <div className="fixed inset-0 -z-10">
                        <Image src='/images/itinerary/banner.png' alt="forest" fill className="" priority />
                    </div>
                    <div className=" w-full h-full absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent ">
                    </div>


                    <div ref={box1ContainerRef} className="  h-full flex border ">

                        <div ref={box1Ref} className=" text-white z-30 mt-10  flex flex-col border justify-between  text-center w-full h-full   ">

                            <div className={`${playfair.className}`}>
                                <p className=" text-[100px] font-medium">8 Days Kenya Safari</p>
                                <p className=" text-white/30 font-medium h-fit -mt-28 text-[250px]">Kenya</p>
                            </div>

                            <div className=" space-y-5  text-center flex font-light flex-col items-center">
                                <p className=" text-[25px] leading-9 w-5/12">An extensively crafted schedule that outlines every aspect of your journey, including day-by-day activities, carefully selected destinations, accommodations, transportation details, and unique experiences.</p>
                                <p className=" w-4/12 text-xl leading-9">A comprehensive and meticulously curated document that presents a day-by-day breakdown of your travel journey, featuring thoughtfully.</p>
                                <Button text='START PLANNING' buttonStyle={` font-semibold transition-all duration-500 mb-10  mt-5 ease-in-out font-medium max-md:text-sm px-4 lg:px-6 xl:px-12 py-1.5 xl:py-2 `} />
                            </div>

                        </div>
                    </div>

                </div>

                <div className=" w-full bg-white relative  border min-h-screen flex-center">
                    <ResponsiveClipPath outerClass='absolute  w-7/12  right-0 bottom-0 h-full' ImagePath='/images/itinerary/planned-activity-clip-path.png' />

                    <PlannedActivities />
                </div>


                <div className=" w-full  min-h-[100vh] pb-20 overflow-hidden bg-white flex justify-center  px-7">
                    <div className=" w-11/12 flex-center rounded-4xl relative h-full overflow-hidden bg-light-beige">
                        <ResponsiveClipPath outerClass='absolute  w-4/12  left-0 top-0 h-10/12' ImagePath='/images/itinerary/hotels-clip-path.png' />
                        <HotelsView />
                    </div>
                </div>

                <div className=" bg-dark-beige  w-full h-full">

                    <div className="w-full h-full bg-white/30   flex-center relative">
                        <Image
                            src='/images/itinerary/gallery-banner.png'
                            alt="forest"
                            fill
                            className=" object-cover  "
                            priority
                        />
                        <div className=" w-11/12 my-20  space-y-10 mb-24  py-16  h-full flex flex-col  items-center rounded-3xl bg-white/10 backdrop-blur-xl border border-white/40 ">
                            <h6 className={`${playfair.className} gallery-title  text-center text-4xl xl:text-5xl  text-dark-4B font-medium`} >Gallery</h6>
                            <div className="  w-10/12  mt-5 z-50    flex rounded-xl overflow-hidden  gap-4   ">

                                {galleryData?.map((item, index) => (
                                    <div key={index} className={`relative  group min-h-[70vh]  hover:flex-4 gallery-tile  overflow-hidden delay-75 hover:cursor-pointer w-full  flex-1 transition-all ease-in-out duration-700 rounded-xl`}>
                                        <Image
                                            src={item.image}
                                            alt='image'
                                            fill
                                            className='object-cover rounded-xl'
                                            priority

                                        />
                                        <p className=" text-nowrap opacity-0 font-medium absolute delay-100 bottom-10 group-hover:opacity-100 group-hover:translate-x-12 -left-5 translate-all duration-500   2xl:text-2xl text-white">{item.name}</p>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>



                <div ref={planningRef} className="w-full    min-h-[50vh] bg-dark-beige flex flex-col justify-center items-center  overflow-hidden relative">
                    <ResponsiveClipPath outerClass='absolute  w-4/12  left-0 bottom-0 h-full' ImagePath='/images/itinerary/planning-left-clip-path.png' />
                    <ResponsiveClipPath outerClass='absolute  w-1/12  right-0 bottom-0 h-10/12' ImagePath='/images/itinerary/planning-right-clip-path.png' />

                    <div className="lg:w-8/12 md:w-10/12  space-y-10   text-center h-auto flex-col text-dark-28  flex-center">
                        <h3 className={`xl:text-[50px] text-2xl  font-medium  antialiased  text-dark-4B text-center ${playfair.className}`}>Design Your Perfect Itinerary</h3>
                        <p className=" lg:text-2xl font-light  leading-9 text-xs  lg:w-5/6 ">
                            Create a journey that reflects your interests, pace, and
                            travel style — from handpicked experiences to seamless logistics, every detail is yours to shape.
                        </p>
                        <Button text='START PLANNING' buttonStyle={`  transition-all duration-500  ease-in-out font-light  max-md:text-sm px-4 lg:px-6 xl:px-12 py-1.5 xl:py-2.5 `} isHoverWhiteApplied={false} />

                    </div>
                </div>


                <Footer />
            </div>
        </SmoothScroll>
        //     </div>
        // </div>

    );
}
