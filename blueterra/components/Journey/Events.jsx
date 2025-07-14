import React from 'react'
import Image from 'next/image'

import { playfair, rubik, } from '@/app/fonts'
const Events = ({ firstTitle, secondTitle, description, firstPara, secondPara, imageUrl }) => {

    return (

        <>
            <div className=" xl:w-10/12 w-11/12 justify-between space-x-10 h-full items-center flex  max-sm:hidden  ">

                <div className="  flex flex-col  h-fit   xl:space-y-4 ">
                    <h3 className={`${playfair.className} text-4xl xl:text-5xl font-medium`}>{firstTitle}</h3>
                    <h3 className={`${playfair.className} text-4xl xl:text-5xl font-medium`}>{secondTitle}</h3>
                    <p className="2xl:w-5/12 xl:w-9/12  xl:leading-10 font-light text-lg xl:text-xl mt-5">{description}</p>
                </div>

                <div className=" space-y-5  md:text-base lg:text-xl xl:text-2xl 2xl:text-[29px] w-6/12 font-light xl:leading-9 2xl:leading-10">
                    <p className="">{firstPara}</p>
                    <p className="">{secondPara}</p>
                </div>

                <div className=" w-4/12 flex justify-end h-fit ">
                    <div className=" w-[400px] md:h-[380px] lg:h-[480px] xl:h-[550px] 2xl:h-[600px] relative rounded-3xl overflow-hidden">
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


            <div className=" md:hidden text-center w-11/12 flex flex-col  ">

                <div className="  flex flex-col  text-2xl font-medium  ">
                    <h3 className={`${playfair.className} `}>{firstTitle} {secondTitle}</h3>
                    <p className=" font-light mt-3 text-lg">{description}</p>
                </div>

                <div className=" space-y-2 text-sm font-light mt-5">
                    <p className="">{firstPara}</p>
                    <p className="">{secondPara}</p>
                </div>

                <div className=" w-full mt-4 h-full">
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