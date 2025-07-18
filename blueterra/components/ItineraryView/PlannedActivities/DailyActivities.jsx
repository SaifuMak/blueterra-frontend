'use client'
import { useState, useEffect, useRef } from "react"
import accordionData from "@/components/datas/DailyActivitiesData"
import { MdOutlineKeyboardArrowRight } from '../../reactIcons'

export default function DailyActivities({ expandCards, index, selectedTab }) {

    const [OpenedAccordian, setOpenedAccordian] = useState([])

    const handleAccordion = (index) => {
        if (selectedTab !== 'Daily Schedule') {
            expandCards(0)

            setTimeout(() => {
                setOpenedAccordian((prev) => (
                    prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
                ))
            }, 800);
        }
        else {
            setOpenedAccordian((prev) => (
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            ))
        }
    }

    useEffect(() => {
        if (selectedTab !== 'Daily Schedule') {
            setOpenedAccordian([])
        }
        // if (selectedTab === 'Daily Schedule' && OpenedAccordian.length === 0) {
        //     setTimeout(() => {
        //         setOpenedAccordian([0])
        //     }, 1000);
        // }

    }, [selectedTab])


    return (
        <div className=" w-full overflow-y-auto h-full flex  px-1 lg:pl-[44px]  max-xl:text-sm  xl:pl-[56px]  space-y-2 content-between text-base ">

            {/* <div className=" w-6 shrink-0 bg-sky-500">
                {[ ...Array(accordionData.length)].map((_ind)=>{
                    <div className="w-5 h-5 bg-amber-400">ind</div>
                })}
            </div> */}

            <div className="">
                {accordionData?.map((data, index) => (
                    <div key={index} className=" flex border-l relative  ">
                        <div className={`shrink-0 absolute flex  -ml-[44px]  ${index === 0 ? 'pt-1' : 'mt-2'}  ${index === accordionData.length - 1 ? 'pb-32' : ''}  bg-white`}>
                            <p className=" font-normal text-sm  ">Day</p>
                            <span className="size-5 ml-2   text-white text-xs  bg-[#026E9E] flex justify-center items-center  rounded-full">{index + 1}</span>
                        </div>

                        <div className=" flex flex-col pl-5 mb-4">
                            <div className=" border border-[#DCDCE3]">
                                <div onClick={() => handleAccordion(index)} className={`  flex font-normal justify-between text-sm items-center py-1.5 ${OpenedAccordian.includes(index) ? ' bg-[#3A938C] text-white' : ''}  pl-4 pr-2 cursor-pointer`}>
                                    {data.title}
                                    <span className={`transition-all duration-300  ${OpenedAccordian.includes(index) ? 'rotate-90' : 'rotate-0'}`}><MdOutlineKeyboardArrowRight className=" text-xl" /></span>
                                </div>
                                <div className={` overflow-hidden   transition-all duration-700 text-[#363636] ease-in-out px-4 ${OpenedAccordian.includes(index) ? 'max-h-[200px]    opacity-100 z-20' : 'max-h-0  opacity-0 z-0'}  bg-[#F6F6F6]`}>
                                    <div className="py-5 px-5 ml-1  mt-8 border-dashed border-slate-500 border-l relative ">
                                        <img src="/Icons/big-dot.svg" alt="dot" className=" w-5 h-5 absolute -top-0.5 -left-2.5" />
                                        <p className="absolute -top-1 left-4 font-medium">Destination</p>
                                        <p className=" mt-2">{data.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}