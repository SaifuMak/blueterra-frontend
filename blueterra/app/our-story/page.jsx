'use client'
import Image from "next/image";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


export default function OurStory() {

    const titleRef = useRef()
    const leftHillRef = useRef()
    const rightHillRef = useRef()
    const travelGirlRef = useRef()





    useGSAP(() => {
        const initialTimeLine = gsap.timeline({
            ease: "power2.inOut",
            delay : 1
        })

        initialTimeLine.fromTo(leftHillRef.current, { x: -400, opacity: 1 }, { x: 0, opacity: 1, duration:1 },0)
        initialTimeLine.fromTo(rightHillRef.current, { x: 400, opacity: 1 }, { x: 0, opacity: 1, duration:1 },0)

        initialTimeLine.fromTo(travelGirlRef.current, { y: 900, opacity: 1 }, { y: 0, opacity: 1, duration:1})
        initialTimeLine.fromTo(titleRef.current, { y: 300, opacity: 0 }, { y: 0, opacity: 1 })


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

                <div className=" w-full h-full border  flex justify-center  absolute inset-0 ">
                    <h1 ref={titleRef} className=" opacity-0 text-[300px] text-white/25 mt-10 font-medium tracking-wider">Our Story</h1>
                </div>

                <div ref={rightHillRef} className="absolute bottom-0   right-0">
                    <Image
                        src='/images/our-story/hill.png'
                        alt="mountian"
                        width={700}
                        height={400}
                        className="object-cover "
                        priority
                    />
                </div>

                <div ref={travelGirlRef} className="absolute  opacity-0 w-full h-[90vh] bottom-0 left-65 z-10">
                    <Image
                        src='/images/our-story/girl-with-bag.png'
                        alt="travel-women"
                        fill
                        className="object-cover scale-x-[-1]    "
                        priority
                    />
                </div>


                <div ref={leftHillRef} className="absolute bottom-0 left-0">
                    <Image
                        src='/images/our-story/hill-right.png'
                        alt="mountain"
                        width={700}
                        height={400}
                        className="object-cover scale-x-[-1] "
                        priority
                    />
                </div>

            </div>


        </div>
    )

}