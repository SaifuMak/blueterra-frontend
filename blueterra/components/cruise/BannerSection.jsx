'use client'
import { playfair, rubik } from '@/app/fonts'
import React from 'react'
import LoaderIcon from '../generalComponents/LoaderIcon';
import { useState, useEffect, useRef } from 'react';
import CruiseWidget from './CruiseWidget';

function BannerSection({isMobile}) {

    const [isBannerVideoLoaded, setIsBannerVideoLoaded] = useState(false)

    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current?.readyState >= 3) {
            setIsBannerVideoLoaded(true);
        }
    }, []);


    return (

        <div className="w-full relative min-h-screen  ">
            {!isBannerVideoLoaded && (
                <div className="absolute inset-0 w-full min-h-screen flex-center bg-white"><LoaderIcon /></div>
            )}

            <video ref={videoRef} src="https://cdn.myblueterra.com/cruise-banner.mov"
                className=" w-full min-h-screen object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onCanPlay={() => {
                    console.log("Can play");
                    setIsBannerVideoLoaded(true);
                }}
                onError={(e) => console.error("Video error", e)}
            ></video>


            <div className=" w-full h-auto absolute bg-black/10  inset-0 flex-center flex-col text-white ">
                <div className="flex-center flex-col space-y-5 lg:space-y-8 mt-10 overflow-x-hidden ">
                    <h1 className={` ${playfair.className}  ${isBannerVideoLoaded ? 'opacity-100 translate-y-0' : ' translate-y-5 opacity-0'} translate-all duration-700 ease-in-out text-3xl  max-md:px-5 text-center md:text-4xl lg:text-[60px] xl:text-[70px] 2xl:text-[80px] font-semibold `}>BlueTerra Cruise</h1>
                    <div className=" max-w-11/12   border no-scroll-bar   max-lg:max-h-[80vh]  max-lg:h-full overflow-y-auto lg:max-w-10/12 sm:p-2 rounded-2xl "
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }} data-lenis-prevent >
                        <CruiseWidget />
                    </div>
                </div>
            </div>
        </div>
//  {...( isMobile ? { 'data-lenis-prevent': true } : {})}
    )
}

export default BannerSection