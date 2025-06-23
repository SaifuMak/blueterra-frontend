'use client'

import BannerAnimation from "@/components/Home/BannerAnimation";
import DestinationCards from "@/components/DestinationsView/DestinationCards";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Filter from "@/components/Filter";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";


export default function Home() {

  const [expandedIndex, setExpandedIndex] = useState(null)

  const [isFullCardVisible, setIsFullCardVisible] = useState(true)
  const [isFilterVisible, setIsFilterVisible] = useState(false)


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
      <Navbar />


      <BannerAnimation
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
        isFullCardVisible={isFullCardVisible}
        setIsFullCardVisible={setIsFullCardVisible}
        handleShowFullCard={handleShowFullCard}
        setIsFilterVisible={setIsFilterVisible}
      />

      <Filter setIsFilterVisible={setIsFilterVisible} isFilterVisible={isFilterVisible} />

      <div className=" w-full relative flex justify-center -mt-10  items-center  ">

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



        <div className="grid 2xl:gap-28 z-0 xl:gap-16 my-36 md:gap-12 gap-5   md:grid-cols-2   w-10/12  " style={{ width: 'fit-content' }}>

          <DestinationCards Destinations={Destinations} />

        </div>
      </div>

      <Footer/>

    </div>
    // </SmoothScroll>


  );
}
