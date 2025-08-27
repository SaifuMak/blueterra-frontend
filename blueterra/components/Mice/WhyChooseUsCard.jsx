import React from 'react'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'
import useGsapOpacity from '@/app/hooks/Gsap/useGsapOpacity'

function WhyChooseUsCard({ data, index }) {
    const cardRef = useGsapFadeIn({ initialPosition: 0, duration: 0.2, start: 'top 90%' })
    return (
        <div ref={cardRef} className=" z-30   cursor-pointer bg-light-beige max-sm:p-4  md:py-5 xl:py-10 text-lg xl:text-xl  2xl:text-[22px] font-light md:px-5  xl:px-10 rounded-2xl w-full   flex flex-col " style={{ boxShadow: '0 0 25px 1px rgba(50, 70, 70, 0.1)' }}
        >
            <h5 className="  text-dark-4B font-medium ">{data.title}</h5>
            <p className=" mt-3  text-base xl:text-lg 2xl:text-xl leading-8">{data.description}</p>
        </div>
    )
}

export default WhyChooseUsCard