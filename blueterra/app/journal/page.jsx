"use client"
import { playfair, rubik, mrsSaint, jost } from "@/app/fonts"
import BackgroundClipPath from "@/components/generalComponents/BackgroundClipPath"
import Image from "next/image"
import { HiOutlineArrowNarrowRight, RxCross2, CiSearch, HiArrowLongRight } from '@/components/reactIcons'
import carousalData from "@/components/datas/DestinationsDetails"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, RiArrowRightSLine } from '@/components/reactIcons';
import Journals from "@/components/Journey/Journals"
import { HOME_COLLECTIONS } from "@/constants/home-collections"
import SmoothScroll from "@/components/SmoothScroll"
import { JOURNAL_COLLECTIONS } from "@/constants/blog-collections"
import Button from "@/components/generalComponents/Button"
import Navbar from "@/components/Navbar/page"
import Footer from "@/components/Footer/page"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, useRef } from "react"

gsap.registerPlugin(useGSAP, ScrollTrigger)


export default function Journal() {

    // const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //     setIsClient(true);
    // }, []);

    // if (!isClient) {
    //     return null; // or a loading placeholder
    // }

    const [currentCollection, setCurrentCollection] = useState(0)
    const [CollectionCount, setCollectionCount] = useState(0)
    const [selectedFilter, setSelectedFilter] = useState(0)
    const [selectedPage, setSelectedPage] = useState(1)

    const filters = ['View All', 'Country Highlights', 'City Breaks', 'Hidden Gems', 'Adventure Travel', 'Local Experiences',]
    const pages = ['1', '2', '3']

    const containerRef = useRef()
    const bannerText = useRef()


    const journalsData = [
        { title: 'Best Destinations for Wellness and Mindfulness', image: '/images/static/snowfall.png', alt: 'snow ' },
        { title: 'Best Destinations for Wellness and Mindfulness', image: 'https://images.pexels.com/photos/1707310/pexels-photo-1707310.jpeg', alt: 'snow ' },
        { title: 'Best Destinations for Wellness and Mindfulness', image: 'https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg', alt: 'snow ' },
        { title: 'Best Destinations for Wellness and Mindfulness', image: 'https://images.pexels.com/photos/2610309/pexels-photo-2610309.jpeg', alt: 'snow ' },
        { title: 'Best Destinations for Wellness and Mindfulness', image: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg', alt: 'snow ' },
        { title: 'Best Destinations for Wellness and Mindfulness', image: 'https://images.pexels.com/photos/1122408/pexels-photo-1122408.jpeg', alt: 'snow ' },

    ]



    useGSAP(() => {
        const elements = gsap.utils.toArray(".scale-opacity-animate");

        elements.forEach((box) => {
            gsap.fromTo(
                box,
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: box,
                        start: "top 90%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
        });
    }, { scope: containerRef });


    useGSAP(() => {
        gsap.fromTo(
            bannerText.current,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.3,

            }
        );
    },);


    return (
        <SmoothScroll>
            <Navbar />

            <div ref={containerRef} className={`w-full h-full flex flex-col justify-center  mb-20 text-dark-28 ${rubik.className}`}>

                <div className="w-full relative h-[30vh] md:h-[400px] lg:h-[500px] xl:h-[500px] 2xl:h-[600px]">
                    <Image
                        src='/images/journal/banner.png'
                        alt='quote'
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                    <div className=" w-full h-full absolute  inset-0 flex-center flex-col text-white ">
                        <div className="flex-center flex-col space-y-5 lg:space-y-8 ">
                            <h1 ref={bannerText} className={` ${playfair.className}  translate-all opacity-0 duration-700 ease-in-out text-3xl  max-md:px-5 text-center md:text-4xl lg:text-[60px] xl:text-[70px] 2xl:text-[80px] font-medium `}>Voyage Journal</h1>
                        </div>
                    </div>
                </div>

                <div className=" w-full  h-full  flex-center relative ">
                    <BackgroundClipPath outerClass='absolute w-[16%] left-0 top-0 h-fit ' ImagePath='/images/journal/journal-left-clip.png' width='500' height='1000' />
                    <BackgroundClipPath outerClass='absolute w-fit right-0 top-0 h-fit ' ImagePath='/images/journal/journal-right-clip.png' width='500' height='1000' />
                    <BackgroundClipPath outerClass='absolute w-fit right-0 bottom-0 h-fit  ' ImagePath='/images/journal/journal-bottom-right.png' width='500' height='1000' />

                    <div className=" w-11/12 md:w-10/12 2xl:w-9/12 md:space-y-10 flex flex-col  items-center mt-8 lg:mt-16  xl:mt-28  h-full ">
                        <div className="w-full flex max-sm:flex-col  justify-between items-center   ">

                            <div className=" md:w-6/12 w-full  flex flex-col ">
                                <p className={`xl:text-3xl text-2xl font-medium ${playfair.className}`}>Get Inspired</p>
                                <div className="md:w-[80%] w-[90%] h-9 md:h-10 xl:h-12 xl:mt-4 mt-3 rounded-sm border border-[#2A282880]/50 px-3 flex  justify-between items-center ">
                                    <input type="text" className="w-[120px] outline-none placeholder:text-sm md:placeholder:text-base" placeholder="Search journal..." />
                                    {/* <span className="ml-1 text-slate-900  font-bold"><CiSearch /></span> */}
                                    <img src="/Icons/search.svg" alt="search icon " className=" size-5" />
                                </div>
                            </div>

                            <div className=" w-full max-sm:mt-5 md:w-6/12 ml-4  flex relative flex-col items-center p-5 md:p-8  xl:pl-10 xl:pt-10 ">
                                <p className={`2xl:text-[25px] lg:text-[18px] xl:text-[22px] font-light leading-8 xl:leading-10 `}>The best stories aren’t found in books, they’re written on the roads we take, the strangers we meet, and the sunsets we chase.</p>
                                <div className=" absolute size-7 md:size-9 xl:size-11 top-0  left-0 ">
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

                        
                        <div className=" max-sm:mt-8 w-full xl:mt-10 overflow-hidden   rounded-3xl ">
                            <Journals Data={JOURNAL_COLLECTIONS} setCurrent={setCurrentCollection} setCount={setCollectionCount} currentCollection={currentCollection} CollectionCount={CollectionCount} />
                        </div>

                        <div className=" w-full space-x-5 flex-wrap gap-y-6 text-dark-28 max-xl:text-sm mb-10 xl:mt-10 max-sm:mt-10 max-sm:text-xs flex items-center ">
                            {filters?.map((filter, index) => (
                                <div key={index} className={` cursor-pointer text-nowrap ${index === selectedFilter ? 'text-white bg-sky-blue-1' : 'border'}  rounded-sm px-6 py-1.5 border-[#E3E3E3]`}>{filter}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className=" w-full h-full  flex-center">
                    <div className=" w-11/12 relative h-auto  flex flex-col justify-center items-center bg-sky-blue-light rounded-3xl">

                        <div className=" w-11/12 2xl:w-10/12 mt-20 z-20   grid md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12   ">
                            {journalsData.map((journal, index) => (

                                <div key={index} className=" scale-opacity-animate relative group cursor-pointer w-full 2xl:h-[700px] xl:h-[560px]  h-[470px] rounded-2xl overflow-hidden">

                                    <Image
                                        src={journal.image}
                                        alt={journal.title}
                                        fill
                                        className=" object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out"
                                    />



                                    <div className="absolute inset-0 group">
                                        {/* Gradient overlay shown only on hover */}
                                        <div className="transition-all delay-75 duration-700 ease-in-out  opacity-100 bg-gradient-to-t from-black/90 via-transparent to-transparent absolute inset-0 z-0" />

                                        {/* Text content always visible, moves up on hover */}
                                        <div className="flex items-end absolute inset-0  z-10">
                                            <div className="xl:py-6 py-4 px-5 xl:px-8 transform transition-transform duration-1000 group-hover:translate-y-0 2xl:translate-y-[80px] xl:translate-y-[90px] lg:translate-y-[90px] md:translate-y-[80px] translate-y-[80px] text-white">
                                                <h6 className={` text-lg lg:text-xl  xl:leading-9 2xl:leading-10 font-normal 2xl:text-2xl`}>{journal.title}</h6>
                                                <Button text='LEARN MORE' buttonStyle={`opacity-0 group-hover:opacity-100 transition-all duration-500 mb-10 mt-5 ease-in-out  max-md:text-sm px-4 lg:px-6 xl:px-8 py-1.5 xl:py-2 `} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className=" w-full  my-16 flex justify-center space-x-4  z-20 items-center">
                            {pages?.map((page, index) => (
                                <div key={index} className={`${index === 0 ? 'bg-sky-blue-1 text-white' : 'bg-white text-sky-blue-1'} rounded-sm px-3 py-1.5 border border-slate-100`}>{page}</div>
                            ))}
                            <img src="/Icons/arrow-blue.svg" alt="search icon " className=" size-4" />


                        </div>
                        <BackgroundClipPath outerClass='absolute    bottom-0   ' ImagePath='/images/journal/journal-card-bottom.png' width='500' height='1000' />
                        <BackgroundClipPath outerClass='absolute top-[20%] right-0   ' ImagePath='/images/journal/journal-card-left-clippath.png' width='500' height='1000' />
                        <BackgroundClipPath outerClass='absolute top-[60%] w-fit right-0   ' ImagePath='/images/journal/journal-card-linear-clippath.png' width='500' height='1000' />


                    </div>
                </div>

            </div>
            <Footer />
        </SmoothScroll >

    )
}