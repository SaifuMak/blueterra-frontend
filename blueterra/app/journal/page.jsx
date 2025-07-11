"use client"
import { playfair, rubik, mrsSaint, jost } from "@/app/fonts"
import BackgroundClipPath from "@/components/generalComponents/BackgroundClipPath"
import Image from "next/image"
import { HiOutlineArrowNarrowRight, RxCross2, CiSearch } from '@/components/reactIcons'
import { useRef, useEffect, useState } from "react"
import carousalData from "@/components/datas/DestinationsDetails"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from '@/components/reactIcons';
import Journals from "@/components/Journey/Journals"
import { HOME_COLLECTIONS } from "@/constants/home-collections"
import SmoothScroll from "@/components/SmoothScroll"
import { JOURNAL_COLLECTIONS } from "@/constants/blog-collections"


export default function Journal() {

    const [currentCollection, setCurrentCollection] = useState(0)
    const [CollectionCount, setCollectionCount] = useState(0)


    return (
        <SmoothScroll>

            <div className={`w-full h-full flex flex-col justify-center  text-dark-28 ${rubik.className}`}>

                <div className="w-full relative h-[50vh] md:h-screen">
                    <video src="https://pub-2f61254cf9024766800653136dfffd58.r2.dev/freecompress-5186163_Aerial_Lovatnet_1920x1080.mp4"
                        className=" w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        preload="auto"
                    ></video>
                    <div className=" w-full h-full absolute  inset-0 flex-center flex-col text-white ">
                        <div className="flex-center flex-col space-y-5 lg:space-y-8 ">
                            <h1 className={` ${playfair.className}  translate-all duration-700 ease-in-out text-3xl  max-md:px-5 text-center md:text-4xl lg:text-[60px] xl:text-[70px] 2xl:text-[80px] font-semibold `}>Voyage Journal</h1>
                        </div>
                    </div>

                </div>

                <div className=" w-full h-screen flex justify-center relative ">
                    <BackgroundClipPath outerClass='absolute w-[20%] left-0 top-0 h-fit border' ImagePath='/images/journal/journal-left-clip.png' width='500' height='1000' />
                    <BackgroundClipPath outerClass='absolute w-fit right-0 top-0 h-fit border' ImagePath='/images/journal/journal-right-clip.png' width='500' height='1000' />
                    <BackgroundClipPath outerClass='absolute w-fit right-0 bottom-0 h-fit  border' ImagePath='/images/journal/journal-bottom-right.png' width='500' height='1000' />

                    <div className=" w-full flex flex-col  items-center absolute inset-0 mt-10  h-full ">
                        <div className="w-10/12 flex justify-between border  ">

                            <div className=" w-7/12  flex flex-col ">
                                <p className={`text-2xl ${playfair.className}`}>Get Inspired</p>
                                <div className="w-[350px] h-8 mt-4 rounded-xs border border-[#2A282880] px-3 flex  justify-between items-center ">
                                    <input type="text" className="w-[120px] outline-none placeholder:text-xs" placeholder="Search journal..." />
                                    <span className="ml-1 text-slate-900  font-bold"><CiSearch /></span>
                                </div>
                            </div>

                            <div className=" w-5/12 flex relative flex-col items-center p-10 ">
                                <p className={`text-2xl font-light `}>The best stories aren’t found in books, they’re written on the roads we take, the strangers we meet, and the sunsets we chase.</p>
                                <div className=" absolute w-10 h-10 top-0  left-0 ">
                                    <Image
                                        src='/images/journal/quote.png'
                                        alt='quote'
                                        fill
                                        priority
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className=" w-11/12 mt-10   rounded-2xl ">
                            <Journals Data={JOURNAL_COLLECTIONS} setCurrent={setCurrentCollection} setCount={setCollectionCount} />

                        </div>


                    </div>
                </div>
            </div>
        </SmoothScroll>

    )
}