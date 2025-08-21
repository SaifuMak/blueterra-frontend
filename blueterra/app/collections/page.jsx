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
import { usePathname } from "next/navigation";
import MobileFilter from "@/components/collections/MobileFilter";
import MobileFilterPopup from "@/components/collections/MobileFilterPopup";
import ZohoFormModal from "@/components/Forms/ZohoFormModal";
import AXIOS_INSTANCE from "@/lib/axios";
import Head from "next/head";

// export const metadata = {
//   title: "My Blog Title | CashPlus",
//   description: "This is the description of my blog page for SEO purposes.",
// };

export default function Collection() {

  const isMobile = useIsMobile()

  // const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true)
  const [itineraryData, setItineraryData] = useState(null)



  // zoho form 
  const [formOpen, setFormOpen] = useState(false);

  const [isCardRequestedToShowInMobile, setisCardRequestedToShowInMobile] = useState(false)

  const [collectionRequestedToShowInMobile, setCollectionRequestedToShowInMobile] = useState(null)


  const [isfullCardEnabledForFirstTime, setIsfullCardEnabledForFirstTime] = useState(false)

  const [expandedIndex, setExpandedIndex] = useState(null)
  const [isFullCardVisible, setIsFullCardVisible] = useState(true)
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [isAnyFilterOpened, setIsAnyFilterOpened] = useState(false)

  const [selectedVerticalTileMobile, setSelectedVerticalTileMobile] = useState(null)

  const [showMobileFilter, setShowMobileFilter] = useState(false)


  // for mobile devices
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    destinations: [],
    countries: [],
    collections: []
  })

  const [flatSelectedFilters, setFlatSelectedFilters] = useState([]);


  // handle clear filter control needed  in home page
  const handleChangeCollection = (indexOfCollection) => {
    setExpandedIndex(indexOfCollection)
  }

  const handleChangeCollectionForMobile = (indexOfCollection) => {
    setSelectedVerticalTileMobile(indexOfCollection)
  }


  const homeRef = useRef()


  const handleNavClick = (link) => {

    if (link === '/collections') {
      setIsfullCardEnabledForFirstTime(false)
      setIsFullCardVisible(true)
    }

  };

  const handleScrollTop = () => {
    setTimeout(() => {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }, 300);
  }

  const handleShowFullCard = (index) => {


    // when a card is clicked for its full size intially record it 
    setIsfullCardEnabledForFirstTime(true)

    // if any card once viewed in full size, limit the full size view  until the page is refreshed 
    if (!isfullCardEnabledForFirstTime) {
      setIsFullCardVisible(true)
    }
    handleScrollTop()
    setExpandedIndex(index)
  }


  const handleSetCollectionRequestedToShowInMobile = (index) => {
    document.body.style.overflow = 'auto'
    setCollectionRequestedToShowInMobile(index)
    homeRef.current?.scrollIntoView({ behavior: 'smooth' });
  }


  useEffect(() => {

    if (isMobile) {
      document.body.style.overflow = showMobileFilter || isAnyFilterOpened ? 'hidden' : 'auto';
    } else {
      document.body.style.overflow = isFullCardVisible || showMobileFilter || isAnyFilterOpened ? 'hidden' : 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, showMobileFilter, isFullCardVisible, isAnyFilterOpened]);


  //  this is made to prevent scrolling 
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'hidden'
    }
    handleScrollTop()
  }, [isMobile])


  const fetchItinerary = async (page = 1, loading = false) => {

    setIsLoading(true)
    // loading === true ? setIsLoading(true) : ''

    try {
      const response = await AXIOS_INSTANCE.get('itinerary-list/', {
        params: {
          page,
          categories: selectedFilters.categories.join(','),
          destinations: selectedFilters.destinations.join(','),
          countries: selectedFilters.countries.join(','),
          collections: selectedFilters.collections.join(',')
        }

      })
      setItineraryData(response?.data?.results)

    }

    catch (e) {
      console.log(e)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {

    console.log(selectedFilters);

    fetchItinerary()


  }, [selectedFilters])


  // if (isLoading) {
  //   return (
  //     <div className=" h-screen bg-slate-200  w-full "></div>
  //   )
  // }

  return (

    <div className={`${rubik.className} text-dark-28`}>
      <Navbar isfixed={true} onNavClick={handleNavClick} />

      {isMobile ? (
        <MobileAnimatedVerticalCard
          CardData={CardData}
          selectedVerticalTileMobile={selectedVerticalTileMobile}
          setSelectedVerticalTileMobile={setSelectedVerticalTileMobile}
          handleSetCollectionRequestedToShowInMobile={handleSetCollectionRequestedToShowInMobile}
        />
      ) : (
        <BannerAnimation
          expandedIndex={expandedIndex}
          setExpandedIndex={setExpandedIndex}
          isFullCardVisible={isFullCardVisible}
          setIsFullCardVisible={setIsFullCardVisible}
          handleShowFullCard={handleShowFullCard}
          setIsFilterVisible={setIsFilterVisible}
          isFilterVisible={isFilterVisible}
        />
      )}

      {!isMobile && <FilterLayout selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} setIsAnyFilterOpened={setIsAnyFilterOpened} isFilterVisible={isFilterVisible} expandedBannerCollectionIndex={expandedIndex} handleChangeCollection={handleChangeCollection} />}

      <div ref={homeRef} className=" w-full relative flex flex-col  justify-center max-sm:mt-0  xl:mt-36 lg:mt-48  items-center  ">

        {isMobile && <MobileFilter
          setIsAnyFilterOpened={setIsAnyFilterOpened}
          isFilterVisible={isFilterVisible}
          showMobileFilter={showMobileFilter}
          setShowMobileFilter={setShowMobileFilter}
          flatSelectedFilters={flatSelectedFilters}
          setFlatSelectedFilters={setFlatSelectedFilters}
          setSelectedFilters={setSelectedFilters}
        />}

        <div className="grid 2xl:gap-28 z-0 xl:gap-16 lg:my-28 xl:my-36 md:gap-12 gap-10 md:grid-cols-2 w-10/12 xl:w-9/12 ">
          {isLoading ? (
            <div className="flex items-center justify-center w-full min-h-[60vh] col-span-2">
              <p className="text-lg font-medium">Loading...</p>
            </div>
          ) : itineraryData && itineraryData.length > 0 ? (
            <DestinationCards Destinations={Destinations} itineraryData={itineraryData} />
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]  w-full col-span-2">
              <p className="text-lg font-medium">No results found</p>
            </div>
          )}
        </div>

      </div>

      <AdventureSection setFormOpen={setFormOpen} />

      <MobileFilterPopup
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        showMobileFilter={showMobileFilter}
        setShowMobileFilter={setShowMobileFilter}
        flatSelectedFilters={flatSelectedFilters}
        setFlatSelectedFilters={setFlatSelectedFilters}
        expandedBannerCollectionIndex={selectedVerticalTileMobile}
        handleChangeCollection={handleChangeCollectionForMobile}
      />

      <Footer />
      <ZohoFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />


    </div>

    // </SmoothScroll>


  );
}
