
'use client'
import { CarouselApi } from "@/components/ui/carousel"
import { trimWords } from "@/app/utils/textHelpers";

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

import { IoIosStar, FaMapLocationDot, GrMap, FaMapMarkerAlt } from '../../components/reactIcons'
import Button from "../generalComponents/Button";

export default function HotelsList({ HotelsData, setCurrent, setCount }) {

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
                        align: HotelsData?.length === 1 ? "center" : "start",
                        loop: true,
                    }}
                    plugins={
                        HotelsData?.length > 2
                            ? [
                                Autoplay({
                                    delay: 4000,
                                    stopOnInteraction: false,
                                    stopOnMouseEnter: true,
                                }),
                            ]
                            : []
                    }
                    className={`  ${HotelsData?.length === 1 ? 'md:w-4/12' : 'w-full'}   `}
                >
                    <CarouselContent>

                        {HotelsData?.map((item, index) => (
                            <CarouselItem key={index} className={
                                HotelsData?.length === 1
                                    ? "basis-full flex over 2xl:p-3 pb-2"
                                    : HotelsData?.length === 2
                                        ? "md:basis-1/2 flex over 2xl:p-3 pb-2"
                                        : "md:basis-1/2 xl:basis-1/3 flex over 2xl:p-3 pb-2"
                            }>

                                <div className="  mx-4 lg:mx-2 group  w-full h-full flex flex-col ">

                                    <div className=" relative  rounded-sm overflow-hidden  transition-all duration-700 ease-in-out h-[180px] md:h-[250px] 2xl:h-[300px] w-full">
                                        <Image
                                            src={item?.image_public_url}
                                            alt={item?.title}
                                            fill
                                            className="object-cover delay-300 transition-all duration-700 ease-in-out group-hover:scale-110"
                                        />
                                        <div className=" absolute flex-center inset-0 w-full h-full delay-200 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:bg-black/40 ">
                                            <a href={item.map_link} target="_blank" rel="noopener noreferrer">
                                                <FaMapMarkerAlt className="text-3xl text-white" />
                                            </a>

                                        </div>
                                    </div>


                                    <div className="  space-y-0 mt-3">

                                        <div className="flex   justify-between">
                                            <h3 className="font-medium text-xl mr-3 text-dark-4B xl:text-2xl 2xl:text-xl  max-lg:hidden">{trimWords(item.title, 6)}</h3>
                                            <h3 className="font-medium text-xl mr-3 text-dark-4B 2xl:text-2xl  lg:hidden">{item.title}</h3>

                                            <div className="flex space-x-1 mt-1">
                                                {[...Array(5)].map((_, ind) => (
                                                    <IoIosStar key={ind} className={`lg:text-xl  text-lg  ${ind < item.rating ? "fill-[#FFCB1F]" : "fill-gray-300"
                                                        }`} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="">
                                            <p className=" xl:text-lg ">{item.location}</p>
                                        </div>

                                        <div className="mt-2">
                                            <p className=" font-light my-3">
                                                {trimWords(item?.description, 40, '...')}
                                            </p>
                                        </div>

                                        {/* <button className=" bg-[#2670B8] cursor-pointer rounded-sm w-full py-2 mt-2 text-white">VIEW ON MAP</button> */}
                                        {/* <Button text='VIEW ON MAP' buttonStyle={` font-normal transition-all duration-500 mb-10 w-full   ease-in-out font-medium max-md:text-sm  py-2.5 `} isHoverWhiteApplied={false} /> */}

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