import React from 'react'
import { useEffect, useState, useRef } from 'react';
import ImageUploader from './ImageUploader';
import ReorderIcons from '../ReorderIcons';


const DaysSection = ({ textAreaStyle, inputStyle, days, setDays, handleReorder }) => {

    const dayRefs = useRef([]);

    const handleAddDay = () => {
        const lastIndex = days.length;
        setDays([...days, { title: '', description: '', image: null, image_title: '' }])
        setTimeout(() => {
            const target = dayRefs.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }


    // Handle changing a day input
    const handleDayChange = (index, field, value) => {
        const updatedDays = [...days];
        updatedDays[index][field] = value;
        setDays(updatedDays);
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


    return (
        <div className="flex flex-col w-9/12 xl:w-6/12 mt-5  transition-all duration-300 ease-in-out">

            <div className="  flex items-center space-x-8">
                <h2 className=" text-xl text-dark-blue font-medium">Days</h2>
                <img onClick={handleAddDay} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
            </div>

            {days?.map((day, index) => (
                <div key={index} ref={(el) => (dayRefs.current[index] = el)} className={` my-2 relative flex flex-col space-y-4`}>

                    <p className=" text-lg font-medium mt-4 ">Day {index + 1}</p>
                    <input type="text" value={day.title} onChange={(e) => handleDayChange(index, 'title', e.target.value)} placeholder="Title.." className={`${inputStyle}`} required />
                    <textarea name="" id="" placeholder="Input descriptions here..." value={day.description} onChange={(e) => handleDayChange(index, 'description', e.target.value)} className={`${textAreaStyle} w-full mt-4`} required></textarea>

                    <div className=" flex w-full items-center space-x-8 mt-4  ">
                        <ImageUploader
                            label="Image upload"
                            selectedFile={day.image}
                            setSelectedFile={(file) => handleDayChange(index, "image", file)}
                            id={`DayfileUpload-${index}`} // unique per day
                        />
                        {day.image && <input type="text"
                            value={day.image_title}
                            onChange={(e) => handleDayChange(index, 'image_title', e.target.value)}
                            placeholder="Image title"
                            className={`placeholder:text-[#949393] ml-4 bg-white rounded-[4px] border border-[#B5B5B5] outline-none flex-1 h-fit  py-2 px-4 `}
                            required
                        />}


                    </div>
                 
                      {day.image_public_url && (
                    <button
                        onClick={() => window.open(day.image_public_url, "_blank")}
                        className="px-3 py-1 bg-sky-blue-dark text-sm w-fit text-white rounded transition"
                    >
                        View Image
                    </button>
                )}



                    <div className=" absolute flex items-center -right-48 top-16">
                        <ReorderIcons handleReorder={handleReorder} index={index} handleDelete={handleDeleteDay} arrayOfElements={days} setElements={setDays} />
                    </div>

                </div>))}
        </div>

    )
}

export default DaysSection