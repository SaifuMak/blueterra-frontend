'use client'
import Image from "next/image";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


export default function OurStory1() {

    const titleRef = useRef()
    const leftHillRef = useRef()
    const rightHillRef = useRef()
    const travelGirlRef = useRef()


    useGSAP(() => {
        const initialTimeLine = gsap.timeline({
            ease: "power2.inOut",
            delay: 1
        })

        initialTimeLine.fromTo(leftHillRef.current, { x: -400, opacity: 1 }, { x: 0, opacity: 1, duration: 1 }, 0)
        initialTimeLine.fromTo(rightHillRef.current, { x: 400, opacity: 1 }, { x: 0, opacity: 1, duration: 1 }, 0)

        initialTimeLine.fromTo(travelGirlRef.current, { x: -900, opacity: 1 }, { x: 0, opacity: 1, duration: 1.5 })
        initialTimeLine.fromTo(titleRef.current, { y: 300, opacity: 0 }, { y: 0, opacity: 1.5 })

    })

    return (
        <div className="w-full h-full ">
            <div className=" h-screen relative w-full">

                <Image
                    src='/images/our-story/banner.png'
                    alt="world-map"
                    fill
                    className="object-cover "
                    priority
                />

                <div className=" w-full h-full   flex justify-center  absolute inset-0 ">
                    <h1 ref={titleRef} className="opacity-0 max-2xl:mr-0    lg:text-[190px] xl:text-[230px] 2xl:text-[300px] text-nowrap text-white/25 mt-10 font-medium tracking-wider">Our Story</h1>
                </div>

                <div ref={rightHillRef} className="absolute opacity-0  bottom-0 lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[500px]  2xl:w-[700px] 2xl:h-[400px]  right-0">
                    <Image
                        src='/images/our-story/hill.png'
                        alt="mountian"
                        fill
                        className="object-cover "
                        priority
                    />
                </div>

                <div className="absolute  w-full  md:h-[60vh] lg:h-[70vh] 2xl:w-full  xl:h-[74vh] 2xl:h-[90vh] bottom-0  z-10">
                    <Image
                        ref={travelGirlRef}
                        src='/images/our-story/girl-with-bag.png'
                        alt="travel-women"
                        fill
                        className="object-cover scale-x-[-1]   opacity-0 lg:ml-10  xl:ml-12 "
                        priority
                    />
                </div>


                <div ref={leftHillRef} className="absolute lg:w-[600px] opacity-0 lg:h-[400px] 2xl:w-[700px] 2xl:h-[480px] bottom-0 left-0">
                    <Image
                        src='/images/our-story/hill-right.png'
                        alt="mountain"
                        fill
                        className="object-cover scale-x-[-1] "
                        priority
                    />
                </div>

            </div>


        </div>
    )

}