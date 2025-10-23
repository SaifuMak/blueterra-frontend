import React from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image';
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn';
import { playfair } from '@/app/fonts';

function PartnerCompaniesSection({ isMobile }) {

    // const containerRef = useGsapFadeIn(0, {})

    const boxData = [
        { id: 1, title: 'Box 1', color: 'bg-red-400' },
        { id: 2, title: 'Box 2', color: 'bg-green-400' },
        { id: 3, title: 'Box 3', color: 'bg-blue-400' },
        { id: 4, title: 'Box 4', color: 'bg-yellow-400' },
        { id: 5, title: 'Box 5', color: 'bg-purple-400' },
        { id: 6, title: 'Box 1', color: 'bg-red-400' },
        { id: 7, title: 'Box 2', color: 'bg-green-400' },
        { id: 8, title: 'Box 3', color: 'bg-blue-400' },
        { id: 9, title: 'Box 4', color: 'bg-yellow-400' },
        { id: 10, title: 'Box 5', color: 'bg-purple-400' },
    ];


    return (
        <div className=" w-full flex-center  ">
            <div className=" 2xl:w-11/12 w-11/12 flex  max-md:pb-5     ">
                {/* <Marquee pauseOnHover> */}
                <Marquee  gradient={isMobile ? false : true} speed={70} className="overflow-y-hidden" >

                    {boxData?.map((data, index) => (
                        <div key={index} className="    ">
                            {/* <img
                                src='/images/partner-company/marque.png'
                                alt="pattern"
                                // className="  object-contain grayscale group-hover:grayscale-0 transition duration-500"
                                className="  object-contain h-[80px]   lg:h-[100px] w-[530px] lg:w-[900px]"

                            /> */}
                            <div className=" flex  items-center text-[#0e5181]  ">
                                <p className={`${playfair.className} leading-none   font-light text-xl lg:text-3xl`}><span className=" font-bold">TRUE</span> JOURNEYS-<span className="font-bold">REAL </span>EXPERIENCES-CRAFTED WITH <span className="font-bold">LOCALS</span>  </p>
                            <span className=" text-lg lg:text-3xl mx-3 lg:mx-6">|</span>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>

    )
}

export default PartnerCompaniesSection