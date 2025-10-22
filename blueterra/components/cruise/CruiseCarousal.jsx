
'use client'
import { CarouselApi } from "@/components/ui/carousel"
import Link from "next/link";

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

export default function CruiseCarousal({ logos, setCurrent, setCount }) {

    const [api, setApi] = useState()


    useEffect(() => {

        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })

    }, [api])



    return (
        <div className=" flex justify-center items-center flex-col  ">

            <div className="  w-full  max-sm:px-4    flex-center ">
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnInteraction: false,
                            // stopOnMouseEnter: true,
                        }),
                    ]}
                    className="w-full"
                >
                    <CarouselContent className=' '>
                        {logos.map((pair, index) => (
                            <CarouselItem key={index} className=" md:basis-1/2 gap-0 pl-0 lg:basis-1/4  flex-center">
                                <div className="   overflow-hidden flex flex-col w-full 2xl:h-[430px] xl:h-[410px] md:h-[320px]">
                                    {/* Top Section */}
                                    <div className={`h-1/2 ${index % 2 === 1 ? 'bg-sky-blue-light' : 'bg-white'}  flex py-3 lg:py-6 xl:py-8 items-center justify-center `}>

                                        <img src={pair[0]?.imageLink} alt={pair[0]?.name} className=" object-contain md:size-44 size-32 lg:size-32 xl:size-36 2xl:size-48" />
                                    </div>
                                    {/* Bottom Section */}
                                    <div className={`h-1/2 ${index % 2 === 0 ? 'bg-sky-blue-light' : 'bg-white'}  flex py-3 lg:py-6 xl:py-8 items-center justify-center`}>
                                        <img src={pair[1]?.imageLink} alt={pair[1]?.name} className="object-contain 2xl:size-48 xl:size-36 lg:size-32 md:size-44 size-32" />
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