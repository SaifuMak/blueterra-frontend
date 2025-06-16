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

export default function ItineraryView() {

    const [selectedTab, setselectedTab] = useState('Overview')


    return (
        <div className=" h-full w-full bg-slate-300 flex flex-col  items-center justify-center  relative ">

            <Image
                src={backgroundImage}
                alt='nuture'
                className="object-cover z-0"
                fill
                placeholder="blur"
                priority

            />

            {/* <ImageCarousal carousalData={carousalData}/> */}
            <PlannedActivities />

            {/* <ThreeItemsCarousel/> */}


        </div>
    )

}