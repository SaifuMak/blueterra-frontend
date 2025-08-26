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

import useGsapFadeIn from "../hooks/Gsap/useGsapFadeIn"


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

    const WHY_CHOOSE_US = [
        {
            "title": "End to end ownership",
            "description": "We handle your entire journey—from planning to return—ensuring a smooth and worry-free travel experience."
        },
        {
            "title": "Bespoke Personalized experiences",
            "description": "It’s refer to travel plans that are custom-designed to match your unique interests, preferences, and pace—offering a journey that's truly your own."
        }, {
            "title": "Organized and attention to detail",
            "description": "Every part of your trip is carefully planned and executed, ensuring nothing is overlooked and everything runs smoothly."
        },

    ]


    const CONTACT_DETAILS = [
        { "title": "Call:", "details": "+ 91 123 456 7890", "icon": "/Icons/phone-blue.svg" },
        { "title": "Email:", "details": "info@yourdomain.com", "icon": "/Icons/email-blue.svg" },
        { "title": "Business Hours:", "details": "Mon - Sat: 9AM - 6PM", "icon": "/Icons/clock-blue.svg" },
        { "title": "Head Office:", "details": "123 Sheikh Zayed Road,", "subDetails": "Downtown Dubai", "icon": "/Icons/location-blue.svg" },

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

                    {/* <div className=" w-full 2xl:min-h-[90vh] xl:min-h-[80vh] md:min-h-[70vh] h-full max-sm:py-7 flex-center  bg-light-beige relative"> */}
                    <div className=" w-full py-12 lg:py-20  h-full max-sm:py-7 flex-center  bg-light-beige relative">

                        <ResponsiveClipPath outerClass='absolute md:w-7/12 w-full right-0 top-0 h-full  ' ImagePath='/images/corporate/intro-right-clip-path.png' />
                        <ResponsiveClipPath outerClass='absolute w-full md:w-1/4 left-0 bottom-0 h-10/12  ' ImagePath='/images/corporate/intro-left-clip-path.png' />

                        <div ref={aboutTitle} className="  space-y-5 xl:space-y-4 2xl:space-y-8 max-sm:text-sm text-xl font-light text-dark-28  h-full flex-col 2xl:w-8/12 xl:w-11/12  flex justify-center items-center ">
                            <h2 className={`${playfair.className}  text-3xl  md:text-5xl xl:text-6xl 2xl:text-7xl font-semibold text-dark-4B`}> <span className=" text-xl font-light  mr-1">At</span>
                                BlueTerra</h2>
                            <p className="xl:w-7/12  w-10/12 text-center leading-6 md:leading-8 xl:leading-9">we craft more than events — we create intentional moments that inspire, connect, and endure.</p>

                            <p className="  xl:w-9/12 w-10/12 text-center leading-6 md:leading-8 xl:leading-10">Whether you're gathering a global team to shape the future of your organization or celebrating a milestone that deserves the extraordinary or an offbeat strategy session, every experience is curated with precision, personality and purpose.</p>
                            <p className=" xl:w-9/12  w-10/12  text-center leading-6 md:leading-8 xl:leading-10">Let’s be honest - delivering a flawless event takes a dedicated team, and we guarantee you’ll have every expert and resource you could imagine working seamlessly behind the scenes</p>

                            <p className=" xl:w-9/12 w-10/12 xl:text-2xl text-center font-normal md:leading-10">We don’t just execute. We own it. Every moment. Every milestone.</p>

                        </div>

                    </div>


                    {/* <div className=" w-full  text-dark-28 flex-center  h-full md:min-h-[70vh] xl:min-h-[100vh] relative "> */}
                    <div className=" w-full  text-dark-28 flex-center  h-full py-12 lg:py-20  relative ">

                        <ResponsiveClipPath outerClass='absolute w-full md:w-1/4 left-0 top-0 h-10/12' ImagePath='/images/corporate/experiences-left-clip-path.png' />

                        <Events firstTitle='Corporate'
                            secondTitle='Experiences'
                            description='Where Vision Meets Execution. And Every Event Leaves a Mark.'
                            firstPara='At  BlueTerra, we execute corporate events that don’t just impress — they inspire.'
                            secondPara='Every touchpoint is designed to align with your objectives, engage your audience and reflect your brand’s stature. From global incentive trips to C-suite offsites, we manage it all- meticulously and with absolute ownership.'
                            imageUrl='/images/corporate/girl-with-map.png'
                            outerClass="max-sm:my-10"
                        />

                    </div>

                    <div className=" w-full h-full pb-10 xl:pb-20 2xl:pb-32 md:mt-5 relative flex justify-center  ">

                        <div className="w-11/12 xl:w-10/12 max-sm:px-4  z-20 text-dark-28 h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-6 2xl:gap-10">
                            {events?.map((data, index) => (
                                <div
                                    key={index}
                                    className="group relative h-[250px] 2xl:h-[280px] w-full rounded-2xl overflow-hidden"
                                >
                                    <Image
                                        src="/images/corporate/banner.png"
                                        alt="quote"
                                        fill
                                        priority
                                        className="absolute inset-0  object-cover rounded-2xl p-0.5 overflow-hidden w-full h-full z-0"
                                    />

                                    <div className="absolute inset-0 bg-light-beige z-10 transition-all duration-1000 ease-in-out group-hover:opacity-0" />

                                    {/* Text Layer (stays clearly visible) */}
                                    <div className="relative z-20 h-full w-full flex flex-col items-center rounded-2xl justify-center transition-all duration-1000 ease-in-out group-hover:bg-black/40 group-hover:text-white text-center text-lg 2xl:text-xl font-light px-4 2xl:px-10">
                                        <h5 className="font-medium xl:mt-6 2xl:mt-10">{data.title}</h5>
                                        <p className="mt-3 group-hover:opacity-0 transition-all duration-700 ease-in-out 2xl:leading-8">{data.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>



                        <ResponsiveClipPath outerClass='absolute  md:w-1/4 right-0  bottom-0 h-3/12  ' ImagePath='/images/corporate/events-bottom-clip-path.png' />
                    </div>


                    <div className=" xl:min-h-[45vh] md:min-h-[40vh] h-[35vh] w-full   relative ">

                        <Image
                            src='/images/corporate/paper-background.png'
                            alt='quote'
                            fill
                            priority
                            style={{ objectFit: 'cover' }}
                        />

                        <div className=" w-full max-sm:px-2  absolute inset-0 text-center space-y-2 lg:space-y-4 2xl:space-y-7   h-full text-dark-28  flex flex-col justify-center items-center">
                            <p className=" vertically-animated-element md:text-2xl xl:text-3xl font-light  md:leading-10 w-11/12  md:w-9/12 xl:w-8/12 2xl:w-6/12 md:px-10  ">If you’re ready to bring beautiful, unforgettable events to life, contact us today</p>
                            <h3 className={`${playfair.className} font-medium vertically-animated-element max-sm:px-2  text-dark-4B text-xl md:text-4xl  xl:text-[50px]`}>Let’s start planning your perfect experience.</h3>
                            <Button text='CONTACT US' buttonStyle={` transition-all vertically-animated-element duration-500 mt-3 md:mt-5 xl:mt-2  ease-in-out font-medium max-sm:text-xs max-md:text-sm px-4 lg:px-6 xl:px-16 py-1.5 xl:py-2.5 `} isHoverWhiteApplied={false} onClickFunction={handleNavigateToContactForm} />
                        </div>
                    </div>


                    <div className=" w-full mt-16  overflow-hidden text-dark-28 flex flex-col items-center h-full relative ">

                        <Events firstTitle='Private Events '
                            secondTitle='& Occasions'
                            description='Because Life’s Most Precious Moments Deserve Thoughtful Excellence'
                            firstPara='Beyond boardrooms and ballrooms, we also curate intimate celebrations, destination weddings, milestone anniversaries and luxury private gatherings — all executed with the same elite precision and soul-stirring flair.'
                            secondPara=''
                            imageUrl='/images/corporate/food.png' />

                        <div className=" w-10/12  2xl:mb-20 mb-10  z-20  mt-12 2xl:mt-20 text-dark-28 h-fit grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {PRIVATE_EVENTS?.map((data, index) => (

                                <div
                                    key={index}
                                    className="group relative h-[250px] 2xl:h-[280px] w-full rounded-2xl overflow-hidden"
                                >
                                    <Image
                                        src="/images/corporate/banner.png"
                                        alt="quote"
                                        fill
                                        priority
                                        className="absolute inset-0  object-cover rounded-2xl p-0.5 overflow-hidden w-full h-full z-0"
                                    />

                                    <div className="absolute inset-0 bg-light-beige z-10 transition-all duration-1000 ease-in-out group-hover:opacity-0" />

                                    <div className="relative z-20 h-full w-full flex flex-col items-center rounded-2xl justify-center transition-all duration-1000 ease-in-out group-hover:bg-black/40 group-hover:text-white text-center text-lg 2xl:text-xl font-light px-4 2xl:px-10">
                                        <h5 className="font-medium xl:mt-6 2xl:mt-6">{data.title}</h5>
                                        <p className="mt-3 group-hover:opacity-0 transition-all duration-700 ease-in-out  2xl:leading-8">{data.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <ResponsiveClipPath outerClass='absolute w-full md:w-4/12 left-0  -bottom-7 h-6/12  ' ImagePath='/images/corporate/private-events-clip-path.png' />
                    </div>


                    <div className=" bg-dark-beige flex w-11/12 overflow-hidden  relative rounded-3xl items-center py-12 2xl:py-24 text-dark-28 flex-col ">
                        <h2 className={` text-3xl vertically-animated-element xl:text-[45px]  2xl:text-[50px] ${playfair.className} font-medium `} >Why  Choose Us?</h2>
                        <div className=" 2xl:w-10/12 xl:w-11/12 max-xl:px-5  mb-10  mt-10 2xl:mt-20  h-fit grid grid-cols-1 lg:grid-cols-3 gap-10 2xl:gap-16">
                            {WHY_CHOOSE_US?.map((data, index) => (
                                <div key={index} className=" z-30 vertically-animated-element bg-dark-beige  max-sm:p-4  md:py-5 xl:py-10 text-lg xl:text-xl  2xl:text-[22px] font-light md:px-5  xl:px-10 rounded-2xl w-full text-center  flex flex-col items-center" style={{ boxShadow: '0 0 25px 1px rgba(50, 70, 70, 0.1)' }}
                                >
                                    <h5 className="  text-dark-4B font-normal ">{data.title}</h5>
                                    <p className=" mt-3  text-base xl:text-lg 2xl:text-xl leading-8">{data.description}</p>
                                </div>
                            ))}
                        </div>

                        <p className=" vertically-animated-element xl:text-xl 2xl:text-2xl xl:mt-5 2xl:mt-8">Afterall, you can truly TRUST us.</p>
                        <ResponsiveClipPath outerClass='absolute w-full md:w-3/12 top-0 z-10 left-0 h-11/12' ImagePath='/images/corporate/why-us-clip-path.png' />
                    </div>

                    <div ref={contactSectionRef} className=" w-full h-full py-7 md:py-20   text-dark-28  flex-center relative">
                        <ResponsiveClipPath outerClass='absolute max-sm:hidden  w-full lg:w-3/12 bottom-0 z-10 right-0 h-full' ImagePath='/images/corporate/contact-clip-path.png' />

                        <div className="2xl:w-11/12 lg:w-full w-11/12 max-sm:my-10  max-lg:space-y-10  lg:space-x-10 flex max-lg:flex-col items-center  justify-center">

                            <div className="lg:w-4/12  w-full flex flex-col max-sm:pl-3  xl:space-y-6 2xl:space-y-8 ">
                                <h4 className={`${playfair.className} vertically-animated-element font-medium max-md:text-3xl text-[42px] xl:text-[50px]`} >Get in Touch</h4>
                                {/* <p className=" text-xl xl:text-2xl vertically-animated-element max-sm:mt-2 font-light">Have questions or need assistance?</p> */}

                                <div className=" vertically-animated-element  lg:space-y-4 max-sm:space-y-3 space-y-5 xl:space-y-6 mt-2">
                                    {CONTACT_DETAILS?.map((data, index) => (
                                        <div key={index} className=" flex items-center font-light space-x-3 xl:space-x-5">
                                            <img src={data.icon} alt="search icon " className=" object-cover shrink-0 size-7 lg:size-8 xl:size-9" />
                                            <div className=" xl:space-y-2 lg:space-y-1 text-lg xl:text-xl max-sm:text-base ">
                                                <p className=" font-normal">{data.title}</p>
                                                <p className=" opacity-90   ">{data.details}</p>
                                                {data.subDetails && <p className="opacity-90  ">{data.subDetails}</p>}
                                            </div>

                                        </div>
                                    ))}
                                </div>

                            </div>

                            <div className="lg:w-6/12  w-full  h-full overflow-hidden  ">
                                <div className="w-full max-sm:h-[640px] md:h-[500px] lg:h-[460px] 2xl:h-[460px] ">
                                    <iframe
                                        title="Zoho Form"
                                        src="https://forms.zohopublic.com/blueterra1/form/Sendusadirectmessage/formperma/LH1SC9iQKsMbkmNpCxnvw8TsFKPf79BaLG-GgDCVlFw"
                                        frameBorder="0"
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                        allowFullScreen
                                    />
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                <Footer />
                {/* <ZohoFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} /> */}

            </SmoothScroll>
        </>
    )
}