import React from 'react'
import Image from 'next/image'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'
import useGsapOpacity from '@/app/hooks/Gsap/useGsapOpacity'

function InfoCards({data}) {

    const infoCardRef = useGsapFadeIn()

    return (
        <div
        ref={infoCardRef}
          
            className="group relative h-[250px] 2xl:h-[280px] w-full rounded-2xl overflow-hidden"
        >
            <Image
                src="/images/corporate/banner.png"
                alt="quote"
                fill
                priority
                className="absolute inset-0  object-cover rounded-2xl p-0.5 overflow-hidden w-full h-full z-0"
            />

            <div className="absolute inset-0 bg-light-beige z-10 transition-all duration-1000 ease-in-out group-hover:opacity-0" />

            {/* Text Layer (stays clearly visible) */}
            <div className="relative z-20 h-full w-full flex flex-col items-center rounded-2xl justify-center transition-all duration-1000 ease-in-out group-hover:bg-black/40 group-hover:text-white text-center text-lg 2xl:text-xl font-light px-4 2xl:px-10">
                <h5 className="font-medium xl:mt-6 2xl:mt-10">{data.title}</h5>
                <p className="mt-3 group-hover:opacity-0 transition-all duration-700 ease-in-out 2xl:leading-8">{data.description}</p>
            </div>
        </div>
    )
}

export default InfoCards