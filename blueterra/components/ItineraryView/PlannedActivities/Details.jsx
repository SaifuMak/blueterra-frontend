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
        <div className=" w-full p-2 h-full space-x-5 text-base flex overflow-x-auto ">
            <div className="w-6/12 space-x-3 flex flex-col h-full">
                <p className="text-lg font-medium">Places to explore</p>
                <div className="flex flex-col flex-wrap h-full mt-2 pb-3 space-y-1">
                    {uaePlaces?.map((places, index) => (
                        <div key={index} className="flex items-center">
                            <span className=""><img src="/icons/location.svg" alt="location-icon" className=" w-3 h-3" /></span>
                            <p className="ml-1">{places}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-6/12 space-x-3 flex flex-col h-full">
                <p className="text-lg font-medium">Experiences to be unlocked</p>
                <div className="flex flex-col flex-wrap mt-2 h-full space-y-1 pb-3">
                    {experiences?.map((places, index) => (
                        <div key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-[#3A938C] rounded-full "></span>
                            <p className="ml-1">{places}</p>

                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}