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

import MobileAnimatedVerticalCard from "@/components/AnimatedVerticalCards/MobileAnimatedVerticalCard";
import FilterLayout from "@/components/collections/FilterLayout";

import { rubik, playfair } from '@/app/fonts'
import { useIsMobile } from "../hooks/useIsMobile";


export default function Collection() {

  const isMobile = useIsMobile()

  const [expandedIndex, setExpandedIndex] = useState(null)
  const [isFullCardVisible, setIsFullCardVisible] = useState(true)
  const [isFilterVisible, setIsFilterVisible] = useState(false)

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

    <div className={`${rubik.className}`}>
      <Navbar isfixed={true} />

      {isMobile ? (
        <MobileAnimatedVerticalCard
          CardData={CardData}
          selectedVerticalTileMobile={selectedVerticalTileMobile}
          setSelectedVerticalTileMobile={setSelectedVerticalTileMobile}
        />
      ) : (
        <BannerAnimation
          expandedIndex={expandedIndex}
          setExpandedIndex={setExpandedIndex}
          isFullCardVisible={isFullCardVisible}
          setIsFullCardVisible={setIsFullCardVisible}
          handleShowFullCard={handleShowFullCard}
          setIsFilterVisible={setIsFilterVisible}
        />
      )}

      {/* <Filter setIsFilterVisible={setIsFilterVisible} isFilterVisible={isFilterVisible} expandedIndex={expandedIndex} /> */}
      <FilterLayout/>

      <div ref={homeRef} className=" w-full relative flex justify-center -mt-10  items-center  ">

        <div className="grid 2xl:gap-28 z-0 xl:gap-16 my-36 md:gap-12 gap-5   md:grid-cols-2    w-10/12  " style={{ width: 'fit-content' }}>

          <DestinationCards Destinations={Destinations} />

        </div>
      </div>

      <Footer />

    </div>
    // </SmoothScroll>


  );
}
