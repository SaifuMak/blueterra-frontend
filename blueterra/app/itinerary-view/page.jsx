'use client'

import { useState, useEffect, useRef } from "react"
import gsap from 'gsap';
import PlannedActivities from "@/components/ItineraryView/PlannedActivities/PlannedActivities";
import Carousal from "@/components/ItineraryView/PlannedActivities/Carousal";
import Image from "next/image";
import carousalData from "@/components/datas/DestinationsDetails";
import ImageCarousal from "@/components/ItineraryView/PlannedActivities/ImageCarousal";
import ThreeItemsCarousel from "@/components/ItineraryView/ThreeItemCarousel";
import backgroundImage from '../../public/images/itinerary/nature-background.png'
import nature from '../../public/images/itinerary/nature.png'

import Gallery from "@/components/ItineraryView/Gallery";
import { Button } from "@/components/ui/button"
import HotelsList from "@/components/ItineraryView/HotelsList";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function ItineraryView() {

    const [selectedTab, setselectedTab] = useState('Overview')

    const [currentHotel, setCurrentHotel] = useState(0)
    const [hotelsCount, setHotelsCount] = useState(0)

    const tabViews = [{ tab: "Overview" }, { tab: "Planned Activities" }, { tab: "Hotel Rooms" },]

    const titleContainerRef = useRef()
    const contentTabsRef = useRef()


    const handleTabSelection = (tab) => {
        setselectedTab(tab)
    }



    const HotelsData = [
        {
            image: '/images/static/room1.png',
            title: 'Deluxe Room',
            subtitle: 'Comfort meets elegance',
            description: 'Spacious room with a king-size bed, city view, and modern amenities for a relaxing stay.',
        },
        {
            image: '/images/static/room2.png',
            title: 'Executive Suite',
            subtitle: 'Luxury redefined',
            description: 'A lavish suite with separate living area, premium furnishings, and personalized services.',
        },
        {
            image: '/images/static/room1.png',
            title: 'Family Room',
            subtitle: 'Perfect for all',
            description: 'Comfortable and spacious, ideal for families with multiple beds and kid-friendly features.',
        },
        {
            image: '/images/static/room2.png',
            title: 'Pool View Room',
            subtitle: 'Serenity by the pool',
            description: 'Enjoy tranquil views of the poolside, with access to a private balcony and cozy interiors.',
        },
        {
            image: '/images/static/room1.png',
            title: 'Ocean View Room',
            subtitle: 'Wake up to waves',
            description: 'Breathtaking views of the sea, perfect for a romantic or peaceful retreat.',
        },
        {
            image: '/images/static/room2.png',
            title: 'Penthouse Suite',
            subtitle: 'Top-tier experience',
            description: 'The finest in luxury, with panoramic views, private terrace, and exceptional service.',
        },
        {
            image: '/images/static/room1.png',
            title: 'Twin Room',
            subtitle: 'Stylish sharing',
            description: 'Ideal for friends or colleagues, featuring two single beds and modern décor.',
        },
        {
            image: '/images/static/room1.png',
            title: 'Business Room',
            subtitle: 'Work and unwind',
            description: 'Designed for business travelers, with workspace, fast Wi-Fi, and quiet environment.',
        },
    ];



    useGSAP(() => {
        const tl = gsap.timeline({ duration: 1, ease: "power2.inOut" })

        tl.to(".title", {
            y: 80,
            opacity: 1,
            stagger: 0.3,
            duration: 0.7,
        })
            .fromTo(contentTabsRef?.current, {
                scale: 0.7,
                y: 20,
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
            })

    }, { scope: titleContainerRef })


    return (
        <div className=" w-full  flex flex-col items-center">

            <div className="relative min-h-[100vh] ">

                <Image
                    src={nature}
                    alt='nuture'
                    className="object-cover z-0"
                    fill
                    placeholder="blur"
                    priority
                />


                <div className=" w-full h-full mt-10  flex items-center  flex-col">

                    <div ref={titleContainerRef} className=" -mt-12 z-10 text-center">
                        <p className="  text-white text-[90px] opacity-0 title font-medium antialiased ">Trip Itinerary</p>
                        <p className=" text-white/40 text-[190px] opacity-0 title -mt-12 font-medium antialiased ">Trip Itinerary</p>
                    </div>

                    <div ref={contentTabsRef} className="w-6/12  rounded-xl  bg-white flex flex-col opacity-0 items-center py-16 z-10   ">
                        <div className=" flex justify-between items-center w-5/12 ">
                            {tabViews?.map((item, index) => (
                                <div onClick={() => handleTabSelection(item.tab)} key={index} className={` text-xl ${selectedTab === item.tab ? 'text-brand-blue' : 'text-black'} cursor-pointer font-normal`}>{item.tab}</div>
                            ))}
                        </div>

                        <div className="w-9/12 text-center">
                            <p className="text-xl font-light mt-10">An extensively crafted schedule that outlines every aspect of your journey, including day-by-day activities, carefully
                                selected destinations, accommodations, transportation details, and unique experiences.</p>
                            <p className=" mt-5 font-normal leading-relaxed">
                                A comprehensive and meticulously curated document that presents a day-by-day breakdown of your travel journey,
                                featuring thoughtfully selected destinations, immersive cultural encounters, handpicked accommodations,
                                seamless transportation arrangements,
                                local culinary experiences, guided tours, leisure activities, and moments of spontaneous discovery.
                            </p>
                        </div>

                        <div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="relative min-h-screen w-full ">

                <Image
                    src={backgroundImage}
                    alt='nuture'
                    className="object-cover z-0"
                    fill
                    placeholder="blur"
                    priority
                />
            </div>



            {/* <ImageCarousal carousalData={carousalData}/> */}

            {/* <PlannedActivities /> */}

            {/* <ThreeItemsCarousel/> */}

            {/* <div className="lg:w-10/12 md:w-11/12 w-full bg-white md:space-y-6  space-y-4 2xl:px-20 xl:px-10 lg:px-20  md:py-10 py-5 z-10 ">
                <div className=" flex-center flex-col space-y-3">
                    <h5 className="text-4xl font-medium">Hotel Rooms</h5>
                    <p className=" text-center w-10/12 xl:w-6/12">Discover a thoughtfully curated range of accommodation options designed
                        to suit every traveler's preferences, comfort level, and lifestyle.</p>
                </div>
                <HotelsList HotelsData={HotelsData} setCurrent={setCurrentHotel} setCount={setHotelsCount} />

                <div className="flex-center space-x-2 overflow-hidden">
                    {[...Array(hotelsCount)].map((_, index) => (
                        <span key={index} className={` transform transition-all duration-300 ease-in-out  ${currentHotel === index + 1 ? "w-8 h-2 bg-brand-blue" : "w-2 h-2 bg-[#C4E5F1]"} rounded-full`} />

                    ))}
                </div>
            </div> */}


            {/* <div className="w-full  h-[420px] relative">
                <Image
                    src='/images/Itinerary/tree-in-river.png'
                    alt="tree-in-river"
                    fill
                    className=" object-cover "
                />
                <div className="  absolute bg-white/10 w-full h-full flex-center ">
                    <div className="w-8/12 text-center h-auto flex-col text-white  flex-center">
                        <h3 className="text-5xl  font-medium  antialiased text-center">Design Your Perfect Itinerary</h3>
                        <p className=" text-2xl mt-12 w-5/6 ">
                            Create a journey that reflects your interests, pace, and
                            travel style — from handpicked experiences to seamless logistics, every detail is yours to shape.
                        </p>
                        <button className="px-10 py-2 rounded-full mt-8 bg-white/15">START PLANNING</button>
                    </div>
                </div>
            </div> */}

            {/* <Gallery/> */}


        </div>
    )

}