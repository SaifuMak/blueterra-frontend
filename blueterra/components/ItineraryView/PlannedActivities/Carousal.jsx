'use client';
import { useState, useEffect, useRef } from "react";
import carousalData from "@/components/datas/DestinationsDetails";
import Image from "next/image";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from '../../reactIcons';


export default function Carousal() {

    const scrollRef = useRef(null);
    const [current, setCurrent] = useState(0);
    const total = carousalData.length;
    const [isScrolling, setIsScrolling] = useState(false);

    const scroll = (direction) => {
        const { current: container } = scrollRef;
        if (!container || isScrolling) return;
        setIsScrolling(true); // lock scroll

        const scrollAmount = container.clientWidth;

        if (direction === 'next') {
            if (current === total - 1) {
                // Jump back to first
                container.scrollTo({ left: 0, behavior: 'smooth' });
                setCurrent(0);
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                setCurrent((prev) => prev + 1);
            }
        } else {
            if (current === 0) {
                // Jump to last
                container.scrollTo({ left: scrollAmount * (total - 1), behavior: 'smooth' });
                setCurrent(total - 1);
            } else {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                setCurrent((prev) => prev - 1);
            }
        }

         setTimeout(() => setIsScrolling(false), 500);

    };


    return (

        <div className=" overflow-y-auto ">

            <div className="relative w-full mx-auto">
                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-scroll scroll-smooth  rounded-2xl"
                >
                    {carousalData?.map((item, ind) => (
                        <div
                            key={ind}
                            className="w-full flex-shrink-0 h-[230px] relative  rounded-2xl"
                            style={{ minWidth: '100%' }} // one full width image
                        >
                            <Image
                                src={item.image}
                                alt="image"
                                fill
                                className="object-cover  rounded-2xl"
                            />
                        </div>
                    ))}
                </div>

                <div className="w-11/12 ml-5 space-x-1 top-4 flex absolute ">

                    {[...Array(total)].map((_, ind) => (
                        <div key={ind} className={`h-1 flex flex-1 ${ind <= current ? 'bg-white' : 'bg-white/30'} `} />
                    ))}

                </div>

                <div className="text-white flex  space-x-1 absolute bottom-4 left-3 text-lg font-medium">
                    <p>Day {current + 1}:</p>
                    <p className="capitalize">{carousalData[current].name}</p>
                </div>

                {/* Arrow buttons */}
                <div className="flex space-x-2 absolute bottom-4 right-3 ">
                    <button
                        onClick={() => scroll('prev')}
                        className="w-7 h-7 cursor-pointer bg-white text-black rounded-full flex items-center justify-center shadow"
                    >
                        <MdOutlineKeyboardArrowLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('next')}
                        className="w-7 h-7 bg-white cursor-pointer text-black rounded-full flex items-center justify-center shadow"
                    >
                        <MdOutlineKeyboardArrowRight size={20} />
                    </button>
                </div>

            </div>

            <div className="w-full  text-[#3C3C3C] pl-2 mt-2 bg-white ">
                <div className=" flex ">
                    <p className="text-2xl ">
                        {carousalData[current].temp}
                        <span className="relative -top-1 text-2xl">°</span>C
                    </p>
                    <div className="ml-2 mt-0.5">
                        <img src="/Icons/cloud.svg" alt="cloud" className="" />

                    </div>
                </div>
                <div className=" flex space-x-6 text-sm font-normal">
                    <p className="">Feels like Cloudy</p>
                    <p className="">Low: <span className=" text-base">12°C</span></p>
                    <p className="">High: <span className=" text-base">35°C</span></p>

                </div>


            </div>

        </div>

    );
}
