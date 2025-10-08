'use client'
import BannerAnimation from "@/components/Home/BannerAnimation";
import DestinationCards from "@/components/DestinationsView/DestinationCards";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";

import MobileAnimatedVerticalCard from "@/components/AnimatedVerticalCards/MobileAnimatedVerticalCard";
import FilterLayout from "@/components/collections/FilterLayout";

import { rubik } from '@/app/fonts'
import AdventureSection from "@/components/collections/AdventureSection";

import MobileFilter from "@/components/collections/MobileFilter";
import MobileFilterPopup from "@/components/collections/MobileFilterPopup";
import ZohoFormModal from "@/components/Forms/ZohoFormModal";
import AXIOS_INSTANCE from "@/lib/axios";
import LoaderIcon from "@/components/generalComponents/LoaderIcon";
import ResponsiveClipPath from "@/components/generalComponents/ResponsiveClipPath";
import { useMediaQuery } from 'react-responsive'
import { useRouter, useSearchParams } from 'next/navigation'
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { getPageNumber, getTotalPagesCount } from "@/app/utils/paginationHelpers";
import ItineraryPagination from "../generalComponents/ItineraryPagination";
gsap.registerPlugin(ScrollToPlugin);


export default function CollectionsClient() {

  const isMobile = useMediaQuery({
    query: '(max-width: 844px)'
  })

  const router = useRouter()
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(true)
  const [itineraryData, setItineraryData] = useState(null)

  const [collectionsData, setCollectionsData] = useState([])
  const [collectionsLoading, setCollectionsLoading] = useState(true)

  const [filtersList, setFiltersList] = useState(null)

  const [isQueryParams, setIsQueryParams] = useState(true)

  const [nextPage, setNextPage] = useState(null); // Next page URL
  const [prevPage, setPrevPage] = useState(null); // Previous page URL
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)

  // zoho form 
  const [formOpen, setFormOpen] = useState(false);

  const [isCardRequestedToShowInMobile, setisCardRequestedToShowInMobile] = useState(false)

  const [collectionRequestedToShowInMobile, setCollectionRequestedToShowInMobile] = useState(null)

  const [isfullCardEnabledForFirstTime, setIsfullCardEnabledForFirstTime] = useState(false)
  const isTileSelectedForFirstTimeRef = useRef(false);

  const [expandedIndex, setExpandedIndex] = useState(null)
  const [isFullCardVisible, setIsFullCardVisible] = useState(true)
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const [isAnyFilterOpened, setIsAnyFilterOpened] = useState(false)

  const [selectedVerticalTileMobile, setSelectedVerticalTileMobile] = useState(null)

  const [showMobileFilter, setShowMobileFilter] = useState(false)

  // for mobile devices

  // const [selectedFilters, setSelectedFilters] = useState({
  //   categories: [],
  //   destinations: [],
  //   countries: [],
  //   collections: []
  // })

  const [selectedFilters, setSelectedFilters] = useState(null);


  const [flatSelectedFilters, setFlatSelectedFilters] = useState([]);

  // handle clear filter control needed  in home page
  const handleChangeCollection = (indexOfCollection) => {
    setExpandedIndex(indexOfCollection)
  }

  const handleChangeCollectionForMobile = (indexOfCollection) => {
    // alert('called handleChangeCollectionForMobile')
    // console.log('called handleChangeCollectionForMobile');

    setSelectedVerticalTileMobile(indexOfCollection)
  }

  const homeRef = useRef()

  const handleNavClick = (link) => {

    if (link === '/collections') {
      setIsfullCardEnabledForFirstTime(false)
      setIsFullCardVisible(true)
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 500);

    }
  };

  const handleScrollTop = () => {
    if (isMobile) return
    // alert('called handleScrollTop')

    setTimeout(() => {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }, 300);
  }


  const handleShowFullCard = (index) => {

    // alert('called handleShowFullCard')
    // console.log('called handleShowFullCard')

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

    // alert('called handleScrollToItineraryResults')
    // console.log('called handleScrollToItineraryResults')

    if (isTileSelectedForFirstTimeRef.current) {
      gsap.to(window, {
        duration: 0.8, // scroll duration (in seconds)
        scrollTo: { y: homeRef.current, offsetY: 30 },
        ease: "sine.inOut" // easing for smoothness
      });
    }
  }


  const handleSetCollectionRequestedToShowInMobile = (index) => {

    // alert('called handleSetCollectionRequestedToShowInMobile')
    // console.log('called handleSetCollectionRequestedToShowInMobile');


    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
    isTileSelectedForFirstTimeRef.current = true
    handleScrollToItineraryResults()
  }

  useEffect(() => {
    if (!searchParams.toString()) {
      // no query params
      setIsQueryParams(false)
    }
    else {
      setTimeout(() => {
        setIsQueryParams(false)
      }, 2000);
    }
  }, [])



  useEffect(() => {

    if (isMobile) {

      // document.body.style.overflow = showMobileFilter || isAnyFilterOpened ||  selectedVerticalTileMobile === null ? 'hidden' : 'auto';
      document.documentElement.style.overflow = showMobileFilter || isAnyFilterOpened || !isTileSelectedForFirstTimeRef.current ? 'hidden' : 'auto';

    } else {
      console.log('enetred the else block ');

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



  const fetchFilters = async () => {
    try {
      const response = await AXIOS_INSTANCE.get(`filters-list/`);
      const data = response?.data
      setFiltersList(response?.data)

    } catch (error) {
      console.error('Failed to load journal:', error);
    } finally {
      // setIsLoading(false);
    }
  };


  const fetchCollections = async () => {

    try {
      const response = await AXIOS_INSTANCE.get('get-collections/')
      setCollectionsData(response?.data)
    }
    catch (error) {

    }
    finally {
      setTimeout(() => {
        setCollectionsLoading(false)

      }, 500);
    }
  }


  useEffect(() => {

    if (collectionsData?.length === 0) return

    if (!searchParams.toString()) {
      // no query params
      return;
    }


    const collectionParms = searchParams.get("collections") || ""

    if (collectionParms) {
      const indexOfCollection = collectionsData?.findIndex(
        (item) => item.title === collectionParms
      );

      handleShowFullCard(indexOfCollection)

      if (isMobile) {
        handleChangeCollectionForMobile(indexOfCollection)
      }

    }
    else {
      handleShowFullCard(null)
      if (isMobile) {
        handleChangeCollectionForMobile(null)
      }
    }

    setIsFullCardVisible(false)


    // this is for mobile, if there is params scroll to results 
    if (isMobile) {
      setTimeout(() => {
        handleSetCollectionRequestedToShowInMobile(null);
      }, 500);
    }

  }, [collectionsData])



  const updateUrlParamsFromFilters = (filters) => {

    const params = new URLSearchParams(searchParams.toString())

    filters.categories.length
      ? params.set("categories", filters.categories.join(","))
      : params.delete("categories")

    filters.destinations.length
      ? params.set("destinations", filters.destinations.join(","))
      : params.delete("destinations")

    filters.countries.length
      ? params.set("countries", filters.countries.join(","))
      : params.delete("countries")

    filters.collections.length
      ? params.set("collections", filters.collections.join(","))
      : params.delete("collections")

    // router.replace(`?${params.toString()}`)

    router.replace(`?${params.toString()}`, { scroll: false })

  }

  // this initialize the filters from the params if no params filters a empty initially
  useEffect(() => {
    const filtersFromParams = {
      categories: (searchParams.get("categories") || "").split(",").filter(Boolean),
      destinations: (searchParams.get("destinations") || "").split(",").filter(Boolean),
      countries: (searchParams.get("countries") || "").split(",").filter(Boolean),
      collections: (searchParams.get("collections") || "").split(",").filter(Boolean),
    }
    setSelectedFilters(filtersFromParams);
  }, [searchParams])


  const fetchItinerary = async (page = 1, loading = false) => {

    setIsLoading(true)
    // loading === true ? setIsLoading(true) : ''

    setItineraryData([])
    setTotalPages(null)

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
      setCurrentPage(page)
      const nextpage = getPageNumber(response.data.next)
      const previous = getPageNumber(response.data.previous)
      setNextPage(nextpage)
      setPrevPage(previous)

      const totalPages = getTotalPagesCount(response.data.count, 6)
      setTotalPages(totalPages)

      handleScrollTop()
    }

    catch (e) {
      console.log(e)
    }
    finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    if (selectedFilters) {
      fetchItinerary()
    }
  }, [selectedFilters])

  useEffect(() => {
    fetchFilters()
    fetchCollections()
  }, [])



  return (
    <>

      {isQueryParams && <div className=" h-[110vh]  fixed inset-0 w-full z-[999]  flex-center bg-white   ">
        <LoaderIcon /></div>}

      {collectionsLoading ? (
        <div className="  w-full h-screen flex-center  ">
          <Navbar isfixed={true} onNavClick={handleNavClick} />
          <LoaderIcon />
        </div>
      ) : (

        <div className={`${rubik.className} bg-white text-dark-28`}>

          <Navbar isfixed={true} onNavClick={handleNavClick} />

          {isMobile ? (
            <MobileAnimatedVerticalCard
              page='collections'
              CardData={collectionsData}
              selectedVerticalTileMobile={selectedVerticalTileMobile}
              setSelectedVerticalTileMobile={setSelectedVerticalTileMobile}
              handleSetCollectionRequestedToShowInMobile={handleSetCollectionRequestedToShowInMobile}
            />
          ) : (
            <BannerAnimation
              page='collections'
              CardData={collectionsData}
              expandedIndex={expandedIndex}
              setExpandedIndex={setExpandedIndex}
              isFullCardVisible={isFullCardVisible}
              setIsFullCardVisible={setIsFullCardVisible}
              handleShowFullCard={handleShowFullCard}
              setIsFilterVisible={setIsFilterVisible}
              isFilterVisible={isFilterVisible}

            />
          )}

          {!isMobile && <FilterLayout page='collections'
            filtersList={filtersList}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setIsAnyFilterOpened={setIsAnyFilterOpened}
            isFilterVisible={isFilterVisible}
            expandedBannerCollectionIndex={expandedIndex}
            handleChangeCollection={handleChangeCollection}
            setExpandedTileIndex={setExpandedIndex}
            setIsFilterVisible={setIsFilterVisible}
            updateUrlParamsFromFilters={updateUrlParamsFromFilters}
            searchParams={searchParams}
          />}

          <div ref={homeRef} className=" w-full relative flex flex-col  justify-center max-sm:mt-0  xl:mt-36 lg:mt-48  items-center   ">

            <ResponsiveClipPath
              outerClass='absolute md:w-[24%]  max-sm:hidden w-[78%]  top-10 left-0 h-fit'
              ImagePath='/images/destinations/patterns/top-pattern.png'
              width={800}
            />

            {isMobile && <MobileFilter
              page='collections'
              setIsAnyFilterOpened={setIsAnyFilterOpened}
              isFilterVisible={isFilterVisible}
              showMobileFilter={showMobileFilter}
              setShowMobileFilter={setShowMobileFilter}
              flatSelectedFilters={flatSelectedFilters}
              setFlatSelectedFilters={setFlatSelectedFilters}
              setSelectedFilters={setSelectedFilters}
              dataCount={itineraryData?.length}
              selectedFilters={selectedFilters}
              handleSetCollectionRequestedToShowInMobile={handleSetCollectionRequestedToShowInMobile}
              setSelectedVerticalTileMobile={setSelectedVerticalTileMobile}
              handleScrollToItineraryResults={handleScrollToItineraryResults}
              updateUrlParamsFromFilters={updateUrlParamsFromFilters}
              searchParams={searchParams}
            />}


            <div className="grid 2xl:gap-28 relative xl:gap-16 lg:mt-28 xl:mt-36 md:gap-12 gap-8 md:grid-cols-2 w-10/12 xl:w-9/12 z-0 ">

              {isLoading && <div className="flex items-center justify-center w-full z-50  h-full  col-span-2 absolute inset-0">
                <LoaderIcon />
              </div>
              }

              {
                itineraryData && itineraryData.length > 0 ? (
                  <DestinationCards itineraryData={itineraryData} />
                ) : (
                  <div className="flex items-center justify-center min-h-[60vh]  w-full col-span-2">
                    <p className="text-lg font-medium">No results found</p>
                  </div>
                )}
            </div>


            {itineraryData && itineraryData.length > 0 && <div className=" w-full lg:w-10/12 xl:w-9/12 h-full lg:my-12">
              <ItineraryPagination
                prevPage={prevPage}
                nextPage={nextPage}
                function_to_call={fetchItinerary}
                currentPage={currentPage}
                TotalPages={totalPages}
                buttonColor='bg-[#58c2df]'
                innerClass='flex max-lg:flex-col max-lg:items-center max-lg:space-y-4 lg:justify-between w-full lg:w-7/12 lg:pl-8  2xl:pl-16'
              />
            </div>}

          </div>

          <AdventureSection setFormOpen={setFormOpen} />

          <MobileFilterPopup
            page='collections'
            filtersList={filtersList}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            showMobileFilter={showMobileFilter}
            setShowMobileFilter={setShowMobileFilter}
            flatSelectedFilters={flatSelectedFilters}
            setFlatSelectedFilters={setFlatSelectedFilters}
            expandedBannerCollectionIndex={selectedVerticalTileMobile}
            handleChangeCollection={handleChangeCollectionForMobile}
            updateUrlParamsFromFilters={updateUrlParamsFromFilters}
            searchParams={searchParams}
            handleSetCollectionRequestedToShowInMobile={handleSetCollectionRequestedToShowInMobile}
          />

          <Footer />
          <ZohoFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />


        </div>
      )}
    </>


  );
}
