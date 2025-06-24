'use client'

import BannerAnimation from "@/components/Home/BannerAnimation";
import DestinationCards from "@/components/DestinationsView/DestinationCards";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Filter from "@/components/Filter";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import CardData from "@/components/datas/Destinations";


export default function Home() {

  const [expandedIndex, setExpandedIndex] = useState(null)
  const [isFullCardVisible, setIsFullCardVisible] = useState(true)
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const mobileVerticalTilesRef = useRef([])
  const [selectedVerticalTileMobile, setSelectedVerticalTileMobile] = useState(null)

  const homeRef = useRef()


  const handleScrollTop = () => {
    setTimeout(() => {

      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: Adds smooth scrolling
      });

    }, 300);
  }


  useEffect(() => {
    if (isFilterVisible) {
      handleScrollTop()
    }
  }, [isFilterVisible])



  const handleShowFullCard = (index) => {
    setIsFullCardVisible(true)
    handleScrollTop()
    setExpandedIndex(index)
  }

  useEffect(() => {
    document.body.style.overflow = isFullCardVisible || isFilterVisible ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullCardVisible, isFilterVisible]);



  // this handles the closing of the filter while clicking outside
  useEffect(() => {
    const handleClick = (event) => {
      if (homeRef.current && homeRef.current.contains(event.target)) {
        setIsFilterVisible(false)
      }
    };

    // Listen for all clicks
    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);


  const Destinations = [
    {
      image: '/images/places/sea.png',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscinge lit Pellentesque ut ligula vitae",
      place: 'United Arab Emirates',
      category: 'Adventure & Exploration',
      price: 34,
      days: 6,
      rating: 3.5,

    },
    {
      image: '/images/places/sea.png',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscinge lit Pellentesque ut ligula vitae",
      place: 'United Arab Emirates',
      category: 'Adventure & Exploration',
      price: 34,
      days: 6,
      rating: 5,

    },
    {
      image: '/images/places/sea.png',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscinge lit Pellentesque ut ligula vitae",
      place: 'United Arab Emirates',
      category: 'Adventure & Exploration',
      price: 34,
      days: 6,
      rating: 3.7,


    },
    {
      image: '/images/places/sea.png',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscinge lit Pellentesque ut ligula vitae",
      place: 'United Arab Emirates',
      category: 'Adventure & Exploration',
      price: 34,
      days: 6,
      rating: 1.5,
    },
  ]


  return (
    // <SmoothScroll>


    <div className=''>
      {/* <Navbar /> */}

      {/* <BannerAnimation
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
        isFullCardVisible={isFullCardVisible}
        setIsFullCardVisible={setIsFullCardVisible}
        handleShowFullCard={handleShowFullCard}
        setIsFilterVisible={setIsFilterVisible}
      /> */}


      <div className="w-full h-screen  flex flex-col ">
        {CardData?.map((card, index) => (
          <div key={index} ref={(e) => (mobileVerticalTilesRef[index] = e)} onClick={() => setSelectedVerticalTileMobile(index)} className={`  transition-all duration-500 ease-in-out relative ${selectedVerticalTileMobile === index ? 'flex-9' : 'flex-1'} `}>
            <Image
              src={card.image}
              alt={card.alt}
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />


            <div className={`absolute ${selectedVerticalTileMobile === index ? "opacity-0" : " opacity-100"} text-white transition-all duration-500 ease-in-out inset-0   bg-[#00284680]/50`}>
              <div className="flex  w-full h-full px-3 mt-2 space-x-2">
                <span className="text-xl font-normal">{card.number}</span>
                <div className="bg-white/40 h-0.5 flex-1 my-3"></div>
                <p className="text-lg"> {card.tagline}</p>
              </div>
            </div>

            <div className={`bg-[#104F82D9]/80 text-white transition-all duration-500 ease-in-out absolute inset-0 ${selectedVerticalTileMobile === index ? "opacity-100" : " opacity-0"}`}>
              <div className=" w-full h-full p-6 ">
                <p className='  text-white text-xl  '>{card.number} <span className='font-medium ml-3'>{card.tagline}</span></p>
                <hr className=' opacity-40 mt-1'></hr>
                <h3 className=" text-lg font-medium mt-3">Popular Journeys</h3>
                <div className="flex space-x-4 pr-3 text-sm mt-2">
                  {["Dubai", "Thailand", "Kenya", "Maldives", "Iceland"].map((destination, index) => (
                    <div key={index} className="  flex  bor-b ">
                      <span className="">{destination}</span></div>
                  ))}
                </div>
                <p className=" text-sm mt-4 ">Our Signature Journeys are the essence of what we do—thoughtfully curated travel experiences that reflect our passion for conscious exploration, cultural connection, and sustainable luxury.</p>
                <div className="space-y-1 text-sm mt-3 h-[20vh]  gap-x-3 overflow-y-auto  flex flex-col  ">
                  {["Adventure & Exploration", "Luxury Escapes", "Romantic Getaways", "Cultural Immersion", "Historical Journeys", "Gastronomic Trails", "Nature & Wildlife Expeditions", "Safari Experiences", "Polar & Arctic Journeys",].map((feature, index) => (
                    <div key={index} className=" text-white flex items-center">  <img src="/Icons/dot.svg" alt="dot" className="w-2 h-2" /> <p className=" ml-1">{feature}</p></div>
                  ))}
                </div>


                <div className=" w-full flex mt-5 text-[12px] items-center justify-between">
                  <button className=" w-fit px-4   py-1   bg-white/90  text-brand-blue">VIEW ALL</button>
                  <button className=" px-2   h-fit py-1   border-1 border-white/60 flex justify-between items-center"><span className="mr-1"><img src='/Icons/filter.svg' className='w-3 h-3 '></img></span>Show Filters</button>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>




      {/* <Filter setIsFilterVisible={setIsFilterVisible} isFilterVisible={isFilterVisible} expandedIndex={expandedIndex} />

      <div ref={homeRef} className=" w-full relative flex justify-center -mt-10  items-center  ">

        <Image
          src="/images/home/greyscale-mountain.png"
          alt="Background"
          fill
          className="object-cover  -z-10" // -z-10 sends it behind other content
          quality={100}
          priority
        />
        <div className=" absolute inset-0 w-full h-full  bg-white/50 ">
        </div>



        <div className="grid 2xl:gap-28 z-0 xl:gap-16 my-36 md:gap-12 gap-5   md:grid-cols-2    w-10/12  " style={{ width: 'fit-content' }}>

          <DestinationCards Destinations={Destinations} />

        </div>
      </div> */}

      {/* <Footer /> */}

    </div>
    // </SmoothScroll>


  );
}
