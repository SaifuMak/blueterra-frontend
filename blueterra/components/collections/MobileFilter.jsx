import { useState, useEffect, useRef } from 'react'

import useClickOutside from '@/app/hooks/useClickOutside'
import MobileFilterComponent from './MobileFilterComponent';
import { RxCross2 } from '@/components/reactIcons'
import ScrollContainer from 'react-indiana-drag-scroll';
import { playfair } from '@/app/fonts'

export default function MobileFilter({ setIsAnyFilterOpened, isFilterVisible, showMobileFilter, setShowMobileFilter }) {

    // const [openedFilters, setOpenedFilters] = useState([])

    // const filterContaineRef = useClickOutside(() => setOpenedFilters([]))


    const [openedFilter, setOpenedFilter] = useState(null)
    const [flatSelectedFilters, setFlatSelectedFilters] = useState([])

    // const filterContaineRef = useClickOutside(() => setOpenedFilter(null))

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
        <>

            <div className=" w-full px-8  my-5 flex  flex-col   ">
                <div className=" w-full flex justify-between mb-5 items-center ">
                    <p className={`${flatSelectedFilters?.length > 0 ? 'opacity-100' : '  opacity-0'} ml-2`}>showing 12 results for:</p>
                    <button onClick={() => setShowMobileFilter(true)} className="   flex items-center  bg-sky-blue-1 px-3  py-2  w-fit h-fit  text-nowrap  text-[15px] font-normal rounded-sm max-lg:text-sm  text-white"><span className="mr-1"><img src='/Icons/filter.svg' className=' size-3.5 shrink-0 '></img></span>Filters</button>

                </div>
                <div className=" w-full flex h-full  gap-2.5 flex-wrap  ">
                    {flatSelectedFilters?.map((filter, index) => (
                        <div key={index} onClick={() => handleRemoveFilter(filter)} className=" flex-center w-fit cursor-pointer border rounded-full py-1.5 px-3 ">
                            <p className=" text-[13px] text-nowrap">{filter}</p>
                            <RxCross2 className=' text-sm ml-0.5' />

                        </div>
                    ))}
                </div>

            </div>


            {showMobileFilter && <div className="fixed inset-0 z-50 items-start  bg-black/40 flex md:hidden">
                <div className={`   w-full  pb-48  pt-6 relative  overflow-y-auto bg-white h-screen z-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)]   flex flex-col items-center`} >

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
                        <button onClick={()=>setShowMobileFilter(false)} className=" bg-sky-blue-dark py-2.5 text-sm font-medium rounded-sm text-white">Explore Journeys</button>
                    </div>

                    {/* {flatSelectedFilters?.length > 0 && <div className=" flex  xl:w-9/12  w-9/12    ">

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
            </div >} */}

                </div >
            </div>}
        </>
    )
}