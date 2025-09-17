import React from 'react'
import Image from 'next/image'

import { playfair, rubik, } from '@/app/fonts'
import useGsapFadeIn from '@/app/hooks/Gsap/useGsapFadeIn'
import useGsapOpacity from '@/app/hooks/Gsap/useGsapOpacity'


const Events = ({ firstTitle, secondTitle, description, firstPara, secondPara, imageUrl, outerClass = '', isDescriptionBold = false }) => {

    const imageRef = useGsapOpacity(0, { start: 'top 70%' })


    return (

        <>
            <div className={`  xl:w-10/12 w-11/12 justify-between space-x-10 h-full items-center flex  max-sm:hidden`}   >

                <div className=" vertically-animated-element flex flex-col  h-fit   xl:space-y-4 ">
                    <h3 className={`${playfair.className} text-4xl xl:text-5xl font-medium`}>{firstTitle}</h3>
                    <h3 className={`${playfair.className} text-4xl xl:text-5xl font-medium`}>{secondTitle}</h3>
                    <p className={`2xl:w-8/12 xl:w-10/12 ${isDescriptionBold ? 'font-normal' : 'font-normal'} italic   xl:leading-10  tracking-wide text-lg xl:text-xl mt-5`}>{description}</p>
                </div>

                {/* <div className=" vertically-animated-element space-y-5  md:text-base lg:text-xl xl:text-2xl 2xl:text-[25px] w-6/12 font-light xl:leading-9 2xl:leading-11"> */}
                <div className=" vertically-animated-element space-y-5  md:text-lg 2xl:text-[25px] w-6/12 font-light xl:leading-8 2xl:leading-11">

                    <p className="">{firstPara}</p>
                    <p className="">{secondPara}</p>
                </div>

                <div className="  w-4/12 flex justify-end h-fit ">
                    <div ref={imageRef} className=" w-[400px] md:h-[380px] lg:h-[480px] xl:h-[550px] 2xl:h-[600px] relative rounded-3xl overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt='quote'
                            fill
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>


            <div className={`${outerClass} md:hidden text-center w-11/12 flex flex-col`}   >

                <div className=" vertically-animated-element  flex flex-col px-2  text-2xl font-medium  ">
                    <h3 className={`${playfair.className} `}>{firstTitle} {secondTitle}</h3>
                    <p className=" font-light mt-3 text-lg">{description}</p>
                </div>

                <div className=" vertically-animated-element space-y-2 text-sm font-light px-2 mt-5">
                    <p className="">{firstPara}</p>
                    <p className="">{secondPara}</p>
                </div>

                <div className=" vertically-animated-element w-full mt-4 h-full">
                    <div className=" w-full h-[300px] relative rounded-3xl overflow-hidden ">
                        <Image
                            src={imageUrl}
                            alt='quote'
                            fill
                            priority
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Events