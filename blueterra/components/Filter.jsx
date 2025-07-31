'use client'
import { HiOutlineArrowNarrowRight, RxCross2, CiSearch } from './reactIcons'
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import CardData from './datas/Destinations';


export default function Filter({ isFilterVisible, setIsFilterVisible, expandedIndex }) {

    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        continents: [],
        countries: []
    })

    const filterRef = useRef()

    const handleFilterSelection = (section, value) => {

        // setSelectedFilters((prevFilters) =>
        //     prevFilters.includes(value) ?
        //         prevFilters.filter(item => value !== item) :
        //         [...prevFilters, value])


        setSelectedFilters(prev => {
            const currentSection = prev[section];
            return {
                ...prev,
                [section]: currentSection.includes(value)
                    ? currentSection.filter(item => item !== value)
                    : [...currentSection, value]
            };
        });
        console.log(selectedFilters);
    }

    useEffect(() => {
        gsap.to(filterRef.current, {
            maxHeight: isFilterVisible ? 580 : 0,
            opacity: isFilterVisible ? 1 : 0,
            duration: 1.3,
            ease: "power2.out",
            zIndex: isFilterVisible ? 30 : 0,
        });

    }, [isFilterVisible]);


    return (
        // <div ref={filterRef} className="w-full flex justify-center max-lg:hidden   text-base border border-black bg-slate-400">
        // <div ref={filterRef} className={`overflow-hidden shadow-lg  pb-10 flex justify-center transition-all duration-1000 ease-in-out  bg-white   ${isFilterVisible ? 'max-h-[580px] opacity-100  z-50 ' : 'max-h-0 opacity-0 z-0'}   w-full  `}>
        <div
            ref={filterRef}
            style={{ maxHeight: 0, opacity: 0, overflow: "hidden" }}
            className="shadow-lg pb-10 mt-[120px]  bg-white flex justify-center max-xl:text-sm  w-full transition-none"
        >
            <div className=" relative   flex  xl:w-9/12 lg:w-10/12 md:w-11/12  2xl:w-9/12  pt-10">


                <div className=" flex 2xl:w-10/12 w-11/12 justify-between ">

                    <div className="space-y-3  ">
                        <h6 className="text-xl font-medium">Collections</h6>

                        <div className=" flex w-full  2xl:h-[240px] xl:h-[220px]  lg:h-[240px]   2xl:space-x-20 xl:space-x-10 lg:space-x-5">
                            <div className="space-y-3 ">
                                {["Signature Journeys", "Explore by Landscape", "Adventures in Motion", "Mindful Escapes", "Unforgettable Editions", "Tailored for You",].map((data, index) => (
                                    <div key={index} className="flex  items-center">

                                        <p className={`text-nowrap cursor-pointer  ${data === CardData[expandedIndex]?.tagline ? ' font-medium' : 'font-normal'}`}>{data}</p>
                                        {/* <span className=" ml-1 xl:ml-3"><HiOutlineArrowNarrowRight /></span> */}
                                        {data === CardData[expandedIndex]?.tagline && <img src='/Icons/Arrow.svg' className="ml-2 w-4.5"></img>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className=" h-full mt-7 overflow-hidden overflow-y-auto   flex flex-col gap-x-1 xl:gap-x-2 2xl:gap-x-8 gap-y-2  ">
                        {["Adventure & Exploration", "Luxury Escapes", "Romantic Getaways", "Cultural Immersion", "Historical Journeys", "Gastronomic Trails", "Nature & Wildlife Expeditions", "Safari Experiences", "Polar & Arctic Journeys",].map((data, index) => (
                            <div key={index} onClick={() => handleFilterSelection("categories", data)} className="flex cursor-pointer  items-center">
                                <div className=" size-3.5 flex justify-center items-center border rounded-xs border-black"><img src='/Icons/tick.svg' className={`size-2.5  ${selectedFilters["categories"].includes(data) ? 'opacity-100 text-white' : 'opacity-0'}`}></img></div>
                                <p className=" ml-2 text-nowrap">{data}</p>
                            </div>
                        ))}
                    </div>


                    <div className=" space-y-3 ">
                        <h6 className=" text-xl font-medium">Continents</h6>
                        <div className=" space-y-2 overflow-y-auto h-full">
                            {["Asia", "Africa", "North America", "South America", "Antarctica", "Europe", "Australia",].map((data, index) => (
                                <div key={index} onClick={() => handleFilterSelection("continents", data)} className="flex cursor-pointer items-center">
                                    <div className=" size-3.5 flex justify-center items-center border rounded-xs border-black"><img src='/Icons/tick.svg' className={`size-2.5  ${selectedFilters["continents"].includes(data) ? 'opacity-100 text-white' : 'opacity-0'}`}></img></div>
                                    <p className=" ml-2 text-nowrap">{data}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`space-y-3  ${selectedFilters["continents"].length > 0 ? '' : ' opacity-0 pointer-events-none'} `}>
                        <h6 className="text-xl font-medium">Countries</h6>
                        <div className="space-y-2 overflow-y-auto ">
                            {["Dubai", "Thailand", "Kenya", "Maldives", "Iceland",].map((data, index) => (
                                <div key={index} onClick={() => handleFilterSelection("countries", data)} className="flex  cursor-pointer items-center">
                                    <div className=" size-3.5 flex justify-center items-center border rounded-xs border-black"><img src='/Icons/tick.svg' className={`size-2.5  ${selectedFilters["countries"].includes(data) ? 'opacity-100 text-white' : 'opacity-0'}`}></img></div>
                                    <p className=" ml-2 text-nowrap">{data}</p>
                                </div>
                            ))}
                        </div>

                        <div className="w-[150px] h-7 mt-4 rounded-sm border px-1 border-[#BDBDBD] flex items-center ">
                            <input type="text" className="w-[120px] outline-none placeholder:text-sm" placeholder="Search..." />
                            <span className="ml-1 text-slate-900  font-bold"><CiSearch /></span>

                        </div>
                    </div>

                </div>




                <span onClick={() => setIsFilterVisible(false)} className=" absolute cursor-pointer top-5 right-5 text-3xl   "><RxCross2 /></span>
                <button className="border antialiased rounded-full  text-black absolute bottom-0 lg:bottom-5 right-0  cursor-pointer   px-9 py-0.5 ">Apply</button>

            </div>
        </div>

    )


}