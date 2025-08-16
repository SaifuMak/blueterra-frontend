'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { useState, useRef } from "react";
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from "react-icons/io";
import { jost, rubik } from '@/app/fonts'
import ReorderIcons from "@/components/admin/ReorderIcons";
import ColorThemePicker from "@/components/admin/Itinerary/ColorThemePicker";
import ImageUploader from "@/components/admin/Itinerary/ImageUploader";

import BannerSection from "@/components/admin/Itinerary/BannerSection";
import DaysSection from "@/components/admin/Itinerary/DaysSection";

import HotelsSection from "@/components/admin/Itinerary/HotelsSection";
import LocationsSection from "@/components/admin/Itinerary/LocationsSection";
import DestinationHighlights from "@/components/admin/Itinerary/DestinationHighlights";
import SignatureHighlights from "@/components/admin/Itinerary/SignatureHighlights";
import PackageInclusions from "@/components/admin/Itinerary/PackageInclusions";
import PackageExclusions from "@/components/admin/Itinerary/PackageExclusions";


export default function AdminAddItinerary() {

    const [title, setTitle] = useState('')
    const [locationTitle, setLocationTitle] = useState('')

    const [description, setDescription] = useState('')

    const [color, setColor] = useState("#3FD896");
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    const [days, setDays] = useState([{ title: '', description: '', banner: null, image_title: '' }]);
    const [hotels, setHotels] = useState([{ title: '', description: '', coordinates: '', location: '', mapLink: '', rating: 0 }]);
    const [locations, setLocations] = useState([{ title: '', cordinates: '' }]);
    const [experiences, setExperiences] = useState([{ title: '' }]);

    const [destinationHighlights, setDestinationHighlights] = useState([{ title: '' }]);
    const [signatureHighlights, setSignatureHighlights] = useState([{ title: '' }]);
    const [packageInclusions, setPackageInclusions] = useState([{ title: '' }]);
    const [packageExclusions, setPackageExclusions] = useState([{ title: '' }]);

    const [mapRouting, setMapRouting] = useState([{ location: '', coordinates: '', transfer: '' }]);
    const [gallery, setGallery] = useState([{ image: '', title: '' }]);

    const experienceRefs = useRef([]);

    const mapRoutingRef = useRef([]);
    const galleryRef = useRef([]);


    const inputStyle = 'placeholder:text-[#949393] w-full bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4'
    const textAreaStyle = 'placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  min-h-28  py-2 px-4'

    // image uplaoding logic


    const handleAddExperiences = () => {

        const lastIndex = experiences.length;
        setExperiences([...experiences, { title: '' }])
        setTimeout(() => {
            const target = experienceRefs.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }


    const handleAddMapRouting = () => {
        const lastIndex = mapRouting.length;
        setMapRouting([...mapRouting, { location: '', coordinates: '', transfer: '' }]);
        setTimeout(() => {
            mapRoutingRef.current[lastIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    };

    const handleAddGallery = () => {
        const lastIndex = gallery.length;
        setGallery([...gallery, { image: '', title: '' }]);

        setTimeout(() => {
            const target = galleryRef.current[lastIndex];
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 200);
    };

    const handleGalleryChange = (index, field, value) => {
        const updatedGallery = [...gallery];
        updatedGallery[index][field] = value;
        setGallery(updatedGallery);
    };

    const handleDeleteGallery = (indexToDelete) => {
        const previousIndex = indexToDelete - 1;
        setGallery((prev) => prev.filter((_, index) => index !== indexToDelete));

        if (previousIndex >= 0) {
            setTimeout(() => {
                const target = galleryRef.current[previousIndex];
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 100);
        }
    };

    // Handle changing a experiences input
    const handleExperienceChange = (index, field, value) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index][field] = value;
        setExperiences(updatedExperiences);
    };

    const handleMapRoutingChange = (index, field, value) => {
        const updated = [...mapRouting];
        updated[index][field] = value;
        setMapRouting(updated);
    };


    const handleDeleteExperience = (indexToDelete) => {

        const previousIndex = indexToDelete - 1
        setExperiences((prevExperiences) => prevExperiences.filter((_, index) => indexToDelete !== index))
        if (previousIndex > 0) {
            setTimeout(() => {
                const target = experienceRefs.current[previousIndex];
                target.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    }

    const handleDeleteMapRouting = (indexToDelete) => {
        const previousIndex = indexToDelete - 1;
        setMapRouting((prev) => prev.filter((_, index) => index !== indexToDelete));

        if (previousIndex >= 0) {
            setTimeout(() => {
                const target = mapRoutingRef.current[previousIndex];
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 100);
        }
    };


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


                        {/* Experiences  of itinerary */}
                        {/* <div className="flex flex-col w-9/12 xl:w-6/12   transition-all duration-300 ease-in-out">

                            <div className="flex items-center space-x-8 mb-8">
                                <h2 className=" text-xl font-medium">Experiences to Unlock</h2>
                                <img onClick={handleAddExperiences} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
                            </div>

                            {experiences?.map((experience, index) => (
                                <div key={index} ref={(el) => (experienceRefs.current[index] = el)} className={` my-2 relative flex flex-col space-y-2`}>

                                    <input type="text" value={experience.title} onChange={(e) => handleExperienceChange(index, 'title', e.target.value)} placeholder="Title.." className={`${inputStyle}`} />

                                    <div className=" absolute flex items-center space-x-3 -right-48 top-3">
                                        <ReorderIcons handleReorder={handleReorder} index={index} handleDelete={handleDeleteExperience} arrayOfElements={experiences} setElements={setExperiences} />
                                    </div>

                                </div>))}
                        </div> */}

                        <div className="flex flex-col xl:w-6/12 transition-all duration-300 ease-in-out">
                            <div className="flex items-center space-x-8">
                                <h2 className="text-xl font-medium">Map Routing</h2>
                                <img
                                    onClick={handleAddMapRouting}
                                    src="/Icons/sqaure-add-icon.svg"
                                    alt=""
                                    className="cursor-pointer size-7"
                                />
                            </div>

                            {mapRouting.map((data, index) => (
                                <div
                                    key={index}
                                    ref={(el) => (mapRoutingRef.current[index] = el)}
                                    className="my-1 relative flex flex-col space-y-4"
                                >
                                    <div className="w-full flex flex-col space-y-6 mt-6">

                                        <div className="flex space-x-5 ">
                                            <input
                                                type="text"
                                                value={data.location}
                                                onChange={(e) => handleMapRoutingChange(index, 'location', e.target.value)}
                                                placeholder="Location.."
                                                className={inputStyle}
                                            />
                                            <input
                                                type="text"
                                                value={data.coordinates}
                                                onChange={(e) => handleMapRoutingChange(index, 'coordinates', e.target.value)}
                                                placeholder="Coordinates.."
                                                className={inputStyle}
                                            />
                                        </div>


                                    </div>

                                    <div className="absolute flex items-center space-x-3 -right-48 top-8">
                                        <ReorderIcons
                                            handleReorder={handleReorder}
                                            index={index}
                                            handleDelete={handleDeleteMapRouting}
                                            arrayOfElements={mapRouting}
                                            setElements={setMapRouting}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="flex flex-col xl:w-6/12 transition-all duration-300 ease-in-out">
                            <div className="flex items-center space-x-8">
                                <h2 className="text-xl font-medium">Gallery images</h2>
                                <img
                                    onClick={handleAddGallery}
                                    src="/Icons/sqaure-add-icon.svg"
                                    alt=""
                                    className="cursor-pointer size-7"
                                />
                            </div>


                            {gallery.map((data, index) => (
                                <div
                                    key={index}
                                    ref={(el) => (galleryRef.current[index] = el)}
                                    className="my-1 mt-4 relative flex flex-col space-y-4"
                                >

                                    {/* Image URL Field */}
                                    <div className=" flex w-full items-center space-x-12 mt-4  ">
                                        <ImageUploader
                                            label="Image upload"
                                            selectedFile={data.image}
                                            setSelectedFile={(file) => handleGalleryChange(index, "image", file)}
                                            id={`GalleryUpload-${index}`} // unique per day
                                        />
                                        {/* Title Field */}
                                        <div className=" flex flex-1 ">

                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => handleGalleryChange(index, 'title', e.target.value)}
                                                placeholder="Image title"
                                                className={inputStyle}
                                            />
                                        </div>

                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}