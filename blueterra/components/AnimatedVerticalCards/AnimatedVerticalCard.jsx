'use client'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { GoDot } from '../reactIcons'


export default function AnimatedVerticalCard({ card, onClick, isExpanded, isFullCardVisible, handleHideFullCard, setIsLoading, isLoading, setIsFilterVisible }) {

    const cardRef = useRef(null)

    useEffect(() => {
        console.log(isFullCardVisible, 'status of full card ')

        if (cardRef.current) {
            // ease: 'elastic.out(1, 0.5)'
            gsap.to(cardRef.current, {
                flex: isExpanded ? 6 : 1,
                height: isFullCardVisible ? '100vh' : '50px',
                duration: 0.7,
                // ease: 'elastic.out(0.1, 0.1)'
                ease: 'Power3.out'
                // ease: 'circ.out'
                // ease: 'elastic.out(0.01  , 0.01)'
            })
        }

    }, [isExpanded, isFullCardVisible])



    return (
        <div ref={cardRef} onClick={onClick} className={`flex-1 h-[100vh] ${!isExpanded ? 'cursor-pointer' : 'cursor-default'}  relative   overflow-hidden bg-stone-50  text-white text-3xl   `} >
            {card.title}

            <div className='overflow-hidden relative w-full h-full  '>

                <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    priority={true}
                    sizes="(max-width: 368px) 100vw, (max-width: 400px) 50vw, 33vw"
                    // style={{  objectPosition:'center'}}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    onLoad={() => setIsLoading(false)}
                />

                {/* expanded horizontally */}
                {!isExpanded ? (
                    <div className='absolute inset-0  bg-[#00284680]/50'>
                        {/* vertical full card */}
                        {isFullCardVisible ? (

                            <div className={`flex mt-3 w-8 ml-6 h-[85vh] text-white flex-col items-center `}>

                                <span className="text-4xl font-normal">{card.number}</span>

                                <div className="bg-white/40 w-0.5 flex-1 my-3"></div>

                                <p className=" rotate-180 text-3xl tracking-wide [writing-mode:vertical-rl]">
                                    {card.tagline}
                                </p>
                            </div>

                        ) : (

                            <div className=" flex-center h-full ">
                                <span className="text-2xl font-normal">{card.number}</span>
                            </div>
                        )}

                    </div>
                ) : (
                    <div className='bg-[#104F82D9]/80 absolute inset-0 2xl:px-20 lg:px-10 px-4  '>


                        <div className="2xl:w-[700px] xl:w-[700px] lg:w-[500px]  h-full  w-[400px] 2xl:text-lg text-base font-light">

                            {isFullCardVisible && <div className='2xl:mt-12 mt-4'>
                                <p className='  text-white text-4xl 2xl:text-5xl '>{card.number} <span className='font-medium ml-3'>{card.tagline}</span></p>
                                <hr className=' opacity-40 mt-5'></hr>
                            </div>}

                            {isFullCardVisible && <div className="w-full 2xl:mt-10 mt-5 space-y-6 xl:space-y-10 ">
                                <h3 className=" text-2xl 2xl:text-3xl font-medium">Popular Journeys</h3>

                                <div className="flex  space-x-6">
                                    {["Dubai", "Thailand", "Kenya", "Maldives", "Iceland"].map((destination, index) => (
                                        <div key={index} className="  flex  bor-b ">
                                            <span className="">{destination}</span></div>
                                    ))}
                                </div>
                                
                                <p className="  w-9/12 leading-relaxed ">Our Signature Journeys are the essence of what we do—thoughtfully curated travel experiences that reflect our passion for conscious exploration, cultural connection, and sustainable luxury.</p>

                                <div className="space-y-3 h-[190px] w-9/12 p-0 flex flex-col flex-wrap ">
                                    {["Adventure & Exploration", "Luxury Escapes", "Romantic Getaways", "Cultural Immersion", "Historical Journeys", "Gastronomic Trails", "Nature & Wildlife Expeditions", "Safari Experiences", "Polar & Arctic Journeys",].map((feature, index) => (
                                        <div key={index} className=" text-white flex items-center">  <img src="/Icons/dot.svg" alt="dot" className="w-2.5 h-2.5" /> <p className=" ml-3">{feature}</p></div>
                                    ))}
                                </div>

                                <button onClick={(e) => { e.stopPropagation(); handleHideFullCard(); }} className=" w-[250px] cursor-pointer    py-2 font-medium  rounded-full bg-white/90  text-brand-blue">VIEW ALL</button>
                            </div>}

                            {!isFullCardVisible && (<div className=" absolute  bottom-2 w-10/12 flex items-center justify-between ">
                                <p className='  text-white text-2xl lg:text-2xl font-extralight '>{card.number} <span className='font-medium ml-3'>{card.tagline}</span></p>
                                <button onClick={(e) => { e.stopPropagation(); setIsFilterVisible(true); }} className=" px-2 cursor-pointer flex-end text-sm py-1 border-2 border-white/60 rounded-full flex justify-between items-center  "> <span className="mr-3"><img src='/Icons/filter.svg' className='w-3.5 h-3.5 '></img></span>Show Filters</button>
                            </div>)}
                        </div>

                    </div>

                )}

            </div>


        </div>
    )
}