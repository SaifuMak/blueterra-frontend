import TitleText from "../generalComponents/TitleText"
import { useIsMobile } from '@/app/hooks/useIsMobile';
import WhyTravelWithUs from "../datas/WhyTravelWithUs";
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";
import WhyTravelWithUsCard from "./WhyTravelWithUsCard";
import { useRef, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useGsapStaggerDesktop from "@/app/hooks/Gsap/useGsapStaggerDesktop";
import useGsapOpacity from "@/app/hooks/Gsap/useGsapOpacity";

export default function WhyTravelWithUsSection() {
    const isMobile = useIsMobile()

    const containerRef = useRef(null);
    const gridContainerRef = useRef(null)


    useGsapStaggerDesktop({
        scopeRef: gridContainerRef,
        selector: '.grid-card'
    });

    const backgroundImageContainer = useGsapOpacity()
    const titleRef = useGsapFadeIn()
    const descriptionRef = useGsapFadeIn()


    return (
        <div className=" w-full h-full px-3 md:px-10  flex-center bg-white overflow-hidden  relative" >
            <div ref={backgroundImageContainer} className=" w-full rounded-4xl flex-center my-12 md:my-20 md:py-16 py-10 xl:py-28 relative  overflow-hidden bg-cover bg-center bg-no-repeat  border " style={{
                backgroundImage: "url('/images/our-story/why-travel.jpg')",
            }}>
                <div className="absolute inset-0 rounded-4xl bg-[#0E518199]" />


                <div className=" flex flex-col space-y-12 w-11/12 lg:w-10/12 xl:w-10/12 relative  ">
                    <div className=" flex flex-col space-y-5 text-white max-sm:text-center ">
                        <div ref={titleRef} className="">
                            <TitleText text='Why Travel with Us' className='text-white' />
                        </div>
                        <p ref={descriptionRef} className=" max-sm:px-2 md:text-xl 2xl:text-2xl font-light md:max-w-2xl">With BlueTerra, every journey becomes a personal tale, heartfelt and timeless, woven into memories you will carry far ahead.</p>
                    </div>


                    {isMobile ? (
                        <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 gap-6 2xl:gap-10  mx-auto">
                            {WhyTravelWithUs?.map((card, index) => (
                                <WhyTravelWithUsCard key={index} card={card} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div ref={gridContainerRef} className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 gap-6 2xl:gap-10  mx-auto">
                            {WhyTravelWithUs?.map((card, index) => (
                                <div
                                    key={index}
                                    className="bg-[#F4FBFFE5]/75 grid-card hover:scale-95 hover:bg-[#F4FBFFE5] cursor-default transition-all duration-700 
                                    ease-in-out grid-card z-50 travel-card 
                                     text-dark-28 font-light lg:p-6 p-5 xl:p-7  2xl:p-10  space-y-2 xl:space-y-3 rounded-2xl shadow-md hover:shadow-lg "
                                >
                                    <img src={card.icon} alt="" className=" size-9 object-cover" />
                                    <h3 className="2xl:text-[22px] text-lg lg:text-xl font-medium ">{card.title}</h3>
                                    <p className=" xl:pr-3 2xl:pr-10   xl:text-lg 2xl:text-xl  md:leading-7 lg:leading-8 2xl:leading-9  ">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </div>
        </div >

    )
}