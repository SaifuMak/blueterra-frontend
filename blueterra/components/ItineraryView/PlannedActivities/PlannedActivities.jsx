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
gsap.registerPlugin(ScrollTrigger);


export default function PlannedActivities({ }) {

    const dailyActivitiesRef = useRef(null)
    const mapRef = useRef(null)
    const carousalRef = useRef(null)
    const detailsRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const mapCardOriginalStyles = useRef({});
    const activitiesCardOriginalStyles = useRef({});

    const plannerRef = useRef()
    const plannerCardsRef = useRef()



    const [selectedTab, setselectedTab] = useState('Overview')


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
                        start: "top 80%",
                        toggleActions: "play none play reverse ",
                        // markers: true
                    },
                }
            );
        });
    }, { scope: plannerRef });


    
  useGSAP(() => {
    const elements = gsap.utils.toArray(".scale-opacity-animate");

    elements.forEach((box) => {
      gsap.fromTo(
        box,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            toggleActions: "play none play reverse ",
          },
        }
      );
    });
  }, { scope: plannerCardsRef });


  


  


    return (
        <>
            {/* <div className="relative flex flex-wrap bg-red-50 border   w-[800px] min-h-[400px] overflow-hidden"> */}

            <div ref={plannerRef} id="plans" className={` ${rubik.className}  planned-activities text-dark-28 h-[100vh] w-10/12 my-16   z-20 2xl:py-6 px-6 py-6 max-xl:text-sm rounded-md   2xl:px-12  space-y-10 flex flex-col items-center `}>
                <h3 className={`text-5xl vertically-animated-element font-medium ${playfair.className}`}>Planned Activities</h3>


                <div className=" flex text-xl vertically-animated-element space-x-8  font-normal">
                    {["Map", "Overview", "Daily Schedule",].map((tab, index) => (
                        <p onClick={() => handleTabSelection(tab)} key={index} className={` cursor-pointer transform transition-all duration-300  ${selectedTab === tab ? ' text-sky-blue-dark' : 'text-black'} `}>{tab}</p>
                    ))}
                </div>

                <div ref={plannerCardsRef} className="relative flex flex-wrap justify-center gap-3 mt-5  2xl:gap-6  z-50  overflow-hidden">
                    {Components?.map((item, index) => {
                        const DynamicComponent = item.component;
                        return (<div
                            ref={item.Ref}
                            key={index}
                            className="w-[48%] scale-opacity-animate h-[48%]"
                        >
                            <DynamicComponent expandCards={expandCards} index={index} selectedTab={selectedTab} />

                        </div>)
                    })}
                </div>
            </div>

            {/* </div> */}
        </>
    )
}