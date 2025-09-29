'use client'
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { GoDot } from '../reactIcons'
import Button from '../generalComponents/Button';
import { playfair } from "@/app/fonts"
import Lottie from "lottie-react";
import { useMediaQuery } from "react-responsive";


export default function AnimatedVerticalCard({ page, card, onClick, isExpanded, isFullCardVisible, handleHideFullCard, setIsLoading, isLoading, setIsFilterVisible, isFilterVisible }) {

    const cardRef = useRef(null)
    const [canTrackMouse, setCanTrackMouse] = useState(false);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const isTouchDevice = useMediaQuery({ query: "(pointer: coarse)" });


    useEffect(() => {
        // console.log(isFullCardVisible, 'status of full card ')

        if (cardRef.current) {
            // ease: 'elastic.out(1, 0.5)'
            gsap.to(cardRef.current, {
                flex: isExpanded ? 6 : 1,
                height: isFullCardVisible ? '100vh' : '60px',
                duration: 0.7,
                // ease: 'elastic.out(0.1, 0.1)'
                ease: 'Power3.out'
                // ease: 'circ.out'
                // ease: 'elastic.out(0.01  , 0.01)'
            })
        }

    }, [isExpanded, isFullCardVisible])

    // const triggerMouseMoveAtCurrentPosition = () => {
    //     if (!cardRef.current) return;

    //     // Get the real current cursor position
    //     const { clientX, clientY } = window._lastKnownMouse || {};

    //     if (clientX == null || clientY == null) return; // no mouse position tracked yet

    //     // Dispatch a synthetic mousemove with the real coords
    //     const evt = new MouseEvent("mousemove", {
    //         bubbles: true,
    //         clientX,
    //         clientY
    //     });

    //     cardRef.current.dispatchEvent(evt);
    // };

    // Track mouse globally so we always have the last known position

    // useEffect(() => {
    //     const updateLastMouse = (e) => {
    //         window._lastKnownMouse = { clientX: e.clientX, clientY: e.clientY };
    //     };
    //     window.addEventListener("mousemove", updateLastMouse);
    //     return () => window.removeEventListener("mousemove", updateLastMouse);
    // }, []);



    // const handleMouseMove = (e) => {
    //     const rect = e.currentTarget.getBoundingClientRect();
    //     // console.log(rect);

    //     setMousePos({
    //         x: e.clientX - rect.left,
    //         y: e.clientY - rect.top,
    //     });

    // };


    const handleMouseEnter = () => {
        if (!isExpanded && !isTouchDevice) {
            gsap.to(cardRef.current, {
                flex: 1.8, // Grow slightly on hover
                duration: 0.8,
                ease: 'sine.out',
                // onComplete: () => {
                //     triggerMouseMoveAtCurrentPosition()
                // }

            });
        }
    };


    const handleMouseLeave = () => {
        if (!isExpanded && !isTouchDevice) {
            gsap.to(cardRef.current, {
                flex: 1, // Shrink back
                duration: 0.8,
                ease: 'sine.out',

            });
        }
    };


    return (
        <div ref={cardRef}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // onTouchStart={handleMouseEnter}
            // onTouchEnd={handleMouseLeave}
            className={` h-[100vh] flex-1 ${!isExpanded ? 'cursor-pointer' : 'cursor-default'}  relative group   overflow-hidden bg-stone-50  text-white text-3xl   `} >
            {/* {card.title} */}

            <div className='overflow-hidden relative w-full h-full  '>

                <Image
                    src={card?.banner_image_public_url}
                    alt={card?.title}
                    fill
                    priority={true}
                    // sizes="(max-width: 368px) 100vw, (max-width: 400px) 50vw, 33vw"
                    // style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className=' object-cover'
                    onLoad={() => setIsLoading(false)}
                />

                <div className={`absolute inset-0 ${!isExpanded && 'group-hover:bg-[#104F82D9]/60'}  pointer-events-none  ease-in-out  transition-colors duration-1000  z-0`}></div>

                {/* {!isExpanded && (
                    <div className="absolute group-hover:opacity-100  transition-opacity  opacity-0 inset-0 pointer-events-none z-20">
                        <div
                            style={{
                                position: "absolute", // important!
                                left: `${mousePos.x}px`,
                                top: `${mousePos.y}px`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <Lottie
                                path="/lottie/click.json"
                                loop
                                autoplay
                                style={{ width: 300, height: 300 }}
                            />
                        </div>
                    </div>
                )} */}


                {/* if not  expanded horizontally */}
                {!isExpanded ? (
                    // <div className='absolute inset-0  bg-[#00284680]/80'>
                    <div className='absolute inset-0 bg-[#00284626]'>

                        {/* vertical full card */}
                        {isFullCardVisible ? (

                            // <div className={`flex mt-3 w-8 ml-6 h-[85vh] text-white flex-col items-center `}>
                            <div className={`flex mt-5   h-[85vh] text-white flex-col items-center `}>


                                {/* <span className="text-4xl font-normal">{card.number}</span> */}
                                <img src={card.icon_public_url} alt={card.title} className=" object-contain size-[52px]" />

                                <div className="bg-white/40 w-0.5 flex-1 my-3"></div>

                                <p className=" rotate-180 text-3xl tracking-wide [writing-mode:vertical-rl]">
                                    {card.title}
                                </p>
                            </div>

                        ) : (

                            <div className=" flex-center h-full text-white ">
                                <img src={card.icon_public_url} alt={card.title} className=" object-cover size-[30px] lg:size-[40px]" />
                            </div>
                        )}

                    </div>
                ) : (

                    // when card is expanded horizontally 
                    <div className='bg-[#104F82D9]/80 absolute inset-0 2xl:px-20 lg:px-10 px-4  '>

                        <div className="2xl:w-[700px] xl:w-[700px] lg:w-[500px]  h-full  w-[400px] 2xl:text-lg text-base font-light">

                            {isFullCardVisible && <div className='2xl:mt-12 mt-4'>

                                <p className='  flex  text-white text-4xl 2xl:text-5xl '>
                                    {/* {card.number} */}
                                    <img src={card.icon_public_url} alt={card.title} className=" object-cover size-[52px]" />

                                    <span className={`font-medium ml-7 ${playfair.className} `}>{card.title}</span>
                                </p>
                                <hr className=' opacity-40 mt-5'></hr>
                            </div>}


                            {isFullCardVisible && <div className="w-full 2xl:mt-10 mt-5 space-y-6 xl:space-y-10 ">
                                <h3 className={`${playfair.className} text-2xl 2xl:text-3xl font-medium`} >Popular Journeys</h3>

                                {/* {page === 'destinations' && <div className="flex  space-x-6">
                                    {card?.countries?.map((country, index) => (
                                        <div key={index} className="  flex  bor-b ">
                                            <span className="">{country?.title}</span></div>
                                    ))}
                                </div>} */}


                                <div className="flex space-x-6">
                                    {card?.popular_journeys
                                        ?.split(",")                // split by comma
                                        .map((item, index) => (
                                            <div key={index} className="flex bor-b">
                                                <span>{item.trim()}</span>
                                            </div>
                                        ))}
                                </div>


                                <p className="  w-9/12 leading-relaxed ">{card?.description}</p>

                                {page === 'collections' && <div className="space-y-3 h-[190px] w-9/12 p-0 flex flex-col gap-x-5 flex-wrap ">
                                    {card?.categories?.map((category, index) => (
                                        <div key={index} className=" text-white flex items-center">  <img src="/Icons/dot.svg" alt="dot" className="w-2.5 h-2.5" /> <p className=" ml-3">{category?.title}</p></div>
                                    ))}
                                </div>}

                                <button onClick={(e) => { e.stopPropagation(); handleHideFullCard(); }} className="hover:bg-white/15 hover:ring-2 ring-white/80  bg-sky-blue-1 px-20 py-2.5 transition-all duration-700 ease-in-out  cursor-pointer  text-[15px] font-medium rounded-sm  text-white w-fit h-fit">VIEW ALL</button>

                                {/* <button onClick={(e) => { e.stopPropagation(); handleHideFullCard(); }} className=" w-[250px] cursor-pointer    py-2 font-medium  rounded-full bg-white/90  text-brand-blue">VIEW ALL</button> */}

                            </div>}

                            {!isFullCardVisible && (<div className=" absolute bottom-3  lg:bottom-2 w-10/12 flex items-center justify-between ">
                                <p className=' flex  items-center  text-white text-lg lg:text-2xl font-extralight '>
                                    <img src={card.icon_public_url} alt={card.title} className=" object-cover size-[28px] lg:size-[38px]" />
                                    <span className='font-normal ml-2 lg:ml-3 text-nowrap'>{card.title}</span>
                                </p>

                                <button onClick={(e) => { e.stopPropagation(); setIsFilterVisible(!isFilterVisible); }} className="hover:bg-white/15 hover:ring-2 ring-white/80 flex items-center  bg-sky-blue-1 px-2 lg:px-4 py-1 lg:py-1.5 w-fit h-fit  text-nowrap transition-all duration-700 ease-in-out  cursor-pointer  text-[15px] font-normal rounded-sm max-lg:text-sm  text-white"><span className="mr-3"><img src='/Icons/filter.svg' className='lg:size-4 size-3 '></img></span>{isFilterVisible ? 'Hide Filters' : 'Show Filters'} </button>

                            </div>)}
                        </div>

                    </div>

                )}

            </div>


        </div>
    )
}