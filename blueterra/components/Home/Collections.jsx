
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

export default function CollectionsList({ Data, setCurrent, setCount }) {

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
                            <CarouselItem key={index} className="md:basis-1/2 2xl:p-3 pb-2 lg:basis-1/3  mx-0  flex-center ">

                                <div className=" relative group cursor-pointer w-[370px]  xl:w-[470px] 2xl:h-[700px] xl:h-[600px] md:h-[480px] h-[410px] rounded-2xl overflow-hidden">

                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className=" object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out"
                                    />

                                    {/* <div className=" transition-all flex items-end duration-1000 z-0 ease-in-out absolute opacity-0 group-hover:opacity-100  bg-gradient-to-t  from-black/70 to-transparent inset-0  ">
                                        <div className=" py-6 z-10 transform transition-transform duration-1000 group-hover:translate-y-0 translate-y-[160px] border text-white border-white px-6">
                                            <h6 className=" text-3xl ">{item.title}</h6>
                                            <p className=" text-xl mt-5 ">{item.description}</p>
                                        </div>
                                    </div> */}


                                    <div className="absolute inset-0 group">
                                        {/* Gradient overlay shown only on hover */}
                                        <div className="transition-all delay-75 duration-700 ease-in-out opacity-30 group-hover:opacity-100 bg-gradient-to-t from-black/70 to-transparent absolute inset-0 z-0" />
                                        {/* <div className=" w-full z-30 flex text-white flex-col h-full justify-end ">
                                            <h6 className="text-3xl">{item.title}</h6>
                                            <p className="text-xl  mt-5  ">{item.description}</p>
                                        </div> */}

                                        {/* Text content always visible, moves up on hover */}
                                        <div className="flex items-end absolute inset-0  z-10">
                                            <div className="py-6 px-6 transform transition-transform duration-1000 group-hover:translate-y-0 2xl:translate-y-[160px] xl:translate-y-[220px] lg:translate-y-[270px] md:translate-y-[220px] translate-y-[260px] text-white">
                                                <h6 className={` ${playfair.className} text-xl xl:text-2xl 2xl:text-3xl`}>{item.title}</h6>
                                                <p className={` ${rubik.className}  font-extralight mt-3 xl:mt-5 group-hover:opacity-100 xl:leading-7 duration-700 md:text-lg xl:text-xl opacity-0`}>{item.description}</p>
                                                <p className={`xl:text-xl md:text-lg my-3 font-extralight ${rubik.className} `}>Read More</p>
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