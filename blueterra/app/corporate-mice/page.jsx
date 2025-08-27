'use client'
import Image from "next/image"
import { playfair, rubik } from "@/app/fonts"
import Button from "@/components/generalComponents/Button"
import Navbar from "@/components/Navbar/page"
import ResponsiveClipPath from "@/components/generalComponents/ResponsiveClipPath"
import Events from "@/components/Journey/Events"
import SmoothScroll from "@/components/SmoothScroll"
import Footer from "@/components/Footer/page"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef, useState, useEffect } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ZohoFormModal from "@/components/Forms/ZohoFormModal"
import WhyChooseUsSection from "@/components/Mice/WhyChooseUsSection"
import InfoCards from "@/components/Mice/InfoCards"
import CorporateEventsSection from "@/components/Mice/CorporateEventsSection"
import useGsapFadeIn from "../hooks/Gsap/useGsapFadeIn"
import WelcomeNoteSection from "@/components/Mice/WelcomeNoteSection"
import PlanningSection from "@/components/Mice/PlanningSection"
import PrivateEvents from "@/components/Mice/PrivateEvents"
import ContactSection from "@/components/Mice/ContactSection"


gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Corporate() {

    const [isClient, setIsClient] = useState(false);
    const containerRef = useRef()
    const bannerRef = useRef()

    const contactSectionRef = useRef()

    const [formOpen, setFormOpen] = useState(false);


    const aboutTitle = useGsapFadeIn()

    useEffect(() => {
        setIsClient(true);
    }, []);



    const events = [
        {
            "title": "MICE (Meetings, Incentives, Conferences and Exhibitions)",
            "description": "End to end planning and delivery for business events across global destinations — tailored, efficient, and flawlessly managed."
        },
        {
            "title": "Leadership Retreats & Offsites",
            "description": "Curated environments for strategic thinking, executive alignment, and team renewal."
        },
        {
            "title": "Global Conferences & Summits",
            "description": "Scalable, high-impact events designed to engage audiences and elevate your brand."
        },
        {
            "title": "Incentive Travel",
            "description": "Memorable experiences that reward performance - from luxury getaways to cultural immersions."
        },
        {
            "title": "Product Launches & Activations",
            "description": "Bold, brand-forward moments that drive buzz, visibility and impact."
        },
        {
            "title": "Trade Shows & Exhibitions",
            "description": "Bespoke setups that showcase your brand with clarity and competitive edge."
        }
    ]

    const PRIVATE_EVENTS = [
        {
            "title": "Milestone Celebrations",
            "description": "Anniversaries, birthdays, and life’s landmark moments — crafted with style and soul."
        },
        {
            "title": "Intimate Gatherings & Luxury Parties",
            "description": "Exclusive experiences, flawless execution, and the highest level of privacy and care."
        },
        {
            "title": "Family & Social Events",
            "description": "Thoughtfully designed to connect generations and create lifelong memories."
        },
    ]


  

    // if (!isClient) {
    //     return null; // or a loading placeholder
    // }


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

                    <div ref={bannerRef} className=" w-full h-[30vh] md:h-[100vh] relative">
                        <Image
                            src='/images/corporate/banner.png'
                            alt='quote'
                            fill
                            priority
                            style={{ objectFit: 'cover' }}
                        />

                        <div className=" w-full opacity-0  banner-elements absolute inset-0 text-white  h-full  flex flex-col justify-center items-center">
                            <h1 className={` ${playfair.className}   font-medium text-2xl text-center md:text-[65px] xl:text-[75px] 2xl:text-[80px]`}>MICE & Signature Events</h1>
                            <Button text='GET IN TOUCH' buttonStyle={` transition-all duration-500 mb-10 mt-5 ease-in-out font-medium max-md:text-sm  px-4 lg:px-6 xl:px-12 py-1.5 xl:py-2.5 `} onClickFunction={handleNavigateToContactForm} />
                        </div>
                    </div>

                   <WelcomeNoteSection/>

                    <CorporateEventsSection/>
                   
                    <div className=" w-full h-full pb-10 xl:pb-20 2xl:pb-32 md:mt-5 relative flex justify-center  ">
                        <div className="w-11/12 xl:w-10/12 max-sm:px-4  z-20 text-dark-28 h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-6 2xl:gap-10">
                            {events?.map((data, index) => (
                                <InfoCards key={index} data={data} />
                            ))}
                        </div>
                    </div>

                   <PlanningSection handleNavigateToContactForm={handleNavigateToContactForm}/>

                    <PrivateEvents PRIVATE_EVENTS={PRIVATE_EVENTS}/>

                    <WhyChooseUsSection />

                   <ContactSection ref={contactSectionRef}/>

                </div>

                <Footer />
                {/* <ZohoFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} /> */}

            </SmoothScroll>
        </>
    )
}