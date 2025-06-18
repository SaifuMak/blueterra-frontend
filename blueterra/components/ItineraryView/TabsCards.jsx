'use client'
import { useState, useRef } from "react"

export default function TabCards() {

    const [selectedTab, setselectedTab] = useState('Overview')
    const tabViews = [{ tab: "Overview" }, { tab: "Planned Activities" }, { tab: "Hotel Rooms" },]


    const handleTabSelection = (tab) => {
        setselectedTab(tab)
    }



    return (
        <div className=" w-full h-full  flex  justify-center mt-10  items-center   flex-col">

            <div className="z-10 text-center ">
                <p className=" animate-y  text-white text-[90px] opacity-0 animate-heading-y  title font-medium antialiased ">Trip Itinerary</p>
                <p className="animate-y  text-white/40 text-[220px] opacity-0 animate-heading-y  -mt-16  title  font-medium antialiased ">Trip Itinerary</p>
            </div>

            <div className="w-6/12 tab-card opacity-0 rounded-xl  -mt-24 bg-white flex flex-col items-center py-16 z-10  ">
                <div className=" flex justify-between items-center w-5/12 ">
                    {tabViews?.map((item, index) => (
                        <div onClick={() => handleTabSelection(item.tab)} key={index} className={` text-xl ${selectedTab === item.tab ? 'text-brand-blue' : 'text-black'} text-nowrap cursor-pointer font-normal`}>{item.tab}</div>
                    ))}
                </div>

                <div className="w-9/12  text-center">
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
    )



}