
'use client'
import { CarouselApi } from "@/components/ui/carousel"
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
import gsap from "gsap";

import { IoIosStar, HiArrowLongRight } from '../../components/reactIcons'
import { playfair, rubik } from '@/app/fonts'

import SmoothScroll from "../SmoothScroll";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { trimWords } from "@/app/utils/textHelpers";

gsap.registerPlugin(useGSAP)

export default function DestinationCardCarousal({ Data }) {

    const [currentCollection, setCurrent] = useState(0)
    const [CollectionCount, setCount] = useState(0)

    const [api, setApi] = useState()
    const autoplayRef = useRef(Autoplay({ delay: 2000, playOnInit: false }));

    useEffect(() => {

        if (!api) {
            return
        }
        autoplayRef.current.stop();

        // setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })

    }, [api])

    const handleMouseEnter = () => {
        autoplayRef.current.reset();
        autoplayRef.current.play();
    };

    const handleMouseLeave = () => {
        autoplayRef.current.stop();
    };


    return (

        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className=" flex justify-center items-center flex-col rounded-2xl   ">

            <div className=" group  w-full  overflow-hidden  relative  flex-center rounded-2xl  ">

                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[autoplayRef.current]}
                    className="w-full  relative"
                >

                    <CarouselContent>

                        {Data?.map((image, index) => (
                            <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1  flex-center rounded-2xl  ">

                                <div className=" relative group cursor-pointer w-full  min-h-[300px] rounded-2xl overflow-hidden">
                                    <Image
                                        src={image}
                                        alt='image'
                                        fill
                                        className=" object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out"
                                    />
                                </div>
                            </CarouselItem>
                        ))}

                    </CarouselContent>

                    <div className="   text-white absolute rounded-2xl pointer-events-none   inset-0 bg-gradient-to-b  from-black/80 via-transparent to-transparent">

                        <div className=" flex group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out space-x-3 p-4  md:p-10 justify-end">
                            {Data?.map((_, index) => (
                                <div key={index} className={`${currentCollection === index ? 'bg-white' : ' bg-white/30'} translate-all duration-700 ease-in-out h-[3px] rounded-3xl w-16 bg-white`}></div>
                            ))}
                        </div>
                    </div>
                </Carousel>
            </div>

        </div >
    )
}