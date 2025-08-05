import Image from "next/image"
import TitleText from "../generalComponents/TitleText"
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { useRef } from "react";
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";
import EmployDetails from "./CompanyTeam/EmployDetails";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useGsapStaggerDesktop from "@/app/hooks/Gsap/useGsapStaggerDesktop";

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function TeamSection() {

    const isMobile = useIsMobile()

    const imageContainerRef = useRef(null)

    useGsapStaggerDesktop({
        scopeRef: imageContainerRef,
        selector: '.employee-card'
    });

    const founderTextRef = useGsapFadeIn()
    const founderTextMobileRef = useGsapFadeIn()

    const founderDescriptionRef = useGsapFadeIn(0, { start: "top 60%" })

    const TeamTitleRef = useGsapFadeIn()
    const TeamImageRef = useGsapFadeIn()


    const Employees = [
        {
            name: 'Nick Thomas',
            role: 'Role or Position',
            image: '/images/company/demo-employ.png',
        },
        {
            name: 'James',
            role: 'Role or Position',
            image: '/images/company/demo-employ.png',
        },
        {
            name: 'Emilia',
            role: 'Role or Position',
            image: '/images/company/demo-employ.png',
        },
        {
            name: 'William Lucas',
            role: 'Role or Position',
            image: '/images/company/demo-employ.png',
        },
    ]



    return (
        <div className="w-full flex-center flex-col  bg-cover bg-center bg-no-repeat  relative" style={{ backgroundImage: "url('/images/our-story/hills.png')" }}>

            {/* white overlay */}
            <div className=" absolute inset-0 bg-white/95 w-full h-full z-0" />


            {/* founder details */}
            <div className=" w-11/12 xl:w-10/12 items-center  2xl:my-32 xl:my-16 md:my-12 my-10 space-x-6 z-30  md:flex    "  >

                <div ref={founderTextMobileRef} className={` ${isMobile ? 'opacity-100' : 'opacity-0 hidden'}  w-full text-center mb-5`}>
                    <TitleText text='Meet the Founder' />
                </div>


                <div ref={founderTextRef} className=" flex  max-sm:flex-col max-sm:items-center  md:items-end w-full md:w-7/12 shrink-0    ">
                    <Image
                        src='/images/company/ceo.png'
                        alt='founder & ceo'
                        width={isMobile ? 380 : 300}
                        height={100}
                        priority
                    />

                    {!isMobile && <div className="2xl:-mx-6 xl:-mx-5 lg:-mx-5 md:-mx-4 -mx-2 mb-5 md:mb-10">
                        <Image
                            src="/images/our-story/connection-pipe.png"
                            alt="connection pipe"
                            width={isMobile ? 80 : 120}
                            height={10}
                            priority

                        />
                    </div>}

                    <div className=" flex flex-col   md:space-y-10 ">
                        {!isMobile &&
                            <div className="">
                                <TitleText text='Meet the Founder' />
                            </div>
                        }

                        {/* <h2 className={`${playfair.className} text-nowrap text-[50px] px-6`} >Meet the Founder</h2> */}
                        <div className=" md:bg-[#EEEFE0] flex-center text-dark-28  md:py-6 xl:py-8  max-lg:px-4 max-sm:mt-4 xl:px-10 rounded-2xl flex-col">
                            <p className=" text-xl md:text-2xl 2xl:text-3xl font-medium">Jerald Jacob</p>
                            <p className=" text-lg md:text-lg 2xl:text-xl text-nowrap">Founder, BlueTerra</p>
                        </div>

                    </div>
                </div>


                <div ref={founderDescriptionRef} className=" md:w-5/12 max-sm:mt-7  max-sm:px-3 text-dark-28 lg:text-lg 2xl:text-xl max-sm:text-center space-y-4 2xl:space-y-6 font-light leading-7 lg:leading-8 xl:leading-9 2xl:leading-10 flex flex-col justify-center">
                    <p className="">With over 15 years of life and work in the UAE, Jerald Jacob has developed a deep connection
                        to the region’s landscapes, cultures, and stories. His love for travel began with a simple curiosity
                        — a desire to understand the world beyond the guidebooks.
                        That curiosity grew into a calling: to create travel experiences that are purposeful,
                        personal, and rooted in authenticity.</p>
                    <p className="">Driven by a vision to make travel more meaningful, Jerald founded BlueTerra
                        — blending his regional insight with a passion for curated,
                        sustainable journeys that inspire and connect.</p>
                </div>
            </div>

            {/* section showing the employees data */}
            <div className="xl:w-10/12 px-6 py-3 md:py-10 xl:py-16 z-30 ">
                {/* Heading */}
                <div ref={TeamTitleRef} className="text-center mb-16 ">
                    <TitleText text='Meet the Team' />
                </div>

                {isMobile ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 w-full mx-auto">

                        {Employees.map((member, index) => (
                            <EmployDetails key={index} member={member} index={index} isMobile={isMobile} />
                        ))}
                    </div>
                ) : (

                    <div ref={imageContainerRef} className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-4 gap-8 w-full mx-auto">

                        {Employees.map((member, index) => (
                            <div
                                key={index}

                                className="employee-card  flex flex-col rounded-2xl items-center w-full text-center   transition"
                            >
                                <div className=" overflow-hidden rounded-2xl ">

                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={380}
                                        height={100}
                                        priority
                                        className=' rounded-2xl hover:scale-110  delay-100  transition-all duration-1000 ease-in-out'
                                    />
                                </div>

                                <h3 className="2xl:text-2xl text-xl text-dark-28 mt-4 font-medium">{member.name}</h3>
                                <p className=" text-dark-28 text-lg 2xl:text-xl 2xl:mt-1">{member.role}</p>
                            </div>

                        ))}
                    </div>
                )}

            </div>

        </div>
    )
}