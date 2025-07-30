import TitleText from "../generalComponents/TitleText"
import { useIsMobile } from '@/app/hooks/useIsMobile';
import WhyTravelWithUs from "../datas/WhyTravelWithUs";
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";
import WhyTravelWithUsCard from "./WhyTravelWithUsCard";
import { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


export default function WhyTravelWithUsSection() {
    const isMobile = useIsMobile()

    const containerRef = useRef(null);

    const titleRef = useGsapFadeIn()
    const descriptionRef = useGsapFadeIn()

  
    return (
        <div className=" w-full h-full px-3 md:px-10  flex-center bg-white overflow-hidden  relative" >
            <div className=" w-full rounded-4xl flex-center my-12 md:my-20 md:py-16 py-10 xl:py-28 relative  overflow-hidden bg-cover bg-center bg-no-repeat  border " style={{
                backgroundImage: "url('/images/our-story/mountain.png')",
            }}>
                <div className="absolute inset-0 rounded-4xl bg-[#0E518199]" />


                <div className=" flex flex-col space-y-12 w-11/12 lg:w-10/12 xl:w-10/12 relative  ">
                    <div className=" flex flex-col space-y-5 text-white max-sm:text-center ">
                        <div ref={titleRef} className="">
                            <TitleText text='Why Travel with Us' className='text-white' />
                        </div>
                        <p ref={descriptionRef} className=" max-sm:px-2 md:text-xl 2xl:text-2xl font-light md:max-w-2xl">Discover the difference with personalized service, expert planning, and unforgettable experiences.</p>
                    </div>


                    <div  className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 gap-6 2xl:gap-10  mx-auto">

                        {WhyTravelWithUs?.map((card, index) => (
                                <WhyTravelWithUsCard key={index} card={card} index={index} />

                            // isMobile ? (
                            //     <WhyTravelWithUsCard key={index} card={card} index={index} />
                            // ) : (
                            //     <div key={index} className="travel-card w-fit h-fit  " >
                            //         <WhyTravelWithUsCard card={card} />
                            //     </div>
                            // )

                        ))}
                    </div>
                </div>

            </div>
        </div >

    )
}