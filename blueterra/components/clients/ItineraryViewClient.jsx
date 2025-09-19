'use client'

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useParams } from 'next/navigation';
import HotelsView from "@/components/ItineraryView/HotelsView";
import Footer from "@/components/Footer/page";
import PlannedActivities from "@/components/ItineraryView/PlannedActivities/PlannedActivities";
import SmoothScroll from "@/components/SmoothScroll";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navbar from "@/components/Navbar/page";
import { playfair, rubik } from "@/app/fonts"
import ResponsiveClipPath from "@/components/generalComponents/ResponsiveClipPath";
import Button from "@/components/generalComponents/Button";
import ZohoFormModal from "@/components/Forms/ZohoFormModal";
import TravelInfo from "@/components/ItineraryView/TravelInfo";

import GalleryList from "@/components/ItineraryView/PlannedActivities/GalleryList";
import AXIOS_INSTANCE from "@/lib/axios";
import LoaderIcon from "@/components/generalComponents/LoaderIcon";
import PlannedActivitiesMobile from "@/components/ItineraryView/PlannedActivities/Mobile/PlannedActivitiesMobile";

import { useIsTablet } from "@/app/hooks/useIsTablet";
import GalleryCarousal from "@/components/ItineraryView/PlannedActivities/GalleryCarousal";

