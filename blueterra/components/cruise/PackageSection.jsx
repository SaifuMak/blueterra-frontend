import { playfair } from '@/app/fonts'
import React from 'react'
import TitleText from '../generalComponents/TitleText'
import Button from '../generalComponents/Button'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'
import useGsapOpacity from '@/app/hooks/Gsap/useGsapOpacity'

function PackageSection() {
    const container = useGsapOpacity(0, { start: 'top 70%' })
    return (
        <div className=" w-full  relative  mb-10 min-h-[80vh] bg-center bg-cover bg-no-repeat flex justify-center items-center "
            style={{ backgroundImage: "url('/images/cruise/man-on-hills.png')" }}
        >
                <div ref={container} className=" overflow-hidden flex flex-col max-lg:my-10 lg:max-w-10/12 max-w-11/12  text-center text-white  rounded-2xl border border-white/20 bg-white/1 backdrop-blur-2xl py-10 lg:py-16 xl:py-20  lg:px-32 md:px-12 px-6  space-y-6                      xl:space-y-8 justify-center items-center">
                    <div className=" bg-[#026E9E] w-fit px-7 py-2 text-sm lg:text-base 2xl:text-xl  rounded-sm font-semibold  ">347 Deals</div>
                    <TitleText text='Value Inclusive Packages' className='text-white' />

                    <p className=" lg:text-xl md:text-lg 2xl:text-2xl mt-1 font-light xl:max-w-10/12 2xl:max-w-9/12   leading-8 lg:leading-9 2xl:leading-11 ">We pair the world's most popular cruises with a 4-star or higher, city center hotel stay in your arrival or
                        departure port (or both), so you can spend time at leisure exploring your destination. Packages also include flights,
                        transfers, taxes and daily breakfast at your hotel-plus exclusive extras you can only find at Online Vacation Center</p>

              <Button text='EXPLORE MORE' buttonStyle={`  max-lg:text-sm px-6 lg:px-8 xl:px-12 py-2 lg:py-2.5 `} />

                </div>

        </div>
    )
}

export default PackageSection