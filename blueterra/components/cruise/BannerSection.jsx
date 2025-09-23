import { playfair } from '@/app/fonts'
import React from 'react'



function BannerSection() {
    return (
        <div className=" w-full relative h-screen bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: "url('/images/cruise/banner.jpg')" }}
        >
            <div className=" absolute inset-0 bg-black/20 flex flex-col  space-y-10 items-center lg:justify-center ">
                <h1 className={`${playfair.className} max-lg:mt-48 text-4xl md:text-6xl lg:text-7xl xl:text-[80px] text-white font-semibold`}>BlueTerra Cruise</h1>
                <div className=" w-10/12  h-[400px] py-5 flex-center rounded-2xl  overflow-hidden bg-white">
                <div className=" w-full  h-full  rounded-2xl ">
                    <iframe
                        title="Zoho Form"
                        src="https://forms.zohopublic.com/blueterra/form/Sendusadirectmessage/formperma/LH1SC9iQKsMbkmNpCxnvw8TsFKPf79BaLG-GgDCVlFw"
                        frameBorder="0"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        allowFullScreen
                    />
                </div>
                </div>

            </div>


        </div>

    )
}

export default BannerSection