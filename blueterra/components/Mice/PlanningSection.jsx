import React from 'react'
import {playfair} from '@/app/fonts'
import Image from 'next/image'
import Button from '../generalComponents/Button'

function PlanningSection({handleNavigateToContactForm}) {
    return (
        <div className=" xl:min-h-[45vh] md:min-h-[40vh] h-[35vh] w-full   relative ">

            <Image
                src='/images/corporate/paper-background.png'
                alt='quote'
                fill
                priority
                style={{ objectFit: 'cover' }}
            />

            <div className=" w-full max-sm:px-2  absolute inset-0 text-center space-y-2 lg:space-y-4 2xl:space-y-7   h-full text-dark-28  flex flex-col justify-center items-center">
                <p className=" vertically-animated-element md:text-2xl xl:text-3xl font-light  md:leading-10 w-11/12  md:w-9/12 xl:w-8/12 2xl:w-6/12 md:px-10  ">If you’re ready to bring beautiful, unforgettable events to life, contact us today</p>
                <h3 className={`${playfair.className} font-medium vertically-animated-element max-sm:px-2  text-dark-4B text-xl md:text-4xl  xl:text-[50px]`}>Let’s start planning your perfect experience.</h3>
                <Button text='CONTACT US' buttonStyle={` transition-all vertically-animated-element duration-500 mt-3 md:mt-5 xl:mt-2  ease-in-out font-medium max-sm:text-xs max-md:text-sm px-4 lg:px-6 xl:px-16 py-1.5 xl:py-2.5 `} isHoverWhiteApplied={false} onClickFunction={handleNavigateToContactForm} />
            </div>
        </div>

    )
}

export default PlanningSection