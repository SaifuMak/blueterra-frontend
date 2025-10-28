import React from 'react'
import { playfair } from '@/app/fonts'
import Image from 'next/image'
import Button from '../generalComponents/Button'


function PlanningSection({ handleNavigateToContactForm }) {
    return (

        <div
            className=" w-full h-full py-12 2xl:py-16  bg-cover bg-center bg-no-repeat "
            style={{ backgroundImage: "url('/images/corporate/paper-background.png')" }}
        >

            <div className=" w-full max-sm:px-2  text-center space-y-4 lg:space-y-4 2xl:space-y-7   h-full text-dark-28  flex flex-col justify-center items-center">
                <h2 className={`${playfair.className} font-medium vertically-animated-element max-sm:px-2  md:w-10/12 text-dark-4B text-2xl md:text-4xl xl:text-[45px]  2xl:text-[50px]`}>Planning an event that should inspire, connect and deliver results? </h2>

                <p className=" vertically-animated-element md:text-xl xl:text-2xl font-light  xl:leading-10 w-11/12  md:w-9/12 xl:w-8/12 2xl:w-6/12 md:px-10  ">Every great event begins with a conversation. Get in touch with us and let’s create an experience that truly matters</p>
                <Button text='GET IN TOUCH' buttonStyle={` transition-all vertically-animated-element duration-500 mt-3 md:mt-5 xl:mt-2  ease-in-out font-medium max-sm:text-xs max-md:text-sm px-4 lg:px-6 xl:px-16 py-1.5 xl:py-2.5 `} isHoverWhiteApplied={false} onClickFunction={handleNavigateToContactForm} />
            </div>
        </div>
    )
}

export default PlanningSection