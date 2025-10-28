

import React from 'react'
import { rubik, playfair } from '@/app/fonts'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'
import useGsapOpacity from '@/app/hooks/Gsap/useGsapOpacity'
import WhyChooseUsCard from './WhyChooseUsCard'

function WhyChooseUsSection() {

    const titleRef = useGsapFadeIn()
    const containerRef = useGsapOpacity()
    const tailRef = useGsapFadeIn()
    const cardRef = useGsapFadeIn()


    const WHY_CHOOSE_US = [
        {
            "title": "End to end ownership",
            "description": "We manage every step of the process from planning to delivery, ensuring smooth coordination and event delivery."
        },
        {
            "title": "Bespoke Personalized experiences",
            "description": "Each experience is designed around your specific goals and brand identity, delivering events that feel relevant and truly unique."
        }, {
            "title": "Organized and attention to detail",
            "description": "With clear planning and careful attention, we make sure every element is aligned, seamless, and delivered to the highest standards."
        },

    ]


    return (
        <div ref={containerRef} className=" flex w-11/12  overflow-hidden bg-cover bg-center bg-no-repeat  relative rounded-3xl items-center py-12 2xl:py-24 text-dark-28 flex-col "
            style={{
                backgroundImage: "url('/images/corporate/ban.jpg')",
            }}>
            <div className=" absolute inset-0  bg-white/70 z-0"></div>
            <h2 ref={titleRef} className={`  max-sm:text-2xl text-3xl z-20 lg:text-[36px]  xl:text-[45px]  2xl:text-[50px] ${playfair.className} font-medium `} >Why  Choose Us?</h2>

            {/* for mobile  */}
            <div className=" sm:hidden 2xl:w-10/12   xl:w-11/12 max-xl:px-5  mb-10  mt-10 2xl:mt-20  h-fit grid grid-cols-1 lg:grid-cols-3 md:gap-10 gap-5 2xl:gap-16">
                {WHY_CHOOSE_US?.map((data, index) => (
                    <WhyChooseUsCard key={index} data={data} index={index} />
                ))}
            </div>


            {/* for desktop  */}
            <div ref={cardRef} className=" max-sm:hidden  2xl:w-10/12   xl:w-11/12 max-xl:px-5  mb-10  mt-10 2xl:mt-20  h-fit grid grid-cols-1 lg:grid-cols-3 gap-10 2xl:gap-16">
                {WHY_CHOOSE_US?.map((data, index) => (
                    <div key={index} className=" z-30 transition-all duration-500 ease-in-out  cursor-pointer hover:bg-light-beige bg-light-beige/80 max-sm:p-4  md:py-5 xl:py-10 text-lg xl:text-xl  2xl:text-[22px] font-light md:px-5  xl:px-10 rounded-2xl w-full   flex flex-col " style={{ boxShadow: '0 0 25px 1px rgba(50, 70, 70, 0.1)' }}
                    >
                        <h3 className="   text-dark-28 lg:text-lg 2xl:text-xl font-medium ">{data.title}</h3>
                        <p className=" mt-3  text-base xl:text-lg 2xl:text-xl leading-8">{data.description}</p>
                    </div>
                ))}
            </div>

            <p ref={tailRef} className="  xl:text-xl   font-medium z-50 2xl:text-2xl xl:mt-5 2xl:mt-8">Afterall, you can truly TRUST us.</p>
        </div>
    )
}

export default WhyChooseUsSection