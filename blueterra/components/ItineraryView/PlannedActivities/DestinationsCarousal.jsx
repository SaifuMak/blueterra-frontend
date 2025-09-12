
'use client'
import { CarouselApi } from "@/components/ui/carousel"
import { useState, useEffect, useRef } from "react";
import axios from "axios";
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

export default function DestinationsCarousal({ selectedTab, itineraryData }) {

    const [api, setApi] = useState()
    const [daysData, setDaysData] = useState([]);

    const [visible, setVisible] = useState(selectedTab !== 'Daily Schedule')

    useEffect(() => {
        // delay the toggle by 500ms
        const timeout = setTimeout(() => {
            setVisible(selectedTab !== 'Daily Schedule')
        }, 500)

        return () => clearTimeout(timeout)
    }, [selectedTab])


    // const daysData = itineraryData?.days
    // Step 1: Parse coordinates from API response
    useEffect(() => {
        if (!itineraryData?.days) return;

        const enriched = itineraryData.days.map((day) => {
            let latitude = null;
            let longitude = null;

            if (day.coordinates) {
                const [lat, lng] = day.coordinates.split(",").map((c) => parseFloat(c.trim()));
                latitude = lat;
                longitude = lng;
            }

            return {
                ...day,
                latitude,
                longitude,
            };
        });

        setDaysData(enriched);
    }, [itineraryData]);


    // Step 2: Fetch temperatures with Axios
    useEffect(() => {
        const fetchWeather = async () => {
            if (!daysData.length) return;

            const updated = await Promise.all(
                daysData.map(async (day) => {
                    if (!day.latitude || !day.longitude) return { ...day, temperature: null };

                    try {
                        const res = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
                            params: {
                                latitude: day.latitude,
                                longitude: day.longitude,
                                current_weather: true,
                                daily: "temperature_2m_max,temperature_2m_min",
                                timezone: "auto",
                            },
                        });

                        return {
                            ...day,
                            temperature: res.data?.current_weather?.temperature ?? null,
                        };
                    } catch (error) {
                        console.error("Weather fetch failed:", error);
                        return { ...day, temperature: null };
                    }
                })
            );

            setDaysData(updated);
        };

        fetchWeather();
    }, [daysData.length]);

    console.log(daysData);


    console.log(daysData);




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


        <div className=" flex  items-center    flex-col  h-full overflow-y-auto     " style={{ display: visible ? 'visible' : 'flex' }}>

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

                        {daysData.map((item, index) => (
                            <CarouselItem key={index} className="basis-1/1  flex-center ">

                                <div className=" relative group cursor-pointer w-full h-[30vh] overflow-hidden  ">

                                    <Image
                                        src={item.image_public_url}
                                        alt={item.image_title}
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

                                {[...Array(itineraryData?.days?.length)].map((_, ind) => (
                                    <div key={ind} className={`h-[3px] flex flex-1 ${ind <= currentCollection ? 'bg-white' : 'bg-white/30'} `} />
                                ))}
                            </div>

                            <div className="text-white flex px-2   pointer-events-auto  space-x-1 absolute bottom-5 left-3 text-lg lg:text-2xl font-normal">
                                <p>Day {currentCollection + 1}:</p>
                                <p className="capitalize ">{itineraryData?.days?.[currentCollection].image_title}</p>
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
                {daysData?.[currentCollection]?.temperature && <div className=" flex ">
                    <p className="xl:text-2xl text-xl ">
                        {daysData?.[currentCollection]?.temperature ? daysData?.[currentCollection]?.temperature : '0'}

                        <span className="relative -top-1 text-lg lg:text-2xl">°</span>C
                    </p>
                    <div className="ml-2 mt-0.5">
                        <img src="/Icons/cloud.svg" alt="cloud" className="" />

                    </div>
                </div>}

                <div className=" flex space-x-6 text-sm items-center font-normal">
                    <p className="">Feels like Cloudy</p>
                    <p className="">Low: <span className=" text-base">12°C</span></p>
                    <p className="">High: <span className=" text-base">35°C</span></p>

                </div>

            </div>



        </div >
    )
}