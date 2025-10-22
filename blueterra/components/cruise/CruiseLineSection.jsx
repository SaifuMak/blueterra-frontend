'use client'
import React from 'react'
import { playfair, rubik } from "@/app/fonts"
import { useState } from 'react'
import CruiseCarousal from './CruiseCarousal'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'

function CruiseLineSection() {

    const [currentCollection, setCurrent] = useState(0)
    const [CollectionCount, setCount] = useState(0)
    const textContainer = useGsapFadeIn()


    // const logos = [
    //     ["https://cdn.myblueterra.com/66exp.eb41bcc76c0286981387.png", "https://cdn.myblueterra.com/Explora-Journeys.6ab2611633325a453c17.png"],
    //     ["https://cdn.myblueterra.com/azamara.b045622d19e85d557ea7.png","https://cdn.myblueterra.com/albatros.38f600acc335e9dd8070.jpg" ],
    //     ["https://cdn.myblueterra.com/celebrity.b2a55061d289539684ed.png", "https://cdn.myblueterra.com/celestyal.10c5c3bc83fb809a3280.png"],
    //     ["https://cdn.myblueterra.com/costa.28a764c7ddd718f6c255.png", "https://cdn.myblueterra.com/cunard.9e54e6b300cedf3ea11d.png"],
    //     ["https://cdn.myblueterra.com/disney.d3ab123a1d237ae76432.png", "https://cdn.myblueterra.com/ncl.17a0a5f5222f3554ba84.png"],
    //     [ "https://cdn.myblueterra.com/p%26ouk.809df92b694a1ac3974b.png","https://cdn.myblueterra.com/oceanwide.3680e5ddbcc3b385a12b.png"],
    //     ["https://cdn.myblueterra.com/pcl.dec201aa303c0a16d533.png", "https://cdn.myblueterra.com/ponant-logo.778dc9bc54dca97565fc.png"],
    //     ["https://cdn.myblueterra.com/rc.bf64fdc25fa555f76e7f.png", "https://cdn.myblueterra.com/ritz.f322931f31be582c0f0d.jpg"],
    //     ["https://cdn.myblueterra.com/seabourn.e01786de8a298e11c949.png", "https://cdn.myblueterra.com/silversea.00b0d29e897754b3683f.png"],
    //     ["https://cdn.myblueterra.com/silversea_exped.f0efdb27c9a3732a1fba.png", "https://cdn.myblueterra.com/swan.c47789e36f97d2ca6aa7.png"],
    //     ["https://cdn.myblueterra.com/windstar.965cb4674ed933aac294.png", "https://cdn.myblueterra.com/disney.d3ab123a1d237ae76432.png"],
    //     ["https://cdn.myblueterra.com/disney.d3ab123a1d237ae76432.png", "https://cdn.myblueterra.com/ncl.17a0a5f5222f3554ba84.png"],
    // ]

    const logos = [
        [
            { name: "Expeditions", imageLink: "https://cdn.myblueterra.com/66exp.eb41bcc76c0286981387.png", link: "" },
            { name: "Explora", imageLink: "https://cdn.myblueterra.com/Explora-Journeys.6ab2611633325a453c17.png", link: "https://cruise.myblueterra.com/swift/cruise?siid=1352712&lang=1&destinationtype=All&CruiseLine=9204&sortColumn=cruiselinePriority&sortOrder=asc  " }
        ],
        [
            { name: "Azamara", imageLink: "https://cdn.myblueterra.com/azamara.b045622d19e85d557ea7.png", link: "" },
            { name: "Albatros", imageLink: "https://cdn.myblueterra.com/albatros.38f600acc335e9dd8070.jpg", link: "" }
        ],
        [
            { name: "Celebrity", imageLink: "https://cdn.myblueterra.com/celebrity.b2a55061d289539684ed.png", link: "https://cruise.myblueterra.com/swift/cruise?siid=1352712&lang=1&destinationtype=All&CruiseLine=2&sortColumn=cruiselinePriority&sortOrder=asc  " },
            { name: "Celestyal", imageLink: "https://cdn.myblueterra.com/celestyal.10c5c3bc83fb809a3280.png", link: "https://cruise.myblueterra.com/swift/cruise?siid=1352712&lang=1&destinationtype=All&CruiseLine=8224&sortColumn=cruiselinePriority&sortOrder=asc  " }
        ],
        [
            { name: "Costa", imageLink: "https://cdn.myblueterra.com/costa.28a764c7ddd718f6c255.png", link: "" },
            { name: "Cunard", imageLink: "https://cdn.myblueterra.com/cunard.9e54e6b300cedf3ea11d.png", link: "https://cruise.myblueterra.com/swift/cruise?siid=1352712&lang=1&destinationtype=All&CruiseLine=12&sortColumn=cruiselinePriority&sortOrder=asc" }
        ],
        [
            { name: "Disney", imageLink: "https://cdn.myblueterra.com/disney.d3ab123a1d237ae76432.png", link: "" },
            { name: "Norwegian", imageLink: "https://cdn.myblueterra.com/ncl.17a0a5f5222f3554ba84.png", link: "https://cruise.myblueterra.com/swift/cruise?siid=1352712&lang=1&destinationtype=All&CruiseLine=6&sortColumn=cruiselinePriority&sortOrder=asc  " }
        ],
        [
            { name: "P&O", imageLink: "https://cdn.myblueterra.com/p%26ouk.809df92b694a1ac3974b.png", link: "https://cruise.myblueterra.com/swift/cruise?siid=1352712&lang=1&destinationtype=All&CruiseLine=16&sortColumn=cruiselinePriority&sortOrder=asc " },
            { name: "Oceanwide", imageLink: "https://cdn.myblueterra.com/oceanwide.3680e5ddbcc3b385a12b.png", link: "" }
        ],
        [
            { name: "Princess", imageLink: "https://cdn.myblueterra.com/pcl.dec201aa303c0a16d533.png", link: "https://cruise.myblueterra.com/swift/cruise?siid=1352712&lang=1&destinationtype=All&CruiseLine=7&sortColumn=cruiselinePriority&sortOrder=asc" },
            { name: "Ponant", imageLink: "https://cdn.myblueterra.com/ponant-logo.778dc9bc54dca97565fc.png", link: "" }
        ],
        [
            { name: "Royal Caribbean", imageLink: "https://cdn.myblueterra.com/rc.bf64fdc25fa555f76e7f.png", link: "https://cruise.myblueterra.com/swift/cruise?siid=1352712&lang=1&destinationtype=All&cruiseline=8&sortcolumn=cruiselinePriority&sortorder=asc  " },
            { name: "Ritz-carltron", imageLink: "https://cdn.myblueterra.com/ritz.f322931f31be582c0f0d.jpg", link: "" }
        ],
        [
            { name: "Seabourn", imageLink: "https://cdn.myblueterra.com/seabourn.e01786de8a298e11c949.png", link: "https://cruise.myblueterra.com/swift/cruise?siid=1352712&lang=1&destinationtype=All&cruiseline=11&sortcolumn=cruiselinePriority&sortorder=asc" },
            { name: "Silversea", imageLink: "https://cdn.myblueterra.com/silversea.00b0d29e897754b3683f.png", link: "" }
        ],
        [
            { name: "Silversea-expeditions", imageLink: "https://cdn.myblueterra.com/silversea_exped.f0efdb27c9a3732a1fba.png", link: "" },
            { name: "Swan", imageLink: "https://cdn.myblueterra.com/swan.c47789e36f97d2ca6aa7.png", link: "" }
        ],
        [
            { name: "Windstar", imageLink: "https://cdn.myblueterra.com/windstar.965cb4674ed933aac294.png", link: "https://cruise.myblueterra.com/swift/cruise?siid=1352712&lang=1&destinationtype=All&cruiseline=9&sortColumn=cruiselinePriority&sortOrder=asc  " },
            { name: "Disney", imageLink: "https://cdn.myblueterra.com/disney.d3ab123a1d237ae76432.png", link: "" }
        ],
        [
            { name: "Disney", imageLink: "https://cdn.myblueterra.com/disney.d3ab123a1d237ae76432.png", link: "" },
            { name: "Norwegian", imageLink: "https://cdn.myblueterra.com/ncl.17a0a5f5222f3554ba84.png", link: "https://cruise.myblueterra.com/swift/cruise?siid=1352712&lang=1&destinationtype=All&CruiseLine=6&sortColumn=cruiselinePriority&sortOrder=asc  " }
        ]
    ];


    return (
        <div className=" lg:my-12 my-7 xl:my-24 ">
            <div ref={textContainer} className="  mx-auto overflow-hidden flex-col-center space-y-4 md:space-y-6 ">
                <h3 className={`${playfair.className}  text-dark-4B heading-text`} >Shop by Cruise Line</h3>
                <p className={`2xl:text-2xl xl:text-xl lg:text-xl max-sm:px-5 font-light ${rubik.className} text-dark-28 w-full md:w-8/12  xl:w-6/12 text-center`}>
                    Compare and choose from leading cruise lines to match your style of travel, from luxury escapes to family-friendly adventures.
                </p>
            </div>
            <div className=" w-full lg:border border-black/5 mt-12 lg:mt-16 mb-10 ">
                <CruiseCarousal logos={logos} setCurrent={setCurrent} setCount={setCount} />
            </div>
            <div className=" flex-center pt-0 lg:pt-8 w-full h-full">
                {logos?.map((_, index) => (
                    <span key={index} className={` h-2 rounded-full translate-all duration-500 ease-in-out  mx-1 ${currentCollection === index + 1 ? '  bg-sky-blue-1 w-10' : 'bg-sky-blue-1/30 w-2'}`}  ></span>
                ))}
            </div>
        </div>
    )
}

export default CruiseLineSection