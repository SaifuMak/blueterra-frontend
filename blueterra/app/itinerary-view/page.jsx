'use client'

import { useState, useEffect, useRef } from "react"
import gsap from 'gsap';
import PlannedActivities from "@/components/ItineraryView/PlannedActivities/PlannedActivities";
import Carousal from "@/components/ItineraryView/PlannedActivities/Carousal";
import Image from "next/image";
import carousalData from "@/components/datas/DestinationsDetails";
import ImageCarousal from "@/components/ItineraryView/PlannedActivities/ImageCarousal";
import ThreeItemsCarousel from "@/components/ItineraryView/ThreeItemCarousel";

export default function ItineraryView() {

    const [selectedTab, setselectedTab] = useState('Overview')



    return (
        <div className=" min-h-screen bg-slate-300 flex flex-col  items-center justify-center     ">
            {/* <ImageCarousal carousalData={carousalData}/> */}
            <PlannedActivities/>

            {/* <ThreeItemsCarousel/> */}

          






        </div>
    )

}