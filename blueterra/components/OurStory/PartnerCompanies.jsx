
import TitleText from "../generalComponents/TitleText"
import PartnerCompaniesData from "../datas/PartnerCompaniesData"
import Marquee from "react-fast-marquee"
import Image from "next/image"
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";
import ResponsiveClipPath from "../generalComponents/ResponsiveClipPath";
import { useMediaQuery } from "react-responsive";

export default function PartnerCompanies() {

    const partnerCompaniesTitleRef = useGsapFadeIn()

    const partnerCompaniesimageRef = useGsapFadeIn()

  const isMobile = useMediaQuery({ query: "(max-width: 644px)" });



    return (

        <div className=" lg:my-20 my-12  w-full flex-center flex-col   relative ">

            <div ref={partnerCompaniesTitleRef} className="">
                <TitleText text='Trusted Partners' />
            </div>

            <div ref={partnerCompaniesimageRef} className=" 2xl:w-11/12 w-11/12 flex  lg:mt-12 mt-5 md:mt-7  2xl:mt-16 lg:py-3    ">
              <Marquee gradient={isMobile ? false : true} speed={70} >
                    {PartnerCompaniesData?.map((data, index) => (
                        <div key={index} className=" group ">
                            <img
                                src='/images/general/marque-sample.png'
                                alt="pattern"
                                // className="  object-contain grayscale group-hover:grayscale-0 transition duration-500"
                                className="  object-contain h-[80px]  lg:h-[100px] w-[510px] lg:w-[650px]"

                            />
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