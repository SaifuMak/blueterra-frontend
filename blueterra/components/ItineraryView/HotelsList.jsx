
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


export default function HotelsList({HotelsData, setCurrent, setCount}) {

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
        <div className=" flex-center ">

            <div className="  w-full  flex-center">
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 4000,
                            stopOnInteraction: false,
                            stopOnMouseEnter: true,
                        }),
                    ]}
                    className="w-full "
                >
                    <CarouselContent>

                        {HotelsData?.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 2xl:p-3 pb-2 xl:basis-1/3 flex-center">

                                <div className="  mx-4 lg:mx-2">
                                    <div className=" relative h-[200px]  md:h-[250px] 2xl:h-[300px] w-full">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                        />
                                    </div>

                                    <div className=" px-2">

                                        <div className="flex mt-2 items-center justify-between">
                                            <h3 className="font-medium text-xl xl:text-2xl">{item.title}</h3>
                                            <div className="flex space-x-1">
                                                {[...Array(5)].map((_, ind) => (
                                                    <IoIosStar key={ind} className="fill-[#FFCB1F]" />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="">
                                            <p className=" xl:text-lg text-[#6E6E6E]">{item.subtitle}</p>
                                        </div>

                                        <div className="mt-2">
                                            <p className=" font-light">
                                               
                                                Donec malesuada, sapien nec interdum facilisis, tortor leo volutpat neque,
                                                in ultrices eros arcu at purus. Curabitur at augue sed met commodo gravida. Donec malesu Read more...
                                            </p>
                                        </div>

                                        <button className=" bg-[#2670B8] cursor-pointer rounded-sm w-full py-2 mt-2 text-white">VIEW ON MAP</button>

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