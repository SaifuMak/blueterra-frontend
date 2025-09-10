'use client'
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import accordionData from "@/components/datas/DailyActivitiesData"
import { MdOutlineKeyboardArrowRight, MdInfoOutline, IoMdArrowDropup } from '../../reactIcons'

import ReactTooltip from "@/components/generalComponents/ReactTooltip"
import PriceInclusionsDummy from "@/components/generalComponents/PriceInclusionsDummy"
import { useIsTablet } from "@/app/hooks/useIsTablet"
import { useHasScrollbar } from "@/app/hooks/useHasScrollbar"

export default function DailyActivities({ expandCards, index, selectedTab, itineraryData, lockScreen, unLockScreen }) {

    const [OpenedAccordian, setOpenedAccordian] = useState([])

    const accordiansRef = useRef([])

    const { containerRef, hasScrollbar } = useHasScrollbar([OpenedAccordian])


    const handleAccordion = (index) => {
        if (selectedTab !== 'Daily Schedule') {
            // expandCards(0)

            // setTimeout(() => {
            //     setOpenedAccordian((prev) => (
            //         prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            //     ))
            // }, 800);
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
        }
        else {
            setOpenedAccordian([])
        }

    }, [selectedTab])



    return (

        <>

            <div ref={containerRef} className="  w-full  overflow-y-auto h-full  flex flex-col px-1 pl-12 lg:pl-[44px]  max-xl:text-sm  xl:pl-[44px]  space-y-2 content-between text-base  "   {...(hasScrollbar ? { 'data-lenis-prevent': true } : {})}>

                <div className="  w-full  h-full flex flex-col  ">

                    {itineraryData?.days?.map((data, index) => (
                        <div key={index} ref={(el) => (accordiansRef.current[index] = el)} className=" flex border-l relative  ">
                            <div className={`shrink-0 absolute flex  -ml-[44px]  ${index === 0 ? 'pt-1' : 'mt-2'}  ${index === itineraryData?.days.length - 1 ? 'lg:pb-64' : ''} bg-white `}>
                                <p className=" font-normal text-sm  ">Day</p>
                                <span className="size-5 ml-2   text-white text-xs  bg-[#026E9E] flex-center  rounded-full">{index + 1}</span>
                            </div>

                            <div className=" flex w-full flex-col pl-5 mb-4  ">
                                <div className=" border border-[#DCDCE3] rounded-sm">
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
                                    <div ref={containerRef} className={` overflow-x-auto    transition-all duration-700 text-dark-28 ease-in-out px-4  ${OpenedAccordian.includes(index) ? 'max-h-[300px]  max-sm:max-h-[200px]   opacity-100 z-20' : 'max-h-0  opacity-0 z-0'}  bg-[#F6F6F6]`} {...(hasScrollbar ? { 'data-lenis-prevent': true } : {})}>
                                        <div className=" ml-1 pt-3  pb-5  relative  ">

                                            <p className=" mt-2   font-light">{data.description}</p>

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