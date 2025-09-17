"use client"

import HotelsList from "./HotelsList"
import HotelsData from "../datas/Hotels"
import { useState, useRef } from "react"
import { playfair } from '@/app/fonts'

import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn"


export default function HotelsView({ data }) {

    const [currentHotel, setCurrentHotel] = useState(0)
    const [hotelsCount, setHotelsCount] = useState(0)
    const hotelGsapRef = useGsapFadeIn(0, { start: "top 95%" })


    
    return (
        <div className="lg:w-full  cursor-pointer  text-dark-28   hotels-container md:w-11/12 w-full my-10 md:space-y-6  space-y-4 2xl:px-20 xl:px-10 lg:px-20  md:py-10 py-5 z-10 ">
            <div ref={hotelGsapRef} className=" flex-center flex-col space-y-3 lg:space-y-10  ">
                <h5 className={` text-3xl md:text-4xl lg:text-5xl font-medium ${playfair.className} `}>Signature Stays</h5>
                <p className=" text-center font-light lg:text-xl 2xl:text-2xl w-10/12 xl:w-7/12 ">Discover a thoughtfully curated range of accommodation options designed
                    to suit every traveler's preferences, comfort level, and lifestyle.</p>
            </div>

            <div className="w-full  h-full max-xl:pt-4 ">
                <HotelsList HotelsData={data} setCurrent={setCurrentHotel} setCount={setHotelsCount} />
            </div>

            <div className="flex-center space-x-2 overflow-hidden">
                {[...Array(data?.length)].map((_, index) => (
                    <span key={index} className={` transform transition-all duration-300 ease-in-out  ${currentHotel === index + 1 ? "w-12 h-2.5  bg-sky-blue-1" : "w-2 h-2 bg-sky-blue-1/30"} rounded-full`} />

                ))}
            </div>
        </div>
    )
}