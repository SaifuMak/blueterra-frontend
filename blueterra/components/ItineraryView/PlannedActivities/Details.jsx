'use client'
import { useState, useEffect, useRef } from "react"
import uaePlaces from "@/components/datas/Places"
import { useHasScrollbar } from "@/app/hooks/useHasScrollbar"
import { playfair, rubik } from "@/app/fonts"


export default function Details({ selectedTab, itineraryData }) {

    const { containerRef, hasScrollbar } = useHasScrollbar([])
    const [visible, setVisible] = useState(selectedTab !== 'Daily Schedule')

    useEffect(() => {
        // delay the toggle by 500ms
        const timeout = setTimeout(() => {
            setVisible(selectedTab !== 'Daily Schedule')
        }, 500)

        return () => clearTimeout(timeout)
    }, [selectedTab])



    return (
        <div className="w-full xl:px-2 xl:pb-2 h-full max-xl:text-sm  text-dark-28 text-base flex flex-col overflow-y-auto sm:flex-row sm:space-x-3 max-sm:space-y-8 " style={{ display: visible ? 'visible' : 'flex' }} >
            {/* First column */}
            <div className="w-full flex flex-col ">
                <p className={`xl:text-[22px] text-lg font-normal text-dark-28 ${playfair.className}`}>Destination Highlights</p>
                <div ref={containerRef} className="flex flex-wrap mt-4 lg:mt-2 pb-3 gap-x-5 gap-y-2 font-light lg:overflow-y-auto  "  {...(hasScrollbar ? { 'data-lenis-prevent': true } : {})}>
                    {itineraryData?.destination_highlights?.map((data, index) => (
                        <div key={index} className="flex   w-full ">
                            <span>
                                <img src="/Icons/blue-location.svg" alt="location" className=" size-3 lg:mt-1.5 mt-1  shrink-0" />
                            </span>
                            <p className="ml-2">{data?.title}</p>
                        </div>
                    ))}
                </div>
            </div>


            {/* Second column */}
            <div className="w-full flex flex-col mt-0 lg:mt-0 ">
                <p className={`xl:text-[22px] text-lg font-normal text-dark-28 ${playfair.className}`}>Signature Experiences</p>
                <div ref={containerRef} className="flex flex-wrap mt-4 lg:mt-2 pb-3 gap-x-2 gap-y-2 font-light lg:overflow-y-auto  "  {...(hasScrollbar ? { 'data-lenis-prevent': true } : {})}>
                    {itineraryData?.signature_highlights?.map((data, index) => (
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