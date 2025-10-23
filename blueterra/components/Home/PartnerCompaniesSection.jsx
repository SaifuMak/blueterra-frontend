import React from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image';
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn';


function PartnerCompaniesSection({isMobile}) {

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
            <div className=" 2xl:w-11/12 w-11/12 flex  max-md:pb-5   ">
                {/* <Marquee pauseOnHover> */}
                <Marquee gradient={isMobile ? false : true} speed={70} >

                    {boxData?.map((data, index) => (
                            <div key={index} className=" group lg:mx-10 mx-5 ">
                            <img
                                src='/images/partner-company/marque.png'
                                alt="pattern"
                                // className="  object-contain grayscale group-hover:grayscale-0 transition duration-500"
                                className="  object-contain h-[80px]  lg:h-[100px] w-[510px] lg:w-[680px]"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>

    )
}

export default PartnerCompaniesSection