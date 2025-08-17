'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { useState } from "react";
import { rubik } from '@/app/fonts'
import Dropdown from "@/components/admin/Itinerary/DropDown";

import BannerSection from "@/components/admin/Itinerary/BannerSection";
import DaysSection from "@/components/admin/Itinerary/DaysSection";
import HotelsSection from "@/components/admin/Itinerary/HotelsSection";
import LocationsSection from "@/components/admin/Itinerary/LocationsSection";
import DestinationHighlights from "@/components/admin/Itinerary/DestinationHighlights";
import SignatureHighlights from "@/components/admin/Itinerary/SignatureHighlights";
import PackageInclusions from "@/components/admin/Itinerary/PackageInclusions";
import PackageExclusions from "@/components/admin/Itinerary/PackageExclusions";
import MapRoutingSection from "@/components/admin/Itinerary/MapRoutingSection";
import GallerySection from "@/components/admin/Itinerary/GallerySection";

export default function AdminAddItinerary() {

    const [title, setTitle] = useState('')
    const [locationTitle, setLocationTitle] = useState('')

    const [description, setDescription] = useState('')

    const [color, setColor] = useState("#3FD896");
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    const [days, setDays] = useState([{ title: '', description: '', banner: null, image_title: '' }]);
    const [hotels, setHotels] = useState([{ title: '', description: '', coordinates: '', location: '', mapLink: '', rating: 0 }]);
    const [locations, setLocations] = useState([{ title: '', cordinates: '' }]);

    const [destinationHighlights, setDestinationHighlights] = useState([{ title: '' }]);
    const [signatureHighlights, setSignatureHighlights] = useState([{ title: '' }]);
    const [packageInclusions, setPackageInclusions] = useState([{ title: '' }]);
    const [packageExclusions, setPackageExclusions] = useState([{ title: '' }]);

    const [mapRouting, setMapRouting] = useState([{ location: '', coordinates: '', transfer: '' }]);
    const [gallery, setGallery] = useState([{ image: '', title: '' }]);

    const inputStyle = 'placeholder:text-[#949393] w-full bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4'
    const textAreaStyle = 'placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  min-h-28  py-2 px-4'

    const handleReorder = (index, action, arrayOfElements, setElements) => {

        if (arrayOfElements.length === 1) return
        if (index === 0 && action === 'up') return
        if (index === arrayOfElements.length - 1 && action === 'down') return

        const newArray = [...arrayOfElements];
        if (action === 'up') {
            [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
        }
        else if (action === 'down') {
            [newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]];
        }

        setElements(newArray);
    }

    const transferOptions = ["Land", "Air"];

    const [openDropdown, setOpenDropdown] = useState(null); // track which one is open

    const [destination, setDestination] = useState("");
    const [country, setCountry] = useState("");
    const [collection, setCollection] = useState("");
    const [category, setCategory] = useState("");

    const destinationOptions = ["Paris", "London", "Tokyo", "Rome"];
    const countryOptions = ["France", "Italy", "Japan", "India"];
    const collectionOptions = ["Luxury", "Adventure", "Romantic", "Budget"];
    const categoryOptions = ["Beach", "Mountain", "City", "Safari"];

    return (

        <div className={`h-screen w-full ${rubik.className}`}>

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />

                <div className=" flex-1 relative    ml-4  mr-8  p-10 rounded-xl bg-admin-light-dark-background w-full flex justify-center overflow-y-scroll h-[97vh] z-50">

                    <div className=" flex space-x-3 max-xl:text-sm text-white  absolute  right-5 top-5">
                        <button className=" bg-[#524D4D]  w-fit h-fit px-4  py-2  rounded-sm">Save Draft</button>
                        <button className=" bg-[#129366]  w-fit h-fit px-4 py-2 rounded-sm  ">Publish</button>
                    </div>

                    <div className="flex flex-col w-full  space-y-10">

                        <BannerSection
                            textAreaStyle={textAreaStyle}
                            title={title}
                            setTitle={setTitle}
                            locationTitle={locationTitle}
                            setLocationTitle={setLocationTitle}
                            description={description}
                            setDescription={setDescription}
                            color={color}
                            setColor={setColor}
                            selectedImageFile={selectedImageFile}
                            setSelectedImageFile={setSelectedImageFile}
                        />

                        {/* Days  of itinerary */}
                        <DaysSection
                            textAreaStyle={textAreaStyle}
                            inputStyle={inputStyle}
                            days={days}
                            setDays={setDays}
                            handleReorder={handleReorder}
                        />

                        {/* Hotels in itinerary */}
                        <HotelsSection
                            textAreaStyle={textAreaStyle}
                            inputStyle={inputStyle}
                            handleReorder={handleReorder}
                            hotels={hotels}
                            setHotels={setHotels}
                        />

                        {/* Locations in itinerary */}
                        <LocationsSection
                            textAreaStyle={textAreaStyle}
                            inputStyle={inputStyle}
                            handleReorder={handleReorder}
                            locations={locations}
                            setLocations={setLocations} />

                        <DestinationHighlights
                            textAreaStyle={textAreaStyle}
                            inputStyle={inputStyle}
                            handleReorder={handleReorder}
                            destinationHighlights={destinationHighlights}
                            setDestinationHighlights={setDestinationHighlights}
                        />

                        <SignatureHighlights
                            textAreaStyle={textAreaStyle}
                            inputStyle={inputStyle}
                            handleReorder={handleReorder}
                            signatureHighlights={signatureHighlights}
                            setSignatureHighlights={setSignatureHighlights}
                        />

                        <PackageInclusions
                            textAreaStyle={textAreaStyle}
                            inputStyle={inputStyle}
                            handleReorder={handleReorder}
                            packageInclusions={packageInclusions}
                            setPackageInclusions={setPackageInclusions}

                        />

                        <PackageExclusions
                            textAreaStyle={textAreaStyle}
                            inputStyle={inputStyle}
                            handleReorder={handleReorder}
                            packageExclusions={packageExclusions}
                            setPackageExclusions={setPackageExclusions}

                        />

                        <MapRoutingSection
                            handleReorder={handleReorder}
                            transferOptions={transferOptions}
                            mapRouting={mapRouting}
                            setMapRouting={setMapRouting}
                            inputStyle={inputStyle}
                        />

                        <div className=" w-11/12">
                            <h2 className="text-xl font-medium">Post in:</h2>

                            <div className="flex mt-5 gap-8">
                                <Dropdown
                                    value={destination}
                                    onChange={setDestination}
                                    options={destinationOptions}
                                    placeholder="Select Destination"
                                    isOpen={openDropdown === "destination"}
                                    onToggle={(isOpen) => setOpenDropdown(isOpen ? "destination" : null)}
                                />

                                <Dropdown
                                    value={country}
                                    onChange={setCountry}
                                    options={countryOptions}
                                    placeholder="Select Country"
                                    isOpen={openDropdown === "country"}
                                    onToggle={(isOpen) => setOpenDropdown(isOpen ? "country" : null)}
                                />

                                <Dropdown
                                    value={collection}
                                    onChange={setCollection}
                                    options={collectionOptions}
                                    placeholder="Select Collection"
                                    isOpen={openDropdown === "collection"}
                                    onToggle={(isOpen) => setOpenDropdown(isOpen ? "collection" : null)}
                                />

                                <Dropdown
                                    value={category}
                                    onChange={setCategory}
                                    options={categoryOptions}
                                    placeholder="Select Category"
                                    isOpen={openDropdown === "category"}
                                    onToggle={(isOpen) => setOpenDropdown(isOpen ? "category" : null)}
                                />
                            </div>
                        </div>

                        <GallerySection
                            textAreaStyle={textAreaStyle}
                            inputStyle={inputStyle}
                            handleReorder={handleReorder}
                            gallery={gallery}
                            setGallery={setGallery} />

                    </div>
                </div>
            </div>
        </div>
    )
}

