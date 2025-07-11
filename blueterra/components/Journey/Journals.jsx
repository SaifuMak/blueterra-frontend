
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

import { IoIosStar } from '../../components/reactIcons'
import { playfair, rubik, mrsSaint } from '@/app/fonts'

import SmoothScroll from "../SmoothScroll";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP)

export default function Journals({ Data, setCurrent, setCount, currentCollection, CollectionCount }) {

    const [api, setApi] = useState()

    const containerRef = useRef()

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

    useGSAP(
        () => {
            const q = gsap.utils.selector(containerRef); // selector scoped to this container

            gsap.fromTo(
                q('.vertical-fade-in'),
                { opacity: 0, y: 20, },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.5,
                    ease: 'power2.out',
                }
            );
        },
        { scope: containerRef, dependencies: [currentCollection] }
    );

    return (

        <div className=" flex justify-center items-center flex-col   ">

            <div ref={containerRef} className="  w-full   relative  flex-center ">
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

                        {Data?.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1  flex-center ">

                                <div className=" relative group cursor-pointer w-[100%] h-[65vh] rounded-2xl overflow-hidden">

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

                    <div className="  text-white absolute rounded-2xl pointer-events-none   flex flex-col justify-between inset-0 bg-gradient-to-t  from-black/80 via-transparent to-transparent">

                        <div className=" flex  space-x-3  p-10">
                            {Data?.map((_, index) => (
                                <div key={index} className={`${currentCollection === index ? 'bg-white' : ' bg-white/30'} translate-all duration-700 ease-in-out h-[3px] rounded-2xl w-16 bg-white`}></div>
                            ))}
                        </div>

                        <div className="  px-10 py-5 space-y-5 ">
                            <div className=" space-y-3 overflow-hidden vertical-fade-in">
                                <h2 className=" text-[30px]   font-medium">{Data[currentCollection]?.title}</h2>
                                <p className=" text-xl  font-light w-10/12">{Data[currentCollection]?.description}</p>
                            </div>
                            <div className=" flex items-center font-light justify-between">
                                <div className="">
                                    <p className=" flex  items-center "> <span className=""><img src="/Icons/calender.svg" alt="" className=" size-4 object-cover mr-2 " /></span>{Data[currentCollection]?.date}</p>
                                </div>
                                <div className="">
                                    <p className="">Read more</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel>


            </div>



        </div >
    )
}