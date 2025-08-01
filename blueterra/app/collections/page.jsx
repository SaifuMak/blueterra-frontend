'use client'

import BannerAnimation from "@/components/Home/BannerAnimation";
import DestinationCards from "@/components/DestinationsView/DestinationCards";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Filter from "@/components/Filter";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";
import Destinations from "@/components/datas/DestinationsDummy";

import MobileAnimatedVerticalCard from "@/components/AnimatedVerticalCards/MobileAnimatedVerticalCard";
import FilterLayout from "@/components/collections/FilterLayout";

import { rubik, playfair } from '@/app/fonts'
import { useIsMobile } from "../hooks/useIsMobile";
import TitleText from "@/components/generalComponents/TitleText";
import Button from "@/components/generalComponents/Button";
import AdventureSection from "@/components/collections/AdventureSection";

import CardData from "@/components/datas/Destinations";


export default function Collection() {

  const isMobile = useIsMobile()

  const [isfullCardEnabledForFirstTime, setIsfullCardEnabledForFirstTime] = useState(false)

  const [expandedIndex, setExpandedIndex] = useState(null)
  const [isFullCardVisible, setIsFullCardVisible] = useState(true)
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [isAnyFilterOpened, setIsAnyFilterOpened] = useState(false)

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

  const handleShowFullCard = (index) => {

    console.log(' ful card is requested -------------------')
    setIsfullCardEnabledForFirstTime(true)

    if (!isfullCardEnabledForFirstTime) {
      setIsFullCardVisible(true)
    }
    handleScrollTop()
    setExpandedIndex(index)
  }

  useEffect(() => {

    if (isMobile) {
      document.body.style.overflow = 'auto'
      return;
    }

    document.body.style.overflow = isFullCardVisible || isFilterVisible || isAnyFilterOpened ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, isFullCardVisible, isFilterVisible, isAnyFilterOpened]);


  // this handles the closing of the filter while clicking outside
  // useEffect(() => {
  //   const handleClick = (event) => {
  //     if (homeRef.current && homeRef.current.contains(event.target)) {
  //       setIsFilterVisible(false)
  //     }
  //   };

  //   // Listen for all clicks
  //   document.addEventListener('click', handleClick);

  //   // Cleanup
  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, []);



  return (


    <div className={`${rubik.className} text-dark-28`}>
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

      {!isMobile && <FilterLayout setIsAnyFilterOpened={setIsAnyFilterOpened} />}

      <div ref={homeRef} className=" w-full relative flex justify-center max-sm:mt-20  lg:-mt-10  items-center  ">

        <div className="grid 2xl:gap-28 z-0 xl:gap-16 lg:my-28 xl:my-36 md:gap-12 gap-10   md:grid-cols-2 w-10/12 xl:w-9/12      " >

          <DestinationCards Destinations={Destinations} />

        </div>
      </div>

      <AdventureSection />

      <Footer />

    </div>


    // </SmoothScroll>


  );
}
