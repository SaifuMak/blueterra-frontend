
import TitleText from "../generalComponents/TitleText"
import PartnerCompaniesData from "../datas/PartnerCompaniesData"
import Marquee from "react-fast-marquee"
import Image from "next/image"
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";
import ResponsiveClipPath from "../generalComponents/ResponsiveClipPath";
import { useMediaQuery } from "react-responsive";
import { playfair } from "@/app/fonts";

export default function PartnerCompanies() {

    const partnerCompaniesTitleRef = useGsapFadeIn()

    const partnerCompaniesimageRef = useGsapFadeIn()

    const isMobile = useMediaQuery({ query: "(max-width: 644px)" });


    return (

        <div className=" lg:my-16 my-8  w-full flex-center flex-col   relative ">

            {/* <div ref={partnerCompaniesTitleRef} className="">
                <TitleText text='Trusted Partners' />
            </div> */}

            <div ref={partnerCompaniesimageRef} className=" 2xl:w-11/12 w-11/12 flex">
                {/* <Marquee gradient={isMobile ? false : true} speed={70} >
                    {PartnerCompaniesData?.map((data, index) => (
                        <div key={index} className=" group lg:mx-10 mx-5 ">
                            <img
                                src='/images/partner-company/marque.png'
                                alt="pattern"
                                // className="  object-contain grayscale group-hover:grayscale-0 transition duration-500"
                                className="  object-contain h-[80px] lg:h-[100px] w-[530px] lg:w-[900px]"
                            />
                        </div>
                    ))}
                </Marquee> */}

                 <Marquee  gradient={isMobile ? false : true} speed={70} className="overflow-y-hidden" >

                       {PartnerCompaniesData?.map((data, index) => (
                        <div key={index} className="    ">
                            {/* <img
                                src='/images/partner-company/marque.png'
                                alt="pattern"
                                // className="  object-contain grayscale group-hover:grayscale-0 transition duration-500"
                                className="  object-contain h-[80px]   lg:h-[100px] w-[530px] lg:w-[900px]"

                            /> */}
                            <div className=" flex  items-center text-[#0e5181]  ">
                                <p className={`${playfair.className} leading-none   font-light text-xl lg:text-3xl`}><span className=" font-bold">TRUE</span> JOURNEYS-<span className="font-bold">REAL </span>EXPERIENCES-CRAFTED WITH <span className="font-bold">LOCALS</span>  </p>
                            <span className=" text-lg lg:text-2xl mx-3 lg:mx-6">|</span>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>

            <ResponsiveClipPath
                outerClass='absolute md:w-[24%] w-[78%] z-0  -bottom-32  right-0 h-fit'
                ImagePath='/images/our-story/patterns/pattern-bottom.png'
                width={800}
            />
        </div>
    )
}