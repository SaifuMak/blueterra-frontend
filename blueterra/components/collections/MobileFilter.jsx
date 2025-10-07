import { useState, useEffect, useRef } from 'react'

import useClickOutside from '@/app/hooks/useClickOutside'
import MobileFilterComponent from './MobileFilterComponent';
import { RxCross2 } from '@/components/reactIcons'
import ScrollContainer from 'react-indiana-drag-scroll';
import { playfair } from '@/app/fonts'


export default function MobileFilter({ page,
    setIsAnyFilterOpened,
    isFilterVisible,
    showMobileFilter,
    setShowMobileFilter,
    flatSelectedFilters,
    setFlatSelectedFilters,
    setSelectedFilters,
    dataCount,
    selectedFilters,
    setSelectedVerticalTileMobile,
    handleSetCollectionRequestedToShowInMobile,
    handleScrollToItineraryResults,
    updateUrlParamsFromFilters,
    searchParams }) {

    const filterScrollRef = useRef();

    const handleRemoveFilter = (valueToRemove) => {

        // clear the flat list of selected filters
        // setFlatSelectedFilters(prev => prev.filter(item => item !== valueToRemove)
        // );

        // clear the actuall filter data
        setSelectedFilters((prev) => {
            const updated = {};

            for (const key in prev) {
                updated[key] = prev[key].filter((item) => item !== valueToRemove);
            }
            console.log(updated);
            // updateUrlParamsFromFilters(updated)

            return updated;
        });
    };

    // const handleClearAllSelectedFilters = () => {
    //     setSelectedFilters({
    //         categories: [],
    //         destinations: [],
    //         countries: [],
    //         collections: []
    //     })
    //     setFlatSelectedFilters([])
    // }


    useEffect(() => {
        // make the container scroll to end
        setTimeout(() => {
            if (filterScrollRef.current) {
                filterScrollRef.current.scrollTo({
                    left: filterScrollRef.current.scrollWidth,
                    behavior: 'smooth',
                });
            }
        }, 0);
    }, [flatSelectedFilters])



    useEffect(() => {
        if (selectedFilters) {
            updateUrlParamsFromFilters(selectedFilters);
        }
    }, [selectedFilters]);

    useEffect(() => {
        // flatten all values into a single array
        const flat = [
            ...selectedFilters.categories,
            ...selectedFilters.destinations,
            ...selectedFilters.countries,
            ...selectedFilters.collections,
        ];
        setFlatSelectedFilters(flat);
    }, [selectedFilters]);


    // close the tile when the node filter is removed 
    useEffect(() => {
        if (page == 'collections' && selectedFilters['collections'].length === 0) {
            setSelectedVerticalTileMobile(null)
            // handleScrollToItineraryResults()
        }
        else if (page == 'destinations' && selectedFilters['destinations'].length === 0) {
            setSelectedVerticalTileMobile(null)
            // handleScrollToItineraryResults()
        }
    }, [selectedFilters])

    return (
        <>

            <div className=" w-11/12 px-6  my-5 flex  flex-col  bg-white  z-20 sticky top-[50px]   ">
                <div className=" w-full flex justify-between mb-2 mt-4 items-center  ">
                    <p className={`${flatSelectedFilters?.length > 0 ? 'opacity-100' : '  opacity-0'} text-sm ml-2`}>showing {dataCount} {dataCount === 1 ? "result" : "results"} for:</p>
                    <button onClick={() => setShowMobileFilter(true)} className="   flex items-center  bg-sky-blue-1 px-3  py-1.5  w-fit h-fit  text-nowrap  text-[13px] font-normal rounded-sm max-lg:text-sm  text-white"><span className="mr-1"><img src='/Icons/filter.svg' className=' size-3 shrink-0 '></img></span>Filters</button>

                </div>

                {/* <div className=" w-full flex h-full  gap-2.5 flex-wrap  ">
                    {flatSelectedFilters?.map((filter, index) => (
                        <div key={index} onClick={() => handleRemoveFilter(filter)} className=" flex-center w-fit cursor-pointer border rounded-full py-1.5 px-3 ">
                            <p className=" text-[13px] text-nowrap">{filter}</p>
                            <RxCross2 className=' text-sm ml-0.5' />

                        </div>
                    ))}
                </div> */}



                {flatSelectedFilters?.length > 0 && <div className=" flex  w-full   ">

                    <ScrollContainer
                        innerRef={filterScrollRef}
                        className="flex max-w-2xl overflow-x-auto whitespace-nowrap  space-x-3 cursor-grab px-2 py-2 rounded-md"
                        vertical={false}
                        horizontal={true}
                        hideScrollbars={false} // set true to hide
                    >

                        {flatSelectedFilters?.map((filter, index) => (
                            <div key={index} onClick={() => handleRemoveFilter(filter)} className=" flex-center cursor-pointer border rounded-full py-1.5 px-3 ">
                                <p className=" max-lg:text-xs text-nowrap">{filter}</p>
                                <RxCross2 className=' ml-1' />
                            </div>
                        ))}
                    </ScrollContainer>

                    {/* <button onClick={handleClearAllSelectedFilters} className="  hover:text-sky-blue-dark text-nowrap cursor-pointer ml-5">Clear filters</button> */}
                </div >}

            </div>


            {/* {showMobileFilter && <div className="fixed inset-0 z-50 items-start h-screen  bg-black/40 flex md:hidden">
                <div className={`   w-full  pb-48  pt-24 relative  overflow-y-auto bg-white  min-h-screen z-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]   flex flex-col items-center`} >

                    <h2 className={` ${playfair.className}  tracking-wide text-xl font-medium`}>Refine Your Search</h2>
                    <RxCross2 onClick={() => setShowMobileFilter(false)} className=' text-slate-500 absolute text-2xl top-7  right-7' />
                    <div className={` w-11/12 h-auto grid grid-cols-1 py-2  mt-5  gap-4`} >

                        <MobileFilterComponent
                            name='collections'
                            options={collections}
                            handleFilters={handleFilters}
                            // isOpened={openedFilters.includes("collections")}
                            isOpened={openedFilter === "collections"}
                            handleItemSelection={handleItemSelection}
                            selectedFilters={selectedFilters}
                        />

                        <MobileFilterComponent
                            name='categories'
                            options={categories}
                            handleFilters={handleFilters}
                            // isOpened={openedFilters.includes("categories")}
                            isOpened={openedFilter === "categories"}
                            handleItemSelection={handleItemSelection}
                            selectedFilters={selectedFilters}
                        />

                        <MobileFilterComponent
                            name='destinations'
                            options={destinations}
                            handleFilters={handleFilters}
                            isOpened={openedFilter === "destinations"}
                            handleItemSelection={handleItemSelection}
                            selectedFilters={selectedFilters}
                        />

                        <MobileFilterComponent
                            name='countries'
                            options={countries}
                            handleFilters={handleFilters}
                            // isOpened={openedFilters.includes("countries")}
                            isOpened={openedFilter === "countries"}
                            handleItemSelection={handleItemSelection}
                            selectedFilters={selectedFilters}
                        />

                    </div>

                    <div className=" fixed min-h-20  text-dark-28 flex flex-col justify-end space-y-3   w-full bottom-0 p-5  bg-slate-100">
                        <div className=" flex justify-between items-center">
                            <p className=" text-sm">{flatSelectedFilters?.length > 0 ? `${flatSelectedFilters.length} filters applied` : ''}</p>
                            {flatSelectedFilters?.length > 0 && <p onClick={handleClearAllSelectedFilters} className=" underline text-sky-blue-dark ">Clear filters</p>}
                        </div>
                        <button onClick={() => setShowMobileFilter(false)} className=" bg-sky-blue-dark py-2.5 text-sm font-medium rounded-sm text-white">Explore Journeys</button>
                    </div>
                </div >
            </div>} */}
        </>
    )
}