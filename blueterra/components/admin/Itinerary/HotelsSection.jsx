import React from 'react'
import ImageUploader from './ImageUploader'
import { useRef } from 'react';
import {IoIosStarOutline, IoIosStar, IoIosStarHalf } from '@/components/reactIcons'
import ReorderIcons from '../ReorderIcons';

function HotelsSection({ hotels, setHotels, textAreaStyle, inputStyle, handleReorder }) {

    const hotelsRefs = useRef([]);


    const handleAddHotel = () => {

        const lastIndex = hotels.length;
        setHotels([...hotels, { title: '', description: '', banner: null, coordinates: '', location: '', mapLink: '', rating: 0 }])
        setTimeout(() => {
            const target = hotelsRefs.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }

    // Handle changing a day input
    const handleHotelChange = (index, field, value) => {
        const updatedHotels = [...hotels];
        updatedHotels[index][field] = value;
        setHotels(updatedHotels);
    };


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

    return (
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
    )
}

export default HotelsSection