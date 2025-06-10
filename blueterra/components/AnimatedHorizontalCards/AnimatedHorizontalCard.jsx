'use client'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { GoDot } from '../reactIcons'


export default function AnimatedHorizontalCard({ card, onClick, isExpanded }) {

    const cardRef = useRef(null)

    useEffect(() => {

        if (cardRef.current) {
            ease: 'elastic.out(1, 0.5)'
            gsap.to(cardRef.current, {
                flex: isExpanded ? 6 : 1,
                duration: 0.7,
                // ease: 'elastic.out(0.1, 0.1)'
                ease: 'Power3.out'
                // ease: 'circ.out'
                // ease: 'elastic.out(0.01  , 0.01)'
            })
        }

    }, [isExpanded])

    return (
        <div ref={cardRef} onClick={onClick} className={`flex-1 h-screen relative cursor-pointer  overflow-hidden  text-white text-3xl   `} >{card.title}


            <div className='overflow-hidden'>

                <Image
                    src={card.image}
                    fill
                    // style={{  objectPosition:'center'}}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                />

                {!isExpanded ? (
                    <div className=' absolute inset-0  bg-[#00284680]/50'>

                        <div className={`flex mt-3 w-8 ml-6 h-[95vh] text-white flex-col items-center `}>
                            <span className="text-4xl font-normal">{card.number}</span>

                            <div className="bg-white/40 w-0.5 flex-1 my-3"></div>

                            <p className=" rotate-180 text-3xl tracking-wide [writing-mode:vertical-rl]">
                                {card.tagline}
                            </p>
                        </div>

                    </div>
                ) : (
                    <div className='bg-[#104F82D9]/80 absolute inset-0 2xl:px-20 lg:px-10 px-4  '>

                        <div className="2xl:w-[900px] xl:w-[800px] lg:w-[500px] w-[400px] xl:text-lg text-base font-light">

                            <div className='2xl:mt-20 mt-12'>
                                <p className='  text-white text-4xl lg:text-5xl '>{card.number} <span className='font-medium ml-3'>{card.tagline}</span></p>
                                <hr className=' opacity-40 mt-5'></hr>
                            </div>

                            <div className="w-full mt-10 space-y-6 xl:space-y-10 ">
                                <h3 className=" text-3xl font-medium">Popular Journeys</h3>

                                <div className="flex  space-x-6">
                                    {["Dubai", "Thailand", "Kenya", "Maldives", "Iceland"].map((destination, index) => (
                                        <div key={index} className="  flex  bor-b ">
                                            <span className="">{destination}</span></div>
                                    ))}
                                </div>
                                <p className="  w-9/12 leading-relaxed ">Our Signature Journeys are the essence of what we do—thoughtfully curated travel experiences that reflect our passion for conscious exploration, cultural connection, and sustainable luxury.</p>

                                <div className="  space-y-3 h-[190px] w-9/12 p-0 flex flex-col flex-wrap ">
                                    {["Adventure & Exploration", "Luxury Escapes", "Romantic Getaways", "Cultural Immersion", "Historical Journeys", "Gastronomic Trails", "Nature & Wildlife Expeditions", "Safari Experiences", "Polar & Arctic Journeys",].map((feature) => (
                                        <div className=" text-white flex items-center">  <img src="/Icons/dot.svg" alt="dot" className="w-2.5 h-2.5" /> <p className=" ml-3">{feature}</p></div>
                                    ))}
                                </div>

                                <button className=" w-[250px]    py-2 font-medium  rounded-full bg-white/90  text-brand-blue">VIEW ALL</button>
                            </div>

                        </div>

                    </div>

                )}




            </div>
        </div>
    )
}