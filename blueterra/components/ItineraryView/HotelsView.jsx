"use client"

import HotelsList from "./HotelsList"
import HotelsData from "../datas/Hotels"
import { useState } from "react"
import {playfair} from '@/app/fonts'

export default function HotelsView() {

    const [currentHotel, setCurrentHotel] = useState(0)
    const [hotelsCount, setHotelsCount] = useState(0)


    return (
        <div className="lg:w-full cursor-pointer  text-dark-28   hotels-container md:w-11/12 w-full my-10 md:space-y-6  space-y-4 2xl:px-20 xl:px-10 lg:px-20  md:py-10 py-5 z-10 ">
            <div className=" flex-center flex-col space-y-10">
                <h5 className={`text-5xl font-medium ${playfair.className}`}>Hotel Rooms</h5>
                <p className=" text-center font-light text-2xl w-10/12 xl:w-7/12">Discover a thoughtfully curated range of accommodation options designed
                    to suit every traveler's preferences, comfort level, and lifestyle.</p>
            </div>
            <HotelsList HotelsData={HotelsData} setCurrent={setCurrentHotel} setCount={setHotelsCount} />

            <div className="flex-center space-x-2 overflow-hidden">
                {[...Array(hotelsCount)].map((_, index) => (
                    <span key={index} className={` transform transition-all duration-300 ease-in-out  ${currentHotel === index + 1 ? "w-12 h-2.5  bg-sky-blue-1" : "w-2 h-2 bg-sky-blue-1/30"} rounded-full`} />

                ))}
            </div>
        </div>
    )
}