'use client'
import { playfair, rubik } from '@/app/fonts'
import React from 'react'
import LoaderIcon from '../generalComponents/LoaderIcon';
import { useState, useEffect, useRef } from 'react';


function BannerSection() {

    const [isBannerVideoLoaded, setIsBannerVideoLoaded] = useState(false)

    
      const videoRef = useRef(null);

      useEffect(() => {
        if (videoRef.current?.readyState >= 3) { 
          setIsBannerVideoLoaded(true);
        }
      }, []);

    return (
        // <div className=" w-full relative h-screen bg-center bg-cover bg-no-repeat"
        //     style={{ backgroundImage: "url('/images/cruise/banner.jpg')" }}
        // >
        //     <div className=" absolute inset-0 bg-black/20 flex flex-col  space-y-10 items-center lg:justify-center ">
        //         <h1 className={`${playfair.className} max-lg:mt-48 text-4xl md:text-6xl lg:text-7xl xl:text-[80px] text-white font-semibold`}>BlueTerra Cruise</h1>


        //     </div>


        // </div>

        <div className="w-full relative  h-screen">
            {!isBannerVideoLoaded && (
                <div className="absolute inset-0 w-full h-full flex-center bg-white"><LoaderIcon /></div>
            )}

            <video ref={videoRef} src="https://cdn.myblueterra.com/cruise-banner.mov"
                className=" w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                // onCanPlay={() => {
                //     console.log("Can play");
                //     setIsBannerVideoLoaded(true);
                // }}
            ></video>


            <div className=" w-full h-full absolute bg-black/10  inset-0 flex-center flex-col text-white ">
                <div className="flex-center flex-col space-y-5 lg:space-y-8 ">
                    <h1 className={` ${playfair.className}  ${isBannerVideoLoaded ? 'opacity-100 translate-y-0' : ' translate-y-5 opacity-0'} translate-all duration-700 ease-in-out text-3xl  max-md:px-5 text-center md:text-4xl lg:text-[60px] xl:text-[70px] 2xl:text-[80px] font-semibold `}>BlueTerra Cruise</h1>
                </div>
            </div>
        </div>

    )
}

export default BannerSection