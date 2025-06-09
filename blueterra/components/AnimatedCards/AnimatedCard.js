'use client'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Image from 'next/image';


export default function AnimatedCard({ card, onClick, isExpanded }) {

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
                    <div className='bg-[#104F82D9]/80 absolute inset-0 px-20 '>
                        <div className='mt-20 '>
                            <p className='  text-white text-5xl '>{card.number} <span className='font-medium ml-3'>{card.tagline}</span></p>
                            <hr className=' opacity-40 mt-5'></hr>
                        </div>
                    </div>

                )}




            </div>
        </div>
    )
}