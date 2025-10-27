'use client'
import { useState } from 'react'
import Image from 'next/image'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'
import useGsapOpacity from '@/app/hooks/Gsap/useGsapOpacity'

function InfoCards({ data }) {

    const infoCardRef = useGsapFadeIn()
    const [touched, setTouched] = useState(false);

    return (
        <div
            ref={infoCardRef}
            onTouchStart={() => setTouched(true)}
            onTouchEnd={() => setTouched(false)}

            className="group relative h-[250px] xl:h-[290px] 2xl:h-[320px]  w-full rounded-2xl overflow-hidden"
        >
            {data?.img && <Image
                src={data?.img}
                alt="quote"
                fill
                priority
                className="absolute inset-0  object-cover rounded-2xl p-0.5 overflow-hidden w-full h-full z-0"
            />}

            <div className={` ${touched ? 'opacity-0' : 'opacity-100'} absolute inset-0 bg-light-beige z-10 transition-all duration-1000 ease-in-out group-hover:opacity-0`} />

            {/* Text Layer (stays clearly visible) */}
            <div className={`relative z-20 h-full w-full flex flex-col items-center  rounded-2xl justify-center ${touched && 'bg-black/40'}  transition-color duration-1000 ease-in-out group-hover:bg-black/40 text-center xl:text-lg 2xl:text-xl font-light px-4 2xl:px-8`}>
                <h5 className={`font-medium ${touched && 'text-white'} group-hover:text-white transition-color duration-1000 ease-in-out `}>{data.title}</h5>
                <p className={`mt-3 ${touched ? 'opacity-0' : 'opacity-100'} group-hover:opacity-0 transition-all  duration-700 ease-in-out 2xl:leading-8`}>{data.description}</p>
            </div>
        </div>
    )
}

export default InfoCards