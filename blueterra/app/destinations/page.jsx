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
import usePageLoaded from "../hooks/usePageLoaded";
import LoaderIcon from "@/components/generalComponents/LoaderIcon";
import ResponsiveClipPath from "@/components/generalComponents/ResponsiveClipPath";
// export const metadata = {
//   title: "My Blog Title | CashPlus",
//   description: "This is the description of my blog page for SEO purposes.",
// };
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


gsap.registerPlugin(ScrollToPlugin);



export default function Destination() {

  const isMobile = useIsMobile()
  const isLoaded = usePageLoaded();

  // const [isTileSelectedForFirstTime, setIsTileSelectedForFirstTime] = useState(false)
  const isTileSelectedForFirstTimeRef = useRef(false);


  // const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true)
  const [itineraryData, setItineraryData] = useState(null)

  const [destinationsData, setDestinationsData] = useState(null)
  const [destinationLoading, setDestinationLoading] = useState(true)
  const [filtersList, setFiltersList] = useState(null)


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

  // this deals with the expansion of vertical cards in mobile
  const handleChangeCollectionForMobile = (indexOfCollection) => {

    console.log(indexOfCollection, 'this is the index of banner that requested to  expand in destinations');

    setSelectedVerticalTileMobile(indexOfCollection)
  }


  const homeRef = useRef()


  const handleNavClick = (link) => {

    if (link === '/destinations') {
      setIsfullCardEnabledForFirstTime(false)
      setIsFullCardVisible(true)
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
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


  const handleScrollToItineraryResults = () => {
    if (isTileSelectedForFirstTimeRef.current) {
      gsap.to(window, {
        duration: 0.8, // scroll duration (in seconds)
        scrollTo: { y: homeRef.current, offsetY: 30 },
        ease: "sine.inOut" // easing for smoothness
      });
    }
  }

  const handleSetCollectionRequestedToShowInMobile = (index) => {

    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
    isTileSelectedForFirstTimeRef.current = true;
    handleScrollToItineraryResults()

    // setCollectionRequestedToShowInMobile(index)
    // homeRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {

    if (isMobile) {
      // document.body.style.overflow = showMobileFilter || isAnyFilterOpened ? 'hidden' : 'auto';
      document.documentElement.style.overflow = showMobileFilter || isAnyFilterOpened || !isTileSelectedForFirstTimeRef.current ? 'hidden' : 'auto';

    } else {
      document.body.style.overflow = isFullCardVisible || showMobileFilter || isAnyFilterOpened ? 'hidden' : 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
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



  const fetchFilters = async () => {
    try {
      const response = await AXIOS_INSTANCE.get(`filters-list/`);
      const data = response?.data
      setFiltersList(response?.data)

    } catch (error) {
      console.error('Failed to fetch the filters:', error);
    } finally {
      // setIsLoading(false);
    }
  };


  const fetchDestinations = async () => {

    try {
      const response = await AXIOS_INSTANCE.get('get-destinations/')
      setDestinationsData(response?.data)
    }
    catch (error) {

    }
    finally {
      setTimeout(() => {
        setDestinationLoading(false)
      }, 500);
    }
  }



  useEffect(() => {

    fetchItinerary()

  }, [selectedFilters])


  useEffect(() => {
    fetchFilters()
    fetchDestinations()
  }, [])


  return (
    <>

      {destinationLoading ? (
        <div className="  w-full h-screen flex-center  ">
          <Navbar isfixed={true} onNavClick={handleNavClick} />
          <LoaderIcon />
        </div>
      ) : (

        <div className={`${rubik.className} text-dark-28`}>

          <Navbar isfixed={true} onNavClick={handleNavClick} />

          {isMobile ? (
            <MobileAnimatedVerticalCard
              page='destinations'
              CardData={destinationsData}
              selectedVerticalTileMobile={selectedVerticalTileMobile}
              setSelectedVerticalTileMobile={setSelectedVerticalTileMobile}
              handleSetCollectionRequestedToShowInMobile={handleSetCollectionRequestedToShowInMobile}

            />
          ) : (
            <BannerAnimation
              page='destinations'
              CardData={destinationsData}
              expandedIndex={expandedIndex}
              setExpandedIndex={setExpandedIndex}
              isFullCardVisible={isFullCardVisible}
              setIsFullCardVisible={setIsFullCardVisible}
              handleShowFullCard={handleShowFullCard}
              setIsFilterVisible={setIsFilterVisible}
              isFilterVisible={isFilterVisible}

            />
          )}

          {!isMobile && <FilterLayout page='destinations' filtersList={filtersList} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} setIsAnyFilterOpened={setIsAnyFilterOpened} isFilterVisible={isFilterVisible} expandedBannerCollectionIndex={expandedIndex} handleChangeCollection={handleChangeCollection} setExpandedTileIndex={setExpandedIndex} setIsFilterVisible={setIsFilterVisible} />}

          <div ref={homeRef} className=" w-full relative flex flex-col  justify-center max-sm:mt-0  xl:mt-36 lg:mt-48  items-center  ">

            <ResponsiveClipPath
              outerClass='absolute  max-sm:hidden md:w-[24%] w-[78%]  top-10 left-0 h-fit'
              ImagePath='/images/destinations/patterns/top-pattern.png'
              width={800}
            />

            {isMobile && <MobileFilter
              page='destinations'
              filtersList={filtersList}
              setIsAnyFilterOpened={setIsAnyFilterOpened}
              isFilterVisible={isFilterVisible}
              showMobileFilter={showMobileFilter}
              setShowMobileFilter={setShowMobileFilter}
              flatSelectedFilters={flatSelectedFilters}
              setFlatSelectedFilters={setFlatSelectedFilters}
              setSelectedFilters={setSelectedFilters}
              dataCount={itineraryData?.length}
              selectedFilters={selectedFilters}
              setCollectionRequestedToShowInMobile={setCollectionRequestedToShowInMobile}
              setSelectedVerticalTileMobile={setSelectedVerticalTileMobile}
              handleSetCollectionRequestedToShowInMobile={handleSetCollectionRequestedToShowInMobile}
              handleScrollToItineraryResults={handleScrollToItineraryResults}
            />}

            <div className="grid 2xl:gap-28 z-0 xl:gap-16 lg:my-28 xl:my-36 md:gap-12 gap-10 md:grid-cols-2 w-10/12 xl:w-9/12 ">
              {isLoading ? (
                <div className="flex items-center justify-center w-full min-h-[60vh] col-span-2">
                  <LoaderIcon />
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
            page='destinations'
            filtersList={filtersList}
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
      )}
    </>
    // </SmoothScroll>


  );
}
