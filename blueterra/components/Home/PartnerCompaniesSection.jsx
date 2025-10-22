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
        <div className=" w-full flex-center pb-4 lg:pb-10 lg:mt-10  ">
            <div className=" 2xl:w-11/12 w-11/12 flex lg:px-10   py-3  lg:space-x-20  ">
                {/* <Marquee pauseOnHover> */}
                <Marquee gradient={isMobile ? false : true} speed={70} >

                    {boxData?.map((data, index) => (
                        <div key={index} className=" group ">
                            <img
                                src='/images/general/marque-sample.png'
                                alt="pattern"
                                // className="  object-contain grayscale group-hover:grayscale-0 transition duration-500"
                                className="  object-contain  h-[100px] w-[650px] lg:w-[650px]"

                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>

    )
}

export default PartnerCompaniesSection