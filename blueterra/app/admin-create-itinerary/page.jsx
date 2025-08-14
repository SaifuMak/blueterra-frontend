'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { useState, useRef } from "react";
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from "react-icons/io";
import { jost, rubik } from '@/app/fonts'
import ReorderIcons from "@/components/admin/ReorderIcons";
import ColorThemePicker from "@/components/admin/Itinerary/ColorThemePicker";
import ImageUploader from "@/components/admin/Itinerary/ImageUploader";

export default function AdminAddItinerary() {

    const [title, setTitle] = useState('')
    const [locationTitle, setLocationTitle] = useState('')

    const [description, setDescription] = useState('')
    const [shortDescription, setShortDescription] = useState('')

    const [color, setColor] = useState("#3FD896");


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


    const dayRefs = useRef([]);
    const hotelsRefs = useRef([]);
    const LocationRefs = useRef([]);
    const experienceRefs = useRef([]);

    const destinationHighlightsRef = useRef([]);
    const signatureHighlightsRef = useRef([]);
    const packageInclusionsRef = useRef([]);
    const packageExclusionsRef = useRef([]);

    const mapRoutingRef = useRef([]);
    const galleryRef = useRef([]);


    const inputStyle = 'placeholder:text-[#949393] w-full bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4'
    const textAreaStyle = 'placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  min-h-28  py-2 px-4'


    // image uplaoding logic 
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImageFile(e.target.files[0]); // store the actual File object
        }
    };

    const handleAddDay = () => {

        const lastIndex = days.length;
        setDays([...days, { title: '', description: '', banner: null, image_title: '' }])
        setTimeout(() => {
            const target = dayRefs.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }


    const handleAddHotel = () => {

        const lastIndex = hotels.length;
        setHotels([...hotels, { title: '', description: '', banner: null, coordinates: '', location: '', mapLink: '', rating: 0 }])
        setTimeout(() => {
            const target = hotelsRefs.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }

    const handleAddDestinationHighlights = () => {
        const lastIndex = destinationHighlights.length;
        setDestinationHighlights([...destinationHighlights, { title: '' }])
        setTimeout(() => {
            const target = destinationHighlightsRef.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }


    const handleAddSignatureHighlights = () => {
        const lastIndex = signatureHighlights.length;
        setSignatureHighlights([...signatureHighlights, { title: '' }])
        setTimeout(() => {
            const target = signatureHighlightsRef.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }


    const handleAddLocation = () => {

        const lastIndex = locations.length;
        setLocations([...locations, { title: '', cordinates: '' }])
        setTimeout(() => {
            const target = LocationRefs.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }


    const handleAddExperiences = () => {

        const lastIndex = experiences.length;
        setExperiences([...experiences, { title: '' }])
        setTimeout(() => {
            const target = experienceRefs.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }

    const handleAddPackageInclusions = () => {
        const lastIndex = packageInclusions.length;
        setPackageInclusions([...packageInclusions, { title: '' }]);
        setTimeout(() => {
            packageInclusionsRef.current[lastIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    };

    // Exclusions
    const handleAddPackageExclusions = () => {
        const lastIndex = packageExclusions.length;
        setPackageExclusions([...packageExclusions, { title: '' }]);
        setTimeout(() => {
            packageExclusionsRef.current[lastIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    };


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

    // Handle changing a day input
    const handleDayChange = (index, field, value) => {
        const updatedDays = [...days];
        updatedDays[index][field] = value;
        setDays(updatedDays);
    };

    // Handle changing a location input
    const handleLocationsChange = (index, field, value) => {
        const updatedLocations = [...locations];
        updatedLocations[index][field] = value;
        setLocations(updatedLocations);
    };

    // Handle changing a day input
    const handleHotelChange = (index, field, value) => {
        const updatedHotels = [...hotels];
        updatedHotels[index][field] = value;
        setHotels(updatedHotels);
    };

    // Handle changing a experiences input
    const handleExperienceChange = (index, field, value) => {
        const updatedExperiences = [...experiences];
        updatedExperiences[index][field] = value;
        setExperiences(updatedExperiences);
    };

    const handleDestinationsChange = (index, field, value) => {
        const updatedDestinationHighlights = [...destinationHighlights];
        updatedDestinationHighlights[index][field] = value;
        setDestinationHighlights(updatedDestinationHighlights);
    };


    const handleSignatureChange = (index, field, value) => {
        const updatedSignatureHighlights = [...signatureHighlights];
        updatedSignatureHighlights[index][field] = value;
        setSignatureHighlights(updatedSignatureHighlights);
    };

    const handlePackageInclusionChange = (index, field, value) => {
        const updated = [...packageInclusions];
        updated[index][field] = value;
        setPackageInclusions(updated);
    };

    const handlePackageExclusionChange = (index, field, value) => {
        const updated = [...packageExclusions];
        updated[index][field] = value;
        setPackageExclusions(updated);
    };


    const handleMapRoutingChange = (index, field, value) => {
        const updated = [...mapRouting];
        updated[index][field] = value;
        setMapRouting(updated);
    };

    const handleDeleteDay = (indexToDelete) => {

        const previousIndex = indexToDelete - 1
        setDays((prevDays) => prevDays.filter((_, index) => indexToDelete !== index))
        if (previousIndex > 0) {
            setTimeout(() => {
                const target = dayRefs.current[previousIndex];
                target.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }

    }

    const handleDeleteHotel = (indexToDelete) => {

        const previousIndex = indexToDelete - 1
        setHotels((prevHotels) => prevHotels.filter((_, index) => indexToDelete !== index))
        if (previousIndex > 0) {
            setTimeout(() => {
                const target = hotelsRefs.current[previousIndex];
                target.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    }


    const handleDeleteLocation = (indexToDelete) => {

        const previousIndex = indexToDelete - 1
        setLocations((prevLocations) => prevLocations.filter((_, index) => indexToDelete !== index))
        if (previousIndex > 0) {
            setTimeout(() => {
                const target = LocationRefs.current[previousIndex];
                target.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    }

    const handleDeleteDestinationHighlights = (indexToDelete) => {

        const previousIndex = indexToDelete - 1
        setDestinationHighlights((prev) => prev.filter((_, index) => indexToDelete !== index))
        if (previousIndex > 0) {
            setTimeout(() => {
                const target = destinationHighlightsRef.current[previousIndex];
                target.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    }

    const handleDeleteSignatureHighlights = (indexToDelete) => {

        const previousIndex = indexToDelete - 1
        setSignatureHighlights((prev) => prev.filter((_, index) => indexToDelete !== index))
        if (previousIndex > 0) {
            setTimeout(() => {
                const target = signatureHighlightsRef.current[previousIndex];
                target.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    }


    const handleDeletePackageInclusion = (indexToDelete) => {
        const previousIndex = indexToDelete - 1;
        setPackageInclusions((prev) => prev.filter((_, index) => index !== indexToDelete));

        if (previousIndex >= 0) {
            setTimeout(() => {
                const target = packageInclusionsRef.current[previousIndex];
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 100);
        }
    };


    const handleDeletePackageExclusion = (indexToDelete) => {
        const previousIndex = indexToDelete - 1;
        setPackageExclusions((prev) => prev.filter((_, index) => index !== indexToDelete));

        if (previousIndex >= 0) {
            setTimeout(() => {
                const target = packageExclusionsRef.current[previousIndex];
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 100);
        }
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

                        {/* general data of itinerary */}
                        <div className=" flex flex-col w-6/12 space-y-6">

                            <div className=" flex  space-x-5 ">
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Itinerary Title...." className={`placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4  w-full`} />
                                <input type="text" value={locationTitle} onChange={(e) => setLocationTitle(e.target.value)} placeholder="Location title" className={`placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4  w-full`} />
                            </div>

                            <textarea name="" id="" placeholder="Banner description" value={description} onChange={(e) => setDescription(e.target.value)} className={`${textAreaStyle} w-full  `}></textarea>

                            {/* <div className=" flex  items-center space-x-8">
                                <p className="">Banner Image upload</p>
                                <div className="  px-4 border  border-dark-4B w-fit bg-white ">Browse</div>
                                <img src="/Icons/red-delete-icon.svg" alt="" className=" cursor-pointer size-5.5 xl:size-6" />
                            </div> */}

                            <div className="space-y-2">
                                {/* Upload Row */}
                                <div className="flex items-center space-x-8">
                                    <p>Banner Image upload</p>

                                    {/* Hidden file input */}
                                    <input
                                        type="file"
                                        id="bannerUpload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />

                                    {/* Browse Button */}
                                    <label
                                        htmlFor="bannerUpload"
                                        className="px-4 border border-dark-4B w-fit bg-white cursor-pointer"
                                    >
                                        Browse
                                    </label>

                                    {/* Delete Icon */}
                                    {selectedImageFile && (
                                        <img
                                            src="/Icons/red-delete-icon.svg"
                                            alt="delete"
                                            className="cursor-pointer size-5.5 xl:size-6"
                                            onClick={() => setSelectedImageFile(null)}
                                        />
                                    )}
                                </div>

                                {/* Show file name */}
                                {selectedImageFile && (
                                    <div className="text-sm text-sky-blue-dark">
                                        <p>{selectedImageFile.name}</p>
                                    </div>
                                )}


                            </div>

                            <ColorThemePicker color={color} setColor={setColor} />

                        </div>


                        {/* Days  of itinerary */}
                        <div className="flex flex-col w-9/12 xl:w-6/12  transition-all duration-300 ease-in-out">

                            <div className="  flex items-center space-x-8">
                                <h2 className=" text-xl font-medium">Days</h2>
                                <img onClick={handleAddDay} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
                            </div>

                            {days?.map((day, index) => (
                                <div key={index} ref={(el) => (dayRefs.current[index] = el)} className={` my-2 relative flex flex-col space-y-4`}>

                                    <p className=" font-medium mt-4 ">Day {index + 1}</p>
                                    <input type="text" value={day.title} onChange={(e) => handleDayChange(index, 'title', e.target.value)} placeholder="Title.." className={`${inputStyle}`} />
                                    <textarea name="" id="" placeholder="Input descriptions here..." value={day.description} onChange={(e) => handleDayChange(index, 'description', e.target.value)} className={`${textAreaStyle} w-full mt-4`}></textarea>

                                    <div className=" flex w-full space-x-8 mt-4  ">
                                        <ImageUploader
                                            label="Image upload"
                                            selectedFile={day.banner}
                                            setSelectedFile={(file) => handleDayChange(index, "banner", file)}
                                            id={`DayfileUpload-${index}`} // unique per day
                                        />
                                        {day.banner && <input type="text" value={day.image_title} onChange={(e) => handleDayChange(index, 'image_title', e.target.value)} placeholder="Image title" className={`placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none flex-1 h-fit  py-2 px-4 `} />}

                                    </div>


                                    <div className=" absolute flex items-center -right-48 top-16">
                                        <ReorderIcons handleReorder={handleReorder} index={index} handleDelete={handleDeleteDay} arrayOfElements={days} setElements={setDays} />
                                    </div>

                                </div>))}
                        </div>


                        {/* Hotels in itinerary */}
                        <div className="flex flex-col w-9/12 xl:w-6/12  transition-all duration-300 ease-in-out">

                            <div className="  flex items-center space-x-8">
                                <h2 className=" text-xl font-medium">Hotels</h2>
                                <img onClick={handleAddHotel} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
                            </div>

                            {hotels?.map((hotel, index) => (
                                <div key={index} ref={(el) => (hotelsRefs.current[index] = el)} className={`  my-2  relative flex flex-col space-y-4`}>

                                    <p className=" font-medium mt-4 ">Hotel {index + 1}</p>
                                    <input type="text" value={hotel.title} onChange={(e) => handleHotelChange(index, 'title', e.target.value)} placeholder="Hotel name" className={`${inputStyle}`} />
                                    <input type="text" value={hotel.location} onChange={(e) => handleHotelChange(index, 'location', e.target.value)} placeholder="Location" className={`${inputStyle}`} />
                                    <div className=" flex items-center ">
                                        <p className=" font-medium">Ratings</p>
                                        <div className=" flex space-x-0.5 ml-4">
                                            {[...Array(5)].map((_, ratingIndex) => (
                                                <IoIosStar onClick={() => handleHotelChange(index, 'rating', ratingIndex + 1)} key={ratingIndex} className={` ${ratingIndex + 1 <= hotel.rating ? 'fill-[#FFCB1F]' : 'fill-slate-400'} size-5 cursor-pointer`} />
                                            ))}
                                        </div>
                                    </div>
                                    <textarea name="" id="" placeholder="Description" value={hotel.description} onChange={(e) => handleHotelChange(index, 'description', e.target.value)} className={`${textAreaStyle} w-full mt-4`}></textarea>

                                    <div className=" flex w-full space-x-4 ">
                                        <input type="text" value={hotel.coordinates} onChange={(e) => handleHotelChange(index, 'coordinates', e.target.value)} placeholder="Coordinates" className={`${inputStyle}`} />
                                        <input type="text" value={hotel.mapLink} onChange={(e) => handleHotelChange(index, 'mapLink', e.target.value)} placeholder="Google Maps link" className={`${inputStyle}`} />
                                    </div>

                                    <div className=" flex w-full space-x-8 mt-4  ">
                                        <ImageUploader
                                            label="Hotel Image upload"
                                            selectedFile={hotel.banner}
                                            setSelectedFile={(file) => handleHotelChange(index, "banner", file)}
                                            id={`HotelfileUpload-${index}`} // unique per day
                                        />

                                    </div>


                                    <div className=" absolute flex items-center space-x-3 -right-48 top-16">
                                        <ReorderIcons handleReorder={handleReorder} index={index} handleDelete={handleDeleteHotel} arrayOfElements={hotels} setElements={setHotels} />

                                    </div>

                                </div>))}
                        </div>


                        {/* Locations in itinerary */}
                        <div className="flex flex-col w-9/12 xl:w-6/12   transition-all duration-300 ease-in-out">

                            <div className="flex items-center space-x-8">
                                <h2 className=" text-xl font-medium">Key Location</h2>
                                <img onClick={handleAddLocation} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
                            </div>

                            {locations?.map((location, index) => (
                                <div key={index} ref={(el) => (LocationRefs.current[index] = el)} className={` my-1 relative flex flex-col space-y-4`}>

                                    <p className=" font-medium mt-4 ">Location {index + 1}</p>
                                    <div className=" w-full flex items-center space-x-5">
                                        <input type="text" value={location.title} onChange={(e) => handleLocationsChange(index, 'title', e.target.value)} placeholder="Title.." className={`${inputStyle}`} />
                                        <input type="text" value={location.cordinates} onChange={(e) => handleLocationsChange(index, 'cordinates', e.target.value)} placeholder="Cordinates.." className={`${inputStyle}`} />
                                    </div>

                                    <div className=" absolute flex items-center space-x-3 -right-48 top-16">
                                        <ReorderIcons handleReorder={handleReorder} index={index} handleDelete={handleDeleteLocation} arrayOfElements={locations} setElements={setLocations} />

                                    </div>

                                </div>))}
                        </div>


                        {/* Experiences  of itinerary */}
                        <div className="flex flex-col w-9/12 xl:w-6/12   transition-all duration-300 ease-in-out">

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
                        </div>



                        <div className="flex flex-col  xl:w-3/12   transition-all duration-300 ease-in-out">

                            <div className="flex items-center space-x-8">
                                <h2 className=" text-xl font-medium">Destination Highlights</h2>
                                <img onClick={handleAddDestinationHighlights} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
                            </div>

                            {destinationHighlights?.map((data, index) => (
                                <div key={index} ref={(el) => (destinationHighlightsRef.current[index] = el)} className={` my-1 relative flex flex-col space-y-4`}>

                                    <div className=" w-full flex items-center space-x-5 mt-6">
                                        <input type="text" value={data.title} onChange={(e) => handleDestinationsChange(index, 'title', e.target.value)} placeholder="Title.." className={`${inputStyle}`} />
                                    </div>

                                    <div className=" absolute flex items-center space-x-3 -right-48 top-8">
                                        <ReorderIcons handleReorder={handleReorder} index={index} handleDelete={handleDeleteDestinationHighlights} arrayOfElements={destinationHighlights} setElements={setDestinationHighlights} />
                                    </div>

                                </div>))}
                        </div>



                        <div className="flex flex-col  xl:w-3/12   transition-all duration-300 ease-in-out">

                            <div className="flex items-center space-x-8">
                                <h2 className=" text-xl font-medium">Signature Experiences</h2>
                                <img onClick={handleAddSignatureHighlights} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
                            </div>

                            {signatureHighlights?.map((data, index) => (
                                <div key={index} ref={(el) => (signatureHighlightsRef.current[index] = el)} className={` my-1 relative flex flex-col space-y-4`}>

                                    <div className=" w-full flex items-center space-x-5 mt-6">
                                        <input type="text" value={data.title} onChange={(e) => handleSignatureChange(index, 'title', e.target.value)} placeholder="Title.." className={`${inputStyle}`} />
                                    </div>

                                    <div className=" absolute flex items-center space-x-3 -right-48 top-8">
                                        <ReorderIcons handleReorder={handleReorder} index={index} handleDelete={handleDeleteSignatureHighlights} arrayOfElements={signatureHighlights} setElements={setSignatureHighlights} />
                                    </div>

                                </div>))}
                        </div>


                        <div className="flex flex-col xl:w-3/12 transition-all duration-300 ease-in-out">
                            <div className="flex items-center space-x-8">
                                <h2 className="text-xl font-medium">Package Inclusions</h2>
                                <img
                                    onClick={handleAddPackageInclusions}
                                    src="/Icons/sqaure-add-icon.svg"
                                    alt=""
                                    className="cursor-pointer size-7"
                                />
                            </div>

                            {packageInclusions.map((data, index) => (
                                <div
                                    key={index}
                                    ref={(el) => (packageInclusionsRef.current[index] = el)}
                                    className="my-1 relative flex flex-col space-y-4"
                                >
                                    <div className="w-full flex items-center space-x-5 mt-6">
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => handlePackageInclusionChange(index, 'title', e.target.value)}
                                            placeholder="Title.."
                                            className={inputStyle}
                                        />
                                    </div>

                                    <div className="absolute flex items-center space-x-3 -right-48 top-8">
                                        <ReorderIcons
                                            handleReorder={handleReorder}
                                            index={index}
                                            handleDelete={handleDeletePackageInclusion}
                                            arrayOfElements={packageInclusions}
                                            setElements={setPackageInclusions}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className="flex flex-col xl:w-3/12 transition-all duration-300 ease-in-out">
                            <div className="flex items-center space-x-8">
                                <h2 className="text-xl font-medium">Package Exclusions</h2>
                                <img
                                    onClick={handleAddPackageExclusions}
                                    src="/Icons/sqaure-add-icon.svg"
                                    alt=""
                                    className="cursor-pointer size-7"
                                />
                            </div>

                            {packageExclusions.map((data, index) => (
                                <div
                                    key={index}
                                    ref={(el) => (packageExclusionsRef.current[index] = el)}
                                    className="my-1 relative flex flex-col space-y-4"
                                >
                                    <div className="w-full flex items-center space-x-5 mt-6">
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => handlePackageExclusionChange(index, 'title', e.target.value)}
                                            placeholder="Title.."
                                            className={inputStyle}
                                        />
                                    </div>

                                    <div className="absolute flex items-center space-x-3 -right-48 top-8">
                                        <ReorderIcons
                                            handleReorder={handleReorder}
                                            index={index}
                                            handleDelete={handleDeletePackageExclusion}
                                            arrayOfElements={packageExclusions}
                                            setElements={setPackageExclusions}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>



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