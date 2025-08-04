import { useState, useEffect, useRef } from 'react'
import FilterComponent from './FilterComponent'
import useClickOutside from '@/app/hooks/useClickOutside'

import { RxCross2 } from '@/components/reactIcons'
import ScrollContainer from 'react-indiana-drag-scroll';

export default function FilterLayout({ setIsAnyFilterOpened, isFilterVisible }) {

    // const [openedFilters, setOpenedFilters] = useState([])

    // const filterContaineRef = useClickOutside(() => setOpenedFilters([]))


    const [openedFilter, setOpenedFilter] = useState(null)
    const [flatSelectedFilters, setFlatSelectedFilters] = useState([])

    const filterContaineRef = useClickOutside(() => setOpenedFilter(null))

    const filterScrollRef = useRef();

    const destinations = ["Asia", "Africa", "North America", "South America", "Antarctica", "Europe", "Australia",]
    const countries = ["Dubai", "Thailand", "Kenya", "Maldives", "Iceland"]
    const collections = ["Signature Journeys", "Explore by Landscape", "Adventures in Motion", "Mindful Escapes", "Unforgettable Editions", "Tailored for You"]
    const categories = ["Adventure & Exploration", "Luxury Escapes", "Romantic Getaways", "Cultural Immersion", "Historical Journeys", "Gastronomic Trails", "Nature & Wildlife Expeditions", "Safari Experiences", "Polar & Arctic Journeys"]

    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        destinations: [],
        countries: [],
        collections: []
    })

    // const handleFilters = (filter) => {
    //     setOpenedFilters((prev) =>
    //         prev.includes(filter)
    //             ? prev.filter((f) => f !== filter)
    //             : [...prev, filter]
    //     );
    // }

    const handleFilters = (filter) => {
        filter === openedFilter ? setOpenedFilter(null) : setOpenedFilter(filter)

    }

    const handleItemSelection = (filter, value) => {

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

    const handleClearAllSelectedFilters = () => {
        setSelectedFilters({
            categories: [],
            destinations: [],
            countries: [],
            collections: []
        })
        setFlatSelectedFilters([])
    }


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




    return (
        <div className={` ${isFilterVisible && flatSelectedFilters.length > 0 ? 'min-h-[30px]' : 'min-h-[0px]'}  w-full   pt-3 bg-white  fixed top-0 z-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mt-32  flex flex-col items-center justify-center`} >
            <div ref={filterContaineRef} className={`${isFilterVisible ? 'hidden' : 'visible'} xl:w-9/12  w-10/12 h-auto grid grid-cols-4 py-2   gap-7`} >


                <FilterComponent
                    name='collections'
                    options={collections}
                    handleFilters={handleFilters}
                    // isOpened={openedFilters.includes("collections")}
                    isOpened={openedFilter === "collections"}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />

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

                <FilterComponent
                    name='countries'
                    options={countries}
                    handleFilters={handleFilters}
                    // isOpened={openedFilters.includes("countries")}
                    isOpened={openedFilter === "countries"}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />

            </div>


            {flatSelectedFilters?.length > 0 && <div className=" flex  xl:w-9/12  w-9/12    ">

                <ScrollContainer
                    innerRef={filterScrollRef}
                    className="flex max-w-2xl overflow-x-auto whitespace-nowrap  space-x-3 cursor-grab px-2 py-2 rounded-md"
                    vertical={false}
                    horizontal={true}
                    hideScrollbars={false} // set true to hide
                >
                    {flatSelectedFilters?.map((filter, index) => (
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