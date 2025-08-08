
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

import { IoIosStar, HiArrowLongRight, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from '@/components/reactIcons'
import { playfair, rubik, mrsSaint } from '@/app/fonts'

import { useGSAP } from "@gsap/react";
import Link from "next/link";

import carousalData from "@/components/datas/DestinationsDetails";


gsap.registerPlugin(useGSAP)

export default function DestinationsCarousal() {

    const [api, setApi] = useState()

    const containerRef = useRef()
    const [currentCollection, setCurrentCollection] = useState(0)
    const [CollectionCount, setCollectionCount] = useState(0)

    useEffect(() => {

        if (!api) {
            return
        }

        setCollectionCount(api.scrollSnapList().length)
        setCurrentCollection(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrentCollection(api.selectedScrollSnap())
        })

    }, [api])

    const swipePrevious = () => {
        if (!api || CollectionCount === 0) return;

        const newIndex = (currentCollection - 1 + CollectionCount) % CollectionCount;
        api.scrollTo(newIndex);
    };

    const swipeNext = () => {
        if (!api || CollectionCount === 0) return;

        const newIndex = (currentCollection + 1) % CollectionCount;
        api.scrollTo(newIndex);
    };



    return (


        <div className=" flex justify-center items-center  flex-col  h-full overflow-y-auto     ">

            <div ref={containerRef} className="  w-full  border   relative rounded-2xl flex-center overflow-hidden  ">
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
                    className="w-full  relative"
                >
                    <CarouselContent>

                        {carousalData?.map((item, index) => (
                            <CarouselItem key={index} className="basis-1/1  flex-center ">

                                <div className=" relative group cursor-pointer w-full h-[30vh] overflow-hidden  ">

                                    <Image
                                        src={item.image}
                                        alt={item.alt}
                                        fill
                                        className=" object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out"
                                    />
                                </div>

                            </CarouselItem>
                        ))}

                    </CarouselContent>
                    {/* <CarouselPrevious />
                    <CarouselNext /> */}


                    <div className=" absolute inset-0 w-full h-full pointer-events-none  ">
                        <div className="  w-full h-full flex flex-col justify-between bg-gradient-to-t from-black/50 via-transparent to-transparent py-2 px-4  ">
                            <div className=" flex items-center space-x-2 mt-3">

                                {[...Array(carousalData.length)].map((_, ind) => (
                                    <div key={ind} className={`h-[3px] flex flex-1 ${ind <= currentCollection ? 'bg-white' : 'bg-white/30'} `} />
                                ))}
                            </div>

                            <div className="text-white flex px-2   pointer-events-auto  space-x-1 absolute bottom-5 left-3 text-2xl font-normal">
                                <p>Day {currentCollection + 1}:</p>
                                <p className="capitalize ">{carousalData[currentCollection].name}</p>
                            </div>
                        </div>

                    </div>



                    {/* Arrow buttons */}
                    <div className="flex space-x-2 absolute bottom-5 right-3 ">
                        <button
                            onClick={swipePrevious}
                            className="size-7 cursor-pointer bg-white text-black rounded-full flex items-center justify-center shadow"
                        >
                            <MdOutlineKeyboardArrowLeft size={20} />
                        </button>
                        <button
                            onClick={swipeNext}
                            className="size-7 bg-white cursor-pointer  text-black rounded-full flex items-center justify-center shadow"
                        >
                            <MdOutlineKeyboardArrowRight size={20} />
                        </button>
                    </div>
                </Carousel>
            </div>



            <div className="w-full   text-dark-28 pl-2 mt-2 ">
                <div className=" flex ">
                    <p className="text-2xl ">
                        {carousalData[currentCollection].temp}
                        <span className="relative -top-1 text-2xl">°</span>C
                    </p>
                    <div className="ml-2 mt-0.5">
                        <img src="/Icons/cloud.svg" alt="cloud" className="" />

                    </div>
                </div>

                <div className=" flex space-x-6 text-sm items-center font-normal">
                    <p className="">Feels like Cloudy</p>
                    <p className="">Low: <span className=" text-base">12°C</span></p>
                    <p className="">High: <span className=" text-base">35°C</span></p>

                </div>

            </div>



        </div >
    )
}