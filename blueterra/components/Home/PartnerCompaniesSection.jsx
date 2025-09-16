import React from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image';
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn';

function PartnerCompaniesSection() {

    const containerRef = useGsapFadeIn(0, {})

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
        <div className=" w-full flex-center pb-10 mt-10  ">
            <div  ref={containerRef} className=" 2xl:w-10/12 w-full lg:w-11/12 flex lg:px-10   py-3  lg:space-x-20   ">
                <Marquee pauseOnHover>
                    {boxData?.map((data, index) => (
                        <div key={index} className="   group cursor-pointer h-[40px] w-[150px] relative mx-5 lg:mx-10">
                            <Image
                                src='/images/partner-company/logo-1.png'
                                alt="pattern"
                                fill
                                className=" object-cover grayscale group-hover:grayscale-0 transition duration-500"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>

    )
}

export default PartnerCompaniesSection