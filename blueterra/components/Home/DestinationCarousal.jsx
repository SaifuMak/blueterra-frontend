
'use client'
import { CarouselApi } from "@/components/ui/carousel"

import { useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"

import { IoIosStar } from '../../components/reactIcons'
import { playfair, rubik, mrsSaint } from '@/app/fonts'

export default function DestinationCarousal({ Data, setCurrent = null, setCount = null, currentDestination }) {

    const [api, setApi] = useState()

    useEffect(() => {

        if (!api) {
            return
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })

    }, [api])


    return (
        <div className=" flex justify-center items-center flex-col  ">

            <div className="  w-full 2xl:px-10   flex-center ">
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                        draggable: false,

                    }}
                    plugins={[
                        Autoplay({
                            delay: 4000,
                            stopOnInteraction: false,
                            stopOnMouseEnter: true,
                        }),
                    ]}
                    className="w-full"
                >
                    <CarouselContent >

                        {Data?.map((destination, index) => (
                            <CarouselItem key={index} className="md:basis-1/2  2xl:p-3 pb-2 xl:basis-1/3    overflow-hidden  mx-0  flex-center">

                                <div key={index} className={`relative  rounded-2xl   w-[310px] xl:w-[310px] 2xl:w-[340px]  delay-200  overflow-hidden  transition-all duration-700 ease-in-out ${currentDestination === index ? 'max-h-[420px] xl:max-h-[450px] 2xl:h-[500px] ' : ' lg:max-h-[380px] xl:max-h-[400px] 2xl:max-h-[410px] 3xl:max-h-[610px]'}  `}>
                                    <div className=" relative w-[310px]  xl:w-[310px] 2xl:w-[340px] h-[420px] xl:h-[450px] 2xl:h-[500px] ">
                                        <Image
                                            src={destination.image}
                                            alt={destination.alt}
                                            fill
                                            className={`object-center  rounded-2xl `}
                                        />
                                    </div>
                                    <div className=" absolute cursor-pointer   h-[25vh] bottom-0    bg-gradient-to-t from-black/90 via-transparent  to-transparent flex justify-center items-end w-full  ">
                                        <p className={` ${rubik.className} pb-4 font-light `}>{destination.subTitle}</p>
                                    </div>
                                </div>

                            </CarouselItem>
                        ))}

                    </CarouselContent>
                    {/* <CarouselPrevious />
                    <CarouselNext /> */}
                </Carousel>
            </div>



        </div>
    )
}