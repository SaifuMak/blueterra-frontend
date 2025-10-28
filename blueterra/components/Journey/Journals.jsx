
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
import { playfair, rubik, mrsSaint } from '@/app/fonts'

import SmoothScroll from "../SmoothScroll";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { trimWords } from "@/app/utils/textHelpers";
import { journalPreview } from '@/app/utils/helperFunctions'
import { useRouter } from 'next/navigation';


gsap.registerPlugin(useGSAP)

export default function Journals({ Data, setCurrent, setCount, currentCollection, CollectionCount }) {

    const [api, setApi] = useState()

    const containerRef = useRef()
    const router = useRouter();


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

        <div className=" flex justify-center items-center flex-col rounded-2xl   ">

            <div ref={containerRef} className="  w-full   relative  flex-center rounded-2xl  ">
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
                            <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1  flex-center rounded-2xl  ">

                                <div onClick={() => router.push(`/blog/${item.slug}`)} className=" relative group cursor-pointer w-[100%] h-[30vh] md:h-[35vh] lg:h-[45vh] xl:h-[55vh] 2xl:h-[65vh] rounded-2xl overflow-hidden">

                                    <Image
                                        src={item.image_public_url}
                                        alt={item.meta_title}
                                        fill
                                        className=" object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out"
                                    />
                                </div>

                            </CarouselItem>
                        ))}

                    </CarouselContent>
                    {/* <CarouselPrevious />
                    <CarouselNext /> */}

                    <div className="  text-white absolute rounded-3xl pointer-events-none   flex flex-col justify-between  max-sm:py-4 inset-0 bg-gradient-to-t  from-black/80 via-transparent to-transparent">

                        <div className=" flex  space-x-3 px-4   md:p-10">
                            {Data?.map((_, index) => (
                                <div key={index} className={`${currentCollection === index ? 'bg-white' : ' bg-white/30'} translate-all duration-700 ease-in-out h-[3px] rounded-3xl w-16 bg-white`}></div>
                            ))}
                        </div>


                        <div className=" pointer-events-none  px-4 md:px-10 md:py-5 lg:space-y-5 space-y-3  vertical-fade-in">
                            <div className=" space-y-3 overflow-hidden vertical-fade-in">
                                <h2 className=" 2xl:text-[30px] xl:text-[24px] md:text-xl   font-medium">{Data[currentCollection]?.title}</h2>
                                {/* <p
                                    className="2xl:text-xl xl:text-lg text-sm max-sm:text-xs xl:leading-8 2xl:leading-9 font-light md:w-10/12"

                                >{journalPreview(Data[currentCollection]?.blog_content)}</p> */}

                                <div
                                    className="2xl:text-xl xl:text-lg text-sm max-sm:text-xs xl:leading-8 2xl:leading-9 font-light md:w-10/12"
                                    dangerouslySetInnerHTML={{
                                        __html: journalPreview(Data[currentCollection]?.blog_content),
                                    }}
                                />


                            </div>
                            <div className=" flex items-center  max-2xl:text-sm font-light justify-between  ">
                                <div className="">
                                    <p className=" flex  items-center "> <span className=""><img src="/Icons/calender.svg" alt="" className=" size-4 object-cover mr-2 " /></span>{Data[currentCollection]?.created_at}</p>
                                </div>

                                <Link href={`/blog/${Data[currentCollection]?.slug}`}>
                                    <div className=" flex  items-center ">
                                        <p className="">Read more</p>
                                        <span className="  text-2xl font-light  ml-1 text-white"><HiArrowLongRight /></span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Carousel>


            </div>



        </div >
    )
}