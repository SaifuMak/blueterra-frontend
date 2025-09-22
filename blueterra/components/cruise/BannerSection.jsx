import { playfair } from '@/app/fonts'
import React from 'react'



function BannerSection() {
    return (
        <div className=" w-full relative h-screen bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: "url('/images/cruise/banner.jpg')" }}
        >
            <div className=" absolute inset-0 bg-black/20 flex  lg:items-center justify-center ">
                <h1 className={`${playfair.className} max-lg:mt-48 text-4xl md:text-6xl lg:text-7xl xl:text-[80px] text-white font-semibold`}>BlueTerra Cruise</h1>
            </div>

        </div>

    )
}

export default BannerSection