import { useState } from "react"
import TitleText from "../generalComponents/TitleText"
import Button from "../generalComponents/Button"
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn"

export default function PlanWithblueterra({setFormOpen}) {

    const titleRef = useGsapFadeIn()
    const descriptionRef = useGsapFadeIn()
    const buttonRef = useGsapFadeIn()

    return (
        <div className="  relative min-h-[45vh] 2xl:min-h-[50vh]">
            <div
                className=" absolute inset-0   bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/images/our-story/yellow-banner.png')" }}
            />
            <div className=" absolute flex-center  2xl:py-6 space-y-5 flex-col inset-0  w-full h-full text-center ">
                <div ref={titleRef} className="">
                    <TitleText text='Let’s Begin Your Journey' />
                </div>
                <p ref={descriptionRef} className=" text-lg xl:text-[22px] 2xl:text-2xl font-light max-w-2xl    max-lg:px-4  text-dark-28 xl:leading-10 ">Share your travel dreams with us—we’ll turn them into unforgettable experiences.</p>
                <div ref={buttonRef} className="">
                    <Button text='PlAN WITH BLUETERRA' buttonStyle={`px-6 2xl:mt-4 max-xl:text-sm tracking-wider py-2.5`} isHoverWhiteApplied={false} onClickFunction={()=>setFormOpen(true)} />
                </div>
            </div>
        </div>
    )
}