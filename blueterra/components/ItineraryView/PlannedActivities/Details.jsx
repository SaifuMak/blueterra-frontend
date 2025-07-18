'use client'
import { useState, useEffect, useRef } from "react"
import uaePlaces from "@/components/datas/Places"


export default function Details() {

    const experiences = [
        "Hot air balloon",
        "Jungle safari",
        "Mountain trekking",
        "Cultural village visit",
        "Helicopter ride",
        "Camel ride in the desert",
        "River rafting adventure",
        "Zip-lining through forest"
    ];


    return (
        <div className="w-full xl:px-2 xl:pb-2 h-full max-xl:text-sm  text-dark-28 text-base flex flex-col overflow-y-auto lg:flex-row lg:space-x-3">
            {/* First column */}
            <div className="w-full flex flex-col ">
                <p className="text-lg font-normal xl:text-[22px] text-dark-4B">Places to explore</p>
                <div className="flex flex-wrap mt-2 pb-3 gap-x-5 gap-y-2 font-light overflow-y-auto">
                    {uaePlaces?.map((places, index) => ( 
                        <div key={index} className="flex items-center  w-full ">
                            <span>
                                <img src="/Icons/blue-location.svg" alt="location" className="size-3.5" />
                            </span>
                            <p className="ml-2">{places}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Second column */}
            <div className="w-full flex flex-col mt-4 lg:mt-0 ">
                <p className="xl:text-[22px] font-normal text-dark-4B">Experiences to be unlocked</p>
                <div className="flex flex-wrap mt-2 pb-3 gap-x-2 gap-y-2 font-light overflow-y-auto">
                    {experiences?.map((places, index) => (
                        <div key={index} className="flex w-full items-center">
                            <span className="w-2 h-2 bg-[#026E9E] rounded-full"></span>
                            <p className="ml-2">{places}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}