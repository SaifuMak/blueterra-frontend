'use client'
import React from 'react'
import { playfair, rubik } from "@/app/fonts"
import { useState } from 'react'
import CruiseCarousal from './CruiseCarousal'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'

function CruiseLineSection() {

    const [currentCollection, setCurrent] = useState(0)
    const [CollectionCount, setCount] = useState(0)
    const textContainer = useGsapFadeIn()


    const logos = [
        ["/images/cruise/dummy/l1.png", "/images/cruise/dummy/l2.png"],
        ["/images/cruise/dummy/l3.png", "/images/cruise/dummy/l4.png"],
        ["/images/cruise/dummy/l2.png", "/images/cruise/dummy/l1.png"],
        ["/images/cruise/dummy/l4.png", "/images/cruise/dummy/l1.png"],
        ["/images/cruise/dummy/l1.png", "/images/cruise/dummy/l2.png"],
        ["/images/cruise/dummy/l3.png", "/images/cruise/dummy/l4.png"],
        ["/images/cruise/dummy/l2.png", "/images/cruise/dummy/l1.png"],
        ["/images/cruise/dummy/l4.png", "/images/cruise/dummy/l1.png"],
        ["/images/cruise/dummy/l1.png", "/images/cruise/dummy/l2.png"],
        ["/images/cruise/dummy/l3.png", "/images/cruise/dummy/l4.png"],
        ["/images/cruise/dummy/l2.png", "/images/cruise/dummy/l1.png"],
        ["/images/cruise/dummy/l4.png", "/images/cruise/dummy/l1.png"],
    ]


    return (
        <div className=" lg:my-12 my-7 xl:my-24 ">
            <div ref={textContainer} className="  mx-auto overflow-hidden flex-col-center space-y-4 md:space-y-6 ">
                <h3 className={`${playfair.className}  text-dark-4B heading-text`} >Shop by Cruise Line</h3>
                <p className={`2xl:text-2xl xl:text-xl lg:text-xl max-sm:px-5 font-light ${rubik.className} text-dark-28 w-full md:w-8/12  xl:w-6/12 text-center`}>
                    Compare and choose from leading cruise lines to match your style of travel, from luxury escapes to family-friendly adventures.
                </p>
            </div>
            <div className=" w-full lg:border border-black/5 mt-12 lg:mt-16 mb-10 ">
                <CruiseCarousal logos={logos} setCurrent={setCurrent} setCount={setCount} />
            </div>
            <div className=" flex-center pt-0 lg:pt-8 w-full h-full">
                {logos?.map((_, index) => (
                    <span key={index} className={` h-2 rounded-full translate-all duration-500 ease-in-out  mx-1 ${currentCollection === index + 1 ? '  bg-sky-blue-1 w-10' : 'bg-sky-blue-1/30 w-2'}`}  ></span>
                ))}
            </div>
        </div>
    )
}

export default CruiseLineSection