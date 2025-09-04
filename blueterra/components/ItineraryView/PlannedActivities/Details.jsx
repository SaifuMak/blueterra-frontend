'use client'
import { useState, useEffect, useRef } from "react"
import uaePlaces from "@/components/datas/Places"


export default function Details({itineraryData}) {


    return (
        <div className="w-full xl:px-2 xl:pb-2 h-full max-xl:text-sm  text-dark-28 text-base flex flex-col overflow-y-auto sm:flex-row sm:space-x-3">
            {/* First column */}
            <div className="w-full flex flex-col ">
                <p className="xl:text-[22px] text-lg font-normal text-dark-28">Destination Highlights</p>
                <div className="flex flex-wrap mt-2 pb-3 gap-x-5 gap-y-2 font-light overflow-y-auto">
                    {itineraryData?.destination_highlights?.map((data, index) => (
                        <div key={index} className="flex items-center  w-full ">
                            <span>
                                <img src="/Icons/blue-location.svg" alt="location" className=" size-3" />
                            </span>
                            <p className="ml-2">{data?.title}</p>
                        </div>
                    ))}
                </div>
            </div>


            {/* Second column */}
            <div className="w-full flex flex-col mt-0 lg:mt-0 ">
                <p className="xl:text-[22px] text-lg font-normal text-dark-28">Signature Experiences</p>
                <div className="flex flex-wrap mt-2 pb-3 gap-x-2 gap-y-2 font-light overflow-y-auto">
                    {itineraryData?.destination_highlights?.map((data, index) => (
                        <div key={index} className="flex w-full items-center">
                            <span className=" size-1.5 bg-[#026E9E] rounded-full"></span>
                            <p className="ml-2">{data?.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}