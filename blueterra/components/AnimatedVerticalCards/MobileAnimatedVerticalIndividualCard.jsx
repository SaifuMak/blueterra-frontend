import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Image from "next/image"
import { playfair } from '@/app/fonts'
import gsap from 'gsap';


function MobileAnimatedVerticalIndividualCard({ index,
    card,
    selectedVerticalTileMobile,
    setSelectedVerticalTileMobile,
    handleCardClick,
    page,
    handleSetCollectionRequestedToShowInMobile }) {

    const cardRef = useRef(null)

    const handleTouchStart = (indexToAnimate, e) => {
        if (selectedVerticalTileMobile === indexToAnimate) return;
        gsap.to(cardRef.current, {
            flex: 2,
            // scaleY: 1.3,
            // transformOrigin: "top center",
            duration: 0.7,
            ease: 'Power3.out',
            lazy: false
        })

    };

    const handleTouchEnd = (indexToAnimate, e) => {
        if (selectedVerticalTileMobile === indexToAnimate) return;
        gsap.to(cardRef.current, {
            flex: 1,
            // scaleY: 1,
            // transformOrigin: "top center",
            duration: 0.7,
            ease: 'Power3.out',
            lazy: false
        })
    };

    useEffect(() => {
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                flex: selectedVerticalTileMobile === index ? 9 : 1,
                duration: 0.7,
                ease: 'Power3.out'
            });
        }
    }, [selectedVerticalTileMobile])



    return (
        <div
            ref={cardRef}
            onClick={() => handleCardClick(index)}
            onTouchStart={(e) => handleTouchStart(index, e)}
            onTouchEnd={(e) => handleTouchEnd(index, e)}
            className={` flex-1 relative gpu-animate `}>


            {/* <div key={index} ref={(e) => (mobileVerticalTilesRef[index] = e)} onClick={() => setSelectedVerticalTileMobile(index)} className={`  transition-all duration-500 ease-in-out relative ${selectedVerticalTileMobile === index ? 'flex-9' : 'flex-1'} `}> */}

            {/* <Image
                src={card?.banner_image_public_url}
                alt={card?.title}
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'center' }}
            /> */}
            <img src={card?.banner_image_public_url} alt={card?.title} loading="eager" className=" absolute inset-0 w-full h-full object-cover will-change-transform [transform:translateZ(0)] " />


            <div className={`absolute ${selectedVerticalTileMobile === index ? "opacity-0" : " opacity-100"} text-white transition-all duration-500 ease-in-out inset-0   bg-[#00284626]`}>
                <div className="flex   w-full h-full px-3 mt-2 space-x-2 ">
                    <img src={card?.icon_public_url} alt={card?.title} loading="eager" className=" object-contain size-[27px]" />
                    <div className="bg-white/40 h-0.5 flex-1 my-3"></div>
                    <p className=''> {card?.title}</p>

                </div>
            </div>

            <div className={`bg-[#104F82D9]/50 text-white transition-all duration-500 ease-in-out absolute inset-0 ${selectedVerticalTileMobile === index ? "opacity-100" : " opacity-0"}`}>
                <div className=" w-full h-full p-6 ">

                    <p className='  flex  text-white text-lg  '>
                        <img src={card?.icon_public_url} alt={card.title} loading="eager" className=" object-cover size-[25px]" />
                        <span className={`font-normal text-xl ml-3 ${playfair.className}`}>{card.title}</span></p>

                    <hr className=' opacity-40 mt-1'></hr>
                    <h3 className={`font-normal mt-5 ${playfair.className}`}>{page === 'collections' ? 'Explore our Collection' : 'Handpicked Destinations'}</h3>
                    {page === 'collections' && (
                        <div className="flex   w-11/12 flex-wrap  gap-y-1  gap-x-4 pr-3 font-light text-[12px] mt-2">
                            {card?.popular_journeys
                                ?.split(",")                // split by comma
                                .map((item, index) => (
                                    <div key={index} className="flex">
                                        <span className="text-nowrap">{item.trim()}</span>
                                    </div>
                                ))}
                        </div>
                    )}


                    {page === 'destinations' && <div className="flex   w-11/12 flex-wrap  gap-y-1  gap-x-4 pr-3 font-light text-[12px] mt-2">
                        {card?.countries?.map((country, index) => (
                            <div key={index} className="  flex   ">
                                <span className="text-nowrap">{country?.title}</span></div>
                        ))}
                    </div>}

                    <p className=" text-sm font-light mt-2 ">{card?.description}</p>

                    {page === 'collections' && <div className="space-y-1 font-light text-sm mt-3 h-[15vh]  gap-x-3 overflow-y-auto  flex flex-col ">
                        {card?.categories?.map((category, index) => (
                            <div key={index} className=" text-white flex items-center text-sm">  <img src="/Icons/dot.svg" alt="dot" className="w-2.5 h-2.5" /> <p className=" ml-3">{category?.title}</p></div>
                        ))}
                    </div>}

                    <div className=" w-full flex mt-3 text-[12px] items-center justify-between">
                        <button onClick={() => handleSetCollectionRequestedToShowInMobile(index)} className="hover:bg-white/15 hover:ring-2 ring-white/80  bg-sky-blue-1 px-6 py-1.5 transition-all duration-700 ease-in-out  cursor-pointer  text-[12px]  rounded-sm  text-white w-fit h-fit">VIEW ALL</button>
                        {/* <button className="hover:bg-white/15 hover:ring-2 ring-white/80 flex items-center  bg-sky-blue-1 px-4 py-1.5 transition-all duration-700 ease-in-out  cursor-pointer  text-[12px] font-normal rounded-sm  text-white"><span className="mr-1"><img src='/Icons/filter.svg' className='size-4 '></img></span>Show Filters</button> */}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default MobileAnimatedVerticalIndividualCard