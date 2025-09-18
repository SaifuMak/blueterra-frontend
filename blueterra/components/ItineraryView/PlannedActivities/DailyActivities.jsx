'use client'
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import accordionData from "@/components/datas/DailyActivitiesData"
import { MdOutlineKeyboardArrowRight, MdInfoOutline, IoMdArrowDropup } from '../../reactIcons'

import ReactTooltip from "@/components/generalComponents/ReactTooltip"
import PriceInclusionsDummy from "@/components/generalComponents/PriceInclusionsDummy"
import { useIsTablet } from "@/app/hooks/useIsTablet"
import { useHasScrollbar } from "@/app/hooks/useHasScrollbar"
import { useMediaQuery } from 'react-responsive'


export default function DailyActivities({ expandCards, index, selectedTab, itineraryData, lockScreen, unLockScreen, setDailyActivitiesScrollHeight }) {

    const [OpenedAccordian, setOpenedAccordian] = useState([])

      const isSmallerScreen = useMediaQuery({
        query: '(max-width: 1024px)'
    })


    const accordiansRef = useRef([])

    const lastRef = useRef(null);
    const [lastHeight, setLastHeight] = useState(30);

    // const { containerRef, hasScrollbar } = useHasScrollbar([OpenedAccordian])

    const containerRef = useRef(null);
    const [hasScrollbar, setHasScrollbar] = useState(false);

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const checkOverflow = () => {
            const el = containerRef.current;
            setHasScrollbar(el.scrollHeight > el.clientHeight);
            setDailyActivitiesScrollHeight(el.scrollHeight)
        };

        checkOverflow(); // run initially

        // Watch for size/content changes
        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, [OpenedAccordian]);


    const handleAccordion = (index) => {
        if (selectedTab !== 'Daily Schedule') {

            setTimeout(() => {
                setOpenedAccordian((prev) => (
                    prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
                ))
            }, 100);

            if (!OpenedAccordian.includes(index)) {
                setTimeout(() => {
                    const target = accordiansRef.current[index];
                    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 500);
            }
        }

        else {


            setOpenedAccordian((prev) => (
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            ))
        }
    }

    useEffect(() => {
        if (selectedTab === "Daily Schedule") {
            // open all
            setTimeout(() => {
                setOpenedAccordian(itineraryData?.days?.map((_, idx) => idx) || [])

            }, 1100);
            // }, 0);

        }
        else {
            setOpenedAccordian([])
        }

    }, [selectedTab])


    // this caluculates the  length of opened last div this lenght we use to cover the timeline line from last element
    useEffect(() => {
        if (OpenedAccordian.includes(itineraryData?.days?.length - 1)) {

            if (lastRef.current) {
                setLastHeight(lastRef.current.scrollHeight + 30);
            }
        }
        else {
            setTimeout(() => {
                setLastHeight(30);
            }, 400);
        }
    }, [OpenedAccordian]);


    return (

        <>

            <div ref={containerRef} className={`${selectedTab === 'Daily Schedule' ? ' h-fit' : ' h-full lg:overflow-y-auto'} w-full   flex flex-col px-1 pl-12 lg:pl-[44px]   max-xl:text-sm  xl:pl-[44px]   space-y-2 content-between text-base   `}    {...(hasScrollbar && selectedTab !== 'Daily Schedule' && !isSmallerScreen ? { 'data-lenis-prevent': true } : {})}>

                <div className="  w-full flex flex-col">


                    {itineraryData?.days?.map((data, index) => (
                        <div key={index} ref={(el) => (accordiansRef.current[index] = el)} className=" flex  border-l relative  ">
                            <div className={`shrink-0 absolute flex  transition-all duration-500  ease-in-out -ml-[44px]  ${index === 0 ? 'pt-1' : 'mt-2'}   bg-white   `} style={{ paddingBottom: index === itineraryData?.days.length - 1 ? `${Number(lastHeight)}px` : '' }}>
                                <p className=" font-normal text-sm  ">Day</p>
                                <span className="size-5 ml-2   text-white text-xs  bg-[#026E9E] flex-center  rounded-full">{index + 1}</span>
                            </div>

                            <div className=" flex w-full flex-col pl-5 mb-4  ">
                                <div className=" border border-[#DCDCE3] rounded-sm ">
                                    <div onClick={() => handleAccordion(index)} className={`  flex font-normal  justify-between rounded-t-sm text-sm items-center py-1.5   pl-4 pr-2 cursor-pointer`}
                                        style={{
                                            backgroundColor: OpenedAccordian.includes(index)
                                                ? itineraryData.color
                                                : "transparent",
                                            color: OpenedAccordian.includes(index) ? "white" : "black",
                                        }}>
                                        {data.title}
                                        <span className={`transition-all duration-300  ${OpenedAccordian.includes(index) ? 'rotate-90' : 'rotate-0'}`}><MdOutlineKeyboardArrowRight className=" text-xl" /></span>
                                    </div>
                                    {/* <div ref={containerRef} className={` overflow-y-auto    transition-all duration-700 text-dark-28 ease-in-out px-4  ${OpenedAccordian.includes(index) ? 'max-h-[500px]  max-sm:max-h-[1000px]   opacity-100 z-20' : 'max-h-0  opacity-0 z-0'}  bg-[#F6F6F6]`} {...(hasScrollbar ? { 'data-lenis-prevent': true } : {})}> */}
                                    <div
                                        ref={index === itineraryData?.days?.length - 1 ? lastRef : null}
                                        className={` overflow-y-auto    transition-all duration-700 text-dark-28 ease-in-out px-4  ${OpenedAccordian.includes(index) ? 'max-h-[2500px]  max-sm:max-h-[2000px]   opacity-100 z-20' : 'max-h-0  opacity-0 z-0'}  bg-[#F6F6F6]`} >

                                        <div className=" ml-1 pt-3  pb-5  relative  ">

                                            {/* <p className=" mt-2   font-light">{data.description}</p> */}
                                            <div className="mt-2   font-light" dangerouslySetInnerHTML={{
                                                __html: data?.description,
                                            }} />

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

            </div>

            {/* <div className="relative mt-3 flex justify-center items-center   group ">
                        <div className="flex items-center peer cursor-pointer">
                            <p>Inclusions and Exclusions</p>
                            <MdInfoOutline className="ml-2" />
                        </div>

                        <div className="absolute top-full     min-h-[300px] min-w-[900px]  z-[999] opacity-0 invisible peer-hover:opacity-100 peer-hover:visible hover:opacity-100 hover:visible transition-all duration-300">

                            <div className=" relative mt-4  px-6 !z-[1999] rounded-xl shadow-2xl bg-white  ">
                                <IoMdArrowDropup className=" text-4xl   text-white absolute left-1/2 -top-[22px]" />
                                <PriceInclusionsDummy />
                            </div>
                        </div>

                    </div>
 */}

        </>

    )
}