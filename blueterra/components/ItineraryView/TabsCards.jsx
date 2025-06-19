'use client'
import { useState, useRef } from "react"

export default function TabCards({ selectedTab, tabViews, handleTabSelection }) {

    // const [selectedTab, setselectedTab] = useState('Overview')

    // const tabViews = [{ tab: "Overview" }, { tab: "Planned Activities" }, { tab: "Hotel Rooms" },]


    // const handleTabSelection = (tab) => {
    //     setselectedTab(tab)
    // }


    return (
        <div className=" w-full h-full  flex  justify-center max-sm:px-8   items-center   flex-col">

            <div className="z-10 text-center ">
                <p className=" animate-y  text-white text-[30px] md:text-[50px] lg:text-[70px] xl:text-[80px] 2xl:text-[90px] opacity-0 animate-heading-y  title font-medium antialiased ">Trip Itinerary</p>
                <p className="animate-y text-nowrap  text-white/40 text-[60px] md:text-[130px] lg:text-[160px] xl:text-[200px] 2xl:text-[220px] opacity-0 animate-heading-y -mt-5  md:-mt-10  lg:-mt-16  title  font-medium antialiased ">Trip Itinerary</p>
            </div>

            <div className="2xl:w-6/12 lg:w-7/12 md:w-10/12  tab-card opacity-0 rounded-xl md:-mt-10 lg:-mt-16  xl:-mt-20  2xl:-mt-24 bg-white flex flex-col items-center py-10 2xl:py-16 z-10  ">
                <div className=" flex  items-center justify-center space-x-2 md:space-x-5 xl:space-x-8 w-6/12 ">
                    {tabViews?.map((item, index) => (
                        <div onClick={() => handleTabSelection(item.tab)} key={index} className={` lg:text-xl ${selectedTab === item.tab ? 'text-brand-blue' : 'text-black'} text-nowrap cursor-pointer font-normal`}>{item.tab}</div>
                    ))}
                </div>

                <div className="2xl:w-9/12 max-sm:text-sm  w-10/12 text-center">
                    <p className="xl:text-xl font-light mt-10">An extensively crafted schedule that outlines every aspect of your journey, including day-by-day activities, carefully
                        selected destinations, accommodations, transportation details, and unique experiences.</p>
                    <p className=" mt-5 font-normal xl:leading-relaxed">
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