'use client'
import { useState, useEffect, useRef } from "react"
import Details from "./Details"
import Carousal from "./Carousal"
import DailyActivities from "./DailyActivities"
import Map from "./Map"
import { playfair, rubik } from "@/app/fonts"
import DestinationsCarousal from "./DestinationsCarousal"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ReactTooltip from "@/components/generalComponents/ReactTooltip"
import PriceInclusionsDummy from "@/components/generalComponents/PriceInclusionsDummy"
import { MdInfoOutline, IoMdArrowDropup } from "@/components/reactIcons"
import { useLenis } from "@/components/SmoothScroll"
import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn"

gsap.registerPlugin(ScrollTrigger);


export default function PlannedActivities({ itineraryData, setIsLenisAvailable }) {

    const dailyActivitiesRef = useRef(null)
    const [dailyActivitiesScrollHeight, setDailyActivitiesScrollHeight] = useState(null)
    const mapRef = useRef(null)
    const carousalRef = useRef(null)
    const detailsRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const titleGsapRef = useGsapFadeIn()
    const tabsGsapRef = useGsapFadeIn()


    const mapCardOriginalStyles = useRef({});
    const activitiesCardOriginalStyles = useRef({});

    const plannerRef = useRef()
    const plannerCardsRef = useRef()
    const lenis = useLenis();

    const [selectedTab, setselectedTab] = useState('Overview')


    const lockScreen = () => {
        // lenis.destroy()
        // setIsLenisAvailable(false)
        // document.body.style.overflow = 'hidden'
    };

    const unLockScreen = () => {
        // lenis.start()
        // document.body.style.overflow = 'auto'
    }


    const ExpandMapCard = (ActivitiesCard, MapCard, CarousalCard, DetailsCard) => {
        if (selectedTab === "Map") return
        setselectedTab("Map")

        const rect = MapCard.getBoundingClientRect();
        const parentRect = MapCard.parentNode.getBoundingClientRect();

        const initialTop = rect.top - parentRect.top;
        const initialLeft = rect.left - parentRect.left;
        const initialWidth = rect.width;
        const initialHeight = rect.height;

        // Store original styles
        mapCardOriginalStyles.current = {
            top: initialTop,
            left: initialLeft,
            width: initialWidth,
            height: initialHeight,
        };

        const tl = gsap.timeline();

        tl.to(ActivitiesCard, {
            x: "-110%",
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
        });

        tl.to([CarousalCard, DetailsCard], {
            y: "110%",
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
        }, "<");

        tl.set(MapCard, {
            position: "absolute",
            top: initialTop,
            left: initialLeft,
            width: initialWidth,
            height: initialHeight,
            zIndex: 10,
        });

        tl.to(MapCard, {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            duration: 0.7,
            ease: "power3.inOut",
        });

    }


    const collapseMapCard = (ActivitiesCard, MapCard, CarousalCard, DetailsCard) => {

        const { top, left, width, height } = mapCardOriginalStyles.current;

        const tl = gsap.timeline();

        // Animate back to original size & position
        tl.to(MapCard, {
            top,
            left,
            width,
            height,
            duration: 0.6,
            ease: "power2.inOut",
        });

        // Remove absolute and restore layout flow
        tl.set(MapCard, {
            clearProps: "all",
        });

        // Restore hidden cards
        tl.to([ActivitiesCard, CarousalCard, DetailsCard], {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
        }, "<");

    };

    const expandActivitiesCard = (ActivitiesCard, MapCard, CarousalCard, DetailsCard) => {
        setselectedTab("Daily Schedule")

        const rect = ActivitiesCard.getBoundingClientRect();
        const parentRect = ActivitiesCard.parentNode.getBoundingClientRect();

        const initialTop = rect.top - parentRect.top;
        const initialLeft = rect.left - parentRect.left;
        const initialWidth = rect.width;
        const initialHeight = rect.height;

        // Store original styles
        activitiesCardOriginalStyles.current = {
            top: initialTop,
            left: initialLeft,
            width: initialWidth,
            height: initialHeight,
        };


        const tl = gsap.timeline();

        tl.to([MapCard, DetailsCard], {
            x: "110%",
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
        });

        tl.to(CarousalCard, {
            y: "110%",
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",

        }, "<");

        const expandedHeight = ActivitiesCard.scrollHeight;




        // tl.to(plannerCardsRef.current, {
        //     height: expandedHeight,
        //     duration: 0.6,
        //     ease: "power3.inOut",
        // }, ); 


        tl.set(ActivitiesCard, {
            position: "absolute",
            top: initialTop,
            left: initialLeft,
            width: initialWidth,
            height: initialHeight,
            zIndex: 10,
        });

        tl.to(ActivitiesCard, {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            duration: 0.7,
            ease: "power3.inOut",
        });

    }


    const collapseActivitiesCard = (ActivitiesCard, MapCard, CarousalCard, DetailsCard) => {

        const { top, left, width, height } = activitiesCardOriginalStyles.current;

        const tl = gsap.timeline();

        // Animate back to original size & position
        tl.to(ActivitiesCard, {
            top,
            left,
            width,
            height,
            duration: 0.6,
            ease: "power2.inOut",
        });

        // Remove absolute and restore layout flow
        tl.set(ActivitiesCard, {
            clearProps: "all",
        });

        // Restore hidden cards
        tl.to([MapCard, CarousalCard, DetailsCard], {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
        }, "<");

    };



    const handleTabSelection = (tab) => {

        if (isLoading) {
            return
        }
        if (selectedTab !== tab) {
            setIsLoading(true)

            if (tab === 'Map' && selectedTab === 'Daily Schedule' || tab === 'Daily Schedule' && selectedTab === 'Map') {
                setTimeout(() => {
                    setIsLoading(false)
                }, 2500);
            }
            else {
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
            }

        }

        if (tab === 'Overview') {
            if (selectedTab === 'Map') {
                colapseCards(1)
            }
            if (selectedTab === 'Daily Schedule') {
                colapseCards(0)
            }
        }
        else if (tab === 'Map') {
            if (selectedTab === 'Daily Schedule') {
                colapseCards(0)
                setTimeout(() => {
                    expandCards(1)
                }, 1000);
            }
            else if (selectedTab === 'Overview') {
                expandCards(1)
            }
        }
        else if (tab === 'Daily Schedule') {
            if (selectedTab === 'Map') {
                colapseCards(1)
                setTimeout(() => {
                    expandCards(0)
                }, 1000);
            }
            else if (selectedTab === 'Overview') {
                expandCards(0)
            }
        }
        setselectedTab(tab)
    }


    const expandCards = (index) => {
        const ActivitiesCard = dailyActivitiesRef.current
        const MapCard = mapRef.current
        const CarousalCard = carousalRef.current
        const DetailsCard = detailsRef.current

        if (index === 1) {
            ExpandMapCard(ActivitiesCard, MapCard, CarousalCard, DetailsCard)
        }
        if (index === 0) {
            expandActivitiesCard(ActivitiesCard, MapCard, CarousalCard, DetailsCard)
        }
    };


    const colapseCards = (index) => {
        const ActivitiesCard = dailyActivitiesRef.current
        const MapCard = mapRef.current
        const CarousalCard = carousalRef.current
        const DetailsCard = detailsRef.current

        if (index === 1) {
            collapseMapCard(ActivitiesCard, MapCard, CarousalCard, DetailsCard)
        }
        if (index === 0) {
            collapseActivitiesCard(ActivitiesCard, MapCard, CarousalCard, DetailsCard)
        }
    };

    const Components = [
        { 'component': DailyActivities, 'Ref': dailyActivitiesRef },
        { 'component': Map, 'Ref': mapRef },
        { 'component': DestinationsCarousal, 'Ref': carousalRef },
        { 'component': Details, 'Ref': detailsRef },
    ]


    // useGSAP(() => {
    //     const elements = gsap.utils.toArray(".vertically-animated-element");

    //     elements.forEach((box) => {
    //         gsap.fromTo(
    //             box,
    //             { opacity: 0, y: 60 },
    //             {
    //                 opacity: 1,
    //                 y: 0,
    //                 duration: 0.7,
    //                 ease: "sine.out",
    //                 scrollTrigger: {
    //                     trigger: box,
    //                     start: "top 80%",
    //                     toggleActions: "play none play reverse ",
    //                     // markers: true
    //                 },
    //             }
    //         );
    //     });
    // }, { scope: plannerRef });



    // useGSAP(() => {
    //     const elements = gsap.utils.toArray(".scale-opacity-animate");

    //     elements.forEach((box) => {
    //         gsap.fromTo(
    //             box,
    //             { opacity: 0, scale: 0.9 },
    //             {
    //                 opacity: 1,
    //                 scale: 1,
    //                 duration: 0.7,
    //                 ease: "power3.out",
    //                 scrollTrigger: {
    //                     trigger: box,
    //                     start: "top 90%",
    //                     toggleActions: "play none play reverse ",
    //                 },
    //             }
    //         );
    //     });
    // }, { scope: plannerCardsRef });


    useEffect(() => {
        if (!plannerCardsRef.current) return

        if (selectedTab === 'Daily Schedule' && dailyActivitiesScrollHeight && !isLoading) {
            setTimeout(() => {
                plannerCardsRef.current.style.height = `${dailyActivitiesScrollHeight}px`

            }, 0);
        } else {
            plannerCardsRef.current.style.height = '70vh' // fallback/default height
        }
    }, [dailyActivitiesScrollHeight, isLoading])




    return (
        <>
            {/* <div className="relative flex flex-wrap bg-red-50 border   w-[800px] min-h-[400px] overflow-hidden"> */}

            {/* <div ref={plannerRef} id="plans" className={` ${rubik.className}  planned-activities text-dark-28 h-[105vh]  xl:w-11/12 my-16  z-20 2xl:py-6 px-6 py-6 max-xl:text-sm rounded-md   2xl:px-12   flex flex-col items-center `}> */}
            <div ref={plannerRef} id="plans" className={` ${rubik.className}   planned-activities text-dark-28   xl:w-11/12 mt-16    z-20 2xl:py-6 px-6 py-6 max-xl:text-sm rounded-md   2xl:px-12    flex flex-col items-center overflow-hidden `}>

                <div ref={titleGsapRef} className=" flex  flex-col z-[999] items-center transform-gpu ">
                    <h3 className={`text-5xl font-medium ${playfair.className}`}>Travel Guide</h3>
                </div>

                {/* <div className=" flex text-xl vertically-animated-element space-x-8 mt-10  font-normal max-lg:hidden">
                    {["Map", "Overview", "Daily Schedule",].map((tab, index) => (
                        <p onClick={() => handleTabSelection(tab)} key={index} className={` cursor-pointer transform transition-all duration-300  ${selectedTab === tab ? ' text-sky-blue-dark' : 'text-black'} `}>{tab}</p>
                    ))}
                </div> */}
                <div ref={tabsGsapRef} className="flex text-xl space-x-8 mt-10 font-normal max-lg:hidden">
                    {["Map", "Overview", "Daily Schedule"].map((tab, index) => (
                        <p
                            key={index}
                            onClick={() => handleTabSelection(tab)}
                            className={`
                                relative cursor-pointer transition-all duration-300
                                ${selectedTab === tab ? "text-sky-blue-dark" : "text-black"}
                                after:content-[''] after:absolute after:left-0 after:-bottom-3 after:h-[2px] 
                                after:bg-sky-blue-1 after:transition-all after:duration-500
                                ${selectedTab === tab ? "after:w-full" : "after:w-0 hover:after:w-full"}
                            `}
                        >
                            {tab}
                        </p>
                    ))}
                </div>


                <div ref={plannerCardsRef} className={`relative  h-[70vh]  overflow-hidden  w-full flex flex-wrap justify-center gap-3 mt-16  2xl:gap-6  z-50  `}>
                    {Components?.map((item, index) => {
                        const DynamicComponent = item.component;

                        return (
                            <div
                                ref={item.Ref}
                                key={index}
                                className={` w-[48%] ${item.Ref === mapRef || item.Ref === dailyActivitiesRef ? '  h-[42%]' : '  h-[53%]'}`}
                            >

                                <DynamicComponent expandCards={expandCards} index={index} selectedTab={selectedTab} itineraryData={itineraryData} lockScreen={lockScreen} unLockScreen={unLockScreen} setDailyActivitiesScrollHeight={setDailyActivitiesScrollHeight} />

                            </div>)
                    })}
                </div>


            </div>

            {/* </div> */}
        </>
    )
}