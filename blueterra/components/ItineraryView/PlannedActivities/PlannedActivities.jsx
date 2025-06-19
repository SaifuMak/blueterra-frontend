'use client'
import { useState, useEffect, useRef } from "react"
import Details from "./Details"
import Carousal from "./Carousal"
import DailyActivities from "./DailyActivities"
import Map from "./Map"
import gsap from "gsap"


export default function PlannedActivities({ }) {

    const dailyActivitiesRef = useRef(null)
    const mapRef = useRef(null)
    const carousalRef = useRef(null)
    const detailsRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const mapCardOriginalStyles = useRef({});
    const activitiesCardOriginalStyles = useRef({});


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
        { 'component': Carousal, 'Ref': carousalRef },
        { 'component': Details, 'Ref': detailsRef },
    ]



    return (
        <>
            {/* <div className="relative flex flex-wrap bg-red-50 border   w-[800px] min-h-[400px] overflow-hidden"> */}

            <div id="plans" className={` planned-activities xl:h-[80vh] h-[80vh] w-fit my-16 bg-white z-30 2xl:py-6 px-6 py-6 max-xl:text-sm rounded-md   2xl:px-12  space-y-5 flex flex-col items-center `}>
                <h3 className="text-3xl font-medium">Planned Activities</h3>


                <div className=" flex  space-x-8  font-medium">
                    {["Map", "Overview", "Daily Schedule",].map((tab, index) => (
                        <p onClick={() => handleTabSelection(tab)} key={index} className={` cursor-pointer transform transition-all duration-300  ${selectedTab === tab ? 'text-brand-blue' : 'text-black'} `}>{tab}</p>
                    ))}
                </div>

                <div className="relative flex flex-wrap justify-center gap-3  2xl:gap-6  w-[850px] xl:w-[1020px]  2xl:w-[1000px]  h-[600px] overflow-hidden">
                    {Components?.map((item, index) => {
                        const DynamicComponent = item.component;
                        return (<div
                            ref={item.Ref}
                            key={index}
                            className="w-[48%] h-[48%]"
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