import PriceInclusionsDummy from "@/components/generalComponents/PriceInclusionsDummy"
import { MdInfoOutline, IoMdArrowDropup } from "@/components/reactIcons"
import { useMediaQuery } from 'react-responsive'
import PlanWithUsSection from "../ItineraryView/PlanWithUsSection";
import useClickOutside from "@/app/hooks/useClickOutside";
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ItineraryViewClient({ slug }) {

    const isLargeDevice = useMediaQuery({ query: "(max-width: 2000px)" });


    const [isLoading, setIsLoading] = useState(true)
    const [itineraryData, setItineraryData] = useState(null)

    const isTablet = useIsTablet()

    const [isToolTipVisibleOnClick, setIsToolTipVisibleOnClick] = useState(false)

    const ToolTipOnLargerScreenRef = useClickOutside(() => setIsToolTipVisibleOnClick(false))


    const hotelGsapRef = useGsapFadeIn(0, { start: "top 95%" })

    // zoho form 
    const [formOpen, setFormOpen] = useState(false);

    const planningRef = useRef()
    const galleryRef = useRef()

    const bannerContainer = useRef()

    const [isLenisAvailable, setIsLenisAvailable] = useState(true)

    const [currentGallery, setCurrentGallery] = useState(0)
    const [GalleryCount, setGalleryCount] = useState(0)

    useGSAP(() => {
        if (isLoading || !itineraryData) return;
        gsap.fromTo(
            ".vertically-animate-element-banner",
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.5,
                // stagger: 0.4, // now this will work
            }
        );
    }, { scope: bannerContainer, dependencies: [isLoading, itineraryData] });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])


    useEffect(() => {
        if (!slug) return;

        const fetchItinerary = async () => {
            try {
                const response = await AXIOS_INSTANCE.get(`itinerary-details/${slug}`);
                setItineraryData(response.data)

            } catch (error) {
                console.error('Failed to load journal:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItinerary();
    }, [slug]);


    return (

        <>
            <SmoothScroll enabled={isLenisAvailable}>
                <Navbar />

                {isLoading ? (
                    <div className="min-h-[90vh] flex items-center justify-center text-2xl font-medium">
                        <LoaderIcon />
                    </div>
                ) : !itineraryData ? (
                    <div className="min-h-[90vh] flex items-center justify-center text-2xl font-medium">
                        No itinerary found
                    </div>
                ) : (
                    <div className={`${rubik.className}`}>

                        <div className="relative  w-full min-h-[100vh] flex  items-center ">
                            {/* Fixed Background */}
                            <div className="fixed inset-0 -z-10">
                                <Image src={itineraryData?.banner_image_public_url} alt="forest" fill className=" object-cover" priority />
                            </div>
                            <div className=" w-full h-full absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 ">
                            </div>


                            <div ref={bannerContainer} className="   h-full flex    w-full   ">

                                <div className=" text-white z-30  flex flex-col mt-24  md:mt-32 mb-10 justify-between   text-center w-full h-full   ">

                                    <div className={`${playfair.className}`}>
                                        <p className=" text-[45px] md:text-[80px] max-md:leading-14 2xl:text-[100px] opacity-0 vertically-animate-element-banner font-medium">{itineraryData.title}</p>
                                        <p className=" text-white/30 opacity-0 vertically-animate-element-banner leading-none font-medium h-fit lg:-mt-7  2xl:-mt-8 text-[70px] md:text-[150px] lg:text-[200px] 2xl:text-[250px]">{itineraryData.location_title}</p>
                                    </div>

                                    <div className=" space-y-5  text-center flex max-2xl:mt-5 font-light flex-col items-center">
                                        {/* <p className=" text-[25px] opacity-0 vertically-animate-element leading-9 w-5/12">An extensively crafted schedule that outlines every aspect of your journey, including day-by-day activities, carefully selected destinations, accommodations, transportation details, and unique experiences.</p>
                                    <p className=" w-4/12 text-xl opacity-0 vertically-animate-element leading-9">A comprehensive and meticulously curated document that presents a day-by-day breakdown of your travel journey, featuring thoughtfully.</p> */}
                                        <p className=" 2xl:w-8/12 xl:w-9/12 md:w-9/12 w-11/12 text-sm md:text-lg xl:text-xl 2xl:text-[22px] opacity-0 vertically-animate-element-banner 2xl:my-10 font-light leading-6 md:leading-7 xl:leading-9">{itineraryData.description}</p>
                                        <Button text='START PLANNING' buttonStyle={` opacity-0 vertically-animate-element-banner font-normal transition-all duration-500 mb-10  mt-5 ease-in-out font-medium max-md:text-sm px-4 lg:px-6 xl:px-12 py-1.5 xl:py-2 `} onClickFunction={() => setFormOpen(true)} />
                                    </div>

                                </div>
                            </div>
                        </div>


                        {!isTablet && <div className=" w-full bg-white relative  min-h-[50vh]   flex flex-col items-center ">
                            <ResponsiveClipPath
                                outerClass='absolute md:w-[20%] w-[28%]  top-0  left-0 h-fit'
                                ImagePath='/images/itinerary/patterns/plan-top-left.png'
                                width={800}
                            />
                            <PlannedActivities itineraryData={itineraryData} setIsLenisAvailable={setIsLenisAvailable} />

                            <div className=" xl:w-10/12 w-11/12 mb-24 ">
                                <div ref={ToolTipOnLargerScreenRef} className="relative flex items-center w-full  group ">
                                    <div onClick={() => setIsToolTipVisibleOnClick(!isToolTipVisibleOnClick)} className="flex items-center peer cursor-pointer">
                                        <p>Inclusions and Exclusions</p>
                                        <MdInfoOutline className="ml-2" />
                                    </div>

                                    <div className={`absolute   max-w-6/12  top-5 min-h-[300px] lg:min-w-[600px] xl:min-w-[700px] 2xl:min-w-[800px] z-[999] ${isToolTipVisibleOnClick ? 'opacity-100 visible' : 'opacity-0 invisible'}  peer-hover:opacity-100 peer-hover:visible hover:opacity-100 hover:visible transition-all duration-300`}>
                                        {/* <div className="absolute   max-w-6/12  top-5 min-h-[300px] lg:min-w-[600px] xl:min-w-[700px] 2xl:min-w-[800px] z-[999] opacity-0 invisible peer-hover:opacity-100 peer-hover:visible hover:opacity-100 hover:visible transition-all duration-300"> */}

                                        <div className=" relative mt-4 bg-white w-full  px-6 !z-[1999] rounded-xl  shadow-[0_0_20px_rgba(0,0,0,0.15)]   ">
                                            <IoMdArrowDropup className=" text-4xl  text-white absolute left-1/4 -translate-x-1/4 -top-5 " />
                                            <PriceInclusionsDummy itineraryData={itineraryData} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>}


                        {isTablet &&
                            <div className=" w-full bg-white relative  min-h-screen flex flex-col items-center ">
                                <ResponsiveClipPath
                                    outerClass='absolute md:w-[20%] w-[28%]  top-0  left-0 h-fit'
                                    ImagePath='/images/itinerary/patterns/plan-top-left.png'
                                    width={800}
                                />
                                <PlannedActivitiesMobile itineraryData={itineraryData} />
                            </div>
                        }


                        <div className="relative bg-white lg:pb-28 pb-12 ">
                            <ResponsiveClipPath
                                outerClass='absolute md:w-[20%] w-[28%]  bottom-0 right-0 h-fit'
                                ImagePath='/images/itinerary/patterns/travel-bottom.png'
                                width={800}
                            />
                            <div className="xl:w-10/12  w-11/12 mx-auto flex  max-lg:flex-col justify-between ">
                                <TravelInfo
                                    icon='/Icons/Itinerary/leaf.svg'
                                    title='Best Time to Travel'
                                    subtitle={itineraryData?.featured_points[0]?.suggested_date}
                                />
                                <TravelInfo
                                    icon='/Icons/Itinerary/dollar.svg'
                                    title='Price start from'
                                    subtitle={itineraryData?.featured_points[0]?.price}
                                    additionalInformation={itineraryData?.featured_points[0]?.additional_information}
                                />
                                <TravelInfo
                                    icon='/Icons/Itinerary/ballon.svg'
                                    title='Adventures in Motion'
                                    subtitle={itineraryData?.category?.title}

                                />
                            </div>
                        </div>


                        <div className=" w-full  bg-white    max-sm:pb-12 pb-20 2xl:pb-32 overflow-hidden flex justify-center px-4  lg:px-7">
                            {/* <div className=" lg:w-11/12 flex-center rounded-4xl relative h-full overflow-hidden bg-light-beige"> */}
                            <div className="  lg:w-11/12 flex-center rounded-4xl relative h-full overflow-hidden bg-sky-blue-light">
                                <HotelsView data={itineraryData?.hotels} />
                            </div>
                        </div>


                        <div ref={galleryRef} className=" relative  bg-white  w-full h-full">
                            <ResponsiveClipPath
                                outerClass='absolute md:w-[30%] w-[32%]  bottom-10 right-0 h-fit'
                                ImagePath='/images/itinerary/patterns/gallery-bottom.png'
                                width={800}
                            />

                            {!isTablet && <div className="w-full h-full bg-white/30   flex-center relative">
                                <div className=" w-11/12 overflow-hidden   space-y-10 mb-24   h-full flex flex-col  items-center rounded-3xl  ">
                                    <h6 className={`${playfair.className} gallery-title   text-center text-4xl xl:text-5xl  text-dark-4B font-medium`} >Gallery</h6>
                                    <GalleryList data={itineraryData?.gallery} />

                                </div>
                            </div>}

                            {isTablet && <div className=" pb-10 max-lg:pb-16  space-y-10">
                                <h6 className={`${playfair.className}   text-center text-3xl text-dark-4B font-medium`} >Gallery</h6>
                                <GalleryCarousal data={itineraryData?.gallery} setCurrent={setCurrentGallery} setCount={setGalleryCount} />
                                <div className="flex-center space-x-2 overflow-hidden">
                                    {[...Array(itineraryData?.gallery?.length)].map((_, index) => (
                                        <span key={index} className={` transform transition-all duration-300 ease-in-out  ${currentGallery === index + 1 ? "w-12 h-2.5  bg-sky-blue-1" : "w-2 h-2 bg-sky-blue-1/30"} rounded-full`} />

                                    ))}
                                </div>
                            </div>}
                        </div>


                        <PlanWithUsSection setFormOpen={setFormOpen} />

                        <Footer />
                        <ZohoFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

                    </div>
                )}

            </SmoothScroll>

        </>


    );
}
