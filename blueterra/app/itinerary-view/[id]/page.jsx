'use client'

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useParams } from 'next/navigation';


import HotelsView from "@/components/ItineraryView/HotelsView";
// import Gallery from "@/components/ItineraryView/Gallery";
import Footer from "@/components/Footer/page";
import PlannedActivities from "@/components/ItineraryView/PlannedActivities/PlannedActivities";
// import TabCards from '@/components/ItineraryView/TabsCards';
// import backgroundImage from '../../public/images/itinerary/nature-background.png'
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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ItineraryView() {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [itineraryData, setItineraryData] = useState(null)

    const isTablet = useIsTablet()

    // zoho form 
    const [formOpen, setFormOpen] = useState(false);

    const box1Ref = useRef(null);
    const box2Ref = useRef(null);

    const box1ContainerRef = useRef(null);
    const box2ContainerRef = useRef(null);
    const containerRef = useRef(null);

    const planningRef = useRef()
    const galleryRef = useRef()

    const hotelContainerRef = useRef()
    const hotelGalleryRef = useRef()
    const bannerContainer = useRef()

    const [isLenisAvailable, setIsLenisAvailable] = useState(true)


    const [currentGallery, setCurrentGallery] = useState(0)
    const [GalleryCount, setGalleryCount] = useState(0)


    const galleryData = [
        { name: "Safari Adventure", image: "https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg" },
        { name: "Safari Adventure", image: "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg" },
        { name: "Island Escape", image: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg" },
        { name: "Cultural Celebration", image: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg" },
        { name: "Majestic Waterfalls", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg" },
        { name: "Safari Adventure", image: "https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg" },
        { name: "Safari Adventure", image: "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg" },
        { name: "Island Escape", image: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg" },
        { name: "Cultural Celebration", image: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg" },
        { name: "Majestic Waterfalls", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg" }, { name: "Safari Adventure", image: "https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg" },
        { name: "Safari Adventure", image: "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg" },
        { name: "Island Escape", image: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg" },
        { name: "Cultural Celebration", image: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg" },
        { name: "Majestic Waterfalls", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg" }, { name: "Safari Adventure", image: "https://images.pexels.com/photos/59989/elephant-herd-of-elephants-african-bush-elephant-africa-59989.jpeg" },
        { name: "Safari Adventure", image: "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg" },
        { name: "Island Escape", image: "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg" },
        { name: "Cultural Celebration", image: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg" },
        { name: "Majestic Waterfalls", image: "https://images.pexels.com/photos/1266831/pexels-photo-1266831.jpeg" },
    ];


    const [focusedIndex, setFocusedIndex] = useState(Math.floor(galleryData.length / 2));


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
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                        // markers: true
                    },
                }
            );
        });
    }, { scope: galleryRef });


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
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, { scope: planningRef });


    useGSAP(() => {
        if (isLoading || !itineraryData) return;
        gsap.fromTo(
            ".vertically-animate-element",
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
        if (!id) return;

        const fetchItinerary = async () => {
            try {
                const response = await AXIOS_INSTANCE.get(`itinerary-details/${id}`);
                setItineraryData(response.data)

            } catch (error) {
                console.error('Failed to load journal:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItinerary();
    }, [id]);


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

                        <div className="relative  w-full min-h-[100vh] ">
                            {/* Fixed Background */}
                            <div className="fixed inset-0 -z-10">
                                <Image src={itineraryData?.banner_image_public_url} alt="forest" fill className=" object-cover" priority />
                            </div>
                            <div className=" w-full h-full absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 ">
                            </div>


                            <div ref={bannerContainer} className="   h-full flex  ">

                                <div className=" text-white z-30 mt-32  flex flex-col  justify-between  text-center w-full h-full   ">

                                    <div className={`${playfair.className}`}>
                                        <p className=" text-[45px] md:text-[80px] xl:text-[100px] opacity-0 vertically-animate-element font-medium">{itineraryData.title}</p>
                                        <p className=" text-white/30 opacity-0 vertically-animate-element font-medium h-fit -mt-6  md:-mt-16 lg:-mt-20  xl:-mt-28 text-[70px] md:text-[150px] lg:text-[200px] xl:text-[250px]">{itineraryData.location_title}</p>
                                    </div>

                                    <div className=" space-y-5  text-center flex font-light flex-col items-center">
                                        {/* <p className=" text-[25px] opacity-0 vertically-animate-element leading-9 w-5/12">An extensively crafted schedule that outlines every aspect of your journey, including day-by-day activities, carefully selected destinations, accommodations, transportation details, and unique experiences.</p>
                                    <p className=" w-4/12 text-xl opacity-0 vertically-animate-element leading-9">A comprehensive and meticulously curated document that presents a day-by-day breakdown of your travel journey, featuring thoughtfully.</p> */}
                                        <p className=" 2xl:w-8/12 xl:w-9/12 md:w-9/12 w-11/12 text-[13px] md:text-lg xl:text-xl 2xl:text-[22px] opacity-0 vertically-animate-element 2xl:my-10 font-light leading-6 md:leading-7 xl:leading-9">{itineraryData.description}</p>
                                        <Button text='START PLANNING' buttonStyle={` opacity-0 vertically-animate-element font-normal transition-all duration-500 mb-10  mt-5 ease-in-out font-medium max-md:text-sm px-4 lg:px-6 xl:px-12 py-1.5 xl:py-2 `} onClickFunction={() => setFormOpen(true)} />
                                    </div>

                                </div>
                            </div>
                        </div>


                        {!isTablet && <div className=" w-full bg-white relative  min-h-screen flex flex-col items-center ">
                            <ResponsiveClipPath
                                outerClass='absolute md:w-[20%] w-[28%]  top-0  left-0 h-fit'
                                ImagePath='/images/itinerary/patterns/plan-top-left.png'
                                width={800}
                            />
                            <PlannedActivities itineraryData={itineraryData} setIsLenisAvailable={setIsLenisAvailable} />
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


                        <div className="  relative bg-white lg:pb-28 pb-12 ">
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


                        <div className=" w-full   min-h-[100vh] pb-20 overflow-hidden bg-white flex justify-center px-4  lg:px-7">
                            <div className=" lg:w-11/12 flex-center rounded-4xl relative h-full overflow-hidden bg-light-beige">
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

                            {isTablet && <div className=" pb-10 space-y-10">
                                <h6 className={`${playfair.className}   text-center text-3xl text-dark-4B font-medium`} >Gallery</h6>
                                <GalleryCarousal data={itineraryData?.gallery} setCurrent={setCurrentGallery} setCount={setGalleryCount} />
                                <div className="flex-center space-x-2 overflow-hidden">
                                    {[...Array(itineraryData?.gallery?.length)].map((_, index) => (
                                        <span key={index} className={` transform transition-all duration-300 ease-in-out  ${currentGallery === index + 1 ? "w-12 h-2.5  bg-sky-blue-1" : "w-2 h-2 bg-sky-blue-1/30"} rounded-full`} />

                                    ))}
                                </div>
                            </div>}
                        </div>


                        <div ref={planningRef}
                            className="w-full  lg:min-h-[50vh] min-h-[40vh]   bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center  overflow-hidden relative"
                            style={{
                                backgroundImage: "url('/images/our-story/yellow-banner.png')",
                            }}
                        >

                            <div className="lg:w-8/12 md:w-10/12 space-y-5  lg:space-y-10   text-center h-auto flex-col text-dark-28  flex-center">
                                <h3 className={`xl:text-[50px] lg:text-4xl text-2xl  font-medium  antialiased  text-dark-4B text-center vertically-animated-element ${playfair.className}`}>Design Your Perfect Itinerary</h3>
                                <p className=" xl:text-2xl lg:text-xl font-light leading-7 lg:leading-9  vertically-animated-element w-11/12 lg:w-5/6 ">
                                    Create a journey that reflects your interests, pace, and
                                    travel style — from handpicked experiences to seamless logistics, every detail is yours to shape.
                                </p>
                                <Button text='START PLANNING' buttonStyle={`  transition-all duration-500 vertically-animated-element ease-in-out font-light  max-md:text-sm px-4 lg:px-6 xl:px-12 py-1.5 xl:py-2.5 `} isHoverWhiteApplied={false} onClickFunction={() => setFormOpen(true)} />

                            </div>
                        </div>

                        <Footer />
                        <ZohoFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

                    </div>
                )}

            </SmoothScroll>

        </>


    );
}
