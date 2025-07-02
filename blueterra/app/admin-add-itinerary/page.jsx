'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { useState } from "react";
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from "react-icons/io";
import {jost} from '@/app/fonts'

export default function AdminAddItinerary() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [shortDescription, setShortDescription] = useState('')

    const [days, setDays] = useState([{ title: '', description: '' }]);
    const [hotels, setHotels] = useState([{ title: '', description: '', stop: '', location: '', mapLink: '', rating: 0 }]);


    const inputStyle = 'placeholder:text-[#949393] w-full bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-2'
    const textAreaStyle = 'placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  min-h-28  py-2 px-2'


    const handleAddDay = () => {
        setDays([...days, { title: '', description: '' }])
    }

    const handleAddHotel = () => {
        setHotels([...hotels, { title: '', description: '', stop: '', location: '', mapLink: '', rating: 0 }])
    }



    // Handle changing a day input
    const handleDayChange = (index, field, value) => {
        const updatedDays = [...days];
        updatedDays[index][field] = value;
        setDays(updatedDays);
    };

    const handleDeleteDay = (indexToDelete) => {
        setDays((prevDays) => prevDays.filter((_, index) => indexToDelete !== index))
    }


    // Handle changing a day input
    const handleHotelChange = (index, field, value) => {
        const updatedHotels = [...hotels];
        updatedHotels[index][field] = value;
        setHotels(updatedHotels);
    };


    return (
        <div className={`h-screen w-full ${jost.className}`}>

            <Navbar />

            <div className=" w-full h-full  flex">

                {/* sidebar */}
                <Sidebar />

                <div className=" flex-1  ml-4  mr-8 mb-0 p-10 rounded-xl bg-admin-light-dark-background w-full flex justify-center overflow-y-scroll  h-[97vh] z-50">

                    <div className="flex flex-col w-full  space-y-10">

                        {/* general data of itinerary */}
                        <div className=" flex flex-col w-full space-y-6">
                            <input type="text" value={title} placeholder="Itinerary Title...." className={`placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-2 w-4/12`} />
                            <textarea name="" id="" placeholder="Main short description" value={description} className={`${textAreaStyle} w-6/12`}></textarea>
                            <textarea name="" id="" placeholder="Main short description" value={shortDescription} className={`${textAreaStyle} w-6/12`}></textarea>
                        </div>


                        {/* Days  of itinerary */}
                        <div className="flex flex-col w-6/12   transition-all duration-300 ease-in-out">

                            <div className="  flex items-center space-x-8">
                                <h2 className=" text-xl font-medium">Days</h2>
                                <img onClick={handleAddDay} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
                            </div>

                            {days?.map((day, index) => (
                                <div key={index} className={` my-5 relative flex flex-col space-y-4`}>

                                    <p className=" font-medium mt-4 ">Day {index + 1}</p>
                                    <input type="text" value={day.title} onChange={(e) => handleDayChange(index, 'title', e.target.value)} placeholder="Title.." className={`${inputStyle}`} />
                                    <textarea name="" id="" placeholder="Input descriptions here..." value={day.description} onChange={(e) => handleDayChange(index, 'description', e.target.value)} className={`${textAreaStyle} w-full mt-4`}></textarea>

                                    <div className=" absolute flex items-center space-x-3 -right-48 top-16">
                                        <img src="/Icons/down-box-arrow.svg" alt="" className=" cursor-pointer size-6" />
                                        <img src="/Icons/up-box-arrow.svg" alt="" className=" cursor-pointer size-6" />
                                        <img onClick={() => handleDeleteDay(index)} src="/Icons/red-delete-icon.svg" alt="" className=" cursor-pointer size-6" />
                                    </div>

                                </div>))}
                        </div>


                        {/* Hotels in itinerary */}
                        <div className="flex flex-col w-6/12  transition-all duration-300 ease-in-out">

                            <div className="  flex items-center space-x-8">
                                <h2 className=" text-xl font-medium">Hotels</h2>
                                <img onClick={handleAddHotel} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
                            </div>

                            {hotels?.map((hotel, index) => (
                                <div key={index} className={`  my-5  relative flex flex-col space-y-4`}>

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
                                                <IoIosStar onClick={()=>handleHotelChange(index, 'rating', ratingIndex+1)} key={ratingIndex} className={` ${ratingIndex + 1 <= hotel.rating ? 'fill-[#FFCB1F]' : 'fill-slate-400'} size-5 cursor-pointer`} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className=" absolute flex items-center space-x-3 -right-48 top-16">
                                        <img src="/Icons/down-box-arrow.svg" alt="" className=" cursor-pointer size-6" />
                                        <img src="/Icons/up-box-arrow.svg" alt="" className=" cursor-pointer size-6" />
                                        <img onClick={() => handleDeleteDay(index)} src="/Icons/red-delete-icon.svg" alt="" className=" cursor-pointer size-6" />
                                    </div>

                                </div>))}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}