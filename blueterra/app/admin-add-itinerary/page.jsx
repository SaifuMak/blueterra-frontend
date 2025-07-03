'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { useState, useRef } from "react";
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from "react-icons/io";
import { jost } from '@/app/fonts'
import ReorderIcons from "@/components/admin/ReorderIcons";


export default function AdminAddItinerary() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [shortDescription, setShortDescription] = useState('')

    const [days, setDays] = useState([{ title: '', description: '' }]);
    const [hotels, setHotels] = useState([{ title: '', description: '', stop: '', location: '', mapLink: '', rating: 0 }]);
    const [locations, setLocations] = useState([{ title: '', cordinates: '' }]);
    const [experiences, setExperiences] = useState([{ title: '' }]);

    const dayRefs = useRef([]);
    const hotelsRefs = useRef([]);
    const LocationRefs = useRef([]);
    const experienceRefs = useRef([]);





    const inputStyle = 'placeholder:text-[#949393] w-full bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4'
    const textAreaStyle = 'placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  min-h-28  py-2 px-4'

    const handleAddDay = () => {

        const lastIndex = days.length;
        setDays([...days, { title: '', description: '' }])
        setTimeout(() => {
            const target = dayRefs.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }


    const handleAddHotel = () => {

        const lastIndex = hotels.length;
        setHotels([...hotels, { title: '', description: '', stop: '', location: '', mapLink: '', rating: 0 }])
        setTimeout(() => {
            const target = hotelsRefs.current[lastIndex];
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

        <div className={`h-screen w-full ${jost.className}`}>

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />

                <div className=" flex-1 relative   ml-4  mr-8 mb-0 p-10 rounded-xl bg-admin-light-dark-background w-full flex justify-center overflow-y-scroll  h-[97vh] z-50">


                    <div className=" flex space-x-3 max-xl:text-sm text-white  absolute  right-5 top-5">
                        <button className=" bg-[#524D4D]  w-fit h-fit px-4  py-2  rounded-sm">Save Draft</button>
                        <button className=" bg-[#129366]  w-fit h-fit px-4 py-2 rounded-sm  ">Publish</button>
                    </div>

                    <div className="flex flex-col w-full  space-y-10">

                        {/* general data of itinerary */}
                        <div className=" flex flex-col w-full space-y-6">
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Itinerary Title...." className={`placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4 w-6/12 xl:w-4/12`} />
                            <textarea name="" id="" placeholder="Main short description" value={description} onChange={(e) => setDescription(e.target.value)} className={`${textAreaStyle} w-6/12 xl:w-4/12`}></textarea>
                            <textarea name="" id="" placeholder="Main short description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className={`${textAreaStyle} w-6/12 xl:w-4/12`}></textarea>
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
                                    <input type="text" value={hotel.title} onChange={(e) => handleHotelChange(index, 'title', e.target.value)} placeholder="Title.." className={`${inputStyle}`} />
                                    <textarea name="" id="" placeholder="Input descriptions here..." value={hotel.description} onChange={(e) => handleHotelChange(index, 'description', e.target.value)} className={`${textAreaStyle} w-full mt-4`}></textarea>
                                    <input type="text" value={hotel.stop} onChange={(e) => handleHotelChange(index, 'stop', e.target.value)} placeholder="Stop" className={`${inputStyle}`} />
                                    <input type="text" value={hotel.location} onChange={(e) => handleHotelChange(index, 'location', e.target.value)} placeholder="Location" className={`${inputStyle}`} />
                                    <input type="text" value={hotel.mapLink} onChange={(e) => handleHotelChange(index, 'mapLink', e.target.value)} placeholder="Map link" className={`${inputStyle}`} />
                                    <div className=" flex items-center ">
                                        <p className=" font-medium">Ratings</p>
                                        <div className=" flex space-x-0.5 ml-4">
                                            {[...Array(5)].map((_, ratingIndex) => (
                                                <IoIosStar onClick={() => handleHotelChange(index, 'rating', ratingIndex + 1)} key={ratingIndex} className={` ${ratingIndex + 1 <= hotel.rating ? 'fill-[#FFCB1F]' : 'fill-slate-400'} size-5 cursor-pointer`} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className=" absolute flex items-center space-x-3 -right-48 top-16">
                                        <ReorderIcons handleReorder={handleReorder} index={index} handleDelete={handleDeleteHotel} arrayOfElements={hotels} setElements={setHotels} />

                                    </div>

                                </div>))}
                        </div>


                        {/* Locations in itinerary */}
                        <div className="flex flex-col w-9/12 xl:w-6/12   transition-all duration-300 ease-in-out">

                            <div className="  flex items-center space-x-8">
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

                    </div>

                </div>

            </div>
        </div>
    )
}