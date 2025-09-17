import React from 'react'
import Button from '../generalComponents/Button'
import { playfair } from "@/app/fonts"
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'

function PlanWithUsSection({setFormOpen}) {

     const planWithUsContainer = useGsapFadeIn(0,{start : "top 90%"})

    return (
        <div
            className="w-full  lg:min-h-[50vh] min-h-[40vh]   bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center  overflow-hidden relative"
            style={{
                backgroundImage: "url('/images/our-story/yellow-banner.png')",
            }}
        >

            <div ref={planWithUsContainer} className="lg:w-8/12 md:w-10/12 space-y-5  lg:space-y-10   text-center h-auto flex-col text-dark-28  flex-center">
                <h3 className={`xl:text-[50px] lg:text-4xl text-2xl  font-medium  antialiased  text-dark-4B text-center  ${playfair.className}`}>Let’s Design Your Journey Together</h3>
                <p className=" xl:text-2xl lg:text-xl font-light leading-7 lg:leading-9   w-11/12 lg:w-5/6 ">
                    Every journey is unique. Speak with your BlueTerra advisor to customize this experience
                </p>
                <Button text='START PLANNING' buttonStyle={`  transition-all duration-500  ease-in-out font-light  max-md:text-sm px-4 lg:px-6 xl:px-12 py-1.5 xl:py-2.5 `} isHoverWhiteApplied={false} onClickFunction={() => setFormOpen(true)} />

            </div>
        </div>
    )
}

export default PlanWithUsSection