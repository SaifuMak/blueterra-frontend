'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { useState } from "react";
import { rubik } from '@/app/fonts'
import Dropdown from "@/components/admin/Itinerary/DropDown";
import { toast } from 'sonner';

import { destinations, countries, collections, categories } from '@/components/datas/FilterOptions'

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
import FeaturedPoints from "@/components/admin/Itinerary/FeaturedPoints";

export default function AdminAddItinerary() {

    const inputStyle = 'placeholder:text-[#949393] w-full bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4'
    const textAreaStyle = 'placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  min-h-28  py-2 px-4'

    const [title, setTitle] = useState('')
    const [locationTitle, setLocationTitle] = useState('')

    const [description, setDescription] = useState('')

    const [color, setColor] = useState("#3FD896");
    const [selectedBannerImageFile, setSelectedBannerImageFile] = useState(null);

    const [days, setDays] = useState([{ title: '', description: '', image: null, image_title: '' }]);
    const [hotels, setHotels] = useState([{ title: '', description: '', image: null, coordinates: '', location: '', mapLink: '', rating: 5 }]);

    const [destinationHighlights, setDestinationHighlights] = useState([{ title: '' }]);
    const [signatureHighlights, setSignatureHighlights] = useState([{ title: '' }]);
    const [packageInclusions, setPackageInclusions] = useState([{ title: '' }]);
    const [packageExclusions, setPackageExclusions] = useState([{ title: '' }]);

    const [mapRouting, setMapRouting] = useState([{ location: '', coordinates: '', transfer: '' }]);
    const [gallery, setGallery] = useState([{ image: '', title: '' }]);
    const [featuredPoints, setFeaturedPoints] = useState([{ suggestedDate: '', price: '', additionalInformation: '' }])

    const [destination, setDestination] = useState("");
    const [country, setCountry] = useState("");
    const [collection, setCollection] = useState("");
    const [category, setCategory] = useState("");

    const transferOptions = ["Land", "Air"];

    const [openDropdown, setOpenDropdown] = useState(null); // track which one is open


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


    const handleAddItinerary = (e) => {
        e.preventDefault();

        if (!selectedBannerImageFile) {
            toast.error("Banner image is not uploaded!");
            return;
        }

        for (let i = 0; i < days.length; i++) {
            if (!days[i].image) {
                toast.error(`Image not uploaded for Day ${i + 1}`);
                return;
            }
        }

        for (let i = 0; i < hotels.length; i++) {
            if (!hotels[i].image) {
                toast.error(`Image not uploaded for Hotel ${i + 1}`);
                return;
            }
        }

        for (let i = 0; i < mapRouting.length; i++) {
            if (!mapRouting[i].transfer) {
                toast.error(`Transfer is missing in Map Routing ${i + 1}`);
                return;
            }
        }

        if (!destination || !country || !collection || !category) {
            toast.error("Filter is not applied");
            return;
        }

        for (let i = 0; i < gallery.length; i++) {
            if (!gallery[i].image) {
                toast.error(`Image not uploaded in Gallery ${i + 1}`);
                return;
            }
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("location_title", locationTitle);
        formData.append("description", description);
        formData.append("color", color);
        formData.append("destination", destination);
        formData.append("country", country);
        formData.append("collection", collection);
        formData.append("category", category);

        // banner image
        if (selectedBannerImageFile) {
            formData.append("banner_image", selectedBannerImageFile);
        }

        formData.append("destination_highlights", JSON.stringify(destinationHighlights));
        formData.append("signature_highlights", JSON.stringify(signatureHighlights));
        formData.append("package_inclusions", JSON.stringify(packageInclusions));
        formData.append("package_exclusions", JSON.stringify(packageExclusions));
        formData.append("map_routing", JSON.stringify(mapRouting));
        formData.append("featured_points", JSON.stringify(featuredPoints));

        days.forEach((day, index) => {
            formData.append(`days[${index}][title]`, day.title);
            formData.append(`days[${index}][description]`, day.description);

            if (day.image) {
                formData.append(`days[${index}][image]`, day.image); // file stays intact
            }

            formData.append(`days[${index}][image_title]`, day.image_title);
        });

        hotels.forEach((hotel, index) => {
            formData.append(`hotels[${index}][title]`, hotel.title);
            formData.append(`hotels[${index}][description]`, hotel.description);
            formData.append(`hotels[${index}][image]`, hotel.image);
            formData.append(`hotels[${index}][coordinates]`, hotel.coordinates);
            formData.append(`hotels[${index}][location]`, hotel.location);
            formData.append(`hotels[${index}][mapLink]`, hotel.mapLink);
            formData.append(`hotels[${index}][rating]`, hotel.rating);
            // if hotels also have images later, handle same way as gallery
        });

        
        // gallery needs file + title
        gallery.forEach((item, index) => {
            if (item.image) {
                formData.append(`gallery[${index}][image]`, item.image);
            }
            formData.append(`gallery[${index}][title]`, item.title);
        });

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        alert('posted')
    }


    return (

        <div className={`h-screen w-full ${rubik.className}`}>

            <Navbar />
            <form
                onSubmit={handleAddItinerary}
                className="w-full "
            >
                <div className=" w-full h-full  flex">

                    {/* sidebar */}
                    <Sidebar />

                    <div className=" flex-1 relative    ml-4  mr-8  p-10 rounded-xl bg-admin-light-dark-background w-full flex justify-center overflow-y-scroll h-[97vh] z-50">

                        <div className=" flex space-x-3 max-xl:text-sm text-white  absolute   right-5 top-5">
                            <button type="submit" className=" bg-[#524D4D]  w-fit h-fit px-4  py-2  rounded-sm">Save Draft</button>
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
                                selectedImageFile={selectedBannerImageFile}
                                setSelectedImageFile={setSelectedBannerImageFile}
                            />

                            <DaysSection
                                textAreaStyle={textAreaStyle}
                                inputStyle={inputStyle}
                                days={days}
                                setDays={setDays}
                                handleReorder={handleReorder}
                            />

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <HotelsSection
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    hotels={hotels}
                                    setHotels={setHotels}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <DestinationHighlights
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    destinationHighlights={destinationHighlights}
                                    setDestinationHighlights={setDestinationHighlights}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <SignatureHighlights
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    signatureHighlights={signatureHighlights}
                                    setSignatureHighlights={setSignatureHighlights}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <MapRoutingSection
                                    handleReorder={handleReorder}
                                    transferOptions={transferOptions}
                                    mapRouting={mapRouting}
                                    setMapRouting={setMapRouting}
                                    inputStyle={inputStyle}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <PackageInclusions
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    packageInclusions={packageInclusions}
                                    setPackageInclusions={setPackageInclusions}


                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <PackageExclusions
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    packageExclusions={packageExclusions}
                                    setPackageExclusions={setPackageExclusions}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <FeaturedPoints
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    featuredPoints={featuredPoints}
                                    setFeaturedPoints={setFeaturedPoints}
                                />
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <div className=" w-11/12">
                                    <h2 className="text-xl text-dark-blue font-medium">Post in:</h2>

                                    <div className="flex mt-5  gap-8">
                                        <Dropdown
                                            value={destination}
                                            onChange={setDestination}
                                            options={destinations}
                                            placeholder="Select Destination"
                                            isOpen={openDropdown === "destination"}
                                            onToggle={(isOpen) => setOpenDropdown(isOpen ? "destination" : null)}
                                        />

                                        <Dropdown
                                            value={country}
                                            onChange={setCountry}
                                            options={countries}
                                            placeholder="Select Country"
                                            isOpen={openDropdown === "country"}
                                            onToggle={(isOpen) => setOpenDropdown(isOpen ? "country" : null)}
                                        />

                                        <Dropdown
                                            value={collection}
                                            onChange={setCollection}
                                            options={collections}
                                            placeholder="Select Collection"
                                            isOpen={openDropdown === "collection"}
                                            onToggle={(isOpen) => setOpenDropdown(isOpen ? "collection" : null)}
                                        />

                                        <Dropdown
                                            value={category}
                                            onChange={setCategory}
                                            options={categories}
                                            placeholder="Select Category"
                                            isOpen={openDropdown === "category"}
                                            onToggle={(isOpen) => setOpenDropdown(isOpen ? "category" : null)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className=" w-full  pt-10  border-t border-[#969696]/50">
                                <GallerySection
                                    textAreaStyle={textAreaStyle}
                                    inputStyle={inputStyle}
                                    handleReorder={handleReorder}
                                    gallery={gallery}
                                    setGallery={setGallery} />
                            </div>


                            <div className=" py-10">
                                <div className=" flex space-x-3 max-xl:text-sm text-white">
                                    <button type="submit" className=" bg-[#524D4D]  w-fit h-fit px-4  py-2  rounded-sm">Save Draft</button>
                                    <button className=" bg-[#129366]  w-fit h-fit px-4 py-2 rounded-sm  ">Publish</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}

