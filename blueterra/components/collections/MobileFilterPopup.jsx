// components/MobileFilterPopup.jsx

import { useState, useEffect } from 'react';
import { RxCross2 } from '@/components/reactIcons';
import MobileFilterComponent from './MobileFilterComponent';
import { playfair } from '@/app/fonts';
import { destinations, countries, collections, categories } from '@/components/datas/FilterOptions'


export default function MobileFilterPopup({ page,
    filtersList,
    selectedFilters,
    setSelectedFilters,
    showMobileFilter,
    setShowMobileFilter,
    flatSelectedFilters,
    setFlatSelectedFilters,
    expandedBannerCollectionIndex,
    handleChangeCollection,
    updateUrlParamsFromFilters,
    searchParams,
    handleSetCollectionRequestedToShowInMobile }) {

    const [openedFilter, setOpenedFilter] = useState(null);

    const [isManualySelectedNodeFilters, setIsManualySelectedNodeFilters] = useState(false)

    const handleFilters = (filter) => {
        setOpenedFilter(openedFilter === filter ? null : filter);
    };

    const handleClearAllSelectedFilters = () => {
        setSelectedFilters({
            categories: [],
            destinations: [],
            countries: [],
            collections: [],
        });
        setFlatSelectedFilters([]);
    };


    const handleItemSelection = (filter, value) => {

        if (filter === 'collections' && page === 'collections') {

            setIsManualySelectedNodeFilters(true)

            handleClearAllSelectedFilters()
            const index = filtersList?.collections.findIndex(item => item.title === value);
            handleChangeCollection(index)
        }
        else if (filter === 'destinations' && page === 'destinations') {
            setIsManualySelectedNodeFilters(true)
            handleClearAllSelectedFilters()
            const index = filtersList?.destinations.findIndex(item => item.title === value);
            handleChangeCollection(index)
        }

        setSelectedFilters((prev) => {
            const current = prev[filter];
            const updated = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];
            return { ...prev, [filter]: updated };
        });

        setFlatSelectedFilters((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };


    useEffect(() => {

        setIsManualySelectedNodeFilters(true)
        if (expandedBannerCollectionIndex == null) return

        setIsManualySelectedNodeFilters(true)

        if (!isManualySelectedNodeFilters && searchParams.toString()) return

        handleClearAllSelectedFilters()
        if (page === 'destinations') {
            handleItemSelection('destinations', filtersList?.destinations[expandedBannerCollectionIndex]?.title)
        }
        else if (page === 'collections') {
            handleItemSelection('collections', filtersList?.collections[expandedBannerCollectionIndex]?.title)
        }

    }, [expandedBannerCollectionIndex])

    useEffect(() => {
        if (selectedFilters) {
            updateUrlParamsFromFilters(selectedFilters);
        }
    }, [selectedFilters]);

    const [filteredCategories, setFilteredCategories] = useState(filtersList?.categories || []);
    const [filteredCountries, setFilteredCountries] = useState(filtersList?.countries || []);


    const handleSearch = () => {
        handleSetCollectionRequestedToShowInMobile(null)
        setShowMobileFilter(false)
    }


    // this is the custom logic for the filter collection and destination
    useEffect(() => {

        if (selectedFilters.collections.length > 0) {

            const filtered = filtersList?.categories?.filter(
                (cat) => selectedFilters.collections.includes(cat.collection.title)
            );

            setFilteredCategories(filtered);
        }
        else {
            setFilteredCategories(filtersList?.categories || []);
        }

        if (selectedFilters.destinations.length > 0) {

            const filtered = filtersList?.countries?.filter(
                (cat) => selectedFilters.destinations.includes(cat.destination.title)
            );

            setFilteredCountries(filtered);
        }
        else {
            setFilteredCountries(filtersList?.countries || []);
        }

    }, [selectedFilters])


    useEffect(() => {
        if (selectedFilters) {
            updateUrlParamsFromFilters(selectedFilters);
        }
    }, [selectedFilters]);


    if (!showMobileFilter) return null;


    
    return (
        <>
            {showMobileFilter && (
                <div className="fixed inset-0 z-50 bg-black/40 flex md:hidden">
                    <div className="relative z-10  flex flex-col border pt-10  max-w-lg  h-full bg-white">

                        {/* Header */}
                        <div className="absolute top-16 right-7 z-20">
                            <RxCross2
                                onClick={() => setShowMobileFilter(false)}
                                className="text-slate-500 text-2xl cursor-pointer"
                            />
                        </div>

                        {/* Scrollable content */}
                        <div className=" overflow-y-auto pt-10 pb-32 flex flex-col items-center">
                            <h2 className={`${playfair.className} tracking-wide text-xl font-medium`}>Refine Your Search</h2>

                            <div className="w-11/12 grid grid-cols-1  py-2 mt-5 gap-4">
                                {page === 'collections' && (
                                    <>
                                        <MobileFilterComponent
                                            name="collections"
                                            options={filtersList?.collections}
                                            handleFilters={handleFilters}
                                            isOpened={openedFilter === "collections"}
                                            handleItemSelection={handleItemSelection}
                                            selectedFilters={selectedFilters}
                                        />
                                        {/* <MobileFilterComponent
                                            name="categories"
                                            options={filteredCategories}
                                            handleFilters={handleFilters}
                                            isOpened={openedFilter === "categories"}
                                            handleItemSelection={handleItemSelection}
                                            selectedFilters={selectedFilters}
                                        /> */}
                                        <MobileFilterComponent
                                            name="destinations"
                                            options={filtersList?.destinations}
                                            handleFilters={handleFilters}
                                            isOpened={openedFilter === "destinations"}
                                            handleItemSelection={handleItemSelection}
                                            selectedFilters={selectedFilters}
                                        />
                                        <MobileFilterComponent
                                            name="countries"
                                            options={filteredCountries}
                                            handleFilters={handleFilters}
                                            isOpened={openedFilter === "countries"}
                                            handleItemSelection={handleItemSelection}
                                            selectedFilters={selectedFilters}
                                        />
                                    </>
                                )}


                                {page === 'destinations' && (
                                    <>

                                        <MobileFilterComponent
                                            name="destinations"
                                            options={filtersList?.destinations}
                                            handleFilters={handleFilters}
                                            isOpened={openedFilter === "destinations"}
                                            handleItemSelection={handleItemSelection}
                                            selectedFilters={selectedFilters}
                                        />
                                        <MobileFilterComponent
                                            name="countries"
                                            options={filteredCountries}
                                            handleFilters={handleFilters}
                                            isOpened={openedFilter === "countries"}
                                            handleItemSelection={handleItemSelection}
                                            selectedFilters={selectedFilters}
                                        />
                                        <MobileFilterComponent
                                            name="collections"
                                            options={filtersList?.collections}
                                            handleFilters={handleFilters}
                                            isOpened={openedFilter === "collections"}
                                            handleItemSelection={handleItemSelection}
                                            selectedFilters={selectedFilters}
                                        />
                                        {/* <MobileFilterComponent
                                            name="categories"
                                            options={filteredCategories}
                                            handleFilters={handleFilters}
                                            isOpened={openedFilter === "categories"}
                                            handleItemSelection={handleItemSelection}
                                            selectedFilters={selectedFilters}
                                        /> */}

                                    </>
                                )}


                            </div>
                        </div>

                        {/* Bottom fixed action bar */}
                        <div className="fixed bottom-0 w-full p-5 bg-slate-100 min-h-20 flex flex-col justify-end space-y-3 text-dark-28">
                            <div className="flex justify-between items-center">
                                <p className="text-sm">
                                    {flatSelectedFilters.length > 0 ? `${flatSelectedFilters.length} filters applied` : ''}
                                </p>
                                {flatSelectedFilters.length > 0 && (
                                    <p onClick={handleClearAllSelectedFilters} className="underline text-sky-blue-dark cursor-pointer">
                                        Clear filters
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={handleSearch}
                                className="bg-sky-blue-dark py-2.5 text-sm font-medium rounded-sm text-white"
                            >
                                Explore Journeys
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );

}
