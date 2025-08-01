
import TitleText from "../generalComponents/TitleText"
import PartnerCompaniesData from "../datas/PartnerCompaniesData"
import Marquee from "react-fast-marquee"
import Image from "next/image"
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";


export default function PartnerCompanies() {

    const partnerCompaniesTitleRef = useGsapFadeIn()

    const partnerCompaniesimageRef = useGsapFadeIn()
    
    return (

        <div className=" mb-28 w-full flex-center flex-col  bg-white relative ">

            <div ref={partnerCompaniesTitleRef} className="">
                <TitleText text='Trusted Brands' />
            </div>

            <div ref={partnerCompaniesimageRef} className=" 2xl:w-10/12 w-full lg:w-11/12 flex lg:px-10 lg:mt-12 mt-5 md:mt-7  2xl:mt-16 py-3   lg:space-x-20   ">
                <Marquee pauseOnHover>
                    {PartnerCompaniesData?.map((data, index) => (
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