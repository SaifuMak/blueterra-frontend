'use client'

import { useState, useEffect, useRef } from "react"
import gsap from 'gsap';

export default function ItineraryView() {
    const [selectedTab, setselectedTab] = useState('Overview')

    const [expandedContainer, setExpandedContainer] = useState(null)

    const parentContainerRef = useRef()

    const timelineRef = useRef()
    const mapRef = useRef()
    const imageRef = useRef()
    const dataRef = useRef()

    const handleExpansion = (el) => {
        setExpandedContainer(el)

        if (el.current) {
            gsap.to(el.current, {
                width: '400%',
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
            })

        }
        else {
            gsap.to(el.current, {
                width: '10%',
                scale: 1,
                duration: 0.6,
                ease: 'power2.out',
            })

        }

    }

    const handleColapse = (el) => {
        setExpandedContainer(el)

        if (el.current) {
            gsap.to(el.current, {


                scale: 4,
                duration: 0.6,
                ease: 'power2.out',
            })

        }

    }

    const getGridStyle = (ref) => {
        return expandedContainer === ref ? 'bg-slate-900 w-full' : 'w-full border'
    }



    return (
        <div className=" min-h-[80vh] flex flex-col  items-center pt-10 mt-16   ">

            <div className="w-9/12  space-y-5 flex flex-col items-center border h-[70vh]">
                <h3 className="text-3xl font-medium">Planned Activities</h3>

                <div className=" flex  space-x-8  font-medium">
                    {["Map", "Overview", "Daily Schedule",].map((tab, index) => (
                        <p onClick={() => setselectedTab(tab)} key={index} className={` cursor-pointer transform transition-all duration-300  ${selectedTab === tab ? 'text-brand-blue' : 'text-black'} `}>{tab}</p>
                    ))}
                </div>


                <div className="w-10/12 relative overflow-hidden  bg-slate-50 grid  grid-cols-2   gap-4  h-[1000px]">
                    <div onClick={() => handleExpansion(timelineRef)} ref={timelineRef} className={`${getGridStyle(timelineRef)}`}>timeline</div>
                    <div onClick={() => handleExpansion(mapRef)} ref={mapRef} className={`${getGridStyle(mapRef)}`}>map</div>
                    <div onClick={() => handleExpansion(imageRef)} ref={imageRef} className={`${getGridStyle(imageRef)}`}>image</div>
                    <div onClick={() => handleExpansion(dataRef)} ref={dataRef} className={`${getGridStyle(dataRef)}`}>data</div>
                </div>




            </div>



        </div>
    )

}