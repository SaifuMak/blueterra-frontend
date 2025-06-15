'use client'
import { useState, useEffect, useRef } from "react"
import accordionData from "@/components/datas/DailyActivitiesData"

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
        <div className=" w-full overflow-y-auto h-full flex  px-1  pl-[56px]  space-y-2 content-between text-base ">
            {/* <div className=" w-6 shrink-0 bg-sky-500">
                {[ ...Array(accordionData.length)].map((_ind)=>{
                    <div className="w-5 h-5 bg-amber-400">ind</div>
                })}
            </div> */}
            <div className="">
                {accordionData?.map((data, index) => (
                    <div key={index} className=" flex border-l relative  ">
                        <div className={`shrink-0 absolute flex  -ml-[41px]  ${index === 0 ? 'pt-1' : 'mt-1'}  ${index === accordionData.length - 1 ? 'pb-32' : ''}  bg-white`}>
                            <p className=" font-medium text-sm">Day</p>
                            <span className="size-6 ml-1.5  text-white text-xs  bg-[#3A938C] flex justify-center items-center  rounded-full">{index}</span>
                        </div>
                        <div className=" flex flex-col pl-5 mb-4">
                            <div className=" border border-[#DCDCE3]">
                                <div onClick={() => handleAccordion(index)} className={` py-1.5 ${OpenedAccordian.includes(index) ? ' bg-[#3A938C] text-white' : ''}  px-2 cursor-pointer`}>{data.title}</div>
                                <div className={` overflow-hidden  transition-all duration-700 text-[#363636] ease-in-out px-4 ${OpenedAccordian.includes(index) ? 'max-h-[200px]    opacity-100 z-20' : 'max-h-0  opacity-0 z-0'}  bg-[#F6F6F6]`}>
                                    <div className="py-5 px-3">
                                        {data.content}
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