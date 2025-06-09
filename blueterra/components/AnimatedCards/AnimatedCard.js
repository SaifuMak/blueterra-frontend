'use client'
import { useRef, useEffect } from 'react';
import gsap, { Power0 } from 'gsap';
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
        <div ref={cardRef} onClick={onClick} className={`flex-1  h-[700px]  relative cursor-pointer  overflow-hidden  text-white text-3xl   `} style={{ backgroundColor: card.color }}>{card.title}


            <div className='overflow-hidden'>

                <Image
                    src={card.image}
                    fill
                    // style={{  objectPosition:'center'}}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                />

                <div className=' absolute inset-0  bg-[#00284680]/50'>
                    {/* <div className='p-4  w-12 ml-2   h-[500px] flex flex-col  items-center  text-white   '>
                        <span className='text-3xl text-left '>{card.title}</span>
                        <div className='w-px flex-1 ml-1 my-4  bg-white'></div>
                        <p className=' rotate-90  text-nowrap'>Mindful Escapes</p>
                    </div> */}

                    <div className='flex ml-3 mt-3   text-white items-center'>
                        <span className='text-3xl'>{card.title}</span>
                         
                    </div>
                </div>



            </div>
        </div>
    )
}