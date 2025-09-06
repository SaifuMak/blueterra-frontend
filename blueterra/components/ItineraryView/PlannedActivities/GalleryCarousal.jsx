
'use client'
import { CarouselApi } from "@/components/ui/carousel"
import { trimWords } from "@/app/utils/textHelpers";

import { useState, useEffect, useRef } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"


export default function GalleryCarousal({ data, setCurrent, setCount }) {

    const [api, setApi] = useState()

    const autoplay = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
    )


    useEffect(() => {

        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })

    }, [api, setCount, setCurrent])



    return (
        <div className=" flex-center ">

            <div className="  w-full  flex-center">
                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[autoplay.current]}
                    className="w-full  px-4"
                >
                    <CarouselContent>

                        {data?.map((item, index) => (
                            <CarouselItem key={index} className="basis-full md:basis-1/2 w-full  flex  ">

                                <div className="  mx-1  lg:mx-2 group  w-full h-full flex flex-col ">

                                    <div className=" relative   rounded-2xl overflow-hidden  transition-all duration-700 ease-in-out h-[400px] w-full">
                                        <Image
                                            src={item?.image_public_url}
                                            alt={item?.title}
                                            fill
                                            className="object-cover"
                                        />

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