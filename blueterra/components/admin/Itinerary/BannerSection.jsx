import React, { forwardRef } from 'react'
import { useState } from 'react'
import ColorThemePicker from './ColorThemePicker'

function BannerSection({
    textAreaStyle,
    title,
    setTitle,
    locationTitle,
    setLocationTitle,
    description,
    setDescription,
    color,
    setColor,
    selectedImageFile,
    setSelectedImageFile,
}) {



    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImageFile(e.target.files[0]); // store the actual File object
        }
    };


    return (
        < div className=" flex flex-col w-6/12 space-y-6" >

            <div className=" flex  space-x-5 ">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Itinerary Title...." className={`placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4  w-full`} required />
                <input type="text" value={locationTitle} onChange={(e) => setLocationTitle(e.target.value)} placeholder="Location title" className={`placeholder:text-[#949393] bg-white rounded-[4px] border border-[#B5B5B5] outline-none  py-2 px-4  w-full`} required />
            </div>

            <textarea name="" id="" placeholder="Banner description" value={description} onChange={(e) => setDescription(e.target.value)} className={`${textAreaStyle} w-full   `} required></textarea>


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

        </div >
    )
}

export default BannerSection