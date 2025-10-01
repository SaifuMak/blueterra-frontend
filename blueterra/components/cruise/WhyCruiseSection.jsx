import TitleText from "../generalComponents/TitleText"
import { useIsMobile } from '@/app/hooks/useIsMobile';
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";
import { useRef, useState } from 'react';
import useGsapStaggerDesktop from "@/app/hooks/Gsap/useGsapStaggerDesktop";
import useGsapOpacity from "@/app/hooks/Gsap/useGsapOpacity";
import WhyTravelWithUsCard from "../OurStory/WhyTravelWithUsCard";
import WhyCruiseData from "../datas/WhyCruiseData";
import WhyCruiseDataCard from "./WhyCruiseDataCard";

export default function WhyCruiseSection() {

    const titleRef = useGsapFadeIn()
    const descriptionRef = useGsapFadeIn()

    const textContainer = useGsapFadeIn()


    return (
        <div className=" w-full h-full px-3 md:px-10 pb-12 lg:pb-24   flex-center bg-white  overflow-hidden  relative" >
            <div className=" w-full rounded-4xl flex-center  md:py-16 py-10 xl:py-28 relative  overflow-hidden bg-cover bg-center bg-no-repeat  border " style={{
                backgroundImage: "url('/images/our-story/why-travel.jpg')",
            }}>
                <div className="absolute inset-0 rounded-4xl bg-[#0E518199]" />

                <div className=" flex flex-col overflow-hidden space-y-12 w-11/12 lg:w-10/12 xl:w-10/12 relative  ">
                    <div ref={textContainer} className=" flex flex-col space-y-5 text-white max-sm:text-center ">
                        <div  className="">
                            <TitleText text='Why Blueterra Cruises?' className='text-white' />
                        </div>
                        <p className=" max-sm:px-2 md:text-xl 2xl:text-2xl font-light md:max-w-2xl">Your perfect blend of relaxation, adventure, and discovery at sea.</p>
                    </div>


                    <div className="grid grid-cols-1   lg:grid-cols-3 gap-6 2xl:gap-10  mx-auto">
                        {WhyCruiseData?.map((card, index) => (
                            <WhyCruiseDataCard key={index} card={card} index={index} />
                        ))}
                    </div>

                </div>

            </div>
        </div >

    )
}