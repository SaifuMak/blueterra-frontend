import React from 'react'
import ResponsiveClipPath from '../generalComponents/ResponsiveClipPath'
import {playfair} from '@/app/fonts'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'

function WelcomeNoteSection() {

    const contentRef = useGsapFadeIn()
    return (
        <div className=" w-full py-12 lg:py-32  h-full max-sm:py-12 flex-center  bg-light-beige relative">

            <ResponsiveClipPath
                outerClass='absolute md:w-[18%] w-[45%] left-0  top-12 h-fit'
                ImagePath='/images/corporate/patterns/welcome-left.png'
                width={600}
            />

            <div ref={contentRef} className="  space-y-5 xl:space-y-4 2xl:space-y-8 max-sm:text-sm text-xl font-light text-dark-28  h-full flex-col 2xl:w-8/12 xl:w-11/12  flex justify-center items-center ">
                <h2 className={`${playfair.className}  text-3xl  md:text-5xl xl:text-6xl 2xl:text-7xl font-semibold text-dark-4B`}>
                     {/* <span className=" text-xl font-light  mr-1">At</span> */}
                    BlueTerra</h2>
                <p className="xl:w-7/12  w-10/12 text-center leading-6 md:leading-8 xl:leading-9">we craft experiences that inspire, connect, and endure.</p>

                <p className="  xl:w-9/12 w-10/12 text-center leading-6 md:leading-8 xl:leading-10">Whether you are bringing together a global team to shape strategy, celebrating a milestone that deserves the extraordinary, or hosting a leadership retreat in a distinctive setting, every detail is delivered with precision and purpose.</p>
                <p className=" xl:w-9/12  w-10/12  text-center leading-6 md:leading-8 xl:leading-10">Flawless execution requires more than coordination. It demands complete ownership. With BlueTerra, every moment and every milestone is managed seamlessly by a team of experts committed to excellence</p>

                <p className=" xl:w-9/12 w-10/12 xl:text-2xl text-center italic  md:leading-10">We don’t just execute. We own it. Every moment. Every milestone.</p>

            </div>

        </div>
    )
}

export default WelcomeNoteSection