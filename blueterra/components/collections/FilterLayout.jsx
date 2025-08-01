import { useState, useEffect } from 'react'
import FilterComponent from './FilterComponent'
import useClickOutside from '@/app/hooks/useClickOutside'

export default function FilterLayout({ setIsAnyFilterOpened }) {

    const [openedFilters, setOpenedFilters] = useState([])

    const filterContaineRef = useClickOutside(() => setOpenedFilters([]))

    const continents = ["Asia", "Africa", "North America", "South America", "Antarctica", "Europe", "Australia",]
    const countries = ["Dubai", "Thailand", "Kenya", "Maldives", "Iceland"]
    const collections = ["Signature Journeys", "Explore by Landscape", "Adventures in Motion", "Mindful Escapes", "Unforgettable Editions", "Tailored for You"]
    const categories = ["Adventure & Exploration", "Luxury Escapes", "Romantic Getaways", "Cultural Immersion", "Historical Journeys", "Gastronomic Trails", "Nature & Wildlife Expeditions", "Safari Experiences", "Polar & Arctic Journeys"]

    const [selectedFilters, setSelectedFilters] = useState({
        categories: [],
        continents: [],
        countries: [],
        collections: []

    })

    const handleFilters = (filter) => {
        setOpenedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter]
        );
    }

    const handleItemSelection = (filter, value) => {

        setSelectedFilters(prev => {
            const selectedFilter = prev[filter];
            return {
                ...prev,
                [filter]: selectedFilter.includes(value)
                    ? selectedFilter.filter(item => item !== value)
                    : [...selectedFilter, value]
            };
        });
    }

    useEffect(() => {
        openedFilters.length > 0 ? setIsAnyFilterOpened(true) : setIsAnyFilterOpened(false)
    }, [openedFilters])



    return (
        <div className=" w-full min-h-[80px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] mt-32 flex-center  ">
            <div ref={filterContaineRef} className=" w-9/12 h-auto grid grid-cols-4 py-7   gap-7  ">

                <FilterComponent
                    name='continents'
                    options={continents}
                    handleFilters={handleFilters}
                    isOpened={openedFilters.includes("continents")}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />

                <FilterComponent
                    name='countries'
                    options={countries}
                    handleFilters={handleFilters}
                    isOpened={openedFilters.includes("countries")}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />

                <FilterComponent
                    name='categories'
                    options={categories}
                    handleFilters={handleFilters}
                    isOpened={openedFilters.includes("categories")}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />

                <FilterComponent
                    name='collections'
                    options={collections}
                    handleFilters={handleFilters}
                    isOpened={openedFilters.includes("collections")}
                    handleItemSelection={handleItemSelection}
                    selectedFilters={selectedFilters}
                />

            </div>
        </div>
    )
}