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
import Gallery from "@/components/ItineraryView/Gallery";
import { Button } from "@/components/ui/button"


export default function ItineraryView() {

    const [selectedTab, setselectedTab] = useState('Overview')

    const tabViews = [{ tab: "Overview" }, { tab: "Planned Activities" }, { tab: "Hotel Rooms" },]

    const handleTabSelection = (tab) => {
        setselectedTab(tab)
    }

    return (
        <div className=" min-h-screen w-full bg-slate-300  flex flex-col  items-center   relative ">

            <Image
                src={backgroundImage}
                alt='nuture'
                className="object-cover z-0"
                fill
                placeholder="blur"
                priority

            />
           

            {/* added negative margins for the h tags  */}
            {/* <p className="  text-white text-[90px] z-10  mt-10   font-medium antialiased ">Trip Itinerary</p>
            <p className=" text-white/40 text-[190px] z-10 -mt-10 font-medium antialiased ">Trip Itinerary</p> */}

            {/* <div className="w-6/12 rounded-xl bg-white flex flex-col -mt-10 items-center py-16 z-10   ">
                <div className=" flex justify-between items-center w-5/12 ">
                    {tabViews?.map((item, index) => (
                        <div onClick={() => handleTabSelection(item.tab)} key={index} className={` ${selectedTab === item.tab ? 'text-brand-blue' : 'text-black'} cursor-pointer font-normal`}>{item.tab}</div>
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


            </div> */}

            {/* <ImageCarousal carousalData={carousalData}/> */}

            <PlannedActivities />

            {/* <ThreeItemsCarousel/> */}

            {/* <Gallery/> */}


        </div>
    )

}