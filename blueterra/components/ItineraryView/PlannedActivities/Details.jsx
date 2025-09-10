'use client'
import { useState, useEffect, useRef } from "react"
import uaePlaces from "@/components/datas/Places"
import { useHasScrollbar } from "@/app/hooks/useHasScrollbar"


export default function Details({ itineraryData }) {

    const { containerRef, hasScrollbar } = useHasScrollbar([])



    return (
        <div className="w-full xl:px-2 xl:pb-2 h-full max-xl:text-sm  text-dark-28 text-base flex flex-col overflow-y-auto sm:flex-row sm:space-x-3 max-sm:space-y-8">
            {/* First column */}
            <div className="w-full flex flex-col ">
                <p className="xl:text-[22px] text-lg font-normal text-dark-28">Destination Highlights</p>
                <div ref={containerRef} className="flex flex-wrap mt-2 pb-3 gap-x-5 gap-y-2 font-light overflow-y-auto max-sm:h-48 "  {...(hasScrollbar ? { 'data-lenis-prevent': true } : {})}>
                    {itineraryData?.destination_highlights?.map((data, index) => (
                        <div key={index} className="flex   w-full ">
                            <span>
                                <img src="/Icons/blue-location.svg" alt="location" className=" size-3 mt-1.5  shrink-0" />
                            </span>
                            <p className="ml-2">{data?.title}</p>
                        </div>
                    ))}
                </div>
            </div>


            {/* Second column */}
            <div className="w-full flex flex-col mt-0 lg:mt-0 ">
                <p className="xl:text-[22px] text-lg font-normal text-dark-28">Signature Experiences</p>
                <div ref={containerRef} className="flex flex-wrap mt-2 pb-3 gap-x-2 gap-y-2 font-light overflow-y-auto max-sm:h-48 "  {...(hasScrollbar ? { 'data-lenis-prevent': true } : {})}>
                    {itineraryData?.destination_highlights?.map((data, index) => (
                        <div key={index} className="flex w-full">
                            <span className=" size-1.5 bg-[#026E9E] rounded-full mt-2  shrink-0"></span>
                            <p className="ml-2">{data?.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}