"use client"
import { playfair, rubik, mrsSaint, jost } from "@/app/fonts"
import BackgroundClipPath from "@/components/generalComponents/BackgroundClipPath"
import Image from "next/image"
import dynamic from "next/dynamic"

import SmoothScroll from "@/components/SmoothScroll"
import Button from "@/components/generalComponents/Button"
import Navbar from "@/components/Navbar/page"
import Footer from "@/components/Footer/page"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useState, useRef } from "react"
import AXIOS_INSTANCE from "@/lib/axios"
import { getPageNumber, getTotalPagesCount } from "../utils/paginationHelpers"

import { useRouter } from 'next/navigation';
// import SearchComponent from "@/components/Journey/SearchComponent"
// import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// const SearchComponent = dynamic(() => import("@/components/Journey/SearchComponent"), { ssr: false });


import SearchInSearchPage from "@/components/Journey/SearchInSearchPage"


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


export default function Search() {

    const [currentCollection, setCurrentCollection] = useState(0)
    const [CollectionCount, setCollectionCount] = useState(0)
    const [selectedFilter, setSelectedFilter] = useState('View All')
    const [selectedPage, setSelectedPage] = useState(1)

    const [categories, setCategories] = useState([])
    const [journals, setJournals] = useState([])
    const [featuredJournals, setFeaturedJournals] = useState([])
    const resultsRef = useRef(null);


    const containerRef = useRef()
    const bannerText = useRef()

    const router = useRouter();

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    const scrollToResults = () => {
        gsap.to(window, {
            duration: 1, // scroll duration (in seconds)
            scrollTo: { y: resultsRef.current, offsetY: 0 },
            ease: "sine.inOut" // easing for smoothness
        });
    };

    const fetchJournals = async (category = 'View All', page = 1, query = '') => {

        const encodedCategory = encodeURIComponent(category);
        try {
            const response = await AXIOS_INSTANCE.get(`get-journals/?page=${page}&category=${encodedCategory}&query=${query}`)
            setJournals(response.data.results)
            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)
            setNextPage(nextpage)
            setPrevPage(previous)
            setCurrentPage(page)

            const totalPages = getTotalPagesCount(response.data.count, 6)
            setTotalPages(totalPages)

            scrollToResults()

        }
        catch (e) {
            console.log(e)
        }
    }


    const handleGetBlog = (slug) => {
        router.push(`/blog/${slug}`);
    };


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

    useEffect(() => {
        console.log('page reloaded ');

    }, [])




    return (
        <SmoothScroll>
            <Navbar />

            <div ref={containerRef} className={`w-full h-full flex flex-col justify-center  mb-20 text-dark-28 ${rubik.className}`}>

                <div className="w-full relative h-[40vh] md:h-[400px] lg:h-[500px] xl:h-[500px] 2xl:h-[600px]">
                    <Image
                        src='/images/journal/banner.jpg'
                        alt='quote'
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                    <div className=" w-full h-full absolute  inset-0 flex-center flex-col text-white ">
                        <div className="flex-center flex-col space-y-5 lg:space-y-8 ">
                            <h1 ref={bannerText} className={` ${playfair.className}  translate-all opacity-0 duration-700 ease-in-out text-3xl  max-md:px-5 text-center md:text-4xl lg:text-[60px] xl:text-[70px] 2xl:text-[80px] font-medium `}>Search results</h1>
                        </div>
                    </div>
                </div>


                <div ref={resultsRef} className=" w-full  h-full  flex-center relative ">
                    <Suspense fallback={<div>Loading search...</div>}>
                        <SearchInSearchPage fetchJournals={fetchJournals} />
                    </Suspense>
                </div>


                <div className=" w-full  h-full  flex-center ">

                    {journals.length > 0 ? (

                        <div className=" w-11/12 relative min-h-[140vh]  flex flex-col  items-center bg-sky-blue-light rounded-3xl">

                            <div className=" w-11/12 2xl:w-10/12 mt-20 z-20   grid md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12   ">
                                {journals?.map((journal, index) => (

                                    <div key={index} onClick={() => handleGetBlog(journal.slug)} className=" scale-opacity-animate relative group cursor-pointer w-full 2xl:h-[700px] xl:h-[560px]  h-[470px] rounded-2xl overflow-hidden">

                                        <Image
                                            src={journal.image_public_url}
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
                                                    <Button text='LEARN MORE' buttonStyle={`opacity-0 group-hover:opacity-100 transition-all duration-500 mb-10 mt-5 ease-in-out  max-md:text-sm px-4 lg:px-6 xl:px-8 py-1.5 xl:py-2 `} onClickFunction={() => handleGetBlog(journal.slug)} />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            {journals?.length > 0 && <div className=" w-full  my-16 flex justify-center space-x-4  z-20 items-center">

                                <div onClick={() => fetchJournals(selectedFilter, currentPage - 1)} className={`${currentPage > 1 ? ' opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'}`}>
                                    <img src="/Icons/arrow-blue.svg" alt="search icon " className={` rotate-180 size-4 `} />
                                </div>

                                {[...Array(totalPages)].map((_, index) => (
                                    <div key={index} onClick={() => fetchJournals(selectedFilter, index + 1)} className={`${index + 1 === currentPage ? 'bg-sky-blue-1 text-white pointer-events-none' : 'bg-white text-sky-blue-1'} transition-all cursor-pointer duration-300 ease-in-out  rounded-sm px-3 py-1.5 border border-slate-100`}>{index + 1}</div>
                                ))}

                                <div onClick={() => fetchJournals(selectedFilter, currentPage + 1)} className={`${currentPage === totalPages ? ' opacity-0 pointer-events-none' : ' opacity-100 cursor-pointer'}`}>
                                    <img src="/Icons/arrow-blue.svg" alt="search icon " className=" size-4" />
                                </div>
                            </div>}


                            {/* <BackgroundClipPath outerClass='absolute    bottom-0   ' ImagePath='/images/journal/journal-card-bottom.png' width='500' height='1000' />
                        <BackgroundClipPath outerClass='absolute top-[20%] right-0   ' ImagePath='/images/journal/journal-card-left-clippath.png' width='500' height='1000' />
                        <BackgroundClipPath outerClass='absolute top-[60%] w-fit right-0   ' ImagePath='/images/journal/journal-card-linear-clippath.png' width='500' height='1000' /> */}

                        </div>

                    ) : (
                        <div className="w-11/12 relative min-h-[140vh]  flex flex-col  items-center bg-sky-blue-light rounded-3xl">
                            <p className=" mt-20 text-2xl">No results</p>
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </SmoothScroll >

    )
}