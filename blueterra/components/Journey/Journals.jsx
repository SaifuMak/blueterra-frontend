
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

import SmoothScroll from "../SmoothScroll";

export default function Journals({ Data, setCurrent, setCount }) {

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

            <div className="  w-full md:px-10   flex-center ">
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

                        {Data?.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1  flex-center ">

                                <div className=" relative group cursor-pointer w-[100%] h-[65vh] rounded-2xl overflow-hidden">

                                    <Image
                                        src={item.image}
                                        alt={item.alt}
                                        fill
                                        className=" object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out"
                                    />

                                    <div className="  text-white absolute   flex flex-col justify-between inset-0 bg-gradient-to-t from-black/0 to-transparent">

                                        <div className=" flex  space-x-3">
                                            {Data?.map((_, index) => (
                                                <div key={index} className=" h-2 w-10 bg-white"></div>
                                            ))}
                                        </div>
                                        <div className=" bg-black/20 px-10 space-y-5 ">
                                            <div className=" space-y-5">
                                                <h2 className=" text-[30px] font-medium">{item.title}</h2>
                                                <p className=" text-xl font-light">{item.description}</p>
                                            </div>
                                            <div className=" flex items-center font-light justify-between">
                                                <div className="">
                                                    <p className="">{item.date}</p>
                                                </div>
                                                <div className="">
                                                    <p className="">Read More</p>
                                                </div>
                                            </div>
                                        </div>
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