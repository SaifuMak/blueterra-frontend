import { useState, useEffect, useRef } from 'react'
import FilterComponent from './FilterComponent'
import useClickOutside from '@/app/hooks/useClickOutside'

import { RxCross2 } from '@/components/reactIcons'
import ScrollContainer from 'react-indiana-drag-scroll';
import { destinations, countries, collections, categories } from '@/components/datas/FilterOptions'

export default function FilterLayout({ page, selectedFilters, setSelectedFilters, setIsAnyFilterOpened, isFilterVisible, expandedBannerCollectionIndex, handleChangeCollection, setExpandedTileIndex, setIsFilterVisible }) {

    // const [openedFilters, setOpenedFilters] = useState([])

    // const filterContaineRef = useClickOutside(() => setOpenedFilters([]))

    const [openedFilter, setOpenedFilter] = useState(null)
    const [flatSelectedFilters, setFlatSelectedFilters] = useState([])

    const filterContaineRef = useClickOutside(() => setOpenedFilter(null))

    const filterScrollRef = useRef();

    const handleFilters = (filter) => {
        filter === openedFilter ? setOpenedFilter(null) : setOpenedFilter(filter)

    }

    const handleClearAllSelectedFilters = () => {
        setSelectedFilters({
            categories: [],
            destinations: [],
            countries: [],
            collections: []
        })
        setFlatSelectedFilters([])

    }

    const handleItemSelection = (filter, value) => {
        if (filter === 'collections' && page === 'collections') {
            handleClearAllSelectedFilters()
            handleChangeCollection(collections.indexOf(value))
        }
        else if (filter === 'destinations' && page === 'destinations') {
            handleClearAllSelectedFilters()
            handleChangeCollection(destinations.indexOf(value))
        }

        // deals with actual data 
        setSelectedFilters(prev => {
            const selectedFilter = prev[filter];
            return {
                ...prev,
                [filter]: selectedFilter.includes(value)
                    ? selectedFilter.filter(item => item !== value)
                    : [...selectedFilter, value]
            };
        });

        // deals with flat list data 
        setFlatSelectedFilters(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );

    }


    const handleRemoveFilter = (valueToRemove) => {
        console.log(valueToRemove)

        // clear the flat list of selected filters
        setFlatSelectedFilters(prev => prev.filter(item => item !== valueToRemove)
        );

        // clear the actuall filter data
        setSelectedFilters((prev) => {
            const updated = {};

            for (const key in prev) {
                updated[key] = prev[key].filter((item) => item !== valueToRemove);
            }

            return updated;
        });
    };


    useEffect(() => {

        if(expandedBannerCollectionIndex === null){
            // this condition helps in  preventing in clearing all filters when the node filter is removed, 
            return
        }

        handleClearAllSelectedFilters()
        if (page === 'destinations') {
            handleItemSelection('destinations', destinations[expandedBannerCollectionIndex])
        }
        else if (page === 'collections') {
            handleItemSelection('collections', collections[expandedBannerCollectionIndex])
        }

    }, [expandedBannerCollectionIndex])


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
        console.log(flatSelectedFilters);

        if (flatSelectedFilters.length === 0) {
            // setExpandedTileIndex(null)
            setIsFilterVisible(true)
        }
    }, [flatSelectedFilters])


    // close the tile when the node filter is removed 
    useEffect(() => {
        if (page == 'collections' && selectedFilters['collections'].length === 0) {
            setExpandedTileIndex(null)
        }
        else if (page == 'destinations' && selectedFilters['destinations'].length === 0) {
            setExpandedTileIndex(null)
        }
    }, [selectedFilters])



    return (
        <div className={` ${isFilterVisible && flatSelectedFilters.length > 0 ? 'min-h-[30px]' : 'min-h-[0px]'}  w-full   pt-3 bg-white  fixed top-0 z-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mt-32  flex flex-col items-center justify-center`} >
            <div ref={filterContaineRef} className={`${isFilterVisible ? 'visible' : 'hidden'} xl:w-9/12  w-10/12 h-auto grid grid-cols-4 py-2   gap-7`} >




                {page === 'collections' && <FilterComponent
                    name='collections'
                    options={collections}
                    handleFilters={handleFilters}
                    // isOpened={openedFilters.includes("collections")}
                    isOpened={openedFilter === "collections"}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />}

                 {page === 'destinations' && <FilterComponent
                    name='countries'
                    options={countries}
                    handleFilters={handleFilters}
                    // isOpened={openedFilters.includes("countries")}
                    isOpened={openedFilter === "countries"}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />}

                <FilterComponent
                    name='categories'
                    options={categories}
                    handleFilters={handleFilters}
                    // isOpened={openedFilters.includes("categories")}
                    isOpened={openedFilter === "categories"}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />

                <FilterComponent
                    name='destinations'
                    options={destinations}
                    handleFilters={handleFilters}
                    isOpened={openedFilter === "destinations"}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />

                {page === 'destinations' && <FilterComponent
                    name='collections'
                    options={collections}
                    handleFilters={handleFilters}
                    // isOpened={openedFilters.includes("collections")}
                    isOpened={openedFilter === "collections"}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />}

                  {page === 'collections' &&<FilterComponent
                    name='countries'
                    options={countries}
                    handleFilters={handleFilters}
                    // isOpened={openedFilters.includes("countries")}
                    isOpened={openedFilter === "countries"}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />}

            </div>


            {flatSelectedFilters?.filter(Boolean)?.length > 0 && <div className=" flex  xl:w-9/12  w-9/12    ">

                <ScrollContainer
                    innerRef={filterScrollRef}
                    className="flex max-w-2xl overflow-x-auto whitespace-nowrap  space-x-3 cursor-grab px-2 py-2 rounded-md"
                    vertical={false}
                    horizontal={true}
                    hideScrollbars={false} // set true to hide
                >
                    {flatSelectedFilters?.filter(Boolean)?.map((filter, index) => (
                        <div key={index} onClick={() => handleRemoveFilter(filter)} className=" flex-center cursor-pointer border rounded-full py-1.5 px-3 ">
                            <p className=" text-sm max-lg:text-xs text-nowrap">{filter}</p>
                            <RxCross2 className=' ml-1' />

                        </div>
                    ))}
                </ScrollContainer>


                <button onClick={handleClearAllSelectedFilters} className="  hover:text-sky-blue-dark text-nowrap cursor-pointer ml-5">Clear filters</button>
            </div >}

        </div >
    )
}