'use client'
import { useState, useEffect, useRef } from "react"
import uaePlaces from "@/components/datas/Places"


export default function Details({ }) {

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
        <div className="w-full xl:p-2 h-full max-xl:text-sm  text-base flex flex-col overflow-y-auto lg:flex-row lg:space-x-3">
            {/* First column */}
            <div className="w-full flex flex-col ">
                <p className="text-lg font-medium">Places to explore</p>
                <div className="flex flex-wrap mt-2 pb-3 gap-x-5 gap-y-1 overflow-y-auto">
                    {uaePlaces?.map((places, index) => ( 
                        <div key={index} className="flex items-center  w-full ">
                            <span>
                                <img src="/Icons/location.svg" alt="location-icon" className="w-3 h-3" />
                            </span>
                            <p className="ml-1">{places}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Second column */}
            <div className="w-full flex flex-col mt-4 lg:mt-0 ">
                <p className="text-lg font-medium">Experiences to be unlocked</p>
                <div className="flex flex-wrap mt-2 pb-3 gap-x-2 gap-y-1 overflow-y-auto">
                    {experiences?.map((places, index) => (
                        <div key={index} className="flex w-full items-center">
                            <span className="w-2 h-2 bg-[#3A938C] rounded-full"></span>
                            <p className="ml-1">{places}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}