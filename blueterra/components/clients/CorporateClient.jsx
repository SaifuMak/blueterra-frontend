'use client'
import Image from "next/image"
import { playfair, rubik } from "@/app/fonts"
import Button from "@/components/generalComponents/Button"
import Navbar from "@/components/Navbar/page"
import SmoothScroll from "@/components/SmoothScroll"
import Footer from "@/components/Footer/page"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyChooseUsSection from "@/components/Mice/WhyChooseUsSection"
import InfoCards from "@/components/Mice/InfoCards"
import CorporateEventsSection from "@/components/Mice/CorporateEventsSection"
import WelcomeNoteSection from "@/components/Mice/WelcomeNoteSection"
import PlanningSection from "@/components/Mice/PlanningSection"
import PrivateEvents from "@/components/Mice/PrivateEvents"
import ContactSection from "@/components/Mice/ContactSection"


gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function CorporateClient() {

    const containerRef = useRef()
    const bannerRef = useRef()

    const contactSectionRef = useRef()


    const events = [
        {
            "title": "MICE Programs",
            "description": "Comprehensive planning and management of meetings, incentives, conferences and exhibitions across global destinations, ensuring seamless operations, tailored experiences, and professional delivery for every business event",
            "img": '/images/corporate/corporate-events/programs.jpg'
        },
        {
            "title": "Leadership Retreats and Offsites",
            "description": "Exclusive retreats and offsite programs designed to strengthen leadership alignment, encourage strategic thinking, and provide space for innovation in inspiring and distraction-free settings",
            "img": '/images/corporate/corporate-events/leadership.jpg'
        },
        {
            "title": "Global Conferences and Summits",
            "description": "Large-scale conferences and international summits delivered with precision, engaging formats, and impactful content that connect audiences and elevate organizational presence on a global stage",
            "img": '/images/corporate/corporate-events/global-conference.jpg'
        },
        {
            "title": "Incentive Travel",
            "description": " Reward teams and top performers with unforgettable travel experiences, including luxury getaways, cultural programs, and motivational journeys that build loyalty and boost performance",
            "img": '/images/corporate/corporate-events/incentive-travel.jpg'
        },
        {
            "title": "Executive Leisure Travel",
            "description": "Tailored journeys that combine business and leisure, allowing executives and teams to balance productivity with relaxation while strengthening relationships in premium destinations",
            "img": '/images/corporate/corporate-events/executive-travel.jpg'
        },
        {
            "title": "Corporate Engagement Programs",
            "description": "Creative programs that bring colleagues together, strengthen collaboration, and boost morale through immersive travel experiences designed to connect teams beyond the workplace",
            "img": '/images/corporate/corporate-events/corporate-prog.jpg'
        }
    ]


    const PRIVATE_EVENTS = [
        {
            "title": "Milestone Celebrations",
            "description": "Seamless planning and thoughtful details for life’s big moments, creating elegant and memorable experiences",
            "img": '/images/corporate/private-events/milestone.jpg'
        },
        {
            "title": "Intimate Gatherings and Parties",
            "description": "Private occasions delivered with care and smooth execution, designed to feel exclusive and personal",
            "img": '/images/corporate/private-events/gathering.jpg'
        },
        {
            "title": "Family & Social Events",
            "description": "Well-planned gatherings that bring generations together, creating meaningful connections and memories to last",
            "img": '/images/corporate/private-events/fam-social-events.jpg'
        },
    ]




    useGSAP(() => {
        const elements = gsap.utils.toArray(".vertically-animated-element");

        elements.forEach((box) => {
            gsap.fromTo(
                box,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "top 88%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, { scope: containerRef });


    useGSAP(() => {

        gsap.fromTo(
            '.banner-elements',
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 1,

            }
        );

    }, { scope: bannerRef });


    useGSAP(() => {

        gsap.fromTo(
            bannerRef.current,
            { scale: 1 },
            {
                scale: 1.15,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: bannerRef.current,
                    start: "bottom 100%",
                    end: "bottom 10%",
                    scrub: 1,

                },

            }
        );

    }, { scope: bannerRef });


    // navigate to contact section
    const handleNavigateToContactForm = () => {
        contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <>
            <SmoothScroll>
                <Navbar />
                <div ref={containerRef} className={`  ${rubik.className} w-full overflow-hidden h-full flex flex-col items-center justify-center`}  >

                    <div ref={bannerRef} className=" w-full  h-[100vh] relative">
                        <Image
                            src='/images/corporate/banner.jpg'
                            alt='quote'
                            fill
                            priority
                            className=" object-cover "
                        />

                        <div className=" w-full opacity-0 bg-black/30  banner-elements absolute inset-0 text-white  h-full  flex flex-col justify-center items-center">
                            <h1 className={` ${playfair.className}   font-medium text-2xl text-center md:text-[65px] xl:text-[75px] 2xl:text-[80px]`}>MICE and Signature Events</h1>
                            <Button text='GET IN TOUCH' buttonStyle={` transition-all duration-500 mb-10 mt-5 ease-in-out font-medium max-md:text-sm  px-4 lg:px-6 xl:px-12 py-1.5 xl:py-2.5 `} onClickFunction={handleNavigateToContactForm} />
                        </div>
                    </div>

                    <WelcomeNoteSection />

                    <CorporateEventsSection />

                    <div className=" w-full h-full pb-10  xl:pb-20 2xl:pb-32 md:mt-5 relative flex justify-center  ">
                        <div className="w-11/12 xl:w-10/12 max-sm:px-4  z-20 text-dark-28 h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-5 xl:gap-6 2xl:gap-10">
                            {events?.map((data, index) => (
                                <InfoCards key={index} data={data} />
                            ))}
                        </div>
                    </div>

                    <PlanningSection handleNavigateToContactForm={handleNavigateToContactForm} />

                    <PrivateEvents PRIVATE_EVENTS={PRIVATE_EVENTS} />

                    <WhyChooseUsSection />

                    <ContactSection ref={contactSectionRef} />

                </div>

                <Footer />

            </SmoothScroll>
        </>
    )
}