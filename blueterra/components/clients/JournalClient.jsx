"use client"
import { playfair, rubik } from "@/app/fonts"
import BackgroundClipPath from "@/components/generalComponents/BackgroundClipPath"
import Image from "next/image"
import Journals from "@/components/Journey/Journals"
import Button from "@/components/generalComponents/Button"
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, useRef } from "react"
import AXIOS_INSTANCE from "@/lib/axios"
import { getTotalPagesCount, getPageNumber } from "@/app/utils/paginationHelpers"
import SearchComponent from "@/components/Journey/SearchComponent"
import { Suspense } from "react";
import { useRouter } from 'next/navigation';
import SmoothScroll from "@/components/SmoothScroll"
import Navbar from "@/components/Navbar/page"
import Footer from "@/components/Footer/page"
import ResponsiveClipPath from "../generalComponents/ResponsiveClipPath"
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useMediaQuery } from 'react-responsive'
import { useLenis } from "@/components/SmoothScroll"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function JournalClient() {

    const isMobile = useMediaQuery({
        query: '(max-width: 844px)'
    })

    const lenis = useLenis();

    const [currentCollection, setCurrentCollection] = useState(0)
    const [CollectionCount, setCollectionCount] = useState(0)
    const [selectedFilter, setSelectedFilter] = useState('View All')
    const [selectedPage, setSelectedPage] = useState(1)

    const [categories, setCategories] = useState([])
    const [journals, setJournals] = useState([])
    const [featuredJournals, setFeaturedJournals] = useState([])
    const JournalListRef = useRef(null);
    const [isFirstFetched, setIsFirstFetched] = useState(false)

    const containerRef = useRef()
    const bannerText = useRef()

    const router = useRouter();

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    const [hasEntered, setHasEntered] = useState(false)


    const scrollToJournals = () => {
        if (!isFirstFetched) return
        gsap.to(window, {
            duration: 0.6,
            scrollTo: { y: JournalListRef.current, offsetY: 10 },
            ease: "sine.inOut",
        });
    };

    const fetchCategories = async () => {
        try {
            const response = await AXIOS_INSTANCE.get(`get-journal-categories/`)
            setCategories(response?.data)
        }
        catch (e) {
            console.log(e)
        }
    }


    const fetchFeaturedJournals = async () => {
        try {
            const response = await AXIOS_INSTANCE.get(`get-featured-journals/`)
            setFeaturedJournals(response?.data)
        }
        catch (e) {
            console.log(e)
        }
    }


    const fetchJournals = async (category = 'View All', page = 1) => {
        const encodedCategory = encodeURIComponent(category);
        try {
            const response = await AXIOS_INSTANCE.get(`get-journals/?page=${page}&category=${encodedCategory}`)
            setJournals(response.data.results)
            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)
            setNextPage(nextpage)
            setPrevPage(previous)
            setCurrentPage(page)

            const totalPages = getTotalPagesCount(response.data.count, 6)
            setTotalPages(totalPages)
            setIsFirstFetched(true)

        }
        catch (e) {
            console.log(e)
        }
    }

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter)
        fetchJournals(filter, 1)
    }

    const handleGetBlog = (slug) => {
        router.push(`/blog/${slug}`);
    };


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
                        toggleActions: "play none play reverse",
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


    useEffect(() => {
        fetchFeaturedJournals()
        fetchJournals()
        fetchCategories()
    }, [])

    useEffect(() => {
        scrollToJournals()
    }, [currentPage])


    useEffect(() => {
        // localStorage.removeItem("searchQuery");
        localStorage.setItem("searchQuery", '')

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (isMobile) {
            lenis?.stop()
        }
    }, [isMobile])


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
                            <h1 ref={bannerText} className={` ${playfair.className}  translate-all opacity-0  ease-in-out text-3xl  max-md:px-5 text-center md:text-4xl lg:text-[60px] xl:text-[70px] 2xl:text-[80px] font-medium `}>Voyage Journal</h1>
                        </div>
                    </div>
                </div>


                <div className=" w-full  h-full  flex-center relative ">
                    {/* <BackgroundClipPath outerClass='absolute w-[16%] left-0 top-0 h-fit ' ImagePath='/images/journal/journal-left-clip.png' width='500' height='1000' /> */}
                    {/* <BackgroundClipPath outerClass='absolute w-fit right-0 top-0 h-fit ' ImagePath='/images/journal/journal-right-clip.png' width='500' height='1000' />
                    <BackgroundClipPath outerClass='absolute w-fit right-0 bottom-0 h-fit  ' ImagePath='/images/journal/journal-bottom-right.png' width='500' height='1000' /> */}
                    <ResponsiveClipPath
                        outerClass='absolute md:w-[48%] w-[78%]  top-0  lg:right-36 h-fit'
                        ImagePath='/images/journal/patterns/search-top-right.png'
                        width={800}
                    />

                    <div className=" w-11/12  relative  md:w-10/12 2xl:w-9/12 md:space-y-10 flex flex-col  items-center mt-8 lg:mt-16  xl:mt-28  h-full ">

                        <ResponsiveClipPath
                            outerClass='absolute md:w-[28%] w-[48%] bottom-0 md:-bottom-10 right-6 h-fit'
                            ImagePath='/images/journal/patterns/filter-bottom.png'
                            width={800}
                        />

                        <div className="w-full flex max-sm:flex-col  justify-between items-center   ">

                            <Suspense fallback={<div>Loading search...</div>}>
                                <SearchComponent isParamsRecieved={false} setHasEntered={setHasEntered} hasEntered={hasEntered} />
                            </Suspense>

                            {/* <SearchComponent isParamsRecieved={false} /> */}

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

                        <div className=" max-sm:mt-8 w-full xl:mt-10 overflow-hidden    rounded-3xl ">
                            <Journals Data={featuredJournals} setCurrent={setCurrentCollection} setCount={setCollectionCount} currentCollection={currentCollection} CollectionCount={CollectionCount} />
                        </div>

                        <div className=" w-full z-50 space-x-5 flex-wrap gap-y-6 text-dark-28 max-xl:text-sm mb-10 xl:mt-10 max-sm:mt-10 max-sm:text-xs flex items-center ">
                            <div onClick={() => handleFilterChange('View All')} className={` cursor-pointer text-nowrap ${'View All' === selectedFilter ? 'text-white bg-sky-blue-1' : 'border'}  rounded-sm px-6 py-1.5 border-[#E3E3E3]`}>View All</div>

                            {categories?.map((data, index) => (
                                <div key={index} onClick={() => handleFilterChange(data.category)} className={`transition-all duration-300 ease-in-out cursor-pointer capitalize text-nowrap ${data.category === selectedFilter ? 'text-white bg-sky-blue-1' : 'border'}  rounded-sm px-6 py-1.5 border-[#E3E3E3]`}>{data.category}</div>
                            ))}
                        </div>
                    </div>
                </div>


                <div ref={JournalListRef} className=" w-full  h-full   flex-center ">


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
                                                    <p className={` text-lg lg:text-xl  xl:leading-9 2xl:leading-10 font-normal 2xl:text-2xl`}>{journal.title}</p>
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

export default JournalClient