
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

export default function CollectionsList({ Data, setCurrent, setCount, onclickEvent = () => { } }) {

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

            <div className="  w-full md:px-10    flex-center ">
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
                            <CarouselItem key={index} className="md:basis-1/2   2xl:p-3 pb-2 lg:basis-1/3  mx-0  flex-center  ">

                                <div  className=" relative group aspect-[47/50]  cursor-pointer w-[370px]  xl:w-[470px] 2xl:h-[600px] xl:h-[500px] md:h-[480px] h-[410px] rounded-2xl overflow-hidden">

                                    {/* <Image
                                        src={item.banner_image_public_url}
                                        alt={item.title}
                                        fill
                                        className=" object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out"
                                    /> */}

                                    <img src={item.banner_image_public_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out" />

                                    <a href={item?.link} onClick={()=>onclickEvent(item.title,item?.link)} target="_blank" rel="noopener noreferrer"  className="">
                                        <div className="absolute inset-0 group">
                                            {/* Gradient overlay shown only on hover */}
                                            <div className="transition-all delay-75 duration-700 ease-in-out opacity-30 group-hover:opacity-100 bg-gradient-to-t from-black/70 to-transparent absolute inset-0 z-0" />

                                            {/* Text content always visible, moves up on hover */}
                                            <div className="flex items-end absolute inset-0   z-10">
                                                <div className="py-6 bg-gradient-to-t from-black to-transparent  px-6 transform transition-transform duration-1000 group-hover:translate-y-0  md:min-h-64 2xl:translate-y-[160px] xl:translate-y-[170px] lg:translate-y-[170px] md:translate-y-[170px]   text-white">
                                                    <h3 className={` ${playfair.className} text-[22px] xl:text-2xl 2xl:text-3xl`}>{item.title}</h3>
                                                    <p className={` ${rubik.className}  font-extralight mt-3 xl:mt-5 group-hover:opacity-100 xl:leading-7 duration-700 md:text-base 2xl:text-lg md:opacity-0`}>{item.description}</p>
                                                    <p className={` md:text-lg my-3 font-extralight group-hover:opacity-100 duration-700 md:opacity-0 ${rubik.className} `}>Read More</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

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